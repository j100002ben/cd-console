<template>
  <div class="mdl-cell mdl-cell--6-col mdl-cell--3-offset schema-publish">
    <h2>Publish Development Schema <div v-if="loading" class="mdl-spinner mdl-js-spinner is-active"></div></h2>
    <form @submit.prevent="publishSchema">
      <div v-if="schema.Name" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="schema--name" v-model.trim="schema.Name">
        <label class="mdl-textfield__label" for="schema--name">Schema Name (optional)</label>
      </div>
      <div v-if="schema.Name" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="schema--version" v-model.trim="schema.Version">
        <label class="mdl-textfield__label" for="schema--version">Schema Version</label>
      </div>
      <div v-show="submitting" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
      <p class="mdl-typography--text-center submit-form">
        <button type="submit" class="mdl-button mdl-js-button mdl-button--primary" :disabled="loading">
          Publish Development Schema
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SchemaPublish',
  props: ['SchemaArn'],
  data () {
    return {
      schema: {
        Name: '',
        Version: '',
        DevelopmentSchemaArn: ''
      },
      loading: true,
      submitting: false
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next(vm => {
      vm.fetchData()
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
    fetchData () {
      var vm = this
      vm.loading = true
      vm.schema = {
        Name: '',
        Version: '',
        DevelopmentSchemaArn: ''
      }
      vm.$store.dispatch('clouddirectory', {
        api: 'getSchemaAsJson',
        params: {
          SchemaArn: vm.SchemaArn
        }
      }).then((response) => {
        vm.schema.Name = response.data.Name
        vm.schema.DevelopmentSchemaArn = vm.SchemaArn
        vm.loading = false
      }).catch((response) => {
        console.log(response)
        vm.loading = false
      })
    },
    publishSchema () {
      var vm = this
      vm.submitting = true
      vm.$store.dispatch('clouddirectory', {
        api: 'publishSchema',
        params: this.schema
      }).then((response) => {
        if (response.data) {
          vm.$router.push('/Schema/Published')
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
.schema-publish {
  text-align: left;
  color: #2c3e50;
}
h1, h2 {
  font-size: 16px;
  color: rgba(0,0,0,.54);
  font-weight: 500;
  text-transform: uppercase;
}
h2 .mdl-spinner {
  top: 10px;
  margin-left: 10px;
}
.mdl-textfield {
  width: 100%;
}
</style>
