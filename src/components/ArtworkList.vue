<template>
  <div class="artworrList">
    <div class="form-group row">
      <h2>{{ title }}</h2>
    
  
    <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Dimenson</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="artwork in artworks">
        <td>{{ artwork.title }}</td>
        <td>{{ artwork.price / 100 }}</td>
        <td>{{ artwork.width }}x{{ artwork.height }}</td>
        <td><b-btn size="sm" @click="details(artwork.id)">Details</b-btn></td>
      </tr>
    </tbody>
  </table>

  </div>
  </div>
</template>



<script>
import _ from 'lodash'

export default {
  name: 'artist',
  data () {
    return {
      title: 'List of Artworks:',
      artworks: []
    }
  },
  methods: {
    sibmitData: function () {
      this.$http.post('http://localhost:3000/artists', JSON.stringify(this.artist))
        .then((artist) => {
          console.log(artist)
          this._setSuccess()
        })
        .catch((error) => {
          console.log(error)
          this._setError()
        })
    },
    details: function (id) {
      this.$http.get(`http://localhost:3000/artworks/${id}`)
        .then((response) => {
          alert(JSON.stringify(_.get(response, 'body')))
        })
        .catch((error) => {
          alert(error)
          console.log(error)
        })
    }
  },
  mounted: function () {
    this.$http.get('http://localhost:3000/artworks')
        .then((response) => {
          console.log(response)
          const artworks = _.get(response, 'body')
          this.artworks = artworks
        })
        .catch((error) => {
          console.log(error)
        })
  }
}
</script>
