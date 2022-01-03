<template>
  <section>
    <div
      class="flex flex-row justify-around items-center py-10 max-w-screen-xl mx-auto h-screen px-5"
    >
      <div class="flex flex-col justify-center items-center w-full">
        <div class="w-full h-max overflow-hidden">
          <div class="reveal-text font-semibold flex items-center">
            <span class="text-white text-[50px] lg:text-[100px]">
              Hi! I'm Sanjay
            </span>
            <span class="wave text-[50px] lg:text-[70px] font-thin mt-3 ml-2">
              👋🏾
            </span>
          </div>
        </div>
        <div class="w-full h-max relative overflow-hidden">
          <div class="reveal-text text-white font-semibold">
            <span class="text-white text-[30px] lg:text-[50px]">
              I'm a front-end developer and I'm currently work on building web
              applications for the future of open science.
            </span>
          </div>
        </div>
        <div class="flex justify-start w-full py-4 mt-3">
          <BubblyButton :callback="navigateToContact">
            Contact Me
          </BubblyButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BubblyButton from "@components/UI/BubblyButton.vue";

export default {
  name: "HomePage",
  components: {
    BubblyButton,
  },
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
            toggleActions: "play none none none",
          },
        }
      );
    },
    navigateToContact() {
      this.$router.push("/contact");
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
