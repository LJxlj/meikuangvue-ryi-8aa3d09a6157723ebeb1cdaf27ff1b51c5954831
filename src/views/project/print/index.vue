<template>
  <div class="hello">
    <el-button type="primary" class="print-btn" v-on:click="btnClickPrint">
      <span>{{ msg }}</span>
    </el-button>

    <el-button type="primary" class="print-btn" v-on:click="btnClickPrint1">
      <span>{{ msg1 }}</span>
    </el-button>

    <el-button type="primary" class="print-btn" v-on:click="btnClickPrint7">
      <span>{{ msg7 }}</span>
    </el-button>

    <el-button type="primary" class="print-btn" v-on:click="btnClickPrint2">
      <span>{{ msg2 }}</span>
    </el-button>

    <el-button type="primary" class="print-btn" v-on:click="btnClickPrint3">
      <span>{{ msg3 }}</span>
    </el-button>

    <el-button type="primary" class="print-btn" v-on:click="btnClickPrint4">
      <span>{{ msg4 }}</span>
    </el-button>

    <el-button type="primary" class="print-btn" v-on:click="btnClickPrint5">
      <span>{{ msg5 }}</span>
    </el-button>

    <el-button type="primary" class="print-btn" v-on:click="btnClickPrint6">
      <span>{{ msg6 }}</span>
    </el-button>

    <el-button type="primary" class="print-btn" v-on:click="btnClickPrint8">
      <span>{{ msg8 }}</span>
    </el-button>
    <el-button type="primary" class="print-btn" v-on:click="btnClickPrint9">
      <span>{{ msg9 }}</span>
    </el-button>
    <el-button type="primary" class="print-btn" v-on:click="btnClickPrint10">
      <span>{{ msg10 }}</span>
    </el-button>
    <el-button type="primary" class="print-btn" v-on:click="btnClickPrint11">
      <span>{{ msg11 }}</span>
    </el-button>
  </div>
</template>

