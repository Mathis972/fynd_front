<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>
        <v-card-text>
{{ text }} <br> Voulez-vous le conserver comme ami ? </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="next"
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
    next: function () {
      this.$emit('next')
    },
    close: function () {
      this.$emit('close')
    }
  },
  props: {
    text: String,

    dialog: Boolean
  },
  data () {
    return {
    }
  }
}
</script>
