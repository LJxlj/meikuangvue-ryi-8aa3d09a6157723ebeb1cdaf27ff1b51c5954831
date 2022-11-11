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
      <el-form-item label="物料编码" prop="itemcode">
        <el-input
          v-model="queryParams.itemcode"
          placeholder="请输入物料编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="用途" prop="resourceusage">
        <el-select
          v-model="queryParams.resourceusage"
          placeholder="请选择用途"
          clearable
        >
          <el-option
            v-for="dict in dict.type.resourceusagename"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
      </el-form-item>
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
          v-hasPermi="['project:cleandaymonth:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain size="mini" @click="btnClickPrint6"
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
        :data="cleandaymonthList"
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
        <el-table-column label="库房" align="center" prop="warehousecode">
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.warehousecode"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="类别" align="center" prop="vouchertype">
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.vouchertype"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="领用部门/入库单位"
          align="center"
          prop="unitname"
          min-width="180"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.unitname"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="物料编码"
          align="center"
          prop="itemcode"
          min-width="180"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.itemcode"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="物料名称"
          align="center"
          prop="itemname"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.itemname"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="规格型号"
          align="center"
          prop="model"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.model"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单位" align="center" prop="unit" min-width="60">
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.unit"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          align="center"
          prop="quant"
          min-width="140"
        >
          <template slot-scope="scope">
            <el-input-number
              disabled
              v-model="scope.row.quant"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="单价"
          align="center"
          prop="price"
          min-width="140"
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
          label="金额"
          align="center"
          prop="money"
          min-width="140"
        >
          <template slot-scope="scope">
            <el-input-number
              disabled
              v-model="scope.row.money"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          label="用途"
          align="center"
          prop="resourceusage"
          min-width="130"
        />

        <el-table-column
          label="设备名称"
          align="center"
          prop="equimentname"
          min-width="130"
        />

        <el-table-column
          label="安全费用"
          align="center"
          prop="financetreatflag"
          min-width="80"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.financetreatflag"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="公司付"
          align="center"
          prop="safetyfeeflag"
          min-width="80"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.safetyfeeflag"></el-input>
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
  listCleandaymonth,
  getCleandaymonth,
  delCleandaymonth,
  addCleandaymonth,
  updateCleandaymonth,
} from "@/api/project/cleandaymonth";
import Cookies from "js-cookie";
import { exportCleandaymonth } from "../../../api/project/cleandaymonth";
import { getLodop } from "@/api/project/LodopFuncs"; //导入模块
import { dateToString } from "../../../api/project/voucher";
export default {
  name: "Cleandaymonth",
  dicts: ["resourceusagename"],
  data() {
    //从cookie内获取用户
    const userInfo = JSON.parse(Cookies.get("userInfo"));
    //获取用户所在的部门编号和名称
    const deptName = userInfo.dept.deptName;
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
      // 日清月结表格数据
      cleandaymonthList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        itemcode: null,
        // resourceusage: "",
        checkOutMonth: null,
        warehousecode: userInfo.dept.deptId,
        planedit: userInfo.userName,
        voucherdate: new Date(),
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
    // 日清月结表
    btnClickPrint6() {
      const userInfo = JSON.parse(Cookies.get("userInfo"));
      if (this.cleandaymonthList.length == 0) {
        this.$message.error("暂无数据，请先查询数据在打印");
      } else {
        let a = this.queryParams.checkOutMonth.substring(0, 7);
        let LODOP = getLodop(); //调用getLodop获取LODOP对象
        LODOP.PRINT_INITA(0, 0, 2000, 1000, "");
        LODOP.SET_PRINT_PAGESIZE(0, 3000, 3000, "");
        LODOP.ADD_PRINT_TEXT(30, 233, 301, 35, "山西华宁焦煤有限责任公司");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_LINE(59, 532, 58, 632, 0, 1);
        LODOP.ADD_PRINT_TEXT(25, 532, 532, 20, a);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_TEXT(30, 636, 181, 35, "日清月结明细表");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_TEXT(900, 4, 152, 20, "山西华宁焦煤有限公司");
        LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
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

        // LODOP.ADD_PRINT_RECT(121,7,1080,28,0,1);
        LODOP.ADD_PRINT_RECT(121, 0, 1130, 580, 0, 1);
        LODOP.ADD_PRINT_LINE(141, 0, 141, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(161, 0, 161, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(181, 0, 181, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(201, 0, 201, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(221, 0, 221, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(241, 0, 241, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(261, 0, 261, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(281, 0, 281, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(301, 0, 301, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(321, 0, 321, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(341, 0, 341, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(361, 0, 361, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(381, 0, 381, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(401, 0, 401, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(421, 0, 421, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(441, 0, 441, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(461, 0, 461, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(481, 0, 481, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(501, 0, 501, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(521, 0, 521, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(541, 0, 541, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(561, 0, 561, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(581, 0, 581, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(601, 0, 601, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(621, 0, 621, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(641, 0, 641, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(661, 0, 661, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(681, 0, 681, 1130, 0, 1);
        LODOP.ADD_PRINT_LINE(701, 0, 701, 1130, 0, 1);
        LODOP.ADD_PRINT_TEXT(125, 8, 37, 20, "库房");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(121, 46, 701, 47, 0, 1);
        LODOP.ADD_PRINT_TEXT(125, 47, 44, 20, "类别");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(121, 93, 701, 94, 0, 1);
        LODOP.ADD_PRINT_TEXT(125, 93, 120, 20, "领用部门/入库单位");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(121, 213, 701, 214, 0, 1);
        LODOP.ADD_PRINT_TEXT(125, 217, 100, 20, "物料编码");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(121, 323, 701, 324, 0, 1);
        LODOP.ADD_PRINT_TEXT(125, 325, 80, 20, "物料名称");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(121, 406, 701, 407, 0, 1);
        LODOP.ADD_PRINT_TEXT(125, 410, 70, 20, "规格型号");
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(121, 484, 701, 485, 0, 1);
        LODOP.ADD_PRINT_TEXT(125, 484, 42, 20, "单位");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(121, 524, 701, 525, 0, 1);
        LODOP.ADD_PRINT_TEXT(125, 524, 75, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(121, 605, 701, 606, 0, 1);
        LODOP.ADD_PRINT_TEXT(125, 607, 80, 20, "单价");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(121, 689, 701, 690, 0, 1);
        LODOP.ADD_PRINT_TEXT(125, 691, 80, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(121, 771, 701, 772, 0, 1);
        LODOP.ADD_PRINT_TEXT(125, 772, 140, 20, "用途工作面/巷道");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(125, 912, 65, 20, "设备名称");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(121, 890, 701, 890, 0, 1);
        LODOP.ADD_PRINT_LINE(121, 1010, 701, 1010, 0, 1);
        LODOP.ADD_PRINT_TEXT(125, 1020, 65, 20, "安全费用");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(121, 1080, 701, 1080, 0, 1);
        LODOP.ADD_PRINT_TEXT(125, 1080, 50, 20, "公司付");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        for (
          let i = 0, j = 141, k = 1;
          i < this.cleandaymonthList.length;
          i++, j += 20, k++
        ) {
          LODOP.ADD_PRINT_TEXT(
            j,
            8,
            37,
            10,
            this.cleandaymonthList[i].warehousecode
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(
            j,
            47,
            44,
            10,
            this.cleandaymonthList[i].vouchertype
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(
            j,
            93,
            130,
            10,
            this.cleandaymonthList[i].unitname
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(
            j,
            217,
            130,
            10,
            this.cleandaymonthList[i].itemcode
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
          LODOP.ADD_PRINT_TEXT(
            j,
            325,
            80,
            10,
            this.cleandaymonthList[i].itemname
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(j, 410, 70, 10, this.cleandaymonthList[i].model);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(j, 484, 42, 10, this.cleandaymonthList[i].unit);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(j, 524, 75, 10, this.cleandaymonthList[i].quant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);

          LODOP.ADD_PRINT_TEXT(j, 607, 80, 10, this.cleandaymonthList[i].price);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);

          LODOP.ADD_PRINT_TEXT(j, 691, 80, 10, this.cleandaymonthList[i].money);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);

          LODOP.ADD_PRINT_TEXT(
            j,
            772,
            140,
            10,
            this.cleandaymonthList[i].resourceusage
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(
            j,
            1070,
            65,
            10,
            this.cleandaymonthList[i].financetreatflag
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(
            j,
            1120,
            50,
            10,
            this.cleandaymonthList[i].safetyfeeflag
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          if (k == 28) {
            LODOP.NewPageA();
            k = 0;
            j = 1;
            LODOP.ADD_PRINT_LINE(1, 0, 1, 1060, 0, 1);
            LODOP.ADD_PRINT_LINE(21, 0, 21, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(41, 0, 41, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(61, 0, 61, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(81, 0, 81, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(101, 0, 101, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(121, 0, 121, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(141, 0, 141, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(161, 0, 161, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(181, 0, 181, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(201, 0, 201, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(221, 0, 221, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(241, 0, 241, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(261, 0, 261, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(281, 0, 281, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(301, 0, 301, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(321, 0, 321, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(341, 0, 341, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(361, 0, 361, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(381, 0, 381, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(401, 0, 401, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(421, 0, 421, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(441, 0, 441, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(461, 0, 461, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(481, 0, 481, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(501, 0, 501, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(521, 0, 521, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(541, 0, 541, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(561, 0, 561, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(581, 0, 581, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(601, 0, 601, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(621, 0, 621, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(641, 0, 641, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(661, 0, 661, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(681, 0, 681, 1130, 0, 1);
            LODOP.ADD_PRINT_LINE(701, 0, 701, 1130, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 8, 37, 20, "库房");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 46, 701, 47, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 47, 44, 20, "类别");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 93, 701, 94, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 93, 120, 20, "领用部门/入库单位");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 213, 701, 214, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 217, 100, 20, "物料编码");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 323, 701, 324, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 325, 80, 20, "物料名称");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 406, 701, 407, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 410, 70, 20, "规格型号");
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 484, 701, 485, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 484, 42, 20, "单位");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 524, 701, 525, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 524, 75, 20, "数量");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 605, 701, 606, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 607, 80, 20, "单价");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 689, 701, 690, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 691, 80, 20, "金额");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 771, 701, 772, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 772, 140, 20, "用途工作面/巷道");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.ADD_PRINT_TEXT(1, 912, 65, 20, "设备名称");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.ADD_PRINT_LINE(1, 890, 701, 890, 0, 1);
            LODOP.ADD_PRINT_LINE(1, 1010, 701, 1010, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 1020, 65, 20, "安全费用");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 1080, 701, 1080, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 1080, 50, 20, "公司付");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_RECT(1, 0, 1130, 701, 0, 1);
            LODOP.ADD_PRINT_TEXT(900, 4, 152, 20, "山西华宁焦煤有限公司");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
          }
        }
        LODOP.ADD_PRINT_TEXT(900, 900, 120, 20, "第 # 页 / 共 & 页");
        LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);

        LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
        LODOP.PREVIEW(); //预览(预览打印无脚标)
        // LODOP.PRINT(); //打印
      }
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
        } else if (index === 7 || index === 9) {
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
            if (index === 7 || index === 9) {
              sums[7] = parseFloat(sums[7]).toFixed(2);
              sums[9] = parseFloat(sums[9]).toFixed(2);
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
    /** 查询日清月结列表 */
    getList() {
      this.loading = true;
      listCleandaymonth(this.queryParams).then((response) => {
        this.cleandaymonthList = response.rows;
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
        warehousecode: null,
        vouchertype: null,
        unitname: null,
        itemcode: null,
        itemname: null,
        model: null,
        unit: null,
        quant: null,
        price: null,
        money: null,
        resourceusage: null,
        financetreatflag: null,
        safetyfeeflag: null,
      };
      this.resetForm("form");
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
      this.ids = selection.map((item) => item.warehousecode);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加日清月结";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const warehousecode = row.warehousecode || this.ids;
      getCleandaymonth(warehousecode).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改日清月结";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.warehousecode != null) {
            updateCleandaymonth(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCleandaymonth(this.form).then((response) => {
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
      const warehousecodes = row.warehousecode || this.ids;
      this.$modal
        .confirm('是否确认删除日清月结编号为"' + warehousecodes + '"的数据项？')
        .then(function () {
          return delCleandaymonth(warehousecodes);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      if (this.cleandaymonthList.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有日清月结表?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Loading = true;
          return exportCleandaymonth(queryParams);
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