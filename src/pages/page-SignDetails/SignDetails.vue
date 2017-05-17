<template>
  <div class="Sign">
    <div class="Sign-title">合同列表&nbsp;>&nbsp;<span style="color: #f1b954">合同提交</span></div>
    <div class="argWrap">
      <!--合同签约页部分-->
      <div class="signTxtBox">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="x in documentImgList" :key="x">
            <img :src="'/image/'+x.address" style="width: 100%;"/>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!--右侧签章部分-->
      <div class="signatureBox">
        <div class="signatureWrap">
          <span class="btntext">签章</span>
          <div class="signImgBox">
            <div class="signImgWrap">
              <div class="signImg" v-for="(y,index) in stampList" :key="y" draggable="true">
                <div class="signatureBg">
                  <i @click="sendPhoneCode('22','showStampDelete'),stampId = y.uid, _index = index"></i>
                  <img :src="'/image/' + y.address" :data-id='y.uid'/>
                </div>
              </div>
            </div>
            <div class="addImgBtn" id="uploadForm">
              <input class="file" @change="handleFiles(stampList,$event)" id="file" type="file" multiple
                accept="image/jpg,image/bmp,image/gif,image/jpeg,image/png">
              <img src="../../assets/image/add.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="submitArg">
      <input name="btnReturn" @click="sendPhoneCode('22','showSign')" type="button" value="提交协议" class="argBtn">
    </div>
    <!--提交合同--弹框-->
    <el-dialog v-model="showSign" customClass="sign-dialog" title="签约确认" size="tiny" top="10%">
      <prop-sign v-if="showSign" v-on:end="close" :signId="signId" :phone="phone"></prop-sign>
    </el-dialog>
    <!--删除印章--弹框-->
    <el-dialog v-model="showStampDelete" customClass="sign-dialog" title="删除印章" size="tiny" top="10%">
      <prop-stampDelete v-if="showStampDelete" v-on:end="close" :phone="phone" :index="_index" :stampId="stampId" :stampList="stampList"></prop-stampDelete>
    </el-dialog>
  </div>
</template>
<script>
  //ajax
  import Axios from 'axios'
  //导入jq
  import $ from 'jquery'
  //公共方法
  import until from '../../common/util'
  //拖拽
  import Drag from '../../common/drag'
  //导入vue-awesome-swiper
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  //提交合同--弹框
  import PropSign from 'components/prop-sign/propSign'
  //删除印章--弹框
  import propStampDelete from 'components/prop-stampDelete/propStampDelete'

  const ERRORCODE_CODE = 'SUCCESS'

  let drag = {}

  export default {
    data () {
      return {
        signId: '',
        phone: '138****2345',
        stampId: '',
        _index: 0,
        showSign: false,
        showStampDelete: false,
        documentImgList: [],
        stampList: [],
        //轮播图实例
        swiperOption: {
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          onInit: function (swiper) {
//        	if (drag.constructor != "Drag") {
//        		drag = new Drag()
//        		Drag.init()
//        	}
//          Drag.init();
          }
        }
      }
    },
    mounted () {
			if (drag.constructor != "Drag") {
	  		drag = new Drag()
	  		drag.init()
	  	}
    },
    created () {
      this.getDocumentImgList()
      this.getStampList()
    },
    computed: {
//    swiper() {
//      return this.$refs.mySwiper.swiper
//    }
			signid(){
				return this.$store.state.signId
			}
    },
    components: {
      'prop-sign': PropSign,
      'prop-stampDelete': propStampDelete,
      swiper,
      swiperSlide
    },
    methods: {
//      关闭弹窗
      close(flag){
        if(flag === 0){
          this.showSign = false
          this.showStampDelete = false
        }
      },
      //获取合同图片信息
      getDocumentImgList () {
        Axios.post('document/documentImg.do', {
//      id: this.signid || 795
          id: 1
        })
          .then(
            (response) => {
              let res = response.data
              if (res.errorCode === ERRORCODE_CODE) {
                this.documentImgList = res.data
              }
            })
          .catch(
            (error) => { console.log(error) }
          )
      },
      //获取合同印章列表图片信息
      getStampList () {
        Axios.post('stamp/stampList.do', {})
          .then(
            (response) => {
              let res = response.data
              if (res.errorCode === ERRORCODE_CODE) {
                this.stampList = res.data
//              console.log(this.stampList)
              }
            })
          .catch(
            (error) => { console.log(error) }
          )
      },
      //点击添加印章
      handleFiles (list,e) {
        var htmlImage = ''
        var formData = new FormData();
        formData.append('stamp', $('#file')[0].files[0]);
        console.log(formData)

        Axios.post('stamp/stampUpload.do', formData, {})
          .then(
            (response) => {
//          	console.log(response.data
            	let result = response.data.data
	            //通过向签章列表添加数据实现印章上传
	            list.push(result)
            })
          .catch(
            (error) => { console.log(error) }
          )
      },
      //点击发送验证码
      sendPhoneCode(templateId, propShow) {
        Axios.post('sms/sendMsg.do',{templateCode: templateId})
          .then(response =>{
            this[propShow] = true
            let res = response.data
            console.log('发送验证码', res)
//            if (res.errorCode === ERRORCODE_CODE){}
          })
      }
    }
  }
