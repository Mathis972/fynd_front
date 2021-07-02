<template>
<div>
    <v-navigation-drawer
      app
      width="300"
      permanent
    >
      <v-sheet
        color="grey lighten-5"
        width="100%"
        class=" sheet"
      >
        <v-row
          class="content-profile"
          align="center"
          justify="center"
        >
          <v-col
            cols="4"
            md="4"
          >
            <v-avatar
              class=""
              color="grey darken-1"
              size="52"
            >
              <img v-if="this.avatar !=undefined"
                alt="Avatar"
                :src="avatar.photo_url"
              >
              <span v-else class="white--text "> {{ initial }} </span>
            </v-avatar>
          </v-col>
          <v-col
            cols="7"
            md="6"
          >
            <div class="Text_profile "> {{ user.prenom}} </div>
          </v-col>
          <v-col
            cols="1"
            md="2"
          >
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-on="on"
                  v-bind="attrs"
                  text
                  icon
                  color="red lighten-2"
                >
                  <v-icon color="white"> mdi-dots-vertical </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in listMenu"
                  :key="index"
                  @click="menuActionClick(item.action)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-sheet>

      <v-list>
       <list-user :notificationRoom="notificationRoom" :notification="notification" @savePersonne="savePersonne" :userTalk="userTalk" v-if="path =='Chat'" @connect="RoomConnect" :conversations="conversations" ></list-user>
       <nav-profil @modif="modifProfil" v-else-if="path =='Profil' && modif == false" textModif="Modifier profil"></nav-profil>
       <nav-profil @modif="goProfil" v-else-if="path =='Profil' && modif == true " textModif="Revenir au profil"></nav-profil>
      </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
import ListUser from '@/components/NavBar/ListUser'
import NavProfil from '@/components/NavBar/NavProfil'
import { mapGetters } from 'vuex'
// import axios from 'axios'
export default {
  props: {
    userTalk: Object,
    conversations: Array,
    modif: Boolean,
    user: Object,
    avatar: Object,
    initial: String,
    notification: Boolean,
    notificationRoom: Number

  },
  computed: {
    ...mapGetters(['user_Id'])
  },
  data () {
    return {
      path: '',
      conversation: [],
      listMenu: [
        { title: 'Mon compte', action: 'Mon compte' },
        { title: 'Déconnexion', action: 'deconnexion' }
      ]
    }
  },
  async created () {
    this.path = this.$route.name
  },
  methods: {
    savePersonne: function (response) {
      console.log(response)
      this.$emit('savePersonne', response)
    },
    modifProfil: function (params) {
      this.$emit('modif')
    },
    goProfil: function (params) {
      this.$emit('GoProfil')
    },
    RoomConnect: function (value, value2) {
      this.$emit('connectToRoom', value, value2)
    },
    menuActionClick (action) {
      console.log(action)
      if (action === 'Mon compte') {
        this.$router.push({ name: 'Profil' })
      } else if (action === 'deconnexion') {
        this.$store.dispatch('logOut')
        localStorage.removeItem('conversationId')
        localStorage.removeItem('userTalk')
        this.$router.push({ name: 'Connexion' })
      }
    }
  },
  components: { ListUser, NavProfil }
}
</script>

<style >
  .sheet {
    background: linear-gradient(90deg, #de268e 0%, #d57c29 100%, #d57e27 103.36%);
  }
    .Text_profile {
    color: white;
    font-size: 19px;
  }

  .content-profile {
    margin: 0px !important;
  }

  .v-application .info {
    background-color: #f5f5f5 !important;
    border-color: #f5f5f5 !important;
  }
  .titre-conversation {
    font-size: 15px;
    font-weight: bold;
  }
</style>
