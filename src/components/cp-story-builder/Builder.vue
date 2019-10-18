<template>
    <div>
        <h1>CP短打生成器</h1>
        <div class="row">
            <div class="col-6">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="gong-fang">攻</label>
                    </div>
                    <input type="text" id="gong-fang" v-model="gong" class="form-control"/>
                </div>
            </div>
            <div class="col-6">
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="shou-fang">受</label>
                    </div>
                    <input type="text" id="shou-fang" v-model="shou" class="form-control"/>
                </div>
            </div>
        </div>
        <div class="m-2">
            <button class="btn btn-success mr-1" @click="writeStory" :disabled="gong === '' || shou === ''">{{btnText}}</button>
            <button class="btn btn-primary" @click="emailStory">投稿</button>
        </div>
        <div>
            {{ story }}
        </div>
        <p class="mb-0 mt-4"><small>文库更新于 2019.10.18 3:45PM</small></p>
    </div>
</template>

<script>
  import stories from '../../assets/story'
  export default {
    name: "Search",
    data: () => {
      return {
        gong: "",
        shou: "",
        story: ""
      }
    },
    methods: {
      writeStory: function () {
        let index;
        if (this.story === "") {
          index = 0
        } else {
          index = Math.floor(Math.random() * this.availableStories.length);
        }
        this.story = this.availableStories[index]
        .replace(new RegExp("<攻>", 'g'), this.gong)
        .replace(new RegExp("<受>", 'g'), this.shou);
        return this.story
      },
      emailStory: function () {
        window.open('mailto:mxhcpstories@yahoo.com?subject=投稿梅溪湖小故事&body=（请用\'<攻>\'和\'<受>\'注明故事的攻受。内容请勿超过50字。）');
      },
      shuffle: function (array){
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    },
    computed: {
      availableStories: function () {
        let filteredStories = [];
        for (let i=0; i < stories.length; i++) {
          let roleGong = stories[i]['roles']['gong'];
          let roleShou = stories[i]['roles']['shou'];
          let roleStories = stories[i]['stories'];
          if (roleGong === 'ALL' || this.gong.includes(roleGong)){
            if (roleShou === 'ALL' || this.shou.includes(roleShou)) {
              this.shuffle(roleStories);
              filteredStories = filteredStories.concat(roleStories);
            }
          }
        }
        return filteredStories;
      },
      btnText: function () {
        if (this.story !== '') {
          return "再生一个"
        } else {
          return "生成故事"
        }
      }
    }
  }
</script>

<style scoped>

</style>