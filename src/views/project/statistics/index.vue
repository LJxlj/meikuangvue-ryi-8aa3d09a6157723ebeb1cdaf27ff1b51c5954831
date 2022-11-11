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
      <el-form-item label="统计日期" prop="statisticsdate">
        <el-radio-group v-model="radio">
          <el-radio :label="1">
            <el-date-picker
              v-model="queryParams.statisticsdate"
              type="daterange"
              align="right"
              style="width: 240px"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="检查年月" prop="checkoutmonth">
        <el-radio-group v-model="radio">
          <el-radio :label="2">
            <el-date-picker
              v-model="queryParams.checkoutmonth"
              placeholder="选择月"
              type="month"
              value-format="yyyyMM"
              @keyup.enter.native="handleQuery"
            >
            </el-date-picker>
          </el-radio>
        </el-radio-group>
      </el-form-item>

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
          v-hasPermi="['project:statistics:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" size="mini" plain @click="btnClickPrint5"
          >打印</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <div class="inputDeep">
      <el-table
        v-loading="loading"
        :data="statisticsList"
        @selection-change="handleSelectionChange"
        show-summary
        :summary-method="getSummaries"
        element-loading-text="正在加载数据，请稍后"
        :cell-style="{ padding: '3px' }"
        class="el-table"
        border
        size="mini"
      >
        <el-table-column
          label="库房"
          align="center"
          prop="warehousecode"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.warehousecode"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="凭证类别" align="center" prop="vouchertype">
       
        </el-table-column>
        <el-table-column
          label="入库单号"
          align="center"
          prop="vouchernumber"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.vouchernumber"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="关联采购单号"
          align="center"
          prop="billnumber"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.billnumber"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="暂估入库金额"
          align="center"
          prop="summoney"
          min-width="150"
          :style="{ width: '100%' }"
        >
          <template slot-scope="scope">
            <el-input-number
              disabled
              v-model="scope.row.summoney"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="回冲暂估单号"
          align="center"
          prop="vouchernumber1"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.vouchernumber1"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="回冲金额"
          align="center"
          prop="summoney1"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.summoney1"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  listStatistics,
  getStatistics,
  delStatistics,
  addStatistics,
  updateStatistics,
  timeToString,
  timeToString1,
} from "@/api/project/statistics";
import Cookies from "js-cookie";
import { getLodop } from "@/api/project/LodopFuncs"; //导入模块
import { exportStatistics } from "../../../api/project/statistics";
import { dateToString } from "../../../api/project/voucher";
export default {
  name: "Statistics",

  data() {
    //从cookie内获取用户
    const userInfo = JSON.parse(Cookies.get("userInfo"));
    //获取用户所在的部门编号和名称
    const deptName = userInfo.dept.deptName;
    return {
      radio: 1,
      // 遮罩层
      loading: false,
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
      // 暂估入库统计表格数据
      statisticsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        checkoutmonth: timeToString1(new Date()),
        warehousecode: userInfo.dept.deptId,
        planedit: userInfo.userName,
        voucherdate: new Date(),
        selectedflag: null,
        start: null,
        end: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        statisticsdate: [
          { required: true, message: "日期格式错误，开始和结束日期格式如2020-08-01", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    // 暂估入库统计表
    btnClickPrint5() {
      if (this.statisticsList.length == 0) {
        this.$message.error("没有数据可以打印，请先查询数据");
      } else {
        let LODOP = getLodop(); //调用getLodop获取LODOP对象
        LODOP.PRINT_INITA(0, 1, 800, 600, "");
        LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
        LODOP.ADD_PRINT_TEXT(15, 46, 302, 37, "山西华宁焦煤有限责任公司");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_LINE(48, 344, 47, 444, 0, 1);
        LODOP.ADD_PRINT_TEXT(
          15,
          340,
          150,
          37,
          timeToString1(this.queryParams.statisticsdate[0])
        );
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_TEXT(15, 444, 35, 37, "至");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_LINE(48, 476, 47, 576, 0, 1);
        LODOP.ADD_PRINT_TEXT(
          15,
          476,
          150,
          37,
          timeToString1(this.queryParams.statisticsdate[1])
        );
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_TEXT(14, 576, 135, 37, "暂估入库表");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 19);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_TEXT(85, 416, 60, 20, "制单人：");
        LODOP.ADD_PRINT_LINE(101, 472, 100, 532, 0, 1);
        LODOP.ADD_PRINT_TEXT(85, 490, 60, 20, this.queryParams.planedit);
        LODOP.ADD_PRINT_TEXT(85, 572, 70, 20, "制单日期：");
        LODOP.ADD_PRINT_LINE(101, 636, 100, 716, 0, 1);
        LODOP.ADD_PRINT_TEXT(85, 640, 100, 20, timeToString(new Date()));
        LODOP.ADD_PRINT_RECT(129, 2, 750, 850, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 2, 157, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(185, 2, 185, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(213, 2, 213, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(241, 2, 241, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(269, 2, 269, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(297, 2, 297, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(325, 2, 325, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(353, 2, 353, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(381, 2, 381, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(409, 2, 409, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(437, 2, 437, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(465, 2, 465, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(493, 2, 493, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(521, 2, 521, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(549, 2, 549, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(577, 2, 577, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(605, 2, 605, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(633, 2, 633, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(661, 2, 661, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(689, 2, 689, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(717, 2, 717, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(745, 2, 745, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(773, 2, 773, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(801, 2, 801, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(829, 2, 829, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(857, 2, 857, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(885, 2, 885, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(913, 2, 913, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(941, 2, 941, 750, 0, 1);
        LODOP.ADD_PRINT_LINE(129, 43, 980, 44, 0, 1);
        LODOP.ADD_PRINT_TEXT(136, 6, 36, 20, "库房");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(136, 46, 80, 20, "凭证类别");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(129, 128, 980, 129, 0, 1);
        LODOP.ADD_PRINT_TEXT(136, 143, 100, 20, "入库单号");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(129, 251, 980, 252, 0, 1);
        LODOP.ADD_PRINT_TEXT(136, 264, 100, 20, "关联采购订单号");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(129, 368, 980, 369, 0, 1);
        LODOP.ADD_PRINT_TEXT(136, 377, 100, 20, "暂估入库金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_LINE(129, 488, 980, 489, 0, 1);
        LODOP.ADD_PRINT_TEXT(136, 497, 100, 20, "回冲暂估单号");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(129, 604, 980, 605, 0, 1);
        LODOP.ADD_PRINT_TEXT(136, 626, 100, 20, "回冲金额");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        for (
          let i = 0, j = 160, k = 1;
          i < this.statisticsList.length;
          i++, j += 28, k++
        ) {
          LODOP.ADD_PRINT_TEXT(
            j,
            2,
            100,
            10,
            this.statisticsList[i].warehousecode
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(
            j,
            46,
            80,
            10,
            this.statisticsList[i].vouchertype
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(
            j,
            143,
            100,
            10,
            this.statisticsList[i].vouchernumber
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(
            j,
            264,
            100,
            10,
            this.statisticsList[i].billnumber
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(
            j,
            377,
            100,
            10,
            this.statisticsList[i].summoney
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(
            j,
            497,
            100,
            10,
            this.statisticsList[i].vouchernumber1
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.ADD_PRINT_TEXT(
            j,
            626,
            100,
            10,
            this.statisticsList[i].summoney1
          );
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }
      }
      LODOP.ADD_PRINT_TEXT(571, 5, 235, 20, "山西华宁焦煤有限责任公司");
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);

      LODOP.ADD_PRINT_TEXT(571, 610, 141, 20, "第 # 页 / 共 & 页");
      LODOP.SET_PRINT_STYLEA(0, "FontColor", "#0000A0");
      LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
      LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
      LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
      LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
      // LODOP.PRINT(); //打印
    },
    // 合计部分
    getSummaries(param) {
      const { columns, data } = param; //这里可以看出，自定义函数会传入每一列，以及数据
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合  计";
          return;
          // 求索引是5和索引大于等于7的合计
        } else if (index === 4|| index===6) {
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
            if (index === 4|| index===6) {
              sums[4] = parseFloat(sums[4]).toFixed(2);
              sums[6] = parseFloat(sums[6]).toFixed(2);

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

    /** 查询暂估入库统计列表 */
    getList() {
      this.loading = true;
      console.log(this.queryParams);

      listStatistics(this.queryParams).then((response) => {
        this.statisticsList = response.rows;
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
        vouchertype: null,
        vouchernumber: null,
        billnumber: null,
        summoney: null,
        vouchernumber1: null,
        summoney1: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.selectedflag = this.radio;
      // this.queryParams.checkOutMonth = timeToString(new Date());

      if (this.queryParams.statisticsdate == null) {
        this.$message.error("请选择开始时间");
      } else if (this.queryParams.statisticsdate == null) {
        this.$message.error("请选择结束时间");
        return;
      }
      let start = timeToString(this.queryParams.statisticsdate[0]);
      // console.log(this.queryParams.statisticsdate[0]);
      let end = timeToString(this.queryParams.statisticsdate[1]);

      this.queryParams.start = start;
      this.queryParams.end = end;
      // 判断检查年月是否为空
      if (
        this.queryParams.checkoutmonth == "" ||
        this.queryParams.checkoutmonth == null
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
      this.ids = selection.map((item) => item.warehousecode);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加暂估入库统计";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const warehousecode = row.warehousecode || this.ids;
      getStatistics(warehousecode).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改暂估入库统计";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.warehousecode != null) {
            updateStatistics(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStatistics(this.form).then((response) => {
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
      const warehousecodes = row.warehousecode || this.ids;
      this.$modal
        .confirm(
          '是否确认删除暂估入库统计编号为"' + warehousecodes + '"的数据项？'
        )
        .then(function () {
          return delStatistics(warehousecodes);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      if (this.statisticsList.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有暂估入库统计表?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Loading = true;
          return exportStatistics(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.Loading = false;
        });
    },
  },
};
</script>
<style scoped>
/* 利用穿透，设置input边框隐藏 */
.inputDeep >>> .el-input__inner {
  border: 0;
  color: black;
  background-color: white;
}
.el-table /deep/ .cell {
  padding: 0px;
  padding-left: 0px;
  padding-right: 0px;
  /*background-color: white;*/
}
</style>