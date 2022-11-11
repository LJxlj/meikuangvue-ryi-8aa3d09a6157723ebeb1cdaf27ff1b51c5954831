<template>

  <div class="app-container">
  
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="物料编号" prop="itemcode">
        <el-input
          v-model="queryParams.itemcode"
          placeholder="请输入物料编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料名称" prop="itemname">
        <el-input
          v-model="queryParams.itemname"
          placeholder="请输入物料编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
      <!-- <el-form-item label="库房编号" prop="warehousecode">
        <el-input
          v-model="queryParams.warehousecode"
          placeholder="请输入库房编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料编号" prop="itemcode">
        <el-input
          v-model="queryParams.itemcode"
          placeholder="请输入物料编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        > -->
      <!-- <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        > -->
      <!-- </el-form-item> -->
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['project:eaba00:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          size="mini"
          @click="save"
          icon="el-icon-check"
          >保存</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['project:eaba00:remove']"
          >删除</el-button
        >
      </el-col>

      <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['project:eaba00:export']"
            >{{ loadingtext }}</el-button
          >
        </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          @click="dialogFormVisible2 = true"
          size="mini"
          >自动初始化</el-button
        >
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          @click="dialogFormVisible4 = true"
          size="mini"
          >初始化检查</el-button
        >
      </el-col> -->
      <el-dialog
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        title="警告"
        :visible.sync="dialogFormVisible4"
        width="450px"
      >
        <el-form :model="queryParams">
          <font color="black" size="3"
            >此操作将检查在自动初始化过程中，是否有因为没有登记物料得财务信息，
            而使得在物料得库存信息表中已存在得物料未能初始化到库存动态余额表中，继续吗？</font
          >
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible4 = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              dialogFormVisible4 = false;
              dialogFormVisible5 = true;
              check();
            "
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        title="提示"
        :visible.sync="dialogFormVisible5"
        width="800px"
      >
        <el-table :data="eaba001List">
          <el-table-column
            label="物料编号"
            align="center"
            prop="itemcode"
            min-width="200"
          >
          </el-table-column>
          <el-table-column
            label="物料名称"
            align="center"
            prop="itemname"
            min-width="200"
          >
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible5 = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible5 = false">
            确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dropdown>
        <el-button type="primary" plain size="mini">
          操作<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button type="text" @click="dialogFormVisible2 = true"
              >自动初始化</el-button
            ></el-dropdown-item
          >
          <el-dropdown-item>
            <el-button type="text" @click="dialogFormVisible4 = true"
              >初始化检查</el-button
            ></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        title="警告"
        :visible.sync="dialogFormVisible2"
        width="450px"
      >
        <el-form :model="queryParams">
          <font color="black" size="3"
            >系统将要对尚未进行初始化的物料进行初始化，物料的数量和金额等将被自动置为零。进行初始化操作吗？</font
          >
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              dialogFormVisible2 = false;
              chushihua();
            "
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

  <div class="inputDeep">
      <el-table
        ref="table"
        v-loading="loading"
        :data="eaba00List"
        @selection-change="handleSelectionChange"
        show-summary
        :summary-method="getSummaries"
        element-loading-text="正在加载数据，请稍后"
        
        :cell-style="{ padding: '0px' }"
        :row-style="{height: '0'}"
       
        border>
        <el-table-column type="selection" width="55" align="center" />
        <!-- <el-table-column label="" align="center" prop="id" /> -->
        <!-- <el-table-column label="库房编号" align="center" prop="warehousecode" /> -->
        <el-table-column
          label="物料编号"
          align="center"
          prop="itemcode"
          min-width="200"
          :style="{ width: '100%' }"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit">
              <el-input v-model="scope.row.itemcode"></el-input
            ></span>
            <el-input disabled v-else v-model="scope.row.itemcode"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="物料名称"
          align="center"
          prop="itemname"
          min-width="200"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit"
              ><el-input v-model="scope.row.itemname"></el-input
            ></span>
            <el-input disabled v-else v-model="scope.row.itemname"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="规格型号"
          align="center"
          prop="model"
          min-width="200"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit"
              ><el-input v-model="scope.row.model"></el-input
            ></span>

            <el-input disabled v-else v-model="scope.row.model"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="库存单位"
          align="center"
          prop="unit"
          min-width="100"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit">
              <el-input v-model="scope.row.unit"></el-input
            ></span>
            <el-input disabled v-else v-model="scope.row.unit"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="库存数量"
          align="center"
          prop="inventoryquant"
          min-width="150"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit"
              ><el-input-number
                v-model="scope.row.inventoryquant"
                @input="rowChange(scope.$index, scope.row, scope.column)"
                :precision="2"
                :controls="false"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input-number
            ></span>
            <el-input-number
              disabled
              v-else
              v-model="scope.row.inventoryquant"
              @input="rowChange(scope.$index, scope.row, scope.column)"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="库存单价"
          align="center"
          prop="inventoryprice"
          min-width="150"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit">
              <el-input-number
                v-model="scope.row.inventoryprice"
                @input="rowChange(scope.$index, scope.row, scope.column)"
                oninput="value=value.replace(/[^\d]/g,'')"
                :precision="4"
                :controls="false"
              ></el-input-number
            ></span>
            <el-input-number
              disabled
              v-else
              v-model="scope.row.inventoryprice"
              @input="rowChange(scope.$index, scope.row, scope.column)"
              :precision="4"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="库存金额"
          align="center"
          prop="inventorymoney"
          min-width="150"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit">
              <el-input-number
                v-model="scope.row.inventorymoney"
                @input="rowChange(scope.$index, scope.row, scope.column)"
                oninput="value=value.replace(/[^\d]/g,'')"
                :precision="2"
                :controls="false"
              ></el-input-number
            ></span>

            <el-input-number
              disabled
              v-else
              v-model="scope.row.inventorymoney"
              @input="rowChange(scope.$index, scope.row, scope.column)"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="入库数量"
          align="center"
          prop="inputquant"
          min-width="150"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit">
              <el-input-number
                v-model="scope.row.inputquant"
                :precision="2"
                :controls="false"
              ></el-input-number
            ></span>
            <el-input-number
              v-else
              disabled
              v-model="scope.row.inputquant"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="入库金额"
          align="center"
          prop="inputmoney"
          min-width="150"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit"
              ><el-input-number
                v-model="scope.row.inputmoney"
                :precision="2"
                :controls="false"
              ></el-input-number
            ></span>
            <el-input-number
              v-else
              disabled
              v-model="scope.row.inputmoney"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="出库数量"
          align="center"
          prop="outputquant"
          min-width="150"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit"
              ><el-input-number
                v-model="scope.row.outputquant"
                :precision="2"
                :controls="false"
              ></el-input-number
            ></span>
            <el-input-number
              v-else
              disabled
              v-model="scope.row.outputquant"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="出库金额"
          align="center"
          prop="outputmoney"
          min-width="150"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit"
              ><el-input-number
                v-model="scope.row.outputmoney"
                :precision="2"
                :controls="false"
              ></el-input-number
            ></span>
            <el-input-number
              v-else
              disabled
              v-model="scope.row.outputmoney"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="累计入库数量"
          align="center"
          prop="totalinputquant"
          min-width="150"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit"
              ><el-input-number
                v-model="scope.row.totalinputquant"
                :precision="2"
                :controls="false"
              ></el-input-number
            ></span>
            <el-input-number
              v-else
              disabled
              v-model="scope.row.totalinputquant"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="累计入库金额"
          align="center"
          prop="totalinputmoney"
          min-width="150"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit">
              <el-input-number
                v-model="scope.row.totalinputmoney"
                :precision="2"
                :controls="false"
              ></el-input-number
            ></span>
            <el-input-number
              v-else
              disabled
              v-model="scope.row.totalinputmoney"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="累计出库数量"
          align="center"
          prop="totaloutputquant"
          min-width="150"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit">
              <el-input-number
                v-model="scope.row.totaloutputquant"
                :precision="2"
                :controls="false"
              ></el-input-number
            ></span>

            <el-input-number
              v-else
              disabled
              v-model="scope.row.totaloutputquant"
              :precision="2"
              :controls="false"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="累计出库金额"
          align="center"
          prop="totaloutputmoney"
          min-width="150"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.edit">
              <el-input-number
                v-model="scope.row.totaloutputmoney"
                :precision="2"
                :controls="false"
              ></el-input-number
            ></span>
            <el-input-number
              v-else
              disabled
              v-model="scope.row.totaloutputmoney"
              :precision="2"
              :controls="false"
            ></el-input-number>
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
  exportEaba00,
  listEaba002,
  listEaba001,
  listEaba00,
  getEaba00,
  delEaba00,
  addEaba00,
  updateEaba00,
} from "@/api/project/eaba00";
import Cookies from "js-cookie";
import { timeToString1 } from "../../../api/project/statistics";

