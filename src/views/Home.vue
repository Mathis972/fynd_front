<template>
    <HelloWorld />
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style>
body {
  background: linear-gradient(90deg, #de268e 0%, #d57c29 100%, #d57e27 103.36%);
}
</style>
