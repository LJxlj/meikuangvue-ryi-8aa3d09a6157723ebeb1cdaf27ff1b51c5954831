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
      <!-- <el-form-item label="库房" prop="warehousecode">
        <el-select v-model="queryParams.warehousecode" placeholder="请选择库房" clearable>
          <el-option
            v-for="dict in dict.type.deptname"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->

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

      <el-form-item label="供应商" prop="supplier">
        <el-input
          v-model="queryParams.supplier"
          placeholder="请输入供应商"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料编码" prop="itemcode">
        <el-input
          v-model="queryParams.itemcode"
          placeholder="请输入物料编码"
          clearable
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
          v-hasPermi="['project:inmaterial:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain size="mini" @click="btnClickPrint2"
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
        :data="inmaterialList"
        @selection-change="handleSelectionChange"
        show-summary
        :summary-method="getSummaries"
        element-loading-text="正在处理数据，请稍后"
        empty-text="暂无数据"
        :cell-style="{ padding: '3px' }"
        class="el-table"
        border
        size="mini"
      >
        <el-table-column
          label="库房"
          align="center"
          prop="warehousecode"
          min-width="60"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.warehousecode"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="供应商"
          align="center"
          prop="supplier"
          min-width="180"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.supplier"></el-input>
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
          min-width="150"
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
          label="金额"
          align="center"
          prop="money"
          min-width="150"
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
  listInmaterial,
  getInmaterial,
  delInmaterial,
  addInmaterial,
  updateInmaterial,
} from "@/api/project/inmaterial";
import Cookies from "js-cookie";
import { exportInmaterial } from "../../../api/project/inmaterial";
import { getLodop } from "@/api/project/LodopFuncs"; //导入模块
import { dateToString } from "../../../api/project/voucher";
export default {
  name: "Inmaterial",
  dicts: ["deptname"],
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
      // 材料入库表格数据
      inmaterialList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        supplier: null,
        itemcode: null,
        planedit: userInfo.userName,
        voucherdate: new Date(),
        warehousecode: userInfo.dept.deptId,
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
    // 合计部分
    getSummaries(param) {
      const { columns, data } = param; //这里可以看出，自定义函数会传入每一列，以及数据
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合  计";
          return;
          // 求索引是5和索引大于等于7的合计
        } else if (index === 6 || index === 8) {
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
            if (index === 6 || index === 8) {
              sums[6] = parseFloat(sums[6]).toFixed(2);
              sums[8] = parseFloat(sums[8]).toFixed(2);
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
    //  入库明细表
    btnClickPrint2() {
      const userInfo = JSON.parse(Cookies.get("userInfo"));
      if (this.inmaterialList.length == 0) {
        this.$message.error("暂无数据，请先查询数据在打印");
      } else {
        let a = this.queryParams.checkOutMonth.substring(0, 7);
        let LODOP = getLodop(); //调用getLodop获取LODOP对象
        LODOP.PRINT_INITA(0, 0, 2000, 1000, "");
        LODOP.SET_PRINT_PAGESIZE(0, 2500, 3000, "");
        LODOP.ADD_PRINT_TEXT(23, 74, 303, 40, "山西华宁焦煤有限责任公司");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_LINE(54, 371, 53, 471, 0, 1);
        LODOP.ADD_PRINT_TEXT(28, 372, 179, 40, a);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_TEXT(23, 473, 179, 40, "材料入库明细表");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_TEXT(1100, 4, 152, 20, "山西华宁焦煤有限公司");
        LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(65, 399, 59, 20, "制单人：");
        LODOP.ADD_PRINT_LINE(80, 445, 79, 515, 0, 1);
        LODOP.ADD_PRINT_TEXT(65, 460, 100, 20, this.queryParams.planedit);
        LODOP.ADD_PRINT_TEXT(65, 540, 69, 20, "制单日期：");
        LODOP.ADD_PRINT_LINE(80, 605, 79, 685, 0, 1);
        LODOP.ADD_PRINT_TEXT(
          65,
          610,
          100,
          20,
          dateToString(this.queryParams.voucherdate)
        );
        LODOP.ADD_PRINT_LINE(141, 3, 140, 743, 0, 1);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
        LODOP.ADD_PRINT_LINE(169, 3, 169, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(197, 3, 197, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(225, 3, 225, 744, 0, 1);
        LODOP.ADD_PRINT_LINE(253, 3, 253, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(281, 3, 281, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(309, 3, 309, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(337, 3, 337, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(365, 3, 365, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(393, 3, 393, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(421, 3, 421, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(449, 3, 449, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(477, 3, 477, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(505, 3, 505, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(533, 3, 533, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(561, 3, 561, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(589, 3, 589, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(617, 3, 617, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(645, 3, 645, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(673, 3, 673, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(701, 3, 701, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(729, 3, 729, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(757, 3, 757, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(785, 3, 785, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(813, 3, 813, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(841, 3, 841, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(869, 3, 869, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(897, 3, 897, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(925, 3, 925, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(953, 3, 953, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(981, 3, 981, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(1009, 3, 1009, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(96, 3, 95, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(96, 742, 118, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(119, 3, 118, 743, 0, 1);
        LODOP.ADD_PRINT_LINE(96, 3, 800, 4, 0, 1);
        LODOP.ADD_PRINT_TEXT(97, 4, 35, 20, "库房");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(96, 39, 1009, 40, 0, 1);
        LODOP.ADD_PRINT_TEXT(97, 50, 48, 20, "供应商");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(96, 126, 1009, 127, 0, 1);
        LODOP.ADD_PRINT_TEXT(97, 139, 100, 20, "物料编码");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(96, 260, 1009, 261, 0, 1);
        LODOP.ADD_PRINT_TEXT(97, 269, 100, 20, "物料名称");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(96, 380, 1009, 381, 0, 1);
        LODOP.ADD_PRINT_TEXT(97, 387, 100, 20, "规格型号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(96, 493, 1009, 494, 0, 1);
        LODOP.ADD_PRINT_TEXT(97, 494, 35, 20, "单位");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(96, 529, 1009, 530, 0, 1);
        LODOP.ADD_PRINT_TEXT(97, 537, 58, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(96, 609, 1009, 610, 0, 1);
        LODOP.ADD_PRINT_TEXT(97, 621, 39, 20, "单价");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(96, 671, 1009, 672, 0, 1);
        LODOP.ADD_PRINT_TEXT(97, 673, 66, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(571, 5, 235, 20, "山西华宁焦煤有限责任公司");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
        // LODOP.ADD_PRINT_TEXT(571, 610, 141, 20, "第 1 页 / 共 1 页");
        // LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        // LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        // LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);

        LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
        LODOP.ADD_PRINT_RECT(117, 3, 740, 892, 0, 1);
        for (
          let i = 0, j = 129, k = 1;
          i < this.inmaterialList.length;
          i++, j += 28, k++
        ) {
          LODOP.ADD_PRINT_TEXT(j, 4, 100, 10, userInfo.dept.deptName);
          LODOP.ADD_PRINT_TEXT(j, 40, 100, 10, this.inmaterialList[i].supplier);
          LODOP.ADD_PRINT_TEXT(
            j,
            130,
            130,
            10,
            this.inmaterialList[i].itemcode
          );
          LODOP.ADD_PRINT_TEXT(
            j,
            270,
            100,
            10,
            this.inmaterialList[i].itemname
          );
          LODOP.ADD_PRINT_TEXT(j, 385, 100, 10, this.inmaterialList[i].model);
          LODOP.ADD_PRINT_TEXT(j, 500, 100, 10, this.inmaterialList[i].unit);
          LODOP.ADD_PRINT_TEXT(j, 535, 100, 10, this.inmaterialList[i].quant);
          LODOP.ADD_PRINT_TEXT(j, 615, 90, 10, this.inmaterialList[i].price);
          LODOP.ADD_PRINT_TEXT(j, 675, 100, 10, this.inmaterialList[i].money);

          if (k == 32) {
            LODOP.NewPageA();
            k = 0;
            j = 1;
            LODOP.ADD_PRINT_LINE(1, 3, 1, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(29, 3, 29, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(57, 3, 57, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(85, 3, 85, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(113, 3, 113, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(141, 3, 141, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(169, 3, 169, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(197, 3, 197, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(225, 3, 225, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(253, 3, 253, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(281, 3, 281, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(309, 3, 309, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(337, 3, 337, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(365, 3, 365, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(393, 3, 393, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(421, 3, 421, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(449, 3, 449, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(477, 3, 477, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(505, 3, 505, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(533, 3, 533, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(561, 3, 561, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(589, 3, 589, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(617, 3, 617, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(645, 3, 645, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(673, 3, 673, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(701, 3, 701, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(729, 3, 729, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(757, 3, 757, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(785, 3, 785, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(813, 3, 813, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(841, 3, 841, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(869, 3, 869, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(897, 3, 897, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(925, 3, 925, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(953, 3, 953, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(981, 3, 981, 743, 0, 1);
            LODOP.ADD_PRINT_LINE(1009, 3, 1009, 743, 0, 1);
            LODOP.ADD_PRINT_RECT(1, 3, 740, 1009, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 4, 35, 20, "库房");
            LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 39, 1009, 40, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 50, 48, 20, "供应商");
            LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 126, 1009, 127, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 139, 100, 20, "物料编码");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 260, 1009, 261, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 269, 100, 20, "物料名称");
            LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 380, 1009, 381, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 387, 100, 20, "规格型号");
            LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 493, 1009, 494, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 494, 35, 20, "单位");
            LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 529, 1009, 530, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 537, 58, 20, "数量");
            LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 609, 1009, 610, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 621, 39, 20, "单价");
            LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_LINE(1, 671, 1009, 672, 0, 1);
            LODOP.ADD_PRINT_TEXT(1, 673, 66, 20, "金额");
            LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(1100, 4, 152, 20, "山西华宁焦煤有限公司");
            LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }
        }
        LODOP.ADD_PRINT_TEXT(1100, 610, 141, 20, "第 # 页 / 共 & 页");
        LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
        LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
        LODOP.PREVIEW(); //预览(预览打印无脚标)
        // LODOP.PRINT(); //打印
      }
    },
    /** 查询材料入库列表 */
    getList() {
      this.loading = true;
      listInmaterial(this.queryParams).then((response) => {
        this.inmaterialList = response.rows;
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
        supplier: null,
        itemcode: null,
        itemname: null,
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
      this.title = "添加材料入库";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const warehousecode = row.warehousecode || this.ids;
      getInmaterial(warehousecode).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改材料入库";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.warehousecode != null) {
            updateInmaterial(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInmaterial(this.form).then((response) => {
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
        .confirm('是否确认删除材料入库编号为"' + warehousecodes + '"的数据项？')
        .then(function () {
          return delInmaterial(warehousecodes);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      if (this.inmaterialList.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有材料入库明细表检查?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Loading = true;
          return exportInmaterial(queryParams);
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