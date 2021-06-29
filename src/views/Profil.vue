<template>
    <div>
      <Menu  @GoProfil="modif=false" :modif='modif' @modif="modif=true" :user="user" :avatar="avatar" />
      <ModifProfil  :modif="modif" @refreshUser="refreshUser" v-if="modif == true" :user="user" :avatar="avatar" />
      <DetailsProfil v-if="modif == false" :user="user" :avatar="avatar" />
    </div>
</template>

<script>
import DetailsProfil from '../components/DetailsProfil'
import Menu from '../components/NavBar/Menu'
import { mapGetters } from 'vuex'
import ModifProfil from '@/components/ModifProfil'
import axios from 'axios'
export default {
  async mounted () {
    await this.getUser()
    await this.getAvatarProfil()
  },
  name: 'Profil',
  components: {
    DetailsProfil,
    Menu,
    ModifProfil
  },
  computed: {
    ...mapGetters(['user_Id'])
  },
  data () {
    return {
      modif: false,
      user: {},
      avatar: {}
    }
  },
  methods: {
    refreshUser: async function () {
      console.log('je suis refresh')
      await this.getUser()
      await this.getAvatarProfil()
    },
    getAvatarProfil () {
      console.log('tototo')
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
      console.log('tototo')
      await axios.get(`${process.env.VUE_APP_BACK_URL}/utilisateurs/${this.user_Id}`)
        .then((res) => {
          console.log(res)
          this.user = res.data
        })
        .catch((value) => {
          console.err(value)
        })
      // this.user.photo_utilisateur.forEach((value, index) => {
      //   value.photo_url = `${process.env.VUE_APP_BACK_URL}/${value.photo_url}`
      // })
    }
    // userDetails (user) {
    //   this.user = user
    // },
    // userAvatar (avatar) {
    //   this.avatar = avatar
    // }
  }
}
</script>

<style scoped>

</style>
