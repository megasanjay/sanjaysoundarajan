<template>
  <Particles id="tsparticles" :options="particlesOptions" />
  <the-header :class="{ 'debug-screens': !prod }"></the-header>

  <router-view> </router-view>
</template>

<script>
import TheHeader from "./components/UI/TheHeader.vue";

export default {
  name: "App",
  components: {
    TheHeader,
  },
  data() {
    return {
      particlesOptions: {
        background: { color: { value: "#1F2937" } },
        fullScreen: { enable: true, zIndex: -1 },
        interactivity: {
          detect_on: "window",
          events: {
            onClick: { enable: true, mode: "push" },
            onHover: {
              enable: true,
              mode: ["parallax"],
              parallax: { enable: true, force: 200, smooth: 10 },
            },
          },
          modes: {
            grab: { distance: 50 },
          },
        },
        particles: {
          color: { value: "random" },
          move: {
            enable: true,
            mode: ["bounce", "collisions"],
            repulse: {
              random: {
                enable: true,
                minimumValue: 10,
              },
              value: 30,
              enable: true,
              distance: 10,
              duration: 1,
              factor: 10,
              speed: 10,
            },
            bounce: {
              horizontal: {
                random: {
                  enable: false,
                  minimumValue: 0.1,
                },
                value: 1,
              },
              vertical: {
                random: {
                  enable: false,
                  minimumValue: 0.1,
                },
                value: 1,
              },
            },
            collisions: {
              bounce: {
                horizontal: {
                  random: {
                    enable: true,
                    minimumValue: 0.1,
                  },
                  value: 1,
                },
                vertical: {
                  random: {
                    enable: true,
                    minimumValue: 0.1,
                  },
                  value: 1,
                },
              },
              enable: true,
              mode: "bounce",
              overlap: {
                enable: false,
                retries: 0,
              },
            },
            outModes: {
              bottom: "bounce",
              left: "out",
              right: "out",
              top: "destroy",
            },
            speed: 1,
          },
          number: { density: { enable: true, value_area: 800 }, value: 20 },
          size: { value: 10 },
          shape: {
            type: ["character"],
            character: [
              {
                fill: false,
                font: "Verdana",
                value: ["❌", "🛆"],
              },
            ],
            image: [
              {
                src: "https://particles.js.org/images/fruits//apple.png",
                width: 32,
                height: 32,
              },
              {
                src: "https://particles.js.org/images/fruits//avocado.png",
                width: 32,
                height: 32,
              },
            ],
          },
        },
        detectRetina: true,
      },
      prod: process.env.NODE_ENV === "production",
    };
  },
};
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
