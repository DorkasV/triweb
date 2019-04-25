import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuetable from 'vuetable-2'

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.component("vuetable", Vuetable)

const routes = [
  { path: '/Events', component: require('./events/events.vue').default, name: 'Events' },
  { path: '/Athletes', component: require('./athletes/athletes.vue').default, name: 'Athletes' },
  { path: '/Results', component: require('./results/results.vue').default, name: 'Results' },
]

new Vue({
  el: '#app',
  router: new VueRouter({
    mode: 'history',
    routes: routes
  }),
  render: h => h(require('./App.vue').default)
})
