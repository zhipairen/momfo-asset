/**
 * vuex分模块处理
 * 金融模块 on 2017/5/15.
 */
import Api from '../api'
import * as types from '../mutation-types'
const state = {
  homeData: {}, // 首页数据
  messageList: [], // 系统消息
  total: 0 // 总条数
}
const getters = {}

const actions = {
  // 系统消息
  async getMessageLists ({commit}, {row, page}) {
    let res = await Api.getMessageList({row, page})
    let {data, total} = res
    if (data.length) {
      commit(types.LIST, {data, total})
    }
  },
  // 首页数据
  async getIndex ({commit}) {
    let res = await Api.getIndexData('')
    let {repay, pNum, cNum} = res
    commit(types.HOMEDATA, {repay, pNum, cNum})
  }
}
const mutations = {
  [types.LIST] (state, {data, total}) {
    state.messageList = data
    state.total = total
  },
  [types.HOMEDATA] (state, {repay, pNum, cNum}) {
    state.homeData = {repay, pNum, cNum}
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
