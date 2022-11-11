<template xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
  <div class="app-container">
  <div class="app-containerdiv" >

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <div>
        <el-col :span="1.5">
        <el-dropdown>
                <span class="el-dropdown-link">
                <el-button  type="primary" plain size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
                </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-cascader-panel
                ref="cascader"
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                @blur="handleFocus1"
                @focus="handleFocus"
                @change="handleChange"></el-cascader-panel>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </el-col>
      </div>
    </el-row>
    <el-table v-loading="loading" :data="eabh00List" @selection-change="handleSelectionChange"
              @row-click="handleRowClick"   highlight-current-row @current-change="handleCurrentChange"
              class="el-tabletest" >
      <af-table-column label="盘点单号" align="center" prop="vouchernumber"  width="100px"/>
      <af-table-column label="盘点类型" align="center" prop="voucherType"   width="120px">
        <template slot-scope="scope">
          <span >{{
              scope.row.voucherType !== 0 ?
                scope.row.voucherType !== 1 ?
                  scope.row.voucherType !== 2 ?  scope.row.voucherType : "批号盘点"
                  : "库位盘点"
                : "普通盘点"
                }}
          </span>
        </template>
      </af-table-column>
      <af-table-column label="盘点日期" align="center" prop="checkdate"  width="100px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.checkdate, '{y}-{m}-{d}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="制证日期" align="center" prop="voucherdate"  width="100px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.voucherdate, '{y}-{m}-{d}') }}</span>
        </template>
      </af-table-column>
      <af-table-column label="制证人" align="center" prop="operator"  width="100px"/>
      <af-table-column label="摘要" align="center" prop="summary"  width="200px"/>
      <af-table-column label="调整标志" align="center" prop="flag"  width="100px">
        <template slot-scope="scope">
          <span >{{
              scope.row.flag !== "0" ? scope.row.flag : "未生成调帐单"
              }}
          </span>
        </template>
      </af-table-column>
    </el-table>
<div class="app-containerdiv1">
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  <br/>
</div>
  </div>
    <br/>
    <div class="app-containerdiv" with="1500px" >
      <el-form
        ref="ruleForm"
        :model="ruleForm" label-width="75px" :inline="true">
        <h1  style="text-align: center;display:block" class="el-dialog__title">山西华宁焦煤有限责任公司
          {{ deptName }}  盘点表</h1>

        <el-form-item label="制表人:" prop="operator">
          <el-input v-model="ruleForm.operator"  size="mini"  readonly :style="{ width: '100%' }"></el-input>
        </el-form-item>
        <el-form-item label="盘点日期:" prop="voucherdate" >
          <el-date-picker v-model="ruleForm.voucherdate" type="date" size="mini" readonly :style="{ width: '120%' }"
                          format="yyyy-MM-dd"  value-format="yyyy-MM-dd"  >
          </el-date-picker>
        </el-form-item>

      </el-form>
      <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange"
                 class="el-table1" height="800">
        <el-table-column label="物料编号" align="center" prop="itemcode" />
        <el-table-column label="物料名称" align="center" prop="itemname" />
        <el-table-column label="规格型号" align="center" prop="model" />
        <el-table-column label="单位" align="center" prop="unit" />
        <el-table-column label="账面" align="center"  >
          <el-table-column label="数量" align="center" prop="accountquantity" />
          <el-table-column label="金额" align="center" prop="accountmoney" />
        </el-table-column>
        <el-table-column label="实盘" align="center" >
          <el-table-column label="数量" align="center" prop="checkquantity" />
          <el-table-column label="金额" align="center" prop="checkmoney" />
        </el-table-column>
        <el-table-column label="盈(+)亏(-)" align="center" >
          <el-table-column label="数量" align="center" prop="surpluslossquant" />
          <el-table-column label="金额" align="center" prop="surpluslossmoney" />
        </el-table-column>
        <el-table-column label="盘存" align="center">
          <el-table-column label="数量" align="center" prop="factquantity" />
          <el-table-column label="金额" align="center" prop="factmoney" />
        </el-table-column>
        <el-table-column label="未办入库" align="center" >
          <el-table-column label="数量" align="center" prop="lendquantity" />
          <el-table-column label="金额" align="center" prop="lendmoney" />
          <el-table-column label="采购员" align="center" prop="position" />
          <el-table-column label="采购时间" align="center" prop="batchnumber" />
        </el-table-column>
        <el-table-column label="备注" align="center" prop="summary" />
      </el-table>
