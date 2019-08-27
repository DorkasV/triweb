<template>
  <div>
    <vuetable
      ref="events" :api-mode="false" :data="eventsData"
      :fields="fields" :css="css.table"
    >
    </vuetable>
  </div>
</template>

<script>
// import ItemsFields from './FieldsDefs.js'
import CssConfig from '../../VuetableCssConfig.js'
export default {
  data () {
    return {
      msg: 'events',
      fields: [
        {
          title: 'Event',
          name: 'name',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'Date',
          name: 'event_date',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'City',
          name: 'city',
          callback: 'eventPlace',
          dataClass: 'text-center',
          titleClass: 'text-center'
        }
      ],
      css: CssConfig,
      eventsData: null
    }
  },
  mounted () {
    this.getData()
  },
  methods:{
    eventPlace (value) {
      return `${value.name}, ${value.country.name}`
    },
    getData () {
      var coreapi = window.coreapi  // Loaded by `coreapi.js`
      var schema = window.schema    // Loaded by `schema.js`

      console.log('aa', schema)

      // Initialize a client
      var client = new coreapi.Client()

      // Interact with the API endpoint
      var action = ["events", "list"]
      let x = this
      client.action(schema, action).then(function(result) {
          // Return value is in 'events'
          x.eventsData = result.results
      })
    }
  }
}
</script>
