<template>
  <!-- <div class="abc"> -->
    <!-- <el-container style="height: 600px; border: 5px solid #eee"> -->
    <div  class="inputDeepp">
      <el-form ref="formData" :model="formData" :rules="rules" size="small" label-width="100px">
      <el-row :gutter="0">
        <el-col :span="4">
          <el-form-item label="供应商编号" prop="idSup">
            <el-input v-model="formData.idSup" :style="{width: '100%'}" :disabled="status ? false : 'disabled'">
            <el-button size="small" slot="append" icon="el-icon-search" @click="search" :disabled="status ? false : 'disabled'"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商名称" prop="supplier">
            <el-input v-model="formData.supplier" :style="{width: '100%'}" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="联系人" prop="nameLinkman">
            <el-input v-model="formData.nameLinkman" :disabled="status ? false : 'disabled'" :style="{width: '100%'}"></el-input>
            <!-- <el-select v-model="formData.nameLinkman" :style="{width: '100%'}" :disabled="status ? false : 'disabled'">
            <el-option
              v-for="dict in dict.type.name_linkman"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="部门编号" prop="idDept">
            <el-input v-model="formData.idDept" :style="{width: '100%'}" :disabled="status ? false : 'disabled'">
            <el-button size="small" slot="append" icon="el-icon-search" @click="deptid" :disabled="status ? false : 'disabled'"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="部门名称" prop="deptName">
            <el-input v-model="formData.deptName" :style="{width: '100%'}" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="业务员" prop="nameBuyer">
            <el-select v-model="formData.nameBuyer" :style="{width: '100%'}" :disabled="status ? false : 'disabled'">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="日期" prop="dateSign">
            <el-date-picker v-model="formData.dateSign" type="date" format="yyyy-MM-dd" :style="{width: '100%'}"
            prefix-icon=0
            :disabled="status ? false : 'disabled'"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单编号" prop="codeContract">
            <el-input v-model="formData.codeContract" :style="{width: '100%'}" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单序号" prop="idContract">
            <el-input v-model="formData.idContract" :style="{width: '100%'}" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注" prop="note">
            <el-input v-model="formData.note" :style="{width: '100%'}" :disabled="status ? false : 'disabled'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="4">
          <el-form-item label="订单状态" prop="flagStatus">
            <el-input v-model="formData.flagStatus" :style="{width: '100%'}" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="制单人" prop="operator">
            <el-input v-model="formData.operator" :style="{width: '100%'}" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="审核人" prop="checker">
            <el-input v-model="formData.checker" :style="{width: '100%'}" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="注销人" prop="checkout">
            <el-input v-model="formData.checkout" :style="{width: '100%'}" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
        <el-form-item label="订单编号" prop="codeContract">
            <el-input
          v-model="queryParams.codeContract"
          clearable
          @keyup.enter.native="show"
          :style="{width: '100%'}"
           @blur="show"
        />
          </el-form-item>
          </el-col>
          </el-row>
            <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="handleAddPurchaseOrderArticle" :disabled="statuss ? false : 'disabled'"> 新增 </el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button type="warning" icon="el-icon-edit" size="mini" plain @click="edit" :disabled="statussa ? false : 'disabled'"> 修改 </el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="handleDeletePurchaseOrderArticle" :disabled="statuss ? false : 'disabled'"> 删除 </el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="handleAdd"> 增加采购订单 </el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button type="success" icon="el-icon-search" size="mini" plain @click="look"> 查询 </el-button>
            </el-col>
            <!-- <el-col :span="1.5">
            <el-button type="info" icon="el-icon-plus" size="mini" plain> 生成采购订单 </el-button>
            </el-col> -->
            <el-col :span="1.5">
            <el-button type="success" icon="el-icon-circle-check" size="mini" plain @click="saveTable"> 保存 </el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button type="success" icon="el-icon-circle-check" size="mini" plain @click="shenhe"> 审核 </el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button type="success" icon="el-icon-circle-check" size="mini" plain @click="shenheqx"> 审核取消 </el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="caigouhetong"> 自动生成采购合同 </el-button>
            </el-col>
            <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-printer" size="mini" plain @click="dayin"> 打印 </el-button>
            </el-col>
            </el-row>

