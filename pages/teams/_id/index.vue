<template>
  <b-container>
    <b-card
      :title="(teamData||{}).name"
      tag="article"
      style="max-width: 30rem;"
      class="mb-2"
    >
      <template v-if="(teamData||{}).city">{{((teamData||{}).city||{}).name}}, {{(((teamData||{}).city||{}).country||{}).name}}</template>
    </b-card>

    <vuetable
      id="Team" ref="team" api-url="/api/athletes/" :per-page="perPage" pagination-path='pagination'
      data-path='data' @vuetable:pagination-data="onPaginationData" :append-params="moreParams"
      :fields="fields" :css="css.table" @vuetable:row-clicked="(dataItem, event) => rowClicked(dataItem, event)"
    >
      <template slot="athlete" slot-scope="props">
        <b-button size="sm" variant="light" @click.stop="athleteClick(props.rowData.id)">
          {{props.rowData.first_name}} {{props.rowData.last_name}}
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
import TeamFields from './FieldsDefs.js'
import CssConfig from '~/components/VuetableCssConfig.js'
var coreapi = window.coreapi  // Loaded by `coreapi.js`
var schema = window.schema    // Loaded by `schema.js`
// Initialize a client
var client = new coreapi.Client()
export default {
  data () {
    return {
      perPage: 10,
      moreParams: {
        team: this.$route.params.id
      },
      teamData: null,
      fields: TeamFields,
      css: CssConfig,
      teamId: this.$route.params.id
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
      this.$router.push({ name: 'athletes-id', params: { id: value }})
    },
    countAge (value) {
      if (!value) {
        return
      }
      return value
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
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
