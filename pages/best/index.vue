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
    
    <div v-show="loading" class="overlay flex flex-column items-center justify-center">
			<b-spinner label="Loading..."></b-spinner>
		</div>
    <vuetable
      id="Best" ref="bestPerformance" api-url="/api/results/" :per-page="perPage"
      data-path='data' :append-params="moreParams"
      :fields="fields" :css="css.table" @vuetable:row-clicked="(dataItem, event) => rowClicked(dataItem, event)"
      @vuetable:loading="onLoading" 
			@vuetable:loaded="onLoaded"
    >
      <template slot="id" slot-scope="props">
        <template v-if="bestThree(props.rowIndex)">
          <font-awesome-icon icon="trophy" :style="{ color: trophy(props.rowIndex) }" />
        </template>
        <template v-else>
          {{props.rowIndex}}
        </template>
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
      },
      loading: true
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
          console.log('x', x)
          return `${x.event_date.substring(0, 4)}`
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
      let action = ["events", "list"]
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
    // onPaginationData(paginationData) {
    //   this.$refs.pagination.setPaginationData(paginationData)
    // },
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
    },
    bestThree (value) {
      if (value === 0 || value === 1 || value === 2) {
        return true
      }
      return false
    },
    trophy (value) {
      if (value === 0) {
        return 'gold'
      }
      else if (value === 1) {
        return 'silver'
      }
      else {
        return '#b08d57'
      }
    },
    onLoading() {
      this.loading = true
    },
    onLoaded() {
      this.loading = false
    }
  }
}
</script>

<style>
#Best>tbody {
  cursor: pointer;
}

.overlay { 
		position: absolute; 
		top: 0; left: 0; 
		/* bottom: 0%; right: 0%; */
		width: 100%; height: 100%; 
		z-index: 10; 
		background-color: rgba(0,0,0,0.5);
		/*dim the background*/ 
	}
	.flex {
		display: flex;
	}
	.flex-column {
		flex-direction: column;
	}
	.items-center {
		align-items: center;
	}
	.justify-center {
		justify-content: center;
	}
</style>