export default {
  // // 当input失去光标后进行的操作
  // async blurInput(id, name, value) {
  //   let obj = {};
  //   // 判断数据是否有所改变，如果数据有改变则调用修改接口
  //   if (this.oldData[name] != value) {
  //     obj[name] = value; //被改变的数据
  //     // 然后再写调用接口，提交内容的东西就可以了
  //   }
  //   this.showInput = "";
  // },

  // tableDbEdit(row, column, event) {
  //   this.showInput = column.property + row.id;
  //   this.oldData[column.property] = row[column.property];
  // },

  name: "Eaba00",
  data() {
    //从cookie内获取用户
    const userInfo = JSON.parse(Cookies.get("userInfo"));
    //获取用户所在的部门编号和名称
    const deptName = userInfo.dept.deptName;

    return {
      selection: [],
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      // 遮罩层
      loading: false,
      exportLoading: false,
       // 导出禁用
      daochu: false,
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
      // 余额初始表格数据
      eaba00List: [],
      // 导出按钮文本
      loadingtext: "导出",
      // 初始化检查表格数据
      eaba001List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      abc: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        itemcode: null,
        itemname: null,
        warehousecode: userInfo.dept.deptId,
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
  mounted() {
    // this.getDeviceTypes();
  },
  // filters: {
  //   keepNumber(value) {
  //     //库存单价保留四位小数
  //     const numM = Number(value).toFixed(5);
  //     if (numM == "NaN") {
  //       return "0.0000";
  //     }
  //     const realVal = numM.substring(0, numM.length - 1);
  //     return realVal;
  //   },
  // },
  methods: {
    // // 初始化按钮
    // chushihua() {
    //   const userInfo = JSON.parse(Cookies.get("userInfo"));
    //   this.eaba00List.warehousecode = userInfo.dept.deptId;
    //   for (var i = 0; i < this.eaba00List.length; i++) {
    //     if (this.eaba00List[i].id == null) {
    //       this.abc.push(this.eaba00List[i]);
    //     }
    //   }
    //   // console.log(this.abc);
    //   addEaba00(this.abc).then((response) => {
    //     this.open = false;
    //   });
    //   this.getLists();
    // },
    check() {
      this.getListsss();
    },

    chushihua() {
      this.getLists();
    },
    // 金额计算部分
    async rowChange(index, row, column) {
      if (row != null) {
        const taxrate = row.taxrate != null ? row.taxrate : 0;
        if (column.property === "inventoryquant") {
          //修改数量
          if (row.inventoryquant != 0 && row.inventoryprice != 0) {
            row.inventorymoney = row.inventoryquant * row.inventoryprice;
          } else if (row.inventorymoney != 0 && row.inventoryquant != 0) {
            row.inventoryprice = row.inventorymoney / row.inventoryquant;
          }
        } else if (column.property === "inventoryprice") {
          //修改单价
          if (row.inventoryquant != 0 && row.inventoryprice != 0) {
            row.inventorymoney = row.inventoryquant * row.inventoryprice;
          } else if (row.inventorymoney != 0 && row.inventoryprice != 0) {
            row.inventoryquant = row.inventorymoney / row.inventoryprice;
          }
        } else if (column.property === "inventorymoney") {
          //修改金额
          if (row.inventorymoney != 0 && row.inventoryquant != 0) {
            row.inventoryprice = row.inventorymoney / row.inventoryquant;
          } else if (row.inventorymoney != 0 && row.inventoryprice != 0) {
            row.inventoryquant = row.inventorymoney / row.inventoryprice;
          }
        }
        // row.tax_money =
        //   row.inventorymoney != 0 ? row.inventorymoney * (1 - taxrate) : 0;
      }
      this.$set(this.eaba00List, index, row); //更新这一行的值
    },

    // 合计部分
    getSummaries(param) {
      const { columns, data } = param; //这里可以看出，自定义函数会传入每一列，以及数据
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = "合  计";
          return;
          // 求索引是5和索引大于等于7的合计
        } else if (index === 5 || index >= 7) {
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
            if (index === 5 || index >= 7) {
              sums[5] = parseFloat(sums[5]).toFixed(2);
              sums[7] = parseFloat(sums[7]).toFixed(2);
              sums[8] = parseFloat(sums[8]).toFixed(2);
              sums[9] = parseFloat(sums[9]).toFixed(2);
              sums[10] = parseFloat(sums[10]).toFixed(2);
              sums[11] = parseFloat(sums[11]).toFixed(2);
              sums[12] = parseFloat(sums[12]).toFixed(2);
              sums[13] = parseFloat(sums[13]).toFixed(2);
              sums[14] = parseFloat(sums[14]).toFixed(2);
              sums[15] = parseFloat(sums[15]).toFixed(2);
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

    /** 查询余额初始列表 */
    getList() {
      this.loading = true;
      listEaba00(this.queryParams).then((response) => {
        response.rows.forEach((item) => {
          item.edit = false;
        });
        this.eaba00List = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 自动初始化查询列表
    getLists() {
      this.loading = true;
      listEaba001(this.queryParams).then((response) => {
        this.eaba00List = response.rows;
        this.total1 = response.total;
        this.loading = false;
        this.getList();
        this.$message.success("自动初始化成功");
      });
    },

    // 自动初始化查询列表
    getListsss() {
      this.loading = true;
      listEaba002(this.queryParams).then((response) => {
        this.eaba001List = response.rows;
        console.log(response + "kkk");
        this.total2 = response.total;
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
        itemcode: null,
        inventoryprice: null,
        inventoryquant: null,
        inventorymoney: null,
        allocation: null,
        inputquant: null,
        inputmoney: null,
        outputquant: null,
        outputmoney: null,
        totalinputquant: null,
        totalinputmoney: null,
        totaloutputquant: null,
        totaloutputmoney: null,
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
      this.selection = selection;
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
      // 复选框单选操作
      if (selection.length > 1) {
        this.$refs.table.clearSelection();
        this.$refs.table.toggleRowSelection(selection.pop());
      }
      this.multipleSelection = selection;
    },

    /** 新增按钮操作 */
    handleAdd() {
      const userInfo = JSON.parse(Cookies.get("userInfo"));
      var list = {
        checkoutmonth: timeToString1(new Date()),
        warehousecode: userInfo.dept.deptId,
        itemcode: "",
        inventoryprice: "",
        inventoryquant: "",
        inventorymoney: "",
        allocation: "",
        inputquant: "",
        inputmoney: "",
        outputquant: "",
        outputmoney: "",
        totalinputquant: "",
        totalinputmoney: "",
        totaloutputquant: "",
        totaloutputmoney: "",
        edit: true,
      };
      this.eaba00List.unshift(list);
    },

    // 写一个保存按钮，提示保存成功
    save() {
      this.$message({
        type: "success",
        message: "保存成功!",
      });
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getEaba00(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改余额初始";
      });
    },

    /** 删除按钮操作 */

    handleDelete() {
      console.log(this.selection);

      this.selection.forEach((item) => {
        if (item.id == null) {
          this.eaba00List.splice(this.eaba00List.indexOf(item), 1);
          return;
        }
        this.$confirm("确定删除该条数据吗？", "提示").then(() => {
          if (
            item.inventoryprice == 0 &&
            item.inventorymoney == 0 &&
            item.inventoryquant == 0
          ) {
            delEaba00(item.id).then((response) => {
              this.$modal.msgSuccess("删除成功");
              this.getList();
            });
          } else if (
            item.inventoryprice != 0 &&
            item.inventorymoney == 0 &&
            item.inventoryquant == 0
          ) {
            this.$message.error("已记账，不能删除此条记录");
          } else if (
            item.inventoryprice != 0 &&
            item.inventorymoney != 0 &&
            item.inventoryquant != 0
          ) {
            this.$message.error("该条物料库存尚有余额，不能删除此条记录");
          }
        });
      });
    },

  /** 导出按钮操作 */
    handleExport() {
      this.queryParams.radio = this.radio;
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有余额初始数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.loadingtext = "导出中...";
          this.daochu = true;
          return exportEaba00(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.loading = false;
          this.loadingtext = "导出";
          this.daochu = false;
        });
    },
  },
};
</script>

<style scoped>
.el-input.is-disabled /deep/ .el-input__inner {
  color: black;
  background-color: white;
}

/* 利用穿透，设置input边框隐藏 */
.inputDeep >>> .el-input__inner {
  border: 0;
  color: black;
  background-color: white;
}
.el-table__header-wrapper .el-checkbox {
  display: none;
}
.el-table /deep/ .cell {
  padding: 0px;
  padding-left: 0px;
  padding-right: 0px;
  /*background-color: white;*/
}
.el-table /deep/ .cell el-input__inner{
  line-height: 12px;
  padding : 0px;
} 
.el-input /deep/ .el-input__inner {
  padding: 0px;
  padding-top: 0px  ;
}
.el-input /deep/ is-disabled .el-input__inner {
  padding: 0px;
  line-height: 15px;
}
.el-table td.el-table__cell div{
  padding: 0px;
  line-height: 15px;
  height: 21px;;
}
.el-table /deep/ .el-table__cell.is-center{
  padding: 0px;
  padding-left: 0px;
  padding-right: 0px;
  line-height: 15px;
}
</style>
