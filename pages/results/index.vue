<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3">
        <b-row>
          <b-col cols="5">
            <div class="form-group">
              <v-show-entries v-model="perPage" @change="updateTable"></v-show-entries>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="3">
        <b-form-input v-model="moreParams.search" placeholder="Search..."></b-form-input>
      </b-col>
    </b-row>
    <vuetable
      id="Results" ref="results" api-url="/api/results/" :per-page="perPage" pagination-path='pagination'
      data-path='data' @vuetable:pagination-data="onPaginationData" :append-params="moreParams"
      :fields="fields" :css="css.table" @vuetable:row-clicked="(dataItem, event) => rowClicked(dataItem, event)"
    >
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
    <div class="vuetable-pagination ui basic segment grid">
      <vuetable-pagination ref="pagination"
        :css="css.pagination"
        @vuetable-pagination:change-page="onChangePage">
      </vuetable-pagination>
    </div>
  </b-container>
</template>

<script>
import ResultsFields from './FieldsDefs.js'
import CssConfig from '~/components/VuetableCssConfig.js'

var coreapi = window.coreapi  // Loaded by `coreapi.js`
var schema = window.schema    // Loaded by `schema.js`
// Initialize a client
var client = new coreapi.Client()

export default {
  data () {
    return {
      title: 'Results',
      perPage: 10,
      resultsData: null,
      fields: ResultsFields,
      css: CssConfig,
      moreParams: {
        search: ''
      }
    }
  },
  head () {
    return {
      title: this.$store.getters.getSiteTitle(this.title)
    }
  },
  watch: {
    'moreParams.search'() {
      this.$refs.results.refresh()
    }
  },
  mounted () {
    // this.getData()
  },
  methods:{
    athleteFullName (value) {
      return `${value.first_name} ${value.last_name}`
    },
    getData () {
      // Interact with the API endpoint
      var action = ["results", "list"]
      client.action(schema, action).then((result) => {
          // Return value is in 'result'
          this.resultsData = result.results
      })
    },
    rowClicked (dataItem, event) {
      this.$router.push({ name: 'results-id-athlete', params: {
        id: dataItem.event.id,
        athlete: dataItem.athlete.id
      }})
    },
    eventClick (value) {
      this.$router.push({ name: 'results-id', params: { id: value }})
    },
    athleteClick (value) {
      this.$router.push({ name: 'athletes-id', params: { id: value }})
    },
    teamClick (value) {
      this.$router.push({ name: 'teams-id-event', params: {
        event: value.event.id,
        id: value.team.id
      }})
      // this.$router.push(`/TeamResults/${value.event.id}/${value.team.id}`)
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage(page) {
      this.$refs.results.changePage(page)
    },
    updateTable() {
      this.$refs.results.refresh()
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
#Results>tbody {
  cursor: pointer;
}
</style>
