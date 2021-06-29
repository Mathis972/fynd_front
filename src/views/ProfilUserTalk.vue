<template>
    <div>
      <Menu  :user="user" :avatar="avatar" />
      <DetailsProfilTalk :user="user" :avatar="avatar" />
    </div>
</template>

<script>
import DetailsProfilTalk from '../components/DetailsProfilTalk'
import Menu from '../components/NavBar/Menu'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  async created () {
    if (this.$route.params.id === undefined) {
      this.$router.push({ name: 'Chat' })
    }
    await this.getUser()
    await this.getAvatarProfil()
    console.log(this.$route.params.id)
  },
  async mounted () {
  },
  name: 'ProfilUserTalk',
  components: {
    DetailsProfilTalk,
    Menu
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
    refreshUser: function () {
      this.getUser()
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
      await axios.get(`${process.env.VUE_APP_BACK_URL}/utilisateurs/${this.$route.params.id}`)
        .then((res) => {
          console.log(res)
          this.user = res.data
        })
        .catch((value) => {
          console.err(value)
        })
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
