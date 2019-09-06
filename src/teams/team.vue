<template>
  <b-container>
    <b-card
      :title="(teamData||{}).name"
      tag="article"
      style="max-width: 30rem;"
      class="mb-2"
    >
      {{((teamData||{}).city||{}).name}}, {{(((teamData||{}).city||{}).country||{}).name}}
    </b-card>

    <vuetable
      id="Team" ref="team" :api-url="`http://localhost:8000/api/athletes/`" :per-page="perPage" pagination-path='pagination'
      data-path='data' @vuetable:pagination-data="onPaginationData" :append-params="moreParams"
      :fields="fields" :css="css.table" @vuetable:row-clicked="(dataItem, event) => rowClicked(dataItem, event)"
    >
      <template slot="athlete" slot-scope="props">
        <b-button size="sm" variant="light" @click="athleteClick(props.rowData.id)">
          {{props.rowData.first_name}} {{props.rowData.last_name}}
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
import TeamFields from './FieldsDefsTeam.js'
import CssConfig from '../VuetableCssConfig.js'
var coreapi = window.coreapi  // Loaded by `coreapi.js`
var schema = window.schema    // Loaded by `schema.js`
// Initialize a client
var client = new coreapi.Client()
export default {
  data () {
    return {
      perPage: 10,
      moreParams: {
        team: this.$route.params.team
      },
      teamData: null,
      fields: TeamFields,
      css: CssConfig,
      teamId: this.$route.params.team
    }
  },
  mounted () {
    this.getData()
  },
  methods:{
    getData () {
      // Interact with the API endpoint
      let action = ["teams", "read"]
      let params = {
        id: this.teamId
      }
      client.action(schema, action, params).then((result) => {
          // Return value is in 'result'
          this.teamData = result
      })
    },
    rowClicked (dataItem, event) {
      // this.$router.push(`/Results/${dataItem.event.id}/${dataItem.athlete.id}`)
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
    athleteClick (value) {
      this.$router.push(`/Athletes/${value}`)
    },
    countAge (value) {
      if (!value) {
        return
      }
      return value
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage(page) {
      this.$refs.team.changePage(page)
    },
    updateTable() {
      this.$refs.team.refresh()
    }
  }
}
</script>

<style>
#Results>tbody {
  cursor: pointer;
}
</style>
