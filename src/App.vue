<template>
  <div id="app" v-cloak class="m-1">
    <div class="card m-1">
      <div class="card-body">
        <builder></builder>
      </div>
    </div>
    <p style="color: gray;"><small><strong>软件声明</strong></small><br>
    <small>
      此软件只限用于休闲娱乐，所有故事均为匿名投稿提供。如有雷同，纯属巧合。CP短打生成器作者将保有一切解释权。
      新的投稿会尽快更新，但由于都是作者亲自审核，精力有限还请谅解。<br>
      <strong>温馨提示</strong><br>
      <li>投稿甜梗也可虐梗也可，请尽量不要成人开车</li>
      <li>如果生成器中发现有段子未经原创授权请发邮件联系作者下架</li>
      <li>由于大家投稿非常踊跃手动整理起来真的很费时，投稿功能会定期关闭，还请大家谅解</li>
      <li>如果出现比较具体的细节且没有备注定制文，软件作者可能会适度改梗，如果无法接受请联系作者。</li>
      <li>看到有网友好奇就解释一下，mxh=梅溪湖=声入人心，昨天收到了很多其他圈优秀的投稿，欢迎大家！</li>
      如有疑问或者发现了bug，请联系作者。<br>联系方式：mxhcpstories@yahoo.com<br>
    </small>
    </p>
  </div>
</template>

<script>
import Builder from './components/cp-story-builder/Builder.vue'

export default {
  name: 'app',
  components: {
    Builder
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
