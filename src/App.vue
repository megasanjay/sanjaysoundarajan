<template>
  <Particles id="tsparticles" :options="particlesOptions" />
  <the-header></the-header>
  <div class="relative">
    <div class="flex flex-col justify-center items-center h-screen">
      <div
        class="
          text-2xl
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
          font-black
          text-white
          font-mono
          text-center
        "
      >
        <div
          class="relative"
          :class="{ 'typewriter-text': displayList.sentence1.showCursor }"
        >
          {{ this.displayList.sentence1.displayedSentence }}
        </div>
        <div
          class="relative"
          :class="{ 'typewriter-text': displayList.sentence2.showCursor }"
        >
          {{ this.displayList.sentence2.displayedSentence }}
        </div>
        <div
          class="relative"
          :class="{ 'typewriter-text': displayList.sentence3.showCursor }"
        >
          {{ this.displayList.sentence3.displayedSentence }}
        </div>
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
      displayList: {
        sentence1: {
          sentence: "Hi!",
          displayedSentence: "",
          showCursor: false,
          counter: 0,
          steps: 3,
        },
        sentence2: {
          sentence: "I'm Sanjay Soundarajan :)",
          displayedSentence: "",
          showCursor: false,
          counter: 0,
          steps: 11,
        },
        sentence3: {
          sentence: "Nice to meet  you :)",
          displayedSentence: "",
          showCursor: false,
          counter: 0,
          steps: 20,
        },
      },
      orginalSentence1: "Hi!",
      displayedSentence1: " ",

      showCursor1: false,
      counter1: 0,
      orginalSentence2: "I'm Sanjay",
      displayedSentence2: " ",
      showCursor2: false,

      counter2: 0,
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
    };
  },
  methods: {
    typingFunction: function (key, interval, keepCursor = false) {
      let that = this;
      const keyString = key;
      const typingFunction = setInterval(function () {
        that.displayList[keyString].showCursor = true;
        if (
          that.displayList[keyString].counter >=
          that.displayList[keyString].sentence.length
        ) {
          that.displayList[keyString].displayedSentence =
            that.displayList[keyString].sentence;
          that.displayList[keyString].counter =
            that.displayList[keyString].sentence.length;
          clearInterval(typingFunction);
          if (!keepCursor) {
            that.displayList[keyString].showCursor = false;
          }
        } else {
          1;
          that.displayList[keyString].displayedSentence = that.displayList[
            keyString
          ].sentence.substring(0, that.displayList[keyString].counter);
          that.displayList[keyString].counter++;
        }
      }, interval / that.displayList[keyString].sentence.length);
    },
  },
  mounted() {
    let that = this;
    setTimeout(() => that.typingFunction("sentence1", 1000), 100);
    setTimeout(() => that.typingFunction("sentence2", 6000, true), 1500);
    // setTimeout(() => that.typingFunction("sentence3", 4000, true), 4800);
  },
};
</script>

<style>
#app {
  color: #2c3e50;
}

.typewriter-text {
  width: max-content;
}

.typewriter-text::after {
  content: "";
  position: absolute;
  top: -5px;
  right: 0;
  bottom: -5px;
  left: 100%;
  width: 0.125em;
  background: white;
}

.typewriter-text::after {
  animation: blink 700ms infinite;
}

@keyframes blink {
  to {
    background: transparent;
  }
}
</style>
