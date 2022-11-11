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
      <el-form-item label="检查年月" prop="checkoutmonth">
        <el-input
          v-model="queryParams.checkoutmonth"
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
          v-hasPermi="['project:consumption:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain size="mini" @click="print"
          >打印</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="consumptionList"
      @selection-change="handleSelectionChange"
      show-summary
      :summary-method="getSummaries"
    >
      <!-- <el-table-column label="物料类型" align="center" prop="materialType" /> -->
      <el-table-column
        label="物料分类"
        align="center"
        prop="seriesname"
        min-width="220"
      />
      <!-- <el-table-column label="类别" align="center" prop="unitname">
        <template slot-scope="scope">
          <span
            v-for="dict in dict.type.aaam00"
            :key="dict.value"
            v-if="scope.row.unitname == dict.value"
            >{{ dict.label }}</span
          >
        </template>
      </el-table-column> -->
      <el-table-column label="综合部" align="center" prop="zonghebu">
        <el-table-column
          label="数量"
          align="center"
          prop="zhquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="zhmoney"
          min-width="100"
        />
      </el-table-column>
      <el-table-column label="财务部" align="center" prop="caiwubu">
        <el-table-column
          label="数量"
          align="center"
          prop="jcquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="jcmoney"
          min-width="100"
        />
      </el-table-column>
      <el-table-column label="机电供应部" align="center" prop="jdgyingbu">
        <el-table-column
          label="数量"
          align="center"
          prop="jdgyquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="jdgymoney"
          min-width="100"
        />
      </el-table-column>
      <el-table-column label="销售部" align="center" prop="sqbu">
        <el-table-column
          label="数量"
          align="center"
          prop="xsquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="xsmoney"
          min-width="100"
        />
      </el-table-column>
      <el-table-column label="生产技术部" align="center" prop="scjishubu">
        <el-table-column
          label="数量"
          align="center"
          prop="jsquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="jsmoney"
          min-width="100"
        />
      </el-table-column>
      <el-table-column label="安监部" align="center" prop="anjianbu">
        <el-table-column
          label="数量"
          align="center"
          prop="ajquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="ajmoney"
          min-width="100"
        />
      </el-table-column>
      <el-table-column label="崖坪煤矿" align="center" prop="ypmeikuang">
        <el-table-column
          label="数量"
          align="center"
          prop="mkquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="mkmoney"
          min-width="100"
        />
      </el-table-column>
      <el-table-column label="选煤厂" align="center" prop="xuanmeichang">
        <el-table-column
          label="数量"
          align="center"
          prop="xxquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="xxmoney"
          min-width="100"
        />
      </el-table-column>
      <el-table-column label="党群部" align="center" prop="dangqunbu">
        <el-table-column
          label="数量"
          align="center"
          prop="yyquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="yymoney"
          min-width="100"
        />
      </el-table-column>
      <el-table-column label="后勤" align="center" prop="houqin">
        <el-table-column
          label="数量"
          align="center"
          prop="hqquant"
          min-width="100"
        />
        <el-table-column
          label="金额"
          align="center"
          prop="hqmoney"
          min-width="100"
        />
      </el-table-column>
      <el-table-column label="其他部门" align="center" prop="qita">
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
          min-width="100"
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

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  listConsumption,
  getConsumption,
  delConsumption,
  addConsumption,
  updateConsumption,
} from "@/api/project/consumption";
import Cookies from "js-cookie";
import { exportConsumption } from "../../../api/project/consumption";
import { getLodop } from "@/api/project/LodopFuncs"; //导入模块
import { dateToString } from "../../../api/project/voucher";
import dict from "../../../utils/dict";

