<template>
    <QuestionsQuizz />
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

<style>
body {
  background: linear-gradient(90deg, #de268e 0%, #d57c29 100%, #d57e27 103.36%);
}
</style>
