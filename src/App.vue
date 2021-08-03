<template>
  <the-header></the-header>
  <div class="relative">
    <Particles
      class=" "
      id="tsparticles"
      :options="{
        background: { color: { value: '#f8f9fa' } },
        fullScreen: { enable: true, zIndex: -1 },
        interactivity: {
          detect_on: 'window',
          events: {
            onClick: { enable: true, mode: 'push' },
            onHover: { enable: true, parallax: { enable: true, force: 100 } },
          },
          modes: { grab: { distance: 50 } },
        },
        particles: {
          color: { value: 'random' },
          move: {
            attract: { rotate: { x: 600, y: 1200 } },
            enable: true,
            outModes: { bottom: 'out', left: 'out', right: 'out', top: 'out' },
            speed: 0.2,
          },
          number: { density: { enable: true, value_area: 800 }, value: 5 },
          size: { value: 10 },
          shape: {
            type: ['character', 'image'],
            character: [
              {
                fill: true,
                font: 'Verdana',
                value: ['❌', '✖️', '🟠', '🛆', '⛛', '🔳'],
              },
            ],
            image: [
              {
                src: 'https://particles.js.org/images/fruits//apple.png',
                width: 32,
                height: 32,
              },
              {
                src: 'https://particles.js.org/images/fruits//avocado.png',
                width: 32,
                height: 32,
              },
            ],
          },
        },
        detectRetina: true,
      }"
    />

    <div class="flex flex-col justify-center items-center h-screen ">
      <div
        class=" text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono relative typewriter-text"
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
  background: black;
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
