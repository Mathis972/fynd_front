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
#app{
width: 100%;
height: 100%;
font-family:'system-ui'!important;
}
  .vue-notification {
  padding: 10px;
  margin: 0 5px 5px;
  font-size: 20px!important;
  color: #ffffff;
}
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
