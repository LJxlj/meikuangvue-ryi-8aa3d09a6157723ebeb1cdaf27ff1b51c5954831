<template>
  <div>
    <div style="width: 800px; height: 500px" ref="chart"></div>
    <div style="width: 800px; height: 500px" ref="chart1"></div>
  </div>
</template>

<script>
//局部引用
const echarts = require("echarts");
export default {
  name: "ABCfenxi",
  data() {
    return {};
  },
  methods: {
    initCharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        title: { text: "库存数量ABC分析" },
        tooltip: {},
        xAxis: {
          data: ["C"],
        },
        yAxis: {},
        series: [
          {
            name: "ABC类别",
            type: "bar",
            data: [500000],
            barWidth: 70, //柱图宽度
          },
        ],
      });
    },
    initCharts1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.chart1);
      // 绘制图表
      myChart.setOption({
        title: { text: "库存金额ABC分析" },
        tooltip: {},
        xAxis: {
          data: ["C"],
        },
        yAxis: {},
        series: [
          {
            name: "ABC类别",
            type: "bar",
            data: [74000000],
            barWidth: 70, //柱图宽度
          },
        ],
      });
    },
  },
  //一加载页面就调用
  mounted() {
    this.initCharts();
    this.initCharts1();
  },
};
</script>
<style>
</style>

