<template>
  <div>
    <v-subheader class="titre-conversation">Conversation en cours  </v-subheader>
    <v-divider></v-divider>
    <template v-if="conversations  && conversations.length > 0">
      <template v-for="(conversationsListe) in conversations">
        <div v-if="conversationsListe.est_enregistre === null  " :key="conversationsListe.conversations_id" >
            <Modal v-if="displayModal(conversationsListe)  && roomConnect" text="Cette utilisateur veux vous ajouter en ami." :dialog="dialog" @next ="nextPersonne" @close="dialog = false" ></Modal>
        <v-divider :key="conversationsListe.conversations_id"></v-divider>
        <v-list-item  @click="connectToRoom(conversationsListe)" :key="conversationsListe.prenom">
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
        </div>
      </template>
    </template>
    <template v-else class="Pas_Amis">
      <div>
        <p class="Pas_Amis">Aucun amis.. </p>
      </div>
    </template>
        <v-subheader class="titre-conversation">Mes amis sauvegardées </v-subheader>
    <v-divider></v-divider>
    <template v-if="conversations  && conversations.length > 0">
      <template v-for="(conversationsListe) in conversations">
        <div v-if="conversationsListe.est_enregistre === true " :key="conversationsListe.conversations_id" >
            <Modal v-if="displayModal(conversationsListe)  && roomConnect" text="Cette utilisateur veux vous ajouter en ami." :dialog="dialog" @next ="nextPersonne" @close="dialog = false" ></Modal>
        <v-divider :key="conversationsListe.conversations_id"></v-divider>
        <v-list-item  @click="connectToRoom(conversationsListe)" :key="conversationsListe.prenom">
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
        </div>
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
import Modal from '@/components/modal'

export default {
  components: { Modal },
  methods: {
    nextPersonne: function () {
      this.$emit('savePersonne', true)
      this.roomConnect = false
      this.dialog = false
    },
    displayModal: function (conversation) {
      return ((this.userTalk.est_user_1 && conversation.ajout_utilisateurs2) || (!this.userTalk.est_user_1 && conversation.ajout_utilisateurs1)) && conversation.est_enregistre !== true
    },
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
      this.roomConnect = true
      console.log(value)
      this.$emit('connect', value, this.getInitials(value.prenom))
    }
  },
  data () {
    return {
      roomConnect: false,
      initial: '',
      dialog: true
    }
  },
  props: {
    userTalk: Object,
    conversations: Array
  }
}

</script>
<style>

</style>
