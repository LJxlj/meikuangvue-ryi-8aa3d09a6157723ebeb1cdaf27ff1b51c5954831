<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="检查年月" prop="checkoutMonth">
        <el-input
          v-model="queryParams.checkoutMonth"
          placeholder="日期格式如202008"
          clearable
          size="small"
          maxLength="6"
          oninput="value=value.replace(/[^\d]/g,'')"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <!-- <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        > -->
      </el-form-item>
      <div class="inputDeep">
        <el-form-item label="操作员" prop="planedit">
          <el-input
            v-model="queryParams.planedit"
            placeholder=""
            clearable
            :style="{ width: '100%' }"
            readonly
          >
          </el-input>
        </el-form-item>

        <el-form-item label="操作日期" prop="voucherdate">
          <el-date-picker
            v-model="queryParams.voucherdate"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd"
            :style="{ width: '93%' }"
            placeholder="请选择凭证日期:"
            readonly
          ></el-date-picker>
        </el-form-item>

        <br />
        <el-form-item label="上期结存" prop="ldecLastMoney">
          <el-input
            v-model="queryParams.ldecLastMoney"
            placeholder=""
            clearable
            :style="{ width: '100%' }"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="本期入库" prop="thisInMoney">
          <el-input
            v-model="queryParams.thisInMoney"
            placeholder=""
            clearable
            :style="{ width: '100%' }"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="本期出库" prop="thisOutMoney">
          <el-input
            v-model="queryParams.thisOutMoney"
            placeholder=""
            clearable
            :style="{ width: '100%' }"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="本期结存" prop="ldecThisMoney">
          <el-input
            v-model="queryParams.ldecThisMoney"
            placeholder=""
            readonly
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['project:A3:export']"
          >导出</el-button
        >
      </el-col>
      <el-button type="success" plain size="mini" @click="btnClickPrint10"
        >打印</el-button
      >
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      max-height="1000"
      stripe
      v-loading="loading"
      :data="A3List"
      @selection-change="handleSelectionChange"
      show-summary
      :summary-method="getSummaries"
      element-loading-text="正在处理数据，请稍后"
      empty-text="暂无数据"
      :row-style="{ height: '30px' }"
      :cell-style="{ padding: '0px' }"
      style="font-size: 10px"
    >
      >

      <el-table-column
        label="物料类型"
        align="center"
        prop="materialType"
        min-width="180"
      >
      </el-table-column>
      <el-table-column label="公司付" align="center">
        <el-table-column
          label="数量"
          align="center"
          prop="kfquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="kfmoney"
          min-width="120"
        />
      </el-table-column>
      <el-table-column label="崖坪煤矿" align="center">
        <el-table-column
          label="数量"
          align="center"
          prop="jtjquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="jtjmoney"
          min-width="120"
        />
      </el-table-column>
      <el-table-column label="后勤" align="center">
        <el-table-column
          label="数量"
          align="center"
          prop="jdquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="jdmoney"
          min-width="120"
        />
      </el-table-column>
      <el-table-column label="修配厂" align="center">
        <el-table-column
          label="数量"
          align="center"
          prop="xpcquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="xpcmoney"
          min-width="120"
        />
      </el-table-column>
      <el-table-column label="选煤厂" align="center">
        <el-table-column
          label="数量"
          align="center"
          prop="qtquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="qtmoney"
          min-width="120"
        />
      </el-table-column>
      <el-table-column label="合计" align="center">
        <el-table-column
          label="数量"
          align="center"
          prop="totalquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="totalmoney"
          min-width="120"
        />
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import {
  listA3,
  getA3,
  delA3,
  addA3,
  updateA3,
  exportA3,
  dateToString,
} from "@/api/project/A3";
import Cookies from "js-cookie";
import { getLodop } from "@/api/project/LodopFuncs"; //导入模块
export default {
  name: "A3",

  data() {
    const userInfo = JSON.parse(Cookies.get("userInfo"));
    return {
      dialogVisible: false,
      // 遮罩层
      loading: false,
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 消耗明细表表格数据
      A3List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        // pageNum: 1,
        // pageSize: 100,
        thisOutMoney: null,
        ldecLastMoney: null,
        ldecThisMoney: null,
        thisInMoney: null,
        planedit: userInfo.userName,
        checkoutMonth: "",
        materialType: null,
        seriesname: null,
        kfquant: null,
        kfmoney: null,
        jtjquant: null,
        jtjmoney: null,
        jdquant: null,
        jdmoney: null,
        xpcquant: null,
        xpcmoney: null,
        qtquant: null,
        qtmoney: null,
        voucherdate: new Date(),
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    // 消耗明细表A3
    btnClickPrint10() {
      if (this.A3List.length == 0) {
        this.$message.error("没有数据可以打印，请先查询数据");
        return;
      } else {
        let a = this.queryParams.checkoutMonth.substring(0, 7);
        let LODOP = getLodop(); //调用getLodop获取LODOP对象
        LODOP.PRINT_INITA(0, 0, 2000, 1000, "");
        LODOP.SET_PRINT_PAGESIZE(0, 3200, 2970, "");
        LODOP.ADD_PRINT_TEXT(23, 233, 303, 40, "山西华宁焦煤有限责任公司");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_TEXT(28, 532, 179, 40, a);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_TEXT(23, 636, 179, 40, "材料消耗明细表");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_RECT(107, 0, 1086, 520, 0, 1);
        LODOP.ADD_PRINT_TEXT(77, 607, 66, 20, "制单人：");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(75, 667, 80, 20, this.queryParams.planedit);
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
        LODOP.ADD_PRINT_LINE(602, 0, 602, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(111, 0, 162, 122, 0, 1);
        LODOP.ADD_PRINT_LINE(107, 119, 627, 120, 0, 1);
        LODOP.ADD_PRINT_LINE(135, 120, 134, 1086, 0, 1);
        LODOP.ADD_PRINT_LINE(627, 280, 106, 281, 0, 1);
        LODOP.ADD_PRINT_LINE(627, 199, 133, 200, 0, 1);
        LODOP.ADD_PRINT_LINE(91, 666, 90, 726, 0, 1);

        LODOP.ADD_PRINT_TEXT(77, 772, 69, 20, "制单日期：");
        LODOP.ADD_PRINT_TEXT(
          77,
          837,
          100,
          20,
          dateToString(this.queryParams.voucherdate)
        );
        LODOP.ADD_PRINT_LINE(91, 836, 90, 916, 0, 1);
        LODOP.ADD_PRINT_LINE(107, 440, 627, 441, 0, 1);
        LODOP.ADD_PRINT_LINE(107, 598, 627, 599, 0, 1);
        LODOP.ADD_PRINT_LINE(627, 760, 107, 761, 0, 1);
        LODOP.ADD_PRINT_LINE(627, 920, 107, 921, 0, 1);
        LODOP.ADD_PRINT_LINE(627, 358, 133, 359, 0, 1);
        LODOP.ADD_PRINT_LINE(627, 519, 133, 520, 0, 1);
        LODOP.ADD_PRINT_LINE(627, 675, 133, 676, 0, 1);
        LODOP.ADD_PRINT_LINE(627, 838, 133, 839, 0, 1);
        LODOP.ADD_PRINT_LINE(627, 1004, 133, 1005, 0, 1);
        LODOP.ADD_PRINT_TEXT(651, 79, 70, 20, "上期结存：");
        LODOP.ADD_PRINT_LINE(665, 141, 664, 221, 0, 1);
        LODOP.ADD_PRINT_TEXT(651, 141, 100, 20, this.queryParams.ldecLastMoney);
        LODOP.ADD_PRINT_TEXT(651, 341, 73, 20, "本期入库：");
        LODOP.ADD_PRINT_LINE(665, 405, 664, 485, 0, 1);
        LODOP.ADD_PRINT_TEXT(651, 405, 100, 20, this.queryParams.thisInMoney);
        LODOP.ADD_PRINT_TEXT(651, 620, 74, 20, "本期出库：");
        LODOP.ADD_PRINT_LINE(665, 683, 664, 763, 0, 1);
        LODOP.ADD_PRINT_TEXT(651, 683, 100, 20, this.queryParams.thisOutMoney);
        LODOP.ADD_PRINT_TEXT(651, 873, 73, 20, "本期结存：");
        LODOP.ADD_PRINT_LINE(665, 936, 664, 1016, 0, 1);
        LODOP.ADD_PRINT_TEXT(651, 936, 100, 20, this.queryParams.ldecThisMoney);
        LODOP.ADD_PRINT_TEXT(730, 41, 69, 20, "总经理：");
        LODOP.ADD_PRINT_TEXT(730, 224, 71, 20, "总会计师：");
        LODOP.ADD_PRINT_TEXT(730, 415, 74, 20, "供销副总：");
        LODOP.ADD_PRINT_TEXT(730, 610, 70, 20, "财务部长：");
        LODOP.ADD_PRINT_TEXT(730, 794, 69, 20, "供应部长：");
        LODOP.ADD_PRINT_TEXT(730, 974, 59, 20, "制单人：");
        LODOP.ADD_PRINT_TEXT(730, 1040, 59, 20, this.queryParams.planedit);
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

        for (
          let i = 0, j = 162, k = 1;
          i < this.A3List.length;
          i++, j += 20, k++
        ) {
          LODOP.ADD_PRINT_TEXT(j, 1, 130, 10, this.A3List[i].materialType);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
          LODOP.ADD_PRINT_TEXT(j, 130, 70, 10, this.A3List[i].kfquant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
          LODOP.ADD_PRINT_TEXT(j, 210, 70, 10, this.A3List[i].kfmoney);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
          LODOP.ADD_PRINT_TEXT(j, 285, 70, 10, this.A3List[i].jtjquant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
          LODOP.ADD_PRINT_TEXT(j, 360, 70, 10, this.A3List[i].jtjmoney);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
          LODOP.ADD_PRINT_TEXT(j, 440, 70, 10, this.A3List[i].jdquant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
          LODOP.ADD_PRINT_TEXT(j, 520, 70, 10, this.A3List[i].jdmoney);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
          LODOP.ADD_PRINT_TEXT(j, 600, 70, 10, this.A3List[i].xpcquant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
          LODOP.ADD_PRINT_TEXT(j, 680, 70, 10, this.A3List[i].xpcmoney);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
          LODOP.ADD_PRINT_TEXT(j, 760, 70, 10, this.A3List[i].qtquant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
          LODOP.ADD_PRINT_TEXT(j, 840, 70, 10, this.A3List[i].qtmoney);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);

          if (k == 22) {
            LODOP.NewPageA();
            k = 0;
            j = 21;
            LODOP.ADD_PRINT_LINE(3, 2, 40, 111, 0, 1);
            LODOP.ADD_PRINT_LINE(1, 119, 501, 120, 0, 1);
            LODOP.ADD_PRINT_LINE(25, 120, 25, 1086, 0, 1);
            LODOP.ADD_PRINT_LINE(501, 280, 1, 281, 0, 1);
            LODOP.ADD_PRINT_LINE(501, 199, 27, 200, 0, 1);
            // LODOP.ADD_PRINT_LINE(91, 666, 90, 726, 0, 1);
            // LODOP.ADD_PRINT_LINE(91, 836, 90, 916, 0, 1);
            LODOP.ADD_PRINT_LINE(1, 440, 501, 441, 0, 1);
            LODOP.ADD_PRINT_LINE(1, 598, 501, 599, 0, 1);
            LODOP.ADD_PRINT_LINE(501, 760, 1, 761, 0, 1);
            LODOP.ADD_PRINT_LINE(501, 920, 1, 921, 0, 1);
            LODOP.ADD_PRINT_LINE(501, 358, 27, 359, 0, 1);
            LODOP.ADD_PRINT_LINE(501, 519, 27, 520, 0, 1);
            LODOP.ADD_PRINT_LINE(501, 675, 27, 676, 0, 1);
            LODOP.ADD_PRINT_LINE(501, 838, 27, 839, 0, 1);
            LODOP.ADD_PRINT_LINE(501, 1004, 27, 1005, 0, 1);
            LODOP.ADD_PRINT_RECT(1, 0, 1086, 501, 0, 1);
            // LODOP.ADD_PRINT_LINE(1, 0, 1, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(21, 0, 21, 1086, 0, 1);
            LODOP.ADD_PRINT_LINE(41, 0, 41, 1086, 0, 1);
            LODOP.ADD_PRINT_LINE(61, 0, 61, 1086, 0, 1);
            LODOP.ADD_PRINT_LINE(81, 0, 81, 1086, 0, 1);
            LODOP.ADD_PRINT_LINE(101, 0, 101, 1086, 0, 1);
            LODOP.ADD_PRINT_LINE(121, 0, 121, 1086, 0, 1);
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
            // LODOP.ADD_PRINT_LINE(521, 0, 521, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(541, 0, 541, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(561, 0, 561, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(581, 0, 581, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(601, 0, 601, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(621, 0, 621, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(641, 0, 641, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(661, 0, 661, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(681, 0, 681, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(701, 0, 701, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(721, 0, 721, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(741, 0, 741, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(761, 0, 761, 1086, 0, 1);
            // LODOP.ADD_PRINT_LINE(781, 0, 781, 1086, 0, 1);
            LODOP.ADD_PRINT_TEXT(28, 8, 41, 20, "材料");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(1, 74, 40, 20, "项目");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.ADD_PRINT_TEXT(1, 161, 75, 20, "公司付");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(1, 320, 69, 20, "崖坪煤矿");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(1, 484, 69, 20, "修配厂");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(1, 649, 50, 20, "后勤");
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(1, 804, 70, 20, "选煤厂");
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(1, 973, 63, 20, "合计");
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(28, 136, 41, 20, "数量");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(28, 215, 47, 20, "金额");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(28, 300, 43, 20, "数量");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.ADD_PRINT_TEXT(28, 380, 42, 20, "金额");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.ADD_PRINT_TEXT(28, 451, 47, 20, "数量");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(28, 534, 42, 20, "金额");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(28, 612, 49, 20, "数量");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(28, 692, 49, 20, "金额");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(28, 776, 49, 20, "数量");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(28, 850, 45, 20, "金额");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(28, 930, 63, 20, "数量");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(28, 1017, 58, 20, "金额");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }
        }
        // LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
        LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);

        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
        LODOP.PREVIEW(); //预览(预览打印无脚标)
        // LODOP.PRINT(); //打印
      }
    },
    //合计
    getSummaries(param) {
      const { columns, data } = param; //这里可以看出，自定义函数会传入每一列，以及数据
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        }
        // 指定一个或者多个你需要计算的列
        else if (index >= 1) {
          //index>=3后的列进行求和
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            // 处理精度问题
            if (index >= 1) {
              sums[1] = parseFloat(sums[1].toFixed(2));
              sums[2] = parseFloat(sums[2]).toFixed(2);
              sums[3] = parseFloat(sums[3]).toFixed(2);
              sums[4] = parseFloat(sums[4]).toFixed(2);
              sums[5] = parseFloat(sums[5]).toFixed(2);
              sums[6] = parseFloat(sums[6]).toFixed(2);
              sums[7] = parseFloat(sums[7]).toFixed(2);
              sums[8] = parseFloat(sums[8]).toFixed(2);
              sums[9] = parseFloat(sums[9]).toFixed(2);
              sums[10] = parseFloat(sums[10]).toFixed(2);
              sums[11] = parseFloat(sums[11]).toFixed(2);
              sums[12] = parseFloat(sums[12]).toFixed(2);
              sums[13] = parseFloat(sums[13]).toFixed(2);
            }
            //console.log("sums[index]=="+sums[index])
            //此处结合了方式一的判断处理，实现多种条件处理
            switch (column.property) {
              case "kfmoney":
              case "jtjmoney":
              case "jdmoney":
              case "xpcmoney":
              case "qtmoney":
              case "totalmoney":
                return (sums[index] = sums[index] + " 元");
                break;
            }
          } else {
            sums[index] = ""; //如果列的值有一项不是数字，就显示这个自定义内容
          }
        } else {
          sums[index] = "";
        }
      });

      const total = sums[12];
      console.log("sums==" + sums[12]);
      this.queryParams.thisOutMoney = total;
      return sums; //最后返回合计行的数据
    },

    /** 查询消耗明细表列表 */
    getList() {
      this.loading = true;
      listA3(this.queryParams).then((response) => {
        this.A3List = response.rows;
        console.log("aaaa==", response);
        console.log("aaaa==", this.A3List);
        // 上期结存和本期结存
        let str =
          "uf_report_xiaohaomingxibiaoA3(" +
          this.queryParams.checkoutMonth +
          ")";
        let abc = (response.rows[0].map[str] || "").split(",");
        this.queryParams.ldecLastMoney = abc[0];
        this.queryParams.ldecThisMoney = abc[1];
        // console.log(abc, str);
        // console.log("A3List==" + this.A3List);
        // 制单时间为当前时间
        // console.log(typeof(parseInt(this.A3List[0].kfquant)))
        this.A3List.forEach((item) => {
          item.totalquant =
            parseFloat(item.kfquant) +
            parseFloat(item.jtjquant) +
            parseFloat(item.jdquant) +
            parseFloat(item.xpcquant) +
            parseFloat(item.qtquant);
          item.totalquant = item.totalquant.toFixed(2);

          item.totalmoney =
            parseFloat(item.kfmoney) +
            parseFloat(item.jtjmoney) +
            parseFloat(item.jdmoney) +
            parseFloat(item.xpcmoney) +
            parseFloat(item.qtmoney);

          item.totalmoney = item.totalmoney.toFixed(2);
        });
        this.total = response.total;
        this.loading = false;
      });
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        checkoutMonth: "",
        materialType: null,
        seriesname: null,
        kfquant: null,
        kfmoney: null,
        jtjquant: null,
        jtjmoney: null,
        jdquant: null,
        jdmoney: null,
        xpcquant: null,
        xpcmoney: null,
        qtquant: null,
        qtmoney: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (
        this.queryParams.checkoutMonth == "" ||
        this.queryParams.checkoutMonth == null
      ) {
        this.$message.error("检查年月不能为空，请输入年月");
      } else {
        this.queryParams.pageNum = 1;
      }
      // 判断检查年月是否为6位数字
      if (this.queryParams.checkoutMonth.length == 6) {
        this.queryParams.pageNum = 1;
      } else {
        this.$message.error("检查年月格式错误，请重新输入");
      }

      // 判断第五位只能是0或1，第五位是0的时候第六位只能是0-9。第五位是1的时候，第六位只能是1-2
      if (this.queryParams.checkoutMonth.length == 6) {
        // console.log(this.queryParams.checkoutMonth.substring)
        if (this.queryParams.checkoutMonth.substring(4, 5) == 0) {
          if (
            this.queryParams.checkoutMonth.substring(5, 6) > 9 ||
            this.queryParams.checkoutMonth.substring(5, 6) < 1
          ) {
            this.$message.error("请输入正确的年月");
            return false;
          }
        } else if (this.queryParams.checkoutMonth.substring(4, 5) == 1) {
          if (this.queryParams.checkoutMonth.substring(5, 6) > 2) {
            this.$message.error("请输入正确年月");
            return false;
          }
        } else {
          this.$message.error("请输入正确的年月");
          return false;
        }
      }
      // 当输入的年月格式合法并且正确时，才调用查询接口
      if (this.queryParams.checkoutMonth.length == 6) {
        this.getList();
      }
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.materialType);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加消耗明细表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const materialType = row.materialType || this.ids;
      getA3(materialType).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改消耗明细表";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.materialType != null) {
            updateA3(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addA3(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const materialTypes = row.materialType || this.ids;
      this.$modal
        .confirm(
          '是否确认删除消耗明细表编号为"' + materialTypes + '"的数据项？'
        )
        .then(function () {
          return delA3(materialTypes);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },

    /** 导出按钮操作 */
    handleExport() {
      if (this.A3List.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有消耗明细表检查?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Loading = true;
          return exportA3(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.Loading = false;
        });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
<style scoped>
.el-input.is-disabled /deep/ .el-input__inner {
  color: black;
  background-color: white;
}
</style>