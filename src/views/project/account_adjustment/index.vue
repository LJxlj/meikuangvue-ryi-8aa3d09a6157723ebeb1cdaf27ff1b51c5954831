<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      :rules="rules"
      hide-required-asterisk
    >
      <el-form-item label="检查年月" prop="checkOutMonth">
        <el-date-picker
          v-model="queryParams.checkOutMonth"
          type="month"
          placeholder="选择月"
          value-format="yyyy-MM-dd"
          @keyup.enter.native="handleQuery"
        >
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="库房" prop="warehousecode">
        <el-select
          v-model="queryParams.warehousecode"
          placeholder="请选择库房"
          clearable
        >
          <el-option
            v-for="dict in dict.type.deptname"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
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
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['project:adjustment:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain size="mini" @click="btnClickPrint3"
          >打印</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="adjustmentList"
      @selection-change="handleSelectionChange"
      element-loading-text="正在处理数据，请稍后"
      empty-text="暂无数据"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="类别" align="center" prop="materialType" />
      <el-table-column label="物料编码" align="center" prop="itemcode" />
      <el-table-column label="物料名称" align="center" prop="itemname" />
      <el-table-column label="规格型号" align="center" prop="model" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column label="数量" align="center" prop="quant" />
      <el-table-column label="金额" align="center" prop="money" />
      <el-table-column label="库房" align="center" prop="warehousecode" />
      <el-table-column label="备注" align="center" prop="summary" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  listAdjustment,
  getAdjustment,
  delAdjustment,
  addAdjustment,
  updateAdjustment,
} from "@/api/project/adjustment";
import Cookies from "js-cookie";
export default {
  name: "Adjustment",
  dicts: ["deptname"],
  data() {
    //从cookie内获取用户
    const userInfo = JSON.parse(Cookies.get("userInfo"));
    //获取用户所在的部门编号和名称
    const deptName = userInfo.dept.deptName;
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
      // 原材料调账表格数据
      adjustmentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        warehousecode: userInfo.dept.deptId,
        planedit: userInfo.userName,
        voucherdate: new Date(),
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        checkOutMonth: [
          {
            required: true,
            message: "日期格式错误，格式如2020-01",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //  原材料调整表
    btnClickPrint3() {
      if (this.adjustmentList.length == 0) {
        this.$message.error("暂无数据，请先查询数据在打印");
      } else {
        let LODOP = getLodop(); //调用getLodop获取LODOP对象
        LODOP.PRINT_INITA(0, 0, 1100, 800, "");
        LODOP.SET_PRINT_PAGESIZE(0, 2100, 3000, "");
        LODOP.ADD_PRINT_TEXT(
          17,
          120,
          573,
          46,
          "山西华宁焦煤有限责任公司             原材料调账表"
        );
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.SET_PRINT_STYLEA(0, "Horient", 2);
        LODOP.ADD_PRINT_RECT(112, 0, 1085, 586, 0, 1);
        LODOP.ADD_PRINT_TEXT(727, 4, 152, 20, "山西华宁焦煤有限公司");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(80, 588, 63, 20, "制单人：");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(94, 643, 93, 703, 0, 1);
        LODOP.ADD_PRINT_TEXT(80, 746, 79, 20, "制单日期：");
        LODOP.ADD_PRINT_LINE(94, 810, 93, 890, 0, 1);
        LODOP.ADD_PRINT_LINE(133, 0, 133, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(153, 0, 153, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(173, 0, 173, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(193, 0, 193, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(213, 0, 213, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(233, 0, 233, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(253, 0, 253, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(273, 0, 273, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(293, 0, 293, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(313, 0, 313, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(333, 0, 333, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(353, 0, 353, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(373, 0, 373, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(393, 0, 393, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(413, 0, 413, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(433, 0, 433, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(453, 0, 453, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(473, 0, 473, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(493, 0, 493, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(513, 0, 513, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(533, 0, 533, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(553, 0, 553, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(573, 0, 573, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(593, 0, 593, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(613, 0, 613, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(633, 0, 633, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(653, 0, 653, 1085, 0, 1);
        LODOP.ADD_PRINT_LINE(673, 0, 673, 1085, 0, 1);
        LODOP.ADD_PRINT_TEXT(120, 4, 100, 20, "类别");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(120, 120, 100, 20, "物料编码");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(120, 280, 100, 20, "物料名称");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(120, 415, 80, 20, "规格型号");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(120, 520, 69, 20, "单位");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(120, 625, 48, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(120, 725, 63, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(120, 830, 64, 20, "库房");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(120, 970, 64, 20, "备注");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        // LODOP.ADD_PRINT_TEXT(120,880,63,20,"上月均价");
        // LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        // LODOP.ADD_PRINT_TEXT(120,957,64,20,"单价差异");
        // LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        // LODOP.ADD_PRINT_TEXT(120,1031,49,20,"备注");
        // LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
        LODOP.ADD_PRINT_LINE(112, 100, 698, 100, 0, 1);
        LODOP.ADD_PRINT_LINE(112, 250, 698, 250, 0, 1);
        LODOP.ADD_PRINT_LINE(698, 400, 112, 400, 0, 1);
        LODOP.ADD_PRINT_LINE(112, 520, 698, 520, 0, 1);
        LODOP.ADD_PRINT_LINE(698, 580, 112, 580, 0, 1);
        LODOP.ADD_PRINT_LINE(698, 700, 112, 700, 0, 1);
        LODOP.ADD_PRINT_LINE(112, 800, 698, 800, 0, 1);
        LODOP.ADD_PRINT_LINE(698, 900, 112, 900, 0, 1);
        LODOP.ADD_PRINT_TEXT(727, 942, 126, 20, "第 1 页 / 共 1 页");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
        LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
        LODOP.PREVIEW(); //预览(预览打印无脚标)
        // LODOP.PRINT(); //打印
      }
    },
    /** 查询原材料调账列表 */
    getList() {
      this.loading = true;
      listAdjustment(this.queryParams).then((response) => {
        this.adjustmentList = response.rows;
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
        materialType: null,
        itemcode: null,
        itemname: null,
        model: null,
        unit: null,
        quant: null,
        money: null,
        warehousecode: null,
        summary: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      // 判断检查年月是否为空
      if (
        this.queryParams.checkOutMonth == "" ||
        this.queryParams.checkOutMonth == null
      ) {
        this.$message.error("检查年月不能为空，请输入年月");
      } else {
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
      this.ids = selection.map((item) => item.materialType);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加原材料调账";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const materialType = row.materialType || this.ids;
      getAdjustment(materialType).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改原材料调账";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.materialType != null) {
            updateAdjustment(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAdjustment(this.form).then((response) => {
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
      const materialTypes = row.materialType || this.ids;
      this.$modal
        .confirm(
          '是否确认删除原材料调账编号为"' + materialTypes + '"的数据项？'
        )
        .then(function () {
          return delAdjustment(materialTypes);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      if (this.adjustmentList.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有消耗明细表检查?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Loading = true;
          return exportAdjustment(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.Loading = false;
        });
    },
  },
};
</script>
