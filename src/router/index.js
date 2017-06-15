import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'

import Artist from '@/components/Artist'
import Artwork from '@/components/Artwork'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/artists/new',
      name: 'Artist',
      component: Artist
    },
    {
      path: '/artworks/new',
      name: 'Artwork',
      component: Artwork
    }
  ]
})
