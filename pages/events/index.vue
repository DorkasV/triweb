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
      id="Events" ref="events" :api-url="`/api/events/`" :per-page="perPage" pagination-path='pagination'
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
import EventsFields from './FieldsDefs.js'
import CssConfig from '~/components/VuetableCssConfig.js'
export default {
  data () {
    return {
      perPage: 10,
      fields: EventsFields,
      css: CssConfig,
      eventsData: [],
      moreParams: {
        search: ''
      }
    }
  },
  watch: {
    'moreParams.search'() {
      this.$refs.events.refresh()
    }
  },
  mounted () {
    // this.getData()
  },
  methods:{
    eventPlace (value) {
      if (!value)
        return '&mdash;'
      return `${value.name}, ${value.country.name}`
    },
    getData () {
      var coreapi = window.coreapi  // Loaded by `coreapi.js`
      var schema = window.schema    // Loaded by `schema.js`

      // Initialize a client
      var client = new coreapi.Client()

      // Interact with the API endpoint
      var action = ["events", "list"]
      client.action(schema, action).then((result) => {
          // Return value is in 'events'
          this.eventsData = result.results
      })
    },
    rowClicked (dataItem, event) {
      this.$router.push({ name: 'results-id', params: { id: dataItem.id }})
    },
    athletesInEvent (data) {
      return data.length
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage(page) {
      this.$refs.events.changePage(page)
    },
    updateTable() {
      this.$refs.events.refresh()
    }
  }
}
</script>

<style>
#Events>tbody {
  cursor: pointer;
}
</style>
