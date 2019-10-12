<template>
    <div class="row">
        <div class="col-lg-12 mb-2">
            <h1>{{ title }}</h1>
            <p>像深深一样有趣可爱？像嘎子一样勤奋刻苦？还是像黄子一样活泼调皮？</p>
            <p>梅溪湖36子谁与你最合拍，赶快来测试吧！</p>
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "StartPage",
    props: ['title']
  }
</script>

<style scoped>

</style>