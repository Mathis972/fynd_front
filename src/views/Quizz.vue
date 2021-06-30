<template>
<div id="backgroundQuizz">
    <QuestionsQuizz />
</div>
</template>

<script>
// @ is an alias to /src
import QuestionsQuizz from '@/components/QuestionsQuizz.vue'

export default {
  name: 'Quizz',
  components: {
    QuestionsQuizz
  }
}
</script>

<style scoped>
#backgroundQuizz{
  background: linear-gradient(90deg, #de268e 0%, #d57c29 100%, #d57e27 103.36%)!important;
  height: 100%;
  font-family: 'Segoe UI';
}
</style>
