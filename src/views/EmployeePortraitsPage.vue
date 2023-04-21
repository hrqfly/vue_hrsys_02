<!--  -->
<template>
  <div>
    <h1 style="text-align: center;height: 20px">员工综合信息标签</h1>
    <div id="wordCloud" style="height: 300px"></div>
  </div>
  <h1 style="text-align: center;height: 20px">员工能力雷达图</h1>
  <div id="main" style="height:300px" ref="main"></div>
</template>

<script>
import 'echarts-wordcloud';
import axios from "axios";
import { TitleComponent } from 'echarts/components';
import * as echarts from "echarts";
echarts.use([TitleComponent]);
export default {
  data() {
    return {
      echartsData: [
        //{ value: '1', name: 'VIVO' },
      ],
      jobDev:[],
      cookies:{
        userId : document.cookie.split("; ")[0].split("=")[1].split("#")[0],
        userName : document.cookie.split("; ")[0].split("=")[1].split("#")[1],
      },
    };
  },
  mounted: function () {
    this.initChart();
    this.drawLine();
  },
  methods: {
    initChart() {
      axios.get('http://localhost:8010/getAllEmployeePortraitsInf?userId=' + this.cookies.userId).then(res => {
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
              rotationRange: [-45, 0, 45, 90],
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
    },
    drawLine() {
      const myChart = echarts.init(this.$refs.main);
      let figureData = [
        { name: '业务能力', max: '100' },
        { name: '技能评估', max: '100' },
        { name: '人际交往能力', max: '100' },
        { name: '发展潜力', max: '100' },
        { name: '爱好发展', max: '100' },

        // ...以此类推
      ]
      let data = [
        {
          name: this.cookies.userName,
          value: [80, 90, 80, 82, 90],
        },
        // ...以此类推
      ]

      let option = {
        legend: {
          data: ['name1']
        }, // 数据名
        tooltip: { // 设置展示雷达图详细参数
          show: true,
          trigger: 'item',
        },
        radar: { indicator: figureData, }, // 雷达图参数
        series: [
          {
            type: 'radar',
            label: { show: true, }, // 是否显示值
            areaStyle: {}, // 阴影
            animationDuration: 3000, // 动画时间
            data: data,
          },
        ],
        backgroundColor: "#fff",
      }
      myChart.setOption(option)
    }

  }

}

</script>
<style lang='less' scoped>
</style>