<!--      <el-pagination-->
<!--        v-show="total3>0"-->
<!--        :total="total3"-->
<!--        :page.sync="queryParams.pageNum"-->
<!--        :limit.sync="queryParams.pageSize"-->
<!--        @pagination="handleRowClick"></el-pagination>-->
      <br/>
      <el-form>
      <el-form-item label-width="90%" class="el-from111">
        <span>共{{total3}}条</span>
        <br/>
          <el-button
            type="primary"
            @click="handleExport"
            size="mini"
          >导出</el-button>
        <el-button type="primary" @click="dayin"  size="mini">打印</el-button>
      </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="loading2" width="1000px" append-to-body >
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
        <el-form-item label="物料编号" prop="itemcode">
          <el-input v-model="queryParams.itemcode" placeholder="请输入物料编号" clearable
                    @keyup.enter.native="handleQuery"/>
        </el-form-item>
        <el-form-item label="物料名称" prop="itemname">
          <el-input v-model="queryParams.itemname" placeholder="请输入物料名称" clearable
                    @keyup.enter.native="handleQuery"/>
        </el-form-item>
        <el-form-item class="el-from111" >
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

    <el-table ref="multipleTable" v-loading="loading1" :data="materialList" class="el-table22"
              @selection-change="handleSelectionChange1" >
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="物料编码" align="center" prop="itemcode" min-width="120"/>
      <el-table-column label="物料名称" align="center" prop="itemname" min-width="120"/>
      <el-table-column label="规格型号" align="center" prop="model" min-width="100"/>
      <el-table-column label="单位" align="center" prop="unit"/>
      <!--          <el-table-column label="单价" align="center" prop="inventoryprice" min-width="80"/>-->
      <el-table-column label="类型名称" align="center" prop="materialType" min-width="80"/>
    </el-table>
    <pagination
      v-show="total1 > 0"
      :total="total1"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getMaterials"/>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm1">确 定</el-button>
      <el-button @click="cancel1">取 消</el-button>
    </div>
    </el-dialog>

    <!-- 添加或修改库存盘点对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1800px" append-to-body >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules"  :inline="true"  >
        <el-form-item label="盘点表号:" prop="vouchernumber">
          <el-input v-model="ruleForm.vouchernumber"  size="mini"  readonly/>
        </el-form-item>
        <el-form-item label="盘点日期:" prop="checkdate" >
          <el-date-picker v-model="ruleForm.checkdate"  size="mini" placeholder="请选择日期"
                          format="yyyy-MM-dd HH:mm:ss"  :style="{ width: '99%' }"
                          value-format="yyyy-MM-dd HH:mm:ss" readonly>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="盘点类型:" prop="type">
          <el-select v-model="ruleForm.voucherType" placeholder="请选择盘点类型" size="mini" style="width: 100%;">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <br/>
        <el-form-item label="摘要:" prop="summary" >
          <el-input v-model="ruleForm.summary"   :style="{ width: '400%' }" size="mini"></el-input>
        </el-form-item>
      </el-form>
        <el-table  :data="tableData1" @selection-change="handleSelectionChange"  ref="table"
                  border>
          <el-table-column label="物料编号"  align="center" prop="itemcode" width="180px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemcode" readonly><el-button slot="append" @click="search(scope.$index, scope.row)"  icon="el-icon-search" class="searchBtn">
              </el-button></el-input>
            </template>
          </el-table-column>
          <el-table-column label="物料名称" align="center" prop="itemname" width="180px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemname" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="规格型号" align="center" prop="model" width="180px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.model" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位" align="center" prop="unit" width="80px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.unit" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="账面" align="center"  >
            <el-table-column label="数量" align="center" prop="accountquantity" width="120px">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.accountquantity"  :precision="2" :style="{ width: '98%' }" :controls="false"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="金额" align="center" prop="accountmoney" width="120px">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.accountmoney" :style="{ width: '98%' }"  :controls="false"></el-input-number>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="实盘" align="center" >
            <el-table-column label="数量" align="center" prop="checkquantity" width="120px">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.checkquantity" :style="{ width: '98%' }"  :controls="false"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="金额" align="center" prop="checkmoney" width="120px">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.checkmoney" :style="{ width: '98%' }"  :controls="false"></el-input-number>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="盈(+)亏(-)" align="center" >
            <el-table-column label="数量" align="center" prop="surpluslossquant" width="120px">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.surpluslossquant"  :style="{ width: '98%' }" controls-position="left" :disabled="NoPrice" :controls="false"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="金额" align="center" prop="surpluslossmoney" width="120px">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.surpluslossmoney" :style="{ width: '98%' }"  controls-position="left" :disabled="NoPrice" :controls="false"></el-input-number>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="盘存" align="center">
            <el-table-column label="数量" align="center" prop="factquantity" width="120px">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.factquantity" :style="{ width: '98%' }"  :disabled="NoPrice" :controls="false"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="金额" align="center" prop="factmoney" width="120px">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.factmoney" :style="{ width: '98%' }"   :disabled="NoPrice" :controls="false"></el-input-number>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="未办入库" align="center" >
            <el-table-column label="数量" align="center" prop="lendquantity" width="120px">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.lendquantity" :style="{ width: '98%' }"    :controls="false"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="金额" align="center" prop="lendmoney" width="120px">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.lendmoney" :style="{ width: '98%' }"   :controls="false"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="采购员" align="center" prop="position" width="120px" >
              <template slot-scope="scope">
                <el-input v-model="scope.row.position" ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="采购时间" align="center" prop="batchnumber" width="120px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.batchnumber">
                </el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="备注" align="center" prop="summary" width="120px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.summary" ></el-input>
            </template>
          </el-table-column>
        </el-table>
