<template>
  <div class="mdl-cell mdl-cell--6-col mdl-cell--3-offset directory-add">
    <h2>Directory Add</h2>
    <form @submit.prevent="addDirectory">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="directory--name" v-model.trim="directory.Name">
        <label class="mdl-textfield__label" for="directory--name">Directory Name</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" :class="{'is-upgraded': directory.SchemaArn, 'is-dirty': directory.SchemaArn}">
        <label class="mdl-textfield__label">Published Schema Arn</label>
        <multiselect v-model="directory.SchemaArn" :custom-label="formatSchemaArn" :options="schemaArns" :loading="loading" placeholder="Published Schema Arn" class="mdl-textfield__input"></multiselect>
      </div>
      <div v-show="submitting" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
      <p class="mdl-typography--text-center submit-form">
        <button type="submit" class="mdl-button mdl-js-button mdl-button--primary" :disabled="loading">
          Add Directory
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  name: 'DirectoryAdd',
  data () {
    return {
      directory: {
        Name: '',
        SchemaArn: ''
      },
      loading: true,
      submitting: false,
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
    },
    formatSchemaArn (arn) {
      return arn.split(/[:]/).pop()
    },
    addDirectory () {
      var vm = this
      vm.submitting = true
      vm.$store.dispatch('clouddirectory', {
        api: 'createDirectory',
        params: this.directory
      }).then((response) => {
        if (response.data) {
          return vm.$store.dispatch('refreshDirectory').then(() => {
            vm.submitting = false
            vm.$router.push('/Directory')
          })
        }
      }).catch((response) => {
        console.log(response)
        vm.submitting = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.directory-add {
  text-align: left;
  color: #2c3e50;
}
h1, h2 {
  font-size: 16px;
  color: rgba(0,0,0,.54);
  font-weight: 500;
  text-transform: uppercase;
}
.mdl-textfield {
  width: 100%;
}
</style>
