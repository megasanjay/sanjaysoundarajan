<template>
  <the-header></the-header>

  <div class="relative">
    <Particles
      class="absolute h-full w-full"
      id="tsparticles"
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
              distance: 200,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
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
            distance: 50,
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
            random: true,
            speed: 10,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 200,
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
