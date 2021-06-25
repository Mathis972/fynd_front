<template>
    <div id='DetailsProfil'>
      <v-main style="margin:30px">
        <v-row
          class="mb-6"
          style="align-items:center"
        >
          <v-col lg="5">
            <v-card
              outlined
              tile
              flat
              class="pa-2 d-flex flex-column fill-height"
              style="border: 0 !important;"
            >
              <v-card-title>
                <b>{{ user.prenom }}, {{ new Date(Date.now() - new Date(user.date_de_naissance).getTime()).getFullYear() - 1970 }} ans</b>
              </v-card-title>
              <v-card-text class="flex-grow-1 overflow-y-auto">
                <v-img
                  :aspect-ratio="4/5"
                  width="400"
                  :src="avatar.photo_url"
                ></v-img>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card
              outlined
              tile
              flat
              class="pa-2 d-flex flex-column fill-height"
              style="border: 0 !important;"
            >
              <v-card-text class="flex-grow-1 overflow-y-auto">
                <h2>Description :</h2>
                <br>
                <p>{{ user.biographie }}</p>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text class="flex-grow-1 overflow-y-auto">
                <h2>Personnalité :</h2>
                <br>
                <li v-for="item in personnalite" :key="item.question.id">
                  {{ item.question.message }} : {{ item.reponse.message_reponse }}
                </li>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-main>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DetailsProfil',
  props: {
    user: Object,
    avatar: Object
  },
  async created () {
    await this.getPersonnalite()
  },
  data () {
    return {
      personnalite: null
    }
  },
  methods: {
    async getPersonnalite () {
      const questions = await axios.get(`${process.env.VUE_APP_BACK_URL}/questions`)
        .then((res) => {
          const questions = res.data
          return questions
        })
      const reponses = await axios.get(`${process.env.VUE_APP_BACK_URL}/reponses`)
        .then((res) => {
          const reponses = res.data
          return reponses
        })
      const personnalite = axios.get(`${process.env.VUE_APP_BACK_URL}/reponses_utilisateurs`)
        .then((res) => {
          const listeReponses = []
          res.data.forEach(element => {
            if (element.fk_utilisateur_id === this.user.id) {
              const reponse = reponses.find(x => x.id === element.fk_reponse_id)
              const question = questions.find(x => x.id === reponse.fk_question_id)
              listeReponses.push({
                reponse: reponse,
                question: question
              })
            }
          })
          this.personnalite = listeReponses
        })
      return personnalite
    }
  }
}
</script>
