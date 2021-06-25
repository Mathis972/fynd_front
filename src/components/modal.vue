<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>
        <v-card-text>
Vous êtes sur le point de quitter la conversation. <br> Voulez-vous le conserver comme ami ? </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="close"
          >
            Oui
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="close"
          >
            Non
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    close: function () {
      this.$emit('close')
    }
  },
  props: {
    dialog: Boolean
  },
  data () {
    return {
    }
  }
}
</script>
