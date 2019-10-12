<template>
    <div class="callout m-2">
        <div v-for="(question, index) in questions" :key="index">
            <!-- Hide all questions, show only the one with index === to current question index -->
            <div v-show="index === questionIndex">
                <h3>{{ question.text }}</h3>
                <ul class="col-3 offset-5">
                    <!-- for each response of the current question -->
                    <li v-for="(response, i) in question.responses" :key="i">
                        <label>
                            <input type="radio"
                                   v-bind:value="response.value"
                                   v-bind:name="index"
                                   v-model="userResponses[index]"> {{response.text}}
                        </label>
                    </li>
                </ul>
                <!-- The two navigation buttons -->
                <!-- Note: prev is hidden on first question -->
                <slot></slot>
            </div>
        </div>

        <!-- Last page, quiz is finished, display result -->
        <div v-show="questionIndex === quiz.questions.length">
            <h3>你的最佳拍档是：</h3>
            <h2>
                <strong>{{ score() }}</strong>
            </h2>
            <button class="btn btn-success" @click="restart">再测一次</button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Questions",
    props: ['questionIndex', 'questions'],
    data: function () {
      return {
      }
    },
    computed: {
      responses: () => {
        return this.$store.state.userResponses
      }
    }
  }
</script>

<style scoped>

</style>