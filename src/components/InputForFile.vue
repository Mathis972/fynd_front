<template>
  <div>
    <v-col cols="12">
              <label id="fileLabel" for="file" style="color:black;">{{ title }}</label>
                  <v-icon large color=" darken-2" >
     mdi-image-plus
    </v-icon>
                  </v-col>
                  <v-col>
              <input class="inputfile" name="file" id="file" type="file"  @change="file_selected" style="display:none;"  />
              </v-col>
  </div>
</template>

<script>
export default {
  data () {
    return {
      file: undefined,
      url_img: undefined
    }
  },
  methods: {
    file_selected: function (e) {
      console.log(e)
      this.file = e.target.files[0]
      this.url_img = URL.createObjectURL(this.file)
      this.$emit('file', this.file, this.url_img)
    }
  },
  props: {
    title: String
  }
}
</script>

<style>

</style>
