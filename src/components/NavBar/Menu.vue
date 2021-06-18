<template>
<div>
    <v-navigation-drawer
      app
      width="300"
    >
      <v-sheet
        color="grey lighten-5"
        width="100%"
        class=" sheet"
      >
        <v-row
          class="content-profile"
          align="center"
          justify="center"
        >
          <v-col
            cols="4"
            md="4"
          >
            <v-avatar
              class=""
              color="grey darken-1"
              size="52"
            >
              <img
                alt="Avatar"
                :src="AvatarProfil.photo_url"
              >
            </v-avatar>
          </v-col>
          <v-col
            cols="7"
            md="6"
          >
            <div class="Text_profile "> {{ user.prenom}} </div>
          </v-col>
          <v-col
            cols="1"
            md="2"
          >
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-on="on"
                  v-bind="attrs"
                  text
                  icon
                  color="red lighten-2"
                >
                  <v-icon color="white"> mdi-dots-vertical </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in listMenu"
                  :key="index"
                  @click="menuActionClick(item.action)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-sheet>

      <v-list>
       <list-user @connect="RoomConnect" :conversations="conversations"></list-user>
      </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
import ListUser from '@/components/NavBar/ListUser'
export default {
  methods: {
    RoomConnect: function (value) {
      this.$emit('connectToRoom', value)
    }
  },
  components: { ListUser },
  props: {
    conversations: Array,
    user: Object,
    AvatarProfil: Object,
    listMenu: Array
  }
}
</script>

<style >
  .sheet {
    background: linear-gradient(90deg, #de268e 0%, #d57c29 100%, #d57e27 103.36%);
  }
</style>
