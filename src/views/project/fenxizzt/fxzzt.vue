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
  name: "fxzzt",
  data() {
    return {};
  },
  methods: {
    initCharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        title: { text: "库存帐龄分析（数量）" },
        tooltip: {},
        xAxis: {
          data: ["一个月", "两个月", "三个月", "半年", "一年", "一年以上"],
        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "bar",
            data: [0, 0, 1000, 0, 141000, 131000],
          },
        ],
      });
    },
    initCharts1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.chart1);
      // 绘制图表
      myChart.setOption({
        title: { text: "库存帐龄分析(金额)" },
        tooltip: {},
        xAxis: {
          data: ["一个月", "两个月", "三个月", "半年", "一年", "一年以上"],
        },
        yAxis: {},
        series: [
          {
            name: "金额",
            type: "bar",
            data: [680000, 0, 130000, 0, 13260000, 17570000],
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

