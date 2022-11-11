<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-form
          :model="queryParams"
          ref="queryForm"
          :inline="true"
          v-show="showSearch"
          label-width="90px"
          :rules="rules"
           hide-required-asterisk
        >
          <el-form-item label="检查年月" prop="thisCheckoutMonth">
            <el-input
              v-model="queryParams.thisCheckoutMonth"
              placeholder="格式如202008"
              clearable
              size="small"
              maxLength="6"
              oninput="value=value.replace(/[^\d]/g,'')"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <!--    
        <el-form-item prop="deptname" label="部门编号"  @node-click="handleNodeClick">
          <el-input v-model="queryParams.deptname" readonly id="input10"></el-input>
        </el-form-item> -->

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
              size="mini"
              :loading="exportLoading"
              icon="el-icon-download"
              @click="handleExport"
              v-hasPermi="['project:inventory:export']"
              >导出</el-button
            >
          </el-col>
          <el-button type="success" plain size="mini" @click="btnClickPrint"
            >打印</el-button
          >

          <right-toolbar
            :showSearch.sync="showSearch"
            @queryTable="getList"
          ></right-toolbar>
        </el-row>
        <el-table
          highlight-current-row
          stripe
          v-loading="loading"
          :data="inventoryList"
          @selection-change="handleSelectionChange"
          :summary-method="getSummaries"
          show-summary
          element-loading-text="正在处理数据，请稍后"
          empty-text="暂无数据"
          element-loading-spinner="el-icon-loading"
        >
          <el-table-column
            label="库房"
            align="center"
            prop="warehousecode"
            min-width="70"
          >
            <template slot-scope="scope">
              <span
                v-for="dict in dict.type.deptname"
                :key="dict.value"
                v-if="scope.row.warehousecode == dict.value"
                >{{ dict.label }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            label="物料编码"
            align="center"
            prop="itemcode"
            min-width="160"
          />
          <el-table-column
            label="上月数量"
            align="center"
            prop="lastquant"
            min-width="100"
          />
          <el-table-column
            label="上月金额"
            align="center"
            prop="lastmoney"
            min-width="140"
          />
          <el-table-column
            label="本月数量"
            align="center"
            prop="thisquant"
            min-width="100"
          />
          <el-table-column
            label="本月金额"
            align="center"
            prop="thismoney"
            min-width="140"
          />
          <el-table-column
            label="本月入数量"
            align="center"
            prop="thisinquant"
            min-width="100"
          />
          <el-table-column
            label="本月入金额"
            align="center"
            prop="thisinmoney"
            min-width="120"
          />
          <el-table-column
            label="本月出数量"
            align="center"
            prop="thisoutquant"
            min-width="120"
          />
          <el-table-column
            label="本月出金额"
            align="center"
            prop="thisoutmoney"
            min-width="120"
          />
          <el-table-column
            label="误差数量"
            align="center"
            prop="errquant"
            min-width="80"
          />
          <el-table-column
            label="误差金额"
            align="center"
            prop="errmoney"
            min-width="80"
          />
          <el-table-column
            label="库存数量"
            align="center"
            prop="currentquant"
            min-width="100"
          />
          <el-table-column
            label="库存单价"
            align="center"
            prop="currentprice"
            min-width="100"
          />
          <el-table-column
            label="库存金额"
            align="center"
            prop="currentmoney"
            min-width="100"
          />
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cookies from "js-cookie";

import { getLodop } from "@/api/project/LodopFuncs"; //导入模块
import {
  listInventory,
  getInventory,
  delInventory,
  addInventory,
  updateInventory,
  exportInventory,
} from "@/api/project/inventory";
import { dateToString } from "../../../api/project/voucher";
export default {
  name: "Inventory",
  dicts: ["deptname"],

  data() {
    //从cookie内获取用户
    const userInfo = JSON.parse(Cookies.get("userInfo"));
    //获取用户所在的部门编号和名称
    const deptName = userInfo.dept.deptName;

    return {
      // 遮罩层
      loading: false,
      // 导出遮罩层
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
      // 余额检查表格数据
      inventoryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        lastquant: null,
        lastmoney: null,
        thisquant: null,
        thismoney: null,
        thisinquant: null,
        thisinmoney: null,
        thisoutquant: null,
        thisoutmoney: null,
        errquant: null,
        errmoney: null,
        currentquant: null,
        currentprice: null,
        currentmoney: null,
        thisCheckoutMonth: "",
        warehousecode: userInfo.dept.deptName,
        deptname: deptName,
        planedit: userInfo.userName,
        voucherdate: new Date(),
      },
      // 表单参数
      form: {},
      // 表单校验

      rules: {
     
      },
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    // 余额检查表
    btnClickPrint() {
      const userInfo = JSON.parse(Cookies.get("userInfo"));
      if (this.inventoryList.length == 0) {
        this.$message.error("没有数据可以打印");
        return;
      }
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INITA(0, 0, 2000, 1000, "");
      LODOP.SET_PRINT_PAGESIZE(0, 3000, 3000, "");
      LODOP.ADD_PRINT_TEXT(30, 233, 301, 35, "山西华宁焦煤有限责任公司");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_LINE(59, 532, 58, 632, 0, 1);
      LODOP.ADD_PRINT_TEXT(
        25,
        532,
        532,
        20,
        this.queryParams.thisCheckoutMonth
      );
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
      LODOP.ADD_PRINT_TEXT(101, 676, 64, 20, "制单人：");
      LODOP.ADD_PRINT_LINE(116, 727, 115, 797, 0, 1);
      LODOP.ADD_PRINT_TEXT(100, 727, 100, 20, this.queryParams.planedit);
      LODOP.ADD_PRINT_TEXT(100, 827, 74, 20, "制证日期：");
      LODOP.ADD_PRINT_LINE(116, 889, 115, 989, 0, 1);
      LODOP.ADD_PRINT_TEXT(
        100,
        889,
        100,
        20,
        dateToString(this.queryParams.voucherdate)
      );
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(30, 636, 181, 35, "余额检查明细表");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

      LODOP.ADD_PRINT_RECT(139, 18, 1077, 858, 0, 1);
      LODOP.ADD_PRINT_TEXT(1100, 4, 152, 20, "山西华宁焦煤有限公司");
      LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
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
      LODOP.ADD_PRINT_LINE(997, 53, 139, 54, 0, 1);
      LODOP.ADD_PRINT_LINE(997, 175, 139, 176, 0, 1);
      LODOP.ADD_PRINT_LINE(997, 253, 139, 254, 0, 1);
      LODOP.ADD_PRINT_LINE(997, 331, 139, 332, 0, 1);
      LODOP.ADD_PRINT_LINE(997, 410, 139, 411, 0, 1);
      LODOP.ADD_PRINT_LINE(997, 491, 139, 492, 0, 1);
      LODOP.ADD_PRINT_LINE(997, 564, 139, 565, 0, 1);
      LODOP.ADD_PRINT_LINE(997, 637, 139, 638, 0, 1);
      LODOP.ADD_PRINT_LINE(997, 709, 139, 710, 0, 1);
      LODOP.ADD_PRINT_LINE(997, 784, 139, 785, 0, 1);
      LODOP.ADD_PRINT_LINE(997, 848, 139, 849, 0, 1);
      LODOP.ADD_PRINT_TEXT(145, 1032, 59, 20, "库存金额");
      LODOP.ADD_PRINT_LINE(997, 911, 139, 912, 0, 1);
      LODOP.ADD_PRINT_LINE(997, 970, 139, 971, 0, 1);
      LODOP.ADD_PRINT_LINE(997, 1029, 139, 1030, 0, 1);
      LODOP.ADD_PRINT_LINE(172, 18, 171, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(205, 18, 205, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(238, 18, 238, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(271, 18, 271, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(304, 18, 304, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(337, 18, 337, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(370, 18, 370, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(403, 18, 403, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(436, 18, 436, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(469, 18, 469, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(502, 18, 502, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(535, 18, 535, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(568, 18, 568, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(601, 18, 601, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(634, 18, 634, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(667, 18, 667, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(700, 18, 700, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(733, 18, 733, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(766, 18, 766, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(799, 18, 799, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(832, 18, 832, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(865, 18, 865, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(898, 18, 898, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(931, 18, 931, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(964, 18, 964, 1095, 0, 1);
      LODOP.ADD_PRINT_LINE(997, 18, 997, 1095, 0, 1);
      LODOP.ADD_PRINT_TEXT(680, 255, 65, 20);
      LODOP.ADD_PRINT_TEXT(680, 333, 76, 20);
      LODOP.ADD_PRINT_TEXT(680, 411, 79, 20);
      LODOP.ADD_PRINT_TEXT(680, 493, 77, 20);
      LODOP.ADD_PRINT_TEXT(680, 563, 77, 20);
      LODOP.ADD_PRINT_TEXT(680, 639, 69, 20);
      LODOP.ADD_PRINT_TEXT(680, 710, 73, 20);
      LODOP.ADD_PRINT_TEXT(680, 786, 58, 20);
      LODOP.ADD_PRINT_TEXT(680, 850, 60, 20);
      LODOP.ADD_PRINT_TEXT(680, 911, 60, 20);
      LODOP.ADD_PRINT_TEXT(680, 970, 60, 20);
      LODOP.ADD_PRINT_TEXT(680, 1029, 59, 20);
      LODOP.ADD_PRINT_TEXT(680, 1088, 60, 20);
      for (
        let i = 0, j = 192, k = 1;
        i < this.inventoryList.length;
        i++, j += 33, k++
      ) {
        LODOP.ADD_PRINT_TEXT(j, 17, 45, 20, userInfo.dept.deptName);
        LODOP.ADD_PRINT_TEXT(j, 62, 120, 10, this.inventoryList[i].itemcode);
        LODOP.ADD_PRINT_TEXT(j, 179, 64, 10, this.inventoryList[i].lastquant);
        LODOP.ADD_PRINT_TEXT(j, 255, 65, 10, this.inventoryList[i].lastmoney);
        LODOP.ADD_PRINT_TEXT(j, 333, 76, 10, this.inventoryList[i].thisquant);
        LODOP.ADD_PRINT_TEXT(j, 411, 79, 10, this.inventoryList[i].thismoney);
        LODOP.ADD_PRINT_TEXT(j, 493, 77, 10, this.inventoryList[i].thisinquant);
        LODOP.ADD_PRINT_TEXT(j, 563, 77, 10, this.inventoryList[i].thisinmoney);
        LODOP.ADD_PRINT_TEXT(
          j,
          639,
          69,
          20,
          this.inventoryList[i].thisoutquant
        );
        LODOP.ADD_PRINT_TEXT(
          j,
          710,
          73,
          20,
          this.inventoryList[i].thisoutmoney
        );
        LODOP.ADD_PRINT_TEXT(j, 786, 58, 10, this.inventoryList[i].errquant);
        LODOP.ADD_PRINT_TEXT(j, 850, 60, 10, this.inventoryList[i].errmoney);
        LODOP.ADD_PRINT_TEXT(
          j,
          911,
          80,
          10,
          this.inventoryList[i].currentquant
        );
        LODOP.ADD_PRINT_TEXT(
          j,
          970,
          80,
          10,
          this.inventoryList[i].currentprice
        );
        LODOP.ADD_PRINT_TEXT(
          j,
          1029,
          80,
          10,
          this.inventoryList[i].currentmoney
        );
        if (k == 25) {
          LODOP.NewPageA();
          k = 0;
          j = 1;
          LODOP.ADD_PRINT_LINE(1, 18, 1, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(34, 18, 34, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(67, 18, 67, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(100, 18, 100, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(133, 18, 133, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(166, 18, 166, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(199, 18, 199, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(232, 18, 232, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(265, 18, 265, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(298, 18, 298, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(331, 18, 331, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(364, 18, 364, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(397, 18, 397, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(430, 18, 430, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(463, 18, 463, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(496, 18, 496, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(529, 18, 529, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(562, 18, 562, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(595, 18, 595, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(628, 18, 628, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(661, 18, 661, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(694, 18, 694, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(727, 18, 727, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(760, 18, 760, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(793, 18, 793, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(826, 18, 826, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(859, 18, 859, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(892, 18, 892, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(925, 18, 925, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(958, 18, 958, 1095, 0, 1);
          LODOP.ADD_PRINT_LINE(991, 18, 991, 1095, 0, 1);
          LODOP.ADD_PRINT_RECT(1, 18, 1077, 991, 0, 1);
          LODOP.ADD_PRINT_TEXT(1, 17, 37, 20, "库房");
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(1, 62, 100, 20, "物料编码");
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(1, 179, 64, 20, "上月数量");
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(1, 255, 65, 20, "上月金额");
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(1, 333, 76, 20, "本月数量");
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(1, 411, 79, 20, "本月金额");
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(1, 493, 77, 20, "本月入数量");
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(1, 563, 77, 20, "本月入金额");
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(1, 639, 69, 20, "本月出数量");
          LODOP.ADD_PRINT_TEXT(1, 710, 73, 20, "本月出金额");
          LODOP.ADD_PRINT_TEXT(1, 786, 58, 20, "误差数量");
          LODOP.ADD_PRINT_TEXT(1, 850, 60, 20, "误差金额");
          LODOP.ADD_PRINT_TEXT(1, 911, 60, 20, "库存数量");
          LODOP.ADD_PRINT_TEXT(1, 970, 60, 20, "库存单价");
          LODOP.ADD_PRINT_LINE(991, 53, 1, 54, 0, 1);
          LODOP.ADD_PRINT_LINE(991, 175, 1, 176, 0, 1);
          LODOP.ADD_PRINT_LINE(991, 253, 1, 254, 0, 1);
          LODOP.ADD_PRINT_LINE(991, 331, 1, 332, 0, 1);
          LODOP.ADD_PRINT_LINE(991, 410, 1, 411, 0, 1);
          LODOP.ADD_PRINT_LINE(991, 491, 1, 492, 0, 1);
          LODOP.ADD_PRINT_LINE(991, 564, 1, 565, 0, 1);
          LODOP.ADD_PRINT_LINE(991, 637, 1, 638, 0, 1);
          LODOP.ADD_PRINT_LINE(991, 709, 1, 710, 0, 1);
          LODOP.ADD_PRINT_LINE(991, 784, 1, 785, 0, 1);
          LODOP.ADD_PRINT_LINE(991, 848, 1, 849, 0, 1);
          LODOP.ADD_PRINT_TEXT(1, 1032, 59, 20, "库存金额");
          LODOP.ADD_PRINT_LINE(991, 911, 1, 912, 0, 1);
          LODOP.ADD_PRINT_LINE(991, 970, 1, 971, 0, 1);
          LODOP.ADD_PRINT_LINE(991, 1029, 1, 1030, 0, 1);
          LODOP.ADD_PRINT_TEXT(1100, 4, 152, 20, "山西华宁焦煤有限公司");
          LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }
      }

      LODOP.ADD_PRINT_TEXT(1100, 942, 131, 20, "第 # 页 / 共 & 页");
      LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
      // LODOP.ADD_PRINT_TEXT(225,17,45,20,this.inventoryList[1].warehousecode);
      // LODOP.ADD_PRINT_TEXT(225, 62, 100, 20, this.inventoryList[1].itemcode);
      // LODOP.ADD_PRINT_TEXT(225, 179, 64, 20, this.inventoryList[1].lastquant);
      // LODOP.ADD_PRINT_TEXT(225, 255, 65, 20, this.inventoryList[1].lastmoney);
      // LODOP.ADD_PRINT_TEXT(225, 333, 76, 20, this.inventoryList[1].thisquant);
      // LODOP.ADD_PRINT_TEXT(225, 411, 79, 20, this.inventoryList[1].thismoney);
      // LODOP.ADD_PRINT_TEXT(225, 493, 77, 20, this.inventoryList[1].thisinquant);
      // LODOP.ADD_PRINT_TEXT(225, 563, 77, 20, this.inventoryList[1].thisinmoney);
      // LODOP.ADD_PRINT_TEXT(225,639,69,20,this.inventoryList[1].thisoutquant
      // );
      // LODOP.ADD_PRINT_TEXT(
      //   225,
      //   710,
      //   73,
      //   20,
      //   this.inventoryList[1].thisoutmoney
      // );
      // LODOP.ADD_PRINT_TEXT(225, 786, 58, 20, this.inventoryList[1].errquant);
      // LODOP.ADD_PRINT_TEXT(225, 850, 60, 20, this.inventoryList[1].errmoney);
      // LODOP.ADD_PRINT_TEXT(
      //   225,
      //   911,
      //   60,
      //   20,
      //   this.inventoryList[1].currentquant
      // );
      // LODOP.ADD_PRINT_TEXT(
      //   225,
      //   970,
      //   60,
      //   20,
      //   this.inventoryList[1].currentprice
      // );
      // LODOP.ADD_PRINT_TEXT(
      //   225,
      //   1029,
      //   59,
      //   20,
      //   this.inventoryList[1].currentmoney
      // );

      // LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.getList();
    },

    //合计
    //计算tableData的5，7，8列的和
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        }
        // 指定一个或者多个你需要计算的列
        else if (index >= 2) {
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
            if (index >= 2) {
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
          } else {
            sums[index] = "";
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    /** 查询余额检查列表 */
    getList() {
      this.loading = true;
      listInventory(this.queryParams).then((response) => {
        this.inventoryList = response.rows;
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
        warehousecode: userInfo.dept.deptName,
        itemcode: null,
        lastquant: null,
        lastmoney: null,
        thisquant: null,
        thismoney: null,
        thisinquant: null,
        thisinmoney: null,
        thisoutquant: null,
        thisoutmoney: null,
        errquant: null,
        errmoney: null,
        currentquant: null,
        currentprice: null,
        currentmoney: null,

        deptname: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (
        this.queryParams.thisCheckoutMonth == "" ||
        this.queryParams.thisCheckoutMonth == null
      ) {
        this.$message.error("检查年月不能为空，请输入年月");
      } else {
        this.queryParams.pageNum = 1;
      }
      // 判断检查年月是否为6位数字
      if (this.queryParams.thisCheckoutMonth.length == 6) {
        this.queryParams.pageNum = 1;
      } else {
        this.$message.error("检查年月格式错误，请重新输入");
      }

      // 判断第五位只能是0或1，第五位是0的时候第六位只能是0-9。第五位是1的时候，第六位只能是1-2
      if (this.queryParams.thisCheckoutMonth.length == 6) {
        // console.log(this.queryParams.thisCheckoutMonth.substring)
        if (this.queryParams.thisCheckoutMonth.substring(4, 5) == 0) {
          if (
            this.queryParams.thisCheckoutMonth.substring(5, 6) > 9 ||
            this.queryParams.thisCheckoutMonth.substring(5, 6) < 1
          ) {
            this.$message.error("请输入正确的年月");
            return false;
          }
        } else if (this.queryParams.thisCheckoutMonth.substring(4, 5) == 1) {
          if (this.queryParams.thisCheckoutMonth.substring(5, 6) > 2) {
            this.$message.error("请输入正确年月");
            return false;
          }
        } else {
          this.$message.error("请输入正确的年月");
          return false;
        }
      }
      // 当输入的年月格式合法并且正确时，才调用查询接口
      if (this.queryParams.thisCheckoutMonth.length == 6) {
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
      this.title = "添加余额检查";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const warehousecode = row.warehousecode || this.ids;
      getInventory(warehousecode).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改余额检查";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.warehousecode != null) {
            updateInventory(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInventory(this.form).then((response) => {
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
        .confirm('是否确认删除余额检查编号为"' + warehousecodes + '"的数据项？')
        .then(function () {
          return delInventory(warehousecodes);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },

    /** 导出按钮操作 */
    handleExport() {
      if (this.inventoryList.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有余额检查?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Loading = true;
          return exportInventory(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.Loading = false;
        });
    },
  },
};
</script>
