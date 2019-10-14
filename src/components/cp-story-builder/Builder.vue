<template>
    <div>
        <h1>CP短打生成器</h1>
        <div class="row">
            <div class="col-6">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="gong-fang">攻</label>
                    </div>
<!--                    <select class="custom-select" id="gong-fang" v-model="gong">-->
<!--                        <option selected value="opt1">选择...</option>-->
<!--                        <option v-for="(name, index) in availableGong" :key="index">-->
<!--                            {{ name }}-->
<!--                        </option>-->
<!--                    </select>-->
                    <input type="text" id="gong-fang" v-model="gong" class="form-control"/>
                </div>
            </div>
            <div class="col-6">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="shou-fang">受</label>
                    </div>
<!--                    <select class="custom-select" id="shou-fang" v-model="shou">-->
<!--                        <option selected value="opt2">选择...</option>-->
<!--                        <option v-for="(name, index) in availableShou" :key="index">-->
<!--                            {{ name }}-->
<!--                        </option>-->
<!--                    </select>-->
                    <input type="text" id="shou-fang" v-model="shou" class="form-control"/>
                </div>
            </div>
        </div>
        <div class="m-2">
            <button class="btn btn-primary mr-1" @click="writeStory" :disabled="gong === null || shou === null">{{btnText}}</button>
            <button class="btn btn-secondary" @click="emailStory">投稿</button>
        </div>
        <div>
            {{ story }}
        </div>
    </div>
</template>

<script>
  import members from '../../assets/members'
  import stories from '../../assets/story'
  export default {
    name: "Search",
    data: () => {
      return {
        gong: null,
        shou: null,
        story: ""
      }
    },
    methods: {
      writeStory: function () {
        let index = Math.floor(Math.random() * stories.length);
        this.story = stories[index]
        .replace(new RegExp("<攻>", 'g'), this.gong)
        .replace(new RegExp("<受>", 'g'), this.shou);
        return this.story
      },
      emailStory: function () {
        window.open('mailto:mxhcpstories@yahoo.com?subject=投稿梅溪湖小故事&body=（请用\'<攻>\'和\'<受>\'注明故事的攻受。内容请勿超过30字。）');
      }
    },
    computed: {
      allMemberNames: function () {
        return Object.keys(members);
      },
      btnText: function () {
        if (this.story !== '') {
          return "再生一个"
        } else {
          return "生成故事"
        }
      },
      availableGong: function () {
        if (this.shou !== null) {
          return this.allMemberNames.filter((n) => {return n !== this.shou})
        } else {
          return this.allMemberNames
        }
      },
      availableShou: function () {
        if (this.gong !== null) {
          return this.allMemberNames.filter((n) => {return n !== this.gong})
        } else {
          return this.allMemberNames
        }
      }
    }
  }
</script>

<style scoped>

</style>