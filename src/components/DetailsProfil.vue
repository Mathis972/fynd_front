<template>
    <div id='DetailsProfil'>
      {{user.nom}}, {{user.dateNaissance}} ans
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col>
            <v-img
              lazy-src="https://www.courrierinternational.com/sites/ci_master/files/styles/image_original_1280/public/assets/images/benzema.png?itok=ulGpX7A1"
              max-height="1000"
              max-width="500"
              src="https://www.courrierinternational.com/sites/ci_master/files/styles/image_original_1280/public/assets/images/benzema.png?itok=ulGpX7A1"
            ></v-img>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <h2>Profil</h2>
            <p>description</p>
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>
export default {
  name: 'DetailsProfil',
  data () {
    return {
      user: {
        nom: 'Léo',
        dateNaissance: new Date(Date.now() - new Date('1999-09-20').getTime()).getFullYear() - 1970
      }
    }
  }
}
</script>
