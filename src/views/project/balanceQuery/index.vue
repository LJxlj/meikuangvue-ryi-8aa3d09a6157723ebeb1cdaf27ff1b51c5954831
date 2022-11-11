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
          placeholder="请输入物料名称"
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
      <el-form-item> </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
      <div>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['project:balanceQuery:export']"
            >{{ loadingtext }}</el-button
          >
        </el-col>
        <!-- <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-search"
            @click="lishi"
            >历史数据</el-button
          >  
     
         </el-col>  -->
        <el-dropdown>
          <el-button type="primary" plain size="mini">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="text" @click="dangqian"
                >当前数据</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item>
              <el-button type="text" @click="lishi"
                >历史数据</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item>
              <el-button type="text" @click="ABCfenxi">ABC分析</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" @click="accounts">账务查询</el-button>
            </el-dropdown-item>
            <el-dropdown-item
              ><el-button type="text" @click="dialogFormVisible2 = true"
                >价格分析</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item>
              <el-button type="text" @click="kuling"
                >库龄分析</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item>
              <el-button type="text" @click="dialogFormVisible = true"
                >结账建账</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item>
              <el-button type="text" @click="dialogFormVisible1 = true"
                >结账数据恢复</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item>
              <el-button type="text" @click="cleandaymonth"
                >日清月结</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item>
              <el-button type="text" @click="statistics"
                >暂估入库统计</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item>
              <el-button type="text" @click="inventory"
                >余额检查</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item>
              <el-button type="text" @click="company"
                >公司付出库汇总表</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item>
              <el-button type="text" @click="inmaterial"
                >材料入库汇总表</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item>
              <el-button type="text" @click="A3"
                >消耗明细表（A3）</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item>
              <el-button type="text" @click="account_adjustment"
                >调账明细表</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item>
              <el-button type="text" @click="report_lowvalue_consumption"
                >低值易耗品材料明细表</el-button
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#F5F7FA"
          text-color="black"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            index="3"
            @click="handleExport"
            v-hasPermi="['project:balanceQuery:export']"
            >{{ loadingtext }}
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">操作</template>
            <el-menu-item index="2-1" @click="dangqian">当前数据</el-menu-item>
            <el-menu-item index="2-2" @click="lishi">历史数据</el-menu-item>
            <el-menu-item index="2-3" @click="accounts">账务查询</el-menu-item>
            <el-menu-item index="2-4" @click="ABCfenxi">ABC分析</el-menu-item>
            <el-menu-item index="2-5" @click="dialogFormVisible2 = true"
              >价格分析</el-menu-item
            >
            <el-menu-item index="2-6" @click="kuling">库龄分析</el-menu-item>
            <el-menu-item index="2-7" @click="dialogFormVisible = true"
              >结账建账</el-menu-item
            >
            <el-menu-item index="2-8" @click="dialogFormVisible1 = true"
              >结账数据恢复</el-menu-item
            >
            <el-menu-item index="2-9" @click="cleandaymonth"
              >日清月结</el-menu-item
            >
            <el-menu-item index="2-10" @click="statistics"
              >暂估入库统计</el-menu-item
            >
            <el-menu-item index="2-11" @click="cleandaymonth"
              >余额检查</el-menu-item
            >
            <el-menu-item index="2-12" @click="company"
              >公司付出库汇总表</el-menu-item
            >
            <el-menu-item index="2-13" @click="inmaterial"
              >材料入库汇总表</el-menu-item
            >
            <el-menu-item index="2-14" @click="A3"
              >消耗明细表（A3）</el-menu-item
            >
            <el-menu-item index="2-15" @click="account_adjustment"
              >调账明细表</el-menu-item
            >
            <el-menu-item index="2-16" @click="report_lowvalue_consumption"
              >低值易耗品材料明细表</el-menu-item
            >
          </el-submenu>
        </el-menu> -->
        <!-- <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="accounts"
            icon="el-icon-search"
            >账务查询</el-button
          >
        </el-col>

        <el-col :span="1.5">
          <el-button type="primary" plain size="mini" @click="ABCfenxi"
            >ABC分析</el-button
          >
        </el-col>
       价格分析 
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="dialogFormVisible2 = true"
            >价格分析</el-button
          >
        </el-col>  -->
        <el-dialog
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          title="密码输入"
          :visible.sync="dialogFormVisible2"
          width="450px"
        >
          <el-form :model="queryParams">
            <font color="red" size="5">库存价格分析保密，请输入</font>
            <el-form-item label="请输入密码" :label-width="formLabelWidth">
              <el-col :span="1.5">
                <el-input
                  v-model="queryParams.password1"
                  autocomplete="off"
                  show-password
                  placeholder="请输入密码"
                  clearable
                  rule="rules"
                  maxLength="1"
                  oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
              </el-col>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                dialogFormVisible2 = false;
                analysis();
              "
              >确 定</el-button
            >
          </div>
        </el-dialog>

        <!-- <el-col :span="1.5">
          <el-button type="primary" plain size="mini" @click="kuling"
            >库龄分析</el-button
          >
        </el-col> 

        结账建账 
       <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="dialogFormVisible = true"
            >结账建账</el-button
          >
        </el-col>  -->
        <el-dialog
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          title="密码输入"
          :visible.sync="dialogFormVisible"
          width="450px"
        >
          <el-form :model="queryParams">
            <font color="red" size="5">结账建账要谨慎对待，请输入</font>
            <el-form-item label="请输入密码" :label-width="formLabelWidth">
              <el-col :span="1.5">
                <el-input
                  v-model="queryParams.password2"
                  autocomplete="off"
                  show-password
                  placeholder="请输入密码"
                  clearable
                  rule="rules"
                  maxLength="1"
                  oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
              </el-col>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                dialogFormVisible = false;
                dialogFormVisible4 = true;
              "
              >确 定</el-button
            >
          </div>
        </el-dialog>
        <el-dialog
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          title="提示"
          :visible.sync="dialogFormVisible4"
          width="450px"
        >
          <font color="black" size="3"
            >请确认本月凭证已全部录入并记账。
            结账后，所录入得凭证将记入下个期间得库存账上!
          </font>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible4 = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                dialogFormVisible4 = false;
                dialogFormVisible5 = true;
              "
              >确 定</el-button
            >
          </div>
        </el-dialog>
        <el-dialog
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :visible.sync="dialogFormVisible5"
          width="450px"
        >
          <div class="block">
            <span class="demonstration">结账月份：</span>
            <el-date-picker
              v-model="value2"
              type="month"
              value-format="yyyyMM"
              placeholder="选择月"
              disabled
            >
            </el-date-picker>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible5 = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                dialogFormVisible5 = false;
                jiezhangjianzhang();
              "
              >确 定</el-button
            >
          </div>
        </el-dialog>

        <!-- 结账数据恢复 -->
        <!-- <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="dialogFormVisible1 = true"
            >结账数据恢复</el-button
          >
        </el-col> -->
        <el-dialog
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          title="密码输入"
          :visible.sync="dialogFormVisible1"
          width="450px"
        >
          <el-form :model="queryParams">
            <font color="red" size="5">结账数据恢复要谨慎对待，请输入</font>
            <el-form-item label="请输入密码" :label-width="formLabelWidth">
              <el-col :span="1.5">
                <el-input
                  v-model="queryParams.password3"
                  autocomplete="off"
                  show-password
                  placeholder="请输入密码"
                  clearable
                  rule="rules"
                  maxLength="1"
                  oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
              </el-col>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                dialogFormVisible6 = true;
                dialogFormVisible1 = false;
              "
            >
              确 定</el-button
            >
          </div>
        </el-dialog>
        <el-dialog
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          title="提示"
          :visible.sync="dialogFormVisible6"
          width="450px"
        >
          <font color="black" size="3"
            >
            
            系统将对{{value3}}结账数据进行恢复。
            数据将自动恢复到{{value3}}结账之前得状态。 进行数据恢复嘛？
          </font>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible6 = false">否</el-button>
            <el-button
              type="primary"
              @click="
                dialogFormVisible6 = false;
                shujuhuifu();
              "
              >是</el-button
            >
          </div>
        </el-dialog>
        <!-- <el-col :span="1.5">
          <el-button type="primary" plain size="mini" @click="cleandaymonth"
            >日清月结</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button type="primary" plain size="mini" @click="statistics"
            >暂估入库统计</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button type="primary" plain size="mini" @click="inventory"
            >余额检查</el-button
          >
        </el-col>

        <el-col :span="1.5">
          <el-button type="primary" plain size="mini" @click="company"
            >公司付出库汇总表</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button type="primary" plain size="mini" @click="inmaterial"
            >材料入库汇总表</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button type="primary" plain size="mini" @click="A3"
            >消耗明细表（A3）</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="account_adjustment"
            >调账明细表</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="report_lowvalue_consumption"
            >低值易耗品材料明细表</el-button
          >
        </el-col> -->
      </div>
    </el-row>

    <div class="inputDeep">
      <el-table
        v-loading="loading"
        :data="balanceQueryList"
        show-summary
        :summary-method="getSummaries"
        element-loading-text="正在加载数据，请稍后"
        :cell-style="{ padding: '3px' }"
        class="el-table"
        border
        size="mini"
      >
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <!-- <el-table-column label="" align="center" prop="id" /> -->
        <!-- <el-table-column label="库房编号" align="center" prop="warehousecode" /> -->
        <el-table-column
          label="物料编号"
          align="center"
          prop="itemcode"
          min-width="200"
          :style="{ width: '100%' }"
        >
      
        </el-table-column>
        <el-table-column
          label="物料名称"
          align="center"
          prop="itemname"
          min-width="200"
        >
         
        </el-table-column>
        <el-table-column
          label="规格型号"
          align="center"
          prop="model"
          min-width="200"
        >
      
        </el-table-column>
        <el-table-column
          label="库存单位"
          align="center"
          prop="unit"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.unit"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="库存数量"
          align="center"
          prop="inventoryquant"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-input-number
              disabled
              v-model="scope.row.inventoryquant"
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
            <!-- <span>{{ scope.row.inventoryprice | KeepNumber }}</span> -->

            <el-input-number
              disabled
              v-model="scope.row.inventoryprice"
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
            <el-input-number
              disabled
              v-model="scope.row.inventorymoney"
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
            <el-input-number
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
            <el-input-number
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
            <el-input-number
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
            <el-input-number
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
            <el-input-number
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
            <el-input-number
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
            <el-input-number
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
            <el-input-number
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
      v-if="aaa"
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <pagination
      v-if="bbb"
      v-show="total1 > 0"
      :total="total1"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getLists"
    />
  </div>
