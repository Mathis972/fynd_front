<template>
  <v-app>
    <v-app-bar app flat height="65" color=" rgba(0, 0, 0, 0.87)">
      <div style="display:flex" align="center">
        <b>{{ user.prenom }},
          {{ new Date(Date.now() - new Date(user.date_de_naissance).getTime()).getFullYear() - 1970 }} ans</b>
      </div>
      <!-- <span class="time">{{ time }}</span> -->
    </v-app-bar>
    <div id='DetailsProfil'>
      <v-main style="margin:30px">
        <v-row class="mb-6" >
          <v-col lg="5">
            <v-card outlined tile flat class=" justify-center pa-2 d-flex flex-column fill-height"
              style="border: 0 !important;">
              <v-card-title class="justify-center">
                Photo de profil :
              </v-card-title>
              <v-card-text class=" text-center flex-grow-1 overflow-y-auto">
                <v-row class=" justify-center" v-if="avatar != undefined">
                  <v-col style="width:50px; max-width:400px;height:500px;" width="50" height="50" cols="12">
                    <v-img width="100%" height="100%" :src="avatar.photo_url">
                    </v-img>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col cols="12">
                    <v-avatar class="" color="grey darken-1" size="300" tile>
                      <span class="white--text text-h1 "> {{ getInitials(user.prenom) }} </span>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card outlined tile flat class=" d-flex flex-column " style="border: 0 !important;">
            <v-card-title class="justify-center">
              </v-card-title>
            <v-card-title class="justify-center mb-11">
                Votre profil:
              </v-card-title>
              <v-card-text class="flex-grow-1 ">
                <div v-if="user.biographie !== null ">
                <p >{{ user.biographie }}</p>
                </div>
                <div v-else >
                <v-row>
                   <v-icon large color=" darken-2" >
                     mdi-format-quote-open
                    </v-icon>
                <v-col class="text-h5"> pas de description pour le moment… </v-col>
                </v-row>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text class="flex-grow-1 ">
                <h2>Personnalité :</h2>
                <br>
                <li v-for="item in personnalite" :key="item.question.id">
                  {{ item.question.message }} : {{ item.reponse.message_reponse }}
                </li>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
          <v-card-title class="justify-center">
                Photos récentes :
              </v-card-title>
          <v-row class="mb-6" style="align-items:center">
            <grid-picture  :photoUser="user.photo_utilisateur"></grid-picture>
          </v-row>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'
import gridPicture from '@/components/GridPicture'
export default {
  components: {
    gridPicture
  },
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
      personnalite: null,
      urlImg: undefined
    }
  },
  methods: {
    getInitials: function (name) {
      let initials = name.split(' ')
      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0)
      } else {
        initials = name.substring(0, 2)
      }
      return initials.toUpperCase()
    },
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
