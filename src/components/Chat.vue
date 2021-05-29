<template>
  <v-app id="inspire" v-if="conversations">
    <v-app-bar app clipped-right flat height="72" color=" rgba(0, 0, 0, 0.87)">
      <div style="display:flex" align="center">
        <v-avatar class="" color="grey darken-1" size="52">
          <img alt="Avatar" :src="userTalk.photo" >
        </v-avatar>
        <div class="info" style="display:grid;margin-left:15px;">
          <span class="user">{{ userTalk.prenom }}</span>
          <span class="time">{{ time }}</span>
        </div>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app width="300">
      <v-sheet color="grey lighten-5" width="100%" class=" sheet">
        <v-row class="content-profile" align="center" justify="center">
          <v-col cols="4" md="4">
            <v-avatar class="" color="grey darken-1" size="52">
              <img alt="Avatar" :src="getAvatarProfil.photo_url">
            </v-avatar>
          </v-col>
          <v-col cols="7" md="6">
            <div class="Text_profile "> {{ user.prenom}} </div>
          </v-col>
          <v-col cols="1" md="2">
                <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on"  v-bind="attrs" text icon color="red lighten-2">
              <v-icon color="white"> mdi-dots-vertical </v-icon>
            </v-btn>
              </template>
              <v-list>
        <v-list-item
          v-for="(item, index) in listMenu"
          :key="index"
          @click="menuActionClick(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
                </v-menu>
          </v-col>
        </v-row>
      </v-sheet>

      <v-list >
        <v-subheader class="titre-conversation" >Mes amis sauvegardées </v-subheader>
        <v-divider ></v-divider>
        <template v-if="conversations.length > 0">
        <template  v-for="(conversationsListe) in conversations">
          <v-divider :key="conversationsListe.prenom"></v-divider>
          <v-list-item
          @click="connectToRoom(conversationsListe)"
          :key="conversationsListe.prenom">
            <v-list-item-avatar>
              <v-img :src="conversationsListe.photo.photo_url"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title  v-html="conversationsListe.prenom"></v-list-item-title>
              <v-list-item-subtitle  v-if="conversationsListe.messages"  v-html="conversationsListe.messages.contenu"  ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        </template>
        <template v-else class="Pas_Amis" > <div><p class="Pas_Amis">Aucun amis.. </p></div> </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-card flat class="d-flex flex-column fill-height">
        <v-card-title>
          john doe
        </v-card-title>
        <v-card-text class="flex-grow-1 overflow-y-auto">
          <template v-for="(msg) in messages"  >

            <div :class="{'d-flex flex-row-reverse' : msg.send_by_user }">
              <!-- <v-avatar v-if="!ifIdTrue(msg.me)" class="ma-4" color="grey darken-1" size="52">
                <img alt="Avatar" :src= msg.src >
              </v-avatar> -->
                <template >

                  <v-chip :color=" msg.send_by_user ? '#7626DE' : 'grey darken-1'" dark style="height:auto;white-space: normal;"
                    class="pa-4 mb-2" >
                    {{ msg.contenu }}
                    <sub class="ml-2" style="font-size: 0.5rem;">{{  }}</sub>
                  </v-chip>
                </template>
                <v-list>
                </v-list>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-main>

    <v-footer app  height="72" inset>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="inputMessages" label="type_a_message" type="text" no-details outlined
            append-outer-icon="mdi-send" @click:append-outer="sendMessage" @keydown.enter="sendMessage" filled clear-icon="mdi-close-circle" clearable></v-text-field>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import axios from 'axios'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
Vue.config.productionTip = false

const socketConnection = io('http://localhost:8000')

