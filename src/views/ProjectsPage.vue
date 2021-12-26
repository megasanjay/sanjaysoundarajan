<template>
  <div class="relative">some projects</div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "ProjectsPage",
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
