<template>
  <div id="app" v-cloak>
    <img alt="MXH36" src="./assets/mxh36.jpg">
    <div class="card" hidden>
      <div class="card-body">
        <Quiz />
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <search></search>
      </div>
    </div>
  </div>
</template>

<script>
import Quiz from './components/partner-matcher/Quiz.vue'
import Search from './components/cp-story-builder/Builder.vue'

export default {
  name: 'app',
  components: {
    Quiz,
    Search
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
