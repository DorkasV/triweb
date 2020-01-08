<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3">
        <b-row>
          <!-- <b-col cols="3">
            <div class="form-group">
              <v-show-entries v-model="perPage" @change="updateTable"></v-show-entries>
            </div>
          </b-col> -->
          <b-col cols="8">
            <b-form-select v-model="selectedDistance" :options="distanceOptions" @change="selectedDistanceChange"></b-form-select>
          </b-col>
          <b-col cols="4">
            <b-form-select v-model="selectedYear" :options="yearsOptions" @change="selectedYearChange"></b-form-select>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <vuetable
      id="Best" ref="bestPerformance" api-url="/api/results/" :per-page="perPage" pagination-path='pagination'
      data-path='data' @vuetable:pagination-data="onPaginationData" :append-params="moreParams"
      :fields="fields" :css="css.table" @vuetable:row-clicked="(dataItem, event) => rowClicked(dataItem, event)"
    >
      <template slot="id" slot-scope="props">
        {{props.rowIndex + 1}}
      </template>
      <template slot="event" slot-scope="props">
        <b-button size="sm" variant="light" @click.stop="eventClick(props.rowData.event.id)">
          {{(props.rowData.event||{}).name}}
        </b-button>
      </template>
      <template slot="athlete" slot-scope="props">
        <b-button size="sm" variant="light" @click.stop="athleteClick(props.rowData.athlete.id)">
          {{props.rowData.athlete.first_name}} {{props.rowData.athlete.last_name}}
        </b-button>
      </template>
      <template slot="team" slot-scope="props">
        <b-button v-if="props.rowData.team" size="sm" variant="light" @click.stop="teamClick(props.rowData)">
          {{(props.rowData.team||{}).name}}
        </b-button>
      </template>
    </vuetable>
    <!-- <div class="vuetable-pagination ui basic segment grid">
      <vuetable-pagination ref="pagination"
        :css="css.pagination"
        @vuetable-pagination:change-page="onChangePage">
      </vuetable-pagination>
    </div> -->
  </b-container>
</template>

<script>
import Fields from './FieldsDefs.js'
import CssConfig from '~/components/VuetableCssConfig.js'
var coreapi = window.coreapi  // Loaded by `coreapi.js`
var schema = window.schema    // Loaded by `schema.js`
// Initialize a client
var client = new coreapi.Client()
export default {
  data () {
    return {
      selectedDistance: 1,
      selectedYear: new Date().getFullYear(),
      distancesData: [],
      yearsData: [],
      perPage: 100,
      fields: Fields,
      css: CssConfig,
      moreParams: {
        distance: 1,
        search: new Date().getFullYear(),
        ordering: 'total_time'
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
    },
    yearsOptions () {
      let all = []

      if (this.yearsData)
        all = this.yearsData.map(x => {
          return `${x.event.event_date.substring(0, 4)}`
        })

      all.splice(0, 0, '--- year ---')
      all.splice(1, 0, new Date().getFullYear())
      return all.filter((v, i, a) => a.indexOf(v) === i)
    }
  },
  mounted () {
    this.getDistancesData()
    this.getEventsYearsData()
  },
  methods:{
    transform(data) {
      data.data = data.data.filter(x => x.running_time != '00:00:00')
      return data
    },
    selectedDistanceChange () {
      this.moreParams.distance = this.selectedDistance
      this.$refs.bestPerformance.refresh()
    },
    selectedYearChange () {
      this.moreParams.search = this.selectedYear
      this.$refs.bestPerformance.refresh()
    },
    getDistancesData () {
      let action = ["distances", "list"]
      client.action(schema, action).then((result) => {
          // Return value is in 'result'
          this.distancesData = result.results
      })
    },
    getEventsYearsData () {
      let action = ["results", "list"]
      client.action(schema, action).then((result) => {
          // Return value is in 'result'
          this.yearsData = result.data
      })
    },
    eventClick (value) {
      this.$router.push({ name: 'results-id', params: { id: value }})
    },
    rowClicked (dataItem, event) {
      this.$router.push({ name: 'results-id-athlete', params: {
        id: dataItem.event.id,
        athlete: dataItem.athlete.id
      }})
    },
    athleteClick (value) {
      this.$router.push({ name: 'athletes-id', params: { id: value }})
    },
    teamClick (value) {
      this.$router.push({ name: 'teams-id-event', params: {
        event: value.event.id,
        id: value.team.id
      }})
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage(page) {
      this.$refs.bestPerformance.changePage(page)
    },
    updateTable() {
      this.$refs.bestPerformance.refresh()
    },
    timeFormat (value) {
      if (!value) {
        return
      }
      return value.substring(0,11)
    }
  }
}
</script>

<style>
#Best>tbody {
  cursor: pointer;
}
</style>
