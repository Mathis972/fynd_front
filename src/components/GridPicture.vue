<template>
  <v-row v-if="photoUser.length != 0" class=" justify-center">
    <v-col
      v-for="photoUser in photoUser"
      :key="photoUser.id"
      class="d-flex child-flex"
      cols="4"
      style="width:50px; max-width:400px;height:500px;"
    >
      <v-img
        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
       width="100%" height="100%"
        class="grey lighten-2"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
   <v-row v-else class=" justify-center">
     <v-title class="mt-6">
       Vous n'avez aucune photos...
     </v-title>
   </v-row>
</template>

<script>
export default {
  props: {
    photoUser: Array
  }
}
</script>
