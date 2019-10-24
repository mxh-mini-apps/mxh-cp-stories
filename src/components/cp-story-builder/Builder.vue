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
        <div class="text-left ml-4 mr-4">
            <p id="story">{{ story }}</p>
        </div>
        <p class="mb-0 mt-4"><small>文库更新于 2019.10.24 12:00PM</small></p>
        <span class="badge badge-info">新增25篇</span>
        <span class="badge badge-secondary ml-2">开放投稿</span>
    </div>
</template>

<script>
  import stories from '../../assets/story'
  import leaders from '../../assets/leaders'
  export default {
    name: "Search",
    data: () => {
      return {
        gong: "",
        shou: "",
        story: "",
        clicks: 0
      }
    },
    methods: {
      writeStory: function () {
        this.clicks = this.clicks + 1;
        this.sendAnalytics();
        let index;
        if (this.story === "") {
          index = 0
        } else {
          index = Math.floor(Math.random() * this.availableStories.length);
        }
        if (!this.isSpecialNames(this.gong, this.shou)){
          this.story = this.availableStories[index]
          .replace(new RegExp("<攻>", 'g'), this.gong)
          .replace(new RegExp("<受>", 'g'), this.shou);
        } else {
          this.story = ""
        }
        return this.story
      },
      sendAnalytics: function () {
        this.$ga.event({
          eventCategory: 'Write Story',
          eventAction: 'click',
          eventLabel: this.gong + ' ' + this.shou,
          eventValue: this.clicks
        })
      },
      isSpecialNames: function (g, s) {
        return leaders.includes(g.replace(/\s/g,'').toLowerCase()) ||
          leaders.includes(s.replace(/\s/g,'').toLowerCase());
      },
      emailStory: function () {
        let c = 'mailto:mxhcpstories@yahoo.com?subject=投稿CP短打文&body=（请用\'<攻>\'和\'<受>\'注明故事的攻受，如果想投定制文的话请备注人物姓名哦！内容请勿超过50字。）';
        window.open(c);
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
    #story {
        white-space: pre-wrap;
    }
</style>