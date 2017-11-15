import Vue from 'vue'
import Router from 'vue-router'
import Default from './default'
import Start from './start'
import Directory from './directory'
import DevelopmentSchema from './schema/development'
import PublishedSchema from './schema/published'
import AppliedSchema from './schema/applied'
import store from '../store'

Vue.use(Router)

var router = new Router({
  // mode: 'history',
  routes: [
    ...Default,
    ...Start,
    ...Directory,
    ...DevelopmentSchema,
    ...PublishedSchema,
    ...AppliedSchema
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('route change', to)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // TODO: Add auth check
    // console.log('TODO: Add aws login check')
    if (!store.state.isAWSLogin) {
      store.commit('setRedirectTo', to.path)
      next('/')
      return
    }
  } else {
    if (store.state.isAWSLogin && to.path === '/') {
      next('/Directory')
      return
    }
  }
  // make sure to always call next()!
  next()
})

router.afterEach((to, from) => {
  store.commit('setSearchText', '')
  var e = document.getElementById('search-div')
  if (e) {
    e.classList.remove('is-focused', 'is-dirty')
  }
})

export default router
