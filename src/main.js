import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import {mixins} from './mixins/'
// 引用app.scss
import './common/scss/app.scss'
Vue.mixin(mixins)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')