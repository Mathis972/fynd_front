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
              <h3>Connexion</h3>
              <v-form
                class="form-connexion"
              >
                <v-text-field
                  v-model="email"
                  label="Email"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  label="Mot de passe"
                  required
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  color="success"
                  @click="login"
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
            >
              One of two columns
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#accueil {
  margin-top: 20px;
}

h3, h2 {
  text-align: center;
  color: white;
}

.text-presentation {
  color: white;
  text-align: center;
}

.form-connexion {
  padding: 10px;
}
</style>