<!-- 自动生成采购合同弹框 -->
      <el-dialog :visible.sync="cght" width="1500px" append-to-body :title="title">
        <el-table ref="cghttable" v-loading="loading" :data="caigouhetonglist" @selection-change="handleSelectionChangecght">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="物料编码" align="center" prop="itemcode" width="150%">
          <template slot-scope="scope">
            <el-input class="itemcode" v-model="scope.row.itemcode" readonly/>
          </template>
        </el-table-column>
        <el-table-column label="物料名称" align="center" prop="itemname">
          <template slot-scope="scope">
            <el-input class="itemname" v-model="scope.row.itemname" readonly/>
          </template>
        </el-table-column>
        <el-table-column label="规格型号" align="center" prop="model">
          <template slot-scope="scope">
            <el-input class="model" v-model="scope.row.model" readonly/>
          </template>
        </el-table-column>
        <el-table-column label="供方编号" align="center" prop="idSup">
          <template slot-scope="scope">
          <el-select v-model="scope.row.idSup" @change="gbsupplier(scope.$index,scope.row.idSup)">
            <el-option 
              v-for="item in scope.row.supplierLists"
              :key="item.idSup"
              :value="item.idSup">
            </el-option>
          </el-select>
          </template>
        </el-table-column>
        <el-table-column label="供应商名称" align="center" prop="supplier">
          <template slot-scope="scope">
            <el-input v-model="scope.row.supplier" readonly></el-input>
            <!-- <el-select v-model="scope.row.supplier">
            <el-option
              v-for="item in scope.row.supplierLists"
              :key="item.supplier"
              :value="item.supplier">
            </el-option>
          </el-select> -->
          </template>
        </el-table-column>
        <el-table-column label="采购数量" align="center" prop="purchasenum">
          <template slot-scope="scope">
            <el-input class="purchasenum" v-model="scope.row.purchasenum" readonly/>
          </template>
        </el-table-column>
        <el-table-column label="已订货数量" align="center" prop="ydhsl">
          <template slot-scope="scope">
            <el-input class="ydhsl" v-model="scope.row.ydhsl" readonly/>
          </template>
        </el-table-column>
        <el-table-column label="需求部门" align="center" prop="deptcode">
          <template slot-scope="scope">
            <el-input class="deptcode" v-model="scope.row.deptcode" readonly/>
          </template>
        </el-table-column>
        </el-table>

    <pagination
      v-show="total>0"
      :total="totalls"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="caigouhetong"
    />

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormcght">生成订单</el-button>
            <el-button @click="cancelcght">取 消</el-button>
        </div>
      </el-dialog>

 <!-- 供应商编号弹框 -->
      <el-dialog :visible.sync="bcxxopen" width="1000px" append-to-body :title="title">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
      <el-form-item label="供应商编号" prop="idSup">
        <el-input
          v-model="queryParams.idSup"
          placeholder="请输入供应商编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商名称" prop="supplier">
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

        <el-table ref="multipleTable" v-loading="loading" :data="supplierList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="供应商编号" align="center" prop="idSup"/>
        <el-table-column label="供应商名称" align="center" prop="supplier"/>
        </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getSupplierList"
    />

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 物料编号弹框 -->
      <el-dialog :visible.sync="bcopen" width="1000px" append-to-body :title="title">
      <!-- <el-form :model="queryParams" ref="queryForms" size="small" :inline="true" label-width="68px">
      <el-form-item label="物料编号" prop="itemcode">
        <el-input
          v-model="queryParams.itemcode"
          placeholder="请输入物料编号"
          clearable
          @keyup.enter.native="handleQueryMaterial"
        />
      </el-form-item>
      <el-form-item label="物料名称" prop="itemname">
        <el-input
          v-model="queryParams.itemname"
          placeholder="请输入物料名称"
          clearable
          @keyup.enter.native="handleQueryMaterial"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQueryMaterial">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQueryMaterial">重置</el-button>
      </el-form-item>
    </el-form> -->

        <el-table ref="multipleTableMaterial" v-loading="loading" :data="materialList" @selection-change="handleSelectionChangeMaterial">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="物料编码" align="center" prop="itemcode" width="200%" readonly/>
        <el-table-column label="物料名称" align="center" prop="itemnameSup" width="200%"/>
        <el-table-column label="单位" align="center" prop="saleunit" />
        </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getListss"
    />

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormMaterial">确 定</el-button>
            <el-button @click="cancelMaterial">取 消</el-button>
        </div>
      </el-dialog>
<!-- 查询弹框 -->
      <el-dialog :visible.sync="bcopens" append-to-body :title="title" width="1500px">
        <el-table v-loading="loading" :data="tableData" @row-click="getpurchaseOrderArticleList" highlight-current-row>
      <el-table-column label="订单编号" align="center" prop="codeContract" />
      <el-table-column label="供应商编号" align="center" prop="idSup" />
      <el-table-column label="供应商名称" align="center" prop="supplier" width="300"/>
      <el-table-column label="签定日期" align="center" prop="dateSign">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dateSign, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需求部门" align="center" prop="idDept" />
      <el-table-column label="业务员" align="center" prop="nameBuyer" />
      <el-table-column label="订单状态" align="center" prop="flagStatus" />
      <el-table-column label="制单人" align="center" prop="operator" />
      <el-table-column label="审核人" align="center" prop="checker" />
      <el-table-column label="注销人" align="center" prop="checkout" />
      <el-table-column label="备注" align="center" prop="note" />
    </el-table>

<el-table :data="purchaseOrderArticleLists" ref="purchaseOrderArticle">
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column label="物料编号" prop="idProduct">
            <template slot-scope="scope">
              <el-input v-model="scope.row.idProduct" readonly />
            </template>
          </el-table-column>
           <el-table-column label="物料名称" prop="itemname">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemname" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="model">
            <template slot-scope="scope">
              <el-input v-model="scope.row.model" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="unit">
            <template slot-scope="scope">
              <el-input v-model="scope.row.unit" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="amount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="单价" prop="price">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="金额" prop="total">
            <template slot-scope="scope">
              <el-input v-model="scope.row.total" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="交货日期" prop="datePaying">
            <template slot-scope="scope">
              <el-date-picker clearable v-model="scope.row.datePaying" type="date" value-format="yyyy-MM-dd" :style="{width:'100%'}" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="已入库数量" prop="amountWarehouse">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amountWarehouse" placeholder="" readonly/>
            </template>
          </el-table-column>
        </el-table>

    <pagination
      v-show="total>0"
      :total="totall"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getLists"
    />
      </el-dialog>
