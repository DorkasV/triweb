<template>
  <b-container fluid>
    <b-card
      v-if="resultsData"
      :title="title"
      tag="article"
      style="max-width: 50rem;"
      class="mb-2"
    >
      {{ subtitle }}
    </b-card>

    <vuetable
      v-if="resultsData"
      id="AthleteEventResults" ref="athleteEventResults" :api-mode="false" :data="resultsData"
      :fields="fields" :css="css.table"
    >
    </vuetable>
  </b-container>
</template>

<script>
import ResultsFields from './FieldsDefs.js'
import CssConfig from '~/components/VuetableCssConfig.js'
var coreapi = window.coreapi  // Loaded by `coreapi.js`
var schema = window.schema    // Loaded by `schema.js`
var client = new coreapi.Client()
export default {
  data () {
    return {
      resultsData: null,
      fields: ResultsFields,
      css: CssConfig,
      eventId: this.$route.params.id,
      athleteId: this.$route.params.athlete,
    }
  },
  computed: {
    title () {
      return this.athleteFullName(this.resultsData[0].athlete) + ' on ' + this.resultsData[0].event.name
    },
    subtitle () {
      return ((this.resultsData[0]||{}).event||{}).event_date, (((this.resultsData[0]||{}).event||{}).city||{}).name, ((((this.resultsData[0]||{}).event||{}).city||{}).country||{}).name
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
      // Interact with the API endpoint
      var action = ["results", "list"]
      let params = {
        event: this.eventId,
        athlete: this.athleteId
      }
      client.action(schema, action, params).then((result) => {
          // Return value is in 'result'
          this.resultsData = result.data
      })
    }
  }
}
</script>
