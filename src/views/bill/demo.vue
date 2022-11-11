<template>
  <div>
      <el-form ref="formData" :model="formData" :rules="rules" size="small" label-width="100px">
      <el-row :gutter="0">
        <el-col :span="4">
          <el-form-item label="供应商编号" prop="idSup">
            <el-input v-model="formData.idSup" :style="{width: '100%'}">
            <el-button size="small" slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商名称" prop="supplier">
            <el-input v-model="formData.supplier" :style="{width: '100%'}" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="联系人" prop="nameLinkman">
            <el-select v-model="formData.nameLinkman" :style="{width: '100%'}"></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="部门编号" prop="idDept">
            <el-input v-model="formData.idDept" :style="{width: '100%'}">
            <el-button size="small" slot="append" icon="el-icon-search" @click="deptid"></el-button>
            </el-input>
            <!-- <el-select v-model="formData.idDept" :style="{width: '100%'}"> -->
            <!-- <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option> -->
            <!-- </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="部门名称" prop="deptName">
            <el-input v-model="formData.deptName" :style="{width: '100%'}" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="业务员" prop="nameBuyer">
            <el-select v-model="formData.nameBuyer" :style="{width: '100%'}">
            <el-option
              v-for="dict in dict.type.name_buyer"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="日期" prop="dateSign">
            <el-date-picker v-model="formData.dateSign" type="date" format="yyyy-MM-dd" :style="{width: '100%'}" 
            prefix-icon=0>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单编号" prop="codeContract">
            <el-input v-model="formData.codeContract" :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单序号" prop="idContract">
            <el-input v-model="formData.idContract" :style="{width: '100%'}" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注" prop="note">
            <el-input v-model="formData.note" :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="4">
          <el-form-item label="订单状态" prop="flagStatus">
            <el-input v-model="formData.flagStatus" :style="{width: '100%'}" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="制单人" prop="operator">
            <el-input v-model="formData.operator" :style="{width: '100%'}" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="审核人" prop="checker">
            <el-input v-model="formData.checker" :style="{width: '100%'}" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="注销人" prop="checkout">
            <el-input v-model="formData.checkout" :style="{width: '100%'}" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
        <el-form-item label="订单编号" prop="codeContract">
            <el-input
          v-model="queryParams.codeContract"
          clearable
          @keyup.enter.native="show"
          :style="{width: '100%'}"
           @blur="show"
        />
          </el-form-item>
          </el-col>
          <el-col :span="4">
          <el-form-item label-width="50px">
            <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-edit" size="mini" plain> 修改 </el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button type="success" icon="el-icon-search" size="mini" plain @click="look"> 查询 </el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button type="info" icon="el-icon-plus" size="mini" plain> 生成采购订单 </el-button>
            </el-col>
            </el-row>
          </el-form-item>
          </el-col>
          <el-col :span="4">
          <el-form-item label-width="50px">
            <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="handleAddPurchaseOrderArticle"> 新增 </el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="handleDeletePurchaseOrderArticle"> 删除 </el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button type="info" icon="el-icon-circle-check" size="mini" plain @click="saveTable"> 保存 </el-button>
            </el-col>
            </el-row>
          </el-form-item>
          </el-col>
        </el-row>

 <!-- 供应商编号弹框 -->
      <el-dialog :visible.sync="bcxxopen" width="1000px" append-to-body :title="title">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
      <el-form-item label="供应商编号" prop="idSup">
        <el-input
          v-model="queryParams.idSup"
          placeholder="请输入供应商编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商名称" prop="supplier">
        <el-input
          v-model="queryParams.supplier"
          placeholder="请输入供应商名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

        <el-table ref="multipleTable" v-loading="loading" :data="supplierList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="供应商编号" align="center" prop="idSup"/>
        <el-table-column label="供应商名称" align="center" prop="supplier"/>
        </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getSupplierList"
    />

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 物料编号弹框 -->
      <el-dialog :visible.sync="bcopen" width="1000px" append-to-body :title="title">
      <el-form :model="queryParams" ref="queryForms" size="small" :inline="true" label-width="68px">
      <el-form-item label="物料编号" prop="itemcode">
        <el-input
          v-model="queryParams.itemcode"
          placeholder="请输入物料编号"
          clearable
          @keyup.enter.native="handleQueryMaterial"
        />
      </el-form-item>
      <el-form-item label="物料名称" prop="itemname">
        <el-input
          v-model="queryParams.itemname"
          placeholder="请输入物料名称"
          clearable
          @keyup.enter.native="handleQueryMaterial"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQueryMaterial">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQueryMaterial">重置</el-button>
      </el-form-item>
    </el-form>

        <el-table ref="multipleTableMaterial" v-loading="loading" :data="materialList" @selection-change="handleSelectionChangeMaterial">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="物料编码" align="center" prop="itemcode" width="200%"/>
        <el-table-column label="物料名称" align="center" prop="itemname" width="200%"/>
        <el-table-column label="单位" align="center" prop="unit" />
        </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getMaterialList"
    />

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormMaterial">确 定</el-button>
            <el-button @click="cancelMaterial">取 消</el-button>
        </div>
      </el-dialog> 
