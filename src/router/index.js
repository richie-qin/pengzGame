import Vue from 'vue'
import vueRouter from 'vue-router'

const game = resolve => require(['@/components/game'], resolve);

Vue.use(vueRouter)

export default new vueRouter({
  mode:"history",
  base:"myvue",
  routes: [
    {
      path: '/index',
      name: 'game',
      component: game
    },
  ]
})
