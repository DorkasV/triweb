import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    { 
      path: '/Events', 
      component: require('../components/events/events.vue').default, 
      name: 'Events' 
    },
    { 
      path: '/Athletes', 
      component: require('../components/athletes/athletes.vue').default, 
      name: 'Athletes' 
    },
    { 
      path: '/Results', 
      component: require('../components/results/results.vue').default, 
      name: 'Results' 
    },
  ]
})
