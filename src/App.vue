<template>
  <div id="app">
    <notifications
      position="bottom center"
      group="foo"
      width="50%"
    />
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>

<style>
  .vue-notification {
  padding: 10px;
  margin: 0 5px 5px;
  font-size: 20px!important;
  color: #ffffff;
}
</style>
