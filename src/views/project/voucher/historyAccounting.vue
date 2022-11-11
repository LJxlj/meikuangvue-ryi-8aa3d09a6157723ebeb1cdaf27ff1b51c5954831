<template>
  <div class="app-container">
    <h2 align="center" v-if="this.vouchertype1 === '2'">{{ deptName }}历史凭证查询</h2>
    <h2 align="center" v-if="this.vouchertype1 === '1'">{{ deptName }}当月凭证查询</h2>

    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-row :gutter="10">
                <el-col :span="5">
                  <el-form-item label="凭证类别" prop="vouchertype">
                    <el-select v-model="queryParams.vouchertype" placeholder="请选择凭证类别" clearable @change="changeset">
                      <el-option v-for="(dict, index) in dict.type.sys_depomanage_test" :key="index" :label="dict.label"
                                 :value="dict.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="凭证编号" prop="vouchernumber">
                    <el-input v-model="queryParams.vouchernumber" placeholder="请输入凭证编号" clearable :maxlength="10"
                              @keyup.enter.native="handleQuery"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="凭证日期">
                    <el-date-picker
                      :picker-options="pickerOptions1"
                      v-model="daterangeBusinessdate"
                      style="width: 240px"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="daterange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
        <!--        <el-col :span="5">-->
        <!--          <el-form-item label="单据号" prop="billnumber">-->
        <!--            <el-input v-model="queryParams.billnumber" placeholder="请输入单据号" clearable-->
        <!--                      @keyup.enter.native="handleQuery" />-->
        <!--          </el-form-item>-->
<!--                </el-col>-->
        <el-form-item>
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search"  @click="handleQuery">搜索</el-button>
          </el-col>
          <el-col :span="8">
            <el-button icon="el-icon-refresh" type="primary" @click="resetQuery">重置</el-button>
          </el-col>
          <el-col :span="8">
            <div>
              <el-dropdown  @change="changeset1">
                <span class="el-dropdown-link">
                <el-button  type="primary">操作<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="CurrentMonthAccounting">当月账务</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="HistoryAccounting">历史账务</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="QueryVocuher">查询凭证</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="QueryBalance">查询余额</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-form-item>
        <!--        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
      </el-row>
    </el-form>
<!--凭证主表-->
    <el-table v-loading="loading" :data="historyAccountList" @row-click="getDetailHistoryAccountList" size="mini"
              highlight-current-row @current-change="handleCurrentChange"
             >
      <af-table-column label="类别" align="center" prop="vouchertype" width="60px">
        <template slot-scope="scope">
          <span>{{
              scope.row.vouchertype !== "0100" ?
                scope.row.vouchertype !== "0200" ?
                  scope.row.vouchertype !== "0300" ?
                    scope.row.vouchertype !== "0400" ? scope.row.vouchertype : "调账"
                    : "退货"
                  : "出库"
                : "入库"
            }}</span>
        </template>
      </af-table-column>
      <af-table-column label="凭证编号" align="center" prop="vouchernumber"  width="100px"/>
      <af-table-column label="结账日期" align="center" prop="checkoutmonth" width="100px"
                       v-if="this.vouchertype1==='2'">
        <template slot-scope="scope">
          <span>{{ scope.row.checkoutmonth }}</span>
        </template>
      </af-table-column>
      <af-table-column label="制证日期" align="center" prop="businessdate" width="100px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.businessdate, '{y}-{m}-{d}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="发生日期" align="center" prop="voucherdate" width="100px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.voucherdate, '{y}-{m}-{d}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="制证人" align="center" prop="operator"/>
      <af-table-column label="来源/用途" align="center" prop="resourceusage" width="85px" v-if="this.vouchertype1=='1'"/>
      <af-table-column label="来源/用途" align="center" prop="resourceusage" width="85px" v-if="this.vouchertype1=='2'">
        <template slot-scope="scope">
          <span>{{
              scope.row.resourceusage === "00" && scope.row.vouchertype !== "0100" ?
                scope.row.resourceusage === "13" && scope.row.vouchertype !== "0200" ?
                  scope.row.resourceusage === "21" && scope.row.vouchertype !== "0200" ?
                    scope.row.resourceusage === "40" && scope.row.vouchertype !== "0300" ?
                      scope.row.resourceusage === "50" && scope.row.vouchertype !== "0400" ?
                        scope.row.resourceusage === "51" && scope.row.vouchertype !== "0400" ?  scope.row.resourceusage : "盘亏"
                      : "盘亏"
                        : "外购"
                          : "其他"
                            : "生产用"
                              : "外购"
            }}</span>
        </template>
      </af-table-column>
      <af-table-column label="单位/部门名称" align="center" prop="unitname"/>
      <af-table-column label="单据号" align="center" prop="billnumber" width="80px"/>
      <af-table-column label="凭证摘要" align="center" prop="summary"/>
      <af-table-column label="业务员" align="center" prop="purphaseperson"/>
      <af-table-column label="公司支付" align="center" prop="temporaryflag" width="80px">
        <template slot-scope="scope">
        <span>{{
            scope.row.temporaryflag === "1" ? "是" : "否"
          }}</span>
        </template>
      </af-table-column>
      <af-table-column label="财务审核" align="center" prop="temporaryflag"  width="80px">
        <template slot-scope="scope">
        <span>{{
            scope.row.temporaryflag === "1" ? "是" : "否"
          }}</span>
        </template>
      </af-table-column>
      <af-table-column label="暂估入库标志" align="center" prop="temporaryflag" width="80px">
        <template slot-scope="scope">
        <span>{{
            scope.row.temporaryflag === "1" ? "是" : "否"
          }}</span>
        </template>
      </af-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total"  :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getList" v-if="this.vouchertype1 === '1'"/>

<!--    <pagination v-show="total3 > 0" :total="total3"  :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"-->
<!--                @pagination="getNowList1" v-if="this.vouchertype1 === '3'"/>-->

    <pagination v-show="total1 > 0" :total="total1" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                @pagination="getHistoryList"  v-if="this.vouchertype1 === '2'"/>
    <br/>
