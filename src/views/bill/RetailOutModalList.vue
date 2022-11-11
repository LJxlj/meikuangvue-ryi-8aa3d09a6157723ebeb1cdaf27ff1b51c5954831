<template>
  <div class="tableDate">
    <div class="inputDeeps">
      <el-row :gutter="15">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="small"
          label-width="80px"
          label-position="left"
        >
          <el-col :span="21">
            <el-row :gutter="15">
              <el-col :span="4">
                <el-form-item label="领料单号" prop="materialid">
                  <el-input
                    v-model="formData.materialid"
                    :style="{ width: '100%' }"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="领料时间" prop="plandate">
                  <!-- <el-date-picker
                    v-model="formData.field102"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :style="{ width: '100%' }"
                    placeholder="请选择日期选择"
                    clearable
                  ></el-date-picker> -->
                  <el-date-picker
                    v-model="formData.plandate"
                    type="date"
                    format="yyyy/MM/dd"
                    :style="{ width: '100%' }"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="部门编号" prop="deptcode">
                  <el-input
                    v-model="formData.deptcode"
                    placeholder="请输入单行文本"
                    clearable
                    :style="{ width: '100%' }"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="部门名称" prop="deptname">
                  <el-input
                    v-model="formData.deptname"
                    placeholder="请输入单行文本"
                    clearable
                    :style="{ width: '100%' }"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="编制人" prop="operatorname">
                  <el-input
                    v-model="formData.operatorname"
                    placeholder="请输入单行文本"
                    clearable
                    :style="{ width: '100%' }"
                    :readonly="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="编制日期" prop="operatedate">
                  <el-date-picker
                    v-model="formData.operatedate"
                    type="date"
                    format="yyyy/MM/dd"
                    :style="{ width: '100%' }"
                    readonly
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="3" style="margin-top: 20px">
            <el-row :gutter="15">
              <el-col :span="24">
                <el-form-item label="领料类别" prop="getmaterialType">
                  <el-radio-group v-model="formData.getmaterialType">
                    <el-radio
                      v-for="(item, index) in getmaterialTypeOptions"
                      :key="index"
                      :label="item.value"
                      :value="item.value"
                      :disabled="item.disabled"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="21" style="margin-top: -20px">
            <el-row :gutter="15">
              <el-col :span="4">
                <el-form-item label="部门审核" prop="plancheck">
                  <el-input
                    v-model="formData.plancheck"
                    :style="{ width: '100%' }"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="审核日期" prop="plancheckdate">
                  <el-date-picker
                    v-model="formData.plancheckdate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :style="{ width: '100%' }"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="领导审核" prop="planconfirm">
                  <el-input
                    v-model="formData.planconfirm"
                    :style="{ width: '100%' }"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="审核日期" prop="planconfirmdate">
                  <el-date-picker
                    v-model="formData.planconfirmdate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :style="{ width: '100%' }"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="矿长审批" prop="generalconfirm">
                  <el-input
                    v-model="formData.generalconfirm"
                    :style="{ width: '100%' }"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="审批时间" prop="generalconfirmdate">
                  <el-date-picker
                    v-model="formData.generalconfirmdate"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :style="{ width: '100%' }"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="button2" style="width: 20%; ">
      <el-button type="primary" plain size="mini" class="el-icon-plus" @click.prevent="addRow()"
        >添加行</el-button
      >
      <el-button type="danger" plain size="mini" class="el-icon-minus" @click.prevent="delData()"
        >删除行</el-button
      >
    </div>
    <div class="table">
      <div class="inputDeep">
        <el-table
          :summary-method="getSummariess"
          show-summary
          :data="tableData"
          ref="table"
          tooltip-effect="dark"
          border
          style="width: 100%"
          @selection-change="selectRow"
          @row-dblclick="bccelldblclick"
          :cell-style="{padding:'2px'}"
          class="el-table"
        >
          <el-table-column
            type="selection"
            width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            label="序号"
            class="xuhao"
            type="index"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column label="审核状态" width="100" align="center" prop="checkconfirm">
          <template slot-scope="scope">
            <dict-tag
              :options="dict.type.checkconfirm"
              :value="scope.row.checkconfirm"
            />
          </template>
          </el-table-column>
          <el-table-column
            label="物料编码"
            width="300"
            align="center"
            prop="itemcode"
          >
            <template slot-scope="scope">
              <el-input
                class="itemcode"
                v-model="scope.row.itemcode"
                @blur="itemcodelist(scope.$index, scope.row)"
                :style="{ width: '80%' }"
              >
              </el-input>
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="show(scope.$index, scope.row)"
              >
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="物料名称" width="150" align="center">
            <template slot-scope="scope">
              <el-input
                class="itemname"
                v-model="scope.row.itemname"
                :readonly="true"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="规格型号" width="150" align="center">
            <template slot-scope="scope">
              <el-input
                class="model"
                v-model="scope.row.model"
                readonly
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="80" align="center">
            <template slot-scope="scope">
              <el-input
                class="unit"
                v-model="scope.row.unit"
                readonly
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="计划数量" width="100" align="center" prop="plannum">
            <template slot-scope="scope">
              <el-input class="plannum" v-model="scope.row.plannum" @keyup.native="prevent($event)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="库存数量" width="100" align="center">
            <template slot-scope="scope">
              <el-input
                class="inventoryquant"
                v-model="scope.row.inventoryquant"
                readonly
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="用途" width="200" align="center">
            <template slot-scope="scope">
              <el-input class="useage" v-model="scope.row.useage"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="设备名称" width="100" align="center">
            <template slot-scope="scope">
              <el-input
                class="equimentnamee"
                v-model="scope.row.equimentnamee"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="领料人" width="100" align="center">
            <template slot-scope="scope">
              <el-input
                class="getman"
                v-model="scope.row.getman"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="领料班组" width="200" align="center">
            <template slot-scope="scope">
              <el-input
                class="deptcode"
                v-model="scope.row.deptcode"
                readonly
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="领料部门" width="200" align="center">
            <template slot-scope="scope">
              <el-input
                class="deptcode1"
                v-model="scope.row.deptcode1"
                readonly
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="领料日期" width="150" align="center">
            <template slot-scope="scope">
              <!-- <el-input
                type="date"
                class="getdate"
                v-model="scope.row.getdate"
              ></el-input> -->
              <el-date-picker
                v-model="scope.row.getdate"
                type="date"
                placeholder="选择日期"
                style="width: 120%"
                readonly
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="300" align="center">
            <template slot-scope="scope">
              <el-input
                type="text"
                class="remarks"
                v-model="scope.row.remarks"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="安全费用标志" width="130" align="center">
            <template slot-scope="scope">
              <el-radio v-model="scope.row.safetyfeeflag" label="1"
                >是</el-radio
              >
              <el-radio v-model="scope.row.safetyfeeflag" label="2"
                >否</el-radio
              >
            </template>
          </el-table-column>
          <el-table-column label="公司付标志" width="130" align="center">
            <template slot-scope="scope">
              <el-radio
                class="financetreatflag"
                v-model="scope.row.financetreatflag"
                label="1"
                >是</el-radio
              >
              <el-radio
                class="financetreatflag"
                v-model="scope.row.financetreatflag"
                label="2"
                >否</el-radio
              >
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
          <el-table-column label="已领数量" prop="finishnum" width="100" align="center">
            <template slot-scope="scope">
              <el-input
                class="finishnum"
                v-model="scope.row.finishnum"
                readonly
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单价" prop="realprice" width="100" align="center">
            <template slot-scope="scope">
              <el-input
                class="realprice"
                v-model="scope.row.realprice"
                readonly
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="金额" prop="totalmoney" width="100" align="center">
            <template slot-scope="scope">
              <el-input
                class="totalmoney"
                v-model="scope.row.totalmoney"
                readonly
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
        <!-- 物料编码弹框子组件 -->
        <add-or-update
          :addOrUpdateVisible="addOrUpdateVisible"
          @changeShow="showAddOrUpdate"
          ref="addOrUpdateRef"
        ></add-or-update>
      </div>
    </div>
    <!-- 待审核计划查询弹窗 -->
    <el-dialog
      :visible.sync="selectplan"
      width="1100px"
      title="待审核计划"
      append-to-body
    >
      <div class="app-container">
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="getmaterialList"
          @row-click="handleSelect"
          @row-dblclick="submitForm"
          highlight-current-row
        >
          <!-- <el-table-column type="selection" width="55" align="center" /> -->
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
            width="150"
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
              <span>{{
                parseTime(scope.row.plancheckdate, "{y}-{m}-{d}")
              }}</span>
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
          <el-table-column
            label="领料类型"
            align="center"
            prop="getmaterialType"
          >
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
          ref="getmaterialDetail"
        >
          <!-- <el-table-column type="selection" width="50" align="center" /> -->

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
          <el-table-column
            label="备注"
            align="center"
            prop="remarks"
            width="300"
          />
          <el-table-column
            label="安全费用标志"
            prop="safetyfeeflag"
            width="150"
          >
            <template slot-scope="scope">
              <dict-tag
                :options="dict.type.safetyfeeflag"
                :value="scope.row.safetyfeeflag"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="公司付标志"
            prop="financetreatflag"
            width="150"
          >
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
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </el-dialog>
    <!-- 库房弹框 -->
      <el-dialog :title="title" :visible.sync="kufang" width="500px" append-to-body>
        <el-table :data="tableData3" ref="kufang">
           <el-table-column label="物料名称" width="200" align="center" prop="itemname" />
           <el-table-column label="所在库房" width="150" align="center" prop="warehousecode" />
          <el-table-column label="库存数量" width="100" align="center" prop="inventoryquant" />
          </el-table>
      </el-dialog>
    <div class="button1">
    <div class="button" style="width: 700px; float: left">
      <el-button type="primary" plain size="mini" @click="departmentagrees()" v-hasPermi="['project:getmaterial:checkconfirm1']">部门同意</el-button>
      <el-button type="primary" plain size="mini" @click="departmentrefused()" v-hasPermi="['project:getmaterial:checkconfirm2']">部门拒审</el-button>
      <el-button type="primary" plain size="mini" @click="leadersagrees()" v-hasPermi="['project:getmaterial:checkconfirm3']">分管领导同意</el-button>
      <el-button type="primary" plain size="mini" @click="leadersrefused()" v-hasPermi="['project:getmaterial:checkconfirm4']">分管领导拒审</el-button>
      <el-button type="primary" plain size="mini" @click="manageragrees()" v-hasPermi="['project:getmaterial:checkconfirm5']">矿长同意</el-button>
      <el-button type="primary" plain size="mini" @click="managerrefused()" v-hasPermi="['project:getmaterial:checkconfirm6']">矿长拒审</el-button>
    </div>
    <div class="button" style="width: 400px; float: right">
      <el-button type="primary" plain size="mini" @click="selectplancheck">待审核计划查询</el-button>
      <el-button type="primary" plain size="mini" @click="cancels">新增计划</el-button>
      <el-button type="primary" plain size="mini" class="el-icon-success" @click="confirm"
        >保存</el-button
      >

      <el-button
        type="success"
        plain
        size="mini"
        class="el-icon-printer"
        @click.prevent="print"
        >打印</el-button
      >
    </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { addGetmaterial,listGetmaterialpro, getGetmaterial, getmaterialid, updatacheckconfirm1, updatacheckconfirm2, updatacheckconfirm3,
updatacheckconfirm4, updatacheckconfirm5, updatacheckconfirm6, listGetmaterials, listGetmaterialss, updatereviewer1, updatereviewer2, updatereviewer3, updateGetmaterialDetailPlan } from "../../api/project/getmaterial";
import { listAllMaterial,listMaterials } from "@/api/project/material";
import { cxkc } from '@/api/project/eaba00';
// 引入子组件
import AddOrUpdate from "../bill/test/AddOrUpdate.vue";
import { getLodop } from "@/api/project/LodopFuncs"; //导入模块
const userInfo = JSON.parse(Cookies.get("userInfo"));

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
  props: [],
  data() {
    //从cookie内获取用户
    const userInfo = JSON.parse(Cookies.get("userInfo"));
    //获取用户所在的部门编号和名称
    const deptName = userInfo.dept.deptName;
    const deptId = userInfo.dept.deptId;
    console.log(userInfo)

    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedGetmaterialDetail: [],
      // 库存数组
      tableData3: [],
      // 双击库房弹框
      kufang: false,
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
        id: "",
        materialid: null,
        plandate: null,
        deptcode: null,
        deptname: userInfo.dept.deptName,
        roles: [],
        operatorname: null,
        operatedate: null,
        materialType: null,
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
      form: {
        plannum: "",
      },
      // 表单校验
      rules: {
        plannum:[
          { required: true, message: "计划数量不能为空", trigger: "blur" },
        ],
      },
      // 控制弹出框显⽰隐藏
      showDialog: false,
      // 控制物料编码弹窗的显示与隐藏
      addOrUpdateVisible: false,
      formData: {
        id: null,
        materialid: null,
        plandate: new Date(),
        deptcode: deptId,
        deptname: deptName,
        operatorname: userInfo.userName,
        operatedate: new Date(),
        getmaterialType: 0,
        plancheck: null,
        plancheckdate: null,
        planconfirm: null,
        planconfirmdate: null,
        generalconfirm: null,
        generalconfirmdate: null,

      },

      rules: {
        getmaterialType: [
          {
            required: true,
            message: "单选框组不能为空",
            trigger: "change",
          },
        ],
      },
      getmaterialTypeOptions: [
        {
          label: "材料类",
          value: 0,
        },
        {
          label: "设备类",
          value: 1,
        },
      ],
      computed: {},
      watch: {},
      mounted() {},
      tableData: [],
      selectlistRow: [],
      rowNum: 1,
      queryParama: {
        itemcode: "",
      },
      selectplan: false,
    };
    
  },
  // 使用子组件
  components: {
    AddOrUpdate,
  },

  created() {
    console.log(this.formData);
    for (let i = 0; i < 10; i++) {
      this.addRow();
    };
    this.getmaterialid();
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
        else if (index === 4 || index === 17 || index === 18) {
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
    getSummariess(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        }
        else if (index === 7 || index === 19 || index === 21) {
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

//自动生成领料单号
    getmaterialid() {
      this.loading = true;
      //获取最新的领料单号
      getmaterialid().then((response) => {
        console.log(response, "response");
        this.formData.materialid = response.rows[0].materialid - 0;
        let c = this.formData.materialid
        c++
        if(c < 10){
            this.formData.materialid = "000000000" + c
          }else if(c < 100){
            this.formData.materialid = "00000000" + c
          }else if(c < 1000){
            this.formData.materialid = "0000000" + c
          }else if(c < 10000){
            this.formData.materialid = "000000" + c
          }else if(c < 100000){
            this.formData.materialid = "00000" + c
          }else if(c < 1000000){
            this.formData.materialid = "0000" + c
          }else if(c < 10000000){
            this.formData.materialid = "000" + c
          }else if(c < 100000000){
            this.formData.materialid = "00" + c
          }else if(c < 1000000000){
            this.formData.materialid = "0" + c
          }else{
            this.formData.materialid = c
          }
        this.loading = false;
      });
      //如果没有领料单号，则从1开始自动生成
      if (this.formData.materialid == null) {
        this.formData.materialid ="000000000" + 1;
      }
      //console.log(this.formData);
    },

getListaaa(){
  // console.log(this.formData, "formData");
  // console.log(this.queryParams, "queryParams");
  this.queryParams.materialid = this.formData.materialid;
  listGetmaterials(this.queryParams).then((response) => {

    // console.log(response, "111");
    this.formData.plancheck = response.rows[0].plancheck;
    this.formData.plancheckdate = response.rows[0].plancheckdate;
    this.formData.planconfirm = response.rows[0].planconfirm;
    this.formData.planconfirmdate = response.rows[0].planconfirmdate;
    this.formData.generalconfirm = response.rows[0].generalconfirm;
    this.formData.generalconfirmdate = response.rows[0].generalconfirmdate;
  });
    listGetmaterialss(this.queryParams).then((response) => {
    //console.log(this.tableData, "tableData");
    console.log(response, "response");
    this.tableData = response.rows;

  });
  for (let i = 0; i < this.tableData.length ; i++) {
     this.$set(this.tableData, i, this.tableData[i]);
  };

},


    /** 查询领料查询列表 */
    getList() {
      this.loading = true;
  
// console.log(userInfo.roles, "formData");
      userInfo.roles.forEach((item) => {
        console.log(item.roleId, "item.roleid");
        this.queryParams.roles.push(item.roleId);
      });
      listGetmaterialpro(this.queryParams).then((response) => {
        this.getmaterialList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
       console.log(this.queryParams, "queryParams");
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
        materialType: null,
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
    //单元格双击查询物料库存情况
    bccelldblclick(row, column, cell, event) {
          this.kufang = true;
          this.title = "物料库存情况";
          this.queryParams.itemcode = row.itemcode;
          cxkc(this.queryParams).then(response => {
            this.tableData3 = response.rows;
          })
    },
    //待审核计划点击事件
    selectplancheck() {
      this.selectplan = true;
 
      this.getList();
    },

    //待审核计划双击事件
    submitForm(row){
      console.log(row, "row");
      this.formData = row
      const id = row.id || this.ids;
      getGetmaterial(id).then((response) => {
        this.getmaterialDetailList = response.data.getmaterialDetailList;
        this.tableData = this.getmaterialDetailList;
        this.selectplan = false;
      });
    },
// 取消待审核计划弹窗
    canceldialog(){
      this.selectplan = false;
    },

//部门同意按钮
    departmentagrees(){
      updatereviewer1(this.formData).then((response) => {
        this.getListaaa();
      });
      let val = this.selectlistRow;
      console.log(val, "val");
      let ids = [];
      for(let i=0;i<val.length;i++){
        ids.push(val[i].id);
        if(val[i].checkconfirm == "" || val[i].checkconfirm == "2"){
          updatacheckconfirm1(val[i]).then((response) => {
          this.$message.success("部门审核成功");
          this.getListaaa();
        });
        }else{
          this.$message({
            message: "部门审核失败",
            type: "error"
          })
        }
      }
    

    },

//部门拒审按钮
    departmentrefused(){
      updatereviewer1(this.formData).then((response) => {
        this.getListaaa();
      });
      let val = this.selectlistRow;
      console.log(val, "val");
      let ids = [];
      for(let i=0;i<val.length;i++){
        ids.push(val[i].id);
        if(val[i].checkconfirm == "" || val[i].checkconfirm == "1" || val[i].checkconfirm == "4"){
          updatacheckconfirm2(val[i]).then((response) => {
          this.$message({
            message: "部门拒审成功",
            type: "success"
          })
          this.getListaaa();
        });
        }else{
          this.$message({
            message: "部门拒审失败",
            type: "error"
          })
        }
      }
    },
//分管领导同意按钮
    leadersagrees(){
      updatereviewer2(this.formData).then((response) => {
        this.getListaaa();
      });
      let val = this.selectlistRow;
      console.log(val, "val");
      let ids = [];
      for(let i=0;i<val.length;i++){
        ids.push(val[i].id);
        if(val[i].checkconfirm == "1" || val[i].checkconfirm == "4"){
          updatacheckconfirm3(val[i]).then((response) => {
          this.$message({
            message: "领导审核成功",
            type: "success"
          })
          this.getListaaa();
        });
        }else{
          this.$message({
            message: "领导审核失败",
            type: "error"
          })
        }
      }

    },
    //分管领导拒审按钮
    leadersrefused(){
      updatereviewer2(this.formData).then((response) => {
        this.getListaaa();
      });
      let val = this.selectlistRow;
      let ids = [];
      for(let i=0;i<val.length;i++){
        ids.push(val[i].id);
        if(val[i].checkconfirm == "1" || val[i].checkconfirm == "3" || val[i].checkconfirm == "6"){
          updatacheckconfirm4(val[i]).then((response) => {
          this.$message({
            message: "领导拒审成功",
            type: "success"
          })
          this.getListaaa();
        });
        }else{
          this.$message({
            message: "领导拒审失败",
            type: "error"
          })
        }
      }
    },
    //矿长同意按钮
    manageragrees(){
      updatereviewer3(this.formData).then((response) => {
        this.getListaaa();
      });
      let val = this.selectlistRow;
      let ids = [];
      for(let i=0;i<val.length;i++){
        ids.push(val[i].id);
        if(val[i].checkconfirm == "3" || val[i].checkconfirm == "6"){
          updatacheckconfirm5(val[i]).then((response) => {
          this.$message({
            message: "矿长审核成功",
            type: "success"
          })
          this.getListaaa();
        });
        }else{
          this.$message({
            message: "矿长审核失败",
            type: "error"
          })
        }
      }
    },
    //矿长拒审按钮
    managerrefused(){
      updatereviewer3(this.formData).then((response) => {
        this.getListaaa();
      });
      let val = this.selectlistRow;
      let ids = [];
      for(let i=0;i<val.length;i++){
        ids.push(val[i].id);
        if(val[i].checkconfirm == "3" || val[i].checkconfirm == "5"){
          updatacheckconfirm6(val[i]).then((response) => {
          this.$message({
            message: "矿长拒审成功",
            type: "success"
          })
          this.getListaaa();
        });
        }else{
          this.$message({
            message: "矿长拒审失败",
            type: "error"
          })
        }
      }
    },

    // 查询所有产品（物料管理）列表
    getListAll() {
      this.loading = true;
      listAllMaterial(this.queryParama).then((response) => {
        this.materialListNo = response;
        this.loading = false;
      });
      //console.log(listAllMaterial(this.queryParama));
    },

    // 物料编号失去焦点事件
    itemcodelist(index, row) {
      this.queryParama.itemcode = row.itemcode;
      this.getListAll();
      console.log(this.queryParama);
      setTimeout(() => {
        this.materialListNo.forEach((item) => {
          if (item.itemcode == this.tableData[index].itemcode) {
            this.tableData[index].itemname = item.itemname;
            this.tableData[index].unit = item.unit;
            this.tableData[index].inventory = item.inventory;
            this.tableData[index].model = item.model;
            this.tableData[index].inventoryquant = item.inventoryquant;
            this.tableData[index].materialType = item.materialType;
          }
        });
      }, 500);
    },
    // 打印按钮
    print() {
      if (this.tableData.length == 0) {
        this.$message.error("暂无数据，请先查询数据再打印");
      }else{
        let LODOP = getLodop();
LODOP.PRINT_INITA(-13,-61,1182,800,"");
LODOP.SET_PRINT_PAGESIZE(0,2100,2970,"");
LODOP.ADD_PRINT_TEXT(42,650,330,32,"领料计划单");
LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
LODOP.ADD_PRINT_TEXT(42,500,330,32,this.formData.deptname);
LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
LODOP.ADD_PRINT_TEXT(82,107,175,25,"领料单号：_________________");
LODOP.ADD_PRINT_TEXT(80,170,100,20,this.formData.materialid);
LODOP.ADD_PRINT_TEXT(82,300,160,25,"领料时间：_______________");
LODOP.ADD_PRINT_TEXT(80,360,100,20,this.formData.plandate);
LODOP.ADD_PRINT_TEXT(82,476,180,25,"领料部门编号：______________");
LODOP.ADD_PRINT_TEXT(80,570,100,20,this.formData.deptcode);
LODOP.ADD_PRINT_TEXT(82,665,229,25,"领料部门名称：____________________");
LODOP.ADD_PRINT_TEXT(80,760,100,20,this.formData.deptname);
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

for(let i = 0,j = 135,a = 1 ;i < this.tableData.length;i++,a++,j +=25){
LODOP.ADD_PRINT_TEXT(j,100,100,10,a);
LODOP.ADD_PRINT_TEXT(j,128,100,10,this.tableData[i].itemcode);
LODOP.ADD_PRINT_TEXT(j,213,100,10,this.tableData[i].itemname);
LODOP.ADD_PRINT_TEXT(j,298,90,10,this.tableData[i].model);
LODOP.ADD_PRINT_TEXT(j,375,100,10,this.tableData[i].unit);
LODOP.ADD_PRINT_TEXT(j,410,100,10,this.tableData[i].plannum);
LODOP.ADD_PRINT_TEXT(j,473,100,10,this.tableData[i].useage);
LODOP.ADD_PRINT_TEXT(j,593,100,10,this.tableData[i].equimentnamee);
LODOP.ADD_PRINT_TEXT(j,658,100,10,this.tableData[i].getman);
LODOP.ADD_PRINT_TEXT(j,713,100,10,this.tableData[i].deptcode);
LODOP.ADD_PRINT_TEXT(j,773,100,10,this.tableData[i].deptcode1);
LODOP.ADD_PRINT_TEXT(j,873,100,10,this.tableData[i].getdate);
LODOP.ADD_PRINT_TEXT(j,948,100,10,this.tableData[i].remark);
LODOP.ADD_PRINT_TEXT(j,1048,100,10,this.tableData[i].materialType);
LODOP.ADD_PRINT_TEXT(j,1240,100,10,this.tableData[i].financetreatflag);
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
  this.tableData.forEach(item => {
    plannum += parseInt(item.plannum) ;
  });
LODOP.ADD_PRINT_TEXT(715,90,49,10,"合计：");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(715,414,100,10,plannum);
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.ADD_PRINT_TEXT(740,87,105,24,"编制：__________");
LODOP.ADD_PRINT_TEXT(738,120,105,24,this.formData.operatorname);
LODOP.ADD_PRINT_TEXT(740,195,144,24,"编制时间：____________");
LODOP.ADD_PRINT_TEXT(738,255,105,24,this.formData.operatedate);
LODOP.ADD_PRINT_TEXT(740,344,124,24,"审核人：___________");
LODOP.ADD_PRINT_TEXT(738,400,105,24,this.formData.plancheck);
LODOP.ADD_PRINT_TEXT(740,473,146,24,"审核时间：____________");
LODOP.ADD_PRINT_TEXT(738,540,105,24,this.formData.plancheckdate);
LODOP.ADD_PRINT_TEXT(740,620,146,24,"分管领导：____________");
LODOP.ADD_PRINT_TEXT(738,677,105,24,this.formData.planconfirm);
LODOP.ADD_PRINT_TEXT(740,769,145,24,"审核时间：____________");
LODOP.ADD_PRINT_TEXT(738,834,105,24,this.formData.planconfirmdate);
LODOP.ADD_PRINT_TEXT(740,916,100,24,"矿长：_________");
LODOP.ADD_PRINT_TEXT(738,949,105,24,this.formData.generalconfirm);
LODOP.ADD_PRINT_TEXT(740,1018,144,24,"审批时间：____________");
LODOP.ADD_PRINT_TEXT(738,1075,105,24,this.formData.generalconfirmdate);
LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");
LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
LODOP.PREVIEW(); //预览(预览打印无脚标)
// LODOP.PRINT(); //打印}
      }     
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "project/getmaterial/export",
        {
          ...this.queryParams,
        },
        `getmaterial_${new Date().getTime()}.xlsx`
      );
    },


    //点击新增计划刷新当前页面
    cancels() {
      window.location.reload();
    },

    //点击确定按钮数据提交
    confirm() {
      //如果itemcode为空，则循环删除行所有空行
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].itemcode == "") {
          this.tableData.splice(i, 1);
          i--;
        }
        if(this.tableData[i].useage == ''){
          this.$message.error('用途不能为负数或空')
          return;
        }else if(this.tableData[i].plannum <= 0 || this.tableData[i].plannum == ''){
          this.$message.error('计划数量不能为负数或空')
          return;
        }
      }
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id == undefined) {
          this.formData.getmaterialDetailList = this.tableData;
          //console.log(this.formData);
          addGetmaterial(this.formData).then((response) => {
            // this.$modal.msgSuccess("保存成功");
          });
        }else if (this.tableData[i].checkconfirm == "2" || this.tableData[i].checkconfirm == "") {
          updateGetmaterialDetailPlan(this.tableData[i]).then((response) => {
            // this.$message.success('修改成功');
            this.getListaaa();
          });
        }else {
          this.$message({
            message: "该物料已通过审核，您无权修改此计划",
            type: "error"
          })
          return;
        }
        
      }
      this.$message.success('保存成功');

      // this.formData.getmaterialDetailList = this.tableData;
      // addGetmaterial(this.formData).then((response) => {
      //   this.$modal.msgSuccess("新增成功");
      // });
    },

    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val;
    },
    // 增加行
    addRow() {
      var list = {
        rowNum: this.rowNum,
        post_id: [],
        require_des: "",
        materialid: "",
        checkconfirm: "",
        itemcode: "",
        itemname: "",
        model: "",
        unit: "",
        plannum: "",
        inventoryquant: "",
        realprice: "0.00",
        totalmoney: "0.00",
        finishnum: "0.00",
        useage: "",
        equimentnamee: "",
        getman: "",
        deptcode: "",
        deptcode1: "",
        getdate: "",
        remarks: "",
        safetyfeeflag: "",
        financetreatflag: "",
        materialType: "",
      };
      this.tableData.push(list);
      this.rowNum += 1;
      // getdate默认为当前年月日
      this.tableData[this.tableData.length - 1].getdate = new Date();
      //领料人为当前登录用户
      this.tableData[this.tableData.length - 1].getman =
        this.formData.operatorname;
      //部门为当前登录用户部门
      this.tableData[this.tableData.length - 1].deptcode =
        this.formData.deptname;
      this.tableData[this.tableData.length - 1].deptcode1 =
        this.formData.deptname;
      //安全费用标志默认为否
      this.tableData[this.tableData.length - 1].safetyfeeflag = "2";
      //公司付标志默认为否
      this.tableData[this.tableData.length - 1].financetreatflag = "2";
    },
    // 删除方法
    // 删除选中行
    delData() {
      for (let i = 0; i < this.selectlistRow.length; i++) {
        let val = this.selectlistRow;
        // 获取选中行的索引的方法
        // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {
          this.tableData.forEach((v, i) => {
            if (val.rowNum === v.rowNum) {
              // i 为选中的索引
              this.tableData.splice(i, 1);
            }
          });
        });
      }
      // 删除完数据之后清除勾选框
      this.$refs.table.clearSelection();
    },
    // 按钮点击事件 显示子组件弹窗组件s
    show(index) {
      console.log(this.$refs.addOrUpdateRef, "z");

      this.$refs.addOrUpdateRef.getListss(this.formData.getmaterialType);

      this.nowindex = index;
    },
    // 监听 子组件弹窗关闭后触发，有子组件调用
    showAddOrUpdate(data) {
      for(let i =0;i<this.tableData.length;i++){
        if(this.tableData[i].itemcode == this.$refs.addOrUpdateRef.multipleSelection[0].itemcode){
          this.$message.error("同一个采购计划里面物料编号不能重复");
          return false;
        }
        }
      if (data === "yes") {
      this.queryParama.itemcode = this.$refs.addOrUpdateRef.multipleSelection[0].itemcode;
      listMaterials(this.queryParama).then((res)=>{
         //子组件点击确定后传入数据
        this.tableData[this.nowindex].itemcode =
          res.rows[0].itemcode;
        this.tableData[this.nowindex].itemname =
          res.rows[0].itemname;
        this.tableData[this.nowindex].model =
          res.rows[0].model;
        this.tableData[this.nowindex].unit =
          res.rows[0].unit;
        this.tableData[this.nowindex].materialType =
          res.rows[0].materialType;
        this.tableData[this.nowindex].inventoryquant =
          res.rows[0].inventoryquant;
        // this.tableData[this.nowindex].realprice =
        //   res.rows[0].inventoryprice;
      })
      
       

        this.addOrUpdateVisible = false;
      } else if (data === "no") {
        this.addOrUpdateVisible = false;
      }
    },
  },
};
</script>
<style scoped>
/* 利用穿透，设置input边框隐藏 */
.inputDeep >>> .el-input__inner {
  border: 0;
}
/* 如果你的 el-input type 设置成textarea ，就要用这个了 */
.inputDeep >>> .el-textarea__inner {
  border: 0;
  resize: none; /* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
}
.inputDeeps{
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }
.inputDeep{
  margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
}
.button1{
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
}
.button2{
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
}
.el-radio /deep/ .el-radio__label {
  font-size: 15px !important;
}
.el-table /deep/ .cell {
  padding: 0px;
  padding-left: 0px;
  padding-right: 0px;
  /*background-color: white;*/
}
</style>
