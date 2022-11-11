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
          placeholder="选择月"
          value-format="yyyy-MM-dd"
          @keyup.enter.native="handleQuery"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <!-- <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button> -->
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
          v-hasPermi="['project:company:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain size="mini" @click="btnClickPrint4"
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
        :data="companyList"
        @selection-change="handleSelectionChange"
        element-loading-text="正在处理数据，请稍后"
        empty-text="暂无数据"
        style="width: 100%"
        :cell-style="{ padding: '3px' }"
        class="el-table"
        border
      >
        <el-table-column label="库房" align="center" prop="warehousecode">
          <template slot-scope="scope">
            <span>{{ scope.row.warehousecode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="领用部门编号" align="center" prop="unitcode" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.unitcode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="领用部门名称"
          align="center"
          prop="unitname"
          min-width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.unitname }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="物料编码"
          align="center"
          prop="itemcode"
          min-width="160"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.itemcode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="规格型号"
          align="center"
          prop="model"
          min-width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.model }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="库存单位"
          align="center"
          prop="unit"
          min-width="80"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          align="center"
          prop="quant"
          min-width="120"
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
          min-width="120"
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
          min-width="120"
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
          label="公司付"
          align="center"
          prop="safetyfeeflag"
          min-width="60"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.safetyfeeflag"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          align="center"
          prop="summary"
          min-width="100"
        >
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
  listCompany,
  getCompany,
  delCompany,
  addCompany,
  updateCompany,
  exportCompany,
} from "@/api/project/company";
import Cookies from "js-cookie";
import { getLodop } from "@/api/project/LodopFuncs"; //导入模块
import { dateToString } from "../../../api/project/voucher";
export default {
  name: "Company",
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
      // 公司付材料出库表格数据
      companyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        checkOutMonth: null,
        planedit: userInfo.userName,
        voucherdate: new Date(),
        warehousecode: userInfo.dept.deptId,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        warehousecode: [
          { required: true, message: "库房不能为空", trigger: "blur" },
        ],
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
    // 公司付材料出库明细表
    btnClickPrint4() {
      const userInfo = JSON.parse(Cookies.get("userInfo"));
      if (this.companyList.length === 0) {
        this.$message.error("暂无数据，请先查询在打印");
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
        LODOP.ADD_PRINT_TEXT(30, 636, 181, 35, "采购出库明细表");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

        LODOP.ADD_PRINT_RECT(112, 0, 1085, 586, 0, 1);
        LODOP.ADD_PRINT_TEXT(727, 4, 152, 20, "山西华宁焦煤有限公司");
        LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(80, 588, 63, 20, "制单人：");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(94, 643, 93, 703, 0, 1);
        LODOP.ADD_PRINT_TEXT(80, 650, 80, 20, this.queryParams.planedit);
        LODOP.ADD_PRINT_TEXT(80, 746, 79, 20, "制单日期：");
        LODOP.ADD_PRINT_LINE(94, 810, 93, 890, 0, 1);
        LODOP.ADD_PRINT_TEXT(
          80,
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
        LODOP.ADD_PRINT_TEXT(120, 4, 100, 20, "库房");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(120, 120, 100, 20, "领用部门编号");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(120, 234, 100, 20, "领用部门名称");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(120, 336, 100, 20, "物料编码");
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
        for (
          let i = 0, j = 141, k = 1;
          i < this.companyList.length;
          i++, j += 20, k++
        ) {
          LODOP.ADD_PRINT_TEXT(j, 35, 45, 20, userInfo.dept.deptName);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(j, 155, 45, 10, this.companyList[i].unitcode);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(j, 230, 110, 10, this.companyList[i].unitname);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(j, 340, 130, 10, this.companyList[i].itemcode);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
          LODOP.ADD_PRINT_TEXT(j, 430, 110, 10, this.companyList[i].model);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(j, 540, 80, 20, this.companyList[i].unit);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(j, 610, 80, 10, this.companyList[i].quant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(j, 705, 80, 10, this.companyList[i].price);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(j, 790, 80, 10, this.companyList[i].money);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
          LODOP.ADD_PRINT_TEXT(
            j,
            870,
            80,
            10,
            this.companyList[i].safetyfeeflag
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);

          if (k == 28) {
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
            LODOP.ADD_PRINT_TEXT(1, 4, 100, 20, "库房");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(1, 120, 100, 20, "领用部门ID");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(1, 230, 110, 10, "领用部门名称");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(1, 340, 110, 10, "物料名称");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(1, 440, 80, 10, "规格型号");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(1, 550, 48, 20, "单位");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
            LODOP.ADD_PRINT_TEXT(1, 624, 63, 10, "数量");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
            LODOP.ADD_PRINT_TEXT(1, 706, 64, 10, "单价");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
            LODOP.ADD_PRINT_TEXT(1, 800, 64, 10, "金额");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
            LODOP.ADD_PRINT_TEXT(1, 880, 63, 20, "公司付");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
            LODOP.ADD_PRINT_TEXT(1, 1010, 64, 20, "摘要");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
            LODOP.ADD_PRINT_LINE(1, 118, 698, 119, 0, 1);
            LODOP.ADD_PRINT_LINE(1, 118, 698, 119, 0, 1);
            LODOP.ADD_PRINT_LINE(1, 228, 698, 229, 0, 1);
            LODOP.ADD_PRINT_LINE(698, 335, 1, 336, 0, 1);
            LODOP.ADD_PRINT_LINE(1, 430, 698, 430, 0, 1);
            LODOP.ADD_PRINT_LINE(698, 530, 1, 530, 0, 1);
            LODOP.ADD_PRINT_LINE(698, 600, 1, 600, 0, 1);
            LODOP.ADD_PRINT_LINE(1, 695, 698, 696, 0, 1);
            LODOP.ADD_PRINT_LINE(698, 784, 1, 785, 0, 1);
            LODOP.ADD_PRINT_LINE(698, 871, 1, 872, 0, 1);
            LODOP.ADD_PRINT_LINE(698, 950, 1, 951, 0, 1);
            LODOP.ADD_PRINT_RECT(1, 0, 1085, 699, 0, 1);
            LODOP.ADD_PRINT_TEXT(727, 4, 152, 20, "山西华宁焦煤有限公司");
            LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }
        }

        LODOP.ADD_PRINT_TEXT(727, 942, 126, 20, "第 # 页 / 共 & 页");
        LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
        // LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
        LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
        LODOP.PREVIEW(); //预览(预览打印无脚标)
        // LODOP.PRINT(); //打印}
      }
    },
    /** 查询公司付材料出库列表 */
    getList() {
      this.loading = true;
      listCompany(this.queryParams).then((response) => {
        this.companyList = response.rows;
        console.log(this.companyList);
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
        unitcode: null,
        unitname: null,
        itemcode: null,
        model: null,
        unit: null,
        quant: null,
        price: null,
        money: null,
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
      this.title = "添加公司付材料出库";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const warehousecode = row.warehousecode || this.ids;
      getCompany(warehousecode).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改公司付材料出库";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.warehousecode != null) {
            updateCompany(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCompany(this.form).then((response) => {
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
        .confirm(
          '是否确认删除公司付材料出库编号为"' + warehousecodes + '"的数据项？'
        )
        .then(function () {
          return delCompany(warehousecodes);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      if (this.companyList.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有公司付材料出库明细表检查?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Loading = true;
          return exportCompany(queryParams);
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
.el-table__header-wrapper .el-checkbox {
  display: none;
}
.el-table /deep/ .cell {
  padding: 0px;
  padding-left: 0px;
  padding-right: 0px;
  /*background-color: white;*/
}
</style>
