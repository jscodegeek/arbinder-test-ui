import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'

import Hello from '@/components/Hello'
import Artist from '@/components/ARTIST'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/artists/new',
      name: 'Artist',
      component: Artist
    }
  ]
})
