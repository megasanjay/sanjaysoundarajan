<template>
  <section>
    <div
      class="flex flex-row justify-around items-center py-10 max-w-screen-xl mx-auto h-screen"
    >
      <div class="flex flex-col justify-center items-center w-full">
        <div class="w-full h-[150px] relative overflow-hidden flex">
          <div class="reveal-text absolute font-semibold flex items-center">
            <span class="text-white text-[100px]">Hi! I'm Sanjay.</span>
            <span class="wave text-[70px] font-thin">👋🏾</span>
          </div>
        </div>
        <div class="w-full h-[150px] relative overflow-hidden">
          <div
            class="reveal-text absolute text-[100px] text-white font-semibold"
          >
            I'm Sanjay.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: "HomePage",
  data() {
    return {
      dev: process.env.NODE_ENV === "development",
    };
  },
  methods: {
    revealHeaderText() {
      gsap.fromTo(
        ".reveal-text",
        { y: "100%" },
        {
          duration: 0.5,
          y: "0%",
          stagger: {
            each: 0.5,
            from: "start",
            ease: "power1.out",
          },
          scrollTrigger: {
            trigger: ".reveal-text",
            markers: this.dev,
            start: "top center",
            toggleActions: "restart none none none",
          },
        }
      );
    },
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    this.revealHeaderText();
  },
};
</script>

<style lang="postcss" scoped>
.wave {
  animation-name: wave-animation; /* Refers to the name of your @keyframes element below */
  animation-duration: 2.5s; /* Change to speed up or slow down */
  animation-iteration-count: infinite; /* Never stop waving :) */
  transform-origin: 70% 70%; /* Pivot around the bottom-left palm */
}

@keyframes wave-animation {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  } /* The following five values can be played with to make the waving more or less extreme */
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  } /* Reset for the last half to pause */
  100% {
    transform: rotate(0deg);
  }
}
</style>
