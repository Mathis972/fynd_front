<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right flat height="72" color=" rgba(0, 0, 0, 0.87)">
      <div style="display:flex" align="center">
        <v-avatar class="" color="grey darken-1" size="52">
          <img alt="Avatar" :src=getAvatarProfil>
        </v-avatar>
        <div class="info" style="display:grid;margin-left:15px;">
          <span class="user">{{ user.prenom }}</span>
          <span class="time">{{ time }}</span>
        </div>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app width="300">
      <v-sheet color="grey lighten-5" width="100%" class=" sheet">
        <v-row class="content-profile" align="center" justify="center">
          <v-col cols="4" md="4">
            <v-avatar class="" color="grey darken-1" size="52">
              <img alt="Avatar" :src= getAvatarProfil.photo_url>
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
          @click="menuActionClick(item.action)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
                </v-menu>
          </v-col>
        </v-row>
      </v-sheet>

      <v-list >
        <template v-for="(item) in items">
          <v-list-item  :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-card flat class="d-flex flex-column fill-height">
        <v-card-title>
          john doe
        </v-card-title>
        <v-card-text class="flex-grow-1 overflow-y-auto">
          <template v-for="(msg) in messages">

            <div :class="{'d-flex flex-row-reverse' : ifIdTrue(msg.me) }">
              <v-avatar v-if="!ifIdTrue(msg.me)" class="ma-4" color="grey darken-1" size="52">
                <img alt="Avatar" :src= msg.src >
              </v-avatar>
                <template >

                  <v-chip :color="ifIdTrue(msg.me) ? '#7626DE' : 'grey darken-1'" dark style="height:auto;white-space: normal;"
                    class="pa-4 mb-2" >
                    {{ msg.content }}
                    <sub class="ml-2" style="font-size: 0.5rem;">{{ msg.created_at }}</sub>
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
  },
  computed: {
    getAvatarProfil () {
      const user = this.user.photo_utilisateur.find(photo => photo.est_photo_profil === true)
      return user
    },
    ...mapGetters(['user_Id'])
  },
  methods: {
    menuActionClick (action) {
      if (action === 'test') {
        alert('TEST!!')
      } else if (action === 'logout') {
        alert('LOGOUT!!')
      }
    },
    getUser () {
      axios.get(`http://localhost:8000/utilisateurs/${this.user_Id}`)
        .then((res) => {
          this.user = res.data
        })
    },
    ifIdTrue (data) {
      if (data === this.id) {
        return true
      } else {
        return false
      }
    },
    sendMessage () {
      this.$socket.client.emit('message', {
        content: this.inputMessages,
        me: this.id,
        created_at: `${this.timeHours.getHours()}: ${this.timeHours.getMinutes()}`,
        src: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'

      }) // send the content of the message bar to the server
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
    timeHours: new Date(),
    id: '',
    inputMessages: '',
    messages: [
    ],
    items: [{
      header: 'Today'
    },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      title: 'Brunch this weekend?',
      subtitle: '<span class="text--primary">Ali Connors</span> &mdash; I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
    },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
      subtitle: '<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I\'m out of town this weekend.'
    },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      title: 'Oui oui',
      subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
    },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      title: 'Birthday gift',
      subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?'
    },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      title: 'Recipe to try',
      subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
    }
    ],
    drawer: null,
    img: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    time: '1 day ago',
    user: {},
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

</style>
