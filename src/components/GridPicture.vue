<template>
  <v-row v-if=" photoUser && photoUser.length != 0" class=" justify-center">
    <v-col
      v-for="photoUser in photoUser"
      :key="photoUser.id"
      class="d-flex child-flex"
      cols="6"
      style="width:50px; max-width:400px;height:450px;"
    >
    <v-card>
      <v-img style="z-index: 0"
        :src="photoUser.photo_url"
       width="100%" height="100%"
        class="grey lighten-2"
      >
       <v-card-title v-if="modif== true" class="align-end fill-height" primary-title>
            <v-btn  rounded style="z-index: 9999;background-color:none" @click="deleted(photoUser.id)">
    <v-icon large color=" red" >
     mdi-delete
    </v-icon></v-btn>
        </v-card-title>
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
          </v-row>
        </template>
      </v-img>
      </v-card>
    </v-col>
  </v-row>
   <v-row v-else class=" justify-center mb-6">
       <p class="mt-5">Vous n'avez aucune photos...</p>
   </v-row>
</template>

<script>
export default {
  methods: {
    deleted: function (value) {
      this.$emit('deleteItem', value)
    }
  },
  props: {
    modif: Boolean,
    photoUser: Array
  }
}
</script>
