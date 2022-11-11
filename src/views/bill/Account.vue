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
       <el-form-item label="统计日期" prop="statisticsdate">
        <el-radio-group v-model="radio">
          <el-radio :label="1">
            <el-date-picker
              style="width: 240px"
              v-model="queryParams.statisticsdate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="统计年月" prop="statisticalmonth">
        <el-radio-group v-model="radio">
          <el-radio :label="2">
            <el-date-picker
              style="width: 150px"
              v-model="queryParams.statisticalmonth"
              placeholder="选择月"
              type="month"
              value-format="yyyy-MM-dd"
              @keyup.enter.native="handleQuery"
            >
            </el-date-picker>
          </el-radio>
        </el-radio-group>
      </el-form-item>
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
      <el-form-item label="用途" prop="useage">
        <el-input
          v-model="queryParams.useage"
          placeholder="请输入用途(工作面或巷道)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="设备名称" prop="equimentname">
        <el-input
          v-model="queryParams.equimentname"
          placeholder="请输入设备名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="领料人" prop="getman">
        <el-input
          v-model="queryParams.getman"
          placeholder="请输入领料人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
       <!-- <el-form-item label="领料班组" prop="deptcode">
        <el-input
          v-model="queryParams.deptcode"
          placeholder="请输入领料班组"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="领料部门" prop="deptcode1">
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
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
        <el-button
        type="success"
        plain
        class="el-icon-printer"
        @click.prevent="print"
        >打印</el-button
      >
      </el-form-item>
    </el-form>

    <el-table :summary-method="getSummariess" show-summary v-loading="loading" :data="detailList" >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="序号" class="xuhao" type="index" width="50" align="center"></el-table-column>
      <el-table-column label="领料单号" width="150" align="center" prop="materialid" /> -->
      <el-table-column label="物料编码" width="200" align="center" prop="itemcode" />
      <el-table-column label="物料名称" width="100" align="center" prop="itemname" />
      <el-table-column label="规格型号" width="100" align="center" prop="model" />
      <el-table-column label="单位" align="center" prop="unit" />
      
      <el-table-column label="用途" align="center" prop="useage" />
      <el-table-column label="设备名称" align="center" prop="equimentnamee" />
      <!-- <el-table-column label="领料人" align="center" prop="getman" /> -->
      <el-table-column label="领料班组" align="center" prop="deptcode" />
      <el-table-column label="领料部门" align="center" prop="deptcode1" />
      <el-table-column label="计划数量" align="center" prop="plannum" />
      <el-table-column width="100" label="单价" align="center" prop="realprice" />
      <el-table-column label="已领数量" align="center" prop="finishnum" />
      <el-table-column label="金额" align="center" prop="totalmoney" />
      <!-- <el-table-column label="领料日期" width="150" align="center" prop="getdate" />
      <el-table-column label="备注" align="center" prop="remarks" /> -->
      <!-- <el-table-column label="安全费用标志" width="150" align="center" prop="safetyfeeflag">
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
      </el-table-column> -->
      <el-table-column label="物料类型" width="200" align="center" prop="materialType">
        
      </el-table-column>
      
      <!-- <el-table-column label="出库时间" width="150" align="center" prop="workdate" /> -->
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
      v-if="this.radio == 1"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <pagination
      v-show="total1>0"
      v-if="this.radio == 2"
      :total="total1"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getLists"
    />

    <!-- 添加或修改领料计划对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { listDetails, listDetailss, exportDetail, exportDetail1} from "@/api/project/detail";
import { timeToString,  timeToString1} from "@/api/project/statistics";
import { getLodop } from "@/api/project/LodopFuncs"; //导入模块

