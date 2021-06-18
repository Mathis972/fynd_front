<template>
  <v-row id="accueil">
    <v-col cols="6" class='Side-right col-6'>
      <v-row class="blockLoveDiv">
        <v-col cols="12" class="LoveDiv">
    <v-carousel cycle   :show-arrows="false"  hide-delimiter-background
    show-arrows-on-hover >
        <v-carousel-item v-for="(item,i) in items" :key="i" >
     <v-img contain class="imageLove"  align="center"  :src="item"></v-img>
  </v-carousel-item>
  </v-carousel>
        </v-col>
        <v-col cols="12">
          <h1 class="TextLove">Venez discutez avec ceux qui <br> vous correspondent</h1>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <v-row>
        <v-col cols="12">
          <v-img max-height="300px" max-width="300px" src="../assets/Logo_fynd_black.png" align="center"
            class="imageLove">
          </v-img>
        </v-col>
        <v-col cols="12">
          <h1 class="TextLove2">Bienvenue sur Fynd !</h1>
        </v-col>
        <v-col v-if="ifRegister" cols="12">
          <v-form class="form-connexion">
            <v-text-field v-model="emailLogin" label="Email" color="#FFFFFF" required append-icon="mdi-email-outline"
              class="text-field"></v-text-field>

            <v-text-field v-model="mot_de_passeLogin" label="Mot de passe" required color="pink lighten-5"
              append-icon="mdi-lock-outline" class="text-field"></v-text-field>
            <v-col>
              <v-btn class="red--text" @click="submitLogin" dark color="#F06292" :style="{ color:'#FFFFF'}">
                Se connecter
              </v-btn>
            </v-col>
            <v-btn plain class="inscrire" @click="ifRegister=false" color="secondary">
              Nouveau sur Fynd? Créer un compte
            </v-btn>

          </v-form>
        </v-col>
        <v-col v-else>
          <v-form class="form-connexion">
            <v-text-field v-model="prenomRegister" label="Prénom" required color="#FFFFFF"
              append-icon="mdi-account-outline" class="text-field"></v-text-field>
            <v-text-field v-model="emailRegister" label="Email" required color="#FFFFFF" append-icon="mdi-email-outline"
              class="text-field"></v-text-field>
            <v-text-field v-model="mot_de_passeRegister" label="Mot de passe" required type="password" color="#FFFFFF"
              append-icon="mdi-lock-outline" class="text-field"></v-text-field>
            <v-text-field v-model="DateNaissance" type="date" class="text-field"></v-text-field>
            <v-col cols="12">
              <v-btn align-center dark justify-center @click="register" color="#F06292" :style="{color:'#FFFFF'}">
                S'inscrire
              </v-btn>
            </v-col>
            <v-btn plain class="inscrire" @click="ifRegister=true" color="secondary">
              Déjà un compte ? Se connecter
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
// import Inscription from '@/components/Connexion/Inscription'
export default {
  // components: { Inscription },
  methods: {
    submitLogin: async function () {
      this.error = undefined
      const response = await this.$store.dispatch('logIn', {
        email: this.emailLogin,
        mot_de_passe: this.mot_de_passeLogin
      })
      console.log(response.error)
      if (response.error === false) {
        this.$router.push({ name: 'Chat' })
      } else {
        this.error = response.message
        this.$notify({
          group: 'foo',
          title: 'Important message',
          text: `${response.message}`,
          type: 'error',
          Width: '100px'
        })
      }
    },
    register: async function () {
      this.error = false
      const response = await this.$store.dispatch('register', {
        email: this.emailRegister,
        mot_de_passe: this.mot_de_passeRegister,
        date_de_naissance: this.DateNaissance,
        prenom: this.prenomRegister
      })
      if (response.error === false) {
        this.$router.push({ name: 'Quizz' })
      } else {
        this.error = response.message
      }
    }
  },
  data () {
    return {
      items: [
        {
          src: require('@/assets/connexionImages.png')
        },
        {
          src: require('../assets/3.png')
        },
        {
          src: require('../assets/connexionImages.png')
        }
      ],
      ifRegister: true,
      emailLogin: undefined,
      emailRegister: undefined,
      mot_de_passeLogin: undefined,
      mot_de_passeRegister: undefined,
      prenomRegister: undefined,
      DateNaissance: undefined,
      keep_token: true,
      error: undefined
    }
  },
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#accueil {
    width: 100%;
    height: 100%;
      margin:0px!important;

}
.imageLove{
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  width: 100%;
}
.TextLove{
  color: white;
  font-family:'system-ui'!important;
  text-align: center;

}
.TextLove2{
  color: black;
  font-family:'system-ui'!important;
  font-style: normal;
  font-weight: normal;
  text-align: center;

}
.Side-right{
  height: 100%;
  width: 50%;
  background: linear-gradient( rgba(213,126,39,0.6) 20%,#DE268E 100%);
}
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.fynd-logo{
width: 20%;
margin: auto;
}
body {
  font-family:'system-ui'!important;
}
.blockLoveDiv{
  margin:0px!important;
}
h3, h2 {
  text-align: center;
  color: white;
  font-family:'system-ui'!important;
}
.LoveDiv{
    margin-top: 10%;
}
.titre-boxe {
  margin-top: 25px;
  font-family:'system-ui'!important;

}
.imageAccueil{
  text-align: center;
}
.inscrire{
  background:none!important
}
.text-presentation {
  font-size: 25px;
  color: white;
  text-align: center;
  font-family:'system-ui'!important;
}

.form-connexion {
  padding: 30px;
  font-family:'system-ui'!important;

}
.theme--light.v-input input, .theme--light.v-input textarea {
color: black!important;
}
</style>

<style >

.theme--light.v-label {
color: black!important;
}

.theme--light.v-icon {
color: black!important;
}

.theme--light.v-text-field:not(.v-input--has-state):hover > .v-input__control > .v-input__slot:before {
  border-color:black !important;
}
.text-field input{
  color:black!important;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border-color:black !important;
}
::-webkit-calendar-picker-indicator {
    filter: invert(1);
}
</style>
