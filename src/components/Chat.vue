<template>
  <v-app
    id="inspire"
  >
  <Modal :dialog="dialog" @close="dialog=false" ></Modal>
    <v-app-bar
      app
      flat
      height="65"
      color=" rgba(0, 0, 0, 0.87)"
    >
      <div
        style="display:flex"
        align="center"
      >
        <v-avatar
          class=""
          color="grey darken-1"
          size="52"
        >
          <img v-if="userTalk.photo !== '' "
            alt="Avatar"
            :src="userTalk.photo"
          >
          <span v-else class="white--text "> {{ userTalk.initiale }} </span>
        </v-avatar>
          <span class="user">{{ userTalk.prenom }}</span>
      </div>
      <v-spacer></v-spacer>
          <v-btn @click="nextPersonne"> Next </v-btn>
          <v-btn @click="dialog=true"> dialog </v-btn>
          <!-- <span class="time">{{ time }}</span> -->
    </v-app-bar>
<Menu :avatar="avatar" :user="user" @connectToRoom="connectToRoom" :conversations="conversations"  ></Menu>
    <v-main>
      <v-card
        flat
        class="d-flex flex-column fill-height"
      >
        <v-card-title>
          john doe
        </v-card-title>
        <v-card-text class="flex-grow-1 overflow-y-auto">
          <template v-for="(msg) in messages">
            <div :class="{'d-flex flex-row-reverse' :  checkUser(msg) }">
              <v-avatar
                v-if="!checkUser(msg)"
                class="ma-4"
                color="grey darken-1"
                size="52"
              >
                <img
                  alt="Avatar"
                  :src="userTalk.photo"
                >
              </v-avatar>
              <template>

                <v-chip
                  :color=" checkUser(msg) ? '#7626DE' : 'grey darken-1'"
                  dark
                  style="height:auto;white-space: normal;"
                  class="pa-4 mb-2"
                >
                  {{ msg.contenu }}
                  <sub
                    class="ml-2"
                    style="font-size: 0.5rem;"
                  >{{  }}</sub>
                </v-chip>
              </template>
              <v-list>
              </v-list>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-main>

    <v-footer
      app
      height="72"
      inset
    >
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="inputMessages"
            label="type_a_message"
            type="text"
            no-details
            outlined
            append-outer-icon="mdi-send"
            @click:append-outer="sendMessage"
            @keydown.enter="sendMessage"
            filled
            clear-icon="mdi-close-circle"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import axios from 'axios'
import Menu from './NavBar/Menu'
import Modal from '@/components/modal'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
Vue.config.productionTip = false

const socketConnection = io(`${process.env.VUE_APP_BACK_URL}`)

