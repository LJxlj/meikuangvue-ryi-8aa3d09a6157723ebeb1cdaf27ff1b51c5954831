<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="订单选择:">
        <el-radio-group v-model="radio" @change="orders" class="ddxz">
    <el-radio :label="3">未完成</el-radio>
    <el-radio :label="6">已完成</el-radio>
    <el-radio :label="9">所有订单</el-radio>

  </el-radio-group>

  <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['project:order:export']"
          :loading="loading"
          :disabled="daochu"
        >{{loadingtext}}</el-button>
        <!-- <el-button
          type="success"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
          v-hasPermi="['project:order:import']"
        >导入</el-button> -->

      </el-form-item>
    </el-form>
<!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange" @row-click="getpurchaseOrderArticleList" highlight-current-row>
      <el-table-column label="订单编号" align="center" prop="codeContract" />
      <el-table-column label="供应商编号" align="center" prop="idSup" />
      <el-table-column label="供应商名称" align="center" prop="supplier" width="500"/>
      <el-table-column label="签定日期" align="center" prop="dateSign" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dateSign, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需求部门" align="center" prop="idDept" >
        <!-- <template slot-scope="scope">
          <span v-for="dict in dict.type.depot" :key="dict.value" v-if="scope.row.idDept == dict.value">{{dict.label}}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="业务员" align="center" prop="nameBuyer" >
        <!-- <template slot-scope="scope">
          <span v-for="dict in dict.type.name_buyer" :key="dict.value" v-if="scope.row.nameBuyer == dict.value">{{dict.label}}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="订单状态" align="center" prop="flagStatus" />
      <el-table-column label="制单人" align="center" prop="operator" />
      <el-table-column label="审核人" align="center" prop="checker" />
      <el-table-column label="注销人" align="center" prop="checkout" />
      <el-table-column label="备注" align="center" prop="note" />
    </el-table>
    <pagination
      v-show="total>0"
      v-if="this.radio == 9"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <pagination
      v-show="total>0"
      v-if="this.radio == 3"
      :total="total1"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getNoList"
    />
    <pagination
      v-show="total>0"
      v-if="this.radio == 6"
      :total="total2"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getYesList"
    />
<el-table :data="purchaseOrderArticleList" ref="purchaseOrderArticle" class="zb" :row-class-name="rowpurchaseOrderArticleListIndex">
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column label="物料编号" prop="idProduct">
            <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.idProduct" readonly />
            </template> -->
          </el-table-column>
           <el-table-column label="物料名称" prop="itemname" width="150">
            <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.itemname" placeholder="" readonly/>
            </template> -->
          </el-table-column>
          <el-table-column label="规格" prop="model" width="150">
            <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.model" placeholder="" readonly/>
            </template> -->
          </el-table-column>
          <el-table-column label="单位" prop="unit" width="100">
            <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.unit" placeholder="" readonly/>
            </template> -->
          </el-table-column>
          <el-table-column label="数量" prop="amount">
            <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.amount" readonly/>
            </template> -->
          </el-table-column>
          <el-table-column label="单价" prop="price">
            <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.price" readonly/>
            </template> -->
          </el-table-column>
          <el-table-column label="金额" prop="total">
            <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.total" readonly/>
            </template> -->
          </el-table-column>
          <el-table-column label="交货日期" prop="datePaying">
            <!-- <template slot-scope="scope">
              <el-date-picker clearable v-model="scope.row.datePaying" type="date" value-format="yyyy-MM-dd" :style="{width:'100%'}" readonly/>
            </template> -->
          </el-table-column>
          <el-table-column label="已入库数量" prop="amountWarehouse">
            <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.amountWarehouse" placeholder="" readonly/>
            </template> -->
          </el-table-column>
        </el-table>

    
  </div>
</template>

<script>
import { listOrders, getOrder, delOrder, listOrdersNo, listOrdersYes, exportManagement } from "@/api/project/order";
import { listDept} from "@/api/system/dept";

export default {
  name: "Order",
  dicts: ['name_buyer'],
  data() {
    return {
      // 导出禁用
      daochu: false,
      // 导出按钮文本
      loadingtext:"导出",
       radio: 9,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedPurchaseOrderArticle: [],
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
      // 采购订单主表格数据
      orderList: [],
      // 采购订单从表格数据
      purchaseOrderArticleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        codeContract: null,
        deptId: null,
        deptName: null,
        radio: null,
      },
      // 表单参数
      form: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 采购订单序号
    rowpurchaseOrderArticleListIndex({ row, rowIndex }){
      row.index = rowIndex + 1;
    },
    // 未完成事件
    orders(val){
      switch(val){
        case 3:
          this.purchaseOrderArticleList = [];
          this.getNoList();
          break;
        case 6:
          this.purchaseOrderArticleList = [];
          this.getYesList();
          break;
        case 9:
          this.purchaseOrderArticleList = [];
          this.getList();
          break;
      }
    },
    // 显示下面子表数据
    getpurchaseOrderArticleList(row){
      this.reset();
      const id = row.id || this.ids
      getOrder(id).then(response => {
        this.form = response.data;
        this.purchaseOrderArticleList = response.data.purchaseOrderArticleList;
      });
    },
    // 查询已完成订单
    getYesList(){
      this.loading = true;
      listOrdersYes(this.queryParams).then(response => {
        this.orderList = response.rows;
        this.total2 = response.total;
        this.loading = false;
      });
    },
    // 查询未完成订单
    getNoList(){
      this.loading = true;
      listOrdersNo(this.queryParams).then(response => {
        this.orderList = response.rows;
        this.total1 = response.total;
        this.loading = false;
      });
    },
    /** 查询采购订单主列表 */
    getList() {
      this.loading = true;
      listOrders(this.queryParams).then(response => {
        this.orderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 表单重置
    reset() {
      this.form = {
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
      this.resetForm("form");
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除采购订单主编号为"' + ids + '"的数据项？').then(function() {
        return delOrder(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
	/** 采购订单从序号 */
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
    /** 导出按钮操作 */
    handleExport() {
      this.queryParams.radio = this.radio;
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有采购订单数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.loading = true;
          this.loadingtext = "导出中...";
          this.daochu = true;
          return exportManagement(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.loading = false;
          this.loadingtext = "导出";
          this.daochu = false;
        })
    }
  }
};
</script>
<style scoped>
.ddxz{
  margin-right: 20px;
}
.zb{
  margin-top: 40px;
}
</style>
