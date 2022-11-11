<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      :rules="rules"
      hide-required-asterisk
      
    >
      <el-form-item label="检查年月" prop="checkOutMonth">
        <el-date-picker
          v-model="queryParams.checkOutMonth"
          type="month"
          placeholder="请选择年月"
          value-format="yyyy-MM-dd"
          @keyup.enter.native="handleQuery"
        >
        </el-date-picker>
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="handleQuery"
        >搜索</el-button
      >
      <!-- <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button> -->
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
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['project:analysis:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain size="mini" @click="btnClickPrint9"
          >打印</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <div class="inputDeep">
      <el-table
        v-loading="loading"
        :data="analysisList"
        @selection-change="handleSelectionChange"
        element-loading-text="正在处理数据，请稍后"
        empty-text="暂无数据"
        show-summary
        :summary-method="getSummaries"
        :cell-style="{ padding: '3px' }"
        class="el-table"
        border
        size="mini"
      >
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column
          label="物料编号"
          align="center"
          prop="itemcode"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.itemcode"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="物料名称"
          align="center"
          prop="itemname"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.itemname"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="规格型号"
          align="center"
          prop="model"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.model"></el-input>
          </template>
        </el-table-column>

        <el-table-column
          label="单位"
          align="center"
          prop="unit"
          min-width="70"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.unit"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="供应商"
          align="center"
          prop="supplier"
          min-width="250"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.supplier"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="采购员" align="center" prop="buyer" min-width="85">
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.buyer"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="采购数量" align="center" prop="amount" min-width="140">
          <template slot-scope="scope">
              <el-input-number
              disabled
              v-model="scope.row.amount"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="采购金额" align="center" prop="totalmoney" min-width="150">
          <template slot-scope="scope">
            <el-input-number
              disabled
              v-model="scope.row.totalmoney"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="采购单价"
          align="center"
          prop="price"
          min-width="150"
        >
          <template slot-scope="scope">
               <el-input-number
              disabled
              v-model="scope.row.price"
              :precision="4"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="上月均价"
          align="center"
          prop="averageprice"
          min-width="140"
        >
          <template slot-scope="scope">
               <el-input-number
              disabled
              v-model="scope.row.averageprice"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="差异"
          align="center"
          prop="difference"
          min-width="140"
        >
          <template slot-scope="scope">
               <el-input-number
              disabled
              v-model="scope.row.difference"
              :precision="4"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remarks">
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.remarks"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
  listAnalysis,
  getAnalysis,
  delAnalysis,
  addAnalysis,
  updateAnalysis,
} from "@/api/project/analysis";
import Cookies from "js-cookie";
import { getLodop } from "@/api/project/LodopFuncs"; //导入模块
import { exportAnalysis } from "../../../api/project/analysis";
import { dateToString } from "../../../api/project/voucher";
export default {
  name: "Analysis",
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
      // 价格分析表格数据
      analysisList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        planedit: userInfo.userName,
        voucherdate: new Date(),
        checkOutMonth: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        checkOutMonth: [
          {
            required: true,
            message: "日期格式错误，格式如2020-01",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    // 价格分析
    btnClickPrint9() {
      const userInfo = JSON.parse(Cookies.get("userInfo"));
      if (this.analysisList.length == 0) {
        this.$message.error("没有数据可以打印，请先查询数据");
        return;
      }
      let a = this.queryParams.checkOutMonth.substring(0, 7);
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INITA(0, 0, 2000, 1000, "");
      LODOP.SET_PRINT_PAGESIZE(0,3000, 3000, "");
      LODOP.ADD_PRINT_TEXT(30, 233, 301, 35, "山西华宁焦煤有限责任公司");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_LINE(59, 532, 58, 632, 0, 1);
      LODOP.ADD_PRINT_TEXT(25, 532, 532, 20, a);
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(30, 636, 181, 35, "价格分析明细表");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_RECT(112, 0, 1085, 861, 0, 1);
      LODOP.ADD_PRINT_TEXT(1011, 4, 152, 20, "山西华宁焦煤有限公司");
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_TEXT(80, 588, 63, 20, "制单人：");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.ADD_PRINT_LINE(94, 643, 93, 703, 0, 1);
      LODOP.ADD_PRINT_TEXT(80, 650, 80, 20, this.queryParams.planedit);
      LODOP.ADD_PRINT_TEXT(80, 746, 79, 20, "制单日期：");
      LODOP.ADD_PRINT_LINE(94, 810, 93, 890, 0, 1);
      LODOP.ADD_PRINT_TEXT(
        75,
        810,
        80,
        20,
        dateToString(this.queryParams.voucherdate)
      );
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
      LODOP.ADD_PRINT_LINE(693, 0, 693, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(713, 0, 713, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(733, 0, 733, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(753, 0, 753, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(773, 0, 773, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(793, 0, 793, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(813, 0, 813, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(833, 0, 833, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(853, 0, 853, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(873, 0, 873, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(893, 0, 893, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(913, 0, 913, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(933, 0, 933, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(953, 0, 953, 1085, 0, 1);
      LODOP.ADD_PRINT_LINE(973, 0, 973, 1085, 0, 1);

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
      LODOP.ADD_PRINT_LINE(112, 118, 973, 119, 0, 1);
      LODOP.ADD_PRINT_LINE(112, 228, 973, 229, 0, 1);
      LODOP.ADD_PRINT_LINE(973, 335, 112, 336, 0, 1);
      LODOP.ADD_PRINT_LINE(112, 386, 973, 387, 0, 1);
      LODOP.ADD_PRINT_LINE(973, 556, 112, 557, 0, 1);
      LODOP.ADD_PRINT_LINE(973, 612, 112, 613, 0, 1);
      LODOP.ADD_PRINT_LINE(112, 695, 973, 696, 0, 1);
      LODOP.ADD_PRINT_LINE(973, 784, 112, 785, 0, 1);
      LODOP.ADD_PRINT_LINE(973, 871, 112, 872, 0, 1);
      LODOP.ADD_PRINT_LINE(973, 950, 112, 951, 0, 1);
      LODOP.ADD_PRINT_LINE(973, 1022, 112, 1023, 0, 1);
      for (
        let i = 0, j = 141, k = 1;
        i < this.analysisList.length;
        i++, j += 20, k++
      ) {
        LODOP.ADD_PRINT_TEXT(j, 3, 120, 10, this.analysisList[i].itemcode);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.ADD_PRINT_TEXT(j, 120, 120, 10, this.analysisList[i].itemname);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.ADD_PRINT_TEXT(j, 230, 100, 10, this.analysisList[i].model);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.ADD_PRINT_TEXT(j, 350, 100, 10, this.analysisList[i].unit);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.ADD_PRINT_TEXT(j, 395, 170, 10, this.analysisList[i].supplier);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.ADD_PRINT_TEXT(j, 560, 80, 10, this.analysisList[i].buyer);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.ADD_PRINT_TEXT(j, 620, 80, 10, this.analysisList[i].amount);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.ADD_PRINT_TEXT(j, 700, 80, 10, this.analysisList[i].totalmoney);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.ADD_PRINT_TEXT(j, 795, 80, 10, this.analysisList[i].price);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.ADD_PRINT_TEXT(j, 875, 80, 10, this.analysisList[i].averageprice);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.ADD_PRINT_TEXT(j, 955, 80, 10, this.analysisList[i].difference);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.ADD_PRINT_TEXT(j, 1031, 80, 10, this.analysisList[i].remarks);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        if (k == 42) {
          LODOP.NewPageA();
          k = 0;
          j = 1;
          LODOP.ADD_PRINT_LINE(1, 0, 1, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(21, 0, 21, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(41, 0, 41, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(61, 0, 61, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(81, 0, 81, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(101, 0, 101, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(121, 0, 121, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(141, 0, 141, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(161, 0, 161, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(181, 0, 181, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(201, 0, 201, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(221, 0, 221, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(241, 0, 241, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(261, 0, 261, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(281, 0, 281, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(301, 0, 301, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(321, 0, 321, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(341, 0, 341, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(361, 0, 361, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(381, 0, 381, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(401, 0, 401, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(421, 0, 421, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(441, 0, 441, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(461, 0, 461, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(481, 0, 481, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(501, 0, 501, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(521, 0, 521, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(541, 0, 541, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(561, 0, 561, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(581, 0, 581, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(601, 0, 601, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(621, 0, 621, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(641, 0, 641, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(661, 0, 661, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(681, 0, 681, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(701, 0, 701, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(721, 0, 721, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(741, 0, 741, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(761, 0, 761, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(781, 0, 781, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(801, 0, 801, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(821, 0, 821, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(841, 0, 841, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(861, 0, 861, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(881, 0, 881, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(901, 0, 901, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(921, 0, 921, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(941, 0, 941, 1085, 0, 1);
          LODOP.ADD_PRINT_LINE(961, 0, 961, 1085, 0, 1);
          LODOP.ADD_PRINT_TEXT(1, 4, 100, 20, "物料编码");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(1, 120, 100, 20, "物料名称");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(1, 234, 100, 20, "规格型号");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(1, 336, 50, 20, "单位");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(1, 435, 69, 20, "供应商");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(1, 560, 48, 20, "采购员");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(1, 624, 63, 20, "采购数量");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(1, 706, 64, 20, "采购金额");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(1, 800, 64, 20, "采购单价");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(1, 880, 63, 20, "上月均价");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(1, 957, 64, 20, "单价差异");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(1, 1031, 49, 20, "备注");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(1, 118, 961, 119, 0, 1);
          LODOP.ADD_PRINT_LINE(1, 228, 961, 229, 0, 1);
          LODOP.ADD_PRINT_LINE(961, 335, 1, 336, 0, 1);
          LODOP.ADD_PRINT_LINE(1, 386, 961, 387, 0, 1);
          LODOP.ADD_PRINT_LINE(961, 556, 1, 557, 0, 1);
          LODOP.ADD_PRINT_LINE(961, 612, 1, 613, 0, 1);
          LODOP.ADD_PRINT_LINE(1, 695, 961, 696, 0, 1);
          LODOP.ADD_PRINT_LINE(961, 784, 1, 785, 0, 1);
          LODOP.ADD_PRINT_LINE(961, 871, 1, 872, 0, 1);
          LODOP.ADD_PRINT_LINE(961, 950, 1, 951, 0, 1);
          LODOP.ADD_PRINT_LINE(961, 1022, 1, 1023, 0, 1);
          LODOP.ADD_PRINT_RECT(1, 0, 1085, 961, 0, 1);
          LODOP.ADD_PRINT_TEXT(1011, 4, 152, 20, "山西华宁焦煤有限公司");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
        }
      }
      LODOP.ADD_PRINT_TEXT(1011, 942, 126, 20, "第 # 页 / 共 & 页");
      LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
      // LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
  
    },

    /** 查询价格分析列表 */
    getList() {
      this.loading = true;
      console.log(this.queryParams, "queryParams");
      listAnalysis(this.queryParams).then((response) => {
        this.analysisList = response.rows;
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
        itemcode: null,
        itemname: null,
        model: null,
        unit: null,
        supplier: null,
        buyer: null,
        amount: null,
        totalmoney: null,
        price: null,
        averageprice: null,
        difference: null,
        remarks: null,
      };
      this.resetForm("form");
    },
    // 合计部分
    getSummaries(param) {
      const { columns, data } = param; //这里可以看出，自定义函数会传入每一列，以及数据
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合  计";
          return;
          // 求索引是5和索引大于等于7的合计
        } else if (index === 6 || index === 7) {
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
            if (index === 6 || index === 7) {
              sums[6] = parseFloat(sums[6]).toFixed(2);
              sums[7] = parseFloat(sums[7]).toFixed(2);
    
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
    /** 搜索按钮操作 */
    handleQuery() {
      // 判断检查年月是否为空
      if (
        this.queryParams.checkOutMonth == "" ||
        this.queryParams.checkOutMonth == null
      ) {
        this.$message.error("检查年月不能为空，请输入年月");
      } else {
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
      this.ids = selection.map((item) => item.itemcode);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加价格分析";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const itemcode = row.itemcode || this.ids;
      getAnalysis(itemcode).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改价格分析";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.itemcode != null) {
            updateAnalysis(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAnalysis(this.form).then((response) => {
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
      const itemcodes = row.itemcode || this.ids;
      this.$modal
        .confirm('是否确认删除价格分析编号为"' + itemcodes + '"的数据项？')
        .then(function () {
          return delAnalysis(itemcodes);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      if (this.analysisList.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有价格分析表?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Loading = true;
          return exportAnalysis(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.Loading = false;
        });
    },
  },
};
</script>
<style scoped>
/* el-input 的样式修改 */
.el-input.is-disabled /deep/ .el-input__inner {
  color: black;
  background-color: white;
}
/* 利用穿透，设置input边框隐藏 */
.inputDeep >>> .el-input__inner {
  border: 0;
  color: black;
  background-color: white;
}

.el-table /deep/ .cell {
  padding: 0px;
  padding-left: 0px;
  padding-right: 0px;
  /*background-color: white;*/
}
</style>