<!-- 部门弹框 -->
      <el-dialog :visible.sync="dept" append-to-body :title="title" width="800px" >
        <el-table v-loading="loading" :data="deptData" @selection-change="handleSelectionChangeDept">
        <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="部门编号" align="center" prop="deptId" />
          <el-table-column label="部门名称" align="center" prop="deptName" />
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getDeptList"
        />

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormDept">确 定</el-button>
            <el-button @click="cancelDept">取 消</el-button>
        </div>
      </el-dialog>

<!-- 从表数据 -->
    <div class="inputDeep">
      <el-table
        :data="purchaseOrderArticleList"
        ref="table"
        border
        tooltip-effect="dark"
        :cell-style="{padding:'2px'}"
        show-summary
        class="el-table"
        :summary-method="getSummaries"
        :row-class-name="rowPurchaseOrderArticleIndex"
        @selection-change="handlePurchaseOrderArticleSelectionChange">
      <el-table-column type="selection" width="50" align="center" />
        <el-table-column label="序号" type="index" width="50%" align="center"></el-table-column>
      <el-table-column label="产品编号" width="300%" align="center" prop="idProduct">
          <template slot-scope="scope">
            <el-input class='idProduct' v-model="scope.row.idProduct"  readonly>
            <el-button slot="append" icon="el-icon-search" @click="searchMaterial(scope.$index,scope.row)" :disabled="status ? false : 'disabled'"></el-button>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" align="center" prop="itemnameSup" width="300%">
          <template slot-scope="scope">
            <el-input class="itemname" v-model="scope.row.itemname" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="规格" align="center" prop="model">
          <template slot-scope="scope">
            <el-input class="model" v-model="scope.row.model" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单位" align="center" prop="saleunit">
          <template slot-scope="scope">
            <el-input class="unit" v-model="scope.row.unit" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="数量" align="center" prop="amount">
          <template slot-scope="scope">
            <el-input-number :min=null :style="{ width: '100%' }" :controls="false" :precision="4" class="amount" v-model="scope.row.amount" :disabled="status ? false : 'disabled'" @input="rowChange(scope.$index, scope.row, scope.column)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="无税单价" align="center" prop="price">
          <template slot-scope="scope">
            <el-input-number :min=null :style="{ width: '100%' }" :controls="false" :precision="4" class="price" v-model="scope.row.price" :disabled="status ? false : 'disabled'" @input="rowChange(scope.$index, scope.row, scope.column)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="无税金额" align="center" prop="total">
          <template slot-scope="scope">
            <el-input-number :min=null :style="{ width: '100%' }" :controls="false" :precision="4" class="total" v-model="scope.row.total" :disabled="status ? false : 'disabled'" @input="rowChange(scope.$index, scope.row, scope.column)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="交货日期" align="center" prop="datePaying">
          <template slot-scope="scope">
            <el-date-picker prefix-icon=0 clearable v-model="scope.row.datePaying" type="date" value-format="yyyy-MM-dd" :style="{width:'100%'}" :readonly="status ? false : 'readonly'"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="已入库数量" align="center" prop="amountWarehouse">
          <template slot-scope="scope">
            <el-input style="text-align-last: right" class="amountWarehouse" v-model="scope.row.amountWarehouse" readonly></el-input>
          </template>
        </el-table-column>
      </el-table>
       </div>
       </el-form>
       
  </div>
  <!-- </el-container> -->
  <!-- </div> -->
</template>
<script>
import { listOrder, getOrder, listOrders,addOrder, updateOrder,listOrdercode,updateOrders,updateOrdersqx,listOrderadd,listcaigouhetong,updateOrderscht } from "@/api/project/order";
import {listSupplier} from "@/api/project/supplier";
import {listMaterial} from "@/api/project/material";
import {listDepts} from "@/api/system/dept";
import Cookies from 'js-cookie'
import {getSuppliers} from "@/api/project/supplier";
import { getLodop } from "@/api/project/LodopFuncs"; //导入模块

