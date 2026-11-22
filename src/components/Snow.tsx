import { type IconifyIcon, loadIcon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';

// A set of Iconify icons that share colours and motion. Colours are full
// Tailwind class names so Tailwind generates them; the canvas reads the
// resolved colour back from a hidden element using each class
interface IconGroup {
  // Iconify icon names, loaded the same way the <Icon> component loads them
  icons: string[];
  colors: string[];
  // Relative chance a flake is drawn from this group
  weight: number;
  // Multiplier on the random spin speed; lower keeps shapes more upright
  spin: number;
  // [min, max] opacity each flake is randomly given
  opacity: [number, number];
}

// December: mostly snowflakes in greys and icy blues that stay visible on the
// mostly white page, with the occasional gold sparkle
const SNOW_GROUPS: IconGroup[] = [
  {
    icons: [
      'mdi:snowflake',
      'coolicons:snowflake-duotone-round',
      'dinkie-icons:snowflake',
      'doodle-icons:snowflake',
      'game-icons:snowflake-2',
    ],
    colors: ['text-slate-400', 'text-slate-500', 'text-sky-300', 'text-blue-400'],
    weight: 0.88,
    spin: 1,
    opacity: [0.4, 0.8],
  },
  {
    icons: ['mdi:star-four-points', 'ph:sparkle-fill'],
    colors: ['text-amber-300', 'text-yellow-400'],
    weight: 0.12,
    spin: 0.4,
    opacity: [0.4, 0.8],
  },
];

// November: autumn leaves
const LEAF_GROUPS: IconGroup[] = [
  {
    icons: ['mdi:leaf-maple', 'mdi:leaf', 'ph:leaf-fill'],
    colors: [
      'text-amber-500',
      'text-orange-500',
      'text-orange-600',
      'text-red-500',
      'text-yellow-600',
    ],
    weight: 1,
    spin: 1,
    // Leaves are solid shapes in strong colours, so they need to be fainter
    // than the snow to stay in the background
    opacity: [0.25, 0.5],
  },
];

// Pick the icon groups for the date, or null outside the season
// (months are 0-indexed)
const getSeasonGroups = (date: Date): IconGroup[] | null => {
  const month = date.getMonth();
  if (month === 10) return LEAF_GROUPS;
  if (month === 11) return SNOW_GROUPS;
  return null;
};

interface FlakeShape {
  path: Path2D;
  // Largest side of the icon's viewBox, used to scale it to the flake size
  size: number;
}

// An icon group after its icons have loaded and its colours have resolved
interface LoadedGroup {
  shapes: FlakeShape[];
  colors: string[];
  weight: number;
  spin: number;
  opacity: [number, number];
}

// Turn an Iconify icon's SVG body into a canvas path
const iconToShape = (icon: Required<IconifyIcon>): FlakeShape => {
  const path = new Path2D();

  for (const [, d] of icon.body.matchAll(/\sd="([^"]+)"/g)) {
    path.addPath(new Path2D(d));
  }

  return { path, size: Math.max(icon.width, icon.height) };
};

// Resolve Tailwind text colour classes to CSS colours the canvas can use
const resolveColorClasses = (classNames: string[]) =>
  classNames.map((className) => {
    const probe = document.createElement('span');
    probe.className = className;
    probe.style.display = 'none';
    document.body.appendChild(probe);
    const { color } = getComputedStyle(probe);
    probe.remove();
    return color;
  });

// Flake size range in px (radius); smaller flakes read as further away
const MIN_RADIUS = 4;
const MAX_RADIUS = 10;

// Extra space above and below the viewport where flakes wrap around unseen
const WRAP_MARGIN = 40;

// How much the flake layer moves with page scroll (1 = fully with the page)
const SCROLL_FOLLOW = 0.5;

// How quickly the flakes catch up to the scroll position each frame (0–1).
// Lower values give the snow more inertia
const SCROLL_EASE = 0.05;

// Scroll speed (px per frame) that produces the strongest gust; higher is calmer
const GUST_SCROLL_SPEED = 60;

interface Flake {
  shape: FlakeShape;
  color: string;
  rotation: number;
  spin: number;
  x: number;
  // Position within the falling layer, before scroll is applied
  y: number;
  // Last drawn position on screen, used to detect wrapping
  screenY: number;
  radius: number;
  // 0–1, how strongly the flake follows page scroll (parallax)
  depth: number;
  speed: number;
  drift: number;
  phase: number;
  opacity: number;
}

