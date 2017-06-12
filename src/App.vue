<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <div class="container">
      <router-view class="router"></router-view>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  width: 100px;
  margin-bottom: 30px;
}

.router {
  text-align: left;
}

.container {
  width: 500px;
}
</style>
