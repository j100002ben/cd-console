<template>
  <div class="directory">
    <div v-show="loading" class="mdl-progress mdl-js-progress mdl-progress__indeterminate" style="width:100%"></div>
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" width="100%">
      <thead>
        <tr>
          <th>
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for="table-header">
              <input type="checkbox" id="table-header" class="mdl-checkbox__input" @change="tableSelect">
            </label>
          </th>
          <th class="mdl-data-table__cell--non-numeric">Directory Name</th>
          <th class="mdl-data-table__cell--non-numeric">Directory ID</th>
          <th class="mdl-data-table__cell--non-numeric">State</th>
          <th class="mdl-data-table__cell--non-numeric">Launch time</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dir, index) in directories">
          <td>
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" :for="'trow' + index">
              <input type="checkbox" :id="'trow' + index" class="mdl-checkbox__input" @change="rowSelect">
            </label>
          </td>
          <td class="mdl-data-table__cell--non-numeric">{{ dir.Name }}</td>
          <td class="mdl-data-table__cell--non-numeric">{{ dir.DirectoryArn.split(/[\\/]/).pop() }}</td>
          <td class="mdl-data-table__cell--non-numeric">{{ dir.State }}</td>
          <td class="mdl-data-table__cell--non-numeric">{{ dir.CreationDateTime }}</td>
          <td v-if="currentDirectory.DirectoryArn !== dir.DirectoryArn" class="mdl-data-table__cell--non-numeric">
            <button v-if="dir.State === 'ENABLED'" @click="changeDirectoryState(dir.DirectoryArn, 'DISABLED')" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
              DISABLE
            </button>
            <button v-if="dir.State === 'DISABLED'" @click="changeDirectoryState(dir.DirectoryArn, 'ENABLED')" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
              ENABLE
            </button>
            <button v-if="dir.State === 'DISABLED'" @click="changeDirectoryState(dir.DirectoryArn, 'DELETED')" class="mdl-button mdl-js-button mdl-button--raised">
              DELETE
            </button>
          </td>
          <td v-else class="mdl-data-table__cell--non-numeric">
            Cannot modify current directory.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Directory',
  data () {
    return {
      name: 'Directory',
      loading: false
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next()
    // getPost(to.params.id, (err, post) => {
    //   next(vm => vm.setData(err, post))
    // })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    next()
    // this.post = null
    // getPost(to.params.id, (err, post) => {
    //   this.setData(err, post)
    //   next()
    // })
  },
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    next()
  },
  computed: {
    ...mapState({
      directories: state => state.directories,
      currentDirectory: state => state.currentDirectory
    })
  },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      window.componentHandler.upgradeDom()
    })
  },
  methods: {
    ...mapActions({
      tableSelect: 'tableSelect',
      rowSelect: 'rowSelect'
    }),
    changeDirectoryState (directoryArn, state) {
      var vm = this
      var api = state.toLowerCase().slice(0, -1) + 'Directory'
      vm.loading = true
      vm.$store.dispatch('clouddirectory', {
        api: api,
        params: {
          DirectoryArn: directoryArn
        }
      }).then((response) => {
        if (response.data.DirectoryArn) {
          vm.$store.commit('setDirectoryState', {
            DirectoryArn: directoryArn,
            State: state
          })
        }
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
.directory {
  min-width: 100%;
}
td .mdl-button {
  margin-left:  20px
}
td .mdl-button:first-child {
  margin-left: 0;
}
</style>
