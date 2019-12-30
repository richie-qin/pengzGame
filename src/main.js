// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import "@/assets/reset.css"

// 初始化默认参数
import defaultParam from './components/defaultTerminal' //设置默认参数
Vue.prototype.GLOBAL = defaultParam;

import FastClick from 'fastclick'
//初始化FastClick实例。在页面的DOM文档加载完成后
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
