<template>
  <v-app id="inspire">
    <v-main>
      <v-row align="start" no-gutters >
        <v-col cols="2" md="2">
          <v-sheet color="grey lighten-4" class=" sheet">
            <v-row class="content-profile" align="center" justify="center" >
              <v-col cols="4" md="4">
                <v-avatar class="" color="grey darken-1" size="52">
                <img
                    alt="Avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  >
                </v-avatar>
              </v-col>
              <v-col cols="7" md="6">
                <div class="Text_profile "> Mon Profile </div>
              </v-col>
            <v-col cols="1" md="2">
              <v-btn
              text
              icon
              color="red lighten-2"
            >
              <v-icon color="white"> mdi-dots-vertical </v-icon>
            </v-btn>
              </v-col>
      </v-row>
      </v-sheet>
      </v-col>
      <v-col cols="6" md="10">
      <profile-bar></profile-bar>
      </v-col>
      </v-row>
      <v-row align="start" no-gutters >
        <v-col cols="2" md="2">
      <chat></chat>
      </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>
<script>

import chat from '../components/ListChatProfile'
import ProfileBar from '../components/ProfileBar'
export default {
  components: { chat, ProfileBar }
}
</script>
<style scoped>
.sheet{
background: linear-gradient(
90deg
, #de268e 0%, #d57c29 100%, #d57e27 103.36%);
}
.Text_profile{
  color: white;
  font-size: 25px;
}
.content-profile{
  margin:0px!important;
}
</style>
