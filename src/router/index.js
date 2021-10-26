import Vue from 'vue'
import Router from 'vue-router'

import authRoutes from './modules/auth'
import shiftRoutes from './modules/shift'
import userRoutes from './modules/user'
import adminRoutes from './modules/admin'
import notFoundRoutes from './modules/notfound'

Vue.use(Router)

const routes = [{
  path: '*',
  redirect: {
    name: 'NotFound'
  }
}].concat(authRoutes, shiftRoutes, userRoutes, adminRoutes, notFoundRoutes)
export default new Router({
  routes,
  mode: 'history'
})