<!-- 查询弹框 -->
      <el-dialog :visible.sync="bcopens" append-to-body :title="title" width="2000px">
        <el-table v-loading="loading" :data="tableData" @row-click="getpurchaseOrderArticleList">
      <el-table-column label="订单编号" align="center" prop="codeContract" />
      <el-table-column label="供应商编号" align="center" prop="idSup" />
      <el-table-column label="供应商名称" align="center" prop="supplier" width="500"/>
      <el-table-column label="签定日期" align="center" prop="dateSign">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dateSign, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需求部门" align="center" prop="idDept" />
      <el-table-column label="业务员" align="center" prop="nameBuyer" />
      <el-table-column label="订单状态" align="center" prop="flagStatus" />
      <el-table-column label="制单人" align="center" prop="operator" />
      <el-table-column label="审核人" align="center" prop="checker" />
      <el-table-column label="注销人" align="center" prop="checkout" />
      <el-table-column label="备注" align="center" prop="note" />
    </el-table>
    
<el-table :data="purchaseOrderArticleLists" ref="purchaseOrderArticle">
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column label="物料编号" prop="idProduct">
            <template slot-scope="scope">
              <el-input v-model="scope.row.idProduct" readonly />
            </template>
          </el-table-column>
           <el-table-column label="物料名称" prop="itemname">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemname" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="model">
            <template slot-scope="scope">
              <el-input v-model="scope.row.model" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="unit">
            <template slot-scope="scope">
              <el-input v-model="scope.row.unit" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="amount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="单价" prop="price">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="金额" prop="total">
            <template slot-scope="scope">
              <el-input v-model="scope.row.total" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="交货日期" prop="datePaying">
            <template slot-scope="scope">
              <el-date-picker clearable v-model="scope.row.datePaying" type="date" value-format="yyyy-MM-dd" :style="{width:'100%'}" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="已入库数量" prop="amountWarehouse">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amountWarehouse" placeholder="" readonly/>
            </template>
          </el-table-column>
        </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
      </el-dialog>
<!-- 部门弹框 -->
      <el-dialog :visible.sync="dept" append-to-body :title="title" width="800px" >
        <el-table v-loading="loading" :data="deptData" @selection-change="handleSelectionChangeDept">
        <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="部门编号" align="center" prop="deptId" />
          <el-table-column label="部门名称" align="center" prop="deptName" />
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getDeptList"
        />

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormDept">确 定</el-button>
            <el-button @click="cancelDept">取 消</el-button>
        </div>
      </el-dialog> 

<!-- 从表数据 -->
    <div class="inputDeep">
      <el-table
        :data="purchaseOrderArticleList"
        ref="table"
        border
        tooltip-effect="dark"
        style="width: 100%"
        show-summary
        :summary-method="getSummaries"
        :row-class-name="rowPurchaseOrderArticleIndex" 
        @selection-change="handlePurchaseOrderArticleSelectionChange"
      >
      <el-table-column type="selection" width="50" align="center" />
        <el-table-column label="序号" type="index" width="50%" align="center"></el-table-column>
      <el-table-column label="产品编号" width="300%" align="center" prop="idProduct"> 
          <template slot-scope="scope">
            <el-input class='idProduct' v-model="scope.row.idProduct" :style="{width:'70%'}"></el-input>
            <el-button size="small" slot="append" icon="el-icon-search" @click="searchMaterial(scope.$index,scope.row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" align="center" prop="itemname">
          <template slot-scope="scope">
            <el-input class="itemname" v-model="scope.row.itemname" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="规格" align="center" prop="model">
          <template slot-scope="scope">
            <el-input class="model" v-model="scope.row.model" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单位" align="center" prop="unit">
          <template slot-scope="scope">
            <el-input class="unit" v-model="scope.row.unit" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="数量" align="center" prop="amount">
          <template slot-scope="scope">
            <el-input class="amount" v-model="scope.row.amount"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="无税单价" align="center" prop="price">
          <template slot-scope="scope">
            <el-input class="price" v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="无税金额" align="center" prop="total">
          <template slot-scope="scope">
            <el-input class="total" v-model="scope.row.total"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="交货日期" align="center" prop="datePaying">
          <template slot-scope="scope">
            <el-date-picker clearable v-model="scope.row.datePaying" type="date" value-format="yyyy-MM-dd" :style="{width:'100%'}"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="已入库数量" align="center" prop="amountWarehouse">
          <template slot-scope="scope">
            <el-input class="amountWarehouse" v-model="scope.row.amountWarehouse" readonly></el-input>
          </template>
        </el-table-column>
      </el-table>
       </div>
       </el-form>
  </div>
