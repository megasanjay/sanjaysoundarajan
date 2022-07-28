<template>
  <div class="relative">
    <div class="flex flex-col justify-center items-center h-screen">
      <transition>
        <div
          class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-mono text-left"
        >
          <div
            class="relative my-5 whitespace-pre"
            :class="{ 'typewriter-text': displayList.sentence1.showCursor }"
          >
            {{ displayList.sentence1.displayedSentence }}
          </div>
          <div
            class="relative my-5 whitespace-pre"
            :class="{ 'typewriter-text': displayList.sentence2.showCursor }"
          >
            {{ displayList.sentence2.displayedSentence }}
          </div>
          <div
            class="relative my-5 whitespace-pre"
            :class="{ 'typewriter-text': displayList.sentence3.showCursor }"
          >
            {{ displayList.sentence3.displayedSentence }}
          </div>
          <div class="invisible" aria-hidden="true">
            {{ displayList.sentence2.sentence }}
          </div>
        </div>
      </transition>
      <div class="flex flex-row justify-center items-center">
        <a
          href="https://github.com/megasanjay"
          class="github-logo"
          rel="external"
        >
          <svg
            id="f2a89a55-dcee-451f-8c2b-a8c7f295aa0d"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            class="w-36"
            viewBox="0 0 360.18 97.41"
          >
            <path
              d="M177.28,137H147a1.41,1.41,0,0,0-1.41,1.41v14.8a1.42,1.42,0,0,0,1.41,1.42h11.81V173s-2.65.91-10,.91c-8.65,0-20.73-3.16-20.73-29.73s12.58-30.06,24.39-30.06c10.22,0,14.63,1.8,17.43,2.66a1.42,1.42,0,0,0,1.69-1.38L175,101.1a1.31,1.31,0,0,0-.54-1.11c-1.14-.81-8.08-4.69-25.62-4.69-20.21,0-40.93,8.59-40.93,49.92s23.73,47.48,43.72,47.48c16.56,0,26.61-7.07,26.61-7.07a1.22,1.22,0,0,0,.45-1.07V138.4A1.41,1.41,0,0,0,177.28,137Z"
              transform="translate(-107.91 -95.3)"
              fill="#fff"
            />
            <path
              d="M333.26,100.25a1.4,1.4,0,0,0-1.4-1.42h-17a1.41,1.41,0,0,0-1.41,1.42v32.93H286.85V100.25a1.41,1.41,0,0,0-1.41-1.42h-17a1.41,1.41,0,0,0-1.41,1.42v89.18a1.42,1.42,0,0,0,1.41,1.42h17a1.42,1.42,0,0,0,1.41-1.42V151.28h26.56l-.05,38.15a1.43,1.43,0,0,0,1.42,1.42h17.08a1.41,1.41,0,0,0,1.4-1.42Z"
              transform="translate(-107.91 -95.3)"
              fill="#fff"
            />
            <path
              d="M209.44,112a11,11,0,1,0-11,11.1A11,11,0,0,0,209.44,112Z"
              transform="translate(-107.91 -95.3)"
              fill="#fff"
            />
            <path
              d="M208.22,170.61V129.45a1.42,1.42,0,0,0-1.41-1.42h-17a1.61,1.61,0,0,0-1.47,1.58v59c0,1.73,1.08,2.25,2.47,2.25h15.31c1.68,0,2.09-.83,2.09-2.28Z"
              transform="translate(-107.91 -95.3)"
              fill="#fff"
            />
            <path
              d="M398,128.16H381.12a1.43,1.43,0,0,0-1.41,1.43v43.73a19.09,19.09,0,0,1-10.39,3.14c-6.1,0-7.72-2.77-7.72-8.74V129.59a1.42,1.42,0,0,0-1.4-1.43H343a1.43,1.43,0,0,0-1.41,1.43v41c0,17.73,9.89,22.07,23.49,22.07,11.15,0,20.14-6.16,20.14-6.16a34,34,0,0,0,.63,3.63,1.47,1.47,0,0,0,1.24.77l10.92,0a1.43,1.43,0,0,0,1.41-1.43V129.59A1.42,1.42,0,0,0,398,128.16Z"
              transform="translate(-107.91 -95.3)"
              fill="#fff"
            />
            <path
              d="M444.25,126.16a31.75,31.75,0,0,0-16.13,4.29v-30.2a1.41,1.41,0,0,0-1.41-1.42H409.62a1.41,1.41,0,0,0-1.41,1.42v89.18a1.42,1.42,0,0,0,1.41,1.42h11.86a1.42,1.42,0,0,0,1.24-.75,28.5,28.5,0,0,0,.72-4.12s7,6.63,20.21,6.63c15.53,0,24.44-7.88,24.44-35.37S453.87,126.16,444.25,126.16Zm-6.67,50.25a20.24,20.24,0,0,1-9.84-2.85V145.32a22.54,22.54,0,0,1,8.74-2.83c6.09-.55,12,1.29,12,15.82C448.44,173.63,445.79,176.65,437.58,176.41Z"
              transform="translate(-107.91 -95.3)"
              fill="#fff"
            />
            <path
              d="M257.2,128H244.42l0-16.89c0-.64-.33-1-1.07-1H225.91c-.68,0-1,.3-1,1v17.45s-8.73,2.11-9.32,2.28a1.42,1.42,0,0,0-1,1.36v11a1.41,1.41,0,0,0,1.41,1.42h8.93V171c0,19.59,13.74,21.52,23,21.52A38.91,38.91,0,0,0,258,190.84a1.33,1.33,0,0,0,.8-1.28V177.5a1.44,1.44,0,0,0-1.41-1.43c-.75,0-2.65.31-4.62.31-6.27,0-8.4-2.92-8.4-6.7V144.6H257.2a1.41,1.41,0,0,0,1.41-1.42V129.44A1.42,1.42,0,0,0,257.2,128Z"
              transform="translate(-107.91 -95.3)"
              fill="#fff"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "HomePage",
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
          sentence: "I'm Sanjay Soundarajan",
          displayedSentence: "",
          showCursor: false,
          counter: 0,
          steps: 11,
        },
        sentence3: {
          sentence: "Nice to meet you :)",
          displayedSentence: "",
          showCursor: false,
          counter: 0,
          steps: 20,
        },
      },
    };
  },
  methods: {
    typingFunction: function (key, interval, keepCursor = false) {
      let that = this;
      const keyString = key;
      const typingFunction = setInterval(function () {
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
          that.displayList[keyString].showCursor = true;
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
    setTimeout(() => that.typingFunction("sentence2", 5500), 1500);
    setTimeout(() => that.typingFunction("sentence3", 4000, true), 7500);

    gsap.fromTo(
      ".github-logo",
      { opacity: 0, y: 40, delay: 10 },
      { opacity: 1, y: 0, duration: 2, delay: 12 }
    );
  },
};
</script>

<style lang="postcss" scoped>
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
