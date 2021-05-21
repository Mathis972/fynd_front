<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right flat height="72" color=" rgba(0, 0, 0, 0.87)">
      <div style="display:flex" align="center">
        <v-avatar class="" color="grey darken-1" size="52">
          <img alt="Avatar" :src=img>
        </v-avatar>
        <div class="info" style="display:grid;margin-left:15px;">
          <span class="user">{{ user }}</span>
          <span class="time">{{ time }}</span>
        </div>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app width="300">
      <v-sheet color="grey lighten-5" width="100%" class=" sheet">
        <v-row class="content-profile" align="center" justify="center">
          <v-col cols="4" md="4">
            <v-avatar class="" color="grey darken-1" size="52">
              <img alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460">
            </v-avatar>
          </v-col>
          <v-col cols="7" md="6">
            <div class="Text_profile "> Mon Profile </div>
          </v-col>
          <v-col cols="1" md="2">
            <v-btn text icon color="red lighten-2">
              <v-icon color="white"> mdi-dots-vertical </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>

      <v-list three-line>
        <template v-for="(item, index) in items">
          <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

          <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

          <v-list-item v-else :key="item.title">
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
export default {
  async created () {
    await this.idLaunch()
    await this.setUserName()
    await this.full()
  },
  methods: {
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
      this.$socket.client.emit('idLaunch')
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
      divider: true,
      inset: true
    },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
      subtitle: '<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I\'m out of town this weekend.'
    },
    {
      divider: true,
      inset: true
    },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      title: 'Oui oui',
      subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
    },
    {
      divider: true,
      inset: true
    },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      title: 'Birthday gift',
      subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?'
    },
    {
      divider: true,
      inset: true
    },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      title: 'Recipe to try',
      subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
    }
    ],
    drawer: null,
    img: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    user: 'Furry',
    time: '1 day ago'
  })
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
