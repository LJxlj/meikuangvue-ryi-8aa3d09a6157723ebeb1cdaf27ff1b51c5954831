<template>
  <div class="app-container">
    <!-- <h2 align="center" v-if="this.vouchertype1 === '2'">
      {{ deptName }}历史凭证查询
    </h2>
    <h2 align="center" v-if="this.vouchertype1 === '1'">
      {{ deptName }}当月凭证查询
    </h2> -->

    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-row :gutter="10">
        <!--        <el-col :span="5">-->
        <!--          <el-form-item label="单据号" prop="billnumber">-->
        <!--            <el-input v-model="queryParams.billnumber" placeholder="请输入单据号" clearable-->
        <!--                      @keyup.enter.native="handleQuery" />-->
        <!--          </el-form-item>-->
       
        <el-form-item>
          <el-button
            type="primary"
            plain
            size="mini"
            @click="CurrentMonthAccounting"
            >当月账务</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain size="mini" @click="HistoryAccounting"
            >历史账务</el-button
          >
        </el-form-item>
         <!--                </el-col>-->
        <el-form-item>
          <el-button type="primary" plain size="mini" @click="QueryVocuher"
            >查询凭证</el-button
          >
        </el-form-item>
        <!-- <el-form-item>
          <el-col :span="8">
            <div>
              <el-dropdown>
                <span class="el-dropdown-link">
                <el-button  type="primary" plain size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="primary" plain size="mini" @click="CurrentMonthAccounting">当月账务</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="primary" plain size="mini" @click="HistoryAccounting">历史账务</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="primary" plain size="mini" @click="QueryVocuher">查询凭证</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-form-item> -->
        <!--        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
      </el-row>
    </el-form>
    <!--凭证主表-->
    <el-table
      v-loading="loading"
      :data="historyAccountList"
      @row-click="getDetailHistoryAccountList"
      size="mini"
      highlight-current-row
      @current-change="handleCurrentChange"
      class="el-tabletest"
    >
      <af-table-column
        label="凭证类别"
        align="center"
        prop="vouchertype"
        width="60px"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.vouchertype !== "0100"
              ? scope.row.vouchertype !== "0200"
                ? scope.row.vouchertype !== "0300"
                  ? scope.row.vouchertype !== "0400"
                    ? scope.row.vouchertype
                    : "调账"
                  : "退货"
                : "出库"
              : "入库"
          }}</span>
        </template>
      </af-table-column>
      <af-table-column
        label="凭证编号"
        align="center"
        prop="vouchernumber"
        width="100px"
      />
      <af-table-column
        label="结账日期"
        align="center"
        prop="checkoutmonth"
        width="100px"
        v-if="this.vouchertype1 === '2'"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.checkoutmonth }}</span>
        </template>
      </af-table-column>
      <af-table-column
        label="制证日期"
        align="center"
        prop="businessdate"
        width="100px"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.businessdate, "{y}-{m}-{d}") }}</span>
        </template>
      </af-table-column>
      <af-table-column
        label="发生日期"
        align="center"
        prop="voucherdate"
        width="100px"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.voucherdate, "{y}-{m}-{d}") }}</span>
        </template>
      </af-table-column>
      <af-table-column label="制证人" align="center" prop="operator" />
      <af-table-column
        label="来源/用途"
        align="center"
        prop="resourceusage"
        width="85px"
        v-if="this.vouchertype1 == '1'"
      />
      <af-table-column
        label="来源/用途"
        align="center"
        prop="resourceusage"
        width="85px"
        v-if="this.vouchertype1 == '2'"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.resourceusage === "00" && scope.row.vouchertype !== "0100"
              ? scope.row.resourceusage === "13" &&
                scope.row.vouchertype !== "0200"
                ? scope.row.resourceusage === "21" &&
                  scope.row.vouchertype !== "0200"
                  ? scope.row.resourceusage === "40" &&
                    scope.row.vouchertype !== "0300"
                    ? scope.row.resourceusage === "50" &&
                      scope.row.vouchertype !== "0400"
                      ? scope.row.resourceusage === "51" &&
                        scope.row.vouchertype !== "0400"
                        ? scope.row.resourceusage
                        : "盘亏"
                      : "盘亏"
                    : "外购"
                  : "其他"
                : "生产用"
              : "外购"
          }}</span>
        </template>
      </af-table-column>
      <af-table-column label="单位/部门名称" align="center" prop="unitname" />
      <af-table-column
        label="单据号"
        align="center"
        prop="billnumber"
        width="80px"
      />
      <af-table-column label="凭证摘要" align="center" prop="summary" />
      <af-table-column label="业务员" align="center" prop="purphaseperson" />
      <af-table-column
        label="公司支付"
        align="center"
        prop="temporaryflag"
        width="80px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.temporaryflag === "1" ? "是" : "否" }}</span>
        </template>
      </af-table-column>
      <af-table-column
        label="财务审核"
        align="center"
        prop="temporaryflag"
        width="80px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.temporaryflag === "1" ? "是" : "否" }}</span>
        </template>
      </af-table-column>
      <af-table-column
        label="暂估入库标志"
        align="center"
        prop="temporaryflag"
        width="80px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.temporaryflag === "1" ? "是" : "否" }}</span>
        </template>
      </af-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
      v-if="this.vouchertype1 === '1'"
    />

    <!--    <pagination v-show="total3 > 0" :total="total3"  :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"-->
    <!--                @pagination="getNowList" v-if="this.vouchertype2 === '3'"/>-->

    <pagination
      v-show="total1 > 0"
      :total="total1"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="HistoryAccounting"
      v-if="this.vouchertype1 === '2'"
    />
    <br />
    <!--凭证主表详细信息-->
    <el-table
      v-loading="loading1"
      :data="tableData"
      ref="table"
      :summary-method="getSummaries1"
      show-summary
      highlight-current-row
      @current-change="handleCurrentChangeDetail"
      class="el-tabletest"
      @row-click="toAnswer"
    >
      <af-table-column label="物料编码" align="center" prop="itemcode" />
      <af-table-column label="物料名称" align="center" prop="itemname" />
      <af-table-column label="规格型号" align="center" prop="model" />
      <af-table-column label="库存单位" align="center" prop="unit" />
      <af-table-column label="数量" align="center" prop="saleunitquant" />
      <!--      购销单位数量saleunitquant，发生数量businessquant，实际价格realprice-->
      <af-table-column label="单价" align="center" prop="inventoryprice" />
      <af-table-column label="金额" align="center" prop="businessmoney" />
      <af-table-column
        label="本笔后库存数量"
        align="center"
        prop="currentinvquant"
      />
      <af-table-column
        label="本笔后库存金额"
        align="center"
        prop="currentinvmoney"
      />
      <af-table-column label="摘要" align="center" prop="summary" />
    </el-table>
    <!--    <vdetail ref="vdetail"></vdetail>-->

    <!--凭证查询-->
    <el-dialog :visible.sync="open" append-to-body width="1200px">
      <el-row :gutter="12">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :inline="true"
          class="el_table"
        >
          <el-form-item label="凭证类别:" prop="vouchertype">
            <el-input
              v-model="ruleForm.vouchertype"
              placeholder="请输入凭证类别"
              :style="{ width: '80%' }"
              >></el-input
            >
          </el-form-item>
          <el-form-item label="凭证编号:" prop="vouchernumber">
            <el-input
              v-model="ruleForm.vouchernumber"
              placeholder="请输入凭证编号"
              :style="{ width: '80%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="来源用途:" prop="resourceusage">
            <el-input
              v-model="ruleForm.resourceusage"
              placeholder="请输入来源用途"
              :style="{ width: '80%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="原单据号:" prop="billnumber">
            <el-input
              v-model="ruleForm.billnumber"
              placeholder="请输入原单据号"
              :style="{ width: '80%' }"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="单位/部门名称:"
            prop="unitname"
            :style="{ width: '520%' }"
          >
            <el-input
              v-model="ruleForm.unitname"
              placeholder="请输入单位/部门名称"
              :style="{ width: '486%' }"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="凭证摘要:"
            prop="summary"
            :style="{ width: '110%' }"
          >
            <el-input
              v-model="ruleForm.summary"
              placeholder="请输入凭证摘要"
              :style="{ width: '150%' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="业务员:" prop="purphaseperson">
            <el-input
              v-model="ruleForm.purphaseperson"
              placeholder="请输入业务员"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <!--凭证查询子表-->
      <el-table
        style="width: 100%"
        :data="tableData1"
        border
        :visible.sync="open"
        @selection-change="selectRow"
        :summary-method="getSummaries"
        :header-cell-style="{
          background: '#F5F7FA',
          color: '#606266',
          height: '40px',
          padding: '0px',
        }"
        highlight-current-row
        @current-change="handleCurrentChange"
        @row-click="tableDataClick"
        class="el-tabletest"
        show-summary
      >
        <el-table-column
          label="物料编码"
          align="center"
          prop="itemcode"
          min-width="150"
          :style="{ width: '140%' }"
        >
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.itemcode" readonly> </el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="物料名称"
          align="center"
          prop="itemname"
          min-width="120"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.itemname" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="规格型号"
          align="center"
          prop="model"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.model" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单位" align="center" prop="unit" min-width="70">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.unit"
              readonly
              style="text-align-last: center"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          align="center"
          prop="saleunitquant"
          min-width="70"
        >
          <template slot-scope="scope">
            <el-input-number
              :style="{ width: '98%' }"
              v-model="scope.row.saleunitquant"
              :controls="false"
              :precision="3"
              style="text-align-last: right"
            >
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="单价"
          align="center"
          prop="inventoryprice"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.inventoryprice"
              :style="{ width: '98%' }"
              style="text-align-last: right"
              :precision="3"
              :controls="false"
              controls-position="left"
            >
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="金额"
          align="center"
          prop="businessmoney"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.businessmoney"
              readonly
              :style="{ width: '98%' }"
              :precision="2"
              :controls="false"
              controls-position="left"
              style="text-align-last: right"
            >
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="摘要" align="center" prop="summary">
          <template slot-scope="scope">
            <el-input v-model="scope.row.summary"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <div>
        <el-row :gutter="12">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="80px"
          >
            <el-col :span="5">
              <el-form-item label="制证日期" prop="voucherdate">
                <template slot-scope="scope">
                  <el-input
                    v-model="ruleForm.voucherdate"
                    type="date"
                    :style="{ width: '100%' }"
                  ></el-input>
                  <!--                  <span>{{ parseTime(ruleForm.voucherdate, '{y}-{m}-{d}') }}</span>-->
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="制单人:" prop="operator">
                <el-input
                  v-model="ruleForm.operator"
                  placeholder="请输入制单人"
                  readonly
                  :style="{ width: '70%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel">确定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  datetomonth,
  dateToString,
  datetoyearAndMonth,
  getEabcVO,
  getHistoryAccountDetailList,
  listHistoryAccount,
  removeSpace,
  selectDetailFromEaba00,
} from "../../../api/project/voucher";
import { listEabbh0, listEabbh0Byvoucher } from "../../../api/project/eabbh0";
import Cookies from "js-cookie";
import { Listeabb00, listeabb00Byvoucher } from "../../../api/project/eabb00";
//从cookie内获取用户
const userInfo = JSON.parse(Cookies.get("userInfo"));
export default {
  dicts: ["resourceusagename", "sys_depomanage_test"],
  // components: {
  //   vdetail: historyAccountDetailList
  // },
  data() {
    return {
      loading1: true,
      tableData1: [],
      bcxxopen: false,
      tableData: [],
      vouchertype1: "",
      vouchertype2: "",
      vouchertype3: "",
      sumMoney: 0,
      sumQuant: 0,
      time: 0,

      ruleForm: {
        id: 0,
        voucherdate: "",
        warehousecode: userInfo.dept.deptId,
        vouchertype: "", //凭证类别ok
        vouchernumber: "", //凭证编号ok
        billnumber: "", //原单据号ok
        businessdate: "", //凭证日期ok
        resourceusage: "", //来源/用途ok
        // unitList: [],//单位/部门
        unitname: "", //单位/部门名称ok
        unitcode: "", //单位/部门编码ok
        checkoutmonth: 0,
        purphaseperson: "", //业务员ok
        operator: userInfo.userName, //制证人ok
        summary: "", //摘要
        manager: userInfo.userName, //主管ok
        userName: userInfo.userName, //用户
        eabc00List: [], // 库存凭证明细信息
        eaba00List: [], // 库存余额信息
      },
      ruleForm1: {
        itemcode: "", //物料编码
        itemname: "", //物料名称
        inventoryprice: "", //库存单价
        inventoryquant: "", //库存数量
        inventorymoney: "", //库存金额
        allocation: "", //已分配量
        inputquant: "", //入库数量
        totalinputquant: "", //累计入库数量
        inputmoney: "", //入库金额
        totalinputmoney: "", //累计入库金额
        outputquant: "", //出库数量
        totaloutputquant: "", //累计出库数量
        outputmoney: "", //出库金额
        totaloutputmoney: "", //累计出库金额
        time: "", //时间
      },
      // 控制新增编辑弹窗的显示与隐藏
      addOrUpdateVisible: false,
      //部门名称
      deptName: userInfo.dept != null ? userInfo.dept.deptName : "",
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedEabc00: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数当月账务
      total: 0,
      //历史账务总条数
      total1: 0,
      total3: 0,
      // 当月凭证
      historyAccountList: [],
      // 历史凭证
      eabch0List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询余额情况弹出层
      open1: false,
      vouchertypeList: [],
      // 查询参数
      // 会计处理标志时间范围
      daterangeBusinessdate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        warehousecode: userInfo.dept != null ? userInfo.dept.deptId : null,
        vouchertype: null,
        vouchernumber: null,
        businessdate: null,
        voucherdate: null,
        operator: null,
        resourceusage: null,
        unitcode: null,
        unitname: null,
        billnumber: null,
        purphaseperson: null,
        summary: null,
        checkoutmonth: null,
        temporaryflag: null,
        financetreatflag: null,
        idDept: userInfo.dept != null ? userInfo.dept.deptId : null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.vouchertypeList = this.dict.type.sys_depomanage_test;
    this.getList1();
    this.getList2();
  },
  methods: {
    getTime() {
      let time = new Date();
      console.log(time, "kkkkj");
      let time1 = dateToString(time);
      let time2 = datetomonth(time1);
      console.log(time2, "time2");
      this.time = time1;
      console.log(this.time, "this.time");
    },
    //凭证类别切换
    changeset(e) {
      console.log(e, "e");
      switch (e) {
        //入库
        case "0100":
          this.getList();
          this.daterangeBusinessdate = [];
          break;
        //出库
        case "0200":
          this.getList();
          this.daterangeBusinessdate = [];
          break;
        case "0300":
          this.getList();
          this.daterangeBusinessdate = [];
          break;
        case "0400":
          this.getList();
          this.daterangeBusinessdate = [];
          break;
      }
    },

    getSummaries1(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        }
        // 指定一个或者多个你需要计算的列
        else if (index === 4 || index === 6 || index === 8) {
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
          } else {
            sums[index] = "";
          }
        } else {
          sums[index] = "";
        }
      });
      if (this.tableData[0].saleunitquant != null) {
        sums[4] = parseFloat(sums[4]).toFixed(2);
        sums[6] = parseFloat(sums[6]).toFixed(2);
        sums[8] = parseFloat(sums[8]).toFixed(2);
      }
      return sums;
    },
    toAnswer(val) {
      this.currentRow1 = val;
      this.getTime();
      selectDetailFromEaba00(
        removeSpace(this.currentRow1.itemcode),
        userInfo.dept.deptId
      ).then((res) => {
        console.log(res, "reseaba00111");
        console.log(this.time, "time");
        // this.ruleForm1 = res.rows;
        this.ruleForm1.itemcode = removeSpace(res.rows[0].itemcode);
        this.ruleForm1.itemname = res.rows[0].itemname;
        this.ruleForm1.inventoryprice = res.rows[0].inventoryprice;
        this.ruleForm1.inventorymoney = res.rows[0].inventorymoney;
        this.ruleForm1.inventoryquant = res.rows[0].inventoryquant;
        this.ruleForm1.allocation = res.rows[0].allocation;
        this.ruleForm1.inputquant = res.rows[0].inputquant;
        this.ruleForm1.totalinputquant = res.rows[0].totalinputquant;
        this.ruleForm1.inputmoney = res.rows[0].inputmoney;
        this.ruleForm1.totalinputmoney = res.rows[0].totalinputmoney;
        this.ruleForm1.outputquant = res.rows[0].outputquant;
        this.ruleForm1.totaloutputquant = res.rows[0].totaloutputquant;
        this.ruleForm1.outputmoney = res.rows[0].outputmoney;
        this.ruleForm1.totaloutputmoney = res.rows[0].totaloutputmoney;
        this.ruleForm1.time = this.time;
      });
    },
    handleCurrentChangeDetail(val) {
      this.currentRow1 = val;
      console.log(this.currentRow1, "this.currentRow1");
      // selectDetailFromEaba00(removeSpace(this.currentRow1.itemcode), userInfo.dept.deptId).then(res => {
      //   console.log(res, 'reseaba00222');
      //   this.ruleForm1.itemcode = res.itemcode;
      //   this.ruleForm1.itemname = res.itemname;
      //   this.ruleForm1.inventoryprice = res.inventoryprice;
      //   this.ruleForm1.inventorymoney = res.inventorymoney;
      //   this.ruleForm1.inventoryquant = res.inventoryquant;
      //   this.ruleForm1.allocation = res.allocation;
      //   this.ruleForm1.inputquant = res.inputquant;
      //   this.ruleForm1.totalinputquant = res.totalinputquant;
      //   this.ruleForm1.inputmoney = res.inputmoney;
      //   this.ruleForm1.totalinputmoney = res.totalinputmoney;
      //   this.ruleForm1.outputquant = res.outputquant;
      //   this.ruleForm1.totaloutputquant = res.totaloutputquant;
      //   this.ruleForm1.outputmoney = res.outputmoney;
      //   this.ruleForm1.totaloutputmoney = res.totaloutputmoney;
      // });
    },
    selectRow(val) {
      this.selectlistRow = val;
      this.multiple = !val.length;
    },
    //取消
    cancel() {
      this.bcxxopen = false;
      this.tableData1 = [];
      this.open = false;
    },
    addRow() {
      var list = {
        rowNum: this.rowNum,
        id: 0,
        itemcode: undefined,
        itemname: undefined,
        model: undefined,
        unit: undefined,
        saleunitquant: undefined,
        inventoryprice: undefined,
        businessmoney: undefined,
        summary: undefined,
      };
      this.tableData1.push(list);
      this.rowNum += 1;
    },
    handleRowClick(row) {
      this.selectlistRow = row;
      this.multiple = !row.length;
    },
    //根据凭证便号，凭证类别，库房编号查询历史eabbh0凭证
    getHistoryList() {
      this.loading = true;
      this.queryParams.params = {};
      if (
        null != this.daterangeBusinessdate &&
        "" !== this.daterangeBusinessdate
      ) {
        this.queryParams.params["beginBusinessdate"] =
          this.daterangeBusinessdate[0];
        this.queryParams.params["endBusinessdate"] =
          this.daterangeBusinessdate[1];
      }
      listEabbh0Byvoucher(this.queryParams).then((res) => {
        this.historyAccountList = res.rows;
        this.total1 = res.total;
        this.loading = false;
      });
    },
    //根据凭证便号，凭证类别，库房编号查询当月eabb00凭证
    getNowList() {
      this.loading = true;
      this.queryParams.params = {};
      if (
        null != this.daterangeBusinessdate &&
        "" !== this.daterangeBusinessdate
      ) {
        this.queryParams.params["beginBusinessdate"] =
          this.daterangeBusinessdate[0];
        this.queryParams.params["endBusinessdate"] =
          this.daterangeBusinessdate[1];
      }
      listeabb00Byvoucher(this.queryParams).then((res) => {
        console.log(res, "res");
        this.historyAccountList = res.rows;
        // this.vouchertype1 = '3';
        this.total = res.total;
        this.loading = false;
      });
    },
    /** 查询当月凭证列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      this.vouchertype1 = "1";
      if (
        null != this.daterangeBusinessdate &&
        "" !== this.daterangeBusinessdate
      ) {
        this.queryParams.params["beginBusinessdate"] =
          this.daterangeBusinessdate[0];
        this.queryParams.params["endBusinessdate"] =
          this.daterangeBusinessdate[1];
      }
      Listeabb00(this.queryParams).then((response) => {
        this.historyAccountList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getList2(row) {
      this.loading1 = true;
      getHistoryAccountDetailList(row)
        .then((res) => {
          this.loading1 = false;
          console.log(res, "res");
          this.tableData = res;
          for (let i = 0; i < res.length; i++) {
            //数量
            this.tableData[i].saleunitquant = res[i].businessquant;
            //单价
            this.tableData[i].inventoryprice = res[i].realprice;
          }
        })
        .catch(() => {
          this.loading1 = false;
        });
    },
    /** 凭证表单行点击事件 */
    tableDataClick(row) {},

    /** 凭证主表点击行查询主表明细 */
    getDetailHistoryAccountList(row) {
      console.log(this.vouchertype1, "row.vouchertype11111");
      if (this.vouchertype1 === "1") {
        this.getList1(row);
        getEabcVO(row).then((res) => {
          console.log(res, "res111111111");
          for (let k = 0; k < res.length; k++) {
            this.addRow();
          }
          //给返回结果给凭证查询明细表格tableData1赋值
          for (let i = 0; i < res.length; i++) {
            //物料编号
            this.tableData1[i].itemcode = removeSpace(res[i].itemcode);
            //物料名称
            this.tableData1[i].itemname = res[i].itemname;
            //规格型号
            this.tableData1[i].model = res[i].model;
            //单位
            this.tableData1[i].unit = res[i].unit;
            //数量
            this.tableData1[i].saleunitquant = res[i].saleunitquant;
            //单价
            this.tableData1[i].inventoryprice = res[i].inventoryprice;
            //金额
            this.tableData1[i].businessmoney = res[i].businessmoney;
            //摘要
            this.tableData1[i].summary = res[i].summary;
            //结账年月
            this.tableData1[i].checkoutmonth = res[i].checkoutmonth;
          }
        });
        this.tableData = [];
      } else if (this.vouchertype1 === "2") {
        this.getList2(row);
        getHistoryAccountDetailList(row).then((res) => {
          console.log(res, "res22222");
          for (let j = 0; j < res.length; j++) {
            this.addRow();
          }
          for (var i = 0; i < res.length; i++) {
            //物料编号
            this.tableData1[i].itemcode = removeSpace(res[i].itemcode);
            //物料名称
            this.tableData1[i].itemname = res[i].itemname;
            //规格型号
            this.tableData1[i].model = res[i].model;
            //单位
            this.tableData1[i].unit = res[i].unit;
            //数量
            this.tableData1[i].saleunitquant = res[i].businessquant;
            //单价
            this.tableData1[i].inventoryprice = res[i].realprice;
            //金额
            this.tableData1[i].businessmoney = res[i].businessmoney;
            //摘要
            this.tableData1[i].summary = res[i].summary;
            //结账年月
            this.tableData1[i].checkoutmonth = res[i].checkoutmonth;
          }
        });
        this.tableData = [];
        console.log(row, "row.vouchertype2222");
      } else if (this.vouchertype1 === "3") {
        getEabcVO(row).then((res) => {
          console.log(res, "res33333");
          for (let k = 0; k < res.length; k++) {
            this.addRow();
          }
          //给返回结果给凭证查询明细表格tableData1赋值
          for (let i = 0; i < res.length; i++) {
            //物料编号
            this.tableData1[i].itemcode = removeSpace(res[i].itemcode);
            //物料名称
            this.tableData1[i].itemname = res[i].itemname;
            //规格型号
            this.tableData1[i].model = res[i].model;
            //单位
            this.tableData1[i].unit = res[i].unit;
            //数量
            this.tableData1[i].saleunitquant = res[i].saleunitquant;
            //单价
            this.tableData1[i].inventoryprice = res[i].inventoryprice;
            //金额
            this.tableData1[i].businessmoney = res[i].businessmoney;
            //摘要
            this.tableData1[i].summary = res[i].summary;
            //结账年月
            this.tableData1[i].checkoutmonth = res[i].checkoutmonth;
          }
        });
        this.tableData = [];
      }
    },
    dayin() {
      this.open = true;
      this.title = "打印";
      this.print();
    },
    //当月账务点击行查询
    getList1(row) {
      // this.loading1 = true;
      getEabcVO(row)
        .then((res) => {
          //this.loading1 = false;
          this.tableData = res;
          console.log(res, "明细表");
        })
        .catch(() => {
          this.loading1 = false;
        });
    },
    //选择eabb00的行高亮
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log(this.currentRow, "主表");
      if (this.vouchertype1 === "1") {
        if (this.currentRow.vouchertype === "0100") {
          this.ruleForm.vouchertype = "入库凭证";
        } else if (this.currentRow.vouchertype === "0200") {
          this.ruleForm.vouchertype = "出库凭证";
        } else if (this.currentRow.vouchertype === "0300") {
          this.ruleForm.vouchertype = "退货凭证";
        } else if (this.currentRow.vouchertype === "0400") {
          this.ruleForm.vouchertype = "调账凭证";
        }
        this.ruleForm.vouchernumber = this.currentRow.vouchernumber;
        this.ruleForm.resourceusage = this.currentRow.resourceusage;
        this.ruleForm.billnumber = this.currentRow.billnumber;
        this.ruleForm.unitname = this.currentRow.unitname;
        console.log(this.ruleForm.unitname, "单位名称");
        this.ruleForm.summary = this.currentRow.summary;
        this.ruleForm.purphaseperson = this.currentRow.purphaseperson;
        this.ruleForm.voucherdate = this.currentRow.voucherdate;
        this.ruleForm.operator = this.currentRow.operator;
      } else if (this.vouchertype1 === "2") {
        if (this.currentRow.vouchertype === "0100") {
          this.ruleForm.vouchertype = "入库凭证";
        } else if (this.currentRow.vouchertype === "0200") {
          this.ruleForm.vouchertype = "出库凭证";
        } else if (this.currentRow.vouchertype === "0300") {
          this.ruleForm.vouchertype = "退货凭证";
        } else if (this.currentRow.vouchertype === "0400") {
          this.ruleForm.vouchertype = "调账凭证";
        }
        if (
          this.currentRow.resourceusage === "00" &&
          this.currentRow.vouchertype === "0100"
        ) {
          this.ruleForm.resourceusage = "外购";
          this.historyAccountList.resourceusage = "外购";
        } else if (
          this.currentRow.resourceusage === "13" &&
          this.currentRow.vouchertype === "0200"
        ) {
          this.ruleForm.resourceusage = "生产用";
        } else if (
          this.currentRow.resourceusage === "21" &&
          this.currentRow.vouchertype === "0200"
        ) {
          this.ruleForm.resourceusage = "其他";
        } else if (
          this.currentRow.resourceusage === "40" &&
          this.currentRow.vouchertype === "0300"
        ) {
          this.ruleForm.resourceusage = "外购";
        } else if (
          this.currentRow.resourceusage === "50" &&
          this.currentRow.vouchertype === "0400"
        ) {
          this.ruleForm.resourceusage = "盘盈";
        } else if (
          this.currentRow.resourceusage === "51" &&
          this.currentRow.vouchertype == "0400"
        ) {
          this.ruleForm.resourceusage = "盘亏";
        }
        this.ruleForm.vouchernumber = this.currentRow.vouchernumber;
        this.ruleForm.billnumber = this.currentRow.billnumber;
        this.ruleForm.unitname = this.currentRow.unitname;
        console.log(this.ruleForm.unitname, "单位名称");
        this.ruleForm.summary = this.currentRow.summary;
        this.ruleForm.purphaseperson = this.currentRow.purphaseperson;
        this.ruleForm.voucherdate = this.currentRow.businessdate;
        this.ruleForm.operator = this.currentRow.operator;
        this.ruleForm1.time = datetoyearAndMonth(this.currentRow.businessdate);
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      console.log(this.vouchertype1, "this.vouchertype0");
      if (this.vouchertype1 === "1") {
        console.log(this.vouchertype1, "this.vouchertype1");
        this.getNowList();
      } else if (this.vouchertype1 === "2") {
        console.log(this.vouchertype1, "this.vouchertype2");
        this.getHistoryList();
      }
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeBusinessdate = [];
      this.resetForm("queryForm");
      if (this.vouchertype1 === "3") {
        this.getNowList();
        this.vouchertype1 = "1";
      } else if (this.vouchertype1 === "2") {
        this.getHistoryList();
      }
    },
    /**库存余额查询*/
    QueryBalance(val) {
      this.open1 = true;
      this.title1 = "库存余额查询";
      if (this.vouchertype1 === "1") {
        handleCurrentChangeDetail();
        console.log("aaaaaaaaaaaaaaaaaa");
      }
    },
    /**凭证查询*/
    QueryVocuher() {
      this.open = true;
    },
    /** 历史凭证查询 */
    HistoryAccounting() {
      this.loading = false;
      this.vouchertype1 = "2";
      this.queryParams.params = {};
      listEabbh0(this.queryParams).then((response) => {
        this.historyAccountList = response.rows;
        this.total1 = response.total;
        this.loading = false;
      });
      this.tableData = [];
    },
    /**当月凭证查询*/
    CurrentMonthAccounting() {
      this.loading = false;
      this.vouchertype1 = "1";
      console.log(this.vouchertype1, "this.vouchertype1");
      this.queryParams.params = {};
      Listeabb00(this.queryParams).then((response) => {
        this.historyAccountList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      this.tableData = [];
    },
    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        }
        // index >= 3 || index <= 11 是你需要计算的列
        // 当然也可以指定一个或者多个列
        // index === 2 || index === 3 这样值求和第二个与第三个列
        else if (index === 4 || index === 6) {
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
          } else {
            sums[index] = "";
          }
        } else {
          sums[index] = "";
        }
      });
      console.log(sums, "sums");
      console.log(sums[4], "sums4");
      console.log(sums[6], "sums6");
      //查看sums[4]的类型
      console.log(typeof sums[4], "typeof sums[4]");
      this.sumQuant = sums[4];
      this.sumQuant = parseFloat(sums[4]).toFixed(2);
      sums[4] = parseFloat(sums[4]).toFixed(2);
      console.log(this.sumQuant, "this.sumQuant");
      this.sumMoney = parseFloat(sums[6]).toFixed(2);
      sums[6] = parseFloat(sums[6]).toFixed(2);
      /**把shis.sumMoney保存两位小数点 */
      // this.sumQuant = this.sumQuant.toFixedNumber(2);
      // this.sumMoney = this.sumMoney.toFixedNumber(2);
      return sums;
    },
  },
};
</script>
<style lang="scss">
.el-tabletest .cell {
  padding: 0px;
  padding-bottom: 0px;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  height: 26px;
}

.el-form-item {
  margin-bottom: 3px;
}

.el-table__footer {
  padding: 0px;
  height: 12px;
}

.el-table .cell {
  line-height: 22px;
}

.td {
  padding: 0px;
  padding-bottom: 0px;
  padding-top: 0px;
}

.el-table .el-table__cell.is-center {
  text-align: center;
  padding: 4px;
}
::v-deep .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-tabletest .cell {
  padding: 0px;
  padding-bottom: 0px;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  height: 26px;
}

::v-deep .el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
  font-size: larger;
}
.el-dropdown-link {
  cursor: pointer;
  color: #3723e8;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

