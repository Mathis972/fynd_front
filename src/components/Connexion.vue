<template>
  <div id="accueil">
    <h2>Lorem Ipsum</h2>
    <p class="text-presentation">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, quisquam! Impedit et praesentium pariatur quod, dicta facilis eaque vitae eos quam explicabo vel. Repellat itaque magnam expedita deleniti consectetur nam!</p>
    <p class="text-presentation">Laborum deserunt unde pariatur delectus maxime in expedita nesciunt beatae voluptates recusandae vero amet repellendus. Velit.</p>
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
                  v-model="email"
                  label="Email"
                  color="#FFFFFF"
                  required
                  append-icon="mdi-email-outline"
                ></v-text-field>

                <v-text-field
                  v-model="mot_de_passe"
                  label="Mot de passe"
                  required
                  color="#FFFFFF"
                  append-icon="mdi-lock-outline"
                ></v-text-field>

                <v-btn
                  @click="submitLogin"
                  color="#F06292"
                  :style="{left: '50%', transform:'translateX(-50%)'}"
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
                  v-model="prenom"
                  label="Prénom"
                  required
                  color="#FFFFFF"
                  append-icon="mdi-account-outline"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="Email"
                  required
                  color="#FFFFFF"
                  append-icon="mdi-email-outline"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Mot de passe"
                  required
                  color="#FFFFFF"
                  append-icon="mdi-lock-outline"
                  class="text-field-style"
                ></v-text-field>
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
        email: this.email,
        mot_de_passe: this.mot_de_passe
      })
      console.log(response.error)
      if (response.error === false) {
        this.$router.push('/')
      } else {
        this.error = response.message
      }
    }

  },
  data () {
    return {
      email: undefined,
      mot_de_passe: undefined,
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

body {
  font-family: 'Segoe UI';
}

h3, h2 {
  text-align: center;
  color: white;
}

.titre-boxe {
  margin-top: 25px
}

.text-presentation {
  margin-top: 30px;
  color: white;
  text-align: center;
}

.form-connexion {
  padding: 30px;
}
</style>

<style>

.theme--light.v-label {
  color:white !important;
}

.theme--light.v-icon {
  color:white !important;
}

.theme--light.v-text-field:not(.v-input--has-state):hover > .v-input__control > .v-input__slot:before {
  border-color:white !important;
}

.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border-color:white !important;
}

</style>
