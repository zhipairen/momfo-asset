<template>
 <div class="leaseInformation">
   <ul>
	     <li>
	       <p><span>租赁面积</span>{{ leaseInfoFocus.leaseArea | FilterAmount }}</p>
	     </li>
	     <li>
	       <p><span>租约起始日</span>{{ leaseInfoFocus.leaseStartDate }}</p>
	     </li>
	     <li>
	       <p><span>租约结束日</span>{{ leaseInfoFocus.leaseStartDate }}</p>
	     </li>
	     <li>
	       <p><span>租赁期限</span>{{ leaseInfoFocus.leaseTerm }}</p>
	     </li>
	     <li>
	       <p><span>租约起算日</span>{{ leaseInfoFocus.leaseStartingDate }}</p>
	     </li>
	     <li class="lease" v-if="leaseInfoFocus.upperLease != null">
	       <p>
	       	<span>对上租约</span>
	       	<img src="../../assets/image/file.png" class="file" @click="upperLeaseDownload"/>
	       	<i>对上租约</i>
	       </p>
	     </li>
	     <li v-if="leaseInfoFocus.upperLease == null">
	       <p>
	       	<span>对上租约</span>
	       	暂无文件
	       </p>
	     </li>
	     <li class="lease" v-if="leaseInfoFocus.underLease != null">
	       <p>
	       	<span>对下租约</span>
	       	<img src="../../assets/image/file.png" class="file" @click="underLeaseDownload"/>
	       	<i>对下租约</i>
	       </p>
	     </li>
	     <li v-if="leaseInfoFocus.underLease == null">
	       <p>
	       	<span>对下租约</span>
	       	暂无文件
	       </p>
	     </li>
   </ul>
 </div>
</template>
<script>
  //ajax
  import Axios from 'axios'
  import { mapState } from 'vuex'
  //公共处理方法
  import until from '../../common/util.js'
  //声明接口访问成功状态
  const ERRORCODE_CODE = 'SUCCESS'

  export default {
    data () {
      return {
        leaseInfoFocus: {},
        id: 833,
        name: "对上租约"
      }
    },
    filters: {
      //千分位分隔
      FilterAmount: (value) => {
        if (!value) return ''
        value = value.toString()
        return until.thousandBitSeparatorInt(value)
      }
    },
    computed: {
      ...mapState({
        project_Id(state) {
          if(state.projectId === '') {
            this.$store.dispatch('getLocalStorage', 'projectId')
          }
          return state.projectId
        }
      })
    },
    created () {
      this.getLeaseInfoFocus()
    },
    methods: {
      createForm: (data, target) => {
        return until.createForm(data, target)
      },
      //获取租约信息--集中式
      getLeaseInfoFocus () {
        Axios.post('projectInfo/detailLease.do', {
//        id: this.project_Id
          id: this.id
        })
          .then(
            (response) => {
              let res = response.data
              if (res.errorCode === ERRORCODE_CODE) {
                console.log('响应成功', res)
                this.leaseInfoFocus = res.data
              }
            })
          .catch(function (error) {
            //console.log(error)
          })
      },
      //点击下载对下租约--集中式
      underLeaseDownload () {
        const params = {
          data: {'id': this.id},
          action: '/web-asset/projectInfo/detailLeaseDownload.do'
        }
        this.createForm(params)
      },
      //点击下载对上租约--集中式
      upperLeaseDownload () {
//    	window.location.href = 'web-asset/common/download.do?name=' + this.name + '&value=' + this.leaseInfoFocus.upperLease;
      	window.location.href = '/web-asset/common/download.do?  name=12121&value=temp/20170504160137128141.html';

      }
    }
  }
</script>
<style scoped>
  .leaseInformation {
    font-size: 22px;
    color: #696969;
    text-align: left;
    padding-bottom: 140px;
  }

  .leaseInformation li {
    height: 74px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
  }

  .leaseInformation li.lease {
    height: 130px;
  }

  .leaseInformation li p {
    flex: 1
  }

  .leaseInformation li p span {
    width: 137px;
    display: inline-block;
  }

  .leaseInformation li p span::before {
    content: "• ";
    color: #61bfe9;
    padding-right: 4px;
    margin-left: -8px;
  }

  .leaseInformation li.lease p {
    position: relative;
  }

  .leaseInformation li p img.file {
    vertical-align: middle;
    width: 53px;
    height: 68px;
    position: absolute;
    top: -35px;
    cursor: pointer;
  }

  .leaseInformation li.lease p i {
    font-style: normal;
    position: absolute;
    top: 42px;
    left: 120px;
  }
</style>
