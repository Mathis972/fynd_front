<template>
  <div id="quizz">
    <h2>Personnalise ton profil et trouves des personnes te correspondant le plus !</h2>
    <div v-for="question in questions_reponses" :key="question.id">
      <div v-show="question.id === index_question_courante">
        <p class="text-question">Question n°{{index_question_courante}} sur {{liste_questions.length}} - {{question.message}}</p>
          <v-radio-group
            v-model="reponse_utilisateur[question.id]"
            row
            v-on:change="showBoutonSuivant(question.id)"
          >
            <v-radio class="reponse" v-for="reponse in question.reponses" :key="reponse.id"
              v-bind:label="reponse.message_reponse"
            ></v-radio>
         </v-radio-group>
        <div v-show="boutonSuivant">
          <v-btn
            align-center
            justify-center
            @click="next"
            color="#F06292"
            :style="{left: '50%', transform:'translateX(-50%)'}"
            >
              <div v-if="index_question_courante === questions_reponses.length">Terminer le quizz</div>
              <div v-else>Question suivante</div>
          </v-btn>
        </div>
      </div>
    </div>
    <div v-show="index_question_courante === questions_reponses.length+1">
      <div class="text-question">Quizz terminé</div>
      <v-btn
        align-center
        justify-center
        color="#F06292"
        :style="{left: '50%', transform:'translateX(-50%)', marginTop: '20px'}"
      >
        Se connecter
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionsQuizz',
  data () {
    return {
      liste_questions: [
        { id: 1, message: 'Quel est ton sport préféré ?' },
        { id: 2, message: 'Quelle est ta couleur préférée ?' }
      ],
      liste_reponses: [
        { id: 1, id_question: 1, message_reponse: 'Football', icon: '' },
        { id: 2, id_question: 1, message_reponse: 'Handball', icon: '' },
        { id: 3, id_question: 1, message_reponse: 'Rugby', icon: '' },
        { id: 4, id_question: 1, message_reponse: 'Athlétisme', icon: '' },
        { id: 5, id_question: 2, message_reponse: 'Vert', icon: '' },
        { id: 6, id_question: 2, message_reponse: 'Rouge', icon: '' }
      ],
      questions_reponses: [],
      index_question_courante: 1,
      reponse_utilisateur: [],
      boutonSuivant: false,
      boutonAffiche: false
    }
  },
  mounted () {
    const questionReponses = []
    this.liste_questions.forEach(question => {
      const reponses = this.liste_reponses.filter(reponse => {
        if (reponse.id_question === question.id) {
          return reponse
        }
      })
      questionReponses.push({ id: question.id, message: question.message, reponses: reponses })
    })
    this.questions_reponses = questionReponses
  },
  methods: {
    next: function () {
      this.index_question_courante++
      this.boutonSuivant = false
    },
    showBoutonSuivant: function (questionId) {
      console.log('click')
      if (!this.boutonSuivant) {
        console.log('cond')
        this.boutonSuivant = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#quizz {
  margin-top: 20px;
}

body {
  font-family: 'Segoe UI';
}

h3, h2 {
  text-align: center;
  color: white;
}

.text-question {
  margin-top: 50px;
  color: white;
  text-align: center;
  font-size: 20px;
}

.reponse {
  background-color: white;
  margin-left: 10px;
  margin-right: 10px;
  height: 50px;
  flex: 1;
  border: 1px solid grey;
}

.v-item--active {
  border: 5px solid #0984e3;
}

</style>

<style>
.theme--light.v-label {
  color:black !important;
}
.v-input--selection-controls__ripple {
  visibility: hidden;
}
</style>
