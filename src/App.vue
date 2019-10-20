<template>
  <div id="app" v-cloak class="m-1">
    <div class="card m-1">
      <div class="card-body">
        <builder></builder>
      </div>
    </div>
    <p><small><strong>软件声明</strong></small><br>
    <small>
      此软件只限用于休闲娱乐，所有故事均为匿名投稿提供。如有雷同，纯属巧合。CP短打生成器作者将保有一切解释权。
      新的投稿会尽量在第二天更新的，但由于都是作者亲自审核，精力有限还请谅解。
      据说这个程序出圈了（瑟瑟发抖ing）承蒙大家厚爱！新的投稿如果没有备注定制文且出现比较具体的细节，
      如国籍、公司等，作者可能会适度改梗，如果无法接受这种情况请联系作者并重新投稿定制文。此外，甜梗也可虐梗也可，请尽量不要成人开车啊！谢谢谢谢谢谢谢。<br>
      联系方式：mxhcpstories@yahoo.com<br>
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