</template>
<script>
import { listOrder, getOrder, listOrders, getOrders,addOrder, updateOrder } from "@/api/project/order";
import {listSupplier} from "@/api/project/supplier";
import {listMaterial} from "@/api/project/material";
import {listDepts} from "@/api/system/dept";

export default {
  name: "Order",
  dicts: ['name_buyer'],
  components: {},
  props: [],
  data() {
    return {
      // 部门弹框数据
      deptData: [],
      // 部门编号弹框
      dept:false,
      // 弹出层标题
      title: "",
      tableData: [],
      // 查询弹框
      bcopens: false,
      // 查询物料编号数据
      materialList: [],
      // 物料编号弹框
      bcopen: false,
      // 选中数组
      ids: [],
      // 总条数
      total: 0,
      // 供应商弹框
      bcxxopen: false,
      // 供应商列表
      supplierList: [],
      orderlist: [],
      // 采购订单从表格数据
      purchaseOrderArticleList: [],
      purchaseOrderArticleLists: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        codeContract: null,
        idSup: null,
        supplier: null,
        idContract: null,
        itemcode: null,
        itemname: null,
        deptName: null,
      },    
      // 遮罩层
      loading: true,
      formData: {
        id: null,
        idContract: null,
        codeContract: null,
        dateSign: null,
        idSup: null,
        supplier: null,
        idDept: null,
        nameBuyer: null,
        nameLinkman: null,
        rateTax: null,
        currencyB: null,
        rateExchange: null,
        currencyA: null,
        priceprecition: null,
        typeItemcal: null,
        dcnttype: null,
        dcntcaltype: null,
        dcntbtype: null,
        dcntinput: null,
        dcntcaldpnt: null,
        total: null,
        sumDiscount: null,
        rateDiscount: null,
        sumAss: null,
        sumTax: null,
        flagStatus: null,
        operator: null,
        checker: null,
        checkout: null,
        note: null,
        flagDiscountcaled: null,
        flagAuxacc: null
        // deptName: undefined,
      },
      rules: {
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    // 保存按钮
    saveTable(){
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.formData.purchaseOrderArticleList = this.purchaseOrderArticleList;
          console.log(this.purchaseOrderArticleList)
          console.log(this.formData)
          if (this.formData.id != null) {
            updateOrder(this.formData).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.getList();
            });
          } else {
            addOrder(this.formData).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.getList();
            });
          }
        }
      });
    },
    /** 子表序号 */
    rowPurchaseOrderArticleIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 采购订单从删除按钮操作 */
    handleDeletePurchaseOrderArticle() {
      if (this.checkedPurchaseOrderArticle.length == 0) {
        this.$modal.msgError("请先选择要删除的采购订单从数据");
      } else {
        const purchaseOrderArticleList = this.purchaseOrderArticleList;
        const checkedPurchaseOrderArticle = this.checkedPurchaseOrderArticle;
        this.purchaseOrderArticleList = purchaseOrderArticleList.filter(function(item) {
          return checkedPurchaseOrderArticle.indexOf(item.index) == -1
        });
      }
    },
    /** 子表复选框选中数据 */
    handlePurchaseOrderArticleSelectionChange(selection) {
      this.checkedPurchaseOrderArticle = selection.map(item => item.index)
    },
    // 新增子表数据
    handleAddPurchaseOrderArticle(){
      var list = {
        idProduct: null,
        itemname: null,
        model: null,
        unit: null,
        amount: null,
        price: null,
        total: null,
        datePaying: new Date(),
        amountWarehouse: null,
      };
      this.purchaseOrderArticleList.push(list);
    },
    // 查询部门
    getDeptList(){
      this.loading = true;
      listDepts(this.queryParams).then(res => {
        this.deptData = res.rows;
        this.total = res.total;
        this.loading = false;
      })
    },
    // 部门点击事件
    deptid(){
      this.dept = true;
      this.getDeptList();
    },
    // 显示从表数据
    getpurchaseOrderArticleList(row){
      const id = row.id || this.ids
      getOrder(id).then(response => {
        this.form = response.data;
        this.purchaseOrderArticleLists = response.data.purchaseOrderArticleList;
      });
    },
    // 查询点击事件
    look(){
      this.bcopens = true;
      this.getLists();
      this.title = "采购订单查询";
    },
    // 合计
    getSummaries(param) {
      const {columns, data} = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '合计'
        }
          // index >= 3 || index <= 11 是你需要计算的列
          // 当然也可以指定一个或者多个列
        // index === 2 || index === 3 这样值求和第二个与第三个列
        else if (index === 6 || index === 8 || index === 10) {
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
      return sums
    },
    /** 查询产品（物料管理）列表 */
    getMaterialList() {
        this.loading = true;
        listMaterial(this.queryParams).then(response => {
        this.materialList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    }, 
    // 物料编号点击事件
    searchMaterial(index, row) {
      this.bcopen = true;
      this.nowRow = row;
      this.nowindex = index;
      this.getMaterialList();
      this.title = "选择物料编号";
    },
    // 订单编号失去焦点事件
    show() {
      if(this.queryParams.codeContract == null){
        this.$modal.confirm('没有找到该订单，请重新输入订单编号!')
      }else{
      this.queryParams.pageNum = 1;
      this.getList()
      setTimeout(() => {
      this.formData = this.orderlist[0]
      this.getOrderList();
      }, 500);
      }
    },
    // 获取订单查询子表数据
    getOrderList() {
      getOrder(this.formData.id).then(response => {
        this.tableData = response.data;
        this.purchaseOrderArticleList = response.data.purchaseOrderArticleList;
      });
    },
    // 确定按钮
    submitForm(){
      this.formData.idSup = this.multipleSelection[0].idSup;
      this.formData.supplier = this.multipleSelection[0].supplier;
      this.bcxxopen = false;
    },
    // 物料编号确定按钮
    submitFormMaterial(){
      this.purchaseOrderArticleList[this.nowindex].idProduct = this.multipleSelectionMaterial[0].itemcode;
      this.purchaseOrderArticleList[this.nowindex].itemname = this.multipleSelectionMaterial[0].itemname;
      this.purchaseOrderArticleList[this.nowindex].model = this.multipleSelectionMaterial[0].model;
      this.bcopen = false;
    },
    // 部门确定按钮
    submitFormDept(){
      this.formData.deptName = this.multipleSelectionDept[0].deptName;
      this.formData.idDept = this.multipleSelectionDept[0].deptId;
      this.dept = false;
    },
    // 取消按钮
    cancel() {
      this.bcxxopen = false;
    },
    // 物料编号取消按钮
    cancelMaterial() {
      this.bcopen = false;
    },
    // 部门取消按钮
    cancelDept() {
      this.dept = false;
    },
    // 供应商编号弹框选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (val.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(val.pop());
      }
    },
    // 物料编号弹框选中的数据
    handleSelectionChangeMaterial(val){
      this.multipleSelectionMaterial = val;
      if (val.length > 1) {
        this.$refs.multipleTableMaterial.clearSelection();
        this.$refs.multipleTableMaterial.toggleRowSelection(val.pop());
      }
    },
    // 部门编号弹框选中的数据
    handleSelectionChangeDept(val){
      this.multipleSelectionDept = val;
      if (val.length > 1) {
        this.$refs.multipleTableDept.clearSelection();
        this.$refs.multipleTableDept.toggleRowSelection(val.pop());
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getSupplierList();
    },
    // 物料编号搜索按钮
    handleQueryMaterial() {
      this.queryParams.pageNum = 1;
      this.getMaterialList();
    },
    // 表单重置
    reset() {
      this.formData = {
        id: null,
        idContract: null,
        codeContract: null,
        dateSign: null,
        idSup: null,
        supplier: null,
        idDept: null,
        nameBuyer: null,
        nameLinkman: null,
        rateTax: null,
        currencyB: null,
        rateExchange: null,
        currencyA: null,
        priceprecition: null,
        typeItemcal: null,
        dcnttype: null,
        dcntcaltype: null,
        dcntbtype: null,
        dcntinput: null,
        dcntcaldpnt: null,
        total: null,
        sumDiscount: null,
        rateDiscount: null,
        sumAss: null,
        sumTax: null,
        flagStatus: null,
        operator: null,
        checker: null,
        checkout: null,
        note: null,
        flagDiscountcaled: null,
        flagAuxacc: null
      };
      this.purchaseOrderArticleList = [];
      this.resetForm("formData");
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 物料编号重置按钮
    resetQueryMaterial() {
      this.resetForm("queryForms");
      this.getMaterialList();
    },
    /** 查询供方档案列表 */
    getSupplierList() {
      this.loading = true;
      listSupplier(this.queryParams).then(response => {
        this.supplierList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
  //  点击供应商编号
    search(){
      this.bcxxopen = true;
      this.getSupplierList();
      this.title = "选择供应商编号";
    },
    /** 查询采购订单主列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then(response => {
        this.orderlist = response.rows;
        this.formData = this.orderlist[0]
        this.getOrderList();
        this.total = response.total;
        this.loading = false;
      });
    },
    getLists() {
      this.loading = true;
      listOrders(this.queryParams).then(response => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
  }
}

</script>
<style scoped>
.inputDeep>>>.el-input__inner {
    border: 0;
  }
</style>
