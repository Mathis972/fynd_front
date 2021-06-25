<template>
    <div>
      <Menu @userDetails="userDetails" />
      <DetailsProfil :user="user" />
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
      user: {}
    }
  },
  methods: {
    userDetails (user) {
      this.user = user
    }
  }
}
</script>

<style scoped>

</style>
