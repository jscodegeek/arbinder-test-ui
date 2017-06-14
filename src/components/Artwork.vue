<template>
  <div class="artwork">
  
    <div class="form-group row">
      <h2>{{ title }}</h2>
    </div>

    <div class="form-group row">
      <label for="title" class="col-2 col-form-label">Title</label>
      <div class="star" @click="tooglePablished">
          <span class="glyphicon glyphicon-star" v-if="isPublished()"></span>
          <span class="glyphicon glyphicon-star-empty" v-if="!isPublished()"></span>
      </div>
      <div class="col-10">
          <b-form-input v-model="artwork.title" placeholder="The black ocen in night" id="title"></b-form-input>
      </div>
    </div>

    <div class="form-group row">
      <label for="artist_id" class="col-2 col-form-label">Select artist</label>
      <div class="col-10">
        <b-form-select v-model="artwork.artist_id" :options="artistsOpts" valucalss="mb-3" id="artist_id"> </b-form-select>
      </div>
    </div>

    <div class="form-group row">
      <label for="description" class="col-2 col-form-label">Description</label>
      <div class="col-10">
        <b-form-input v-model="artwork.description" placeholder="Artwork description" id="description"></b-form-input>
      </div>
    </div>

    <div class="form-group row">
      <label for="price" class="col-2 col-form-label">Price</label>
      <div class="input-group">
        <div class="input-group-addon">$</div>
        <div class="input-group">
          <b-form-input v-model="artwork.price" placeholder="1000.00" id="price"></b-form-input>
        </div>
      </div>
    </div>

    <div class="form-group row">
      <label for="dimension" class="col-2 col-form-label">Dimension in mm</label>
      <div class="input-group">
        <div class="input-group-addon">width</div>
        <b-form-input v-model="artwork.width" placeholder="100" id="dimension"></b-form-input>
        <div class="input-group-addon">height</div>
        <b-form-input v-model="artwork.height" placeholder="900" id="dimension"></b-form-input>
      </div>
    </div>

    <div class="form-group row" @dragover.prevent @drop="imageDrop">
      <label  class="col-2 col-form-label">Images</label>
      <b-alert variant="info" class="drag" show > Drag & Drop image here please ... </b-alert>
    </div>

    <div class="form-group row" @dragover.prevent @drop="imageDrop">
      <div class="row imagetiles">
        <div v-for="image in artwork.images" class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
          <img :src="image.base64" class="img-rounded img-responsive" :alt="image.name">
        </div>
      </div>
    </div>
    
    <div class="form-group row">
      <div class="col-10">
        <b-button v-on:click="sibmitData" size="md" variant="primary">Save</b-button>
      </div>
    </div>

    <div class="form-group row">
      <div class="col-10">
        <b-alert variant="danger" :show="notification.isError" > {{ notification.errorMsg }} </b-alert>
      </div>
    </div>

    <div class="form-group row">
      <div class="col-10">
        <b-alert variant="success" :show="notification.isSuccess" > {{ notification.successMsg }} </b-alert>
      </div>
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
    const awId = this.$route.params.id
    if (typeof awId !== 'undefined') {
      this.$http.get(`http://localhost:3000/artworks/${awId}`)
        .then((response) => {
          const artworkObj = _.get(response, 'body')
          this.title = 'Update artwork:'
          this.artwork = _.merge(this.artwork, {
            artist_id: artworkObj.artwork.artist_id,
            title: artworkObj.artwork.title,
            description: artworkObj.artwork.description,
            price: artworkObj.artwork.price,
            width: artworkObj.artwork.width,
            height: artworkObj.hight,
            status: artworkObj.status
          })
        })
      // this.artwork = _.merge(this.artwork, {
      //   title: 'test'
      // })
    }
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
</style>