<script>
import { getLodop } from "@/api/project/LodopFuncs"; //导入模块
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "打印出库凭证单",
      msg1: "打印入库凭证单",
      msg7: "材料出库明细表",
      msg2: "采购入库明细表 ",
      msg3: "原材料调整表",
      msg4: "公司付材料出库明细表",
      msg5: "暂估入库统计表",
      msg6: "日清月结表",
      msg8: "凭证查询出入库模板",
      msg9: "价格分析",
      msg10: "消耗明细表A3",
      msg11: "余额检查",
    };
  },
  methods: {
    // 出库单凭证模板
    btnClickPrint() {
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INITA(1, -1, 800, 600, "");
      LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
      LODOP.PRINT_INITA(1, 0, 800, 600, "");
      LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");

      //长方形表格
      LODOP.ADD_PRINT_RECT(157, 2, 751, 265, 0, 1);
      LODOP.ADD_PRINT_LINE(157, 135, 422, 136, 0, 1);
      LODOP.ADD_PRINT_LINE(157, 336, 422, 337, 0, 1);
      LODOP.ADD_PRINT_LINE(157, 411, 422, 412, 0, 1);
      LODOP.ADD_PRINT_LINE(157, 446, 422, 447, 0, 1);
      LODOP.ADD_PRINT_LINE(158, 526, 423, 527, 0, 1);
      LODOP.ADD_PRINT_LINE(157, 596, 422, 597, 0, 1);
      LODOP.ADD_PRINT_LINE(178, 2, 179, 752, 0, 1);
      LODOP.ADD_PRINT_LINE(372, 2, 371, 752, 0, 1);
      LODOP.ADD_PRINT_LINE(395, 2, 394, 752, 0, 1);
      LODOP.ADD_PRINT_LINE(422, 3, 421, 753, 0, 1);

      // 表头
      LODOP.ADD_PRINT_TEXT(158, 22, 100, 20, "物料编号");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(157, 140, 100, 20, "物料名称");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(157, 244, 85, 20, "规格型号");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(159, 336, 70, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(160, 412, 35, 20, "单位");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(157, 449, 78, 20, "单价");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(159, 526, 64, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(159, 618, 100, 20, "摘要");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

      //物料编号
      LODOP.ADD_PRINT_TEXT(179, 2, 133, 20, "QTCL-QT-HC-X-1192");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(201, 4, 135, 20, "DXCL-QT-HC-X-0662");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(200, 2, 199, 752, 0, 1);
      LODOP.ADD_PRINT_TEXT(220, 4, 135, 20, "DXCL-QT-HC-X-0662");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(220, 2, 219, 752, 0, 1);
      LODOP.ADD_PRINT_TEXT(240, 4, 135, 20, "DXCL-QT-HC-X-0662");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(242, 2, 241, 752, 0, 1);
      LODOP.ADD_PRINT_TEXT(263, 4, 135, 20, "DXCL-QT-HC-X-0662");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(263, 2, 262, 752, 0, 1);
      LODOP.ADD_PRINT_TEXT(284, 4, 135, 20, "DXCL-QT-HC-X-0662");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(284, 2, 283, 752, 0, 1);
      LODOP.ADD_PRINT_TEXT(306, 4, 135, 20, "DXCL-QT-HC-X-0662");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(306, 2, 305, 752, 0, 1);
      LODOP.ADD_PRINT_TEXT(328, 4, 135, 20, "DXCL-QT-HC-X-0662");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(328, 2, 327, 752, 0, 1);
      LODOP.ADD_PRINT_TEXT(349, 4, 135, 20, "DXCL-QT-HC-X-0662");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(349, 2, 348, 752, 0, 1);
      LODOP.ADD_PRINT_TEXT(372, 4, 135, 20, "DXCL-QT-HC-X-0662");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

      //物料名称
      LODOP.ADD_PRINT_LINE(157, 240, 422, 241, 0, 1);
      LODOP.ADD_PRINT_TEXT(179, 136, 100, 20, "泡沫抑尘剂");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(202, 138, 100, 20, "一字钻头");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(225, 136, 135, 20, "皮鞭");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(245, 136, 135, 20, "皮鞭");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(265, 136, 135, 20, "皮鞭");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(290, 136, 135, 20, "皮鞭");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(310, 136, 135, 20, "皮鞭");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(330, 136, 135, 20, "皮鞭");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(350, 136, 135, 20, "皮鞭");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(378, 136, 135, 20, "皮鞭");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

      // 规格型号
      LODOP.ADD_PRINT_TEXT(180, 241, 88, 20, "MTY-PYCJ-II");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(200, 241, 85, 20, "30#");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(225, 241, 135, 20, "阿斯顿阿萨");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(245, 241, 135, 20, "阿斯顿阿萨");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(265, 241, 135, 20, "阿斯顿阿萨");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(290, 241, 135, 20, "阿斯顿阿萨");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(310, 241, 135, 20, "阿斯顿阿萨");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(330, 241, 135, 20, "阿斯顿阿萨");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(350, 241, 135, 20, "阿斯顿阿萨");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(378, 241, 135, 20, "阿斯顿阿萨");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

      // 数量
      LODOP.ADD_PRINT_TEXT(179, 336, 75, 20, "0.200");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(203, 342, 69, 20, "50.000");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(225, 342, 70, 20, "0.500");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(245, 342, 70, 20, "0.500");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(265, 342, 70, 20, "0.500");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(290, 342, 70, 20, "0.500");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(310, 342, 70, 20, "0.500");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(330, 342, 70, 20, "0.500");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(350, 342, 70, 20, "0.500");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(378, 342, 70, 20, "0.500");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);

      // 单位
      LODOP.ADD_PRINT_TEXT(180, 412, 37, 20, "吨");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(202, 412, 41, 20, "个");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(225, 412, 135, 20, "个");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(245, 412, 135, 20, "个");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(265, 412, 135, 20, "个");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(290, 412, 135, 20, "个");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(310, 412, 135, 20, "个");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(330, 412, 135, 20, "个");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(350, 412, 135, 20, "个");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(378, 412, 135, 20, "个");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

      // 单价
      LODOP.ADD_PRINT_TEXT(179, 446, 80, 20, "25663.7121");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(202, 446, 78, 20, "30.9734");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(225, 446, 78, 20, "30.9734");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(245, 446, 78, 20, "30.9734");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(265, 446, 78, 20, "30.9734");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(290, 446, 78, 20, "30.9734");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(310, 446, 78, 20, "30.9734");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(330, 446, 78, 20, "30.9734");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(350, 446, 78, 20, "30.9734");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(378, 446, 78, 20, "30.9734");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);

      // 金额
      LODOP.ADD_PRINT_TEXT(179, 526, 70, 20, "5132.74");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(200, 526, 70, 20, "1548.67");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(225, 526, 70, 20, "1548.67");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(245, 526, 70, 20, "1548.67");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(265, 526, 70, 20, "1548.67");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(290, 526, 70, 20, "1548.67");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(310, 526, 70, 20, "1548.67");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(330, 526, 70, 20, "1548.67");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(350, 526, 70, 20, "1548.67");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(378, 526, 70, 20, "1548.67");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);

      // 摘要
      LODOP.ADD_PRINT_TEXT(179, 598, 152, 20, "22104运输港/掘进机队");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
      LODOP.ADD_PRINT_TEXT(201, 598, 152, 20, "22104运输港/掘进机队");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
      LODOP.ADD_PRINT_TEXT(225, 598, 135, 20, "22104运输港/掘进机队");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
      LODOP.ADD_PRINT_TEXT(248, 598, 135, 20, "22104运输港/掘进机队");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
      LODOP.ADD_PRINT_TEXT(268, 598, 135, 20, "22104运输港/掘进机队");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
      LODOP.ADD_PRINT_TEXT(290, 598, 135, 20, "22104运输港/掘进机队");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
      LODOP.ADD_PRINT_TEXT(310, 598, 135, 20, "22104运输港/掘进机队");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
      LODOP.ADD_PRINT_TEXT(335, 598, 135, 20, "22104运输港/掘进机队");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
      LODOP.ADD_PRINT_TEXT(355, 598, 135, 20, "22104运输港/掘进机队");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
      LODOP.ADD_PRINT_TEXT(380, 598, 135, 20, "22104运输港/掘进机队");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);

      // 小计
      LODOP.ADD_PRINT_TEXT(397, 16, 100, 20, "小计");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(399, 528, 69, 20, "6681.41");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(399, 339, 63, 20, "50.2");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);

      LODOP.ADD_PRINT_TEXT(19, 360, 140, 20, "库存记账凭证");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(57, 37, 75, 20, "凭证类别");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(55, 209, 75, 20, "凭证编号");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(54, 401, 80, 20, "来源/用途");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(56, 584, 61, 20, "单据号");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(88, 39, 116, 20, "单位/部门名称");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(117, 39, 74, 20, "凭证摘要");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(440, 31, 73, 20, "制证日期");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(441, 170, 60, 20, "制证人");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(440, 297, 105, 20, "制证人（签）");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(440, 453, 106, 20, "领料人（签)");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(440, 604, 125, 20, "单位主管（签）");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(
        476,
        29,
        443,
        20,
        "白联-保管  黄联-财务  红联-材料会计  绿联-供应商/用料单位"
      );
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Italic", 1);
      LODOP.ADD_PRINT_TEXT(478, 571, 175, 20, "第 1 页 / 共 1 页");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

      //凭证类别，凭证编号，来源用途，单据号，单位部门，摘要横线
      LODOP.ADD_PRINT_LINE(41, 276, 40, 356, 0, 1);
      LODOP.ADD_PRINT_LINE(78, 97, 77, 177, 0, 1);
      LODOP.ADD_PRINT_LINE(74, 270, 73, 350, 0, 1);
      LODOP.ADD_PRINT_LINE(75, 469, 74, 549, 0, 1);
      LODOP.ADD_PRINT_LINE(75, 633, 74, 713, 0, 1);
      LODOP.ADD_PRINT_LINE(110, 128, 109, 718, 0, 1);
      LODOP.ADD_PRINT_LINE(138, 94, 137, 719, 0, 1);
      LODOP.ADD_PRINT_TEXT(118, 98, 137, 719, "你好，这是凭证摘要");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

      // 制证日期，制证人，制证人签，领料人签，单位主管签横线
      LODOP.ADD_PRINT_LINE(460, 93, 459, 163, 0, 1);
      LODOP.ADD_PRINT_TEXT();
      LODOP.ADD_PRINT_LINE(461, 225, 460, 285, 0, 1);
      LODOP.ADD_PRINT_LINE(460, 383, 459, 443, 0, 1);
      LODOP.ADD_PRINT_LINE(460, 528, 459, 588, 0, 1);
      LODOP.ADD_PRINT_LINE(460, 692, 459, 752, 0, 1);
      LODOP.ADD_PRINT_TEXT(57, 106, 100, 20, "入库凭证");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(54, 274, 100, 20, "0000006003");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(54, 478, 100, 20, "外购");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(54, 637, 100, 20, "0000010771");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(89, 139, 213, 20, "乡宁县鼎泰贸易有限公司");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(18, 258, 100, 20, "一库");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
    },

    // 入库单凭证模板
    btnClickPrint1() {
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INITA(1, -1, 800, 600, "");
      LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
      LODOP.PRINT_INITA(1, 0, 800, 600, "");
      LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
      LODOP.ADD_PRINT_RECT(157, 2, 751, 265, 0, 1);
      LODOP.ADD_PRINT_LINE(157, 135, 422, 136, 0, 1);
      LODOP.ADD_PRINT_TEXT(179, 2, 133, 20, "QTCL-QT-HC-X-1192");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(157, 240, 422, 241, 0, 1);
      LODOP.ADD_PRINT_TEXT(179, 136, 100, 20, "泡沫抑尘剂");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(157, 336, 422, 337, 0, 1);
      LODOP.ADD_PRINT_TEXT(180, 241, 88, 20, "MTY-PYCJ-II");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(157, 411, 422, 412, 0, 1);
      LODOP.ADD_PRINT_TEXT(179, 336, 75, 20, "0.200");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_LINE(157, 446, 422, 447, 0, 1);
      LODOP.ADD_PRINT_TEXT(180, 412, 37, 20, "吨");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(160, 412, 35, 20, "单位");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(179, 446, 80, 20, "25663.7121");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_LINE(158, 526, 423, 527, 0, 1);
      LODOP.ADD_PRINT_TEXT(179, 526, 70, 20, "5132.74");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_LINE(157, 596, 422, 597, 0, 1);
      LODOP.ADD_PRINT_TEXT(179, 598, 152, 20, "22104运输港/掘进机队");
      LODOP.ADD_PRINT_LINE(178, 2, 179, 752, 0, 1);
      LODOP.ADD_PRINT_TEXT(158, 22, 100, 20, "物料编号");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(157, 140, 100, 20, "物料名称");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(157, 244, 85, 20, "规格型号");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(159, 336, 70, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(157, 449, 78, 20, "单价");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(159, 526, 64, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(159, 618, 100, 20, "摘要");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(200, 2, 199, 752, 0, 1);
      LODOP.ADD_PRINT_LINE(220, 2, 219, 752, 0, 1);
      LODOP.ADD_PRINT_LINE(242, 2, 241, 752, 0, 1);
      LODOP.ADD_PRINT_LINE(263, 2, 262, 752, 0, 1);
      LODOP.ADD_PRINT_LINE(284, 2, 283, 752, 0, 1);
      LODOP.ADD_PRINT_LINE(306, 2, 305, 752, 0, 1);
      LODOP.ADD_PRINT_LINE(328, 2, 327, 752, 0, 1);
      LODOP.ADD_PRINT_LINE(349, 2, 348, 752, 0, 1);
      LODOP.ADD_PRINT_LINE(372, 2, 371, 752, 0, 1);
      LODOP.ADD_PRINT_LINE(395, 2, 394, 752, 0, 1);
      LODOP.ADD_PRINT_LINE(422, 3, 421, 753, 0, 1);
      LODOP.ADD_PRINT_TEXT(201, 4, 135, 20, "DXCL-QT-HC-X-0662");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(202, 138, 100, 20, "一字钻头");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(200, 241, 85, 20, "30#");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(203, 342, 69, 20, "50.000");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(202, 412, 41, 20, "个");
      LODOP.ADD_PRINT_TEXT(202, 447, 78, 20, "30.9734");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(200, 529, 66, 20, "1548.67");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(397, 16, 100, 20, "小计");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(399, 528, 69, 20, "6681.41");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(399, 339, 63, 20, "50.2");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_TEXT(19, 360, 140, 20, "库存记账凭证");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(57, 37, 75, 20, "凭证类别");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(55, 209, 75, 20, "凭证编号");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(54, 401, 80, 20, "来源/用途");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(56, 584, 61, 20, "单据号");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(88, 39, 116, 20, "单位/部门名称");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(117, 39, 74, 20, "凭证摘要");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(440, 31, 73, 20, "制证日期");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(441, 170, 60, 20, "制证人");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(440, 297, 105, 20, "制证人（签）");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(440, 453, 106, 20, "业务员（签)");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(440, 604, 125, 20, "材料会计（签）");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(
        476,
        29,
        443,
        20,
        "白联-保管  黄联-财务  红联-材料会计  绿联-供应商/用料单位"
      );
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Italic", 1);
      LODOP.ADD_PRINT_TEXT(478, 571, 175, 20, "第 1 页 / 共 1 页");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_LINE(41, 276, 40, 356, 0, 1);
      LODOP.ADD_PRINT_LINE(78, 97, 77, 177, 0, 1);
      LODOP.ADD_PRINT_LINE(74, 270, 73, 350, 0, 1);
      LODOP.ADD_PRINT_LINE(75, 469, 74, 549, 0, 1);
      LODOP.ADD_PRINT_LINE(75, 633, 74, 713, 0, 1);
      LODOP.ADD_PRINT_LINE(110, 128, 109, 718, 0, 1);
      LODOP.ADD_PRINT_LINE(138, 94, 137, 719, 0, 1);
      LODOP.ADD_PRINT_LINE(460, 93, 459, 163, 0, 1);
      LODOP.ADD_PRINT_LINE(461, 225, 460, 285, 0, 1);
      LODOP.ADD_PRINT_LINE(460, 383, 459, 443, 0, 1);
      LODOP.ADD_PRINT_LINE(460, 528, 459, 588, 0, 1);
      LODOP.ADD_PRINT_LINE(460, 692, 459, 752, 0, 1);
      LODOP.ADD_PRINT_TEXT(57, 106, 100, 20, "出库凭证");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(54, 274, 100, 20, "0000006003");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(54, 478, 100, 20, "生产用");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(54, 637, 100, 20, "0000010771");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(89, 139, 213, 20, "乡宁县鼎泰贸易有限公司");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(18, 258, 100, 20, "二库");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
    },

    //  采购入库明细表
    btnClickPrint2() {
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INIT("");
      LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
      LODOP.ADD_PRINT_TEXT(
        26,
        131,
        551,
        20,
        "山西华宁焦煤有限责任公司 2019年05月 采购入库明细表"
      );
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
      LODOP.ADD_PRINT_TEXT(70, 401, 100, 20, "制表人：肖永峰");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(70, 545, 151, 20, "制表日期：2022-06-02");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(96, 3, 95, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(96, 742, 118, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(119, 3, 118, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(96, 3, 118, 4, 0, 1);
      LODOP.ADD_PRINT_TEXT(97, 4, 35, 20, "库房");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(96, 39, 571, 40, 0, 1);
      LODOP.ADD_PRINT_TEXT(97, 50, 48, 20, "供应商");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(96, 126, 571, 127, 0, 1);
      LODOP.ADD_PRINT_TEXT(97, 139, 100, 20, "物料编码");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(96, 260, 571, 261, 0, 1);
      LODOP.ADD_PRINT_TEXT(97, 269, 100, 20, "物料名称");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(96, 380, 571, 381, 0, 1);
      LODOP.ADD_PRINT_TEXT(97, 387, 100, 20, "规格型号");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(96, 493, 571, 494, 0, 1);
      LODOP.ADD_PRINT_TEXT(97, 494, 35, 20, "单位");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(96, 529, 571, 530, 0, 1);
      LODOP.ADD_PRINT_TEXT(97, 537, 58, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(96, 609, 571, 610, 0, 1);
      LODOP.ADD_PRINT_TEXT(97, 621, 39, 20, "单价");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(96, 671, 571, 672, 0, 1);
      LODOP.ADD_PRINT_TEXT(97, 673, 66, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(571, 5, 235, 20, "山西华宁焦煤有限责任公司");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
      LODOP.ADD_PRINT_TEXT(571, 610, 141, 20, "第 1 页 / 共 1 页");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
      LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
      LODOP.ADD_PRINT_RECT(117, 3, 740, 453, 0, 1);
      LODOP.ADD_PRINT_LINE(141, 3, 140, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(169, 3, 168, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(197, 3, 196, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(222, 4, 221, 744, 0, 1);
      LODOP.ADD_PRINT_LINE(250, 3, 249, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(278, 3, 277, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(309, 3, 308, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(337, 3, 336, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(364, 3, 363, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(393, 3, 392, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(425, 3, 424, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(455, 3, 454, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(483, 3, 482, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(511, 3, 510, 743, 0, 1);
      LODOP.ADD_PRINT_LINE(538, 3, 537, 743, 0, 1);
      LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
    },

    //材料出库明细表
    btnClickPrint7() {
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INITA(0, 0, 1100, 800, "");
      LODOP.SET_PRINT_PAGESIZE(0, 2000, 2000, "");
      LODOP.ADD_PRINT_TEXT(45, 238, 252, 20, "山西华宁焦煤有限责任公司");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(45, 496, 135, 20, "2019年06月");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(45, 635, 135, 20, "材料出库明细表");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(104, 639, 100, 20, "制表人：肖永峰");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(104, 771, 146, 20, "制证日期：2022-06-06");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_RECT(140, 16, 931, 28, 0, 1);
      LODOP.ADD_PRINT_TEXT(145, 18, 43, 20, "库房");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(168, 64, 140, 65, 0, 1);
      LODOP.ADD_PRINT_TEXT(145, 71, 68, 20, "领用部门");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(168, 143, 140, 144, 0, 1);
      LODOP.ADD_PRINT_TEXT(145, 151, 100, 20, "物料编码");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(168, 259, 140, 260, 0, 1);
      LODOP.ADD_PRINT_TEXT(145, 266, 100, 20, "物料名称");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(168, 370, 140, 371, 0, 1);
      LODOP.ADD_PRINT_TEXT(145, 375, 100, 20, "规格型号");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(168, 478, 140, 479, 0, 1);
      LODOP.ADD_PRINT_TEXT(145, 481, 48, 20, "单位");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(168, 530, 140, 531, 0, 1);
      LODOP.ADD_PRINT_TEXT(145, 533, 75, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(168, 612, 140, 613, 0, 1);
      LODOP.ADD_PRINT_TEXT(145, 615, 90, 20, "单价");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(168, 708, 140, 709, 0, 1);
      LODOP.ADD_PRINT_TEXT(145, 714, 90, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(168, 805, 140, 806, 0, 1);
      LODOP.ADD_PRINT_TEXT(145, 808, 49, 20, "公司付");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(168, 856, 140, 857, 0, 1);
      LODOP.ADD_PRINT_TEXT(145, 861, 80, 20, "摘要");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(766, 0, 218, 20, "山西华宁焦煤有限责任公司");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
      LODOP.ADD_PRINT_TEXT(766, 841, 138, 20, "第 1 页 / 共 1 页");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
      LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
      LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
    },

    //  原材料调整表
    btnClickPrint3() {
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INITA(0, 0, 1100, 800, "");
      LODOP.SET_PRINT_PAGESIZE(0, 2100, 3000, "");
      LODOP.ADD_PRINT_TEXT(
        17,
        120,
        573,
        46,
        "山西华宁焦煤有限责任公司             原材料调账表"
      );
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.SET_PRINT_STYLEA(0, "Horient", 2);
      LODOP.ADD_PRINT_RECT(112, 0, 1085, 586, 0, 1);
      LODOP.ADD_PRINT_TEXT(727, 4, 152, 20, "山西华宁焦煤有限公司");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(80, 588, 63, 20, "制单人：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(94, 643, 93, 703, 0, 1);
      LODOP.ADD_PRINT_TEXT(80, 746, 79, 20, "制单日期：");
      LODOP.ADD_PRINT_LINE(94, 810, 93, 890, 0, 1);
      LODOP.ADD_PRINT_LINE(133, 0, 133, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(153, 0, 153, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(173, 0, 173, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(193, 0, 193, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(213, 0, 213, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(233, 0, 233, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(253, 0, 253, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(273, 0, 273, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(293, 0, 293, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(313, 0, 313, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(333, 0, 333, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(353, 0, 353, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(373, 0, 373, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(393, 0, 393, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(413, 0, 413, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(433, 0, 433, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(453, 0, 453, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(473, 0, 473, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(493, 0, 493, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(513, 0, 513, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(533, 0, 533, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(553, 0, 553, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(573, 0, 573, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(593, 0, 593, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(613, 0, 613, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(633, 0, 633, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(653, 0, 653, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(673, 0, 673, 1085, 0, 1);
      LODOP.ADD_PRINT_TEXT(120, 4, 100, 20, "类别");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 120, 100, 20, "物料编码");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 280, 100, 20, "物料名称");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 415, 80, 20, "规格型号");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 520, 69, 20, "单位");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 625, 48, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 725, 63, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 830, 64, 20, "库房");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 970, 64, 20, "备注");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      // LODOP.ADD_PRINT_TEXT(120,880,63,20,"上月均价");
      // LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
      // LODOP.ADD_PRINT_TEXT(120,957,64,20,"单价差异");
      // LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
      // LODOP.ADD_PRINT_TEXT(120,1031,49,20,"备注");
      // LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
      LODOP.ADD_PRINT_LINE(112, 100, 698, 100, 0, 1);
      LODOP.ADD_PRINT_LINE(112, 250, 698, 250, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 400, 112, 400, 0, 1);
      LODOP.ADD_PRINT_LINE(112, 520, 698, 520, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 580, 112, 580, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 700, 112, 700, 0, 1);
      LODOP.ADD_PRINT_LINE(112, 800, 698, 800, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 900, 112, 900, 0, 1);
      LODOP.ADD_PRINT_TEXT(727, 942, 126, 20, "第 1 页 / 共 1 页");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
    },

    // 公司付材料出库明细表
    btnClickPrint4() {
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.ADD_PRINT_TEXT(
        17,
        120,
        620,
        46,
        "山西华宁焦煤有限责任公司        公司付材料出库明细表"
      );
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.SET_PRINT_STYLEA(0, "Horient", 2);
      LODOP.ADD_PRINT_RECT(112, 0, 1085, 586, 0, 1);
      LODOP.ADD_PRINT_TEXT(727, 4, 152, 20, "山西华宁焦煤有限公司");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(80, 588, 63, 20, "制单人：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(94, 643, 93, 703, 0, 1);
      LODOP.ADD_PRINT_TEXT(80, 746, 79, 20, "制单日期：");
      LODOP.ADD_PRINT_LINE(94, 810, 93, 890, 0, 1);
      LODOP.ADD_PRINT_LINE(133, 0, 133, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(153, 0, 153, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(173, 0, 173, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(193, 0, 193, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(213, 0, 213, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(233, 0, 233, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(253, 0, 253, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(273, 0, 273, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(293, 0, 293, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(313, 0, 313, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(333, 0, 333, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(353, 0, 353, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(373, 0, 373, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(393, 0, 393, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(413, 0, 413, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(433, 0, 433, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(453, 0, 453, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(473, 0, 473, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(493, 0, 493, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(513, 0, 513, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(533, 0, 533, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(553, 0, 553, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(573, 0, 573, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(593, 0, 593, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(613, 0, 613, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(633, 0, 633, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(653, 0, 653, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(673, 0, 673, 1085, 0, 1);
      LODOP.ADD_PRINT_TEXT(120, 4, 100, 20, "库房");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 120, 100, 20, "领用部门");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 234, 100, 20, "物料编码");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 336, 100, 20, "物料名称");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 440, 69, 20, "规格型号");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 550, 48, 20, "单位");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 624, 63, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 706, 64, 20, "单价");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 800, 64, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 880, 63, 20, "公司付");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 1010, 64, 20, "摘要");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(112, 118, 698, 119, 0, 1);
      LODOP.ADD_PRINT_LINE(112, 228, 698, 229, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 335, 112, 336, 0, 1);
      LODOP.ADD_PRINT_LINE(112, 430, 698, 430, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 530, 112, 530, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 600, 112, 600, 0, 1);
      LODOP.ADD_PRINT_LINE(112, 695, 698, 696, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 784, 112, 785, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 871, 112, 872, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 950, 112, 951, 0, 1);
      LODOP.ADD_PRINT_TEXT(727, 942, 126, 20, "第 1 页 / 共 1 页");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
    },

    // 暂估入库统计表
    btnClickPrint5() {
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INITA(0, 1, 800, 600, "");
      LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
      LODOP.ADD_PRINT_TEXT(
        39,
        72,
        638,
        20,
        "山西华宁焦煤有限责任公司 2019-06-02至2019-07-02 暂估入库统计表"
      );
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(89, 422, 100, 20, "制表人：肖永峰");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(89, 550, 152, 20, "制表日期：2022-06-02");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_RECT(129, 2, 750, 850, 0, 1);
      LODOP.ADD_PRINT_LINE(157, 2, 157, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(185, 2, 185, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(213, 2, 213, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(241, 2, 241, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(269, 2, 269, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(297, 2, 297, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(325, 2, 325, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(353, 2, 353, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(381, 2, 381, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(409, 2, 409, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(437, 2, 437, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(465, 2, 465, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(493, 2, 493, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(521, 2, 521, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(549, 2, 549, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(577, 2, 577, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(605, 2, 605, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(633, 2, 633, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(661, 2, 661, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(689, 2, 689, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(717, 2, 717, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(745, 2, 745, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(773, 2, 773, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(801, 2, 801, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(829, 2, 829, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(857, 2, 857, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(885, 2, 885, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(913, 2, 913, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(941, 2, 941, 750, 0, 1);
      LODOP.ADD_PRINT_LINE(129, 43, 980, 44, 0, 1);
      LODOP.ADD_PRINT_TEXT(136, 6, 36, 20, "库房");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(136, 46, 80, 20, "凭证类别");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(129, 128, 980, 129, 0, 1);
      LODOP.ADD_PRINT_TEXT(136, 143, 100, 20, "入库单号");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(129, 251, 980, 252, 0, 1);
      LODOP.ADD_PRINT_TEXT(136, 264, 100, 20, "关联采购订单号");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(129, 368, 980, 369, 0, 1);
      LODOP.ADD_PRINT_TEXT(136, 377, 100, 20, "暂估入库金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(129, 488, 980, 489, 0, 1);
      LODOP.ADD_PRINT_TEXT(136, 497, 100, 20, "回冲暂估单号");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(129, 604, 980, 605, 0, 1);
      LODOP.ADD_PRINT_TEXT(136, 626, 100, 20, "回冲金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(571, 5, 235, 20, "山西华宁焦煤有限责任公司");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
      LODOP.ADD_PRINT_TEXT(571, 610, 141, 20, "第 1 页 / 共 1 页");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
      LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
    },

    // 日清月结表
    btnClickPrint6() {
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INITA(0, 0, 1100, 800, "");
      LODOP.SET_PRINT_PAGESIZE(0, 2000, 2000, "");
      LODOP.ADD_PRINT_TEXT(42, 240, 258, 20, "山西华宁焦煤有限责任公司");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(42, 496, 131, 20, "2020年06月");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(42, 627, 110, 20, "日清月结表");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(90, 595, 100, 20, "制表人：肖永峰");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(90, 727, 146, 20, "制证日期：2022-06-06");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(766, 1, 167, 20, "山西华宁焦煤有限责任公司");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
      LODOP.ADD_PRINT_TEXT(766, 776, 120, 20, "第 1 页 / 共 1 页");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
      LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
      // LODOP.ADD_PRINT_RECT(121,7,1080,28,0,1);
      LODOP.ADD_PRINT_RECT(121, 0, 1086, 500, 0, 1);
      LODOP.ADD_PRINT_LINE(141, 0, 141, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(161, 0, 161, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(181, 0, 181, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(201, 0, 201, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(221, 0, 221, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(241, 0, 241, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(261, 0, 261, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(281, 0, 281, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(301, 0, 301, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(321, 0, 321, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(341, 0, 341, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(361, 0, 361, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(381, 0, 381, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(401, 0, 401, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(421, 0, 421, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(441, 0, 441, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(461, 0, 461, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(481, 0, 481, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(501, 0, 501, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(521, 0, 521, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(541, 0, 541, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(561, 0, 561, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(581, 0, 581, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(601, 0, 601, 1086, 0, 1);
      LODOP.ADD_PRINT_TEXT(125, 8, 37, 20, "库房");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(121, 46, 622, 47, 0, 1);
      LODOP.ADD_PRINT_TEXT(125, 47, 44, 20, "类别");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(121, 93, 622, 94, 0, 1);
      LODOP.ADD_PRINT_TEXT(125, 93, 120, 20, "领用部门/入库单位");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(121, 213, 622, 214, 0, 1);
      LODOP.ADD_PRINT_TEXT(125, 217, 100, 20, "物料编码");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(121, 323, 622, 324, 0, 1);
      LODOP.ADD_PRINT_TEXT(125, 325, 80, 20, "物料名称");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(121, 406, 622, 407, 0, 1);
      LODOP.ADD_PRINT_TEXT(125, 410, 70, 20, "规格型号");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(121, 484, 622, 485, 0, 1);
      LODOP.ADD_PRINT_TEXT(125, 484, 42, 20, "单位");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(121, 524, 622, 525, 0, 1);
      LODOP.ADD_PRINT_TEXT(125, 524, 75, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(121, 605, 622, 606, 0, 1);
      LODOP.ADD_PRINT_TEXT(125, 607, 80, 20, "单价");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(121, 689, 622, 690, 0, 1);
      LODOP.ADD_PRINT_TEXT(125, 691, 80, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(121, 771, 622, 772, 0, 1);
      LODOP.ADD_PRINT_TEXT(125, 772, 140, 20, "用途（工作面或巷道）");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(125, 912, 65, 20, "设备名称");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(121, 911, 622, 912, 0, 1);
      LODOP.ADD_PRINT_LINE(121, 978, 622, 979, 0, 1);
      LODOP.ADD_PRINT_TEXT(125, 978, 65, 20, "安全费用");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(121, 1042, 622, 1043, 0, 1);
      LODOP.ADD_PRINT_TEXT(125, 1041, 50, 20, "公司付");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
    },

    //凭证查询出入库模板
    btnClickPrint8() {
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INITA(0, 0, 800, 800, "");
      LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
      LODOP.ADD_PRINT_LINE(53, 290, 52, 490, 0, 1);
      LODOP.ADD_PRINT_TEXT(28, 304, 178, 20, "一库 入库单");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(81, 67, 80, 20, "凭证类别：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(81, 131, 68, 23, "入库凭证");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "FontColor", "#FF0000");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(81, 222, 74, 20, "凭证编号：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(81, 289, 75, 20, "000006000");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "FontColor", "#FF0000");
      LODOP.ADD_PRINT_TEXT(81, 382, 85, 20, "来源/用途：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(81, 454, 43, 20, "外购");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(81, 521, 65, 20, "单据号：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(81, 573, 80, 20, "0000010760");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(116, 67, 110, 20, "单位/部门名称：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(116, 170, 503, 20, "山西中烨嘉盛机械设备有限公司");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_RECT(79, 135, 69, 20, 0, 1);
      LODOP.ADD_PRINT_RECT(79, 288, 75, 20, 0, 1);
      LODOP.ADD_PRINT_RECT(79, 458, 60, 20, 0, 1);
      LODOP.ADD_PRINT_RECT(79, 574, 100, 20, 0, 1);
      LODOP.ADD_PRINT_RECT(114, 169, 506, 20, 0, 1);
      LODOP.ADD_PRINT_TEXT(151, 67, 75, 20, "凭证摘要：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_RECT(149, 139, 360, 20, 0, 1);
      LODOP.ADD_PRINT_TEXT(151, 141, 222, 20, "");
      LODOP.ADD_PRINT_TEXT(151, 513, 65, 20, "业务员：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_RECT(149, 573, 103, 20, 0, 1);
      LODOP.ADD_PRINT_TEXT(151, 567, 68, 20, "张振辉");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_RECT(183, 1, 750, 336, 0, 1);
      LODOP.ADD_PRINT_LINE(212, 1, 211, 751, 0, 1);
      LODOP.ADD_PRINT_LINE(240, 1, 239, 751, 0, 1);
      LODOP.ADD_PRINT_LINE(268, 1, 267, 751, 0, 1);
      LODOP.ADD_PRINT_LINE(296, 1, 295, 751, 0, 1);
      LODOP.ADD_PRINT_LINE(324, 1, 323, 751, 0, 1);
      LODOP.ADD_PRINT_LINE(352, 1, 351, 751, 0, 1);
      LODOP.ADD_PRINT_LINE(380, 1, 379, 751, 0, 1);
      LODOP.ADD_PRINT_LINE(408, 1, 407, 751, 0, 1);
      LODOP.ADD_PRINT_LINE(436, 1, 435, 751, 0, 1);
      LODOP.ADD_PRINT_LINE(464, 1, 463, 751, 0, 1);
      LODOP.ADD_PRINT_LINE(492, 1, 491, 751, 0, 1);
      LODOP.ADD_PRINT_TEXT(188, 4, 111, 20, "物料编号");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(519, 144, 183, 145, 0, 1);
      LODOP.ADD_PRINT_TEXT(188, 153, 100, 20, "物料名称");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(519, 259, 183, 260, 0, 1);
      LODOP.ADD_PRINT_TEXT(188, 260, 100, 20, "规格型号");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(519, 361, 183, 362, 0, 1);
      LODOP.ADD_PRINT_LINE(519, 398, 183, 399, 0, 1);
      LODOP.ADD_PRINT_TEXT(188, 360, 38, 20, "单位");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(519, 470, 183, 471, 0, 1);
      LODOP.ADD_PRINT_TEXT(188, 399, 71, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(188, 470, 85, 20, "单价");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(519, 555, 183, 556, 0, 1);
      LODOP.ADD_PRINT_TEXT(188, 555, 90, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_LINE(519, 645, 183, 646, 0, 1);
      LODOP.ADD_PRINT_TEXT(188, 653, 100, 20, "摘要");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(496, 22, 100, 20, "合计：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(531, 11, 79, 20, "制证日期：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
      LODOP.ADD_PRINT_RECT(530, 83, 100, 20, 0, 1);
      LODOP.ADD_PRINT_TEXT(531, 79, 90, 20, "2021-12-08");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(531, 215, 64, 20, "制证人：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_RECT(530, 269, 100, 20, 0, 1);
      LODOP.ADD_PRINT_TEXT(531, 272, 100, 20, "肖永峰");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
    },

    // 价格分析
    btnClickPrint9() {
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INITA(0, 0, 1100, 800, "");
      LODOP.SET_PRINT_PAGESIZE(0, 2100, 3000, "");
      LODOP.ADD_PRINT_TEXT(
        17,
        120,
        573,
        46,
        "山西华宁焦煤有限责任公司        材料价格分析表"
      );
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.SET_PRINT_STYLEA(0, "Horient", 2);
      LODOP.ADD_PRINT_RECT(112, 0, 1085, 586, 0, 1);
      LODOP.ADD_PRINT_TEXT(727, 4, 152, 20, "山西华宁焦煤有限公司");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(80, 588, 63, 20, "制单人：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(94, 643, 93, 703, 0, 1);
      LODOP.ADD_PRINT_TEXT(80, 746, 79, 20, "制单日期：");
      LODOP.ADD_PRINT_LINE(94, 810, 93, 890, 0, 1);
      LODOP.ADD_PRINT_LINE(133, 0, 133, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(153, 0, 153, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(173, 0, 173, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(193, 0, 193, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(213, 0, 213, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(233, 0, 233, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(253, 0, 253, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(273, 0, 273, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(293, 0, 293, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(313, 0, 313, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(333, 0, 333, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(353, 0, 353, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(373, 0, 373, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(393, 0, 393, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(413, 0, 413, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(433, 0, 433, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(453, 0, 453, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(473, 0, 473, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(493, 0, 493, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(513, 0, 513, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(533, 0, 533, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(553, 0, 553, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(573, 0, 573, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(593, 0, 593, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(613, 0, 613, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(633, 0, 633, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(653, 0, 653, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(673, 0, 673, 1085, 0, 1);
      LODOP.ADD_PRINT_TEXT(120, 4, 100, 20, "物料编码");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 120, 100, 20, "物料名称");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 234, 100, 20, "规格型号");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 336, 50, 20, "单位");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 435, 69, 20, "供应商");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(120, 560, 48, 20, "采购员");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 624, 63, 20, "采购数量");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 706, 64, 20, "采购金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 800, 64, 20, "采购单价");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 880, 63, 20, "上月均价");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 957, 64, 20, "单价差异");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(120, 1031, 49, 20, "备注");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(112, 118, 698, 119, 0, 1);
      LODOP.ADD_PRINT_LINE(112, 228, 698, 229, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 335, 112, 336, 0, 1);
      LODOP.ADD_PRINT_LINE(112, 386, 698, 387, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 556, 112, 557, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 612, 112, 613, 0, 1);
      LODOP.ADD_PRINT_LINE(112, 695, 698, 696, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 784, 112, 785, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 871, 112, 872, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 950, 112, 951, 0, 1);
      LODOP.ADD_PRINT_LINE(698, 1022, 112, 1023, 0, 1);
      LODOP.ADD_PRINT_TEXT(727, 942, 126, 20, "第 1 页 / 共 1 页");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
      LODOP.NewPageA(); //跳转到新页面
    },

    // 消耗明细表A3
    btnClickPrint10() {
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INITA(0, 0, 1100, 800, "");
      LODOP.SET_PRINT_PAGESIZE(0, 2100, 3000, "");
      LODOP.ADD_PRINT_TEXT(
        25,
        209,
        533,
        34,
        "山西华宁焦煤有限责任公司         材料消耗明细表"
      );
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.SET_PRINT_STYLEA(0, "Underline", 1);
      LODOP.SET_PRINT_STYLEA(0, "Horient", 2);
      LODOP.ADD_PRINT_RECT(107, 0, 1086, 500, 0, 1);
      LODOP.ADD_PRINT_TEXT(77, 607, 66, 20, "制单人：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(162, 0, 162, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(182, 0, 182, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(202, 0, 202, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(222, 0, 222, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(242, 0, 242, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(262, 0, 262, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(282, 0, 282, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(302, 0, 302, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(322, 0, 322, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(342, 0, 342, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(362, 0, 362, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(382, 0, 382, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(402, 0, 402, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(422, 0, 422, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(442, 0, 442, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(462, 0, 462, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(482, 0, 482, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(502, 0, 502, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(522, 0, 522, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(542, 0, 542, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(562, 0, 562, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(582, 0, 582, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(111, 0, 162, 122, 0, 1);
      LODOP.ADD_PRINT_LINE(107, 119, 607, 120, 0, 1);
      LODOP.ADD_PRINT_LINE(135, 120, 134, 1086, 0, 1);
      LODOP.ADD_PRINT_LINE(606, 280, 106, 281, 0, 1);
      LODOP.ADD_PRINT_LINE(606, 199, 133, 200, 0, 1);
      LODOP.ADD_PRINT_LINE(91, 666, 90, 726, 0, 1);
      LODOP.ADD_PRINT_TEXT(77, 772, 69, 20, "制单日期：");
      LODOP.ADD_PRINT_LINE(91, 836, 90, 916, 0, 1);
      LODOP.ADD_PRINT_LINE(107, 440, 607, 441, 0, 1);
      LODOP.ADD_PRINT_LINE(107, 598, 607, 599, 0, 1);
      LODOP.ADD_PRINT_LINE(607, 760, 107, 761, 0, 1);
      LODOP.ADD_PRINT_LINE(607, 920, 107, 921, 0, 1);
      LODOP.ADD_PRINT_LINE(606, 358, 133, 359, 0, 1);
      LODOP.ADD_PRINT_LINE(606, 519, 133, 520, 0, 1);
      LODOP.ADD_PRINT_LINE(606, 675, 133, 676, 0, 1);
      LODOP.ADD_PRINT_LINE(606, 838, 133, 839, 0, 1);
      LODOP.ADD_PRINT_LINE(606, 1004, 133, 1005, 0, 1);
      LODOP.ADD_PRINT_TEXT(651, 79, 70, 20, "上期结存：");
      LODOP.ADD_PRINT_LINE(665, 141, 664, 221, 0, 1);
      LODOP.ADD_PRINT_TEXT(651, 341, 73, 20, "本期入库：");
      LODOP.ADD_PRINT_LINE(665, 405, 664, 485, 0, 1);
      LODOP.ADD_PRINT_TEXT(651, 620, 74, 20, "本期出库：");
      LODOP.ADD_PRINT_LINE(665, 683, 664, 763, 0, 1);
      LODOP.ADD_PRINT_TEXT(651, 873, 73, 20, "本期结存：");
      LODOP.ADD_PRINT_LINE(665, 936, 664, 1016, 0, 1);
      LODOP.ADD_PRINT_TEXT(730, 41, 69, 20, "总经理：");
      LODOP.ADD_PRINT_TEXT(730, 224, 71, 20, "总会计师：");
      LODOP.ADD_PRINT_TEXT(730, 415, 74, 20, "供销副总：");
      LODOP.ADD_PRINT_TEXT(730, 610, 70, 20, "财务部长：");
      LODOP.ADD_PRINT_TEXT(730, 794, 69, 20, "供应部长：");
      LODOP.ADD_PRINT_TEXT(730, 974, 59, 20, "制单人：");
      LODOP.ADD_PRINT_TEXT(139, 8, 41, 20, "材料");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(110, 74, 40, 20, "项目");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.ADD_PRINT_TEXT(111, 161, 75, 20, "公司付");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(111, 320, 69, 20, "崖坪煤矿");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(111, 484, 69, 20, "修配厂");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(111, 649, 50, 20, "后勤");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(111, 804, 70, 20, "选煤厂");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(111, 973, 63, 20, "合计");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(140, 136, 41, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(140, 215, 47, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(140, 300, 43, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.ADD_PRINT_TEXT(140, 380, 42, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.ADD_PRINT_TEXT(140, 451, 47, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(140, 534, 42, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(140, 612, 49, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(140, 692, 49, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(140, 776, 49, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(140, 850, 45, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(140, 930, 63, 20, "数量");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(140, 1017, 58, 20, "金额");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
    },
    btnClickPrint11() {
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INITA(0, 0, 1100, 800, "");
      LODOP.SET_PRINT_PAGESIZE(0, 2100, 2970, "");
      LODOP.ADD_PRINT_TEXT(
        27,
        340,
        575,
        45,
        "山西华宁焦煤有限责任公司 202001 余额检查表"
      );
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.SET_PRINT_STYLEA(0, "Underline", 1);
      LODOP.SET_PRINT_STYLEA(0, "Horient", 2);
      LODOP.ADD_PRINT_RECT(139, 18, 1077, 545, 0, 1);
      LODOP.ADD_PRINT_TEXT(740, 20, 173, 20, "山西华宁焦煤有限责任公司");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
      LODOP.ADD_PRINT_TEXT(740, 942, 131, 20, "第 1 页 / 共 1 页");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
      LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
      LODOP.ADD_PRINT_TEXT(145, 17, 37, 20, "库房");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(145, 62, 100, 20, "物料编码");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(145, 179, 64, 20, "上月数量");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(145, 255, 65, 20, "上月金额");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(145, 333, 76, 20, "本月数量");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(145, 411, 79, 20, "本月金额");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(145, 493, 77, 20, "本月入数量");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(145, 563, 77, 20, "本月入金额");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.ADD_PRINT_TEXT(145, 639, 69, 20, "本月出数量");
      LODOP.ADD_PRINT_TEXT(145, 710, 73, 20, "本月出金额");
      LODOP.ADD_PRINT_TEXT(145, 786, 58, 20, "误差数量");
      LODOP.ADD_PRINT_TEXT(145, 850, 60, 20, "误差金额");
      LODOP.ADD_PRINT_TEXT(145, 911, 60, 20, "库存数量");
      LODOP.ADD_PRINT_TEXT(145, 970, 60, 20, "库存单价");
      LODOP.ADD_PRINT_LINE(684, 53, 139, 54, 0, 1);
      LODOP.ADD_PRINT_LINE(684, 175, 139, 176, 0, 1);
      LODOP.ADD_PRINT_LINE(684, 253, 139, 254, 0, 1);
      LODOP.ADD_PRINT_LINE(684, 331, 139, 332, 0, 1);
      LODOP.ADD_PRINT_LINE(684, 410, 139, 411, 0, 1);
      LODOP.ADD_PRINT_LINE(684, 491, 139, 492, 0, 1);
      LODOP.ADD_PRINT_LINE(684, 564, 139, 565, 0, 1);
      LODOP.ADD_PRINT_LINE(684, 637, 139, 638, 0, 1);
      LODOP.ADD_PRINT_LINE(684, 709, 139, 710, 0, 1);
      LODOP.ADD_PRINT_LINE(684, 784, 139, 785, 0, 1);
      LODOP.ADD_PRINT_LINE(684, 848, 139, 849, 0, 1);
      LODOP.ADD_PRINT_TEXT(145, 1032, 59, 20, "库存金额");
      LODOP.ADD_PRINT_LINE(684, 911, 139, 912, 0, 1);
      LODOP.ADD_PRINT_LINE(684, 970, 139, 971, 0, 1);
      LODOP.ADD_PRINT_LINE(684, 1029, 139, 1030, 0, 1);
      LODOP.ADD_PRINT_LINE(172, 18, 171, 1095, 0, 1);
      LODOP.ADD_PRINT_TEXT(101, 676, 64, 20, "制单人：");
      LODOP.ADD_PRINT_LINE(116, 727, 115, 797, 0, 1);
      LODOP.ADD_PRINT_TEXT(100, 827, 74, 20, "制证日期：");
      LODOP.ADD_PRINT_LINE(116, 889, 115, 989, 0, 1);
      LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
    },
  },
};
</script>