 <template>
   <div>
 <template>
<v-list-item @click="modifProfil">
      <v-list-item-content >
        <v-list-item-title  class="text-h3">{{ textModif }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item >
      <v-list-item-content>
        <v-list-item-title  class="text-h3">Modifier ses réponses</v-list-item-title>
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
    modifProfil: function () {
      this.$emit('modif')
    }
  }
}
</script>