<!--凭证主表详细信息-->
    <el-table v-loading="loading1" :data="tableData" ref="table" :summary-method="getSummaries1" show-summary highlight-current-row
              @current-change="handleCurrentChangeDetail"  @row-click="toAnswer">
      <af-table-column label="物料编码" align="center" prop="itemcode" />
      <af-table-column label="物料名称" align="center" prop="itemname" />
      <af-table-column label="规格型号" align="center" prop="model" />
      <af-table-column label="库存单位" align="center" prop="unit" />
      <af-table-column label="数量" align="center" prop="saleunitquant"/>
      <!--      购销单位数量saleunitquant，发生数量businessquant，实际价格realprice-->
      <af-table-column label="单价" align="center" prop="inventoryprice" />
      <af-table-column label="金额" align="center" prop="businessmoney" />
      <af-table-column label="本笔后库存数量" align="center" prop="currentinvquant" />
      <af-table-column label="本笔后库存金额" align="center" prop="currentinvmoney"  />
      <af-table-column label="摘要" align="center" prop="summary" />
    </el-table>
<!--    <vdetail ref="vdetail"></vdetail>-->

<!--凭证查询-->
    <el-dialog :visible.sync="open" append-to-body width="1200px">
      <div class="app-containerdiv">
        <h1 align="center">{{deptName}}{{this.ruleForm.vouchertype}}</h1>
      <el-row :gutter="12">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :inline="true"
          class="el_table">
          <el-form-item label="凭证类别:" prop="vouchertype">
            <el-input v-model="ruleForm.vouchertype" readonly  :style="{ width: '80%'}">></el-input>
          </el-form-item>
          <el-form-item label="凭证编号:" prop="vouchernumber">
            <el-input v-model="ruleForm.vouchernumber" readonly  :style="{ width: '80%'}"></el-input>
          </el-form-item>
          <el-form-item label="来源用途:" prop="resourceusage">
            <el-input v-model="ruleForm.resourceusage" readonly  :style="{ width: '80%'}"></el-input>
          </el-form-item>
          <el-form-item label="原单据号:" prop="billnumber">
            <el-input v-model="ruleForm.billnumber" readonly  :style="{ width: '80%'}"></el-input>
          </el-form-item>
          <el-form-item label="单位/部门名称:" prop="unitname" :style="{ width:'520%'}">
            <el-input v-model="ruleForm.unitname" readonly  :style="{ width:'505%'}"></el-input>
          </el-form-item>
          <el-form-item label="凭证摘要:" prop="summary" :style="{ width:'110%'}">
            <el-input v-model="ruleForm.summary" readonly :style="{ width:'250%'}"></el-input>
          </el-form-item>
          <el-form-item label="业务员:" prop="purphaseperson">
            <el-input v-model="ruleForm.purphaseperson" readonly  :style="{ width: '100%'}"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
<!--凭证查询子表-->
      <el-table
        style="width: 100%"
        :data="tableData1"
        border
        :visible.sync="open"
        :summary-method="getSummaries"
        :header-cell-style="{background:'#F5F7FA',color:'#606266', height:'30px', padding:'0px'}"
        class="el-tabletest"
        show-summary>
        <el-table-column label="物料编码"  prop="itemcode" width="160px" >
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.itemcode" readonly>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="物料名称" align="center" prop="itemname" width="140px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.itemname" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="规格型号" align="center" prop="model" width="140px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.model" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单位" align="center" prop="unit" width="97px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unit" readonly style="text-align-last: center"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="数量" align="center" prop="saleunitquant" width="120px">
          <template slot-scope="scope">
            <el-input-number
              :style="{ width: '98%' }"
              v-model="scope.row.saleunitquant"
              :controls="false" :precision="3"
              style="text-align-last: right">
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="单价" align="center" prop="inventoryprice" width="140px">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.inventoryprice"
                             :style="{ width: '98%' }"
                             style="text-align-last: right"
                             :precision="3"
                             :controls="false"
                             controls-position="left">
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="金额" align="center" prop="businessmoney" width="140px">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.businessmoney" readonly :style="{ width: '98%' }"
                             :precision="2" :controls="false" controls-position="left" style="text-align-last: right">
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="摘要" align="center" prop="summary" width="180px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.summary" readonly></el-input>
          </template>
        </el-table-column>
      </el-table>
      <br/>
      <div>
        <el-row :gutter="12">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" >
            <el-col :span="5">
              <el-form-item label="制证日期" prop="voucherdate">
                  <el-input v-model="ruleForm.voucherdate"   readonly  :style="{ width: '100%' }"></el-input>
                  <!--                  <span>{{ parseTime(ruleForm.voucherdate, '{y}-{m}-{d}') }}</span>-->
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="制单人:" prop="operator">
                <el-input v-model="ruleForm.operator" placeholder="请输入制单人" readonly :style="{ width: '70%' }">
                </el-input>
              </el-form-item>
            </el-col>
            <br/>
            <br/>
            <el-form-item class="el-from111" label-width="80%" >
              <el-button size="mini" type="primary" @click="dayin">打印</el-button>
              <el-button @click="cancel" size="mini">取 消</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
      </div>
    </el-dialog>

