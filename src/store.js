import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    isAWSLogin: false,
    redirectTo: '',
    searchText: '',
    awsConfig: {
      accessKey: '',
      secretKey: '',
      endPoint: '',
      region: ''
    },
    cdClient: null,
    directories: [],
    currentDirectory: {
      DirectoryArn: '',
      Name: ''
    }
  },
  getters: {
    enabledDirectories (state) {
      return state.directories.filter((dir) => {
        return dir.State === 'ENABLED'
      })
    }
  },
  mutations: {
    setSearchText (state, searchText) {
      state.searchText = searchText
    },
    setRedirectTo (state, redirectTo) {
      state.redirectTo = redirectTo
    },
    configAWS (state, config) {
      state.awsConfig = config
      window.localStorage.setItem('credentials', window.JSON.stringify(config))
    },
    awsLoginStatus (state, status) {
      state.isAWSLogin = status
    },
    cdClient (state, client) {
      state.cdClient = client
    },
    setDirectories (state, directories) {
      state.directories = directories
    },
    setDirectoryState (state, {DirectoryArn, State}) {
      for (const [key, dir] of state.directories.entries()) {
        if (dir.DirectoryArn === DirectoryArn) {
          state.directories[key].State = State
        }
      }
    },
    resetCurrentDirectory (state) {
      state.currentDirectory = {
        DirectoryArn: '',
        Name: ''
      }
    },
    selectDirectory (state, directoryArn) {
      if (directoryArn) {
        document.getElementById('accbtn').click()
      }
      if (directoryArn && state.currentDirectory.DirectoryArn === directoryArn) {
        return
      }
      if (!directoryArn && store.getters.enabledDirectories.length > 0) {
        state.currentDirectory = store.getters.enabledDirectories[0]
        return
      }
      for (const dir of state.directories) {
        if (dir.DirectoryArn === directoryArn) {
          state.currentDirectory = dir
          break
        }
      }
    }
  },
  actions: {
    rowSelect (context, event) {
      if (event.target.checked) {
        event.target.closest('tr').classList.add('is-selected')
      } else {
        event.target.closest('tr').classList.remove('is-selected')
      }
    },
    tableSelect (context, event) {
      var table = event.target.closest('table')
      var boxes = table.querySelectorAll('tbody .mdl-data-table__select')
      var length = boxes.length
      var i
      if (event.target.checked) {
        for (i = 0; i < length; i++) {
          boxes[i].MaterialCheckbox.check()
          boxes[i].closest('tr').classList.add('is-selected')
        }
      } else {
        for (i = 0; i < length; i++) {
          boxes[i].MaterialCheckbox.uncheck()
          boxes[i].closest('tr').classList.remove('is-selected')
        }
      }
    },
    clouddirectory (context, {api, params}) {
      return new Promise((resolve, reject) => {
        context.state.cdClient[api](params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    refreshDirectory (context) {
      return context.dispatch('clouddirectory', {
        api: 'listDirectories',
        params: {
          MaxResults: 30,
          NextToken: null
        }
      }).then((response) => {
        context.commit('setDirectories', response.data.Directories)
      })
    },
    login (context, {config, client, directories}) {
      context.commit('configAWS', config)
      context.commit('awsLoginStatus', true)
      context.commit('cdClient', client)
      context.commit('setDirectories', directories)
      context.commit('selectDirectory', '')
    },
    logout (context) {
      document.getElementById('hdrbtn').click()
      context.commit('configAWS', {
        accessKey: '',
        secretKey: '',
        endPoint: '',
        region: ''
      })
      context.commit('awsLoginStatus', false)
      context.commit('cdClient', null)
      context.commit('setDirectories', [])
      context.commit('resetCurrentDirectory')
    }
  }
})

export default store