</template>

<script>
import {
  listBalanceQuerys,
  listBalanceQuery,
  listBalanceQueryss,
  listBalanceQuerysss,
  getBalanceQuery,
  delBalanceQuery,
  addBalanceQuery,
  updateBalanceQuery,
  timeToString1,
  timeToString2,
} from "@/api/project/balanceQuery";
import Cookies from "js-cookie";

export default {
  name: "BalanceQuery",
  data() {
    //从cookie内获取用户
    const userInfo = JSON.parse(Cookies.get("userInfo"));
    //获取用户所在的部门编号和名称
    const deptName = userInfo.dept.deptName;
    return {
      // 价格分析，结账建账，结账数据恢复弹窗
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      dialogFormVisible6: false,
      password1: "",
      password2: "",
      password3: "",

      formLabelWidth: "120px",
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
      total1: 0,
      total2: 0,
      total3: 0,
      // 结账日期
      value2: timeToString1(new Date()),
      value3: timeToString2(new Date()),
      // 结存查询表格数据
      balanceQueryList: [],
      //结存查询历史数据
      balanceQueryLists: [],
      // 导出禁用
      daochu: false,
      // 导出按钮文本
      loadingtext: "导出",
      //分页控制当前数据和历史数据
      aaa: true,
      bbb: false,
      // 弹出层标题
      title: "",
      tital1: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        warehousecode: userInfo.dept.deptId,
        itemcode: null,
        itemname: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        jiagefenxi: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          // 验证密码是否等于1
        ],
        jiezhangjianzhang: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        shujuhuifu: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
    
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询历史数据确定按钮 */
    lishi() {
      this.getLists();
    },
    /** 查询当前数据确定按钮 */
    dangqian() {
      this.getList();
    },
    // 结账建账密码框
    jiezhangjianzhang() {
      if (this.queryParams.password2 == 1) {
        this.getListss();
        this.$message.success("结账操作成功");
      } else {
        this.$message({
          message: "请输入正确的密码",
          type: "error",
        });
      }
    },
    // 结账数据恢复密码框
    shujuhuifu() {
      if (this.queryParams.password3 == 1) {
        this.getListsss();
        this.$message.success("数据恢复成功，数据恢复到"+this.value3+"的状态");
      } else {
        this.$message({
          message: "请输入正确的密码",
          type: "error",
        });
      }
    },
    // 价格分析密码框
    analysis() {
      if (this.queryParams.password1 == 1) {
        this.$router.push("/dept/balance/analysis");
      } else {
        this.$message({
          message: "请输入正确的密码",
          type: "error",
        });
      }
    },
    // 调用页面方法
    kuling() {
      this.$router.push("/dept/balance/eaba01");
    },
    inventory() {
      this.$router.push("/dept/balance/inventory");
    },
    A3() {
      this.$router.push("/dept/balance/A3");
    },
    ABCfenxi() {
      this.$router.push("/dept/balance/ABCfenxi");
    },
    accounts() {
      this.$router.push("/dept/balance/accounts");
    },
    // 原材料调账明细表
    account_adjustment() {
      this.$router.push("/dept/balance/account_adjustment");
    },
    report_lowvalue_consumption() {
      this.$router.push("/dept/balance/report_lowvalue_consumption");
    },
    statistics() {
      this.$router.push("/dept/balance/statistics");
    },

    cleandaymonth() {
      this.$router.push("/dept/balance/cleandaymonth");
    },
    company() {
      this.$router.push("/dept/balance/company");
    },
    inmaterial() {
      this.$router.push("/dept/balance/inmaterial");
    },

    // // 金额计算部分
    // async rowChange(index, row, column) {
    //   if (row != null) {
    //     const taxrate = row.taxrate != null ? row.taxrate : 0;
    //     if (column.property === "inventoryquant") {
    //       //修改数量
    //       if (row.inventoryquant != 0 && row.inventoryprice != 0) {
    //         row.inventorymoney = row.inventoryquant * row.inventoryprice;
    //       } else if (row.inventorymoney != 0 && row.inventoryquant != 0) {
    //         row.inventoryprice = row.inventorymoney / row.inventoryquant;
    //       }
    //     } else if (column.property === "inventoryprice") {
    //       //修改单价
    //       if (row.inventoryquant != 0 && row.inventoryprice != 0) {
    //         row.inventorymoney = row.inventoryquant * row.inventoryprice;
    //       } else if (row.inventorymoney != 0 && row.inventoryprice != 0) {
    //         row.inventoryquant = row.inventorymoney / row.inventoryprice;
    //       }
    //     } else if (column.property === "inventorymoney") {
    //       //修改金额
    //       if (row.inventorymoney != 0 && row.inventoryquant != 0) {
    //         row.inventoryprice = row.inventorymoney / row.inventoryquant;
    //       } else if (row.inventorymoney != 0 && row.inventoryprice != 0) {
    //         row.inventoryquant = row.inventorymoney / row.inventoryprice;
    //       }
    //     }
    //     row.tax_money =
    //       row.inventorymoney != 0 ? row.inventorymoney * (1 - taxrate) : 0;
    //   }
    //   this.$set(this.tableData, index, row); //更新这一行的值
    // },

    // 合计部分
    getSummaries(param) {
      const { columns, data } = param; //这里可以看出，自定义函数会传入每一列，以及数据
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合  计";
          return;
          // 求索引是5和索引大于等于7的合计
        } else if (index === 4 || index >= 6) {
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
            if (index === 4 || index >= 6) {
              sums[4] = parseFloat(sums[4]).toFixed(2);
              sums[6] = parseFloat(sums[6]).toFixed(2);
              sums[7] = parseFloat(sums[7]).toFixed(2);
              sums[8] = parseFloat(sums[8]).toFixed(2);
              sums[9] = parseFloat(sums[9]).toFixed(2);
              sums[10] = parseFloat(sums[10]).toFixed(2);
              sums[11] = parseFloat(sums[11]).toFixed(2);
              sums[12] = parseFloat(sums[12]).toFixed(2);
              sums[13] = parseFloat(sums[13]).toFixed(2);
              sums[14] = parseFloat(sums[14]).toFixed(2);
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

    /** eaba00当前数据查询结存查询列表 */
    getList() {
      this.aaa = true;
      this.bbb = false;
      this.loading = true;
      listBalanceQuery(this.queryParams).then((response) => {
        response.rows.forEach((item) => {
          item.edit = true;
        });
        this.balanceQueryList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** eabah0历史数据查询结存查询列表 */
    getLists() {
      this.aaa = false;
      this.bbb = true;
      this.loading = true;
      listBalanceQuerys(this.queryParams).then((response) => {
        // console.log(response);
        this.balanceQueryList = response.rows;
        this.total1 = response.total;
        this.loading = false;
      });
    },
    /** 结账建账按钮 */
    getListss() {
      this.loading = true;
      listBalanceQueryss(this.queryParams).then((response) => {
        this.balanceQueryList1 = response.rows;
        this.total2 = response.total;
        this.loading = false;
      });
    },
    /** 结账数据恢复按钮 */
    getListsss() {
      this.loading = true;
      listBalanceQuerysss(this.queryParams).then((response) => {
        this.balanceQueryList2 = response.rows;
        this.total3 = response.total;
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
        accountpages: null,
        accountlines: null,
        checkoutmonth: null,
        flag: null,
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

    /** 新增按钮操作 */
    handleAdd() {
      var list = {
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
      this.balanceQueryList.unshift(list);
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const warehousecode = row.warehousecode || this.ids;
      getBalanceQuery(warehousecode).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改结存查询";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.warehousecode != null) {
            updateBalanceQuery(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBalanceQuery(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(scope) {
      this.$confirm("确定删除该条数据吗？", "提示").then(() => {
        this.balanceQueryList.splice(scope.$index, 1);
      });
    },
    // 保存
    handleSaveRow() {
      scope.row.edit = false;
    },
    /** 导出按钮操作 */
    handleExport() {
      this.queryParams.radio = this.radio;
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有结存数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.loadingtext = "导出中...";
          this.daochu = true;
          return exportBalanceQuery(queryParams);
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
/* el-input 的样式修改 */.el-input.is-disabled /deep/ .el-input__inner {
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