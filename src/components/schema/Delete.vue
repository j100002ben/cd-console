<template>
  <div class="mdl-cell mdl-cell--6-col mdl-cell--3-offset schema-publish">
    <h2>Delete Schema <div v-if="loading" class="mdl-spinner mdl-js-spinner is-active"></div></h2>
    <form @submit.prevent="deleteSchema">
      <div v-if="schema.Name" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="schema--name" v-model.trim="schema.Name" disabled>
        <label class="mdl-textfield__label" for="schema--name">Schema Name</label>
      </div>
      <div v-if="schema.Name" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="schema--arn" v-model.trim="schema.SchemaArn" disabled>
        <label class="mdl-textfield__label" for="schema--arn">Schema Arn</label>
      </div>
      <div v-show="submitting" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
      <p class="mdl-typography--text-center submit-form">
        <button type="submit" class="mdl-button mdl-js-button mdl-button--primary" :disabled="loading">
          Confirm Delete Schema
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SchemaDelete',
  props: ['SchemaArn'],
  data () {
    return {
      from: '',
      schema: {
        Name: '',
        SchemaArn: ''
      },
      loading: true,
      submitting: false
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next(vm => {
      vm.from = from.path
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
        SchemaArn: ''
      }
      vm.$store.dispatch('clouddirectory', {
        api: 'getSchemaAsJson',
        params: {
          SchemaArn: vm.SchemaArn
        }
      }).then((response) => {
        vm.schema.Name = response.data.Name
        vm.schema.SchemaArn = vm.SchemaArn
        vm.loading = false
      }).catch((response) => {
        console.log(response)
        vm.loading = false
      })
    },
    deleteSchema () {
      var vm = this
      vm.submitting = true
      vm.$store.dispatch('clouddirectory', {
        api: 'deleteSchema',
        params: {
          SchemaArn: vm.SchemaArn
        }
      }).then((response) => {
        if (response.data) {
          vm.$router.push(vm.from)
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