export default function Snow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [groups, setGroups] = useState<IconGroup[] | null>(null);

  // Decide on the client only so the server-rendered markup never mismatches
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    setGroups(reducedMotion ? null : getSeasonGroups(new Date()));
  }, []);

  useEffect(() => {
    if (!groups) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    // Vertical span the flakes wrap within, a little taller than the viewport
    // so flakes can enter and leave off-screen
    let span = 0;
    let flakes: Flake[] = [];
    let animationId = 0;
    let cancelled = false;
    // Groups whose icons loaded, with their shapes and resolved colours
    let loaded: LoadedGroup[] = [];

    // Scroll position the flakes trail behind, giving them inertia
    let easedScrollY = window.scrollY;
    // Smoothed scroll speed in px per frame, used for the gust effect
    let scrollVelocity = 0;

    const pickGroup = () => {
      const total = loaded.reduce((sum, group) => sum + group.weight, 0);
      let roll = Math.random() * total;
      for (const group of loaded) {
        roll -= group.weight;
        if (roll < 0) return group;
      }
      return loaded[loaded.length - 1];
    };

    const pick = <T,>(items: T[]) =>
      items[Math.floor(Math.random() * items.length)];

    const createFlake = (): Flake => {
      const radius = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);
      // 0 for the smallest flakes, 1 for the largest
      const nearness = (radius - MIN_RADIUS) / (MAX_RADIUS - MIN_RADIUS);

      const group = pickGroup();

      return {
        shape: pick(group.shapes),
        color: pick(group.colors),
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02 * group.spin,
        x: Math.random() * width,
        y: Math.random() * span,
        screenY: 0,
        radius,
        // Bigger flakes read as closer: they scroll more with the page and
        // fall a little faster, which gives a sense of depth
        depth: 0.35 + nearness * 0.65,
        speed: Math.random() * 0.8 + 0.4,
        drift: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        opacity:
          group.opacity[0] +
          Math.random() * (group.opacity[1] - group.opacity[0]),
      };
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      span = height + WRAP_MARGIN * 2;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale flake count with viewport area, capped for performance
      const count = Math.min(Math.floor((width * height) / 18000), 100);
      flakes = Array.from({ length: count }, createFlake);
    };

    const draw = () => {
      // Ease toward the real scroll position so the flakes drift into place
      // and keep moving briefly after scrolling stops
      const scrollStep = (window.scrollY - easedScrollY) * SCROLL_EASE;
      easedScrollY += scrollStep;
      scrollVelocity = scrollVelocity * 0.95 + scrollStep * 0.05;

      // Strength of the gust from scrolling, capped so fast flings stay calm
      const gust = Math.max(
        -1,
        Math.min(1, scrollVelocity / GUST_SCROLL_SPEED),
      );

      ctx.clearRect(0, 0, width, height);

      for (const flake of flakes) {
        flake.phase += 0.01 + Math.abs(gust) * 0.03;
        flake.rotation += flake.spin * (1 + Math.abs(gust) * 4);
        flake.y += flake.speed * (0.6 + flake.depth * 0.6);
        flake.x +=
          Math.sin(flake.phase) * flake.drift * (1 + Math.abs(gust) * 2);

        // Flakes live in a layer that moves with the page by their depth,
        // wrapping vertically so snow keeps falling the whole way down
        const offset = flake.y - easedScrollY * flake.depth * SCROLL_FOLLOW;
        const screenY = (((offset % span) + span) % span) - WRAP_MARGIN;

        // A big jump means the flake wrapped to the other edge, so give it
        // a new column to avoid repeating the same pattern while scrolling
        if (Math.abs(screenY - flake.screenY) > span / 2) {
          flake.x = Math.random() * width;
        }
        flake.screenY = screenY;

        if (flake.x > width + 20) flake.x = -20;
        if (flake.x < -20) flake.x = width + 20;

        ctx.fillStyle = flake.color;
        ctx.globalAlpha = flake.opacity;

        // Scale the icon's viewBox so it spans the flake's diameter,
        // centred on the flake position
        const { path, size } = flake.shape;
        const scale = (flake.radius * 2) / size;

        ctx.save();
        ctx.translate(flake.x, screenY);
        ctx.rotate(flake.rotation);
        ctx.scale(scale, scale);
        ctx.translate(-size / 2, -size / 2);
        ctx.fill(path);
        ctx.restore();
      }

      animationId = requestAnimationFrame(draw);
    };

    const start = () => {
      if (cancelled || loaded.length === 0) return;
      resize();
      draw();
      window.addEventListener('resize', resize);
    };

    // Wait for the icons before the first flakes are created. A group whose
    // icons can't be fetched is left out; if none load, skip the effect
    // rather than show an empty canvas
    Promise.all(
      groups.map((group) =>
        Promise.all(group.icons.map((name) => loadIcon(name)))
          .then((icons) => ({
            shapes: icons.map(iconToShape),
            colors: resolveColorClasses(group.colors),
            weight: group.weight,
            spin: group.spin,
            opacity: group.opacity,
          }))
          .catch(() => null),
      ),
    ).then((results) => {
      loaded = results.filter(
        (result): result is LoadedGroup => result !== null,
      );
      start();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [groups]);

  if (!groups) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
    />
  );
}
