<template>
  <div>
    <vuetable
      ref="results" :api-mode="false" :data="resultsData"
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
      resultsData: null,
      msg: 'results',
      fields: [
        {
          title: 'Event',
          name: 'event.name',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'Event Date',
          name: 'event.event_date',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'Event City',
          name: 'event.city.name',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'Athlete',
          name: 'athlete',
          callback: 'athleteFullName',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'Distance',
          name: 'distance.name',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'Group',
          name: 'group.name',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'Swimming Time',
          name: 'swimming_time',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'T1',
          name: 't1',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'Biking Time',
          name: 'biking_time',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'T2',
          name: 't2',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'Running Time',
          name: 'running_time',
          dataClass: 'text-center',
          titleClass: 'text-center'
        }
      ],
      css: CssConfig
    }
  },
  mounted () {
    this.getData()
  },
  methods:{
    athleteFullName (value) {
      return `${value.first_name} ${value.last_name}`
    },
    getData () {
      var coreapi = window.coreapi  // Loaded by `coreapi.js`
      var schema = window.schema    // Loaded by `schema.js`

      // Initialize a client
      var client = new coreapi.Client()

      // Interact with the API endpoint
      var action = ["results", "list"]
      let x = this
      client.action(schema, action).then(function(result) {
          // Return value is in 'result'
          x.resultsData = result.results
      })
    }
  }
}
</script>