</script>
<style type="text/css">
  .sign-dialog{
    border-radius:10px 8px 8px 8px;
    width:694px !important;
    height:408px!important;
    text-align: left;
  }
  /*拖拽*/
  .signImg i {
    display: block;
    width: 25px;
    height: 25px;
    position: absolute;
    top: -12px;
    right: -12px;
    background: url(../../assets/image/delSign.png) no-repeat center;
    background-size: 100%;
    cursor: pointer;
  }

  .signImgBox {
    clear: both;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
  }

  .signImg, .addImgBtn {
    float: left;
    text-align: center;
    width: 184.4px;
    background: #f5f5f5;
    position: relative;
    margin-top: 20px;
  }

  .addImgBtn {
    height: 184.4px;
  }

  .signImg img {
    width: 164.4px;
    cursor: pointer;
    vertical-align: middle;
  }

  .addImgBtn img {
    width: 50px;
    height: 50px;
    cursor: pointer;
    position: absolute;
    top: 62px;
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .cloneSignImg, .stampImg {
    position: absolute;
    width: 164.4px;
    z-index: 100;
  }

  .cloneSignImg img, .stampImg img {
    width: 100%;
    height: 100%;
  }

  .cloneSignImg i {
    display: block;
    width: 25px;
    height: 25px;
    position: absolute;
    top: -12px;
    right: -12px;
    background: url(../../assets/image/delSign.png) no-repeat center;
    background-size: 100%;
    cursor: pointer;
  }

  .addImgBtn .file {
    opacity: 0;
    cursor: pointer;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 62px;
    margin: 0 auto;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .argBtn {
    background: #f0b954;
    border-radius: 8px;
    width: 190px;
    height: 40px;
    color: #ffffff;
    cursor: pointer;
    margin-top: 30px;
  }

  .submitArg {
    clear: both;
    width: 190px;
    margin-left: 390px;
  }

  .signatureBg {
    background: #ffffff;
    width: 164.4px;
    margin: 10px auto;
  }
</style>
<style scoped>
  .Sign {
    height: 1500px;
    font-size: 22px;
    color: #696969;
    overflow: hidden;
    background: #ffffff;
  }

  .Sign-pagination {
    margin-top: 30px;
  }

  .Sign-title {
    height: 80px;
    line-height: 80px;
    background: #f7f7f7;
    font-size: 24px;
    color: #696969;
    text-align: left;
    padding-left: 45px;
  }

  .signTxtBox {
    border-radius: 6px;
    margin: 35px 0 0 30px;
    width: 865px;
    float: left;
    padding: 20px;
    background: #f5f5f5;
  }

  .signatureWrap {
    text-align: left;
  }

  .signatureBox {
    position: fixed;
    top: 280px;
    left: 1340px;
    height: 630px;
    overflow-y: auto;
    width: 230px;
    padding-bottom: 20px;
  }
</style>
