<template>
  <div class="relative">
    <div class="flex flex-col justify-center items-center h-screen">
      <transition>
        <div
          class="
            text-2xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-black
            text-white
            font-mono
            text-left
          "
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
