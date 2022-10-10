import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Transactions from '../views/transactions/Index.vue'
import Users from '../views/users/Index.vue'
import UserCreate from '../views/users/Create.vue'
import UserEdit from '../views/users/Edit.vue'
import auth from '../middleware/auth'
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      middleware: auth,
    },
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      middleware: auth,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      middleware: auth,
    },
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions,
    meta: {
      middleware: auth,
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      middleware: auth,
    },
  },
  {
    path: '/users/create',
    name: 'UserCreate',
    component: UserCreate,
    meta: {
      middleware: auth,
    },
  },
  {
    path: '/users/:id',
    name: 'UserEdit',
    component: UserEdit,
    meta: {
      middleware: auth,
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem('token')) next({ name: 'Login' })
  else if(to.name == 'Login' && localStorage.getItem('token')) next({name: 'Dashboard'})
  else next()
})


export default router
