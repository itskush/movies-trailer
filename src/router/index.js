import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Movie from '../components/VideoPlayer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    name: 'movie-id',
    path: '/movie/:id?',
    component: Movie,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
