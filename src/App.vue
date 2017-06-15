<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <div class="container">
      <b-navbar toggleable variant="default">      
        <b-nav is-nav-bar>
          <b-nav-item href='/#/artworks'>Artowrk list</b-nav-item>
          <b-nav-item href='/#/artworks/new'>New Artwork</b-nav-item>
          <b-nav-item href='/#/artists/new'>New Artist</b-nav-item>
        </b-nav>
      </b-navbar>
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
