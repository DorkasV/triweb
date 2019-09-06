<template>
  <b-container fluid>
    <b-card
      v-if="resultsData"
      :title="((resultsData[0]||{}).event||{}).name"
      tag="article"
      style="max-width: 30rem;"
      class="mb-2"
    >
      {{((resultsData[0]||{}).event||{}).event_date}}, {{(((resultsData[0]||{}).event||{}).city||{}).name}}, {{((((resultsData[0]||{}).event||{}).city||{}).country||{}).name}}
    </b-card>
    <b-row>
      <b-col cols="3">
        <b-row>
          <b-col cols="5">
            <div class="form-group">
              <v-show-entries v-model="perPage" @change="updateTable"></v-show-entries>
            </div>
          </b-col>
          <b-col cols="7">
            <b-form-select v-model="selectedDistance" :options="distanceOptions"></b-form-select>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <vuetable
      id="EventResults" ref="eventResults" :api-url="`http://localhost:8000/api/results/`" :per-page="perPage" pagination-path='pagination'
      data-path='data' @vuetable:pagination-data="onPaginationData" :append-params="moreParams"
      :fields="fields" :css="css.table" @vuetable:row-clicked="(dataItem, event) => rowClicked(dataItem, event)"
    >
      <template slot="athlete" slot-scope="props">
        <b-button size="sm" variant="light" @click="athleteClick(props.rowData.athlete.id)">
          {{props.rowData.athlete.first_name}} {{props.rowData.athlete.last_name}}
        </b-button>
      </template>
    </vuetable>
    <div class="vuetable-pagination ui basic segment grid">
      <!-- <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info> -->
      <vuetable-pagination ref="pagination" 
        :css="css.pagination" 
        @vuetable-pagination:change-page="onChangePage">
      </vuetable-pagination>
    </div>
  </b-container>
</template>

<script>
import ResultsFields from './FieldsDefsEventResults.js'
import CssConfig from '../VuetableCssConfig.js'
var coreapi = window.coreapi  // Loaded by `coreapi.js`
var schema = window.schema    // Loaded by `schema.js`
var client = new coreapi.Client()
export default {
  data () {
    return {
      selectedDistance: null,
      perPage: 10,
      resultsData: [],
      distancesData: [],
      fields: ResultsFields,
      css: CssConfig,
      eventId: this.$route.params.event,
      moreParams: {
        event: this.$route.params.event,
        distance: 4
      }
    }
  },
  computed: {
    distanceOptions () {
      let all = []

      if (this.distancesData)
        all = this.distancesData.map(x => {
          return { text: `${x.name}`, value: x.id }
        })

      all.splice(0, 0, { value: null, text: '--- distance ---'})
      return all
    }
  },
  watch: {
    selectedDistance () {
      this.moreParams.distance = this.selectedDistance
      this.$refs.eventResults.refresh()
    }
  },
  mounted () {
    this.getData()
    this.getDistancesData()
  },
  methods:{
    athleteFullName (value) {
      return `${value.first_name} ${value.last_name}`
    },
    getData () {
      // Interact with the API endpoint
      let action = ["results", "list"]
      let params = {
        event: this.eventId
      }
      client.action(schema, action, params).then((result) => {
          // Return value is in 'result'
          this.resultsData = result.data
      })
    },
    getDistancesData () {
      let action = ["distances", "list"]
      client.action(schema, action).then((result) => {
          // Return value is in 'result'
          this.distancesData = result.results
      })
    },
    rowClicked (dataItem, event) {
      this.$router.push(`/Results/${dataItem.event.id}/${dataItem.athlete.id}`)
    },
    athleteClick (value) {
      this.$router.push(`/Athletes/${value}`)
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      // this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage(page) {
      this.$refs.eventResults.changePage(page)
    },
    updateTable() {
      this.$refs.eventResults.refresh()
    }
  }
}
</script>

<style>
#EventResults>tbody {
  cursor: pointer;
}
</style>
