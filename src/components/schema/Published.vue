<template>
  <div class="schema schema--published">
    <div v-show="loading" class="mdl-progress mdl-js-progress mdl-progress__indeterminate" style="width:100%"></div>
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" width="100%">
      <thead>
        <tr>
          <th>
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for="table-header">
              <input type="checkbox" id="table-header" class="mdl-checkbox__input" @change="tableSelect">
            </label>
          </th>
          <th class="mdl-data-table__cell--non-numeric">Schema Arn</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(arn, index) in schemaArns">
          <td>
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" :for="'trow' + index">
              <input type="checkbox" :id="'trow' + index" class="mdl-checkbox__input" @change="rowSelect">
            </label>
          </td>
          <td class="mdl-data-table__cell--non-numeric">{{ arn }}</td>
          <td class="mdl-data-table__cell--non-numeric">
            <router-link :to="{ name: 'SchemaApply', params: { SchemaArn: arn }}" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Apply</router-link>
            <router-link :to="{ name: 'SchemaDelete', params: { SchemaArn: arn }}" class="mdl-button mdl-js-button">Delete</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PublishedSchema',
  data () {
    return {
      name: 'PublishedSchema',
      loading: true,
      schemaArns: []
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next(vm => {
      vm.listSchemaArns()
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    next()
  },
  computed: {
    ...mapState({
    })
  },
  watch: {
  },
  mounted () {
    this.$nextTick(() => {
      // Code that will run only after the
      // entire view has been rendered
      window.componentHandler.upgradeDom()
    })
  },
  updated () {
    this.$nextTick(() => {
      // Code that will run only after the
      // entire view has been re-rendered
      window.componentHandler.upgradeDom()
    })
  },
  methods: {
    ...mapActions({
      tableSelect: 'tableSelect',
      rowSelect: 'rowSelect'
    }),
    listSchemaArns () {
      var vm = this
      vm.loading = true
      vm.schemaArns = []
      vm.$store.dispatch('clouddirectory', {
        api: 'listPublishedSchemaArns',
        params: {
          MaxResults: 30,
          NextToken: null
        }
      }).then((response) => {
        vm.schemaArns = response.data.SchemaArns
        vm.loading = false
      }).catch((response) => {
        console.log(response)
        vm.loading = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.schema {
  min-width: 100%;
}
</style>
