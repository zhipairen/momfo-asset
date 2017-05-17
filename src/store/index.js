/**
 * Created by gbl17 on 2017/4/24.
 */
// VueX配置
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import finance from './modules/finance'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    finance
  },
  strict: debug
})