export default {
  name: "Order",
  dicts: ['name_buyer' , 'flagstatus', 'name_linkman'],
  components: {},
  props: [],
  data() {
    return {
      supplierLists: [],
      // 自动生成采购合同数据
      caigouhetonglist: [],
      // 自动生成采购合同
      cght: false,
      totall: 0,
      statuss: true,
      status:false,
      statussa: true,
      // 部门弹框数据
      deptData: [],
      // 部门编号弹框
      dept:false,
      // 弹出层标题
      title: "",
      tableData: [],
      // 查询弹框
      bcopens: false,
      // 查询物料编号数据
      materialList: [],
      // 物料编号弹框
      bcopen: false,
      // 业务员
      options:[{
        value:'编码',
        label:'编码'
        },{
        value:'曹武清',
        label:'曹武清'
        },{
        value:'高伟泽',
        label:'高伟泽'
        },{
        value:'郝兵',
        label:'郝兵'
        },{
        value:'贺鹏举',
        label:'贺鹏举'
        },{
        value:'景洋',
        label:'景洋'
        },{
        value:'李红',
        label:'李红'
        },{
        value:'李建清',
        label:'李建清'
        },{
        value:'李康平',
        label:'李康平'
        },{
        value:'王三珍',
        label:'王三珍'
        },{
        value:'张振辉',
        label:'张振辉'
        }
      ],
      // 选中数组
      ids: [],
      totalls:0,
      // 总条数
      total: 0,
      // 供应商弹框
      bcxxopen: false,
      // 生成采购订单选中数据数据
      cghtlist: [],
      // 供应商列表
      supplierList: [],
      orderlist: [],
      // 采购订单从表格数据
      purchaseOrderArticleList: [],
      purchaseOrderArticleLists: [],
      queryParam:{
        codeContract:null,
        idContract:null,
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        codeContract: null,
        idSup: null,
        supplier: null,
        idContract: null,
        itemcode: null,
        itemname: null,
        deptName: null,
        id: null,
      },
      optionss:[],
      // 遮罩层
      loading: true,
      formData: {
        id: null,
        idContract: null,
        codeContract: null,
        dateSign: null,
        idSup: null,
        supplier: null,
        idDept: null,
        nameBuyer: null,
        nameLinkman: null,
        rateTax: null,
        currencyB: null,
        rateExchange: null,
        currencyA: null,
        priceprecition: null,
        typeItemcal: null,
        dcnttype: null,
        dcntcaltype: null,
        dcntbtype: null,
        dcntinput: null,
        dcntcaldpnt: null,
        total: null,
        sumDiscount: null,
        rateDiscount: null,
        sumAss: null,
        sumTax: null,
        flagStatus: null,
        operator: null,
        checker: null,
        checkout: null,
        note: null,
        flagDiscountcaled: null,
        flagAuxacc: null,
        deptName: null,
      },
      rules: {
        idSup:[
          { required: true, message: "供应商编号不能为空", trigger: "blur" },
        ],
        idDept:[
          { required: true, message: "部门编号不能为空", trigger: "blur" },
        ],
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getList();
    this.getListss();
  },
  mounted() {
  },
  methods: {
    // 打印
    dayin(){
      let LODOP = getLodop(); //调用getLodop获取LODOP对象
      LODOP.PRINT_INIT("");
      LODOP.SET_PRINT_PAGESIZE(0,2100,2970,"");
      LODOP.ADD_PRINT_TEXT(62,244,383,35,"山西华宁焦煤有限责任公司采购订单");
      LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.SET_PRINT_STYLEA(0,"Horient",2);
      LODOP.ADD_PRINT_TEXT(111,59,76,25,"供方编号");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(128,127,127,227,0,1);
      LODOP.ADD_PRINT_TEXT(111,235,76,25,"供方名称");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(128,304,127,557,0,1);
      LODOP.ADD_PRINT_TEXT(111,560,61,25,"联系人");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(127,612,126,712,0,1);
      LODOP.ADD_PRINT_TEXT(138,59,76,25,"部门编号");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(155,126,154,226,0,1);
      LODOP.ADD_PRINT_TEXT(138,235,76,25,"部门名称");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(155,304,154,404,0,1);
      LODOP.ADD_PRINT_TEXT(138,406,61,25,"业务员");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(155,457,154,557,0,1);
      LODOP.ADD_PRINT_TEXT(138,575,41,25,"日期");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(155,613,154,713,0,1);
      LODOP.ADD_PRINT_TEXT(165,59,75,25,"订单序号");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(183,127,182,227,0,1);
      LODOP.ADD_PRINT_TEXT(165,235,77,25,"订单编号");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(183,303,182,403,0,1);
      LODOP.ADD_PRINT_TEXT(165,422,44,25,"备注");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(183,458,182,713,0,1);
      LODOP.ADD_PRINT_RECT(190,40,711,264,0,1);
      LODOP.ADD_PRINT_LINE(213,40,212,751,0,1);
      for(let i = 0,j = 1,k = 218;i<this.purchaseOrderArticleList.length;i++,j++,k+=22){
        // 序号数据
        LODOP.ADD_PRINT_TEXT(k,30,43,25,j);
        LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
        // 物料编码数据
        LODOP.ADD_PRINT_TEXT(k,80,100,25,this.purchaseOrderArticleList[i].idProduct);
        // 物料名称数据
        LODOP.ADD_PRINT_TEXT(k,200,100,25,this.purchaseOrderArticleList[i].itemname);
        // 规格型号数据
        LODOP.ADD_PRINT_TEXT(k,300,100,60,this.purchaseOrderArticleList[i].model);
        // 单位数据
        LODOP.ADD_PRINT_TEXT(k,400,100,25,this.purchaseOrderArticleList[i].unit);
        // 采购数量数据
        LODOP.ADD_PRINT_TEXT(k,449,84,25,this.purchaseOrderArticleList[i].amount);
        LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
        // 单价数据
        LODOP.ADD_PRINT_TEXT(k,533,69,25,this.purchaseOrderArticleList[i].price);
        LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
        // 金额数据
        LODOP.ADD_PRINT_TEXT(k,602,69,25,this.purchaseOrderArticleList[i].total);
        LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
        // 备注数据
        LODOP.ADD_PRINT_TEXT(k,671,100,25,"111");
      }
      let amount = 0;
      let total = 0;
      this.purchaseOrderArticleList.forEach(item => {
        amount += item.amount;
        total += parseInt(item.total);
      });
      LODOP.ADD_PRINT_TEXT(438,120,43,25,"合计");
      LODOP.ADD_PRINT_TEXT(438,449,84,25,amount);
      LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
      LODOP.ADD_PRINT_TEXT(438,602,69,25,total);
      LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
      LODOP.ADD_PRINT_LINE(235,40,234,751,0,1);
      LODOP.ADD_PRINT_TEXT(195,42,43,25,"序号");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(195,94,75,25,"物料编码");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(454,77,190,78,0,1);
      LODOP.ADD_PRINT_LINE(454,178,190,179,0,1);
      LODOP.ADD_PRINT_TEXT(195,204,73,25,"物料名称");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(454,294,190,295,0,1);
      LODOP.ADD_PRINT_TEXT(195,312,75,25,"规格型号");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(454,395,190,396,0,1);
      LODOP.ADD_PRINT_TEXT(195,406,44,25,"单位");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(454,449,190,450,0,1);
      LODOP.ADD_PRINT_TEXT(195,459,74,25,"采购数量");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(454,533,190,534,0,1);
      LODOP.ADD_PRINT_TEXT(195,550,45,25,"单价");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(454,602,190,603,0,1);
      LODOP.ADD_PRINT_TEXT(195,619,48,25,"金额");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(454,671,190,672,0,1);
      LODOP.ADD_PRINT_TEXT(195,693,43,25,"备注");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_LINE(257,40,256,751,0,1);
      LODOP.ADD_PRINT_LINE(279,40,278,751,0,1);
      LODOP.ADD_PRINT_LINE(301,40,300,751,0,1);
      LODOP.ADD_PRINT_LINE(323,40,322,751,0,1);
      LODOP.ADD_PRINT_LINE(345,40,344,751,0,1);
      LODOP.ADD_PRINT_LINE(367,40,366,751,0,1);
      LODOP.ADD_PRINT_LINE(389,40,388,751,0,1);
      LODOP.ADD_PRINT_LINE(411,40,410,751,0,1);
      LODOP.ADD_PRINT_LINE(433,40,432,751,0,1);
      LODOP.ADD_PRINT_TEXT(467,56,74,25,"审核人：");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(467,214,75,25,"操作员：");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(467,402,79,25,"内审员：");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(467,582,74,25,"保管员：");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(111,130,105,25,this.formData.idSup);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(111,308,246,25,this.formData.supplier);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(111,616,110,25,this.formData.nameLinkman);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(138,130,105,25,this.formData.idDept);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(138,308,110,25,this.formData.deptName);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(138,459,110,25,this.formData.nameBuyer);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(138,616,101,25,this.formData.dateSign);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(166,128,105,25,this.formData.idContract);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(166,308,105,25,this.formData.codeContract);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(166,458,261,25,this.formData.note);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(467,116,100,25,this.formData.checker);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(467,273,120,25,this.formData.operator);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(467,460,115,25,"内审员数据");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.ADD_PRINT_TEXT(467,640,115,25,"保管员数据");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
      LODOP.PREVIEW(); //预览(预览打印无脚标)
        // LODOP.PRINT(); //打印
    },
    // 供应商编号change事件
    gbsupplier(a,c){
//刷新 
this.caigouhetonglist[a].supplierLists = [...this.caigouhetonglist[a].supplierLists];
    this.caigouhetonglist.forEach(item=>{
      item.supplierLists.forEach(item1=>{
        if(item1.idSup == c){
          item.supplier = item1.supplier;
        }
      })
    })
    },
    // 自动生成采购合同
    caigouhetong() {
      this.title = "需要生成采购订单";
      this.cght = true;
      this.loading = true;
      listcaigouhetong(this.queryParams).then(res => {
        console.log(res,"res");
        this.caigouhetonglist = res.rows;
        console.log(this.caigouhetonglist,"caigouhetonglist");
        this.caigouhetonglist.forEach(item=>{
          item.ydhsl = 0;
          item.idSup=item.supplierLists[0].idSup;
          item.supplier=item.supplierLists[0].supplier;
        })
        this.totalls = res.total;
        this.loading = false;
      })
    },
    // 生成采购合同按钮
    submitFormcght(){
      // 判断this.cghtlist中的供应商编号是否都相等
      let arr = [];
      this.cghtlist.forEach(item=>{
        arr.push(item.idSup);
      })
      let newarr = arr.filter((item,index)=>{
        return arr.indexOf(item) == index;
      })
      if(newarr.length > 1){
        this.$message.error("请选择相同的供应商编号");
        return;
      }
      this.$confirm('将要自动生成采购订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 将选中的itemcode放入数组
          this.cghtlist.forEach(item=>{
            this.ids.push(item.itemcode);
          })
          updateOrderscht(this.cghtlist).then(res=>{

          })
          this.cght = false;
          this.status = true;
          this.statuss = true;
          this.resets();
          const userInfo = JSON.parse(Cookies.get("userInfo"))
          this.formData.id = null
          this.formData.idSup = this.cghtlist[0].idSup;
          this.formData.supplier = this.cghtlist[0].supplier;
          this.formData.nameBuyer = userInfo.userName;
          this.formData.operator = userInfo.userName;
          this.formData.idDept = userInfo.deptId;
          this.formData.deptName = userInfo.dept.deptName;
          this.formData.flagStatus = "录入";
          this.getListcode();
          this.purchaseOrderArticleList=[];
          for(let i = 0;i<this.cghtlist.length;i++){
            this.purchaseOrderArticleList.push({
              idProduct:this.cghtlist[i].itemcode,
              itemname:this.cghtlist[i].itemname,
              model:this.cghtlist[i].model,
              unit:this.cghtlist[i].unit,
              amount:this.cghtlist[i].purchasenum,
              amountWarehouse:0,
              datePaying:new Date(),
            });
          }
          console.log(this.purchaseOrderArticleList,"purchaseOrderArticleList");
          this.formData.purchaseOrderArticleList = this.purchaseOrderArticleList;
          console.log(this.formData,"formData");
          addOrder(this.formData).then(response => {
            this.getList();
            this.$message({
              message: "自动生成订单成功",
              type: "success"
            });
          });
        })
    },
    // 生成采购合同取消按钮
    cancelcght(){
      this.cght = false;
    },
    // 多选生成采购合同
    handleSelectionChangecght(val){
      this.cghtlist = val;
    },
    getListcodes(){
      this.queryParam.idContract = this.formData.idContract;
      listOrdercode(this.queryParam).then(response => {
        this.formData = response.rows[0];
        this.getOrderList();
        this.total = response.total;
        this.loading = false;
      });
    },
    // 审核取消
    shenheqx(){
      updateOrdersqx(this.formData).then(res => {
        this.$message({
          message: "取消审核成功",
          type: "success"
        });
        this.statussa = true;
        this.getListcodes();
      })
    },
    // 审核
    shenhe(){
      updateOrders(this.formData).then(res => {
        this.$message({
          message: "审核成功",
          type: "success"
        });
        this.status = false;
        this.statuss = false;
        this.statussa = false;
        this.getListcodes();
      })
    },
    // 数量、单价、金额变化
    rowChange(index, row, column) {
      if (column.property == "amount") {
        row.total = row.amount * row.price;
        this.purchaseOrderArticleList[index].total = row.total;
      } else if (column.property == "price") {
        row.total = row.amount * row.price;
        this.purchaseOrderArticleList[index].total = row.total;
      } else if(column.property == "total"){
        row.price = row.total / row.amount;
        this.purchaseOrderArticleList[index].price = row.price;
      }
      // this.calculate();
    },
    // 修改按钮
    edit(){
      this.status = true;
      this.statuss = true;
    },
    // 保存按钮
    saveTable(){
      for(let i = 0;i<this.purchaseOrderArticleList.length;i++){
        if(this.purchaseOrderArticleList[i].amount <= 0 || this.purchaseOrderArticleList[i].amount == ''){
          this.$message.error('数量不能为负数或空(包括0在内)');
          return;
        }else if(this.purchaseOrderArticleList[i].price <= 0 || this.purchaseOrderArticleList[i].price == ''){
          this.$message.error('单价不能为负数或空(包括0在内)');
          return;
        }
      }
      // 过滤空行
      this.purchaseOrderArticleList = this.purchaseOrderArticleList.filter(item => item.idProduct != null);
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.formData.purchaseOrderArticleList = this.purchaseOrderArticleList;
          if (this.formData.id != null) {
            updateOrder(this.formData).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.getListddbh();
            });
          } else {
            if(this.formData.purchaseOrderArticleList.length == 0){
              this.$modal.msgError("订单没有采购物料,不能保存!");
              return;
            }else{
              addOrder(this.formData).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.getList();
            });
            }
          }
        }
      });
    },
    /** 子表序号 */
    rowPurchaseOrderArticleIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 采购订单从删除按钮操作 */
    handleDeletePurchaseOrderArticle() {
      if (this.checkedPurchaseOrderArticle.length == 0) {
        this.$modal.msgError("请先选择要删除的采购订单从数据");
      } else {
        const purchaseOrderArticleList = this.purchaseOrderArticleList;
        const checkedPurchaseOrderArticle = this.checkedPurchaseOrderArticle;
        this.purchaseOrderArticleList = purchaseOrderArticleList.filter(function(item) {
          return checkedPurchaseOrderArticle.indexOf(item.index) == -1
        });
      }
    },
    /** 子表复选框选中数据 */
    handlePurchaseOrderArticleSelectionChange(selection) {
      this.checkedPurchaseOrderArticle = selection.map(item => item.index)
    },
    // 新增主表数据
    handleAdd(){
      this.status = true;
      this.statuss = true;
      this.resets();
      const userInfo = JSON.parse(Cookies.get("userInfo"))
      this.formData.nameBuyer = userInfo.userName;
      this.formData.operator = userInfo.userName;
      this.formData.idDept = userInfo.deptId;
      this.formData.deptName = userInfo.dept.deptName;
      this.formData.flagStatus = "录入";
      this.getListcode();
      this.purchaseOrderArticleList = [];
    },
    // 重置主表数据
    resets(){
      this.formData = {
        id: null,
        idContract: null,
        codeContract: null,
        dateSign: new Date,
        idSup: null,
        supplier: null,
        idDept: null,
        nameBuyer: null,
        nameLinkman: null,
        flagStatus: null,
        operator: null,
        checker: null,
        checkout: null,
        note: null,
        deptName: null,
      }
    },
    // 新增子表数据
    handleAddPurchaseOrderArticle(){
      var list = {
        idProduct: null,
        itemname: null,
        model: null,
        unit: null,
        amount: 0.0000,
        price: 0.0000,
        total: 0.0000,
        datePaying: new Date(),
        amountWarehouse: 0.0000,
      };
      this.purchaseOrderArticleList.push(list);
    },

    // 查询部门
    getDeptList(){
      this.loading = true;
      listDepts(this.queryParams).then(res => {
        this.deptData = res.rows;
        this.total = res.total;
        this.loading = false;
        return this.deptData;
      })
    },
    // 部门点击事件
    deptid(){
      this.dept = true;
      this.getDeptList();
    },
    // 显示从表数据
    getpurchaseOrderArticleList(row){
      const id = row.id || this.ids
      getOrder(id).then(response => {
        this.form = response.data;
        this.purchaseOrderArticleLists = response.data.purchaseOrderArticleList;
      });
    },
    // 查询点击事件
    look(){
      this.bcopens = true;
      this.getLists();
      this.title = "采购订单查询";
    },
    // 合计
    getSummaries(param) {
      const {columns, data} = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '合计'
        }
          // index >= 3 || index <= 11 是你需要计算的列
          // 当然也可以指定一个或者多个列
        // index === 2 || index === 3 这样值求和第二个与第三个列
        else if (index === 6 || index === 8 || index === 10) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                // 保存了两位小数点
                return Math.floor((prev + curr) * 100) / 100;
              } else {
                // 保存了两位小数点
                return Math.floor(prev * 100) / 100;
              }
            }, 0)
          } else {
            sums[index] = ''
          }
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    /** 查询产品（物料管理）列表 */
    getMaterialList() {
        this.loading = true;
        listMaterial(this.queryParams).then(response => {
        this.materialList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 物料编号点击事件
    searchMaterial(index, row) {
      if(this.formData.idSup == null){
        this.$modal.msgError("请先选择供应商");
        return;
      }
      this.bcopen = true;
      this.nowRow = row;
      this.nowindex = index;
      this.getListss();
      this.title = "选择物料编号";
    },
    // 获取供应商关联的物料编号
    getListss() {
      this.loading= true;
      this.queryParams.idSup = this.formData.idSup;
        getSuppliers(this.queryParams).then(response => {
          this.materialList = response.rows[0].supplierMaterialList;
          this.total = response.total;
          this.loading = false;
      });
    },
    // 查询当前订单编号
    getListddbh(){
      listOrdercode(this.queryParams).then(response => {
        this.formData = response.rows[0];
        if(this.formData.checker != null){
          this.statussa = false;
        }
        this.statussa = true;
        this.statuss = false;
        this.status= false;
        this.getOrderList();
        this.total = response.total;
        this.loading = false;
      });
    },
    // 订单编号失去焦点事件
    show() {
      if(this.queryParams.codeContract == null || this.queryParams.codeContract == ""){
        this.$modal.confirm('没有找到该订单，请重新输入订单编号!')
      }else{
      // this.queryParams.pageNum = 1;
      // this.getList()
      listOrdercode(this.queryParams).then(response => {
        if(response.total == 0){
          this.$message.error('没有找到该订单，请重新输入订单编号!');
          return;
        }
        this.formData = response.rows[0];
        console.log(this.formData.checker)
        if(this.formData.checker != null){
          this.statussa = false;
        }else{
          this.statussa = true;
        this.statuss = false;
        this.status= false;
        }
        
        this.getOrderList();
        this.total = response.total;
        
        this.loading = false;
      });
      
      }
    },
    // 获取订单查询子表数据
    getOrderList() {
      console.log(this.formData.id)
      getOrder(this.formData.id).then(response => {
        // this.tableData = response.data;
        this.purchaseOrderArticleList = response.data.purchaseOrderArticleList;
        return this.purchaseOrderArticleList;
      });
    },
    // 部门弹框确定按钮
    submitForm(){
      console.log(this.multipleSelection)
      this.formData.idSup = this.multipleSelection[0].idSup;
      this.formData.supplier = this.multipleSelection[0].supplier;
      this.formData.nameLinkman = this.multipleSelection[0].contacts;
      this.bcxxopen = false;
    },
    // 物料编号确定按钮
    submitFormMaterial(){
      for(let i =0;i<this.purchaseOrderArticleList.length;i++){
        if(this.purchaseOrderArticleList[i].idProduct == this.multipleSelectionMaterial[0].itemcode){
          this.$message.error('该物料已存在，请重新选择物料编号!')
          return;
        }
      }
      this.purchaseOrderArticleList[this.nowindex].idProduct = this.multipleSelectionMaterial[0].itemcode;
      this.purchaseOrderArticleList[this.nowindex].itemname = this.multipleSelectionMaterial[0].itemnameSup;
      this.purchaseOrderArticleList[this.nowindex].model = this.multipleSelectionMaterial[0].model;
      this.purchaseOrderArticleList[this.nowindex].unit = this.multipleSelectionMaterial[0].saleunit;
      // this.purchaseOrderArticleList[this.nowindex].amountWarehouse = this.multipleSelectionMaterial[0].amount_warehouse;
      this.bcopen = false;
    },
    // 部门确定按钮
    submitFormDept(){
      this.formData.deptName = this.multipleSelectionDept[0].deptName;
      this.formData.idDept = this.multipleSelectionDept[0].deptId;
      this.dept = false;
    },
    // 取消按钮
    cancel() {
      this.bcxxopen = false;
    },
    // 物料编号取消按钮
    cancelMaterial() {
      this.bcopen = false;
    },
    // 部门取消按钮
    cancelDept() {
      this.dept = false;
    },
    // 供应商编号弹框选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (val.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(val.pop());
      }
    },
    // 物料编号弹框选中的数据
    handleSelectionChangeMaterial(val){
      this.multipleSelectionMaterial = val;
      if (val.length > 1) {
        this.$refs.multipleTableMaterial.clearSelection();
        this.$refs.multipleTableMaterial.toggleRowSelection(val.pop());
      }
    },
    // 部门编号弹框选中的数据
    handleSelectionChangeDept(val){
      this.multipleSelectionDept = val;
      if (val.length > 1) {
        this.$refs.multipleTableDept.clearSelection();
        this.$refs.multipleTableDept.toggleRowSelection(val.pop());
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getSupplierList();
    },
    // 物料编号搜索按钮
    handleQueryMaterial() {
      this.queryParams.pageNum = 1;
      this.getmaterial();
    },
    // 表单重置
    reset() {
      this.formData = {
        id: null,
        idContract: null,
        codeContract: null,
        dateSign: null,
        idSup: null,
        supplier: null,
        idDept: null,
        nameBuyer: null,
        nameLinkman: null,
        rateTax: null,
        currencyB: null,
        rateExchange: null,
        currencyA: null,
        priceprecition: null,
        typeItemcal: null,
        dcnttype: null,
        dcntcaltype: null,
        dcntbtype: null,
        dcntinput: null,
        dcntcaldpnt: null,
        total: null,
        sumDiscount: null,
        rateDiscount: null,
        sumAss: null,
        sumTax: null,
        flagStatus: null,
        operator: null,
        checker: null,
        checkout: null,
        note: null,
        flagDiscountcaled: null,
        flagAuxacc: null
      };
      this.purchaseOrderArticleList = [];
      this.resetForm("formData");
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 物料编号重置按钮
    resetQueryMaterial() {
      this.resetForm("queryForms");
      this.getMaterialList();
    },
    /** 查询供方档案列表 */
    getSupplierList() {
      this.loading = true;
      listSupplier(this.queryParams).then(response => {
        console.log(response.rows,'response.rows')
        this.supplierList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
  //  点击供应商编号
    search(){
      this.bcxxopen = true;
      this.getSupplierList();
      this.title = "选择供应商编号";
    },
    /** 查询采购订单主列表 */
    getList() {
      this.statuss = false;
      this.loading = true;
      listOrder(this.queryParams).then(response => {
        if(response.rows[0].checker !=null){
          this.statuss = false;
          this.statussa = false;
        }
        this.formData = response.rows[0];
        if (this.formData.flagStatus == 0) {
        this.formData.flagStatus = '录入'
      } else if (this.formData.flagStatus == 1) {
        this.formData.flagStatus = '确认'
      }
        this.getOrderList();
        this.total = response.total;
        this.loading = false;
        return this.formData;
      });
    },
    // 订单编号自增
    getListcode() {
      this.loading = true;
      listOrderadd(this.queryParams).then(response => {
        this.formData.codeContract = response.rows[0].codeContract
        this.formData.idContract = response.rows[0].idContract
        this.total = response.total;
        this.loading = false;
      });
    },
    // 查询所有采购订单
    getLists() {
      this.loading = true;
      listOrders(this.queryParams).then(response => {
        this.tableData = response.rows;
        this.totall = response.total;
        this.loading = false;
      });
    },
  }
}

</script>
<style scoped>
/* .inputDeep>>>.el-input__inner {
  padding: 0px;
  padding-left: 0px;
  padding-right: 0px;
    /* border: 0; */
    .abc{
      padding: 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  .inputDeepp{
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .inputDeepp>>>.el-input__inner {
    padding: 0px;
    padding-left: 0px;
    padding-right: 0px;
    background-color: white;
    color: black;
    /*el-form禁止随着界面放大缩小而放大缩小*/
    overflow: hidden;
  }

  .el-table /deep/ .cell {
  padding: 0px;
  padding-left: 0px;
  padding-right: 0px;
  /* background-color: white;
    color: black; */
  /*background-color: white;*/
}
 .el-input-number /deep/ .el-input__inner{
  text-align: right;
}
</style>
