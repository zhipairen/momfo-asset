<template>
  <div class="contractDetails">
    <!--<p>跳转成功id:{{contractid}}</p>-->
    <div class="contract-title">管理&nbsp;>&nbsp;<span style="color: #f1b954">合同管理</span></div>
    <div class="contract-main">
      <el-carousel :interval="10000" type="card" height="724px">
        <el-carousel-item v-for="(item, index) in ContractIMgList" :key="item">
          <img :src="'/image/'+item" alt="合约详情" class="contract-img">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
  import Axios from 'axios'
  import { mapState } from 'vuex'
  const ERRORCODE_CODE = 'SUCCESS'
  export default {
    data () {
      return {
        ContractIMgList: []
      }
    },
    computed: {
      ...mapState({
        contractid(state){
          if(state.contractId === ''){
            this.$store.dispatch('getLocalStorage', 'contractId')
          }
          console.log('刷新本地存储', state.contractId)
          return state.contractId
        }
      })
    },
    created() {
      this.getContractImages()
    },
    methods: {
//      合同详情图片展示
      getContractImages() {
        Axios.post('document/documentImg.do', {
          //     id: '1'
          id: this.contractid
        })
          .then(
            (response) => {
              let res = response.data
              if (res.errorCode === ERRORCODE_CODE) {
                console.log('合同详情', response.data)
                for (let img of res.data) {
                  this.ContractIMgList.push(img.address)
                }
              }
            })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>
<style>
  .el-carousel__mask{
    background-color: #aaa !important;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #f5f5f5;
    box-shadow: 2px 2px 20px #ddd;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #f5f5f5;
    box-shadow: 2px 2px 20px #ddd;
  }
</style>
<style scoped>
  .contract-title {
    height: 80px;
    line-height: 80px;
    background: #f7f7f7;
    font-size: 24px;
    color: #696969;
    text-align: left;
    text-indent: 45px;
    border-radius: 4px 4px 0 0;
  }
  .contract-main{
    padding:45px;
    background: #fff;
  }
  .contract-img{
    width:100%;
  }
</style>
