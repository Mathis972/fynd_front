 <template>
   <div>
 <template>
<v-list-item @click="modifProfil">
      <v-list-item-content >
        <v-list-item-title  class="text-h3">{{ textModif }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item  @click="retourChat" >
      <v-list-item-content>
        <v-list-item-title  class="text-h3">Retour au chat</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item @click="deconnexion">
      <v-list-item-content>
        <v-list-item-title class="text-h3">Deconnexion</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
      </template>
      </div>
</template>

<script>
export default {
  props: {
    textModif: String
  },
  data () {
    return {
    }
  },
  methods: {
    deconnexion: function () {
      this.$store.dispatch('logOut')
      this.$router.push({ name: 'Connexion' })
    },
    retourChat: function () {
      this.$router.push({ name: 'Chat' })
    },
    modifProfil: function () {
      this.$emit('modif')
    }
  }
}
</script>