Vue.use(VueSocketIOExt, socketConnection)
export default {
  components: { Menu, Modal },
  async created () {
    await this.idLaunch()
    await this.recupConv()
    await this.getUserAfterRefresh()
    await this.getUser()
    await this.getAvatarProfil()
  },
  computed: {
    ...mapGetters(['user_Id'])
  },
  methods: {
    getUserAfterRefresh: async function () {
      const self = this
      if (localStorage.getItem('userTalk') === null && localStorage.getItem('conversationId')) {
        this.userTalk = {}
      } else {
        this.userTalk = JSON.parse(localStorage.getItem('userTalk'))
        this.conversations_id = parseInt(localStorage.getItem('conversationId'))
        await axios.get(`${process.env.VUE_APP_BACK_URL}/messages`, { params: { conversation_id: this.conversations_id } })
          .then((value) => {
            self.messages = value.data
          })
      }
    },
    close: function () {
    },
    nextPersonne: async function () {
      const userMatch = await axios.get(`${process.env.VUE_APP_BACK_URL}/utilisateurs/match/${this.user_Id}`)
        .then((r) => {
          return r.data
        })
      this.arrayMatch = userMatch
      const idUserTalk = this.arrayMatch[0].util2
      await axios.post(`${process.env.VUE_APP_BACK_URL}/conversations`, { fk_utilisateur1_id: parseInt(this.user_Id), fk_utilisateur2_id: this.arrayMatch[0].util2 })
        .then((r) => {
          axios.get(`${process.env.VUE_APP_BACK_URL}/utilisateurs/${idUserTalk}`)
            .then(r => {
              this.userTalk = r.data
              localStorage.setItem('userTalk', JSON.stringify(this.userTalk))
              this.recupConv()
            })
          this.$socket.client.emit('joinRoom', r.data.id)
          this.conversations_id = r.data.id
          localStorage.setItem('conversationId', parseInt(this.conversations_id))
        })
      return userMatch
    },
    checkUser (data) {
      if ((data.conversation.fk_utilisateur1_id === parseInt(this.user_Id) && data.send_by_user1 && !this.userTalk.est_user_1) || (data.conversation.fk_utilisateur2_id === parseInt(this.user_Id) && !data.send_by_user1 && this.userTalk.est_user_1)) {
        return true
      } else {
        return false
      }
    },
    // methode qui permet de recup les conversation
    async recupConv () {
      const recup = await axios.get(`${process.env.VUE_APP_BACK_URL}/conversations/utilisateur/${this.user_Id}`)
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
    getAvatarProfil () {
      if (!this.user) {
        return ''
      } else {
        const user = this.user.photo_utilisateur.find(photo => photo.est_photo_profil === true)
        this.avatar = user
        // this.avatar.photo_url = `${process.env.VUE_APP_BACK_URL}/${this.avatar.photo_url}`
      }
    },
    async getUser () {
      await axios.get(`${process.env.VUE_APP_BACK_URL}/utilisateurs/${this.user_Id}`)
        .then((res) => {
          this.user = res.data
        })
        .catch((value) => {
          console.err(value)
        })
      this.user.photo_utilisateur.forEach((value, index) => {
        value.photo_url = `${process.env.VUE_APP_BACK_URL}/${value.photo_url}`
      })
    },
    async connectToRoom (utilisateur, initial) {
      this.messages = ''
      this.conversations_id = utilisateur.conversations_id
      this.userTalk = {
        est_user_1: utilisateur.est_user_1,
        prenom: utilisateur.prenom,
        photo: utilisateur.photo !== undefined ? utilisateur.photo.photo_url : '',
        id: utilisateur.id,
        initiale: initial !== undefined ? initial : ''
      }
      localStorage.setItem('userTalk', JSON.stringify(this.userTalk))
      localStorage.setItem('conversationId', parseInt(this.conversations_id))
      this.$socket.client.emit('joinRoom', utilisateur.conversations_id)
      // const payload = { conversation_id: utilisateur.conversations_id }
      const self = this
      await axios.get(`${process.env.VUE_APP_BACK_URL}/messages`, { params: { conversation_id: utilisateur.conversations_id } })
        .then((value) => {
          self.messages = value.data
        })
    },
    async sendMessage () {
      let message = {
        contenu: this.inputMessages,
        send_by_user1: !this.userTalk.est_user_1,
        fk_conversation_id: this.conversations_id
      }
      await axios.post(`${process.env.VUE_APP_BACK_URL}/messages`, message)
        .then((r) => {
          this.$socket.client.emit('message', r.data)
        }).catch((value) => {
        })
      message = ''
      // send the content of the message bar to the server
      this.inputMessages = ''
    },
    idLaunch () {
      this.$socket.client.emit('idLaunch', this.user_Id)
    }
  },
  sockets: {
    connect () {
      console.log('connected to chat server')
    },
    message (data) {
      this.messages.push(data)
    },
    sendNotification () {
      console.log('notification')
    }
  },
  data: () => ({
    userTalk: {},
    dialog: false,
    timeHours: new Date(),
    photoProfilUser: {},
    arrayMatch: {},
    id: '',
    inputMessages: '',
    messages: [],
    conversations_id: undefined,
    conversations: undefined,
    drawer: null,
    user: {},
    avatar: {}
  })
}

</script>

<style scoped>
  .sheet {
    background: linear-gradient(90deg, #de268e 0%, #d57c29 100%, #d57e27 103.36%);
  }
  .Pas_Amis{
   font-size: 20px;
  }

</style>
