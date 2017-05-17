
<template>
  <div>
    <div class="financeAd">
      <finance-list v-for="(list,index) in homeData" :list="list" :index="index" :key="list.amount"></finance-list>
    </div>
    <div class="financeInfoS">
      <finance-info :infoList="systemInformation" :isProp="false" :title="title"></finance-info>
    </div>
    <div class="empty" v-if="systemInformation==''">
      暂无数据
    </div>
    <pagination v-on:CurrentChange="getSystemInformation" :total="total" class="pager"></pagination>
    <p>{{IndexData.repay}}</p>
  </div>
</template>
<script>
  import Axios from 'axios'
  import { mapState } from 'vuex'
  import until from '../../common/util'
  import FinanceList from 'components/financeList/financeList'
  import FinanceInfo from 'components/base-InfoList/InfoList'
  import Pagination from 'components/pagination/pagination'

  const ERRORCODE_CODE = 'SUCCESS'

  export default {
    name: 'Finance',
    data () {
      return {
        loading: false,
        isProp: false,
        isProp2: false,
        homeData: [
          {amount: 0, each: '元', text: '30天内待还'},
          {amount: 0, each: '', text: '融资项目数'},
          {amount: 0, each: '', text: '待签合同'}
        ],
//        num: 0,
        row: 3,
        title: '系统消息'
//        systemInformation: []
      }
    },
   mounted(){
//      // 测试
     this.getSystemInformation(1)
     this.getHomeData()
   },
    computed: {
      ...mapState({
        systemInformation: (state) => state.finance.messageList,
        num: (state) => state.finance.total,
        IndexData: (state) => state.finance.homeData
      }),
      total () {
        return Math.ceil(this.num / this.row)
      },
//      homeData() {
//         return [
//          {amount: this.IndexData.repay, each: '元', text: '30天内待还'},
//          {amount: this.IndexData.pNum, each: '', text: '融资项目数'},
//          {amount: this.IndexData.cNum, each: '', text: '待签合同'}
//        ]
//      }
    },
    directives: {
//      自定义指令的钩子函数有：bind, inserted, update， componentUpdate, unbind
      bg: {
        inserted(el, binding, vnode) {
          console.log('binding', binding)
          el.style.backgroundColor = binding.value
        }
      }
    },
    methods: {
//      获取系统消息
      getSystemInformation (page) {
        this.$store.dispatch('getMessageLists', {row: this.row, page: page})
      },
//      getSystemInformation (page) {
//        Axios.post('messageRecord/homePage.do', {
//          row: this.row,
//          page: page
//        })
//          .then(
//            (response) => {
//              let res = response.data
//              if (res.errorCode === ERRORCODE_CODE) {
//                console.log('系统消息', response.data)
//                this.systemInformation = res.data.data
//                this.num = res.data.total
//              }
//            })
//          .catch(function (error) {
//            console.log(error)
//          })
//      },
//      首页数据
//      getHomeData(){
//        this.$store.dispatch('getIndex')
//      },
//      formatHome(){
//       this.$nextTick(()=>{
//        console.log('formate2', this.$store.state.finance.homeData)
//       })
//      }
      getHomeData () {
        Axios.post('messageRecord/homeData.do')
          .then(
            (response) => {
              let res = response.data
              console.log('首页数据', response.data)
              if (res.errorCode === ERRORCODE_CODE) {
                this.homeData[0].amount = res.data.repay
                this.homeData[1].amount = res.data.pNum
                this.homeData[2].amount = res.data.cNum
                this.$store.dispatch('companyName', {companyName: res.data.name})
              }
            }
          )
      }
    },
    components: {
      'finance-list': FinanceList,
      'finance-info': FinanceInfo,
      'pagination': Pagination
    }
// 组件内路由钩子函数 beforeRouteEnter(注：不能绑定this实例，但是可以通过 next( vm =>{})回调获取)、
// beforeRouteUpdate(注：/user/:1,/user/:2,路由被复用，但是需要重新加载时可处理
//  beforeRouteLeave(注：离开该组件路由时调用,应用场景如信息未保存不可跳转之类）
//    beforeRouteLeave (to, from, next) {
//      console.log('来自的路由=>', from)
//      next()
//   }
  }
</script>
<style>
  .empty{
    width: 100%;
    height: 500px;
    font-size: 30px;
    color: #9b9b9b;
    text-align: center;
    line-height: 500px;
    border-top:1px solid #ddd;
    background-color: #f7f7f7;
  }
</style>
<style scoped>
  .financeAd{
    display: flex;
    justify-content: space-between;
  }
  .financeInfoS{
    border:1px solid #ddd;
    margin-top:60px;
  }
  .pager{
    margin:52px 0;
  }

</style>
