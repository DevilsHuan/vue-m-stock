import Vue from 'vue'
import Vuex from 'vuex'
import {getters} from './getters'
import {state} from './state'
import * as actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
