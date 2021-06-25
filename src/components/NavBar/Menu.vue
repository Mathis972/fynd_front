<template>
<div>
    <v-navigation-drawer
      app
      width="300"
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
              <img v-if="AvatarProfile !=undefined"
                alt="Avatar"
                :src="avatar.photo_url"
              >
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
       <list-user @connect="RoomConnect" :conversations="conversations" ></list-user>
      </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
import axios from 'axios'
import ListUser from '@/components/NavBar/ListUser'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['user_Id'])
  },
  data () {
    return {
      user: {},
      avatar: {},
      listMenu: [
        { title: 'Mon compte', action: 'Mon compte' },
        { title: 'Déconnexion', action: 'deconnexion' }
      ]
    }
  },
  async created () {
    await this.getUser()
    await this.getAvatarProfil()
    await this.$emit('userDetails', this.user)
    await this.$emit('userAvatar', this.avatar)
  },
  methods: {
    RoomConnect: function (value, value2) {
      this.$emit('connectToRoom', value, value2)
    },
    menuActionClick (action) {
      if (action === 'Mon Compte') {
        alert('TEST!!')
      } else if (action === 'deconnexion') {
        this.$store.dispatch('logOut')
        this.$router.push({ name: 'Connexion' })
      }
    },
    getAvatarProfil () {
      if (!this.user) {
        return ''
      } else {
        // console.log(this.user)
        const user = this.user.photo_utilisateur.find(photo => photo.est_photo_profil === true)
        this.avatar = user
      }
    },
    getUser () {
      const user = axios.get(`${process.env.VUE_APP_BACK_URL}/utilisateurs/${this.user_Id}`)
        .then((res) => {
          this.user = res.data
        })
      return user
    },
    RoomConnect: function (value) {
      this.$emit('connectToRoom', value)
    }
  },
  components: { ListUser },
  props: {
    conversations: Array,
    AvatarProfil: Object
  }
}
</script>

<style >
  .sheet {
    background: linear-gradient(90deg, #de268e 0%, #d57c29 100%, #d57e27 103.36%);
  }
</style>
