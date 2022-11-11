<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="供应商编号" prop="idSup" label-width="50">
        <el-input
          v-model="queryParams.idSup"
          placeholder="请输入供应商编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商名称" prop="supplier" label-width="50">
        <el-input
          v-model="queryParams.supplier"
          placeholder="请输入供应商名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
          v-hasPermi="['project:supplier:add']"
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
          v-hasPermi="['project:supplier:edit']"
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
          v-hasPermi="['project:supplier:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['project:supplier:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="supplierList" @selection-change="handleSelectionChange" @row-click="getsupplierMaterialList" highlight-current-row>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="供应商编号" align="center" prop="idSup" />
      <el-table-column label="供应商名称" align="center" prop="supplier" width="200%"/>
      <el-table-column label="地址" align="center" prop="address" />
      <el-table-column label="地区" align="center" prop="zoneSup">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zone" :value="scope.row.zoneSup"/>
        </template>
      </el-table-column>
      <el-table-column label="法人" align="center" prop="artPer" />
      <el-table-column label="供方负责人" align="center" prop="saleManager" />
      <el-table-column label="联系人" align="center" prop="contacts" />
      <el-table-column label="供方电话 " align="center" prop="telephone" />
      <el-table-column label="传真" align="center" prop="fax" />
      <el-table-column label="邮编" align="center" prop="postcode" />
      <el-table-column label="Email" align="center" prop="email" />
      <el-table-column label="网址" align="center" prop="url" />
      <el-table-column label="账号" align="center" prop="accountNumber" />
      <el-table-column label="开户银行" align="center" prop="bankName" />
      <el-table-column label="税号" align="center" prop="taxNum" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['project:supplier:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['project:supplier:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  
  <div class="inputDeepp">
    <el-table class="zb" :data="supplierMaterialList" :row-class-name="rowSupplierMaterialIndex" @selection-change="handleSupplierMaterialSelectionChange" ref="supplierMaterial">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index"/>
          <el-table-column label="供方产品编号" prop="itemcodeSup" width="250%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemcodeSup" placeholder="" :style="{width:'70%'}" readonly/>
              <el-button size="small" slot="append" icon="el-icon-search" @click="search(scope.$index,scope.row)" disabled></el-button>
            </template>
          </el-table-column>
          <el-table-column label="供方产品名称" prop="itemnameSup">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemnameSup" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="供销单位" prop="saleunit">
            <template slot-scope="scope">
              <el-input v-model="scope.row.saleunit" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="转换因子" prop="factor">
            <template slot-scope="scope">
              <el-input v-model="scope.row.factor" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="起订数量" prop="amount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="未税单价" prop="price">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="标准单价" prop="standardprice">
            <template slot-scope="scope">
              <el-input v-model="scope.row.standardprice" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="开始日期" prop="dateStart">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.dateStart"
                type="date"
                placeholder=""
                style="width:100%"
                prefix-icon=0
                clearable
                readonly
                >
            </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="结束日期" prop="dateEnd">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.dateEnd"
                type="date"
                placeholder=""
                style="width:100%"
                prefix-icon=0
                clearable
                readonly
                >
            </el-date-picker>
            </template>
          </el-table-column>
        </el-table>
        </div>

        

    <!-- 添加或修改供方档案对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px" :inline="true">
      <el-row>
        <el-col :span="12">
        <el-form-item label="供应商编号" prop="idSup">
          <el-input v-model="form.idSup" placeholder="请输入供应商编号" />
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="供应商名称" prop="supplier">
          <el-input v-model="form.supplier" placeholder="请输入供应商名称" />
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" />
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="地区" prop="zoneSup">
          <el-select v-model="form.zoneSup" placeholder="请选择地区" style="width:93%">
            <el-option
              v-for="dict in dict.type.zone"
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
        <el-form-item label="法人" prop="artPer">
          <el-input v-model="form.artPer" placeholder="请输入法人" />
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="供方负责人" prop="saleManager">
          <el-input v-model="form.saleManager" placeholder="请输入供方负责人" />
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="form.contacts" placeholder="请输入联系人" />
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="供方电话 " prop="telephone">
          <el-input v-model="form.telephone" placeholder="请输入供方电话 " />
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
        <el-form-item label="传真" prop="fax">
          <el-input v-model="form.fax" placeholder="请输入传真" />
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="邮编" prop="postcode">
          <el-input v-model="form.postcode" placeholder="请输入邮编" />
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="请输入Email" />
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="网址" prop="url">
          <el-input v-model="form.url" placeholder="请输入网址" />
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
        <el-form-item label="账号" prop="accountNumber">
          <el-input v-model="form.accountNumber" placeholder="请输入账号" />
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="开户银行" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入开户银行" />
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
        <el-form-item label="税号" prop="taxNum">
          <el-input v-model="form.taxNum" placeholder="请输入税号" />
        </el-form-item>
        </el-col>
      </el-row>
        <el-divider content-position="center">供方产品信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddSupplierMaterial">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteSupplierMaterial">删除</el-button>
          </el-col>
        </el-row>
        <div class="inputDeep">
        <el-table :data="supplierMaterialList" :row-class-name="rowSupplierMaterialIndex" @selection-change="handleSupplierMaterialSelectionChange" ref="supplierMaterial">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column label="供方产品编号" prop="itemcodeSup" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemcodeSup" placeholder="" :style="{width:'70%'}"/>
              <el-button size="small" slot="append" icon="el-icon-search" @click="search(scope.$index,scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column label="供方产品名称" prop="itemnameSup" width="160">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemnameSup" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="供销单位" prop="saleunit" width="50">
            <template slot-scope="scope">
              <el-input v-model="scope.row.saleunit" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="转换因子" prop="factor">
            <template slot-scope="scope">
              <el-input v-model="scope.row.factor" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="起订数量" prop="amount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="未税单价" prop="price">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="标准单价" prop="standardprice">
            <template slot-scope="scope">
              <el-input v-model="scope.row.standardprice" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="开始日期" prop="dateStart" width="140">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.dateStart"
                type="date"
                placeholder=""
                style="width:100%"
                prefix-icon=0
                clearable>
            </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="结束日期" prop="dateEnd" width="140">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.dateEnd"
                type="date"
                placeholder=""
                style="width:100%"
                prefix-icon=0
                clearable>
            </el-date-picker>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 物料编号弹框 -->
    <el-dialog :visible.sync="bcxxopen" width="1000px" append-to-body>
      <el-form :model="queryParam" ref="queryFormm" size="small" :inline="true" label-width="68px">
      <el-form-item label="物料编号" prop="itemcode">
        <el-input
          v-model="queryParam.itemcode"
          placeholder="请输入物料编号"
          clearable
          @keyup.enter.native="handleQuerys"
        />
      </el-form-item>
      <el-form-item label="物料名称" prop="itemname">
        <el-input
          v-model="queryParam.itemname"
          placeholder="请输入物料名称"
          clearable
          @keyup.enter.native="handleQuerys"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuerys">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuerys">重置</el-button>
      </el-form-item>
    </el-form>

        <el-table ref="multipleTable" v-loading="loading" :data="materialList" @selection-change="handleSelectionChangee">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="物料编码" align="center" prop="itemcode" width="200%"/>
        <el-table-column label="物料名称" align="center" prop="itemname" width="200%"/>
        <el-table-column label="购销单位" align="center" prop="saleunit" />
        <el-table-column label="转换因子" align="center" prop="factor" />
        </el-table>

    <pagination
      v-show="totall>0"
      :total="totall"
      :page.sync="queryParam.pageNum"
      :limit.sync="queryParam.pageSize"
      @pagination="getMaterialList"
    />

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormd">确 定</el-button>
            <el-button @click="cancell">取 消</el-button>
        </div>
      </el-dialog>

  </div>
</template>
<script>
import { listSupplier, getSupplier, delSupplier, addSupplier, updateSupplier } from "@/api/project/supplier";
import { listMaterial } from '@/api/project/material';

export default {
  name: "Supplier",
  dicts: ['zone'],
  data() {
    return {
      // 产品（物料管理）表格数据
      materialList: [],
      bcxxopen: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedSupplierMaterial: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      totall: 0,
      // 供方档案表格数据
      supplierList: [],
      // 供方产品表格数据
      supplierMaterialList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        idSup: null,
        supplier: null,
      },
      queryParam:{
        pageNum: 1,
        pageSize: 10,
        itemcode: null,
        itemname: null,
      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: {
        idSup: [
          { required: true, message: "供应商编号不能为空", trigger: "blur" },
          {max: 10, message: "供应商编号最多10个字符", trigger: "blur"}
        ],
        supplier: [
          { required: true, message: "供应商名称不能为空", trigger: "blur" },
          {max: 200, message: "供应商名称最多200个字符", trigger: "blur"}
        ],
        address: [
          {max: 255, message: "地址最多255个字符", trigger: "blur"}
        ],
        taxNum: [
          {max: 50, message: "税号最多50个字符", trigger: "blur"}
        ],
        bankName: [
          {max: 50, message: "开户银行最多50个字符", trigger: "blur"}
        ],
        accountNumber: [
          {max: 50, message: "账号最多50个字符", trigger: "blur"}
        ],
        artPer: [
          {max: 50, message: "联系人最多50个字符", trigger: "blur"}
        ],
        telephone: [
          {max: 30, message: "电话最多30个字符", trigger: "blur"}
        ],
        fax: [
          {max: 30, message: "传真最多30个字符", trigger: "blur"}
        ],
        postcode: [
          {max: 10, message: "邮编最多10个字符", trigger: "blur"}
        ],
        zoneSup: [
          {max: 20, message: "地区最多20个字符", trigger: "blur"}
        ],
        url: [
          {max: 40, message: "网址最多40个字符", trigger: "blur"}
        ],
        saleManager:  [
          {max: 20, message: "供方负责人最多20个字符", trigger: "blur"}
        ],
        email: [
          {max: 50, message: "邮箱最多50个字符", trigger: "blur"}
        ],
        contacts: [
          {max: 20, message: "联系人最多20个字符", trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 子表数据展示
    getsupplierMaterialList(row){
      this.reset();
      const id = row.id || this.ids
      getSupplier(id).then(response => {
        this.supplierMaterialList = response.data.supplierMaterialList;
      });
    },
    cancell(){
      this.bcxxopen = false;
    },
    // 确定按钮
    submitFormd(){
      // 设置table选中行的数据
      this.supplierMaterialList[this.nowindex].itemcodeSup = this.multipleSelection[0].itemcode;
      this.supplierMaterialList[this.nowindex].itemnameSup = this.multipleSelection[0].itemname;
      this.supplierMaterialList[this.nowindex].saleunit = this.multipleSelection[0].saleunit;
      this.supplierMaterialList[this.nowindex].factor = this.multipleSelection[0].factor;
      this.bcxxopen = false;
    },
    // dialog弹框选中的数据
    handleSelectionChangee(val) {
      this.multipleSelection = val;
      if (val.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(val.pop());
      }
    },
    /** 查询产品（物料管理）列表 */
    getMaterialList() {
      console.log(this.queryParam)
        this.loading = true;
        listMaterial(this.queryParam).then(response => {
        this.materialList = response.rows;
        this.totall = response.total;
        this.loading = false;
      });
    },
    // 物料编号点击事件
    search(index, row) {
      this.bcxxopen = true;
      this.nowRow = row;
      this.nowindex = index;
      this.getMaterialList();
    },
    /** 查询供方档案列表 */
    getList() {
      this.loading = true;
      listSupplier(this.queryParams).then(response => {
        this.supplierList = response.rows;
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
        idSup: null,
        supplier: null,
        address: null,
        zoneSup: null,
        artPer: null,
        saleManager: null,
        contacts: null,
        telephone: null,
        fax: null,
        postcode: null,
        email: null,
        url: null,
        accountNumber: null,
        bankName: null,
        taxNum: null,
        managerEmail: null,
        managerCall: null,
        phoneNum: null,
        description: null,
        type: null,
        enabled: null,
        deleteFlag: null
      };
      this.supplierMaterialList = [];
      this.resetForm("form");
    },
    /** 供应商搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 物料搜索按钮操作 */
    handleQuerys() {
      this.queryParams.pageNum = 1;
      this.getMaterialList();
    },
    /** 供应商重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 物料重置按钮操作 */
    resetQuerys() {
      this.resetForm("queryFormm");
      this.handleQuerys();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加供方档案";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSupplier(id).then(response => {
        this.form = response.data;
        this.supplierMaterialList = response.data.supplierMaterialList;
        this.open = true;
        this.title = "修改供方档案";
      });
    },
    /** 提交按钮 */
    submitForm() {
      // 将itemcodeSup赋值给itemcode
      for (var i = 0; i < this.supplierMaterialList.length; i++) {
        this.supplierMaterialList[i].itemcode = this.supplierMaterialList[i].itemcodeSup;
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.supplierMaterialList = this.supplierMaterialList;
          if (this.form.id != null) {
            updateSupplier(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSupplier(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除供方档案编号为"' + ids + '"的数据项？').then(function() {
        return delSupplier(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
	/** 供方产品序号 */
    rowSupplierMaterialIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 供方产品添加按钮操作 */
    handleAddSupplierMaterial() {
      let obj = {};
      obj.itemcode = "";
      obj.itemcodeSup = "";
      obj.itemnameSup = "";
      obj.saleunit = "";
      obj.factor = "";
      obj.amount = "";
      obj.price = "";
      obj.standardprice = "";
      obj.dateStart = "";
      obj.dateEnd = "";
      obj.deleteFlag = "";
      this.supplierMaterialList.push(obj);
      // 将dateStart默认为当前年月日
      this.supplierMaterialList[this.supplierMaterialList.length - 1].dateStart =
        new Date()
      // 将dateEnd默认为当前年月日
      this.supplierMaterialList[this.supplierMaterialList.length - 1].dateEnd =
        new Date()
    },
    /** 供方产品删除按钮操作 */
    handleDeleteSupplierMaterial() {
      if (this.checkedSupplierMaterial.length == 0) {
        this.$modal.msgError("请先选择要删除的供方产品数据");
      } else {
        const supplierMaterialList = this.supplierMaterialList;
        const checkedSupplierMaterial = this.checkedSupplierMaterial;
        this.supplierMaterialList = supplierMaterialList.filter(function(item) {
          return checkedSupplierMaterial.indexOf(item.index) == -1
        });
      }
    },
    /** 复选框选中数据 */
    handleSupplierMaterialSelectionChange(selection) {
      this.checkedSupplierMaterial = selection.map(item => item.index)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.downloads('project/supplier/export', {
        ...this.queryParams
      }, `supplier_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style scoped>
/* 设置文本框边距为0 */
  .inputDeep>>>.el-input__inner {
    padding: 0 4px;
    background-color: white;
    color: black;
  }
  .inputDeepp>>>.el-input__inner {
    border: 0;
    background-color: white;
    color: black;
  }
  .zb{
    margin-top: 40px;
  }
</style>