export default {
  name: "Consumption",
  dicts: ["aaam00"],

  data() {
    const userInfo = JSON.parse(Cookies.get("userInfo"));
    return {
      // 遮罩层
      loading: false,
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
      // 低值易耗品消耗明细表表格数据
      consumptionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        ldecLastMoney: null,
        ldecThisMoney: null,
        planedit: userInfo.userName,
        voucherdate: new Date(),
        checkoutmonth: null,
        thisOutMoney: null,
        thisInMoney: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        unitname: [
          { required: true, message: "$comment不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    // 合计部分
    getSummaries(param) {
      const { columns, data } = param; //这里可以看出，自定义函数会传入每一列，以及数据
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合  计";
          return;
          // 求索引大于等于2的合计
        } else if (index >= 2) {
          //页面分别统计 处理
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                // 保存了两位小数点
                return Math.floor((prev + curr) * 100) / 100;
              } else {
                // 保存了两位小数点
                return Math.floor(prev * 100) / 100;
              }
            }, 0);
            // 处理精度问题
            if (index >= 3) {
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
              sums[14] = parseFloat(sums[14]).toFixed(2);
              sums[15] = parseFloat(sums[15]).toFixed(2);
              sums[16] = parseFloat(sums[16]).toFixed(2);
              sums[17] = parseFloat(sums[17]).toFixed(2);
              sums[18] = parseFloat(sums[18]).toFixed(2);
              sums[19] = parseFloat(sums[19]).toFixed(2);
              sums[20] = parseFloat(sums[20]).toFixed(2);
              sums[21] = parseFloat(sums[21]).toFixed(2);
              sums[22] = parseFloat(sums[22]).toFixed(2);
              sums[23] = parseFloat(sums[23]).toFixed(2);
            }
          } else {
            sums[index] = "元";
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    // 公司付材料出库明细表
    print() {
      const userInfo = JSON.parse(Cookies.get("userInfo"));
      if (this.consumptionList.length === 0) {
        this.$message.error("暂无数据，请先查询在打印");
      } else {
         let str =
          "uf_report_lowvalue_consumption(" +
          this.queryParams.checkoutmonth +
          ")";
 
        let a =this.queryParams.checkoutmonth.substring(0, 7);
        let LODOP = getLodop(); //调用getLodop获取LODOP对
        LODOP.PRINT_INITA(0, 0, 2000, 1000, "");
        LODOP.SET_PRINT_PAGESIZE(0, 4200, 2970, "");
        LODOP.ADD_PRINT_RECT(131, 0, 1580, 679, 0, 1);
        LODOP.ADD_PRINT_LINE(208, 1, 207, 1581, 0, 1);
        LODOP.ADD_PRINT_LINE(132, 2, 206, 66, 0, 1);
        LODOP.ADD_PRINT_LINE(134, 5, 181, 142, 0, 1);
        LODOP.ADD_PRINT_LINE(810, 141, 131, 142, 0, 1);
        LODOP.ADD_PRINT_TEXT(184, 3, 43, 20, "类别");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.ADD_PRINT_TEXT(181, 60, 75, 20, "数量金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.ADD_PRINT_TEXT(138, 85, 46, 20, "部门");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.ADD_PRINT_LINE(171, 142, 170, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(809, 261, 130, 262, 0, 1);
        LODOP.ADD_PRINT_LINE(131, 381, 810, 382, 0, 1);
        LODOP.ADD_PRINT_LINE(131, 501, 810, 502, 0, 1);
        LODOP.ADD_PRINT_LINE(131, 621, 810, 622, 0, 1);
        LODOP.ADD_PRINT_LINE(131, 740, 810, 741, 0, 1);
        LODOP.ADD_PRINT_LINE(131, 861, 810, 862, 0, 1);
        LODOP.ADD_PRINT_LINE(131, 981, 810, 982, 0, 1);
        LODOP.ADD_PRINT_LINE(131, 1101, 810, 1102, 0, 1);
        LODOP.ADD_PRINT_LINE(131, 1221, 810, 1222, 0, 1);
        LODOP.ADD_PRINT_LINE(131, 1341, 810, 1342, 0, 1);
        LODOP.ADD_PRINT_LINE(132, 1460, 811, 1461, 0, 1);
        LODOP.ADD_PRINT_LINE(207, 30, 767, 31, 0, 1);
        LODOP.ADD_PRINT_LINE(248, 30, 247, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(287, 30, 288, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(328, 30, 327, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(367, 30, 368, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(407, 30, 408, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(447, 0, 448, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(487, 30, 488, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(527, 30, 528, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(567, 30, 568, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(607, 30, 608, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(647, 30, 648, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(687, 30, 688, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(727, 30, 728, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(767, 0, 768, 1580, 0, 1);
        LODOP.ADD_PRINT_LINE(171, 201, 810, 202, 0, 1);
        LODOP.ADD_PRINT_LINE(171, 321, 810, 322, 0, 1);
        LODOP.ADD_PRINT_LINE(171, 441, 810, 442, 0, 1);
        LODOP.ADD_PRINT_LINE(171, 561, 810, 562, 0, 1);
        LODOP.ADD_PRINT_LINE(171, 681, 810, 682, 0, 1);
        LODOP.ADD_PRINT_LINE(171, 800, 810, 801, 0, 1);
        LODOP.ADD_PRINT_LINE(810, 920, 171, 921, 0, 1);
        LODOP.ADD_PRINT_LINE(171, 1040, 810, 1041, 0, 1);
        LODOP.ADD_PRINT_LINE(171, 1160, 810, 1161, 0, 1);
        LODOP.ADD_PRINT_LINE(171, 1280, 810, 1281, 0, 1);
        LODOP.ADD_PRINT_LINE(171, 1400, 810, 1401, 0, 1);
        LODOP.ADD_PRINT_LINE(171, 1520, 810, 1521, 0, 1);
        LODOP.ADD_PRINT_TEXT(141, 153, 100, 20, "综合部");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(141, 276, 100, 20, "财务部");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(141, 392, 100, 20, "机电供应部");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(141, 513, 100, 20, "销售部");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(141, 631, 100, 20, "生产技术部");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(141, 753, 100, 20, "安监部");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(141, 872, 100, 20, "崖坪煤矿");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(141, 994, 100, 20, "选煤厂");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(141, 1118, 100, 20, "党群部");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(141, 1234, 100, 20, "后勤");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(141, 1350, 100, 20, "其他部门");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(141, 1471, 100, 20, "合计");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(178, 145, 49, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(180, 203, 51, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(181, 266, 50, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(182, 322, 49, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(182, 384, 48, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(183, 441, 54, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(181, 504, 48, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(182, 566, 49, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(183, 625, 47, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(182, 683, 52, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(182, 747, 47, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(183, 805, 49, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(182, 868, 50, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(182, 924, 53, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(182, 987, 54, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(183, 1042, 55, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(182, 1102, 51, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(183, 1164, 49, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(183, 1225, 49, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(182, 1281, 54, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(181, 1345, 49, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(181, 1407, 50, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(182, 1466, 49, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(180, 1523, 52, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        for( let i = 0, j = 213, k = 1;
          i < this.consumptionList.length;
          i++, j += 40, k++){
            LODOP.ADD_PRINT_TEXT(j, 30, 100, 20, this.consumptionList[i].seriesname);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
            LODOP.ADD_PRINT_TEXT(j, 150, 100, 20, this.consumptionList[i].zhquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 210, 100, 20, this.consumptionList[i].zhmoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 270, 100, 20, this.consumptionList[i].jcquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 330, 100, 20, this.consumptionList[i].jcmoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 390, 100, 20, this.consumptionList[i].jdgyquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 450, 100, 20, this.consumptionList[i].jdgymoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 510, 100, 20, this.consumptionList[i].xsquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 570, 100, 20, this.consumptionList[i].xsmoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 630, 100, 20, this.consumptionList[i].jsquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 690, 100, 20, this.consumptionList[i].jsmoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 750, 100, 20, this.consumptionList[i].ajquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 810, 100, 20, this.consumptionList[i].ajmoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 870, 100, 20, this.consumptionList[i].mkquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 930, 100, 20, this.consumptionList[i].mkmoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 990, 100, 20, this.consumptionList[i].xxquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 1050, 100, 20, this.consumptionList[i].xxmoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 1110, 100, 20, this.consumptionList[i].yyquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 1170, 100, 20, this.consumptionList[i].yymoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 1230, 100, 20, this.consumptionList[i].hqquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 1290, 100, 20, this.consumptionList[i].hqmoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 1350, 100, 20, this.consumptionList[i].qtquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.ADD_PRINT_TEXT(j, 1410, 100, 20, this.consumptionList[i].qtmoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);

        }
        LODOP.ADD_PRINT_TEXT(
          16,
          414,
          735,
          41,
          "山西华宁焦煤有限责任公司"+a +"低值易耗品消耗明细表"
        );
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 20);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.SET_PRINT_STYLEA(0,"Underline",1);
        LODOP.ADD_PRINT_TEXT(87, 1057, 71, 20, "制证日期：");
        LODOP.ADD_PRINT_LINE(101, 1118, 102, 1218, 0, 1);
        LODOP.ADD_PRINT_TEXT(
          91,
          1118,
          90,
          20,
         dateToString(this.queryParams.voucherdate)
        );
        LODOP.ADD_PRINT_TEXT(837, 61, 100, 20, "上期结存金额：");
        LODOP.ADD_PRINT_LINE(851, 147, 852, 247, 0, 1);
        LODOP.ADD_PRINT_TEXT(837, 147, 100, 10,this.queryParams.ldecLastMoney);
        LODOP.ADD_PRINT_TEXT(837, 501, 100, 10,this.queryParams.thisInMoney);
        LODOP.ADD_PRINT_TEXT(837, 978, 100, 10,this.queryParams.thisOutMoney);
        LODOP.ADD_PRINT_TEXT(837, 1396, 100, 10,this.queryParams.ldecThisMoney);
        LODOP.ADD_PRINT_TEXT(837, 420, 100, 20, "本期入库金额：");
        LODOP.ADD_PRINT_LINE(851, 501, 852, 601, 0, 1);
        LODOP.ADD_PRINT_TEXT(837, 887, 100, 20, "本期出库金额：");
        LODOP.ADD_PRINT_LINE(851, 978, 852, 1078, 0, 1);
        LODOP.ADD_PRINT_TEXT(837, 1312, 100, 20, "本期结存金额：");
        LODOP.ADD_PRINT_LINE(851, 1396, 852, 1496, 0, 1);
        LODOP.ADD_PRINT_TEXT(912, 47, 82, 20, "总经理：");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(912, 294, 100, 20, "总会计师：");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(912, 574, 100, 20, "分管领导：");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(912, 860, 100, 20, "财务审核：");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(912, 1148, 100, 20, "主管签字：");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(912, 1428, 100, 20, "制表人：");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(912,1480,100,20,this.queryParams.planedit)
        LODOP.ADD_PRINT_TEXT(275, 1, 30, 123, "办公用品");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(553, -1, 34, 115, "事务用品");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

        
        // LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
        LODOP.PREVIEW(); //预览(预览打印无脚标)
        // LODOP.PRINT(); //打印}
      }
    },
    /** 查询低值易耗品消耗明细表列表 */
    getList() {
      this.loading = true;
      listConsumption(this.queryParams).then((response) => {
        this.consumptionList = response.rows;
        // 上期结存和本期结存
        let str =
          "uf_report_lowvalue_consumption(" +
          this.queryParams.checkoutmonth +
          ")";
        let abc = (response.rows[0].map[str] || "").split(",");
        this.queryParams.ldecLastMoney = abc[0];
        this.queryParams.thisInMoney = abc[1];
        this.queryParams.thisOutMoney = abc[2];
        this.queryParams.ldecThisMoney = abc[3];
        this.consumptionList.forEach((item) => {
          item.totalquant =
            parseFloat(item.zhquant) +
            parseFloat(item.jcquant) +
            parseFloat(item.jdgyquant) +
            parseFloat(item.xsquant) +
            parseFloat(item.jsquant) +
            parseFloat(item.ajquant) +
            parseFloat(item.mkquant) +
            parseFloat(item.xxquant) +
            parseFloat(item.yyquant) +
            parseFloat(item.hqquant) +
            parseFloat(item.qtquant);

          item.totalquant = item.totalquant.toFixed(2);

          item.totalmoney =
            parseFloat(item.zhmoney) +
            parseFloat(item.jcmoney) +
            parseFloat(item.jdgymoney) +
            parseFloat(item.xsmoney) +
            parseFloat(item.jsmoney) +
            parseFloat(item.ajmoney) +
            parseFloat(item.mkmoney) +
            parseFloat(item.xxmoney) +
            parseFloat(item.yymoney) +
            parseFloat(item.hqmoney) +
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
        materialType: null,
        seriesname: null,
        unitname: null,
        zhquant: null,
        zhmoney: null,
        jcquant: null,
        jcmoney: null,
        jdgyquant: null,
        jdgymoney: null,
        xsquant: null,
        xsmoney: null,
        jsquant: null,
        jsmoney: null,
        ajquant: null,
        ajmoney: null,
        mkquant: null,
        mkmoney: null,
        xxquant: null,
        xxmoney: null,
        yyquant: null,
        yymoney: null,
        hqquant: null,
        hqmoney: null,
        qtquant: null,
        qtmoney: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (
        this.queryParams.checkoutmonth == "" ||
        this.queryParams.checkoutmonth == null
      ) {
        this.$message.error("检查年月不能为空，请输入年月");
      } else {
        this.queryParams.pageNum = 1;
      }
      // 判断检查年月是否为6位数字
      if (this.queryParams.checkoutmonth.length == 6) {
        this.queryParams.pageNum = 1;
      } else {
        this.$message.error("检查年月格式错误，请重新输入");
      }

      // 判断第五位只能是0或1，第五位是0的时候第六位只能是0-9。第五位是1的时候，第六位只能是1-2
      if (this.queryParams.checkoutmonth.length == 6) {
        // console.log(this.queryParams.thisCheckoutMonth.substring)
        if (this.queryParams.checkoutmonth.substring(4, 5) == 0) {
          if (
            this.queryParams.checkoutmonth.substring(5, 6) > 9 ||
            this.queryParams.checkoutmonth.substring(5, 6) < 1
          ) {
            this.$message.error("请输入正确的年月");
            return false;
          }
        } else if (this.queryParams.checkoutmonth.substring(4, 5) == 1) {
          if (this.queryParams.checkoutmonth.substring(5, 6) > 2) {
            this.$message.error("请输入正确年月");
            return false;
          }
        } else {
          this.$message.error("请输入正确的年月");
          return false;
        }
      }
      // 当输入的年月格式合法并且正确时，才调用查询接口
      if (this.queryParams.checkoutmonth.length == 6) {
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
      this.title = "添加低值易耗品消耗明细表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const materialType = row.materialType || this.ids;
      getConsumption(materialType).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改低值易耗品消耗明细表";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.materialType != null) {
            updateConsumption(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addConsumption(this.form).then((response) => {
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
          '是否确认删除低值易耗品消耗明细表编号为"' +
            materialTypes +
            '"的数据项？'
        )
        .then(function () {
          return delConsumption(materialTypes);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      if (this.consumptionList.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有低值易耗品消耗明细表?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Loading = true;
          return exportConsumption(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.Loading = false;
        });
    },
  },
};
</script>
