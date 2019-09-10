<template>
  <b-container fluid>
    <p>{{ resultsData }}</p>
    <b-card
      v-if="resultsData.length"
      :title="resultsData[0].athlete.first_name + ' ' + resultsData[0].athlete.last_name + ', ' + countAge(resultsData[0].athlete.birth_date)"
      tag="article"
      style="max-width: 30rem;"
      class="mb-2"
    >
    </b-card>
    <b-card v-if="resultsData" title="Results" tag="article" class="mb-2">
      <vuetable
        v-if="resultsData" id="AthleteResults" ref="athleteResults" :api-mode="false" :data="resultsData"
        :fields="fieldsAthleteResults" :css="css.table" @vuetable:row-clicked="(dataItem, event) => rowClicked(dataItem, event)"
      >
        <template slot="event" slot-scope="props">
          <b-button size="sm" variant="light" @click.stop="eventClick(props.rowData.event.id)">
            {{props.rowData.event.name}}
          </b-button>
        </template>
      </vuetable>
    </b-card>
  </b-container>
</template>

<script>
import FieldsDefs from './FieldsDefs.js'
import CssConfig from '~/components/VuetableCssConfig.js'
import moment from 'moment'

var coreapi = window.coreapi  // Loaded by `coreapi.js`
var schema = window.schema    // Loaded by `schema.js`
var client = new coreapi.Client()
export default {
  data () {
    return {
      fieldsAthleteResults: FieldsDefs,
      css: CssConfig,
      resultsData: [],
      athleteId: this.$route.params.id,
    }
  },
  mounted () {
    this.getData()
  },
  methods:{
    getData () {
      // Interact with the API endpoint
      let action = ["results", "list"]
      let params = {
        athlete: this.athleteId
      }
      client.action(schema, action, params).then((result) => {
        // Return value is in 'athletes'
        this.resultsData = result.data
      })
    },
    eventClick (value) {
      this.$router.push({ name: 'results-id', params: { id: value }})
    },
    rowClicked (dataItem, event) {
      console.log('rowClicked', dataItem)
      this.$router.push({ name: 'results-id-athlete', params: {
        id: dataItem.event.id,
        athlete: dataItem.athlete.id
      }})
    },
    countAge (value) {
      return moment().diff(value, 'years', false)
    },
    runPace (data) {
      // return 60/(distance/1000/time/24)
    }
  }
}
</script>

<style>
#AthleteResults>tbody {
  cursor: pointer;
}
</style>
