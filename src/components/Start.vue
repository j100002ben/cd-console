<template>
  <div class="mdl-cell mdl-cell--6-col mdl-cell--3-offset" id="start-login-form">
    <h2>Login with your AWS credential</h2>
    <form @submit.prevent="awsLogin">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="aws-access_key" v-model.trim="config.accessKey">
        <label class="mdl-textfield__label" for="aws-access_key">Access Key</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="aws-secret_key" v-model.trim="config.secretKey">
        <label class="mdl-textfield__label" for="aws-secret_key">Secret Key</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="api-endpoint" v-model.trim="config.endPoint">
        <label class="mdl-textfield__label" for="api-endpoint">API Endpoint</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="api-region" v-model.trim="config.region">
        <label class="mdl-textfield__label" for="api-region">API Region</label>
      </div>
      <div v-show="submitting" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
      <p class="mdl-typography--text-right submit-form">
        <button type="submit" class="mdl-button mdl-js-button mdl-button--primary">
          Login
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

var apigClientFactory = window.apigClientFactory
export default {
  name: 'Start',
  data () {
    return {
      name: 'Start',
      submitting: false,
      config: {
        accessKey: '',
        secretKey: '',
        endPoint: '',
        region: ''
      }
    }
  },
  computed: {
    ...mapState({
      redirectTo: state => state.redirectTo
    })
  },
  mounted () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      var credentials = window.localStorage.getItem('credentials')
      var flag = false
      if (credentials) {
        credentials = window.JSON.parse(credentials)
        for (const key of Object.keys(this.config)) {
          this.config[key] = credentials[key] || ''
          flag = flag || !!credentials[key]
        }
      }
      if (!flag) {
        window.componentHandler.upgradeDom()
      }
    })
  },
  methods: {
    awsLogin () {
      var vm = this
      var cdClient = apigClientFactory.newClient(this.config.endPoint, {
        region: this.config.region,
        accessKey: this.config.accessKey,
        secretKey: this.config.secretKey
        // OPTIONAL: If you are using temporary credentials you must include the session token
        // sessionToken: 'SESSION_TOKEN'
      })
      vm.submitting = true
      cdClient.listDirectories({
        MaxResults: 30,
        NextToken: null
      })
      .then((response) => {
        vm.$store.dispatch('login', {
          config: vm.config,
          client: cdClient,
          directories: response.data.Directories
        }).then(() => {
          var redirectTo = vm.redirectTo || '/Directory'
          vm.$router.push(redirectTo)
        })
        vm.submitting = false
      })
      .catch((response) => {
        console.log(response)
        vm.$store.commit('awsLoginStatus', false)
        vm.submitting = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