export default {
  name: "Detail",
  dicts: [
    "safetyfeeflag",
  ],
  data() {
    const userInfo = JSON.parse(Cookies.get("userInfo"));
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
      total1: 0,
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
        deleteFlag: null,
        selectedflag: null,
        materialType: null,
        start: null,
        end: null,
        statisticalmonth: null,
        name11:userInfo.userName,
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
    // this.getList();
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
        else if (index === 8 || index === 10 || index === 11) {
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
    // 打印按钮
    print() {
      if (this.detailList.length == 0) {
        this.$message.error("暂无数据，请先查询数据再打印");
      }else{
        let LODOP = getLodop();
LODOP.PRINT_INITA(0,0,2100,2970,"");
LODOP.SET_PRINT_PAGESIZE(0,2100,2970,"");
LODOP.ADD_PRINT_RECT(85,29,1064,640,0,1);
LODOP.ADD_PRINT_TEXT(33,289,240,29,"山西华宁焦煤有限责任公司");
LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
if(this.radio == 1){
LODOP.ADD_PRINT_TEXT(33,511,150,30,timeToString(this.queryParams.statisticsdate[0]));
LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
LODOP.ADD_PRINT_TEXT(33,606,150,30,"至");
LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
LODOP.ADD_PRINT_TEXT(33,631,150,30,timeToString(this.queryParams.statisticsdate[1]));
LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
}
if(this.radio == 2){
  let a = this.queryParams.statisticalmonth.substring(0, 7);
  LODOP.ADD_PRINT_TEXT(33,550,150,30,a);
LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
}
LODOP.ADD_PRINT_TEXT(33,726,108,31,"领料统计表");
LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
LODOP.ADD_PRINT_TEXT(65,831,64,25,"制表人：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(65,880,80,10,this.queryParams.name11);
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(65,947,75,25,"制表日期：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(65,1006,88,25,new Date().toLocaleDateString());
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(90,40,64,25,"物料编码");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(90,110,64,25,"物料名称");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(90,180,64,25,"规格型号");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(90,250,64,25,"单位");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(90,290,130,25,"用途(工作面/巷道)");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(90,440,64,25,"设备名称");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(90,540,70,10,"班组");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(90,610,100,10,"部门(科/队)");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(90,695,64,10,"计划数量");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(90,765,64,10,"完成数量");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(90,855,64,10,"单价");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(90,935,64,10,"金额");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(90,1030,64,10,"类别");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_LINE(105,30,105,1093,0,1);//第一条横线
LODOP.ADD_PRINT_LINE(125,30,125,1093,0,1);
LODOP.ADD_PRINT_LINE(145,30,145,1093,0,1);
LODOP.ADD_PRINT_LINE(165,30,165,1093,0,1);
LODOP.ADD_PRINT_LINE(185,30,185,1093,0,1);
LODOP.ADD_PRINT_LINE(205,30,205,1093,0,1);
LODOP.ADD_PRINT_LINE(225,30,225,1093,0,1);
LODOP.ADD_PRINT_LINE(245,30,245,1093,0,1);
LODOP.ADD_PRINT_LINE(265,30,265,1093,0,1);
LODOP.ADD_PRINT_LINE(285,30,285,1093,0,1);
LODOP.ADD_PRINT_LINE(305,30,305,1093,0,1);
LODOP.ADD_PRINT_LINE(325,30,325,1093,0,1);
LODOP.ADD_PRINT_LINE(345,30,345,1093,0,1);
LODOP.ADD_PRINT_LINE(365,30,365,1093,0,1);
LODOP.ADD_PRINT_LINE(385,30,385,1093,0,1);
LODOP.ADD_PRINT_LINE(405,30,405,1093,0,1);
LODOP.ADD_PRINT_LINE(425,30,425,1093,0,1);
LODOP.ADD_PRINT_LINE(445,30,445,1093,0,1);
LODOP.ADD_PRINT_LINE(465,30,465,1093,0,1);
LODOP.ADD_PRINT_LINE(485,30,485,1093,0,1);
LODOP.ADD_PRINT_LINE(505,30,505,1093,0,1);
LODOP.ADD_PRINT_LINE(525,30,525,1093,0,1);
LODOP.ADD_PRINT_LINE(545,30,545,1093,0,1);
LODOP.ADD_PRINT_LINE(565,30,565,1093,0,1);
LODOP.ADD_PRINT_LINE(585,30,585,1093,0,1);
LODOP.ADD_PRINT_LINE(605,30,605,1093,0,1);
LODOP.ADD_PRINT_LINE(625,30,625,1093,0,1);
LODOP.ADD_PRINT_LINE(645,30,645,1093,0,1);
LODOP.ADD_PRINT_LINE(665,30,665,1093,0,1);
LODOP.ADD_PRINT_LINE(685,30,685,1093,0,1);
LODOP.ADD_PRINT_LINE(705,30,705,1093,0,1);
LODOP.ADD_PRINT_LINE(86,100,725,100,0,1);//第一条竖线
LODOP.ADD_PRINT_LINE(86,170,725,170,0,1);
LODOP.ADD_PRINT_LINE(86,245,725,245,0,1);
LODOP.ADD_PRINT_LINE(86,280,725,280,0,1);
LODOP.ADD_PRINT_LINE(86,420,725,420,0,1);
LODOP.ADD_PRINT_LINE(86,520,725,520,0,1);
LODOP.ADD_PRINT_LINE(86,590,725,590,0,1);
LODOP.ADD_PRINT_LINE(86,690,725,690,0,1);
LODOP.ADD_PRINT_LINE(86,755,725,755,0,1);
LODOP.ADD_PRINT_LINE(86,830,725,830,0,1);
LODOP.ADD_PRINT_LINE(86,910,725,910,0,1);
LODOP.ADD_PRINT_LINE(86,990,725,990,0,1);
LODOP.ADD_PRINT_TEXT(750,30,174,25,"山西华宁焦煤有限责任公司");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
for(let i = 0,j = 110, k = 1 ;i < this.detailList.length;i++,j += 20, k++){
LODOP.ADD_PRINT_TEXT(j,35,80,10,this.detailList[i].itemcode);
LODOP.ADD_PRINT_TEXT(j,103,80,10,this.detailList[i].itemname);
LODOP.ADD_PRINT_TEXT(j,173,90,10,this.detailList[i].model);
LODOP.ADD_PRINT_TEXT(j,250,80,10,this.detailList[i].unit);
LODOP.ADD_PRINT_TEXT(j,283,80,10,this.detailList[i].useage);
LODOP.ADD_PRINT_TEXT(j,423,80,10,this.detailList[i].equimentnamee);
LODOP.ADD_PRINT_TEXT(j,523,80,10,this.detailList[i].deptcode);
LODOP.ADD_PRINT_TEXT(j,593,100,10,this.detailList[i].deptcode1);
LODOP.ADD_PRINT_TEXT(j,693,150,10,this.detailList[i].plannum);
LODOP.ADD_PRINT_TEXT(j,758,100,10,this.detailList[i].finishnum);
LODOP.ADD_PRINT_TEXT(j,833,100,10,this.detailList[i].realprice);
LODOP.ADD_PRINT_TEXT(j,913,80,10,this.detailList[i].totalmoney);
LODOP.ADD_PRINT_TEXT(j,993,110,10,this.detailList[i].materialType);
if (k ==31){
LODOP.NewPage();
k = 0;
j = 1;
LODOP.ADD_PRINT_RECT(1,29,1064,720,0,1);
LODOP.ADD_PRINT_TEXT(4,40,64,25,"物料编码");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(4,110,64,25,"物料名称");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(4,180,64,25,"规格型号");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(4,250,64,25,"单位");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(4,290,130,25,"用途(工作面/巷道)");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(4,440,64,25,"设备名称");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(4,540,70,10,"班组");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(4,610,100,10,"部门(科/队)");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(4,695,64,10,"计划数量");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(4,765,64,10,"完成数量");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(4,855,64,10,"单价");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(4,935,64,10,"金额");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(4,1030,64,10,"类别");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_LINE(20,30,20,1093,0,1);//第一条横线
LODOP.ADD_PRINT_LINE(40,30,40,1093,0,1);
LODOP.ADD_PRINT_LINE(60,30,60,1093,0,1);
LODOP.ADD_PRINT_LINE(80,30,80,1093,0,1);
LODOP.ADD_PRINT_LINE(100,30,100,1093,0,1);
LODOP.ADD_PRINT_LINE(120,30,120,1093,0,1);
LODOP.ADD_PRINT_LINE(140,30,140,1093,0,1);
LODOP.ADD_PRINT_LINE(160,30,160,1093,0,1);
LODOP.ADD_PRINT_LINE(180,30,180,1093,0,1);
LODOP.ADD_PRINT_LINE(200,30,200,1093,0,1);
LODOP.ADD_PRINT_LINE(220,30,220,1093,0,1);
LODOP.ADD_PRINT_LINE(240,30,240,1093,0,1);
LODOP.ADD_PRINT_LINE(260,30,260,1093,0,1);
LODOP.ADD_PRINT_LINE(280,30,280,1093,0,1);
LODOP.ADD_PRINT_LINE(300,30,300,1093,0,1);
LODOP.ADD_PRINT_LINE(320,30,320,1093,0,1);
LODOP.ADD_PRINT_LINE(340,30,340,1093,0,1);
LODOP.ADD_PRINT_LINE(360,30,360,1093,0,1);
LODOP.ADD_PRINT_LINE(380,30,380,1093,0,1);
LODOP.ADD_PRINT_LINE(400,30,400,1093,0,1);
LODOP.ADD_PRINT_LINE(420,30,420,1093,0,1);
LODOP.ADD_PRINT_LINE(440,30,440,1093,0,1);
LODOP.ADD_PRINT_LINE(460,30,460,1093,0,1);
LODOP.ADD_PRINT_LINE(480,30,480,1093,0,1);
LODOP.ADD_PRINT_LINE(500,30,500,1093,0,1);
LODOP.ADD_PRINT_LINE(520,30,520,1093,0,1);
LODOP.ADD_PRINT_LINE(540,30,540,1093,0,1);
LODOP.ADD_PRINT_LINE(560,30,560,1093,0,1);
LODOP.ADD_PRINT_LINE(580,30,580,1093,0,1);
LODOP.ADD_PRINT_LINE(600,30,600,1093,0,1);
LODOP.ADD_PRINT_LINE(620,30,620,1093,0,1);
LODOP.ADD_PRINT_LINE(640,30,640,1093,0,1);
LODOP.ADD_PRINT_LINE(660,30,660,1093,0,1);
LODOP.ADD_PRINT_LINE(680,30,680,1093,0,1);
LODOP.ADD_PRINT_LINE(700,30,700,1093,0,1);
LODOP.ADD_PRINT_LINE(2,100,720,100,0,1);//第一条竖线
LODOP.ADD_PRINT_LINE(2,170,720,170,0,1);
LODOP.ADD_PRINT_LINE(2,245,720,245,0,1);
LODOP.ADD_PRINT_LINE(2,280,720,280,0,1);
LODOP.ADD_PRINT_LINE(2,420,720,420,0,1);
LODOP.ADD_PRINT_LINE(2,520,720,520,0,1);
LODOP.ADD_PRINT_LINE(2,590,720,590,0,1);
LODOP.ADD_PRINT_LINE(2,690,720,690,0,1);
LODOP.ADD_PRINT_LINE(2,755,720,755,0,1);
LODOP.ADD_PRINT_LINE(2,830,720,830,0,1);
LODOP.ADD_PRINT_LINE(2,910,720,910,0,1);
LODOP.ADD_PRINT_LINE(2,990,720,990,0,1);

LODOP.ADD_PRINT_TEXT(750,30,174,25,"山西华宁焦煤有限责任公司");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(730,33,49,20,"合计：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
}
}
LODOP.ADD_PRINT_TEXT(730,33,49,20,"合计：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
let plannum = 0;
let totalmoney = 0;
let finishnum = 0;
  this.detailList.forEach(item => {
    plannum += parseInt(item.plannum) ;
    totalmoney += parseInt(item.totalmoney) ;
    finishnum += parseInt(item.finishnum) ;
  });
LODOP.ADD_PRINT_TEXT(730,695,200,10,plannum);
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(730,760,100,10,finishnum);
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(730,915,100,10,totalmoney);
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
LODOP.PREVIEW(); //预览(预览打印无脚标)
// LODOP.PRINT(); //打印}
      }     
    },
    /** 查询领料计划列表 */
    getList() {
      this.loading = true;
      listDetails(this.queryParams).then(response => {
        console.log(response, '123');
        this.detailList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getLists() {
      this.loading = true;
      listDetailss(this.queryParams).then(response => {
        console.log(response,'465');
        this.detailList = response.rows;
        this.total1 = response.total;
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
        materialType : null,
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
      // this.queryParams.selectedflag = this.radio;
      // this.queryParams.checkOutMonth = timeToString(new Date());
      if (this.radio == 1) {
      //   if (this.queryParams.statisticsdate == null) {
      //   this.$message.error("请选择开始时间");
      // } else if (this.queryParams.statisticsdate == null) {
      //   this.$message.error("请选择结束时间");
      //   return;
      // }
      let start = timeToString(this.queryParams.statisticsdate[0]);
      console.log(this.queryParams.statisticsdate[0]);
      let end = timeToString(this.queryParams.statisticsdate[1]);
      this.queryParams.start = start;
      this.queryParams.end = end;
      this.queryParams.pageNum = 1;
      this.getList();
      }
      if (this.radio == 2) {
      //   if (
      //   this.queryParams.statisticalmonth == "" ||
      //   this.queryParams.statisticalmonth == null
      // ) {
      //   this.$message.error("统计年月不能为空，请输入年月");
      // } 
      this.queryParams.pageNum = 1;
      this.getLists();
      }
      
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },

    /** 导出按钮操作 */
    handleExport() {
      if (this.radio == 1) {
        if (this.detailList.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出领料统计表数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Loading = true;
          return exportDetail(queryParams);
        })
      
        .then((response) => {
          this.download(response.msg);
          this.Loading = false;
        });
      }
      if (this.radio == 2) {
        if (this.detailList.length == 0) {
        this.$message.error("没有数据可以导出，请先查询数据");
        return;
      }
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出领料统计表数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Loading = true;
          return exportDetail1(queryParams);
        })
      
        .then((response) => {
          this.download(response.msg);
          this.Loading = false;
        });
      }
      
    }
  }
};
</script>
