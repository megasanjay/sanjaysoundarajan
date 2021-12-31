<template>
  <header
    class="sticky top-0 left-0 z-10 px-4 pt-4 flex justify-between w-full backdrop-blur-sm"
  >
    <div
      class="w-full max-w-screen-2xl flex flex-row justify-between z-20 pt-2 px-5 mx-auto"
    >
      <!-- name svg -->
      <router-link
        to="/"
        class="z-20 text-transparent bg-clip-text bg-gradient-to-br font-inter font-bold text-3xl sm:text-4xl md:text-5xl pb-1"
        :class="{
          'from-pink-400': !menuOpen,
          'to-red-600': !menuOpen,
          invisible: menuOpen,
        }"
        aria-label="Homepage"
      >
        Sanjay Soundarajan
      </router-link>

      <div
        class="hamburger p-1 group"
        :class="{ active: hamburgerToggle }"
        @click="toggleMenu"
      >
        <span class="bar bg-gradient-to-r from-red-600 to-pink-500"></span>
        <span class="bar bg-gradient-to-r from-red-600 to-pink-500"></span>
        <span class="bar bg-gradient-to-r from-red-600 to-pink-500"></span>
      </div>
    </div>
    <div
      v-show="menuOpen"
      class="newMenu w-full h-screen z-10 absolute top-0 left-0 bg-[#1F2937] blur-background"
    >
      <div class="blob blue-blob fill-current text-orange-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371.5 297.7">
          <path
            d="M286.9 54.2c42.7 34.9 89.4 85.3 84.2 130.4-5.2 45.1-62.1 84.7-118 102.3S142.3 300 94.8 278C47.2 256 6.9 216.6.8 173.9S22.7 85.2 56 52.4C89.4 19.6 127.9.1 166.6 0s77.6 19.2 120.3 54.2z"
          ></path>
        </svg>
      </div>
      <div class="blob green-blob fill-current text-pink-500 sm:text-pink-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371.5 297.7">
          <path
            d="M286.9 54.2c42.7 34.9 89.4 85.3 84.2 130.4-5.2 45.1-62.1 84.7-118 102.3S142.3 300 94.8 278C47.2 256 6.9 216.6.8 173.9S22.7 85.2 56 52.4C89.4 19.6 127.9.1 166.6 0s77.6 19.2 120.3 54.2z"
          ></path>
        </svg>
      </div>
      <div
        class="w-full h-full flex justify-evenly items-center backdrop-filter backdrop-blur-[70px] sm:backdrop-blur-[200px]"
      >
        <div class="flex flex-col sm:flex-row justify-evenly">
          <div class="flex flex-col pages-panel mb-8 sm:mb-0 sm:p-20">
            <div class="h-[1px] w-[1px] text-transparent pointer-events-none">
              .
            </div>
            <router-link
              :to="page.href"
              class="text-5xl page-item py-3 my-3 nav-item hover-underline-animation font-ubuntu font-bold text-white"
              :aria-label="page.name"
              v-for="page in pages"
              :key="page.name"
              @click="toggleMenu"
            >
              {{ page.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import gsap from "gsap";

export default {
  name: "TheHeader",
  data() {
    return {
      menuOpen: false,
      hamburgerToggle: false,
      scrolled: false,
      pages: [
        { name: "Home", href: "/" },
        { name: "Projects", href: "/projects" },
        { name: "About", href: "/projects" },
        { name: "Contact", href: "/projects" },
      ],
    };
  },
  methods: {
    toggleMenu() {
      if (this.menuOpen) {
        this.hamburgerToggle = false;
        gsap
          .fromTo(
            ".page-item",
            { opacity: 1, y: "0%" },
            {
              opacity: 0,
              duration: 0.1,
              y: "-75%",

              stagger: {
                each: 0.1,
                from: "start",
                ease: "power1.Out",
              },
            }
          )
          .then(() => {
            document.body.classList.remove("overflow-hidden");
            this.menuOpen = false;
          });
      } else {
        this.hamburgerToggle = true;
        // hiding content so open menu

        gsap.fromTo(
          ".page-item",
          { opacity: 0, y: "-75%" },
          {
            duration: 0.1,
            opacity: 1,
            y: "0%",
            delay: 0.1,
            stagger: {
              each: 0.1,
              from: "start",
              ease: "power1.inOut",
            },
          }
        );

        document.body.classList.add("overflow-hidden");
        this.menuOpen = true;
      }
    },
    handleScroll() {
      if (window.scrollY > 0) {
        this.scrolled = true;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style language="postcss" scoped>
.hamburger {
  display: block;
  @apply z-20 cursor-pointer relative;
}

.bar {
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  @apply block rounded-sm;
  @apply w-[25px] h-[4px] my-[3px] mx-auto;
}

.hamburger.active .bar {
  @apply bg-sky-500;
}

.hamburger.active .bar:nth-child(2) {
  @apply w-[25px] h-[4px] my-[3px] mx-auto;
  opacity: 0;
}

.hamburger.active .bar:nth-child(1) {
  @apply w-[25px] h-[4px] my-[3px] mx-auto;
  transform: translateY(8px) rotate(45deg);
}

.hamburger.active .bar:nth-child(3) {
  @apply w-[25px] h-[4px] my-[3px] mx-auto;
  transform: translateY(-6px) rotate(-45deg);
}

.blob {
  position: absolute;
  top: 0;
  left: 0;
  width: 50vmax;
  z-index: -1;
  transform-origin: 50% 50%;
}
.blue-blob {
  animation: move1 20s ease-in-out infinite;
}

.green-blob {
  animation: move2 15s ease-in-out infinite;
}

@keyframes move1 {
  0% {
    transform: scale(1) translate(10px, -30px);
  }

  38% {
    transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg);
  }
  40% {
    transform: scale(0.8, 1) translate(80vw, 30vh) rotate(160deg);
  }
  78% {
    transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg);
  }
  80% {
    transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg);
  }

  100% {
    transform: scale(1) translate(10px, -30px);
  }
}

@keyframes move2 {
  0% {
    transform: scale(1) translate(10px, -30px);
  }

  38% {
    transform: scale(0.8, 1) translate(70vw, 40vh) rotate(160deg);
  }
  40% {
    transform: scale(0.8, 1) translate(70vw, 40v) rotate(160deg);
  }
  78% {
    transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg);
  }
  80% {
    transform: scale(1.3) translate(0vw, 50vh) rotate(-20deg);
  }

  100% {
    transform: scale(1) translate(10px, -30px);
  }
}
</style>
