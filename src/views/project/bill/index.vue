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
      <el-form-item label="领料单号" prop="materialid">
        <el-input
          v-model="queryParams.materialid"
          placeholder="请输入领料单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="编制人" prop="operatorname">
        <el-input
          v-model="queryParams.operatorname"
          placeholder="请输入编制人姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="编制时间" prop="operatedate">
        <el-date-picker
          clearable
          v-model="queryParams.operatedate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择编制时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
        <!-- <el-button
        type="success"
        plain
        class="el-icon-printer"
        @click.prevent="print"
        >打印</el-button
      > -->
      </el-form-item>
    </el-form>
    
    <el-form :inline="true">
      <el-form-item label="领料单选择:">
        <el-radio-group v-model="radio" @change="orders">
          <el-radio :label="3">未完成</el-radio>
          <el-radio :label="6">已完成</el-radio>
          <el-radio :label="9">所有订单</el-radio>
        </el-radio-group>
        
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="getmaterialList"
      @row-click="handleSelect"
      highlight-current-row
    >
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
      <el-table-column label="编制人姓名" align="center" prop="operatorname" />
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
          <span>{{ parseTime(scope.row.planconfirmdate, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="矿长审批" align="center" prop="generalconfirm" />
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

    <el-table
      :summary-method="getSummaries"
      show-summary
      :data="getmaterialDetailList"
      :row-class-name="rowGetmaterialDetailIndex"

      ref="getmaterialDetail"
    >
      <!-- <el-table-column type="selection" width="50" align="center" /> -->
      <el-table-column label="序号" align="center" prop="index" width="60" />
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
        prop="inventoryquant"
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
      <el-table-column label="备注" align="center" prop="remarks" width="300" />
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
            :options="dict.type.safetyfeeflag"
            :value="scope.row.financetreatflag"
          />
        </template>
      </el-table-column>
      <el-table-column label="物料类型" align="center" width="200" prop="materialType">
          <template slot-scope="scope">
            <dict-tag
              :options="dict.type.aaal00"
              :value="scope.row.materialType"
            />
          </template>
        </el-table-column>
      <el-table-column label="单价" prop="realprice" width="150">
      </el-table-column>
      <el-table-column label="金额" prop="totalmoney" width="150">
      </el-table-column>
      <el-table-column label="已领数量" prop="finishnum" width="150">
      </el-table-column>
      <el-table-column label="出库时间" prop="workdate" width="150">
      </el-table-column>
      <el-table-column label="所在库房" prop="checkoutmonth" width="150">
      </el-table-column>
      <el-table-column label="审核标志" align="center" prop="checkconfirm">
          <template slot-scope="scope">
            <dict-tag
              :options="dict.type.checkconfirm"
              :value="scope.row.checkconfirm"
            />
          </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total1 > 0"
      v-if="this.radio == 3"
      :total="total1"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getNoList"
    />
    <pagination
      v-show="total2 > 0"
      v-if="this.radio == 6"
      :total="total2"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getYesList"
    />
    <pagination
      v-show="total > 0"
      v-if="this.radio == 9"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    
  </div>
</template>

<script>
import { listGetmaterial, getGetmaterial, listNoGetmaterial, listYesGetmaterial ,exportDetail} from "@/api/project/getmaterial";
import Cookies from 'js-cookie';
const userInfo = JSON.parse(Cookies.get("userInfo"));
import { getLodop } from "@/api/project/LodopFuncs"; //导入模块

export default {
  name: "Getmaterial",
  dicts: [
    "aaal00",
    "aaaz00",
    "safetyfeeflag",
    "aaam00",
    "abc",
    "sys_material_class",
    "sys_ifplan_material",
    "checkconfirm",
  ],
  data() {
    return {
      radio: 9,
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
      total1: 0,
      // 领料查询表格数据
      getmaterialList: [],
      // 领料计划表格数据
      getmaterialDetailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      deptArrId: null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        materialid: null,
        plandate: null,
        deptcode: null,
        deptname: userInfo.dept.deptName,
        operatorname: null,
        operatedate: null,
        getmaterialType: null,
        plancheck: null,
        plancheckdate: null,
        materialType: null,
        planconfirm: null,
        planconfirmdate: null,
        generalconfirm: null,
        generalconfirmdate: null,
        checkoutmonth: null,
        deleteFlag: null,
        redio: null,
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
    orders(val){
      switch(val){
        case 3:
          this.getmaterialDetailList = [];
          this.getNoList();
          break;
        case 6:
          this.getmaterialDetailList = [];
          this.getYesList();
          break;
        case 9:
          this.getmaterialDetailList = [];
          this.getList();
          break;
      }
    },
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
        else if (index === 5 || index === 18 || index === 19) {
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
    /** 查询未完成领料查询列表 */
    getNoList() {
      this.loading = true;
      listNoGetmaterial(this.queryParams).then((response) => {
        this.getmaterialList = response.rows;
        this.total1 = response.total;
        this.loading = false;
      });
    },
    /** 查询已完成领料查询列表 */
    getYesList() {
      this.loading = true;
      listYesGetmaterial(this.queryParams).then((response) => {
        this.getmaterialList = response.rows;
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
      if (this.radio == 3){
        this.getNoList();
      }else if (this.radio == 6){
        this.getYesList();
      }else if (this.radio == 9){
        this.getList();
      }
      // this.queryParams.pageNum = 1;
      // this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },

    /** 查看领料单详情 */
    handleSelect(row) {
      this.reset();
      const id = row.id || this.ids;
      this.deptArrId = id;
      console.log(row.id, this.ids,"row.id, this.ids");
      getGetmaterial(id).then((response) => {
        console.log(response,"response");
        this.form = response.data;
        this.getmaterialDetailList = response.data.getmaterialDetailList;
        console.log(this.getmaterialDetailList);
        this.open = true;
      });
    },

    /** 领料计划序号 */
    rowGetmaterialDetailIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 领料计划添加按钮操作 */
    // handleAddGetmaterialDetail() {
    //   let obj = {};
    //   obj.itemcode = "";
    //   obj.itemname = "";
    //   obj.model = "";
    //   obj.unit = "";
    //   obj.plannum = "";
    //   obj.inventoryquant = "";
    //   obj.useage = "";
    //   obj.equimentname = "";
    //   obj.getman = "";
    //   obj.deptcode = "";
    //   obj.materialType = "";
    //   obj.deptcode1 = "";
    //   obj.getdate = "";
    //   obj.remarks = "";
    //   obj.safetyfeeflag = "";
    //   obj.financetreatflag = "";
    //   obj.realprice = "";
    //   obj.totalmoney = "";
    //   obj.finishnum = "";
    //   obj.checkconfirm = "";
    //   obj.selected = "";
    //   obj.workdate = "";
    //   obj.checkoutmonth = "";
    //   obj.deleteFlag = "";
    //   this.getmaterialDetailList.push(obj);
    // },
    /** 导出按钮操作 */
    handleExport() {
      if (this.getmaterialDetailList.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      this.$confirm("是否确认导出当前选中的数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Loading = true;
          return exportDetail(this.deptArrId);
        })
        .then((response) => {
          this.download(response.msg);
          this.Loading = false;
        });
    },
    // 打印按钮
    print() {
      if (this.getmaterialDetailList.length == 0) {
        this.$message.error("暂无数据，请先查询数据再打印");
      }else{
        let LODOP = getLodop();
LODOP.PRINT_INITA(-13,-61,1182,800,"");
LODOP.SET_PRINT_PAGESIZE(0,2100,2970,"");
LODOP.ADD_PRINT_TEXT(42,650,330,32,"领料计划单");
LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
LODOP.ADD_PRINT_TEXT(42,500,330,32,this.getmaterialList.deptname);
LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
LODOP.ADD_PRINT_TEXT(82,107,175,25,"领料单号：_________________");
LODOP.ADD_PRINT_TEXT(80,170,100,20,this.getmaterialList.materialid);
LODOP.ADD_PRINT_TEXT(82,300,160,25,"领料时间：_______________");
LODOP.ADD_PRINT_TEXT(80,360,100,20,this.getmaterialList.plandate);
LODOP.ADD_PRINT_TEXT(82,476,180,25,"领料部门编号：______________");
LODOP.ADD_PRINT_TEXT(80,570,100,20,this.getmaterialList.deptcode);
LODOP.ADD_PRINT_TEXT(82,665,229,25,"领料部门名称：____________________");
LODOP.ADD_PRINT_TEXT(80,760,100,20,this.getmaterialList.deptname);
LODOP.ADD_PRINT_RECT(106,89,1200,600,0,1);
LODOP.ADD_PRINT_TEXT(111,90,33,24,"序号");
LODOP.ADD_PRINT_TEXT(111,142,57,24,"物料编码");
LODOP.ADD_PRINT_TEXT(111,232,57,24,"物料名称");
LODOP.ADD_PRINT_TEXT(111,309,57,24,"规格型号");
LODOP.ADD_PRINT_TEXT(111,375,33,24,"单位");
LODOP.ADD_PRINT_TEXT(111,414,58,24,"计划数量");
LODOP.ADD_PRINT_TEXT(111,478,117,24,"用途(工作面或巷道)");
LODOP.ADD_PRINT_TEXT(111,600,58,24,"设备名称");
LODOP.ADD_PRINT_TEXT(111,664,47,24,"领料人");
LODOP.ADD_PRINT_TEXT(111,728,34,24,"班组");
LODOP.ADD_PRINT_TEXT(111,781,93,24,"部门（科、队）");
LODOP.ADD_PRINT_TEXT(111,882,61,24,"领料时间");
LODOP.ADD_PRINT_TEXT(111,980,36,24,"备注");
LODOP.ADD_PRINT_TEXT(111,1110,59,24,"物料类型");
LODOP.ADD_PRINT_TEXT(111,1215,82,24,"安全费用标志");

for(let i = 0,j = 135,a = 1 ;i < this.getmaterialDetailList.length;i++,a++,j +=25){
LODOP.ADD_PRINT_TEXT(j,100,100,10,a);
LODOP.ADD_PRINT_TEXT(j,128,100,10,this.getmaterialDetailList[i].itemcode);
LODOP.ADD_PRINT_TEXT(j,213,100,10,this.getmaterialDetailList[i].itemname);
LODOP.ADD_PRINT_TEXT(j,298,90,10,this.getmaterialDetailList[i].model);
LODOP.ADD_PRINT_TEXT(j,375,100,10,this.getmaterialDetailList[i].unit);
LODOP.ADD_PRINT_TEXT(j,410,100,10,this.getmaterialDetailList[i].plannum);
LODOP.ADD_PRINT_TEXT(j,473,100,10,this.getmaterialDetailList[i].useage);
LODOP.ADD_PRINT_TEXT(j,593,100,10,this.getmaterialDetailList[i].equimentnamee);
LODOP.ADD_PRINT_TEXT(j,658,100,10,this.getmaterialDetailList[i].getman);
LODOP.ADD_PRINT_TEXT(j,713,100,10,this.getmaterialDetailList[i].deptcode);
LODOP.ADD_PRINT_TEXT(j,773,100,10,this.getmaterialDetailList[i].deptcode1);
LODOP.ADD_PRINT_TEXT(j,873,100,10,this.getmaterialDetailList[i].getdate);
LODOP.ADD_PRINT_TEXT(j,948,100,10,this.getmaterialDetailList[i].remark);
LODOP.ADD_PRINT_TEXT(j,1048,100,10,this.getmaterialDetailList[i].materialType);
LODOP.ADD_PRINT_TEXT(j,1240,100,10,this.getmaterialDetailList[i].financetreatflag);
}
LODOP.ADD_PRINT_LINE(130,89,130,1289,0,1);//第一条横线
LODOP.ADD_PRINT_LINE(155,89,155,1289,0,1);
LODOP.ADD_PRINT_LINE(180,89,180,1289,0,1);
LODOP.ADD_PRINT_LINE(205,89,205,1289,0,1);
LODOP.ADD_PRINT_LINE(230,89,230,1289,0,1);
LODOP.ADD_PRINT_LINE(255,89,255,1289,0,1);
LODOP.ADD_PRINT_LINE(280,89,280,1289,0,1);
LODOP.ADD_PRINT_LINE(305,89,305,1289,0,1);
LODOP.ADD_PRINT_LINE(330,89,330,1289,0,1);
LODOP.ADD_PRINT_LINE(355,89,355,1289,0,1);
LODOP.ADD_PRINT_LINE(380,89,380,1289,0,1);
LODOP.ADD_PRINT_LINE(405,89,405,1289,0,1);
LODOP.ADD_PRINT_LINE(430,89,430,1289,0,1);
LODOP.ADD_PRINT_LINE(455,89,455,1289,0,1);
LODOP.ADD_PRINT_LINE(480,89,480,1289,0,1);
LODOP.ADD_PRINT_LINE(505,89,505,1289,0,1);
LODOP.ADD_PRINT_LINE(530,89,530,1289,0,1);
LODOP.ADD_PRINT_LINE(555,89,555,1289,0,1);
LODOP.ADD_PRINT_LINE(580,89,580,1289,0,1);
LODOP.ADD_PRINT_LINE(605,89,605,1289,0,1);
LODOP.ADD_PRINT_LINE(630,89,630,1289,0,1);
LODOP.ADD_PRINT_LINE(655,89,655,1289,0,1);
LODOP.ADD_PRINT_LINE(680,89,680,1289,0,1);
LODOP.ADD_PRINT_LINE(705,125,107,125,0,1);//第一条竖线
LODOP.ADD_PRINT_LINE(705,210,107,210,0,1);
LODOP.ADD_PRINT_LINE(705,295,107,295,0,1);
LODOP.ADD_PRINT_LINE(705,370,107,370,0,1);
LODOP.ADD_PRINT_LINE(705,405,107,405,0,1);
LODOP.ADD_PRINT_LINE(705,470,107,470,0,1);
LODOP.ADD_PRINT_LINE(705,590,107,590,0,1);
LODOP.ADD_PRINT_LINE(705,655,107,655,0,1);
LODOP.ADD_PRINT_LINE(705,710,107,710,0,1);
LODOP.ADD_PRINT_LINE(705,770,107,770,0,1);
LODOP.ADD_PRINT_LINE(705,870,107,870,0,1);
LODOP.ADD_PRINT_LINE(705,945,107,945,0,1);
LODOP.ADD_PRINT_LINE(705,1045,107,1045,0,1);
LODOP.ADD_PRINT_LINE(705,1215,107,1215,0,1);
let plannum = 0;
  this.getmaterialDetailList.forEach(item => {
    plannum += parseInt(item.plannum) ;
  });
LODOP.ADD_PRINT_TEXT(715,90,49,10,"合计：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(715,414,100,10,plannum);
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(740,87,105,24,"编制：__________");
LODOP.ADD_PRINT_TEXT(738,120,105,24,this.getmaterialList.operatorname);
LODOP.ADD_PRINT_TEXT(740,195,144,24,"编制时间：____________");
LODOP.ADD_PRINT_TEXT(738,255,105,24,this.getmaterialList.operatedate);
LODOP.ADD_PRINT_TEXT(740,344,124,24,"审核人：___________");
LODOP.ADD_PRINT_TEXT(738,400,105,24,this.getmaterialList.plancheck);
LODOP.ADD_PRINT_TEXT(740,473,146,24,"审核时间：____________");
LODOP.ADD_PRINT_TEXT(738,540,105,24,this.getmaterialList.plancheckdate);
LODOP.ADD_PRINT_TEXT(740,620,146,24,"分管领导：____________");
LODOP.ADD_PRINT_TEXT(738,677,105,24,this.getmaterialList.planconfirm);
LODOP.ADD_PRINT_TEXT(740,769,145,24,"审核时间：____________");
LODOP.ADD_PRINT_TEXT(738,834,105,24,this.getmaterialList.planconfirmdate);
LODOP.ADD_PRINT_TEXT(740,916,100,24,"矿长：_________");
LODOP.ADD_PRINT_TEXT(738,949,105,24,this.getmaterialList.generalconfirm);
LODOP.ADD_PRINT_TEXT(740,1018,144,24,"审批时间：____________");
LODOP.ADD_PRINT_TEXT(738,1075,105,24,this.getmaterialList.generalconfirmdate);
LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
LODOP.PREVIEW(); //预览(预览打印无脚标)
// LODOP.PRINT(); //打印}
      }     
    },

  }
};
</script>
<style scoped>

</style>
