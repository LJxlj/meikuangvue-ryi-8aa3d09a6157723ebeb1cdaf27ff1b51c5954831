<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="12">
        <div id="chartPie" style="width: 100%; height: 400px"></div>
      </el-col>
    </el-row>
    <section class="chart-container">
      <el-row>
        <el-col :span="12">
          <div id="chartPie1" style="width: 100%; height: 400px"></div>
        </el-col>
      </el-row>
    </section>
  </section>
</template>
<script>
import echarts from "echarts";
export default {
  name: "fxbzt",
  data() {
    return {
      chartPie: null,
      chartPie1: null,
    };
  },
  methods: {
    // 库存帐龄分析数量
    drawPieChart() {
      this.chartPie = echarts.init(document.getElementById("chartPie"));
      this.chartPie.setOption({
        title: {
          text: "",
          subtext: "库存帐龄分析（数量）",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["一个月", "两个月", "三个月", "半年", "一年", "一年以上"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 0, name: "一个月" },
              { value: 0, name: "两个月" },
              { value: 1000, name: "三个月" },
              { value: 0, name: "半年" },
              { value: 141000, name: "一年" },
              { value: 131000, name: "一年以上" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },

    // 库存帐龄分析金额
    drawPieChart1() {
      this.chartPie1 = echarts.init(document.getElementById("chartPie1"));
      this.chartPie1.setOption({
        title: {
          text: "",
          subtext: "库存帐龄分析（金额）",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["一个月", "两个月", "三个月", "半年", "一年", "一年以上"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 680000, name: "一个月" },
              { value: 0, name: "两个月" },
              { value: 130000, name: "三个月" },
              { value: 0, name: "半年" },
              { value: 13260000, name: "一年" },
              { value: 17570000, name: "一年以上" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    drawCharts() {
      this.drawPieChart();
      this.drawPieChart1();
    },
  },

  mounted: function () {
    this.drawCharts();
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  float: left;
}
.el-col {
  padding: 30px 20px;
}
</style>
