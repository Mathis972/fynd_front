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
       <list-user v-if="path =='Chat'" @connect="RoomConnect" :conversations="conversations" ></list-user>
       <nav-profil @modif="modifProfil" v-else-if="path =='Profil' && modif == false" textModif="Modifier profil"></nav-profil>
       <nav-profil @modif="goProfil" v-else-if="path =='Profil' && modif == true " textModif="Revenir au profil"></nav-profil>
      </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
import axios from 'axios'
import ListUser from '@/components/NavBar/ListUser'
import NavProfil from '@/components/NavBar/NavProfil'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['user_Id'])
  },
  data () {
    return {
      user: {},
      path: '',
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
    this.path = this.$route.name
  },
  methods: {
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
        // this.avatar.photo_url = `${process.env.VUE_APP_BACK_URL}/${this.avatar.photo_url}`
      }
    },
    async getUser () {
      const user = await axios.get(`${process.env.VUE_APP_BACK_URL}/utilisateurs/${this.user_Id}`)
        .then((res) => {
          this.user = res.data
        })
      this.user.photo_utilisateur.forEach((value, index) => {
        value.photo_url = `${process.env.VUE_APP_BACK_URL}/${value.photo_url}`
      })
      return user
    }
  },
  components: { ListUser, NavProfil },
  props: {
    conversations: Array,
    modif: Boolean

  }
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