<!--查询余额情况弹窗-->
    <el-dialog :visible.sync="open1" append-to-body width="800px">
      <el-row :gutter="12">
        <el-form
          ref="ruleForm1"
          :model="ruleForm1"
          :inline="true"
          class="el_table">
          <el-form-item label="物料编号:" prop="itemcode">
            <el-input v-model="ruleForm1.itemcode" readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="物料名称:" prop="itemname">
            <el-input v-model="ruleForm1.itemname"  readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="库存单价:" prop="inventoryprice">
            <el-input v-model="ruleForm1.inventoryprice" readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="库存数量:" prop="inventoryquant">
            <el-input v-model="ruleForm1.inventoryquant" readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="库存金额:" prop="inventorymoney">
            <el-input v-model="ruleForm1.inventorymoney" readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="已分配量:" prop="allocation">
            <el-input v-model="ruleForm1.allocation" readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="入库数量:" prop="inputquant">
            <el-input v-model="ruleForm1.inputquant" readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="累计入库数量:" prop="totalinputquant">
            <el-input v-model="ruleForm1.totalinputquant" readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="入库金额:" prop="inputmoney">
            <el-input v-model="ruleForm1.inputmoney" readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="累计入库金额:" prop="totalinputmoney">
            <el-input v-model="ruleForm1.totalinputmoney" readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="出库数量:" prop="outputquant">
            <el-input v-model="ruleForm1.outputquant" readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="累计出库数量:" prop="totaloutputquant">
            <el-input v-model="ruleForm1.totaloutputquant" readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="出库金额:" prop="outputmoney">
            <el-input v-model="ruleForm1.outputmoney" readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="累计出库金额:" prop="totaloutputmoney">
            <el-input v-model="ruleForm1.totaloutputmoney" readonly :style="{ width: '100%'}"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="以上数据的时间为:" v-model="time">
           <el-input v-model="ruleForm1.time"  readonly :style="{ width: '70%'}"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
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
  listMaterialByDeptcode,
  removeSpace,
  selectDetailFromEaba00
} from '../../../api/project/voucher';
import { listEabbh0, listEabbh0Byvoucher } from '../../../api/project/eabbh0';
import Cookies from 'js-cookie';
import { Listeabb00, listeabb00Byvoucher } from "../../../api/project/eabb00";
import { getLodop } from "../../../api/project/LodopFuncs";
//从cookie内获取用户
const userInfo = JSON.parse(Cookies.get("userInfo"));
export default {
  dicts: ['resourceusagename', 'sys_depomanage_test'],
  // components: {
  //   vdetail: historyAccountDetailList
  // },
  data() {
    return {
      loading1: true,
      //查询凭证详细信息表格
      tableData1: [],
      NoPrice: false,
      bcxxopen: false,
      //凭证主表详细信息，界面下方
      tableData: [],
      vouchertype1: '',
      vouchertype2: '',
      vouchertype3: '',
      sumMoney: 0,
      sumQuant: 0,
      time:0,

      ruleForm: {
        id: 0,
        voucherdate: '', //制证日期
        warehousecode: userInfo.dept.deptId,
        vouchertype: '',//凭证类别ok
        vouchernumber: '',//凭证编号ok
        billnumber: '',//原单据号ok
        businessdate: '',//凭证日期ok
        resourceusage: '',//来源/用途ok
        // unitList: [],//单位/部门
        unitname: '',//单位/部门名称ok
        unitcode: '',//单位/部门编码ok
        checkoutmonth: 0,
        purphaseperson: '',//业务员ok
        operator: userInfo.userName,//制证人ok
        summary: '',//摘要
        manager: userInfo.userName,//主管ok
        userName: userInfo.userName,//用户
        eabc00List: [],// 库存凭证明细信息
        eaba00List: [],// 库存余额信息
      },
      ruleForm1:{
        itemcode: '',//物料编码
        itemname: '',//物料名称
        inventoryprice: '',//库存单价
        inventoryquant: '',//库存数量
        inventorymoney: '',//库存金额
        allocation: '',//已分配量
        inputquant: '',//入库数量
        totalinputquant: '',//累计入库数量
        inputmoney: '',//入库金额
        totalinputmoney: '',//累计入库金额
        outputquant: '',//出库数量
        totaloutputquant: '',//累计出库数量
        outputmoney: '',//出库金额
        totaloutputmoney: '',//累计出库金额
        time: '',//时间
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
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()  ;
        }
      },
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
      rules: {}
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
      console.log(time,"kkkkj");
      let time1 = dateToString(time);
      let time2 = datetomonth(time1);
      console.log(time2,"time2");
      this.time = time1;
      console.log(this.time, 'this.time');

    },
    changeset1(e) {
      console.log(e, 'e');
      switch (e) {
        case 'this.ruleform.vouchertype =1':
          this.getNowList();
          console.log(this.vouchertype1, "this.vouchertype");
          console.log("当月凭证")
          break;
        case 'this.ruleform.vouchertype =2':
          this.getHistoryList();
          console.log("历史凭证")
          break;
      }

    },
    //凭证类别切换
    changeset(e) {
      console.log(this.vouchertype1, 'this.ruleForm.vouchertype');
      if(this.vouchertype1 =='1'){
        console.log(e, 'e');
        switch (e) {
          //入库
          case "0100":
            this.getList();
            this.daterangeBusinessdate = [];
            this.queryParams.vouchernumber = "";
            break;
          //出库
          case "0200":
            this.getList();
            this.daterangeBusinessdate = [];
            this.queryParams.vouchernumber = "";
            break;
          case "0300":
            this.getList();
            this.daterangeBusinessdate = [];
            this.queryParams.vouchernumber = "";
            break;
          case "0400":
            this.getList();
            this.daterangeBusinessdate = [];
            this.queryParams.vouchernumber = "";
            break;
        }
      }else if(this.vouchertype1='2'){
        console.log(e, 'e');
        switch (e) {
          //入库
          case "0100":
            this.historyAccountList();
            this.daterangeBusinessdate = [];
            this.queryParams.vouchernumber = "";
            break;
          //出库
          case "0200":
            this.historyAccountList();
            this.daterangeBusinessdate = [];
            this.queryParams.vouchernumber = "";
            break;
          case "0300":
            this.historyAccountList();
            this.daterangeBusinessdate = [];
            this.queryParams.vouchernumber = "";
            break;
          case "0400":
            this.historyAccountList();
            this.daterangeBusinessdate = [];
            this.queryParams.vouchernumber = "";
            break;
        }
      }

    },

    getSummaries1(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
        }
        // 指定一个或者多个你需要计算的列
        else if (index === 4 || index === 6 || index === 8) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                // 保存了两位小数点
                return Math.floor((prev + curr) * 100) / 100;
              } else {
                // 保存了两位小数点
                return Math.floor(prev * 100) / 100;
              }
            }, 0)
          } else {
            sums[index] = ''
          }
        } else {
          sums[index] = ''
        }
      })
      // if(this.tableData[0].saleunitquant!=null){
      //   sums[4] = parseFloat(sums[4]).toFixed(2);
      //   sums[6] = parseFloat(sums[6]).toFixed(2);
      //   sums[8] = parseFloat(sums[8]).toFixed(2);
      // }
      return sums
    },
    toAnswer(val){
      this.currentRow1 = val;
      this.getTime();
      selectDetailFromEaba00(removeSpace(this.currentRow1.itemcode),userInfo.dept.deptId).then(res =>{
        console.log(res, 'reseaba00111');
        console.log(this.time, 'time');
        // this.ruleForm1 = res.rows;
        this.ruleForm1.itemcode = removeSpace(res.rows[0].itemcode);
        this.ruleForm1.itemname = res.rows[0].itemname;
        this.ruleForm1.inventoryprice = res.rows[0].inventoryprice;
        this.ruleForm1.inventorymoney = res.rows[0].inventorymoney;
        this.ruleForm1.inventoryquant = res.rows[0].inventoryquant;
        this.ruleForm1.allocation = res.rows[0].allocation;
        this.ruleForm1.inputquant = res.rows[0].inputquant;
        this.ruleForm1.totalinputquant = res.rows[0].totalinputquant;
        this.ruleForm1.inputmoney =res.rows[0].inputmoney;
        this.ruleForm1.totalinputmoney =res.rows[0].totalinputmoney;
        this.ruleForm1.outputquant = res.rows[0].outputquant;
        this.ruleForm1.totaloutputquant = res.rows[0].totaloutputquant;
        this.ruleForm1.outputmoney = res.rows[0].outputmoney;
        this.ruleForm1.totaloutputmoney = res.rows[0].totaloutputmoney;
        this.ruleForm1.time = this.time;
      });
    },
    handleCurrentChangeDetail(val) {
      this.currentRow1 = val;
      console.log(this.currentRow1, 'this.currentRow1');
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
    // selectRow(val) {
    //   this.selectlistRow = val;
    //   this.multiple = !val.length
    // },
    //取消
    cancel() {
      this.bcxxopen = false;
      this.tableData1= [];
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
      this.multiple = !row.length
    },
    //根据凭证便号，凭证类别，库房编号查询历史eabbh0凭证
    getHistoryList(){
      this.loading = true;
      this.queryParams.params = {};
      this.vouchertype1 = '2';
      if (null != this.daterangeBusinessdate && '' !== this.daterangeBusinessdate) {
        this.queryParams.params["beginBusinessdate"] = this.daterangeBusinessdate[0];
        this.queryParams.params["endBusinessdate"] = this.daterangeBusinessdate[1];
        //this.queryParams.params["endBusinessdate"] = this.daterangeBusinessdate[1].replace(/\s+/g, "").substring(0, 10) + " 23:59:59";
      }
      listEabbh0Byvoucher(this.queryParams).then(res => {
          console.log(res, 'reshistory');
          console.log(res.total, 'res.total');
          this.historyAccountList = res.rows;
          this.total1 = res.total;
          console.log(this.total1, 'this.total1');
          this.loading = false;
      });
    },
    //根据凭证便号，凭证类别，库房编号查询当月eabb00凭证
    getNowList(){
      console.log(this.vouchertype1, "this.vouchertype");
      this.queryParams.params = {};
      console.log(this.daterangeBusinessdate, 'this.daterangeBusinessdate');
      if (null != this.daterangeBusinessdate && '' !== this.daterangeBusinessdate) {
        this.queryParams.params["beginBusinessdate"] = this.daterangeBusinessdate[0];
        this.queryParams.params["endBusinessdate"] = this.daterangeBusinessdate[1];
        //this.queryParams.params["endBusinessdate"] = this.daterangeBusinessdate[1].replace(/\s+/g, "").substring(0, 10) + " 23:59:59";
      }
      listeabb00Byvoucher(this.queryParams).then(res => {
        console.log(res, 'res点击第二页');
          this.historyAccountList = res.rows;
          // this.vouchertype1 = '3';
          this.total = res.total;
          this.loading = false;
      });
    },
    getNowList1(){
      this.vouchertype1 ='3';
      console.log(this.vouchertype1, "this.vouchertype");
      this.queryParams.params = {};
      console.log(this.daterangeBusinessdate, 'this.daterangeBusinessdate');
      if (null != this.daterangeBusinessdate && '' !== this.daterangeBusinessdate) {
        this.queryParams.params["beginBusinessdate"] = this.daterangeBusinessdate[0];
        this.queryParams.params["endBusinessdate"] = this.daterangeBusinessdate[1];
        //this.queryParams.params["endBusinessdate"] = this.daterangeBusinessdate[1].replace(/\s+/g, "").substring(0, 10) + " 23:59:59";
      }
      listeabb00Byvoucher(this.queryParams).then(res => {
        console.log(res, 'res点击第二页');
        this.historyAccountList = res.rows;
        // this.vouchertype1 = '3';
        this.total3 = res.total;
        this.loading = false;
      });
    },
    /** 查询当月凭证列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      this.vouchertype1 = '1';
      if (null != this.daterangeBusinessdate && '' !== this.daterangeBusinessdate) {
        this.queryParams.params["beginBusinessdate"] = this.daterangeBusinessdate[0];
        this.queryParams.params["endBusinessdate"] = this.daterangeBusinessdate[1];
      }
      Listeabb00(this.queryParams).then(response => {
        this.historyAccountList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getListHistory() {
      this.loading = true;
      this.queryParams.params = {};
      this.vouchertype1 = '2';
      if (null != this.daterangeBusinessdate && '' !== this.daterangeBusinessdate) {
        this.queryParams.params["beginBusinessdate"] = this.daterangeBusinessdate[0];
        this.queryParams.params["endBusinessdate"] = this.daterangeBusinessdate[1];
        //this.queryParams.params["endBusinessdate"] = this.daterangeBusinessdate[1].replace(/\s+/g, "").substring(0, 10) + " 23:59:59";
      }
      listEabbh0Byvoucher(this.queryParams).then(response => {
        this.historyAccountList = response.rows;
        this.total1 = response.total;
        this.loading = false;
      });
    },
    /** 历史凭证查询 */
    HistoryAccounting() {
      this.loading = true;
      this.vouchertype1 = '2';
      this.queryParams.params = {};
      if (null != this.daterangeBusinessdate && '' !== this.daterangeBusinessdate) {
        this.queryParams.params["beginBusinessdate"] = this.daterangeBusinessdate[0];
        this.queryParams.params["endBusinessdate"] = this.daterangeBusinessdate[1];
      }
      listEabbh0(this.queryParams).then(response => {
        console.log(response.total, '总条数');
        this.historyAccountList = response.rows;
        this.total1 = response.total;
        this.loading = false;
      });
      this.tableData = [];
      this.queryParams.vouchertype = "";
      this.queryParams.vouchernumber = "";
      this.daterangeBusinessdate = [];
    },
    getList2(row) {
      this.loading1 = true;
      getHistoryAccountDetailList(row).then(res => {
        this.loading1 = false;
        console.log(res, 'res');
        this.tableData = res;
        for (let i = 0; i < res.length; i++) {
          //数量
          this.tableData[i].saleunitquant = res[i].businessquant;
          //单价
          this.tableData[i].inventoryprice = res[i].realprice;
        }

      }).catch(() => {
        this.loading1 = false;
      })
    },

    /** 凭证主表点击行查询主表明细 */
    getDetailHistoryAccountList(row) {
      this.tableData1 = [];
      console.log(this.vouchertype1, "row.vouchertype11111");
      if (this.vouchertype1 === '1') {
         this.getList1(row);
        getEabcVO(row).then(res => {
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

      } else if (this.vouchertype1 === '2') {
        this.getList2(row);
        getHistoryAccountDetailList(row).then(res => {
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
      }else if(this.vouchertype1 ==='3'){
        getEabcVO(row).then(res => {
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
      console.log(this.ruleForm.vouchertype, "this.ruleForm.vouchertype");
        if (this.ruleForm.vouchertype === "出库凭证") {
          let LODOP = getLodop(); //调用getLodop获取LODOP对象
          LODOP.PRINT_INITA(1, -1, 800, 600, "");
          LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
          LODOP.PRINT_INITA(1, 0, 800, 600, "");
          LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");

//长方形表格
          LODOP.ADD_PRINT_RECT(157, 2, 751, 265, 0, 1);
          LODOP.ADD_PRINT_LINE(157, 135, 422, 136, 0, 1);
          LODOP.ADD_PRINT_LINE(157, 240, 422, 241, 0, 1);
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
          LODOP.ADD_PRINT_TEXT(159, 526, 64, 10, "金额");
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(159, 618, 100, 20, "摘要");
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

//物料编号
          for (let i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 2, 133, 10, this.tableData1[i].itemcode);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }
          console.log(this.tableData1.length - 2, "this.tableData.length-2")
          for (let j = 0; j < 8; j++) {
            console.log(j, "j")
            LODOP.ADD_PRINT_LINE(200 + j * 20, 2, 199 + j * 20, 752, 0, 1);
          }

//物料名称
          for (var i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(179 + i * 20, 136, 100, 10, this.tableData1[i].itemname);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }

// 规格型号
          for (let i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 241, 135, 10, this.tableData1[i].model);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }
// 数量
          console.log(this.tableData1.length, 'this.tableData.length');
          for (let i = 0; i < this.tableData1.length; i++) {
            let saleunitquant = parseFloat(this.tableData1[i].saleunitquant).toFixed(2);
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 340, 70, 26, saleunitquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }
// 单位
          for (let i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 412, 25, 20, this.tableData1[i].unit);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }

// 单价
          for (let i = 0; i < this.tableData1.length; i++) {
            let inventoryprice = parseFloat(this.tableData1[i].inventoryprice).toFixed(2);
            LODOP.ADD_PRINT_TEXT(179 + i * 23, 446, 80, 20, inventoryprice);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }
// 金额
          for (let i = 0; i < this.tableData1.length; i++) {
            let businessmoney = parseFloat(this.tableData1[i].businessmoney).toFixed(2);
            LODOP.ADD_PRINT_TEXT(179 + i * 23, 520, 75, 20, businessmoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }
// 摘要
          for (let i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(179 + i * 23, 594, 90, 10, this.tableData1[i].summary);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }

// 小计
          LODOP.ADD_PRINT_TEXT(404, 16, 70, 30, "小计");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(404, 528, 69, 30, this.sumMoney);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(404, 358, 63, 30,  this.sumQuant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

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

          LODOP.ADD_PRINT_TEXT(476, 29, 443, 20, "白联-保管  黄联-财务  红联-材料会计  绿联-供应商/用料单位");
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

// 制证日期，制证人，制证人签，领料人签，单位主管签横线
          LODOP.ADD_PRINT_LINE(460, 93, 459, 163, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 93, 100, 20, this.ruleForm.voucherdate);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(461, 225, 460, 285, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 225, 100, 20, this.ruleForm.operator);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(460, 383, 459, 443, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 383, 100, 20, this.ruleForm.operator);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(460, 528, 459, 588, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 528, 100, 20, "暂时为空");
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(460, 692, 459, 752, 0, 1);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          //凭证类别，凭证编号，来源用途，单据号，单位部门，摘要
          LODOP.ADD_PRINT_TEXT(57, 106, 100, 20, this.ruleForm.vouchertype);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(54, 274, 100, 20, this.ruleForm.vouchernumber);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(54, 478, 100, 20, this.ruleForm.resourceusage);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(54, 637, 100, 20, this.ruleForm.billnumber);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(89, 139, 213, 20, this.ruleForm.unitname);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(18, 258, 100, 20, this.ruleForm.summary);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
          LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
          LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
          LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
          LODOP.PREVIEW(); //预览(预览打印无脚标)
          // LODOP.PRINT(); //打印
        } else if (this.ruleForm.vouchertype == "入库凭证") {
          let LODOP = getLodop(); //调用getLodop获取LODOP对象
          LODOP.PRINT_INITA(1, -1, 800, 600, "");
          LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
          LODOP.PRINT_INITA(1, 0, 800, 600, "");
          LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");

//长方形表格
          LODOP.ADD_PRINT_RECT(157, 2, 751, 265, 0, 1);
          LODOP.ADD_PRINT_LINE(157, 135, 422, 136, 0, 1);
          LODOP.ADD_PRINT_LINE(157, 240, 422, 241, 0, 1);
          LODOP.ADD_PRINT_LINE(157, 336, 422, 337, 0, 1);
          LODOP.ADD_PRINT_LINE(157, 411, 422, 412, 0, 1);
          LODOP.ADD_PRINT_LINE(157, 446, 422, 447, 0, 1);
          LODOP.ADD_PRINT_LINE(158, 526, 423, 527, 0, 1);
          LODOP.ADD_PRINT_LINE(157, 596, 422, 597, 0, 1);
          LODOP.ADD_PRINT_LINE(178, 2, 179, 752, 0, 1);
          LODOP.ADD_PRINT_LINE(372, 2, 371, 752, 0, 1);
          LODOP.ADD_PRINT_LINE(395, 2, 394, 752, 0, 1);
          LODOP.ADD_PRINT_LINE(422, 2, 421, 753, 0, 1);

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
          for (let i = 0; i < this.tableData.length; i++) {
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 2, 133, 10, this.tableData[i].itemcode);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }
          console.log(this.tableData.length - 2, "this.tableData.length-2")
          for (let j = 0; j < 8; j++) {
            console.log(j, "j")
            LODOP.ADD_PRINT_LINE(200 + j * 20, 2, 199 + j * 20, 752, 0, 1);
          }

//物料名称
          for (var i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(179 + i * 20, 136, 100, 10, this.tableData1[i].itemname);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }

// 规格型号
          for (let i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 241, 135, 10, this.tableData1[i].model);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }
// 数量
          console.log(this.tableData1.length, 'this.tableData.length');
          for (let i = 0; i < this.tableData1.length; i++) {
            let saleunitquant = parseFloat(this.tableData1[i].saleunitquant).toFixed(2)
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 340, 70, 26, saleunitquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }
// 单位
          for (let i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 412, 25, 20, this.tableData1[i].unit);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }

// 单价
          for (let i = 0; i < this.tableData1.length; i++) {
            let inventoryprice = parseFloat(this.tableData1[i].inventoryprice).toFixed(2)
            LODOP.ADD_PRINT_TEXT(179 + i * 23, 446, 80, 20, inventoryprice);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }
// 金额
          for (let i = 0; i < this.tableData1.length; i++) {
            let businessmoney = parseFloat(this.tableData1[i].businessmoney).toFixed(2)
            LODOP.ADD_PRINT_TEXT(179 + i * 23, 520, 75, 20, businessmoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }
// 摘要
          for (let i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(179 + i * 23, 594, 100, 10, this.tableData1[i].summary);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }

// 小计
          LODOP.ADD_PRINT_TEXT(404, 16, 70, 30, "小计");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(404, 528, 69, 30,this.sumMoney );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(404, 358, 63, 30,  this.sumQuant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

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
          LODOP.ADD_PRINT_TEXT(440, 297, 105, 20, "制证人(签)");
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(440, 453, 106, 20, "业务员(签)");
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(440, 604, 125, 20, "材料会计(签)");
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

          LODOP.ADD_PRINT_TEXT(476, 29, 443, 20, "白联-保管  黄联-财务  红联-材料会计  绿联-供应商/用料单位");
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

// 制证日期，制证人，制证人签，业务员签，财务会计签横线
          LODOP.ADD_PRINT_LINE(460, 93, 459, 163, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 93, 100, 20, this.ruleForm.voucherdate);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(461, 225, 460, 285, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 225, 100, 20, this.ruleForm.operator);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(460, 383, 459, 443, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 383, 100, 20, this.ruleForm.operator);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(460, 528, 459, 588, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 528, 100, 20, this.ruleForm.purphaseperson);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(460, 692, 459, 752, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 692, 100, 20,);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(57, 106, 100, 20, this.ruleForm.vouchertype);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(54, 274, 100, 20, this.ruleForm.vouchernumber);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(54, 478, 100, 20, this.ruleForm.resourceusage);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(54, 637, 100, 20, this.ruleForm.billnumber);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(89, 139, 213, 20, this.ruleForm.unitname);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(18, 258, 100, 20,  this.ruleForm.summary);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
          LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
          LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
          LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
          LODOP.PREVIEW(); //预览(预览打印无脚标)
          // LODOP.PRINT(); //打印
        } else if (this.ruleForm.vouchertype == "退货凭证") {
          let LODOP = getLodop(); //调用getLodop获取LODOP对象
          LODOP.PRINT_INITA(1, -1, 800, 600, "");
          LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
          LODOP.PRINT_INITA(1, 0, 800, 600, "");
          LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");

//长方形表格
          LODOP.ADD_PRINT_RECT(157, 2, 751, 265, 0, 1);
          LODOP.ADD_PRINT_LINE(157, 135, 422, 136, 0, 1);
          LODOP.ADD_PRINT_LINE(157, 240, 422, 241, 0, 1);
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
          //物料编号
          for (let i = 0; i < this.tableData.length; i++) {
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 2, 133, 10, this.tableData[i].itemcode);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }
          console.log(this.tableData.length - 2, "this.tableData.length-2")
          for (let j = 0; j < 8; j++) {
            console.log(j, "j")
            LODOP.ADD_PRINT_LINE(200 + j * 20, 2, 199 + j * 20, 752, 0, 1);
          }

//物料名称
          for (var i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(179 + i * 20, 136, 100, 10, this.tableData1[i].itemname);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }

// 规格型号
          for (let i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 241, 135, 10, this.tableData1[i].model);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }
// 数量
          console.log(this.tableData1.length, 'this.tableData.length');
          for (let i = 0; i < this.tableData1.length; i++) {
            let saleunitquant = parseFloat(this.tableData1[i].saleunitquant).toFixed(2)
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 340, 70, 26, saleunitquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }
// 单位
          for (let i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 412, 25, 20, this.tableData1[i].unit);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }

// 单价
          for (let i = 0; i < this.tableData1.length; i++) {
            let inventoryprice = parseFloat(this.tableData1[i].inventoryprice).toFixed(2)
            LODOP.ADD_PRINT_TEXT(179 + i * 23, 446, 80, 20, inventoryprice);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }
// 金额
          for (let i = 0; i < this.tableData1.length; i++) {
            let businessmoney = parseFloat(this.tableData1[i].businessmoney).toFixed(2)
            LODOP.ADD_PRINT_TEXT(179 + i * 23, 520, 75, 20, businessmoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }
// 摘要
          for (let i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(179 + i * 23, 594, 100, 10, this.tableData1[i].summary);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }

// 小计
          LODOP.ADD_PRINT_TEXT(404, 16, 70, 30, "小计");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(404, 528, 69, 30, this.sumMoney);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(404, 358, 63, 30,  this.sumQuant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

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

          LODOP.ADD_PRINT_TEXT(476, 29, 443, 20, "白联-保管  黄联-财务  红联-材料会计  绿联-供应商/用料单位");
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

// 制证日期，制证人，制证人签，领料人签，单位主管签横线
          LODOP.ADD_PRINT_LINE(460, 93, 459, 163, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 93, 100, 20, this.ruleForm.voucherdate);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(461, 225, 460, 285, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 225, 100, 20, this.ruleForm.operator);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(460, 383, 459, 443, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 383, 100, 20, this.ruleForm.operator);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(460, 528, 459, 588, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 528, 100, 20, "暂时为空");
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(460, 692, 459, 752, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 692, 100, 20, this.ruleForm.manager);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(57, 106, 100, 20, this.ruleForm.vouchertype);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(54, 274, 100, 20, this.ruleForm.vouchernumber);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(54, 478, 100, 20, this.ruleForm.resourceusage);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(54, 637, 100, 20, this.ruleForm.billnumber);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(89, 139, 213, 20, this.ruleForm.unitname);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(18, 258, 100, 20,  this.ruleForm.summary);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
          LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
          LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
          LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
          LODOP.PREVIEW(); //预览(预览打印无脚标)
          // LODOP.PRINT(); //打印
        } else if (this.ruleForm.vouchertype == "调账凭证") {
          let LODOP = getLodop(); //调用getLodop获取LODOP对象
          LODOP.PRINT_INITA(1, -1, 800, 600, "");
          LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
          LODOP.PRINT_INITA(1, 0, 800, 600, "");
          LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");

//长方形表格 竖线
          LODOP.ADD_PRINT_RECT(157, 2, 751, 265, 0, 1);
          LODOP.ADD_PRINT_LINE(157, 135, 422, 136, 0, 1);
          LODOP.ADD_PRINT_LINE(157, 240, 422, 241, 0, 1);
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
          for (let i = 0; i < this.tableData.length; i++) {
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 2, 133, 10, this.tableData[i].itemcode);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }
          console.log(this.tableData.length - 2, "this.tableData.length-2")
          for (let j = 0; j < 8; j++) {
            console.log(j, "j")
            LODOP.ADD_PRINT_LINE(200 + j * 20, 2, 199 + j * 20, 752, 0, 1);
          }

//物料名称
          for (var i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(179 + i * 20, 136, 100, 10, this.tableData1[i].itemname);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }

// 规格型号
          for (let i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 241, 135, 10, this.tableData1[i].model);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          }
// 数量
          console.log(this.tableData1.length, 'this.tableData.length');
          for (let i = 0; i < this.tableData1.length; i++) {
            let saleunitquant = parseFloat(this.tableData1[i].saleunitquant).toFixed(2)
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 340, 70, 26, saleunitquant);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }
// 单位
          for (let i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(180 + i * 20, 412, 25, 20, this.tableData1[i].unit);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }

// 单价
          for (let i = 0; i < this.tableData1.length; i++) {
            let inventoryprice = parseFloat(this.tableData1[i].inventoryprice).toFixed(2)
            LODOP.ADD_PRINT_TEXT(179 + i * 23, 446, 80, 20, inventoryprice);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }
// 金额
          for (let i = 0; i < this.tableData1.length; i++) {
            let businessmoney = parseFloat(this.tableData1[i].businessmoney).toFixed(2)
            LODOP.ADD_PRINT_TEXT(179 + i * 23, 520, 75, 20, businessmoney);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }
// 摘要
          for (let i = 0; i < this.tableData1.length; i++) {
            LODOP.ADD_PRINT_TEXT(179 + i * 23, 594, 80, 10, this.tableData1[i].summary);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
          }

// 小计
          LODOP.ADD_PRINT_TEXT(404, 16, 70, 30, "小计");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(404, 528, 69, 30,  this.sumMoney);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.ADD_PRINT_TEXT(404, 358, 63, 30,   this.sumQuant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

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

          LODOP.ADD_PRINT_TEXT(476, 29, 443, 20, "白联-保管  黄联-财务  红联-材料会计  绿联-供应商/用料单位");
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

// 制证日期，制证人，制证人签，领料人签，单位主管签横线
          LODOP.ADD_PRINT_LINE(460, 93, 459, 163, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 93, 100, 20, this.ruleForm.voucherdate);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(461, 225, 460, 285, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 225, 100, 20, this.ruleForm.operator);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(460, 383, 459, 443, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 383, 100, 20, this.ruleForm.operator);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(460, 528, 459, 588, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 528, 100, 20, "暂时为空");
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_LINE(460, 692, 459, 752, 0, 1);
          LODOP.ADD_PRINT_TEXT(440, 692, 100, 20, this.ruleForm.manager);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(57, 106, 100, 20, this.ruleForm.vouchertype);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(54, 274, 100, 20, this.ruleForm.vouchernumber);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(54, 478, 100, 20, this.ruleForm.resourceusage);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(54, 637, 100, 20, this.ruleForm.billnumber);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(89, 139, 213, 20, this.ruleForm.unitname);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(18, 258, 100, 20, this.ruleForm.summary);
          LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
          LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
          LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
          LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
          LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
          LODOP.PREVIEW(); //预览(预览打印无脚标)
        }
        LODOP.PRINT(); //打印
      },

    //当月账务点击行查询
    getList1(row) {
      // this.loading1 = true;
      getEabcVO(row).then(res => {
        //this.loading1 = false;
        this.tableData = res;
        console.log(res, '明细表');
      }).catch(() => {
        this.loading1 = false;
      })
    },
    //选择eabb00的行高亮
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log(this.currentRow, "主表")
      if (this.vouchertype1 === '1') {
        if (this.currentRow.vouchertype === "0100") {
          this.ruleForm.vouchertype = "入库凭证";
        } else if (this.currentRow.vouchertype === "0200") {
          this.ruleForm.vouchertype = "出库凭证"
        } else if (this.currentRow.vouchertype === "0300") {
          this.ruleForm.vouchertype = "退货凭证"
        } else if (this.currentRow.vouchertype === "0400") {
          this.ruleForm.vouchertype = "调账凭证"
        }
        this.ruleForm.vouchernumber = this.currentRow.vouchernumber;
        console.log(this.ruleForm.resourceusage, "资源用途")
        this.ruleForm.resourceusage = this.currentRow.resourceusage;
        this.ruleForm.billnumber = this.currentRow.billnumber;
        this.ruleForm.unitname = this.currentRow.unitname;

        console.log(this.ruleForm.unitname, "单位名称");
        console.log(this.currentRow.voucherdate, "日期");
        this.ruleForm.summary = this.currentRow.summary;
        this.ruleForm.purphaseperson = this.currentRow.purphaseperson;
        this.ruleForm.voucherdate = this.currentRow.voucherdate;
        this.ruleForm.operator = this.currentRow.operator;

      } else if (this.vouchertype1 === '2') {
        if (this.currentRow.vouchertype === "0100") {
          this.ruleForm.vouchertype = "入库凭证";
        } else if (this.currentRow.vouchertype === "0200") {
          this.ruleForm.vouchertype = "出库凭证"
        } else if (this.currentRow.vouchertype === "0300") {
          this.ruleForm.vouchertype = "退货凭证"
        } else if (this.currentRow.vouchertype === "0400") {
          this.ruleForm.vouchertype = "调账凭证"
        }
        if (this.currentRow.resourceusage === "00" && this.currentRow.vouchertype === "0100") {
          this.ruleForm.resourceusage = "外购"
          this.historyAccountList.resourceusage = "外购"
        } else if (this.currentRow.resourceusage === "13" && this.currentRow.vouchertype === "0200") {
          this.ruleForm.resourceusage = "生产用"
        } else if (this.currentRow.resourceusage === "21" && this.currentRow.vouchertype === "0200") {
          this.ruleForm.resourceusage = "其他"
        } else if (this.currentRow.resourceusage === "40" && this.currentRow.vouchertype === "0300") {
          this.ruleForm.resourceusage = "外购"
        } else if (this.currentRow.resourceusage === "50" && this.currentRow.vouchertype === "0400") {
          this.ruleForm.resourceusage = "盘盈"
        } else if (this.currentRow.resourceusage === "51" && this.currentRow.vouchertype == "0400") {
          this.ruleForm.resourceusage = "盘亏"
        }
        this.ruleForm.vouchernumber = this.currentRow.vouchernumber;
        this.ruleForm.billnumber = this.currentRow.billnumber;
        this.ruleForm.unitname = this.currentRow.unitname;
        this.ruleForm.resourceusage = this.currentRow.resourceusage;
        console.log(this.ruleForm.unitname, "单位名称");
        this.ruleForm.summary = this.currentRow.summary;
        this.ruleForm.purphaseperson = this.currentRow.purphaseperson;
        this.ruleForm.voucherdate = this.currentRow.voucherdate;
        this.ruleForm.operator = this.currentRow.operator;
        this.ruleForm1.time = datetoyearAndMonth(this.currentRow.businessdate);
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      console.log(this.vouchertype1, "this.vouchertype000000");
      if (this.vouchertype1 === '1' ) {
        this.getNowList();
      } else if (this.vouchertype1 == '2') {
        //console.log(this.vouchertype1, "this.vouchertype2");
        this.getHistoryList();
      }

    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeBusinessdate = [];
      this.queryParams.vouchernumber = null;
      this.queryParams.vouchertype = "";
      console.log(this.vouchertype1, "this.vouchertype");
      if(this.vouchertype1 === '1') {
        this.getList();
        this.vouchertype1 = '1';
      } else if(this.vouchertype1 === '2') {
        this.HistoryAccounting();
      }
    },
    /**库存余额查询*/
    QueryBalance(val) {
      this.open1 = true;
      this.title1 = "库存余额查询";
      if (this.vouchertype1 === '1') {
        handleCurrentChangeDetail()
        console.log("aaaaaaaaaaaaaaaaaa")
      }

    },
    /**凭证查询*/
    QueryVocuher() {
      this.open = true;
    },

    /**当月凭证查询*/
    CurrentMonthAccounting() {
      this.loading = false;
      this.vouchertype1 = '1';
      console.log(this.vouchertype1, "this.vouchertype1");
      this.queryParams.params = {};
      Listeabb00(this.queryParams).then(response => {
        this.historyAccountList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      this.tableData = [];
      this.queryParams.vouchertype = "";
      this.queryParams.vouchernumber = "";
      this.daterangeBusinessdate = [];
    },
    // 合计
    getSummaries(param) {
      const {columns, data} = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
        }
          // index >= 3 || index <= 11 是你需要计算的列
          // 当然也可以指定一个或者多个列
        // index === 2 || index === 3 这样值求和第二个与第三个列
        else if (index === 4 || index === 6) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                // 保存了两位小数点
                return Math.floor((prev + curr) * 100) / 100;
              } else {
                // 保存了两位小数点
                return Math.floor(prev * 100) / 100;
              }
            }, 0)
          } else {
            sums[index] = ''
          }
        } else {
          sums[index] = ''
        }
      })
      console.log(sums, 'sums');
      console.log(sums[4], 'sums4');
      console.log(sums[6], 'sums6');
      //查看sums[4]的类型
      console.log(typeof sums[4], 'typeof sums[4]');
      this.sumQuant = sums[4];
      this.sumQuant = parseFloat(sums[4]).toFixed(2);
      sums[4] = parseFloat(sums[4]).toFixed(2);
      console.log(this.sumQuant, 'this.sumQuant');
      this.sumMoney = parseFloat(sums[6]).toFixed(2);
      sums[6] = parseFloat(sums[6]).toFixed(2);
      /**把shis.sumMoney保存两位小数点 */
      // this.sumQuant = this.sumQuant.toFixedNumber(2);
      // this.sumMoney = this.sumMoney.toFixedNumber(2);
      return sums
    },

  }
};

