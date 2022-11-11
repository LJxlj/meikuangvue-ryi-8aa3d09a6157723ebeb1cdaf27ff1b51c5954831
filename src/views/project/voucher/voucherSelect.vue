<!--<template>-->
<!--  <div class="app-container">-->
<!--    <h2 align="center">{{ deptName }}凭证查询</h2>-->
<!--    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">-->
<!--      <el-row :gutter="10">-->
<!--        <el-col :span="5">-->
<!--          <el-form-item label="凭证类别" prop="vouchertype">-->
<!--            <el-select v-model="queryParams.vouchertype" placeholder="请选择凭证类别" clearable>-->
<!--              <el-option v-for="(dict, index) in dict.type.sys_depomanage_test" :key="index" :label="dict.label"-->
<!--                :value="dict.value" />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="5">-->
<!--          <el-form-item label="凭证编号" prop="vouchernumber">-->
<!--            <el-input v-model="queryParams.vouchernumber" placeholder="请输入凭证编号" clearable-->
<!--              @keyup.enter.native="handleQuery" />-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--&lt;!&ndash;        <el-col :span="5">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-form-item label="来源用途" prop="resourceusage">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-select v-model="queryParams.resourceusage" placeholder="请选择来源/用途" clearable>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-option v-for="(dict, index) in dict.type.resourceusagename" :key="index" :label="dict.label"&ndash;&gt;-->
<!--&lt;!&ndash;                :value="dict.label" />&ndash;&gt;-->
<!--&lt;!&ndash;            </el-select>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-col>&ndash;&gt;-->
<!--        <el-col :span="5">-->
<!--          <el-form-item label="单据号" prop="billnumber">-->
<!--            <el-input v-model="queryParams.billnumber" placeholder="请输入单据号" clearable-->
<!--              @keyup.enter.native="handleQuery" />-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <el-form-item>-->
<!--            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
<!--            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
<!--            <el-button type="primary"  size="mini" @click="historyAccounting">历史账务</el-button>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </el-form>-->
<!--    <el-table v-loading="loading" :data="eabb00List" @row-click="getEabc00List" size="mini" >-->
<!--      <af-table-column label="凭证类别" align="center" prop="vouchertype" >-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{-->
<!--              scope.row.vouchertype != "0100" ?-->
<!--                scope.row.vouchertype != "0200" ?-->
<!--                  scope.row.vouchertype != "0300" ?-->
<!--                    scope.row.vouchertype != "0400" ? scope.row.vouchertype : "调账"-->
<!--                    : "退货"-->
<!--                  : "出库"-->
<!--                : "入库"-->
<!--          }}</span>-->
<!--        </template>-->
<!--      </af-table-column>-->
<!--      <af-table-column label="凭证编码" align="center" prop="vouchernumber" />-->
<!--      <af-table-column label="制证日期" align="center" prop="businessdate" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.businessdate, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </af-table-column>-->
<!--      <af-table-column label="发生日期" align="center" prop="voucherdate" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.voucherdate, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </af-table-column>-->
<!--      <af-table-column label="制证人" align="center" prop="operator" />-->
<!--      <af-table-column label="来源/用途" align="center" prop="resourceusage" >-->
<!--        <template slot-scope="scope">-->
<!--        <span>{{-->
<!--            scope.row.resourceusage != "00" ?-->
<!--              scope.row.resourceusage != "13" ?-->
<!--                scope.row.resourceusage : "外购"-->
<!--              : "生产用"-->
<!--          }}</span>-->
<!--        </template>-->
<!--      </af-table-column>-->
<!--      <af-table-column label="单位/部门名称" align="center" prop="unitname" />-->
<!--      <af-table-column label="单据号" align="center" prop="billnumber" />-->
<!--      <af-table-column label="凭证摘要" align="center" prop="summary" />-->
<!--      <af-table-column label="业务员" align="center" prop="purphaseperson" />-->
<!--      <af-table-column label="是否公司支付" align="center" prop="temporaryflag" />-->
<!--      <af-table-column label="财务审核" align="center" prop="temporaryflag" />-->
<!--      <af-table-column label="暂估入库标志" align="center" prop="temporaryflag" />-->
<!--    </el-table>-->

