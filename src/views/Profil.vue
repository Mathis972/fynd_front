<template>
    <div>
      <Menu @userDetails="userDetails" @userAvatar="userAvatar" />
      <DetailsProfil :user="user" :avatar="avatar" />
    </div>
</template>

<script>
import DetailsProfil from '../components/DetailsProfil'
import Menu from '../components/NavBar/Menu'

export default {
  name: 'Profil',
  components: {
    DetailsProfil,
    Menu
  },
  data () {
    return {
      user: {},
      avatar: {}
    }
  },
  methods: {
    userDetails (user) {
      this.user = user
    },
    userAvatar (avatar) {
      this.avatar = avatar
    }
  }
}
</script>

<style scoped>

</style>
