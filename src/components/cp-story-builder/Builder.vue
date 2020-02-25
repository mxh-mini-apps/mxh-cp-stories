<template>
    <div>
        <h1 class="card-header text-white bg-primary">CP短打生成器</h1>
        <div class="card-body row">
            <div class="col-6">
                <div class="input-group mb-2" :class="isSpecial">
                    <div class="input-group-prepend">
                        <label class="input-group-text" :class="isSpecial" for="gong-fang">主角A</label>
                    </div>
                    <input type="text" id="gong-fang" v-model="gong" class="form-control"/>
                </div>
            </div>
            <div class="col-6">
                <div class="input-group mb-2" :class="isSpecial">
                    <div class="input-group-prepend">
                        <label class="input-group-text" :class="isSpecial" for="shou-fang">主角B</label>
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
            <button class="btn btn-info" @click="emailStory">投稿</button>
        </div>
        <div class="text-left ml-4 mr-4">
            <p id="story">{{ story }}</p>
            <p hidden id="title" v-if="story !== ''" class="text-center">——《{{ title }}》</p>
        </div>
        <div class="m-2">
            <p class="mb-0 mt-4">
                <small>文库更新于 2020.02.25 2:00PM</small><br>
                <small>已收录短打文段：{{availableStories.stories.length}}</small>
                <small v-if="availableStories.specialCount>0">（包含{{availableStories.specialCount}}篇定制文）</small>
            </p>
            <p><small><strong>疫情期间大家要勤洗手多通风，好好照顾自己哦！</strong></small></p>
            <span class="badge badge-info">更新29篇</span>
            <span class="badge badge-danger ml-2">开放投稿</span>
        </div>
    </div>
</template>

<script>
  import stories from '../../assets/story'
  import titles from '../../assets/title'
  import leaders from '../../assets/leaders'
  export default {
    name: "Search",
    data: () => {
      return {
        gong: "",
        shou: "",
        story: "",
        title: "",
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
        this.title = this.makeTitle();
        this.changedCouple = false;
        return this.story
      },
      makeTitle: function () {
        let title;
        let struct = titles.structure[this.genRandom(titles.structure.length)];

        const verbs = titles.verbs;
        const adjs = titles.adjs;
        const nouns = titles.nouns;
        const sayings = titles.saying;
        switch (struct) {
          case "V+N":
            title = verbs[this.genRandom(verbs.length)] + "的" +
              nouns[this.genRandom(nouns.length)];
            break;
          case "N+N":
            title = nouns[this.genRandom(nouns.length)] + '与' +
            nouns[this.genRandom(nouns.length)];
            break;
          case "A+N":
            title = adjs[this.genRandom(adjs.length)] +
              nouns[this.genRandom(nouns.length)];
            break;
          case "N":
            title = nouns[this.genRandom(nouns.length)];
            break;
          case "A":
            title = adjs[this.genRandom(adjs.length)].replace(/的/,'');
            break;
          case "V":
            title = verbs[this.genRandom(verbs.length)];
            break;
          case "S":
            title = sayings[this.genRandom(sayings.length)];
            break;
          default:
            title = '';
        }
        return title;
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
        let gong = g.replace(/\s/g,'').toLowerCase();
        let shou = s.replace(/\s/g,'').toLowerCase();
        return leaders.find(a => gong.includes(a)) !== undefined || leaders.find(a => shou.includes(a)) !== undefined;
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
      },
      genRandom: function (len) {
        return Math.floor(Math.random() * len)
      }
    },
    computed: {
      availableStories: function () {
        let filteredStories = [];
        let specialCount = 0;
        let foundSpecialStory = false;
        for (let i=0; i < stories.length; i++) {
          let roleGong = stories[i]['roles']['gong'];
          let roleShou = stories[i]['roles']['shou'];
          let roleStories = stories[i]['stories'];
          if (roleGong === 'ALL' || this.gong.includes(roleGong)){
            if (roleShou === 'ALL' || this.shou.includes(roleShou)) {
              // if this isn't in the last category, then it is a special story
              if (i !== stories.length - 1) {
                foundSpecialStory = true;
                specialCount += stories[i]['stories'].length;
                this.$forceUpdate()
              }
              this.shuffle(roleStories);
              filteredStories = filteredStories.concat(roleStories);
            }
          }
        }
        return {"stories": filteredStories, "hasSpecialStory": foundSpecialStory, "specialCount": specialCount};
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