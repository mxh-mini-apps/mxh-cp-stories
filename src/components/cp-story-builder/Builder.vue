<template>
    <div>
        <h1 class="card-header text-white bg-primary">CP短打生成器</h1>
        <div class="card-body row">
            <div class="col-6">
                <div class="input-group mb-2" :class="isSpecial">
                    <div class="input-group-prepend">
                        <label class="input-group-text" :class="isSpecial" for="gong-fang">攻</label>
                    </div>
                    <input type="text" id="gong-fang" v-model="gong" class="form-control"/>
                </div>
            </div>
            <div class="col-6">
                <div class="input-group mb-2" :class="isSpecial">
                    <div class="input-group-prepend">
                        <label class="input-group-text" :class="isSpecial" for="shou-fang">受</label>
                    </div>
                    <input type="text" id="shou-fang" v-model="shou" class="form-control"/>
                </div>
            </div>
        </div>
        <div class="m-2">
            <button class="btn btn-success mr-1" @click="writeStory" id="write-story" :class="isSpecial"
                    :disabled="gong === '' || shou === ''">
                {{btnText}}
            </button>
            <button class="btn btn-info" @click="emailStory" disabled>投稿</button>
        </div>
        <div class="text-left ml-4 mr-4">
            <p id="story">{{ story }}</p>
        </div>
<!--        <div v-if="story !== ''">-->
<!--            <button class="btn btn-light btn-sm border mb-1" type="button" data-toggle="collapse" data-target="#collapseText" aria-expanded="false" aria-controls="collapseText">-->
<!--                作者的话-->
<!--            </button>-->
<!--            <div class="collapse" id="collapseText">-->
<!--                <div class="card card-body p-2">-->
<!--                    <small>-->
<!--                    </small>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <div class="m-2">
            <p class="mb-0 mt-4"><small>文库更新于 2019.10.24 12:00PM</small></p>
            <span class="badge badge-warning">新功能：解锁定制文提示</span>
            <span class="badge badge-secondary ml-2">暂停投稿</span>
        </div>
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
        clicks: 0,
        changedCouple: false
      }
    },
    methods: {
      writeStory: function () {
        this.clicks = this.clicks + 1;
        this.sendAnalytics();
        let index;
        if (this.changedCouple) {
          index = 0
        } else {
          index = Math.floor(Math.random() * this.availableStories.stories.length);
        }
        if (!this.isSpecialNames(this.gong, this.shou)){
          this.story = this.availableStories.stories[index]
          .replace(new RegExp("<攻>", 'g'), this.gong)
          .replace(new RegExp("<受>", 'g'), this.shou);
        } else {
          this.story = ""
        }
        this.changedCouple = false;
        return this.story
      },
      sendAnalytics: function () {
        this.$ga.event({
          eventCategory: 'Write Story',
          eventAction: 'click',
          eventLabel: this.couple,
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
        let foundSpecialStory = false;
        for (let i=0; i < stories.length; i++) {
          let roleGong = stories[i]['roles']['gong'];
          let roleShou = stories[i]['roles']['shou'];
          let roleStories = stories[i]['stories'];
          if (roleGong === 'ALL' || this.gong.includes(roleGong)){
            if (roleShou === 'ALL' || this.shou.includes(roleShou)) {
              if (i !== stories.length - 1) {
                foundSpecialStory = true;
                this.$forceUpdate()
              }
              this.shuffle(roleStories);
              filteredStories = filteredStories.concat(roleStories);
            }
          }
        }
        return {"stories": filteredStories, "hasSpecialStory": foundSpecialStory};
      },
      btnText: function () {
        if (this.availableStories.hasSpecialStory && this.changedCouple) {
          return "解锁定制故事"
        } else if (this.story !== '' && !this.changedCouple) {
          return "再生一个"
        } else {
          return "生成故事"
        }
      },
      isSpecial: function () {
        return this.availableStories.hasSpecialStory ? 'special':''
      },
      couple: function () {
        return this.gong + ' ' + this.shou
      }
    },
    watch: {
      couple: function (newCouple, oldCouple) {
        if (newCouple !== oldCouple) {
          this.changedCouple = true;
        }
      }
    }
  }
</script>

<style scoped>
    #story {
        white-space: pre-wrap;
    }
    .special .form-control {
        border-color: lightcoral !important;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(255, 127, 80, 0.51) !important;
    }
    .special .input-group-text {
        border-color: lightcoral !important;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(255, 127, 80, 0.5) !important;
    }
    #write-story.special {
        background-color: lightsalmon;
        border-color: salmon;
    }
    #write-story.special:focus {
        border-color: salmon !important;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(255, 127, 80, 0.5) !important;
    }
    .input-group-text.special {
        background-color: lightcoral;
        border-color: coral;
        color: white;
    }
</style>