<template>
<header>
      <img v-bind:src="img" alt="" />
      <div class="info">
        <span class="user">{{ user }}</span>
        <span class="time">{{ time }}</span>
      </div>
    </header>
</template>

<script>
export default {
  data () {
    return {
      img: 'https://www.cheatsheet.com/wp-content/uploads/2019/10/taylor-swift-1024x681.jpg',
      user: 'Furry',
      time: '1 day ago'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.v-application .info {
    background-color: white !important;
    border-color: white !important;
}
 header {
    height: 76px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    display: flex;
    padding: 10px;
    align-items: center;
    img {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      object-fit: cover;
      margin-right: 10px;
      box-shadow: 1px 2px 3px rgba(0,0,0,0.5);
    }
    //info
    .info {
      flex: 1;
      .user {
        font-weight: 700;
      }
      .time {
        display: flex;
        margin-top: 3px;
        font-size: 0.85em;
      }
    }
    .open {
      display: none;
      a {
        color: #000;
        letter-spacing: 3px;
      }
    }
 }
</style>
