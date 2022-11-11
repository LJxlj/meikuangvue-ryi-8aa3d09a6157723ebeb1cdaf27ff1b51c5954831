<template>
  <el-dialog
    title="提⽰"
    :visible.sync="showDialog"
    width="50%"
    @close="handleClose"
  >
    <div class="app-container">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="getmaterialList"
        @row-click="handleSelect"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="领料单号"
          align="center"
          prop="materialid"
          width="120"
        />
        <el-table-column
          label="领料时间"
          align="center"
          prop="plandate"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.plandate, "{y}-{m}-{d}") }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="领料部门编号" align="center" prop="deptcode" width="150" /> -->
        <el-table-column
          label="领料部门"
          align="center"
          prop="deptname"
          width="150"
        />
        <el-table-column
          label="编制人姓名"
          align="center"
          prop="operatorname"
        />
        <el-table-column
          label="编制时间"
          align="center"
          prop="operatedate"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.operatedate, "{y}-{m}-{d}") }}</span>
          </template>
        </el-table-column>

        <el-table-column label="部门审核" align="center" prop="plancheck" />
        <el-table-column
          label="审核时间"
          align="center"
          prop="plancheckdate"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.plancheckdate, "{y}-{m}-{d}") }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分管领导审核"
          align="center"
          prop="planconfirm"
          width="120"
        />
        <el-table-column
          label="审核时间"
          align="center"
          prop="planconfirmdate"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{
              parseTime(scope.row.planconfirmdate, "{y}-{m}-{d}")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="矿长审批"
          align="center"
          prop="generalconfirm"
        />
        <el-table-column
          label="审批时间"
          align="center"
          prop="generalconfirmdate"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{
              parseTime(scope.row.generalconfirmdate, "{y}-{m}-{d}")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="领料类型" align="center" prop="getmaterialType">
          <template slot-scope="scope">
            <dict-tag
              :options="dict.type.aaaz00"
              :value="scope.row.getmaterialType"
            />
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
      <el-table
        :summary-method="getSummaries"
        show-summary
        :data="getmaterialDetailList"
        :row-class-name="rowGetmaterialDetailIndex"
        ref="getmaterialDetail"
      >
        <!-- <el-table-column type="selection" width="50" align="center" /> -->
        <el-table-column label="序号" align="center" prop="index" width="50" />
        <el-table-column
          label="物料编码"
          align="center"
          prop="itemcode"
          width="200"
        />
        <el-table-column
          label="物料名称"
          align="center"
          prop="itemname"
          width="200"
        />
        <el-table-column
          label="规格型号"
          align="center"
          prop="model"
          width="100"
        />
        <el-table-column label="单位" align="center" prop="unit" width="80" />
        <el-table-column
          label="计划数量"
          align="center"
          prop="plannum"
          width="100"
        />
        <el-table-column
          label="库存数量"
          align="center"
          prop="invnum"
          width="150"
        />
        <el-table-column
          label="用途(工作面或巷道)"
          align="center"
          prop="useage"
          width="200"
        />
        <el-table-column
          label="设备名称"
          align="center"
          prop="equimentname"
          width="150"
        />
        <el-table-column
          label="领料人"
          align="center"
          prop="getman"
          width="100"
        />
        <el-table-column
          label="领料班组"
          align="center"
          prop="deptcode"
          width="180"
        />
        <el-table-column
          label="领料部门(科/队)"
          align="center"
          prop="deptcode1"
          width="180"
        />
        <el-table-column
          label="领料时间"
          align="center"
          prop="getdate"
          width="200"
        />
        <el-table-column
          label="备注"
          align="center"
          prop="remarks"
          width="300"
        />
        <el-table-column label="安全费用标志" prop="safetyfeeflag" width="150">
          <template slot-scope="scope">
            <dict-tag
              :options="dict.type.safetyfeeflag"
              :value="scope.row.safetyfeeflag"
            />
          </template>
        </el-table-column>
        <el-table-column label="公司付标志" prop="financetreatflag" width="150">
          <template slot-scope="scope">
            <dict-tag
              :options="dict.type.financetreatflag"
              :value="scope.row.financetreatflag"
            />
          </template>
        </el-table-column>
        <el-table-column label="单价" prop="realprice" width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.realprice" placeholder="请输入单价" />
          </template>
        </el-table-column>
        <el-table-column label="金额" prop="totalmoney" width="150">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.totalmoney"
              placeholder="请输入已领用金额"
            />
          </template>
        </el-table-column>
        <el-table-column label="已领数量" prop="finishnum" width="150">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.finishnum"
              placeholder="请输入已领用数量"
            />
          </template>
        </el-table-column>
        <el-table-column label="出库时间" prop="workdate" width="150">
        </el-table-column>
        <el-table-column label="所在库房" prop="checkoutmonth" width="150">
        </el-table-column>
        <el-table-column label="审核标志" prop="deleteFlag" width="150">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.deleteFlag"
              placeholder="请输入删除标记"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false">取消</el-button>
      <el-button type="primary" @click="showDialog = false">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { listGetmaterial, getGetmaterial } from "@/api/project/getmaterial";

export default {
  name: "Getmaterial",
  dicts: [
    "aaaz00",
    "safetyfeeflag",
    "aaam00",
    "abc",
    "sys_material_class",
    "sys_ifplan_material",
  ],
  // 接受⽗组件传递的值
  props: {
    auditPlanVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedGetmaterialDetail: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 领料查询表格数据
      getmaterialList: [],
      // 领料计划表格数据
      getmaterialDetailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        materialid: "",
        plandate: null,
        deptcode: null,
        deptname: null,
        operatorname: null,
        operatedate: null,
        getmaterialType: null,
        plancheck: null,
        plancheckdate: null,
        planconfirm: null,
        planconfirmdate: null,
        generalconfirm: null,
        generalconfirmdate: null,
        checkoutmonth: null,
        deleteFlag: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      // 控制弹出框显⽰隐藏
      showDialog: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //合计
    //计算tableData的5，17，18列的和
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
        else if (index === 5 || index === 17 || index === 18) {
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
      return sums;
    },
    /** 查询领料查询列表 */
    getList() {
      this.loading = true;

      listGetmaterial(this.queryParams).then((response) => {
        this.getmaterialList = response.rows;
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
        id: null,
        materialid: null,
        plandate: null,
        deptcode: null,
        deprname: null,
        operatorname: null,
        operatedate: null,
        getmaterialType: null,
        plancheck: null,
        plancheckdate: null,
        planconfirm: null,
        planconfirmdate: null,
        generalconfirm: null,
        generalconfirmdate: null,
        checkoutmonth: null,
        deleteFlag: null,
      };
      this.getmaterialDetailList = [];
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },

    // 多选框只选择一条数据
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
      // console.log(this.multipleSelection, "1");
      if (selection.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(selection.pop());
      }
    },

    /** 查看领料单详情 */
    handleSelect(row) {
      this.reset();
      const id = row.id || this.ids;
      getGetmaterial(id).then((response) => {
        this.form = response.data;
        this.getmaterialDetailList = response.data.getmaterialDetailList;
        this.open = true;
      });
    },

    /** 领料计划序号 */
    rowGetmaterialDetailIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    // 弹出框关闭后触发
    handleClose() {
      (this.showDialog = false),
      // ⼦组件调⽤⽗组件⽅法，并传递参数
      this.$emit("changeShow", "false");
    },
  },
  watch: {
    // 监听 auditPlanVisible 改变
    auditPlanVisible(oldVal, newVal) {
      this.showDialog = this.auditPlanVisible;
    },
  },
};
</script>
<style lang="less" scoped>
</style>