<!--      前端分页-->
<!--      <el-pagination  @current-change="handleCurrentChanges"-->
<!--                    background-->
<!--                   :page-size="everypageNum"-->
<!--                   layout="total,prev, pager, next"-->
<!--                   :total="zsTOTAL"/>-->
<!--自动分页-->
<!--      <pagination-->
<!--        v-show="total2 > 0"-->
<!--        :total="total2"-->
<!--        :page.sync="queryParams.pageNum"-->
<!--        :limit.sync="queryParams.pageSize"-->
<!--        @pagination="handleAdd3"-->
<!--        />-->
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          :inline="true">
          <el-form-item label="制证日期" prop="voucherdate" align="center" >
            <el-date-picker v-model="ruleForm.voucherdate"  size="mini" placeholder="请选择日期"
                            format="yyyy-MM-dd"  value-format="yyyy-MM-dd"  style="width: 90%;" readonly>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="制证人" prop="operator" align="center" >
            <el-input v-model="ruleForm.operator"  readonly size="mini"></el-input>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="add">新增</el-button>
        <el-button size="mini" type="primary" @click="clear1">作 废</el-button>
        <el-button size="mini" type="primary" @click="submitForm2">确 定</el-button>
        <el-button size="mini" type="primary"  @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import Cookies from 'js-cookie';
