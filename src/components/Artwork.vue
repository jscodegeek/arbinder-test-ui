<template>
  <div class="artwork">
    <div class="form-group">
      <h2>{{ title }}</h2>
    </div>

    <div class="form-group star" @click="tooglePablished">
        <img class="img-star" src="../assets/star.png"  v-if="isPublished()">
        <img class="img-star" src="../assets/empty-star.png" v-if="!isPublished()">
    </div>

    <div class="form-group">
      <label for="title">Title *</label>
      <b-form-input v-model="artwork.title" placeholder="The black ocen in night" id="title"></b-form-input>    
    </div>
    

    <div class="form-group">
      <label for="artist_id">Select artist  *</label></br>
      <b-form-select v-model="artwork.artist_id" :options="artistsOpts" valucalss="mb-3" id="artist_id"> </b-form-select>
    </div>

    <div class="form-group">
      <label for="description">Description  *</label>
      <b-form-input v-model="artwork.description" placeholder="Artwork description" id="description"></b-form-input>
    </div>

    <div class="form-group">
      <label for="price">Price  *</label>
      <div class="input-group">
        <div class="input-group-addon">$</div>
        <div class="input-group">
          <b-form-input v-model="artwork.price" placeholder="1000.00" id="price"></b-form-input>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="dimension">Dimension in mm  *</label>
      <div class="input-group">
        <div class="input-group-addon">width</div>
        <b-form-input v-model="artwork.width" placeholder="100" id="dimension"></b-form-input>
        <div class="input-group-addon">height</div>
        <b-form-input v-model="artwork.height" placeholder="900" id="dimension"></b-form-input>
      </div>
    </div>

    <div class="form-group" @dragover.prevent @drop="imageDrop">
      <label>Images</label>
      <b-alert variant="info" class="drag" show > Drag & Drop image here please ... </b-alert>
    </div>

    <div class="form-group" @dragover.prevent @drop="imageDrop">
    </div>

    <div class="form-group">
        <b-button v-on:click="sibmitData" size="md" variant="primary">Save</b-button>
    </div>

    <div class="form-group">
      <div>
        <b-alert variant="danger" :show="notification.isError" > {{ notification.errorMsg }} </b-alert>
      </div>
    </div>

    <div class="form-group">
      <div>
        <b-alert variant="success" :show="notification.isSuccess" > {{ notification.successMsg }} </b-alert>
      </div>
    </div>

    <div class="form-group" v-for="image in artwork.images" >
          <img :src="image.base64" class="imgbase64" :alt="image.name">
    </div>

  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'artwork',
  data () {
    return {
      title: 'Create new artwork:',
      artwork: {
        artist_id: '',
        title: '',
        description: '',
        price: '',
        width: '',
        height: '',
        status: 'NOT_PUBLISHED',
        images: []
      },
      artistsOpts: [],
      notification: {
        isSuccess: false,
        isError: false,
        successMsg: 'Successfully added artwork to DB',
        errorMsg: 'Some error was happend'
      }
    }
  },
  methods: {
    tooglePablished: function () {
      if (this.artwork.status === 'PUBLISHED') {
        this.artwork.status = 'NOT_PUBLISHED'
      } else {
        this.artwork.status = 'PUBLISHED'
      }
    },
    isPublished: function () {
      return this.artwork.status === 'PUBLISHED'
    },
    imageDrop: function (ev) {
      ev.stopPropagation()
      ev.preventDefault()
      const file = event.dataTransfer.files[0]
      const reader = new FileReader()
      const images = this.artwork.images
      reader.onload = sourceFile => {
        images.push({
          name: file.name,
          base64: _.get(sourceFile, 'target.result')
        })
      }
      reader.readAsDataURL(file)
    },
    sibmitData: function () {
      console.log(this.artwork)
      this.$http.post('http://localhost:3000/artworks', this.prepareData(this.artwork))
        .then((response) => {
          console.log(response)
          this._setSuccess()
        })
        .catch((error) => {
          console.log(error)
          this._setError()
        })
    },
    prepareData: function (artwork) {
      const artworkCopy = _.assign({}, artwork)
      artworkCopy.price = Math.round(artworkCopy.price * 100)
      artworkCopy.width = Math.round(artworkCopy.width)
      artworkCopy.height = Math.round(artworkCopy.height)
      artworkCopy.images = artworkCopy.images.map(img => {
        return {
          name: img.name,
          base64: this.cutPrefixBase64Data(img.base64)
        }
      })
      return JSON.stringify(artworkCopy)
    },
    cutPrefixBase64Data: function (base64) {
      const endOfPrefix = base64.indexOf('base64,') + 7
      return base64.substring(endOfPrefix)
    },
    _setError: function () {
      this.notification.isSuccess = false
      this.notification.isError = true
    },
    _setSuccess: function () {
      this.notification.isError = false
      this.notification.isSuccess = true
    }
  },
  mounted: function () {
    this.$http.get('http://localhost:3000/artists')
        .then((response) => {
          console.log(response)
          const artists = _.get(response, 'body')
          this.artistsOpts = _.map(artists, a => {
            return {
              value: a.id,
              text: `${a.first_name} ${a.last_name}`
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
  }
}
</script>



<style>
  .drag {
    border-style: dashed;
    border-width: 2px;
    border-color: black;
  }

  .star {
    cursor: pointer;
  }

  .imgbase64 {
    float: left;
    width: 24%;
  }

  .img-star {
    width: 24px;
  }
</style>
