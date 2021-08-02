<template>
  <the-header></the-header>

  <div class="relative">
    <Particles
      class="absolute h-full w-full"
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="{
        background: {
          color: {
            value: '#f8f9fa',
          },
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: 'canvas',
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 800,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#dee2e6',
          },
          links: {
            color: '#e9ecef',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }"
    />
    <div
      class="flex flex-col justify-center items-center h-screen pointer-events-none"
    >
      <div
        class=" text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono relative typewriter-text"
      >
        Page under construction...
      </div>
    </div>
    <div class="absolute bottom-2 right-2 text-gray-200">
      <div class="inline-block sm:hidden">mb</div>
      <div class="hidden sm:inline-block md:hidden">sm</div>
      <div class="hidden md:inline-block lg:hidden">md</div>
      <div class="hidden lg:inline-block">lg</div>
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/UI/TheHeader.vue";

export default {
  name: "App",
  components: {
    TheHeader,
  },
};
</script>

<style>
#app {
  color: #2c3e50;
}

.typewriter-text::before,
.typewriter-text::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: -5px;
  left: 0;
}

.typewriter-text::before {
  background: #f8f9fa;
  animation: typewriter 4s steps(26) 1s forwards;
}

.typewriter-text::after {
  width: 0.125em;
  background: black;
  animation: typewriter 4s steps(26) 1s forwards, blink 750ms steps(26) infinite;
}

@keyframes typewriter {
  to {
    left: 100%;
  }
}

@keyframes blink {
  to {
    background: transparent;
  }
}
</style>
