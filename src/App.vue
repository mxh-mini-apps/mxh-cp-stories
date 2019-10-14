<template>
  <div id="app" v-cloak class="m-1">
    <div class="card" hidden>
      <div class="card-body">
        <Quiz />
      </div>
    </div>
    <div class="card m-1">
      <div class="card-body">
        <search></search>
      </div>
    </div>
    <p><small><strong>软件声明</strong></small><br>
    <small>此软件只限用于休闲娱乐，所有故事均为匿名投稿提供。如有雷同，纯属巧合。CP短打生成器作者将保有一切解释权。</small></p>
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