import {
  listEabh00,
  getEabh00,
  delEabh00,
  addEabh00,
  updateEabh00,
  addEabi00,
  addEabi001, listEabh00MP
} from "../../../api/project/eabh00";
import { getDicts } from "../../../api/system/dict/data";
import {
  getNumber,
  listMaterialByDeptcode,
  listMaterialByDeptcodeNoPage,
  listSummary
} from "../../../api/project/voucher";
import {
  addEabi00List,
  exportEabi00,
  listEabi00,
  updateResult,
  listEabi00MaterialList,
  updateAccountquantity, updateAccountmoney
} from "../../../api/project/eabi00";
//从cookie内获取用户
const userInfo = JSON.parse(Cookies.get("userInfo"));
export default {
  name: "Eabh00",
  data() {
    return {
      ruleForm: {
        id: 0,
        warehousecode: userInfo.dept.deptId,
        vouchernumber: '',//盘点表号
        checkdate: new Date(),//盘点日期
        voucherdate: '',
        voucherType: '',//盘点类
        operator: '',
        summary: '',
        flag: 0,
        checkflag: 0,
        checkoutmonth: 0,
        createTime: new Date(),
        updatetime: new Date(),
        eabi00List: [],
      },
      //根据盘点编号导出
      Inventorynumber : null,

      NumberInventory:0,
      //初始界面盘点表
      tableData: [],
      //弹窗新增盘点表
      tableData1:  [],
      Loadings: true,
      resData:[],
      zsTOTAL:0,
      pageVal :1, //默认显示第一页
      everypageNum :10,//每页显示的条数

      // 遮罩层
      loading: true,
      loading233: false,
      // 产品（物料管理）表格数据
      materialList: [],
      loading1: false,
      loading2: false,
      sysnumber: {
        deptcode: userInfo.dept != null ? userInfo.dept.deptId : "",
        class1: "0800",
      },
      options: [{
        value: 'addForm',
        label: '新建盘点单',
        children: [{
          value: 'self',
          label: '用户自建',
        }, {
          value: 'admin',
          label: '系统创建',
          children: [{
            value: 'all',
            label: '全部物料'
          }, {
            value: 'needDo',
            label: '需要盘点物料'
          }]
        }]
      },{
        value: 'takeQuant',
        label: '取帐存数量',
      },{
        value: 'tabkeMoney',
        label: '取帐存金额',
      },{
        value: 'checkInventory',
        label: '盘点计算',
      }],

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
      total1: 0,
      total2: 0,
      total3: 0,
      // 库存盘点表格数据
      eabi00List: {},
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      NoPrice: true,
      // 查询参数
      //部门名称
      deptName: userInfo.dept != null ? userInfo.dept.deptName : "",
      queryParams: {
        itemcode: '',
        itemname: '',
        pageNum: 1,
        pageSize: 10,
        warehousecode:  userInfo.dept != null ? userInfo.dept.deptId : null,
        vouchernumber: null,
        voucherType: null,
        checkdate: null,
        voucherdate: null,
        operator: null,
        summary: null,
        flag: null,
        checkflag: null,
      },
      typeOptions: [
        {
          value: '0',
          label: '普通盘点'
        },
        {
          value: '1',
          label: '库位盘点'
        },
        {
          value: '2',
          label: '批号盘点'
        },

      ],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getDicts();
    this.getListMP();
    for(let i = 1; i < 30; i++){
      this.addRow();
    }
   // this.getMaterialsNoPage1();
  },
  mounted() {
    let keyNode = document.querySelector(".el-date-editor");
    let iNode = document.createElement("i");
    iNode.setAttribute("class", "el-icon-date"); // el-icon-bottom
    keyNode.appendChild(iNode);
    iNode.style.position = "absolute";
    iNode.style.top = "1113px";
    iNode.style.right = "3112px";
  },
  methods: {

    handleChange(value) {
      console.log(value, 'value');
      if ( value[0] =="addForm" && value[1] =="self"){
        //用户自建
        this.handleAdd();
      }else if (value[1] =="admin" && value[2] =="all"){
        //系统自建，全部物料
        this.handleAdd3();
      }else if (value[1] =="admin" && value[2] =="needDo") {
        //系统自建，需要盘点物料
        this.handleAdd3();
      }else if(value[0] =="checkInventory"){
        //盘点计算
        this.handleAdd1();
      }else if (value[0] =="takeQuant") {
        //取帐存数量
        this.handleAdd2();
      }else if (value[0] =="tabkeMoney") {
        //取帐存金额
        this.handleAdd4();
      }
    },
    handleFocus(event) {
      console.log(event,"返回结果focus");
    },
    handleFocus1(event) {
      console.log(event,"返回结果blur");
    },
    dayin() {

    },
    /**根据部门编号查询物料信息 */
    search(index, row){
      this.loading2 = true;
      this.nowRow = row;
      this.nowindex = index;
      this.getMaterials();
    },
    getMaterials() {
      this.loading  = true;
      listMaterialByDeptcode(this.queryParams).then(response => {
        console.log(response,"res");
        this.materialList = []
        response.rows.forEach((e) => {
          this.materialList.push(e)
        });
        this.total1 = response.total;
      });
    },
    //新增盘点表物料确定按钮
    submitForm1(){
      for (let i = 0; i < this.tableData1.length; i++) {
        console.log(i,"i");
        console.log(this.tableData1.length,"this.tableData1.length");
        console.log(this.nowindex,"this.nowindex");
        if (this.tableData1[i].itemcode == this.multipleSelection[i].itemcode) {
          this.$message({
            message: "请勿重复添加！",
            type: "warning"
          });
          return;
        } else {
          //物料编码
          this.tableData1[this.nowindex + i].itemcode = this.multipleSelection[i].itemcode;
          //物料名称
          this.tableData1[this.nowindex + i].itemname = this.multipleSelection[i].itemname;
          //规格型号
          this.tableData1[this.nowindex + i].model = this.multipleSelection[i].model;
          //单位
          this.tableData1[this.nowindex + i].unit = this.multipleSelection[i].unit;
        }
        this.loading2 = false;
        this.loading = false;
        this.open = true;
      }
    },
    //确定新增盘点表插入数据库
    submitForm2(){
      console.log(this.tableData1,"this.tableData1");
      let ruleForm = this.ruleForm;
      let table   = this.tableData1.filter(item => item.itemcode != "")
      ruleForm.eabi00List = table;
      console.log(ruleForm,"ruleForm");
      addEabi001(ruleForm).then(response => {
        console.log(response, "确认盘点返回的数据")
      });
      addEabi00List(ruleForm).then(response => {
        console.log(response, "确认盘点返回的数据1")
      });
      this.$message({
        message: "新增成功",
        type: "success"
      });
      this.open = false;
      this.loading = false;
      this.getListMP();
    },
    getList() {
      this.loading = true;
      listEabh00(this.queryParams).then(response => {
        console.log(response, "查询库存盘点列表");
        this.eabh00List = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询库存盘点列表 */
    getLista() {
      this.loading = true;
      listMaterialByDeptcode(this.queryParams).then(response => {
        console.log(response, 'response');
        this.materialList = []
        response.rows.forEach((e) => {
          this.materialList.push(e)
        });
        // console.log("materialList", this.materialList);
        this.total1 = response.total;
        this.loading = false;
      });
    },
    getListMP() {
      this.loading = true;
      listEabh00MP(this.queryParams).then(response => {
        console.log(response, "查询库存盘点列表");
        this.eabh00List = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /**新增物料 */
    add(){
      for (let i = 0; i <10 ; i++) {
        this.addRow1();
      }
    },
    addRow() {
      const list = {
          rowNum: this.rowNum,
          id: 0,
          itemcode: "",
          itemname: "",
          model: "",
          accountquantity: null,
          accountmoney: null,
          checkquantity: null,
          checkmoney: null,
          surpluslossquant: null,
          surpluslossmoney: null,
          factquantity: null,
          factmoney: null,
          lendquantity: null,
          lendmoney: null,
          position: null,
          batchnumber: null,
          summary: null,
      }
      this.tableData.push(list);
      this.rowNum += 1;
    },
    /**制证盘点表新增物料  */
    addRow1() {
      const list = {
        rowNum: this.rowNum,
        id: 0,
        itemcode: "",
        itemname: "",
        model: "",
        accountquantity: null,
        accountmoney: null,
        checkquantity: null,
        checkmoney: null,
        surpluslossquant: null,
        surpluslossmoney: null,
        factquantity: null,
        factmoney: null,
        lendquantity: null,
        lendmoney: null,
        position: "",
        batchnumber: "",
        summary: "",
      }
      this.tableData1.push(list);
      this.rowNum += 1;

    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.loading2 = false;
      this.tableData1 = [];
      this.ruleForm.summary = "";
    },
    cancel1(){
      this.loading2= false;
      this.loading = false;
    },
    // 表单重置
    reset() {
      this.ruleForm = {
        warehousecode: userInfo.dept.deptId,
        vouchernumber: null,
        type: null,
        checkdate: new Date(),
        voucherdate: new Date(),
        operator: userInfo.userName,
        summary: null,
        flag: null,
        checkoutmonth: 0,
        checkflag: 0,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getLista();
    },
    //点击当前行高亮
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleRowClick(row) {
      this.currentRow = row;
      console.log(row, "当前行");
      this.ruleForm.voucherdate = row.voucherdate;
      this.ruleForm.operator = row.operator;
      listEabi00MaterialList(row).then(response => {
        console.log(response, "查询库存盘点列表的值");
        this.tableData = response.rows;
        this.total3 = response.total;
      });
      this.Inventorynumber = row.vouchernumber;
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.itemname = "";
      this.getLista();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.warehousecode)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    //选择物料信息
    handleSelectionChange1(val) {
      this.multipleSelection = val;
      console.log(val, "选择的物料信息");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.ruleForm.voucherType =  '0';
      this.open = true;
      this.title = "新建盘点表";
      this.getInventoryNumber();
    },
    /** 盘点计算 */
    handleAdd1() {
      console.log(this.tableData, "盘点计算的值");
      for (let i = 0; i < this.tableData.length  ; i++) {
        updateResult(this.tableData[i]).then(response => {
          console.log(response, "盘点计算");
        });
      }
      this.getListMP();
    },
    /** 系统自建 全部物料 */
    handleAdd3(){
      this.ruleForm.voucherType =  '0';
      this.open = true;
      this.title = "新建盘点表";
      this.getInventoryNumber();
      //分页
      // listMaterialByDeptcode(this.queryParams).then(response => {
      //   this.tableData1 = response.rows;
      //   this.total2 = response.total;
      // });

      // //不分页
      listMaterialByDeptcodeNoPage(this.queryParams).then(response => {
        this.tableData1 = []
        for (let i = 0; i < 5000; i++) {
          this.tableData1.push(response.rows[i])
        }
        //改进方法




      });
//前端分页，没用
        // listMaterialByDeptcodeNoPage(this.queryParams).then(res => {
        //   let arr = [];
        //   let data = res.rows;
        //   for(let  i in data) {
        //     arr.push(data[i]);
        //   }
        //   this.resData = arr; // 获取到的数据
        //   console.log(this.resData, "获取到的数据");
        //   let num = arr.length  //arr.length 为有多少条数据
        //   this.tableData1 = [];
        //   console.log(res, "盘点计算");
        //   console.log(res.rows, "所有行");
        //   this.zsTOTAL = num;
        //   console.log(this.pageVal-1, "当前页数");
        //  this.tableData1 = arr.slice(this.pageVal-1,this.everypageNum);
        //   // this.tableData1 = res.rows;
        //   console.log(this.tableData1, "最后数据");
        // });
      },
    handleCurrentChanges(val) {
      this.pageVal = val; //此处为用户点击第几页
      // 1: 0,19  当用户点击第一页，那么就是前20条，对耶下标位置应为0至19
      //后面截取的位置
      var that =this
      let start = that.everypageNum*val-10
      let start1 = 0;
      console.log(start, "start");
      // console.log(start1, "start");
      // console.log(typeof start1, "start1");
      // console.log(typeof start, "start");
      let end = that.everypageNum*val
      let end1 = this.resData.length
      // console.log(typeof end, "end");
      // console.log(typeof end1, "end1");
      console.log(end, "end");
      // console.log(end1, "end");
      // console.log(this.resData.length, "this.resData.length");
      if(that.resData.length<= that.everypageNum){  //这种情况为只有20条或者20条以下数据的情况
        console.log("20条一下")
        that.tableData1 = that.resData
      }else{  //这种情况为大于20条数据
        console.log("大于20条")
        if(that.everypageNum*val>=that.resData.length){//用户点击的那一页是最后一页的数据，比如有49条数据，用户点击第3页，第二3就应该显示最后9条的数据
         that.tableData1 = that.resData.slice(start)
        }else{ //用户点击的那一页不是最后一页的数据，比如有49条数据，用户点击第二页，第二页就应该显示20至40条的数据
          console.log("用户点击的那一页不是最后一页的数据，比如有49条数据，用户点击第二页，第二页就应该显示20至40条的数据")
         //that.tableData1 = that.resData.slice(start1,end1)
         that.tableData1 = that.resData.slice(start,end)
          console.log(that.tableData1, "最后数据Last");
        }
      }
      //当有7个 that.resData
      //当有21个  that.resData.slice(0,20)  that.resData.slice(20)
      //当有40， ...
      //当有47个  that.resData.slice(20,40)  that.resData.slice(40)
      //以此类推找规律
    },
    /** 取账面数量  */
    handleAdd2() {
      for (let i = 0; i < this.tableData.length; i++) {
        updateAccountquantity(this.tableData[i]).then(response => {
          console.log(response, "取账面数量");
        });
      }
      this.getListMP();
    },
    /** 取账面金额  */
    handleAdd4() {
        for (let i = 0; i < this.tableData.length; i++) {
          updateAccountmoney(this.tableData[i]).then(response => {
            console.log(response, "取账面金额");
          });
        }
      this.getListMP();
    },
    //获取本库房的盘点表编号+1
    getInventoryNumber(){
      getNumber(this.sysnumber).then(response => {
        this.ruleForm.vouchernumber = response != null ? response.msg : "0000000001"
      });
    },
    clear(){
      this.tableData1 = [];
      this.ruleForm = []
    },
    clear1(){
      this.tableData1 = [];
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.warehousecode != null) {
            updateEabh00(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addEabh00(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },

    /** 导出按钮操作 */
    handleExport() {
      if (this.tableData.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      this.$confirm("是否确认库存盘点表数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }) .then(() => {
        this.Loading = true;
        return exportEabi00(this.Inventorynumber);
      })
        .then((response) => {
          this.download(response.msg);
          this.Loading = false;
        });
    },
  }
};
</script>
<style scoped>

.el-form-item {
  margin-bottom: 1px;
}
.el-tabletest /deep/ .cell {
  padding: 0px;
  padding-bottom: 0px;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  line-height: 26px;
}
.searchBtn /deep/  {
  padding: 0px;
}
.el-table /deep/.cell{
  padding: 0px;
  height: 28px;
}
.el-table /deep/ .el-table__cell.is-center{
  padding: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
.app-containerdiv {
  width: 1541px;
  padding: 20px;
  /*el-form禁止随着界面放大缩小而放大缩小*/
  overflow: hidden;
  border: #1e1e1e solid 1px;
}
.app-containerdiv1 {
  width: 1350px;
  /*el-form禁止随着界面放大缩小而放大缩小*/
  overflow: hidden;
}
.el-form-item /deep/ .el-form-item__content {
  width: 120px;
  padding: 0px;
}
.el-from111 /deep/ .el-form-item__content{
  width: 100%;
}
.el-table1 /deep/ .cell{
 height: 22px;
}
/deep/ .el-date-editor {
  position: relative;
}
/deep/ .el-input__prefix {
  display: none;
}
.el-input /deep/ .el-input__inner{
  padding: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
.el-input-number /deep/ .el-input__inner{
  padding: 0px;
  padding-left: 0px;
  padding-right: 0px;
text-align: right;
}
.el-table22 /deep/ .cell{
  line-height: 40px;
}
/*.inputDeep>>>.el-input__inner {*/
/*  border: 0;*/
/*  text-align: center;*/
/*  border-radius:0px;*/
/*}*/

</style>
