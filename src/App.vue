<template>
  <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header" :class="{ 'mdl-layout--fixed-drawer': isAWSLogin, 'is-upgraded': isAWSLogin }">
    <header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
      <div class="mdl-layout__header-row">
        <router-view name="layout_title"></router-view>
        <div class="mdl-layout-spacer"></div>
        <div v-show="isAWSLogin" id="search-div" class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
          <label class="mdl-button mdl-js-button mdl-button--icon" for="search">
            <i class="material-icons">search</i>
          </label>
          <div class="mdl-textfield__expandable-holder">
            <input class="mdl-textfield__input" type="text" id="search" v-model.trim="searchText">
            <label class="mdl-textfield__label" for="search">Enter your query...</label>
          </div>
        </div>
        <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
          <i class="material-icons">more_vert</i>
        </button>
        <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
          <li class="mdl-menu__item" v-if="isAWSLogin" disabled>{{ awsConfig.accessKey }}</li>
          <li class="mdl-menu__item" v-if="isAWSLogin" :class="{'mdl-menu__item--full-bleed-divider': isAWSLogin}" @click="logout">Logout</li>
          <li class="mdl-menu__item">About</li>
          <li class="mdl-menu__item">Contact</li>
          <li class="mdl-menu__item">Legal information</li>
        </ul>
      </div>
    </header>
    <div class="mdl-tooltip" :data-mdl-for="'drawer-head' + currentDirectory.DirectoryArn">DirectoryArn: <br>{{ currentDirectory.DirectoryArn.split(/[\\/]/).pop() }}</div>
    <div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
      <header class="demo-drawer-header">
        <p>AWS Cloud Directory Console</p>
        <div class="demo-avatar-dropdown">
          <span :id="'drawer-head' + currentDirectory.DirectoryArn">{{ currentDirectory.Name }}</span>
          <div class="mdl-layout-spacer"></div>
          <button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
            <i class="material-icons" role="presentation">arrow_drop_down</i>
            <span class="visuallyhidden">Accounts</span>
          </button>
          <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
            <li v-for="dir in enabledDirectories" class="mdl-menu__item" @click="selectDirectory(dir.DirectoryArn)" :title="dir.DirectoryArn">{{ dir.Name }}</li>
            <!-- <li class="mdl-menu__item"><i class="material-icons">add</i>Add another account...</li> -->
          </ul>
        </div>
      </header>
      <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
        <router-link class="mdl-navigation__link" :to="{ name: 'Directory', params: {  }}" active-class="mdl-color-text--primary"><i class="material-icons" role="presentation">home</i>Directory</router-link>
        <hr>
        <router-link class="mdl-navigation__link" :to="{ name: 'SchemaDevelopment', params: {  }}" active-class="mdl-color-text--primary"><i class="material-icons" role="presentation">build</i>Development Schemas</router-link>
        <router-link class="mdl-navigation__link" :to="{ name: 'SchemaPublished', params: {  }}" active-class="mdl-color-text--primary"><i class="material-icons" role="presentation">publish</i>Published Schemas</router-link>
        <router-link class="mdl-navigation__link" :to="{ name: 'SchemaApplied', params: {  }}" active-class="mdl-color-text--primary"><i class="material-icons" role="presentation">cloud_done</i>Applied Schemas</router-link>
        <hr>
        <!-- <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">flag</i>Index</a>
        <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">security</i>Policy</a>
        <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">grain</i>Object</a>
        <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">device_hub</i>TypeLinks</a>
        <hr> -->
        <a class="mdl-navigation__link"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span class="visuallyhidden">Help</span></a>
      </nav>
    </div>
    <div class="mdl-layout__content mdl-color--grey-100">
      <div class="mdl-grid demo-content"><router-view></router-view></div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      isAWSLogin: state => state.isAWSLogin,
      awsConfig: state => state.awsConfig,
      directories: state => state.directories,
      currentDirectory: state => state.currentDirectory
    }),
    ...mapGetters({
      enabledDirectories: 'enabledDirectories'
    }),
    searchText: {
      get () {
        return this.$store.state.searchText
      },
      set (value) {
        this.$store.commit('setSearchText', value)
      }
    }
  },
  watch: {
  },
  methods: {
    ...mapMutations({
    }),
    selectDirectory (arn) {
      this.$store.commit('selectDirectory', arn)
    },
    logout () {
      var vm = this
      vm.$store.dispatch('logout').then(() => {
        vm.$router.push('/')
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  width: 100%;
}
</style>
