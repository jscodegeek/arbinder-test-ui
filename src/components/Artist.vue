<template>
  <div class="artist">
  
    <div class="form-group row">
      <h2>{{ title }}</h2>
    </div>
  
    <div class="form-group row">
      <label for="first_name" class="col-2 col-form-label">First name *</label>
      <div class="col-10">
        <b-form-input v-model="artist.first_name" placeholder="Eugene" id="first_name" required="required"></b-form-input>
      </div>
    </div>

    <div class="form-group row">
      <label for="last_name" class="col-2 col-form-label">Last name</label>
      <div class="col-10">
        <b-form-input v-model="artist.last_name" placeholder="Safronov" id="last_name"></b-form-input>
      </div>
    </div>
  
    <div class="form-group row">
      <div class="col-10 drag">
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
export default {
  name: 'artist',
  data () {
    return {
      title: 'Create new artist:',
      artist: {
        first_name: '',
        last_name: ''
      },
      notification: {
        isSuccess: false,
        isError: false,
        successMsg: 'Successfully added client to DB',
        errorMsg: 'Some error was happend'
      }
    }
  },
  methods: {
    _setError: function () {
      this.notification.isSuccess = false
      this.notification.isError = true
    },
    _setSuccess: function () {
      this.notification.isError = false
      this.notification.isSuccess = true
    },
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
    }
  }
}
</script>
