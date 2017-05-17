<template>
  <div class="businessInformation">
    <div class="business-title">
      设置&nbsp;>&nbsp;<span style="color:#f0b954">企业资料</span>
    </div>
    <div class="business-main">
        <div class="company-info">
            <h3>公司信息</h3>
             <div class="basic-info">
               <div><span>公司名称</span>{{corporateName}}</div>
               <div style="display: flex;align-items: center">
                 <span>投资范围</span>
                 <div v-if="preference" style="display: flex;">
                 <div class="business-area" v-for="i in preference.split(',')">
                   <p v-if="preference!=''">{{i}}<i class="el-icon-check f0b954"></i></p>
                 </div>
                 </div>
               </div>
               <div>
                 <span>公司联系人</span>{{contactsName}}
               </div>
               </div>
        </div>
      <div class="business-info">
            <h3>工商信息</h3>
        <div class="bus-basicInfo">
          <span>基本工商信息</span>
          <div>
            <p><span>营业执照号: </span>{{businessLicense}}</p>
            <p><span>法人:</span>{{legalName}}</p>
            <p><span>注册地址:</span>{{registeredAddress}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Axios from 'axios'
  const ERRORCODE_CODE = 'SUCCESS'
  export default {
    data () {
      return {
        corporateName: '',
        preference: '',
        contactsName: '',
        businessLicense: '',
        legalName: '',
        registeredAddress: ''
      }
    },
    created () {
      this.getCorporateInfo()
    },
    methods: {
//      属性名：变量名
      getCorporateInfo () {
        Axios.post('customerInfo/corporateInfo.do')
          .then(
            (response) => {
              let res = response.data
              console.log('企业资料', res)
              if (res.errorCode === ERRORCODE_CODE) {
                const {corporateName, preference, contactsName, businessLicense, legalName, registeredAddress} = res.data
                this.corporateName = corporateName
                this.preference = preference
                this.contactsName = contactsName
                this.businessLicense = businessLicense
                this.legalName = legalName
                this.registeredAddress = registeredAddress
              }
            }
          )
      }
    }
  }
</script>
<style scoped>
  .f0b954{
    color: #f0b954;
    font-size: 26px;
  }
  .businessInformation{
    margin-right: 30px;
    color: #696969;
    text-align: left;
  }
  .business-title{
    height: 80px;
    line-height: 80px;
    background: #f7f7f7;
    font-size: 24px;
    padding-left:46px;
  }
  .business-main{
    padding-left:46px;
    background: #fff;
    font-size: 22px;
    padding-bottom:80px;
  }
  .company-info h3,.business-info h3{
    text-indent: 15px;
    height: 84px;
    line-height: 84px;
    border-bottom:1px solid #e5e5e5;
  }
  .basic-info{
    display: flex;
    height: 190px;
    margin:24px auto 24px 15px;
    flex-direction: column;
    justify-content: space-between;
    align-items:flex-start;
  }
  .basic-info span{
    display: inline-block;
    width:148px;
    text-align: left;
  }
  .business-area{
    display: flex;
  }
   .business-area p{
     margin-right:20px;
  }
  .bus-basicInfo{
    display: flex;
    margin-left:15px;
    margin-top:29px;
  }
   .bus-basicInfo span{
    display: inline-block;
     margin-right:42px;
  }
  .bus-basicInfo div{
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .bus-basicInfo div span{
    display: inline-block;
    width:117px;
    margin-right:20px;
  }
</style>
