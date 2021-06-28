<template>
  <div>
    <v-subheader class="titre-conversation">Mes amis sauvegardées </v-subheader>
    <v-divider></v-divider>
    <template v-if="conversations.length > 0">
      <template v-for="(conversationsListe) in conversations">
        <v-divider :key="conversationsListe.conversations_id"></v-divider>
        <v-list-item @click="connectToRoom(conversationsListe)" :key="conversationsListe.prenom">
          <v-list-item-avatar class="justify-center" v-if="conversationsListe.photo == undefined" color="#EC407A">
           <span class="white--text "> {{ getInitials(conversationsListe.prenom) }} </span>
          </v-list-item-avatar>
          <v-list-item-avatar v-else>
            <v-img :src="conversationsListe.photo.photo_url"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="conversationsListe.prenom"></v-list-item-title>
            <v-list-item-subtitle v-if="conversationsListe.messages" v-html="conversationsListe.messages.contenu">
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </template>
    <template v-else class="Pas_Amis">
      <div>
        <p class="Pas_Amis">Aucun amis.. </p>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  methods: {
    getInitials: function (name) {
      let initials = name.split(' ')
      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0)
      } else {
        initials = name.substring(0, 2)
      }
      return initials.toUpperCase()
    },
    connectToRoom: function (value) {
      console.log(value)
      this.$emit('connect', value, this.getInitials(value.prenom))
    }
  },
  data () {
    return {
      initial: ''
    }
  },
  props: {
    conversations: Array
  }
}

</script>
<style>

</style>
