<template>
  <div id="quizz">
    <h2>Personnalise ton profil et trouves des personnes te correspondant le plus !</h2>
    <div
      v-for="question in questions_reponses"
      :key="question.id"
    >
      <div v-show="question.id === index_question_courante">
        <p class="text-question">Question n°{{question.id}} sur {{liste_questions.length}} - {{question.message}}</p>
        <v-radio-group
          v-model="reponse_utilisateur[question.id]"
          row
          v-on:change="showBoutonSuivant(question.id)"
        >
          <v-radio
            class="reponse"
            v-for="reponse in question.reponses"
            :key="reponse.id"
            v-bind:label="reponse.message_reponse"
            :value="reponse.id"
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
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'QuestionsQuizz',
  data () {
    return {
      liste_questions: [],
      liste_reponses: [],
      questions_reponses: [],
      index_question_courante: 1,
      reponse_utilisateur: [],
      boutonSuivant: false,
      boutonAffiche: false
    }
  },
  async mounted () {
    await axios.get(`${process.env.VUE_APP_BACK_URL}/questions`)
      .then(res => {
        console.log(res)
        res.data.forEach(question => this.liste_questions.push(question))
      })
    await axios.get(`${process.env.VUE_APP_BACK_URL}/reponses`)
      .then(res => {
        console.log(res)
        res.data.forEach(reponse => this.liste_reponses.push(reponse))
      })
    const questionReponses = []
    this.liste_questions.forEach(question => {
      const reponses = this.liste_reponses.filter(reponse => {
        if (reponse.fk_question_id === question.id) {
          return reponse
        }
      })
      questionReponses.push({ id: question.id, message: question.message, reponses: reponses })
    })
    this.questions_reponses = questionReponses
  },

  computed: {
    ...mapGetters(['user_Id'])
  },
  methods: {
    next: function () {
      if (this.index_question_courante === this.questions_reponses.length) {
        axios.post(`${process.env.VUE_APP_BACK_URL}/reponses_utilisateurs`, { reponses_utilisateur: this.reponse_utilisateur, id: parseInt(this.user_Id) })
      }
      this.index_question_courante++
      this.boutonSuivant = false
    },
    showBoutonSuivant: function (questionId) {
      if (!this.boutonSuivant) {
        this.boutonSuivant = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
  color:black!important;
  border: 1px solid grey;
}

.v-item--active {
  border: 5px solid #0984e3;
}

</style>

<style>
.v-input--selection-controls .v-input__slot > .v-label, .v-input--selection-controls .v-radio > .v-label {
color:black!important;
}
.theme--light.v-label {
  color:black !important;
}
.v-input--selection-controls__ripple {
  visibility: hidden;
}
</style>
