<!--折线图-->
<template>
  <div class="chart-line">
    <slot name="title"></slot>
    <chart class="line" :options="option"></chart>
  </div>

</template>
<script>
  //  引入echarts
  import Echarts from 'vue-echarts/components/ECharts.vue'
  //  按需引入不同图表模块
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  export default {
    props: ['raise'],
    data () {
      return {
        option: {
          title: {
            text: '堆叠区域图'
          },
          tooltip: {//鼠标悬浮弹窗提示
            /*  trigger: 'axis' */
            trigger: 'item',
            show: true,
            position: 'top',
            transitionDuration: 0,
            backgroundColor: '#f0b954',
            borderRadius: 4,
            borderWidth: 0,
            extraCssText: 'width:80px;height:40px;text-align: center;line-height:40px',
            formatter: function (params, ticket, callback) {
//               console.log(params);
              return params.data + 'W'
            }
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              nameTextStyle: {
                color: '#000',
                fontSize: 14
              },
              axisLine: {
                lineStyle: {
                  color: '#f0b954',
                }
              },
              axisTick: {
                show: false
              },
//              格式刻度标签
              axisLabel: {
                formatter: (value, index) => {
                  let newStr = ''
               if (value.length > 3) {
                    newStr = value.substring(0, 4) + '\n' + value.substring(5)
                  }
                  return newStr
                },
                textStyle: {
                  color: ['#000']
                }
              },

              data: this.raise.dateR
            }
          ],
          yAxis: [
            {
              show: true,
              type: 'value',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
//              刻度标签
              axisLabel: {
                margin: 16,
                formatter: (value, index) => {
                  let str = ''
                  if (index !== 0) {
                    str += value + 'W'
                  }
                  return str
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#e4e4e4']
                }
              }
            }
          ],
          series: [
            {
              type: 'line',
              symbolSize: 11,
// 显示具体信息标签
//              label:{
//                emphasis:{
//                  show:true,
//                  positon:'insideTop',
//                  formatter: ({value}) => value + 'W',
//                  textStyle:{
//                    fontSize: 14
//                  }
//                }
//              },
//              拐点
              itemStyle: {
                normal: {
                  color: ['#f0b954']
                }
              },
//线条
              lineStyle: {
                normal: {
                  color: '#f0b954'
                }
              },
              smooth: true,
//              填充区域
              areaStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#ffbd39' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#ffd682' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              data: this.raise.quota
            }
          ]
        }
      }
    },
    components: {
      chart: Echarts
    }
  }
</script>
<style scoped>
 .chart-line{
   height: 348px;
   margin-top:60px;
   margin-bottom:40px;
 }
  .line{
    width:500px;
    height: 288px;
    box-sizing: border-box;
    /*padding: 26px 22px 16px;*/
    border:1px solid #e2e2e2;
  }
</style>
