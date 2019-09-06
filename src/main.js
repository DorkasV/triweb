import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuetable from 'vuetable-2'
import moment from 'moment'
import ShowEntries from './components/ShowEntries.vue'
import {
  VuetablePagination,
  VuetablePaginationInfo
} from 'vuetable-2'

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.component("vuetable", Vuetable)
Vue.component("vuetable-pagination", VuetablePagination)
Vue.component("vuetable-pagination-info", VuetablePaginationInfo)
Vue.component('v-show-entries', ShowEntries)

const routes = [
  { path: '/Events', component: require('./events/events.vue').default, name: 'Events' },
  { path: '/Athletes/:athlete', component: require('./athletes/athletesResults.vue').default, name: 'AthletesResults' },
  { path: '/Athletes', component: require('./athletes/athletes.vue').default, name: 'Athletes' },
  { path: '/Results', component: require('./results/results.vue').default, name: 'Results' },
  { path: '/Results/:event', component: require('./results/eventResults.vue').default, name: 'EventResults' },
  { path: '/Results/:event/:athlete', component: require('./results/eventAthleteResults.vue').default, name: 'EventAthleteResults' },
  { path: '/TeamResults/:event/:team', component: require('./teams/teamResults.vue').default, name: 'TeamResults' },
  { path: '/Teams', component: require('./teams/teams.vue').default, name: 'Teams' },
  { path: '/Team/:team', component: require('./teams/team.vue').default, name: 'Team' }
]

new Vue({
  el: '#app',
  router: new VueRouter({
    mode: 'history',
    routes: routes
  }),
  render: h => h(require('./App.vue').default)
})