Vue.use(VueSocketIOExt, socketConnection)
export default {
  async created () {
    await this.getUser()
    await this.idLaunch()
    await this.setUserName()
    await this.full()
    await this.recupConv()
    // await this.getAvatarProfil()
  },
  computed: {
    getAvatarProfil () {
      if (!this.user) {
        return ''
      } else {
        // console.log(this.user)
        const user = this.user.photo_utilisateur.find(photo => photo.est_photo_profil === true)
        return user
      }
    },
    ...mapGetters(['user_Id'])
  },
  methods: {
    // methode qui permet de recup les conversation
    async recupConv () {
      const recup = await axios.get(`http://localhost:8000/conversations/utilisateur/${this.user_Id}`)
        .then((r) => {
          this.conversations = r.data.reduce((acc, curr) => {
            if (curr.fk_utilisateur1_id !== JSON.parse(this.user_Id)) {
              if (curr.message.length > 0) {
                acc.push({
                  est_user_1: true,
                  conversations_id: curr.id,
                  id: curr.fk_utilisateur1_id,
                  photo: curr.utilisateurs1.photo_utilisateur.find(photo => photo.est_photo_profil === true),
                  prenom: curr.utilisateurs1.prenom,
                  messages: curr.message.reduce((a, b) => {
                    return new Date(a.created_date) > new Date(b.created_date) ? a : b
                  })
                })
              } else {
                acc.push({
                  est_user_1: true,
                  conversations_id: curr.id,
                  id: curr.fk_utilisateur1_id,
                  photo: curr.utilisateurs1.photo_utilisateur.find(photo => photo.est_photo_profil === true),
                  prenom: curr.utilisateurs1.prenom,
                  messages: ''
                })
              }
            } else {
              if (curr.message.length > 0) {
                acc.push({
                  est_user_1: false,
                  conversations_id: curr.id,
                  id: curr.fk_utilisateur2_id,
                  photo: curr.utilisateur2.photo_utilisateur.find(photo => photo.est_photo_profil === true),
                  prenom: curr.utilisateur2.prenom,
                  messages: curr.message.reduce((a, b) => {
                    return new Date(a.created_date) > new Date(b.created_date) ? a : b
                  })
                })
              } else {
                acc.push({
                  est_user_1: false,
                  conversations_id: curr.id,
                  id: curr.fk_utilisateur2_id,
                  photo: curr.utilisateur2.photo_utilisateur.find(photo => photo.est_photo_profil === true),
                  prenom: curr.utilisateur2.prenom,
                  messages: ''
                })
              }
            }
            return acc
          }, [])
        })
      return recup
    },
    getUser () {
      const user = axios.get(`http://localhost:8000/utilisateurs/${this.user_Id}`)
        .then((res) => {
          this.user = res.data
        })
      return user
    },
    dateCalcul (date) {
      return Date.parse(new Date(date))
    },
    connectToRoom (utilisateur) {
      console.log(utilisateur)
      this.conversations_id = utilisateur.conversations_id
      this.userTalk = {
        est_user_1: utilisateur.est_user_1,
        prenom: utilisateur.prenom,
        photo: utilisateur.photo.photo_url,
        id: utilisateur.id
      }
      this.$socket.client.emit('joinRoom', utilisateur.conversations_id)
    },
    async sendMessage () {
      let message = {
        contenu: this.inputMessages,
        send_by_user1: this.userTalk.est_user_1,
        fk_conversation_id: this.conversations_id
      }
      console.log(message)
      await axios.post('http://localhost:8000/messages', message)
        .then((r) => {
          this.$socket.client.emit('message', message)
          console.log('fait')
        })
      message = ''
      // send the content of the message bar to the server
      this.inputMessages = ''
    },
    idLaunch () {
      this.$socket.client.emit('idLaunch', this.user_Id)
    },
    setUserName () {
      this.$socket.client.emit('join', this.id)
    },
    full () {
      this.$socket.client.emit('full')
    }
  },
  sockets: {
    connect () {
      console.log('connected to chat server')
    },
    message (data) {
      console.log(data)
      this.messages.push(data)
    },
    id (data) {
      this.id = data
      console.log(data)
    },
    full (data) {
      console.log('tu es kick')
      this.$socket.leave('room1')
    }
  },
  data: () => ({
    userTalk: {},
    timeHours: new Date(),
    photoProfilUser: {},
    id: '',
    inputMessages: '',
    messages: [
    ],
    conversations_id: undefined,
    conversations: undefined,
    drawer: null,
    img: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    time: '1 day ago',
    user: undefined,
    listMenu: [
      { title: 'Mon compte', actions: 'Mon compte' },
      { title: 'Déconnexion', actions: 'deconnexion' }
    ]
  }
  )
}

</script>

<style scoped>
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
  .Pas_Amis{
   font-size: 20px;
  }

</style>
