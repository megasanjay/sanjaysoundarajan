import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import * as React from 'react';

interface ToolTipProps {
  tech: string;
  width?: number;
  height?: number;
}

interface dataType {
  [key: string]: {
    icon: string;
    title: string;
  };
}

const data: dataType = {
  vue3: {
    icon: 'logos:vue',
    title: 'Vue 3',
  },
  flask: {
    icon: 'bxl:flask',
    title: 'Flask',
  },
  electron: {
    icon: 'cib:electron',
    title: 'Electron',
  },
  python: {
    icon: 'bxl:python',
    title: 'Python',
  },
  react: {
    icon: 'logos:react',
    title: 'React',
  },
  js: {
    icon: 'fa6-brands:js',
    title: 'Javascript',
  },
  nextjs: {
    icon: 'akar-icons:nextjs-fill',
    title: 'Next.js',
  },
  ts: {
    icon: 'logos:typescript-icon',
    title: 'Typescript',
  },
  docusaurus: {
    icon: 'logos:docusaurus',
    title: 'Docusaurus',
  },
  tailwind: {
    icon: 'bxl:tailwind-css',
    title: 'Tailwind CSS',
  },
  cypress: {
    icon: 'logos:cypress-icon',
    title: 'Cypress',
  },
  googleanalytics: {
    icon: 'logos:google-analytics',
    title: 'Google Analytics',
  },
  vite: {
    icon: 'simple-icons:vite',
    title: 'Vite',
  },
  storybook: {
    icon: 'cib:storybook',
    title: 'Storybook',
  },
  histoire: {
    icon: 'fluent:notebook-lightning-20-filled',
    title: 'Histoire',
  },
  nuxt: {
    icon: 'simple-icons:nuxtdotjs',
    title: 'Nuxt.js',
  },
  naiveui: {
    icon: 'logos:naiveui',
    title: 'Naive UI',
  },
  supabase: {
    icon: 'ri:supabase-fill',
    title: 'Supabase ',
  },
  prisma: {
    icon: 'logos:prisma',
    title: 'Prisma ',
  },
  postgresql: {
    icon: 'logos:postgresql',
    title: 'PostgreSQL',
  },
  chakraui: {
    icon: 'simple-icons:chakraui',
    title: 'Chakra UI',
  },
  zod: {
    icon: 'logos:zod',
    title: 'Zod',
  },
};

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: '5%' },
};

const TechTooltip: React.FC<ToolTipProps> = ({
  tech,
  width = 25,
  height = 25,
}) => {
  const techData = data[tech];
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  return (
    <div className="relative mb-2 mr-2 p-1 sm:mb-0">
      <motion.div
        animate={isPopoverOpen ? 'open' : 'closed'}
        variants={variants}
        className="absolute -top-10 w-max rounded-lg border border-slate-100 bg-white px-3 py-1 "
      >
        <span className="text-base font-medium">{techData.title}</span>
      </motion.div>

      <Icon
        className="grayscale"
        icon={techData.icon}
        width={width}
        height={height}
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
      />
    </div>
  );
};

export default TechTooltip;
