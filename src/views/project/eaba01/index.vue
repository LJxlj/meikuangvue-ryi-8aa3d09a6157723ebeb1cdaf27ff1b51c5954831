<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['project:eaba01:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="eaba01List"
      @selection-change="handleSelectionChange"
      show-summary
      :summary-method="getSummaries"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="库房编号" align="center" prop="warehousecode" />
      <el-table-column
        label="物料编码"
        align="center"
        prop="itemcode"
        min-width="180"
      />
      <el-table-column
        label="物料名称"
        align="center"
        prop="itemname"
        min-width="150"
      />
      <el-table-column
        label="规格"
        align="center"
        prop="model"
        min-width="150"
      />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column
        label="单价"
        align="center"
        prop="inventoryprice"
        min-width="120"
      />
      <el-table-column
        label="数量"
        align="center"
        prop="inventoryquant"
        min-width="120"
      />
      <el-table-column
        label="金额"
        align="center"
        prop="inventorymoney"
        min-width="120"
      />
      <el-table-column label="库龄" align="center" prop="itemage" />
      <el-table-column label="库龄30" align="center" prop="age30" />
      <el-table-column label="库龄60" align="center" prop="age60" />
      <el-table-column label="库龄90" align="center" prop="age90" />
      <el-table-column label="库龄180" align="center" prop="age180" />
      <el-table-column label="库龄360" align="center" prop="age360" />
      <el-table-column
        label="库龄大于360d"
        align="center"
        prop="age361"
        min-width="110"
      />
      <el-table-column
        label="最后一次购买日期"
        align="center"
        prop="lastpurchasedate"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.lastpurchasedate, "{y}-{m}-{d}")
          }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-button type="primary" @click="jump" class="detailed"
      >库存帐龄分析饼状图</el-button
    >
    <el-button type="primary" @click="jump1" class="detailed"
      >库存帐龄分析柱状图</el-button
    >
  </div>
</template>

<script>
import {
  listEaba01,
  getEaba01,
  delEaba01,
  addEaba01,
  updateEaba01,
  exportEaba01,
} from "@/api/project/eaba01";

export default {
  name: "Eaba01",

  data() {
    return {
      // openOff: false,
      // 遮罩层
      loading: true,
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
      // 库龄分析表格数据
      eaba01List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        itemname: null,
        model: null,
        unit: null,
        inventoryprice: null,
        inventoryquant: null,
        inventorymoney: null,
        itemage: null,
        lastpurchasedate: null,
        age30: null,
        age60: null,
        age90: null,
        age180: null,
        age360: null,
        age361: null,
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
  methods: {
    jump() {
      this.$router.push("/dept/balance/fenxibzt");
    },
    jump1() {
      this.$router.push("/dept/balance/fenxizzt");
    },
    /** 查询库龄分析列表 */
    getList() {
      this.loading = true;
      listEaba01(this.queryParams).then((response) => {
        this.eaba01List = response.rows;
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
        itemcode: null,
        itemname: null,
        model: null,
        unit: null,
        inventoryprice: null,
        inventoryquant: null,
        inventorymoney: null,
        itemage: null,
        lastpurchasedate: null,
        age30: null,
        age60: null,
        age90: null,
        age180: null,
        age360: null,
        age361: null,
      };
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
      this.title = "添加库龄分析";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const warehousecode = row.warehousecode || this.ids;
      getEaba01(warehousecode).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改库龄分析";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.warehousecode != null) {
            updateEaba01(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addEaba01(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },

    // 合计部分
    getSummaries(param) {
      const { columns, data } = param; //这里可以看出，自定义函数会传入每一列，以及数据
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合  计";
          return;
        } else if (index === 6 || index === 7) {
          //index>3&&<=15后的列进行求和
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
            if (index === 6 || index === 7) {
              sums[6] = parseFloat(sums[6]).toFixed(2);
              sums[7] = parseFloat(sums[7]).toFixed(2);
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
    /** 删除按钮操作 */
    handleDelete(row) {
      const warehousecodes = row.warehousecode || this.ids;
      this.$modal
        .confirm('是否确认删除库龄分析编号为"' + warehousecodes + '"的数据项？')
        .then(function () {
          return delEaba01(warehousecodes);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      if (this.eaba01List.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有库龄分析表?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Loading = true;
          return exportEaba01(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.Loading = false;
        });
    },
  },
};
</script>