</script>

<style scoped>
.el-tabletest /deep/ .cell {
  padding: 0px;
  padding-bottom: 0px;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  line-height: 15px;
  height: 30px;
}
.el-table__header-wrapper tbody td.el-table__cell, .el-table__footer-wrapper tbody td.el-table__cell{
  padding: 0px;
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
  padding: 0px;
  padding-top: 0px;
  padding-left: 0px;
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


::v-deep .el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
  font-size: larger;
}
.el-table--enable-row-transition /deep/ .el-table__body td.el-table__cell{
  padding: 0px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #3723e8;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-table /deep/.cell{
  padding: 0px;
  /*text-align: right;*/
  line-height: 26px;
}

.el-table1 /deep/.cell{
  padding: 0px;
}
.el-table /deep/ .el-table__cell.is-center{
  padding: 0px;
  padding-left: 0px;
  /*padding-right: 0px;*/
}
.app-containerdiv {
  width: 1150px;
  padding: 15px;
  /*el-form禁止随着界面放大缩小而放大缩小*/
  overflow: hidden;
  border: #1e1e1e solid 1px;
}
.el-input /deep/ .el-input__inner{
  padding: 0px;
  padding-left: 2px;
  padding-right: 0px;

}
.el-input-number /deep/ .el-input__inner{
  padding: 0px;
  padding-left: 0px;
  padding-right: 0px;
  text-align: right;
}
.el-from111 /deep/ .el-form-item__content{
  width: 100%;
}
el-table__header-wrapper tbody td.el-table__cell, .el-table__footer-wrapper tbody td.el-table__cell{
  padding: 0px;
}

</style>

