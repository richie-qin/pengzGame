import Vue from 'vue'
import vueRouter from 'vue-router'

const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve);
const game = resolve => require(['@/components/game'], resolve);

Vue.use(vueRouter)

export default new vueRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/game',
      name: 'game',
      component: game
    },
  ]
})
