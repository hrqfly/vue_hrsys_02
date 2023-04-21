<template>
  <div id="main" style="height:500px;width: 100%;" ref="main"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      cookies:{
        userName : document.cookie.split("; ")[0].split("=")[1].split("#")[1],
      },
    }
  },
  mounted() { this.drawLine() },
  methods: {
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
      }
      myChart.setOption(option)
    },
  },
}
</script>
