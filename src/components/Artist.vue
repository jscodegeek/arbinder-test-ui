<template>
  <div class="artist">
    <h1>{{ title }}</h1>
    <form>
      <label for="firstName">First name:</label>
      <input id="firstName" v-model="artist.first_name"><br/>
      <label for="firstName">Last name:</label>
      <input id="firstName" v-model="artist.last_name"><br/>
      <label for="firstName">Email name:</label>
      <input id="firstName" v-model="artist.email"><br/>
      <button v-on:click="sibmitData">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'artist',
  data () {
    return {
      title: 'Welcome to Your Vue.js App',
      artist: {
        first_name: '',
        last_name: '',
        email: ''
      }
    }
  },
  methods: {
    sibmitData: function () {
      this.$http.post('http://localhost:3000/artists', JSON.stringify(this.artist))
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
  }
}
</script>
