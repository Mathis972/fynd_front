<template>
    <div id='DetailsProfil'>
      <!-- caché par navbar pb -->
      <h1>detail profil</h1>
      <h1>{{ user.prenom }}</h1>
    </div>
</template>

<script>
export default {
  name: 'DetailsProfil',
  props: {
    user: Object
  }
}
</script>
