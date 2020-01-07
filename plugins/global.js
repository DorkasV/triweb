import Vue from 'vue'
// import BootstrapVue from "bootstrap-vue"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap-vue/dist/bootstrap-vue.css"
// import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import Vuetable from 'vuetable-2'
// import moment from 'moment'
import ShowEntries from '~/components/ShowEntries'
import Footer from '~/components/Footer'

import {
  VuetablePagination,
  VuetablePaginationInfo
} from 'vuetable-2'

// Vue.use(BootstrapVue)
// Vue.use(VueRouter)
// Vue.use(VueResource)
Vue.component("vuetable", Vuetable)
Vue.component("vuetable-pagination", VuetablePagination)
Vue.component("vuetable-pagination-info", VuetablePaginationInfo)
Vue.component('v-show-entries', ShowEntries)
Vue.component('v-footer', Footer)
