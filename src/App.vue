<template>
  <Particles id="tsparticles" :options="particlesOptions" />
  <the-header></the-header>
  <div class="relative">
    <div class="flex flex-col justify-center items-center h-screen ">
      <div
        class=" text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-mono relative typewriter-text"
      >
        {{ this.displayedSentence }}
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
  data() {
    return {
      orginalSentence: "Page under construction...",
      displayedSentence: " ",
      counter: 0,
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
              top: "bounce",
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
    };
  },
  mounted() {
    let that = this;
    const typingFunction = setInterval(() => {
      if (that.counter >= that.orginalSentence.length) {
        that.displayedSentence = that.orginalSentence;
        that.counter = that.orginalSentence.length;
        clearInterval(typingFunction);
      } else {
        that.displayedSentence = that.orginalSentence.substring(
          0,
          that.counter
        );
        that.counter++;
      }
    }, 6000 / this.orginalSentence.length);
  },
};
</script>

<style>
#app {
  color: #2c3e50;
}

.typewriter-text::after {
  content: "";
  position: absolute;
  top: -5px;
  right: 0;
  bottom: -5px;
  left: 100%;
}

.typewriter-text::after {
  width: 0.125em;
  background: white;
  animation: blink 600ms steps(26) infinite;
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
