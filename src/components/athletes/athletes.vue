<template>
  <div>
    <vuetable
      ref="athletes" :api-mode="false" :data="athletesData"
      :fields="fields" :css="css.table"
    >
    </vuetable>
  </div>
</template>

<script>
// import ItemsFields from './FieldsDefs.js'
import CssConfig from '../../VuetableCssConfig.js'
export default {
  data () {
    return {
      msg: 'athletes',
      fields: [
        {
          title: 'First name',
          name: 'first_name',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'Last name',
          name: 'last_name',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'Birth date',
          name: 'birth_date',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'Age',
          name: 'age',
          dataClass: 'text-center',
          titleClass: 'text-center'
        },
        {
          title: 'Gender',
          name: 'gender',
          dataClass: 'text-center',
          titleClass: 'text-center'
        }
      ],
      css: CssConfig,
      athletesData: null
    }
  },
  mounted () {
    this.getData()
  },
  methods:{
    getData () {
      var coreapi = window.coreapi  // Loaded by `coreapi.js`
      var schema = window.schema    // Loaded by `schema.js`

      // Initialize a client
      var client = new coreapi.Client()

      // Interact with the API endpoint
      var action = ["athletes", "list"]
      let x = this
      client.action(schema, action).then(function(result) {
          // Return value is in 'athletes'
          x.athletesData = result.results
      })
    }
  }
}
</script>
