<template>
  <div>
    <v-col cols="12">
              <label id="fileLabel" :for=" forInput" style="color:black;">{{ title }}</label>
                  <v-icon large color=" darken-2" >
     mdi-image-plus
    </v-icon>
                  </v-col>
              <input class="inputfile" accept="image/png, image/jpeg" name="file" :id="idInput" type="file"  @change="file_selected" style="display:none;"  />
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
      this.$emit('files', this.file, this.url_img)
    }
  },
  props: {
    title: String,
    forInput: String,
    idInput: String
  }
}
</script>

<style>

</style>
