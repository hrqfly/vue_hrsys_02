<!--  -->
<template>
  <div>
    <div id="wordCloud" style="height: 800px; width: 800px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core';
import 'echarts-wordcloud';
import axios from "axios";
import { TitleComponent } from 'echarts/components';
echarts.use([TitleComponent]);
export default {
  data() {
    return {
      echartsData: [
        //{ value: '1', name: 'VIVO' },
        // { value: '1', name: 'OPPO' },
        // { value: '1', name: 'HONOR' },
        // { value: '27', name: '红米' },
        // { value: '26', name: '小米' },
        // { value: '25', name: '美图' },
        // { value: '24', name: 'ONEPLUS' },
        // { value: '23', name: '魅族' },
        // { value: '22', name: '红手指' },
        // { value: '21', name: 'SAMSUNG' },
        // { value: '20', name: '金立' },
        // { value: '16', name: 'BLACKBERRY' },
        // { value: '15', name: '诺基亚' },
        // { value: '14', name: '锤子' },
        // { value: '13', name: '大疆' },
        // { value: '12', name: '361' },
        // { value: '11', name: '摩托罗拉' },
        // { value: '10', name: '联想' },
        // { value: '9', name: '玩家国度' },
      ],
      jobDev:[],
      cookies:{
        userId : document.cookie.split("; ")[0].split("=")[1].split("#")[0],
      },
    };
  },
  mounted: function () {
    this.initChart();
  },
  methods: {
    initChart() {

      axios.get('http://localhost:8010/getEmployeePortraitsInf?userId=' + this.cookies.userId + '&type=jobDev').then(res => {
        this.jobDev = res.data.data
        console.log(this.jobDev)
        for (let i = 0;i <= this.jobDev.length;i++){
          this.echartsData.push({value: Math.random() * 20+"",name: this.jobDev[i]})
        }

        var myChart = echarts.init(document.getElementById('wordCloud'));
        const option = {
          title: {
            text: '',
            x: "center"
          },
          backgroundColor: "#fff",
          series: [
            {
              type: "wordCloud",
              //用来调整词之间的距离
              gridSize: 10,
              //用来调整字的大小范围
              // Text size range which the value in data will be mapped to.
              // Default to have minimum 12px and maximum 60px size.
              sizeRange: [14, 40],
              // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
              //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
              // rotationRange: [-45, 0, 45, 90],
              // rotationRange: [ 0,90],
              rotationRange: [0, 45],
              //随机生成字体颜色
              // maskImage: maskImage,
              textStyle: {
                color: function () {
                  return (
                      "rgb(" +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ")"
                  );
                }
              },
              left: "center",
              top: "center",
              right: null,
              bottom: null,
              width: "100%",
              height: "100%",
              //数据
              data: this.echartsData
            }
          ]
        };
        myChart.setOption(option);
        // 点击某个字
        myChart.on('click', function (params) {
          console.log('myChart----click---:', params, '------', params.data)
        });
      })

    }

  }

}

</script>
<style lang='less' scoped>
</style>