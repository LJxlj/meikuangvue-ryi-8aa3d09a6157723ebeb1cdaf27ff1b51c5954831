<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="领料单号" prop="materialid">
        <el-input
          v-model="queryParams.materialid"
          placeholder="请输入领料单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="物料编码" prop="itemcode">
        <el-input
          v-model="queryParams.itemcode"
          placeholder="请输入物料编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="计划数量
" prop="plannum">
        <el-input
          v-model="queryParams.plannum"
          placeholder="请输入计划数量
"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库存数量" prop="invnum">
        <el-input
          v-model="queryParams.invnum"
          placeholder="请输入库存数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label-width="300" label="用途(工作面或巷道)" prop="useage">
        <el-input
          v-model="queryParams.useage"
          placeholder="请输入用途(工作面或巷道)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="设备名称" prop="equimentname">
        <el-input
          v-model="queryParams.equimentname"
          placeholder="请输入设备名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="领料人" prop="getman">
        <el-input
          v-model="queryParams.getman"
          placeholder="请输入领料人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> 
      <!-- <el-form-item label="领料班组" prop="deptcode">
        <el-input
          v-model="queryParams.deptcode"
          placeholder="请输入领料班组"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label-width="200" label="领料部门(科/队)" prop="deptcode1">
        <el-input
          v-model="queryParams.deptcode1"
          placeholder="请输入领料部门(科/队)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> 
      <!-- <el-form-item label="领料时间" prop="getdate">
        <el-date-picker clearable
          v-model="queryParams.getdate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择领料时间">
        </el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="领料时间" prop="workdate">
        <el-input
          v-model="queryParams.workdate"
          placeholder="请输入领料时间"
          clearable
          @keyup.enter.native="handleQuery"
        /> 
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button size="mini" @click="statistics">台账消耗统计</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb8">
       <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:detail:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:detail:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:detail:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:detail:export']"
        >导出</el-button>
      </el-col> 
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <el-table :summary-method="getSummariess" show-summary v-loading="loading" :data="detailList" >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="序号" class="xuhao" type="index" width="50" align="center"></el-table-column>
      <el-table-column label="领料单号" width="150" align="center" prop="materialid" />
      <el-table-column label="物料编码" width="200" align="center" prop="itemcode" />
      <el-table-column label="物料名称" width="100" align="center" prop="itemname" />
      <el-table-column label="规格型号" width="100" align="center" prop="model" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column label="计划数量" align="center" prop="plannum" />
      <el-table-column label="用途" align="center" prop="useage" />
      <el-table-column label="设备名称" align="center" prop="equimentnamee" />
      <el-table-column label="领料人" align="center" prop="getman" />
      <el-table-column label="领料班组" align="center" prop="deptcode" />
      <el-table-column label="领料部门" align="center" prop="deptcode1" />
      <el-table-column label="领料日期" width="150" align="center" prop="getdate" />
      <el-table-column label="备注" align="center" prop="remarks" />
      <el-table-column label="安全费用标志" width="150" align="center" prop="safetyfeeflag">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.safetyfeeflag"
            :value="scope.row.safetyfeeflag"
          />
        </template>
      </el-table-column>
      <el-table-column label="公司付标志" width="150" align="center" prop="financetreatflag">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.safetyfeeflag"
            :value="scope.row.financetreatflag"
          />
        </template>
      </el-table-column>
      <el-table-column label="物料类型" width="200" align="center" prop="materialType">
        <template slot-scope="scope">
            <dict-tag
              :options="dict.type.aaal00"
              :value="scope.row.materialType"
            />
          </template>
      </el-table-column>
      <el-table-column width="100" label="单价" align="center" prop="realprice" />
      <el-table-column label="已领数量" align="center" prop="finishnum" />
      <el-table-column label="金额" align="center" prop="totalmoney" />
      <el-table-column label="出库时间" width="150" align="center" prop="workdate" />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:detail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:detail:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { listDetail, getDetail, delDetail, addDetail, updateDetail } from "@/api/project/detail";

export default {
  name: "Detail",
  dicts: [
    "aaal00",
    "safetyfeeflag",
  ],
  data() {
    return {
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
      // 领料计划表格数据
      detailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        id: null,
        materialid: null,
        itemcode: null,
        itemname: null,
        model: null,
        unit: null,
        plannum: null,
        invnum: null,
        useage: null,
        equimentname: null,
        getman: null,
        deptcode: null,
        deptcode1: null,
        getdate: null,
        remarks: null,
        safetyfeeflag: null,
        financetreatflag: null,
        realprice: null,
        totalmoney: null,
        finishnum: null,
        checkconfirm: null,
        selected: null,
        workdate: null,
        checkoutmonth: null,
        deleteFlag: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        deptcode1: [
          { required: true, message: "领料部门(科/队)不能为空", trigger: "blur" }
        ],
        selected: [
          { required: true, message: "选择标志不能为空", trigger: "blur" }
        ],
        checkoutmonth: [
          { required: true, message: "结转年月不能为空", trigger: "blur" }
        ],
        deleteFlag: [
          { required: true, message: "删除标记不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //合计
    getSummariess(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        }
        else if (index === 6 || index === 18 || index === 19) {
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
    //跳转到台账消耗统计页面
    statistics() {
      this.$router.push("/bill/Account");
    },
    /** 查询领料计划列表 */
    getList() {
      this.loading = true;
      listDetail(this.queryParams).then(response => {
        this.detailList = response.rows;
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
        itemcode: null,
        itemname: null,
        model: null,
        unit: null,
        plannum: null,
        invnum: null,
        useage: null,
        equimentname: null,
        getman: null,
        deptcode: null,
        deptcode1: null,
        getdate: null,
        remarks: null,
        safetyfeeflag: null,
        financetreatflag: null,
        realprice: null,
        totalmoney: null,
        finishnum: null,
        checkconfirm: null,
        selected: null,
        workdate: null,
        checkoutmonth: null,
        deleteFlag: null
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
    // handleSelectionChange(selection) {
    //   this.ids = selection.map(item => item.id)
    //   this.single = selection.length!==1
    //   this.multiple = !selection.length
    // },
    // /** 新增按钮操作 */
    // handleAdd() {
    //   this.reset();
    //   this.open = true;
    //   this.title = "添加领料计划";
    // },
    // /** 修改按钮操作 */
    // handleUpdate(row) {
    //   this.reset();
    //   const id = row.id || this.ids
    //   getDetail(id).then(response => {
    //     this.form = response.data;
    //     this.open = true;
    //     this.title = "修改领料计划";
    //   });
    // },
    // /** 提交按钮 */
    // submitForm() {
    //   this.$refs["form"].validate(valid => {
    //     if (valid) {
    //       if (this.form.id != null) {
    //         updateDetail(this.form).then(response => {
    //           this.$modal.msgSuccess("修改成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       } else {
    //         addDetail(this.form).then(response => {
    //           this.$modal.msgSuccess("新增成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       }
    //     }
    //   });
    // },
    // /** 删除按钮操作 */
    // handleDelete(row) {
    //   const ids = row.id || this.ids;
    //   this.$modal.confirm('是否确认删除领料计划编号为"' + ids + '"的数据项？').then(function() {
    //     return delDetail(ids);
    //   }).then(() => {
    //     this.getList();
    //     this.$modal.msgSuccess("删除成功");
    //   }).catch(() => {});
    // },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/detail/export', {
        ...this.queryParams
      }, `detail_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
