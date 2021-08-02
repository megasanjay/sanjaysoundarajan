<template>
  <the-header></the-header>
  <div class="relative">
    <div class="flex flex-col justify-center items-center h-screen">
      <h1
        class=" text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono relative construction"
      >
        Page under construction...
      </h1>
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

h1::before,
h1::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: -5px;
  left: 0;
}

h1::before {
  background: #fff;
  animation: typewriter 4s steps(26) 1s forwards;
}

h1::after {
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