<!--    &lt;!&ndash; 新增编辑弹框子组件 &ndash;&gt;-->
<!--    &lt;!&ndash; <vdetail :addOrUpdateVisible="addOrUpdateVisible" @changeShow="showAddOrUpdate" ref="vdetail"></vdetail> &ndash;&gt;-->
<!--    <vdetail ref="vdetail"></vdetail>-->

<!--    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"-->
<!--      @pagination="getList" />-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { eabb00list } from '@/api/project/voucher';-->
<!--import Cookies from 'js-cookie';-->
<!--import voucherDetail from '@/views/project/voucher/voucherDetail';-->

<!--//从cookie内获取用户-->
<!--const userInfo = JSON.parse(Cookies.get("userInfo"));-->
<!--export default {-->
<!--  dicts: ['resourceusagename', 'sys_depomanage_test'],-->
<!--  components: {-->
<!--    vdetail: voucherDetail-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      // 控制新增编辑弹窗的显示与隐藏-->
<!--      addOrUpdateVisible: false,-->
<!--      //部门名称-->
<!--      deptName: userInfo.dept != null ? userInfo.dept.deptName : "",-->
<!--      // 遮罩层-->
<!--      loading: true,-->
<!--      // 选中数组-->
<!--      ids: [],-->
<!--      // 子表选中数据-->
<!--      checkedEabc00: [],-->
<!--      // 非单个禁用-->
<!--      single: true,-->
<!--      // 非多个禁用-->
<!--      multiple: true,-->
<!--      // 显示搜索条件-->
<!--      showSearch: true,-->
<!--      // 总条数-->
<!--      total: 0,-->
<!--      // YueDemo_01表格数据-->
<!--      eabb00List: [],-->
<!--      // 库存凭证明细表格数据-->
<!--      eabc00List: [],-->
<!--      // 弹出层标题-->
<!--      title: "",-->
<!--      // 是否显示弹出层-->
<!--      open: false,-->
<!--      // 查询参数-->
<!--      queryParams: {-->
<!--        pageNum: 1,-->
<!--        pageSize: 10,-->
<!--        warehousecode: null,-->
<!--        vouchertype: null,-->
<!--        vouchernumber: null,-->
<!--        businessdate: null,-->
<!--        voucherdate: null,-->
<!--        operator: null,-->
<!--        resourceusage: null,-->
<!--        unitcode: null,-->
<!--        unitname: null,-->
<!--        billnumber: null,-->
<!--        purphaseperson: null,-->
<!--        summary: null,-->
<!--        checkoutmonth: null,-->
<!--        temporaryflag: null,-->
<!--        financetreatflag: null-->
<!--      },-->
<!--      // 表单参数-->
<!--      form: {},-->
<!--      // 表单校验-->
<!--      rules: {}-->
<!--    };-->
<!--  },-->
<!--  created() {-->
<!--    this.getList();-->
<!--  },-->
<!--  methods: {-->
<!--    /** 查询凭证列表 */-->
<!--    getList() {-->
<!--      this.loading = true;-->
<!--      eabb00list(this.queryParams).then(response => {-->
<!--        this.eabb00List = response.rows;-->
<!--        this.total = response.total;-->
<!--        this.loading = false;-->
<!--      });-->
<!--    },-->
<!--    /** 查询凭证明细 */-->
<!--    getEabc00List(row) {-->
<!--      // //显示新增编辑弹窗-->
<!--      // this.addOrUpdateVisible = true-->

<!--      this.$refs.vdetail.getList(row)-->
<!--    },-->
<!--    // // 监听 子组件弹窗关闭后触发，有子组件调用-->
<!--    // showAddOrUpdate(data) {-->
<!--    //   if (data === 'false') {-->
<!--    //     this.addOrUpdateVisible = false-->
<!--    //   } else {-->
<!--    //     this.addOrUpdateVisible = true-->
<!--    //   }-->
<!--    // },-->
<!--    /** 搜索按钮操作 */-->
<!--    handleQuery() {-->
<!--      this.queryParams.pageNum = 1;-->
<!--      this.getList();-->
<!--    },-->
<!--    /** 重置按钮操作 */-->
<!--    resetQuery() {-->
<!--      this.resetForm("queryForm");-->
<!--      this.handleQuery();-->
<!--    },-->
<!--    historyAccounting() {-->
<!--      this.$router.push({-->
<!--        path: "/project/voucher/historyAccounting"-->
<!--      });-->
<!--    },-->
<!--  }-->
<!--};-->

<!--</script>-->
