<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <the-header></the-header>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
 import TheHeader from './components/UI/TheHeader.vue'

export default {
  name: 'App',
  components: {
    TheHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
