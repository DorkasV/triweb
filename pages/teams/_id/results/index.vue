<template>
  <b-container fluid>
    <vuetable
      id="TeamResults" ref="teamReasults" :api-mode="false" :data="teamResultsData"
      :fields="fields" :css="css.table" @vuetable:row-clicked="(dataItem, event) => rowClicked(dataItem, event)"
    >
      <template slot="athlete" slot-scope="props">
        <b-button size="sm" variant="light" @click.stop="athleteClick(props.rowData.athlete.id)">
          {{props.rowData.athlete.first_name}} {{props.rowData.athlete.last_name}}
        </b-button>
      </template>
      <template slot="event" slot-scope="props">
        <b-button size="sm" variant="light" @click.stop="eventClick(props.rowData.event.id)">
          {{props.rowData.event.name}}
        </b-button>
      </template>
    </vuetable>
  </b-container>
</template>

<script>
import TeamResultsFields from './FieldsDefs.js'
import CssConfig from '~/components/VuetableCssConfig.js'
var coreapi = window.coreapi  // Loaded by `coreapi.js`
var schema = window.schema    // Loaded by `schema.js`
// Initialize a client
var client = new coreapi.Client()
export default {
  data () {
    return {
      teamResultsData: null,
      fields: TeamResultsFields,
      css: CssConfig,
      teamId: this.$route.params.team,
      athleteId: this.$route.params.athlete,
      eventId: this.$route.params.event
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
        event: this.eventId,
        team: this.teamId
      }
      client.action(schema, action, params).then((result) => {
          // Return value is in 'result'
          this.teamResultsData = result.data
      })
    },
    rowClicked (dataItem, event) {
      // this.$router.push(`/Results/${dataItem.event.id}/${dataItem.athlete.id}`)
    },
    teamCity (value) {
      return `${value.name}, ${value.country.name}`
    },
    athletesCount (data) {
      return data.length
    },
    athleteClick (value) {
      this.$router.push(`/Athletes/${value}`)
    },
    eventClick (value) {
      this.$router.push(`/Results/${value}`)
    }
  }
}
</script>

<style>
#Results>tbody {
  cursor: pointer;
}
</style>
