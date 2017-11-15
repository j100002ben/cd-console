<template>
  <div class="mdl-cell mdl-cell--6-col mdl-cell--3-offset schema-apply">
    <h2>Apply Published Schema</h2>
    <form @submit.prevent="applySchema">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <label class="mdl-textfield__label">Directory Arn</label>
        <multiselect v-model="directory" :custom-label="formatDirectory" :options="enabledDirectories" placeholder="Directory Arn" label="Name" track-by="DirectoryArn" class="mdl-textfield__input"></multiselect>
      </div>
      <div v-show="submitting" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
      <p class="mdl-typography--text-center submit-form">
        <button type="submit" class="mdl-button mdl-js-button mdl-button--primary">
          Apply Published Schema
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  name: 'SchemaApply',
  props: ['SchemaArn'],
  data () {
    return {
      directory: {},
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
    }),
    ...mapGetters({
      enabledDirectories: 'enabledDirectories'
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
    formatDirectory ({Name, DirectoryArn}) {
      if (!Name || !DirectoryArn) {
        return ''
      }
      var arn = DirectoryArn.split(/[\\/]/).pop()
      return `${Name} - [${arn}]`
    },
    applySchema () {
      var vm = this
      vm.submitting = true
      vm.$store.dispatch('clouddirectory', {
        api: 'applySchema',
        params: {
          PublishedSchemaArn: vm.SchemaArn,
          DirectoryArn: vm.directory.DirectoryArn
        }
      }).then((response) => {
        if (response.data) {
          vm.$router.push('/Schema/Applied')
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
.schema-apply {
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
