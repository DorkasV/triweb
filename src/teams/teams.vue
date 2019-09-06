<template>
  <b-container>
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
    </b-row>
    <vuetable
      id="Teams" ref="teams" :api-url="`http://localhost:8000/api/teams/`" :per-page="perPage" pagination-path='pagination'
      data-path='data' @vuetable:pagination-data="onPaginationData"
      :fields="fields" :css="css.table" @vuetable:row-clicked="(dataItem, event) => rowClicked(dataItem, event)"
    >
    </vuetable>
    <div class="vuetable-pagination ui basic segment grid">
      <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
      <vuetable-pagination ref="pagination" 
        :css="css.pagination" 
        @vuetable-pagination:change-page="onChangePage">
      </vuetable-pagination>
    </div>
  </b-container>
</template>

<script>
import TeamsFields from './FieldsDefs.js'
import CssConfig from '../VuetableCssConfig.js'
var coreapi = window.coreapi  // Loaded by `coreapi.js`
var schema = window.schema    // Loaded by `schema.js`
// Initialize a client
var client = new coreapi.Client()
export default {
  data () {
    return {
      perPage: 10,
      teamsData: null,
      fields: TeamsFields,
      css: CssConfig
    }
  },
  mounted () {
    this.getData()
  },
  methods:{
    getData () {
      // Interact with the API endpoint
      var action = ["teams", "list"]
      client.action(schema, action).then((result) => {
          // Return value is in 'result'
          this.teamsData = result.data
      })
    },
    rowClicked (dataItem, event) {
      this.$router.push(`/Team/${dataItem.id}`)
    },
    teamCity (value) {
      if (!value) {
        return
      }
      return `${value.name}, ${value.country.name}`
    },
    athletesCount (data) {
      return data.length
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage(page) {
      this.$refs.teams.changePage(page)
    },
    updateTable() {
      this.$refs.teams.refresh()
    }
  }
}
</script>

<style>
#Teams>tbody {
  cursor: pointer;
}
</style>
