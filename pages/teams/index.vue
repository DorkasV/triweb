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
      <b-col cols="3">
        <b-form-input v-model="moreParams.search" placeholder="Search..."></b-form-input>
      </b-col>
    </b-row>
    <vuetable
      id="Teams" ref="teams" api-url="/api/teams/" :per-page="perPage" pagination-path='pagination'
      data-path='data' @vuetable:pagination-data="onPaginationData" :append-params="moreParams"
      :fields="fields" :css="css.table" @vuetable:row-clicked="(dataItem, event) => rowClicked(dataItem, event)"
    >
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
import TeamsFields from './FieldsDefs.js'
import CssConfig from '~/components/VuetableCssConfig.js'
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
      css: CssConfig,
      moreParams: {
        search: ''
      }
    }
  },
  mounted () {
    // this.getData()
  },
  watch: {
    'moreParams.search'() {
      this.$refs.teams.refresh()
    }
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
      this.$router.push({ name: 'teams-id', params: { id: dataItem.id }})
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
