<template>
  <div class="sign">
      <message-list :title="title" :isProp="true" :infoList="message"></message-list>
         <div class="empty" v-if="message==''">
           暂无数据
         </div>
    <div class="sign-pagination">
      <pagination  v-on:CurrentChange="getMessage" :total="total" class="pager"></pagination>
    </div>
  </div>
</template>
<script>
  import Axios from 'axios'
  import MessageList from 'components/base-InfoList/InfoList'
  import Pagination from 'components/pagination/pagination'
  const ERRORCODE_CODE = 'SUCCESS'
  export default {
    data () {
      return {
        loading: false,
        isProp: false,
        title: '设置 > 消息中心',
        message: [],
        num: 0,
        row: 5
      }
    },
    created () {
      this.getMessage(1)
    },
    components: {
      'message-list': MessageList,
      'pagination': Pagination
    },
    computed: {
      total () {
        return Math.ceil(this.num / this.row)
      }
    },
    methods: {
      getMessage (page) {
        Axios.post('messageRecord/homePage.do', {
          row: this.row,
          page: page
        })
          .then(
            (response) => {
              let res = response.data

          if (res.errorCode === ERRORCODE_CODE) {
          console.log('消息中心', response.data)
          this.message = res.data.data
          this.num = res.data.total
        }
            })
          .catch(function (error) {
            console.log(error)
          })
      },

    }
  }
</script>
<style scoped>
  .sign-pagination{
    margin-top:30px;
  }
  .pager{
    margin-top:52px;
  }
.empty{
  border-top:1px solid #ddd;
  background-color: #f7f7f7;
  width: 100%;
  height: 500px;
  font-size: 30px;
  color: #9b9b9b;
  text-align: center;
  line-height: 500px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

}
</style>
