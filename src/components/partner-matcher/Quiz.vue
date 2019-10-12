<template>
    <div>
        <start-page v-if="showComponent === 'start'" :title="quiz.title">
            <button disabled class="btn btn-primary" @click="showComponent = 'questions'">开始测试</button>
        </start-page>
        <questions v-if="showComponent === 'questions'" :questions="quiz.questions" :questionIndex="questionIndex">
            <button class="btn btn-primary m-1" v-if="questionIndex > 0" v-on:click="prev">
                上一题
            </button>
            <button class="btn btn-primary m-1" v-on:click="next">
                下一题
            </button>
        </questions>
        <end-page v-if="showComponent === 'end'"></end-page>
    </div>
</template>

<script>
  import quiz from '../../assets/quiz'
  import StartPage from './StartPage'
  import Questions from './Questions'
  import EndPage from './EndPage'
  export default {
    name: "Quiz",
    components: {
      StartPage,
      Questions,
      EndPage
    },
    data: function () {
      return {
        quiz: quiz,
        showComponent: 'start',
        questionIndex: 0
      }
    },
    methods: {
      // Go to next question
      next: function() {
        this.questionIndex++;
      },
      // Go to previous question
      prev: function() {
        this.questionIndex--;
      },
      score: function() {
        //find the highest occurrence` in responses
        let modeMap = {};
        let maxEl = this.userResponses[0],
          maxCount = 1;
        for (let i = 0; i < this.userResponses.length; i++) {
          let el = this.userResponses[i];
          if (modeMap[el] == null)
            modeMap[el] = 1;
          else
            modeMap[el]++;
          if (modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
          }
        }
        return maxEl;
      },
      restart: function () {
        this.questionIndex = 0;
        this.userResponses = [];
      }
    }
  }
</script>

<style scoped>
#app {
    min-height: 100vh;

    background: #BBC7CE;
}

#app > .row {
    background: #fff;
}

h1 {
    margin-bottom: 20px;
}

[v-cloak] {
    display: none;
}
</style>