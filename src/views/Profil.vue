<template>
    <div>
      <Menu  @modif="modif=true" @userDetails="userDetails" @userAvatar="userAvatar" />
      <ModifProfil v-if="modif == true" :user="user" :avatar="avatar" />
      <DetailsProfil v-if="modif == false" :user="user" :avatar="avatar" />
    </div>
</template>

<script>
import DetailsProfil from '../components/DetailsProfil'
import Menu from '../components/NavBar/Menu'
import ModifProfil from '@/components/ModifProfil'

export default {
  name: 'Profil',
  components: {
    DetailsProfil,
    Menu,
    ModifProfil
  },
  data () {
    return {
      modif: false,
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
