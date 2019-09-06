<template>
  <b-container>
    <!-- <vuetable
      id="Athletes" ref="athletes" :api-mode="false" :data="athletesData"
      :fields="fields" :css="css.table" @vuetable:row-clicked="(dataItem, event) => rowClicked(dataItem, event)"
    >
      <template slot="athlete" slot-scope="props">
        <b-button size="sm" variant="light" @click="athleteClick(props.rowData.id)">
          {{props.rowData.first_name}} {{props.rowData.last_name}}
        </b-button>
      </template>
    </vuetable> -->
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
      id="Athletes" ref="athletes" :api-url="`http://localhost:8000/api/athletes/`" :per-page="perPage" pagination-path='pagination'
      :sort-order="sortOrder" :append-params="moreParams" data-path='data' @vuetable:pagination-data="onPaginationData"
      :fields="fields" :css="css.table" @vuetable:row-clicked="(dataItem, event) => rowClicked(dataItem, event)"
    >
      <template slot="athlete" slot-scope="props">
        <b-button size="sm" variant="light" @click="athleteClick(props.rowData.id)">
          {{props.rowData.first_name}} {{props.rowData.last_name}}
        </b-button>
      </template>
      <template slot="team" slot-scope="props">
        <b-button v-if="props.rowData.team" size="sm" variant="light" @click="teamClick(props.rowData)">
          {{(props.rowData.team||{}).name}}
        </b-button>
      </template>
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
import AthletesFields from './FieldsDefs.js'
import CssConfig from '../VuetableCssConfig.js'
import moment from 'moment'
var coreapi = window.coreapi  // Loaded by `coreapi.js`
var schema = window.schema    // Loaded by `schema.js`
var client = new coreapi.Client()
export default {
  data () {
    return {
      fields: AthletesFields,
      css: CssConfig,
      athletesData: null,
      athleteId: null,
      perPage: 10,
      sortOrder: [
        // { field: 'posid', direction: 'asc' }
      ],
      moreParams: {
      }
    }
  },
  mounted () {
    // this.getData()
  },
  methods:{
    getData () {
      // Interact with the API endpoint
      let action = ["athletes", "list"]
      client.action(schema, action).then((result) => {
        // Return value is in 'athletes'
        this.athletesData = result.results
      })
    },
    rowClicked (dataItem, event) {
      this.$router.push(`/Athletes/${dataItem.id}`)
    },
    athleteClick (value) {
      this.$router.push(`/Athletes/${value}`)
    },
    countAge (value) {
      if (!value) {
        return
      }
      return moment().diff(value, 'years', false)
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage(page) {
      this.$refs.athletes.changePage(page)
    },
    updateTable() {
      this.$refs.athletes.refresh()
    },
    teamClick (value) {
      // this.$router.push(`/TeamResults/${value.event.id}/${value.team.id}`)
    },
    teamCity (value) {
      if (!value) {
        return
      }
      return `${value.name}, ${value.country.name}`
    }
  }
}
</script>

<style>
#Athletes>tbody,
#Events>tbody {
  cursor: pointer;
}
</style>
