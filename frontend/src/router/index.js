import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Inscription from '../views/Inscription.vue'
import Wall from '../views/Wall.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Inscription',
    name: 'Inscription',
    component: Inscription
  },
  {
    path:'/Wall',
    name: 'Wall',
    component: Wall
  },
  {
    path:'/Profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
      mode: 'history',
  routes
})

export default router
