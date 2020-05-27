import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Generate from '@/components/Generate'
import Dashboard from '@/components/Dashboard'
import NotFound from '@/components/404'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'App',
      redirect: '/app'
    },
    {
      path: '/app',
      name: 'Home',
      component: Home
    },
    {
      path: '/generate',
      name: 'Generate',
      component: Generate
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/logout',
      name: 'Logout'
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
