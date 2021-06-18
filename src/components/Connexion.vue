<template>
  <div id="accueil">
    <div class="imageAccueil">
    <img src="../assets/Logo_fynd.png" class="fynd-logo">
    <p class="text-presentation">Venez discutez avec ceux qui vous correspondent!</p>
    </div>
    <v-container class="grey lighten-5" style="margin-top: 50px">
        <v-row
          justify="center"
        >
          <v-col>
            <v-card
              class="pa-2"
              outlined
              tile
              style="background:rgba(0,0,0,0.5)"
            >
              <h3 class="titre-boxe">Connexion</h3>
              <v-form
                class="form-connexion"
              >
                <v-text-field
                  v-model="emailLogin"
                  label="Email"
                  color="#FFFFFF"
                  required
                  append-icon="mdi-email-outline"
                  class="text-field"
                ></v-text-field>

                <v-text-field
                  v-model="mot_de_passeLogin"
                  label="Mot de passe"
                  required
                  color="pink lighten-5"
                  append-icon="mdi-lock-outline"
                  class="text-field"
                ></v-text-field>

                <v-btn
                  @click="submitLogin"
                  color="#F06292"
                  :style="{left: '50%', transform:'translateX(-50%)',color:'#FFFFF'}"
                >
                  Se connecter
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
          <v-col>
            <v-card
              class="pa-2"
              outlined
              tile
              style="background:rgba(0,0,0,0.5)"
            >
              <h3 class="titre-boxe">Inscription</h3>
              <v-form
                class="form-connexion"
              >
                <v-text-field
                  v-model="prenomRegister"
                  label="Prénom"
                  required
                  color="#FFFFFF"
                  append-icon="mdi-account-outline"
                  class="text-field"
                ></v-text-field>
                <v-text-field
                  v-model="emailRegister"
                  label="Email"
                  required
                  color="#FFFFFF"
                  append-icon="mdi-email-outline"
                  class="text-field"

                ></v-text-field>
                <v-text-field
                  v-model="mot_de_passeRegister"
                  label="Mot de passe"
                  required
                  type="password"
                  color="#FFFFFF"
                  append-icon="mdi-lock-outline"
                  class="text-field"
                ></v-text-field>
              <v-text-field v-model="DateNaissance" type="date" class="text-field"  ></v-text-field>
                <v-btn
                  align-center
                  justify-center
                  @click="register"
                  color="#F06292"
                  :style="{left: '50%', transform:'translateX(-50%)'}"
                >
                  S'inscrire
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>
export default {
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
  margin-top: 20px;
}
html {
height:100%;
  background-size:100% auto;
}
body {
  min-height:100%;
  background:
    linear-gradient(
    -140deg,
    transparent 40%, #de268e 0%, #d57c29 100%, #d57e27 103.36% !important
  )
}
.fynd-logo{
width: 20%;
margin: auto;
}
body {
  font-family:'system-ui'!important;
}

h3, h2 {
  text-align: center;
  color: white;
  font-family:'system-ui'!important;

}

.titre-boxe {
  margin-top: 25px;
  font-family:'system-ui'!important;

}
.imageAccueil{
  text-align: center;
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
color: white!important;
}
</style>

<style >

.theme--light.v-label {
  color:white !important;
}

.theme--light.v-icon {
  color:white !important;
}

.theme--light.v-text-field:not(.v-input--has-state):hover > .v-input__control > .v-input__slot:before {
  border-color:white !important;
}
.text-field input{
  color:white!important;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border-color:white !important;
}
::-webkit-calendar-picker-indicator {
    filter: invert(1);
}
</style>
