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
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['project:material:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['project:material:edit']"
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
          v-hasPermi="['project:material:remove']"
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
          v-hasPermi="['project:material:export']"
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
      :data="materialList"
      @selection-change="handleSelectionChange"
      @row-click="getMaterialInitialStock"
      highlight-current-row
      border
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column
        label="物料编号"
        align="left"
        prop="itemcode"
        width="150%"
      />
      <el-table-column
        label="物料名称"
        align="left"
        prop="itemname"
        width="150%"
      />
      <el-table-column label="规格型号" align="left" prop="model" />
      <el-table-column label="图纸编号" align="left" prop="designcode" />
      <el-table-column label="重量" align="left" prop="weight" />
      <el-table-column label="图片名称" align="left" prop="imgName" />
      <el-table-column label="库存单位" align="left" prop="unit" />
      <el-table-column label="购销单位" align="left" prop="saleunit" />
      <el-table-column label="转换因子" align="rigth" prop="factor" />
      <el-table-column label="保质期天数" align="right" prop="expiryNum" />
      <el-table-column label="安全库存" align="right" prop="safetyStock" />
      <el-table-column label="物料种类" align="left" prop="materialClass">
        <template slot-scope="scope">
          <span
            v-for="dict in dict.type.sys_material_class"
            :key="dict.value"
            v-if="scope.row.materialClass == dict.value"
            >{{ dict.label }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        label="物料分类"
        align="left"
        prop="materialType"
        width="200%"
      >
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.aaal00"
            :value="scope.row.materialType"
          />
        </template>
      </el-table-column>
      <el-table-column label="采购分类" align="left" prop="purchaseType">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.aaam00"
            :value="scope.row.purchaseType"
          />
        </template>
      </el-table-column>
      <el-table-column label="领料分类" align="left" prop="getmaterialType">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.aaaz00"
            :value="scope.row.getmaterialType"
          />
        </template>
      </el-table-column>
      <el-table-column label="标准成本" align="right" prop="standardcost" />
      <el-table-column label="实际成本" align="right" prop="realcost" />
      <el-table-column label="目标成本" align="right" prop="targetcost" />
      <el-table-column label="计划价格" align="right" prop="planprice" />
      <el-table-column label="统计价格" align="right" prop="statisticprice" />
      <el-table-column label="备注" align="left" prop="remark" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['project:material:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['project:material:remove']"
            >删除</el-button
          >
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

<div class="inputDeep">
    <el-table class="zb" v-loading="loading" :data="materialInitialStockList" :row-class-name="rowMaterialInitialStockIndex" style="width: 100%" ref="materialInitialStock">
          <!-- <el-table-column type="selection" width="50%" align="center" /> -->
          <el-table-column label="序号" align="center" prop="index"/>
          <el-table-column label="仓库" prop="deptId" align="center">
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.deptId" disabled></el-input> -->
              <el-select v-model="scope.row.deptId" placeholder="" disabled >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="再测天数" prop="measureinterval">
            <template slot-scope="scope">
              <el-input v-model="scope.row.measureinterval" placeholder="" disabled/>
            </template>
          </el-table-column>
          <el-table-column label="是否为计划出入库房" prop="ifplan">
            <template slot-scope="scope">
              <el-input v-for="dict in dict.type.sys_ifplan_material" v-model="dict.label" :key="dict.value" v-if="scope.row.ifplan == dict.value" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column label="缺省单位" prop="defaultposition">
            <template slot-scope="scope">
              <el-input v-model="scope.row.defaultposition" placeholder="" disabled/>
            </template>
          </el-table-column>
          <el-table-column label="ABC编码" prop="abcCode">
            <template slot-scope="scope">
              <el-input v-model="scope.row.abcCode" placeholder="" disabled/>
            </template>
          </el-table-column>
        </el-table>
    </div>

    

    <!-- 添加或修改产品（物料管理）对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body>
      <el-form
        ref="form"
        :model="form"
        label-width="180px"
        :rules="rules"
        :inline="true"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="物料编号" prop="itemcode">
              <el-input
                v-model="form.itemcode"
                placeholder="请输入物料编号"
                clearable
                :readonly="status ? false : 'readonly'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="物料名称" prop="itemname">
              <el-input
                v-model="form.itemname"
                placeholder="请输入物料名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="规格型号" prop="model">
              <el-input
                v-model="form.model"
                placeholder="请输入规格型号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图纸编号" prop="designcode">
              <el-input
                v-model="form.designcode"
                placeholder="请输入图纸编号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="重量" prop="weight">
              <el-input
                v-model="form.weight"
                placeholder="请输入重量"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片名称" prop="imgName">
              <el-input
                v-model="form.imgName"
                placeholder="请输入图片名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="库存单位" prop="unit">
              <el-input
                v-model="form.unit"
                placeholder="请输入库存单位"
                clearable
                @change="changeSaleunit()"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购销单位" prop="saleunit">
              <el-input
                v-model="form.saleunit"
                placeholder="请输入购销单位"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="转换因子" prop="factor">
              <el-input
                v-model="form.factor"
                placeholder="请输入转换因子"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保质期天数" prop="expiryNum">
              <el-input
                v-model="form.expiryNum"
                placeholder="请输入保质期天数"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="安全库存" prop="safetyStock">
              <el-input
                v-model="form.safetyStock"
                placeholder="请输入安全库存"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="物料种类" prop="materialClass">
              <el-select
                v-model="form.materialClass"
                placeholder="请选择物料种类"
              >
                <el-option
                  v-for="dict in dict.type.sys_material_class"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物料分类" prop="materialType">
              <el-select
                v-model="form.materialType"
                placeholder="请选择物料分类"
              >
                <el-option
                  v-for="dict in dict.type.aaal00"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采购分类" prop="purchaseType">
              <el-select
                v-model="form.purchaseType"
                placeholder="请选择采购分类"
              >
                <el-option
                  v-for="dict in dict.type.aaam00"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="领料分类" prop="getmaterialType">
              <el-select
                v-model="form.getmaterialType"
                placeholder="请选择领料分类"
              >
                <el-option
                  v-for="dict in dict.type.aaaz00"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标准成本" prop="standardcost">
              <el-input
                v-model="form.standardcost"
                placeholder="请输入标准成本"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际成本" prop="realcost">
              <el-input
                v-model="form.realcost"
                placeholder="请输入实际成本"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标成本" prop="targetcost">
              <el-input
                v-model="form.targetcost"
                placeholder="请输入目标成本"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划价格" prop="planprice">
              <el-input
                v-model="form.planprice"
                placeholder="请输入计划价格"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="统计价格" prop="statisticprice">
              <el-input
                v-model="form.statisticprice"
                placeholder="请输入统计价格"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="form.remark"
                placeholder="请输入备注"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="center">物料库存信息描述信息</el-divider>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAddMaterialInitialStock"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDeleteMaterialInitialStock"
              >删除</el-button
            >
          </el-col>
        </el-row>
        <!-- el-table居中 -->
        <!-- <el-table v-loading="loading" :data="materialInitialStock" border style="width: 100%"> -->

        <el-table
          :data="materialInitialStockList"
          :row-class-name="rowMaterialInitialStockIndex"
          border
          style="width: 100%"
          @selection-change="handleMaterialInitialStockSelectionChange"
          ref="materialInitialStock"
        >
          <el-table-column type="selection" width="50%" align="center" />
          <el-table-column
            label="序号"
            align="center"
            prop="index"
            width="200%"
          />
          <el-table-column
            label="仓库"
            prop="deptId"
            width="182%"
            align="center"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.deptId" placeholder="">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="再测天数" prop="measureinterval" width="150%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.measureinterval" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column
            label="是否为计划出入库房"
            prop="ifplan"
            width="150%"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.ifplan" placeholder="">
                <el-option
                  v-for="dict in dict.type.sys_ifplan_material"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="缺省单位" prop="defaultposition" width="150%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.defaultposition" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="ABC编码" prop="abcCode" width="150%">
            <template slot-scope="scope">
              <el-select v-model="scope.row.abcCode" placeholder="">
                <el-option
                  v-for="dict in dict.type.abc"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listMaterial,
  getMaterial,
  delMaterial,
  addMaterial,
  updateMaterial,
  exportManagement
} from "@/api/project/material";
import { listDept } from "../../../api/system/dept";

export default {
  name: "Material",
  dicts: [
    "aaaz00",
    "aaal00",
    "aaam00",
    "abc",
    "sys_material_class",
    "sys_ifplan_material",
  ],
  data() {
    return {
      // 显示要删除的物料编号
      delitemcode:[],
      // 选中数据
      selection: [],
      // 只读状态
      status: true,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedMaterialInitialStock: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 产品（物料管理）表格数据
      materialList: [],
      // 物料库存信息描述表格数据
      materialInitialStockList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      options: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        itemcode: null,
        itemname: null,
      },
      queryParamsdept: {
        deptType: "07",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        itemcode: [
          { required: true, message: "物料编号不能为空", trigger: "blur" },
          { max: 50, message: "物料编号最多50个字符", trigger: "blur" },
        ],
        itemname: [
          { required: true, message: "物料名称不能为空", trigger: "blur" },
          { max: 50, message: "物料名称最多50个字符", trigger: "blur" },
        ],
        model: [{ max: 50, message: "规格型号最多50个字符", trigger: "blur" }],
        designcode: [
          { max: 50, message: "图纸编号最多50个字符", trigger: "blur" },
        ],
        unit: [{ max: 50, message: "单位最多50个字符", trigger: "blur" }],
        saleunit: [{ max: 8, message: "购销单位最多8个字符", trigger: "blur" }],
        factor: [
          {
            pattern: /^\d{1,14}(\.\d{0,6})?$/,
            message: "最多14位数字，小数点后不能超过6位",
            trigger: "blur",
          },
        ],
        expiryNum: [
          {
            pattern:
              /^\d{1}$|^\d{2}$|^\d{3}$|^\d{4}$|^\d{5}$|^\d{6}$|^\d{7}$|^\d{8}$|^\d{9}$|^\d{10}$/,
            message: "请输入低于10位的数字",
            trigger: "blur",
          },
        ],
        safetyStock: [
          {
            pattern: /^\d{1,14}(\.\d{0,2})?$/,
            message: "最多14位数字，小数点后不能超过2位",
            trigger: "blur",
          },
        ],
        standardcost: [
          {
            pattern: /^\d{1,14}(\.\d{0,2})?$/,
            message: "最多14位数字，小数点后不能超过2位",
            trigger: "blur",
          },
        ],
        realcost: [
          {
            pattern: /^\d{1,14}(\.\d{0,2})?$/,
            message: "最多14位数字，小数点后不能超过2位",
            trigger: "blur",
          },
        ],
        targetcost: [
          {
            pattern: /^\d{1,14}(\.\d{0,2})?$/,
            message: "最多14位数字，小数点后不能超过2位",
            trigger: "blur",
          },
        ],
        planprice: [
          {
            pattern: /^\d{1,14}(\.\d{0,2})?$/,
            message: "最多14位数字，小数点后不能超过2位",
            trigger: "blur",
          },
        ],
        statisticprice: [
          {
            pattern: /^\d{1,14}(\.\d{0,2})?$/,
            message: "最多14位数字，小数点后不能超过2位",
            trigger: "blur",
          },
        ],
        remark: [{ max: 100, message: "备注最多100个字符", trigger: "blur" }],
        weight: [
          {
            pattern: /^\d{1,24}(\.\d{0,6})?$/,
            message: "最多24位数字，小数点后不能超过6位",
            trigger: "blur",
          },
        ],
        imgName: [
          { max: 500, message: "图片名称最多500个字符", trigger: "blur" },
        ],
        // measureinterval:[
        //   {pattern: /^\d{1,10}$/, message: '请输入低于10位的数字', trigger: 'blur'}
        // ],
        // defaultposition:[
        //   {max: 10, message: "缺省单位最多10个字符", trigger: "blur"}
        // ]
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 查询物料库存信息
    getMaterialInitialStock(row) {
      this.reset();
      const id = row.id || this.ids
      getMaterial(id).then(res => {
        console.log(res)
        this.materialInitialStockList = res.data.materialInitialStockList;
        listDept(this.queryParamsdept).then(response => {
        // response.data.forEach(item => {
        //   res.data.materialInitialStockList.forEach(item1 => {
        //     if(item.deptId == item1.deptId){
        //       item1.deptId = item.deptName;
        //     }
        //   })
        // })
        // this.materialInitialStockList = res.data.materialInitialStockList;
      // });
      
        this.options = response.data.map(item => {
        //   console.log(this.options)
           return {
             value: item.deptId,
             label: item.deptName,
           }
        })
      })
      })
    },
    // 购销单位随库存单位变化的方法
    changeSaleunit() {
      if (this.form.unit == "") {
        this.form.saleunit = "";
      } else {
        this.form.saleunit = this.form.unit;
      }
    },
    // 验证物料编号是否存在
    // checkItemcode(rule, value, callback,rows) {
    //     if(this.form.id ==null){
    //       if (value) {
    //         let params = {itemcode: value,};
    //     checkMaterialItemcode(params).then(response => {
    //       if(response.code==200){
    //         if(response.total>0){
    //           callback(new Error("物料编号已存在"));
    //         }else{
    //           callback()
    //         }
    //       }else{
    //         callback();
    //       }
    //     });
    //   };
    // }else{
    //   callback();
    // }
    // },
    /** 查询产品（物料管理）列表 */
    getList() {
      this.loading = true;
      listMaterial(this.queryParams).then((response) => {
        this.materialList = response.rows;
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
        itemcode: null,
        itemname: null,
        model: null,
        designcode: null,
        weight: null,
        imgName: null,
        unit: null,
        saleunit: null,
        factor: null,
        expiryNum: null,
        safetyStock: null,
        materialType: null,
        purchaseType: null,
        getmaterialType: null,
        standardcost: null,
        realcost: null,
        targetcost: null,
        planprice: null,
        statisticprice: null,
        remark: null,
      };
      this.materialInitialStockList = [];
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
      this.selection = selection;
    },
    /** 新增按钮操作 */
    handleAdd() {
      listDept(this.queryParamsdept).then((response) => {
        this.options = response.data.map((item) => {
          return {
            value: item.deptId,
            label: item.deptName,
          };
        });
      });
      this.reset();
      this.open = true;
      this.title = "新增物料";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.status= false;
      this.reset();
      listDept(this.queryParamsdept).then(response => {
        this.options = response.data.map(item => {
          return {
            value: item.deptId,
            label: item.deptName,
          }
        })
      })
      const id = row.id || this.ids
      getMaterial(id).then(response => {
        this.form = response.data;
        this.materialInitialStockList = response.data.materialInitialStockList;
        this.open = true;
        this.title = "修改物料";
      });
    },
    /** 提交按钮 */
    submitForm() {
       // 当库房为空或者相等时过滤空行
      this.materialInitialStockList = this.materialInitialStockList.filter(
        (item) => item.deptId !== ""
      );
      for(let i = 0;i<this.materialInitialStockList.length;i++){
        for(let j = i+1;j<this.materialInitialStockList.length;j++){
          if(this.materialInitialStockList[i].deptId == this.materialInitialStockList[j].deptId){
          this.$modal.msgError("请选择不同的仓库");
          return;
        }
        }
      }
     
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.materialInitialStockList = this.materialInitialStockList;
          if (this.form.id != null) {
            updateMaterial(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMaterial(this.form).then((response) => {
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
      const ids = row.id || this.ids;
      // 循环选中数据，将itemcode赋值给delitemcode
      this.selection.forEach(item => {
        this.delitemcode.push(item.itemcode);
      });
      var that = this;
      console.log(this.selection,"selection")
      console.log(this.delitemcode,"row")
      this.$modal.confirm('是否确认删除产品（物料管理）编号为"' + this.delitemcode + '"的数据项？').then(function() {
         delMaterial(ids).then((response) => {
            console.log(response,"response")
            if(response.code == 200){
              that.$alert('删除成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                that.getList();
              }
            });
            }
        });
      }).then(() => {
      }).catch(() => {});
      this.delitemcode = [];
    },
    /** 物料库存信息描述序号 */
    rowMaterialInitialStockIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 物料库存信息描述添加按钮操作 */
    handleAddMaterialInitialStock() {
      listDept(this.queryParamsdept).then((response) => {
        this.options = response.data.map((item) => {
          return {
            value: item.deptId,
            label: item.deptName,
          };
        });
      });
      let obj = {};
      obj.deptId = "";
      obj.measureinterval = 0;
      obj.ifplan = "1";
      obj.defaultposition = "0000000000";
      obj.abcCode = "C";
      this.materialInitialStockList.push(obj);
    },
    /** 物料库存信息描述删除按钮操作 */
    handleDeleteMaterialInitialStock() {
      if (this.checkedMaterialInitialStock.length == 0) {
        this.$modal.msgError("请先选择要删除的物料库存信息描述数据");
      } else {
        const materialInitialStockList = this.materialInitialStockList;
        const checkedMaterialInitialStock = this.checkedMaterialInitialStock;
        this.materialInitialStockList = materialInitialStockList.filter(
          function (item) {
            return checkedMaterialInitialStock.indexOf(item.index) == -1;
          }
        );
      }
    },
    /** 复选框选中数据 */
    handleMaterialInitialStockSelectionChange(selection) {
      this.checkedMaterialInitialStock = selection.map((item) => item.index);
    },
    /** 导出按钮操作 */
    handleExport() {
      // this.downloads(
      //   "project/material/export",
      //   {
      //     ...this.queryParams,
      //   },
      //   `material_${new Date().getTime()}.xlsx`
      // );
      
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有物料管理数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.loading = true;
          this.exportLoading = true;
          return exportManagement(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.loading = false;
          this.exportLoading = false;
        })
        
    },
  },
};
</script>
<style scoped>
/* 利用穿透，设置input边框隐藏 */
  .inputDeep>>>.el-input__inner {
    border: 0;
    padding: 0 4px;
    background-color: white;
    color: black;
  }
  .zb{
    margin-top: 40px;
  }
  /* .el-table /deep/ .el-input__inner{
  text-align: left;
} */
</style>
