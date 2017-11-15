<template>
  <div class="mdl-cell mdl-cell--6-col mdl-cell--3-offset schema-add">
    <h2>Development Schema Add</h2>
    <form @submit.prevent="addSchema">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="schema--name" v-model.trim="schema.Name">
        <label class="mdl-textfield__label" for="schema--name">Schema Name</label>
      </div>
      <div v-show="submitting" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
      <p class="mdl-typography--text-center submit-form">
        <button type="submit" class="mdl-button mdl-js-button mdl-button--primary">Add Schema</button>
      </p>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SchemaAdd',
  data () {
    return {
      schema: {
        Name: ''
      },
      submitting: false
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next()
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
    addSchema () {
      var vm = this
      vm.submitting = true
      vm.$store.dispatch('clouddirectory', {
        api: 'createSchema',
        params: this.schema
      }).then((response) => {
        if (response.data) {
          vm.$router.push('/Schema/Development')
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
.schema-add {
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
.other-submit-method {
  margin-left: 20px;
  color: #555;
  font-size: 0.9em;
}
</style>
