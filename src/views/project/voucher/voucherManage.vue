<template>
  <div class="app-containerdiv" with="1500px">
    <h1 v-if="this.ruleForm.vouchertype=== ''" style="text-align: center;display:block" class="el-dialog__title">
      {{ deptName }}库存单据</h1>
    <h1 v-if="this.ruleForm.vouchertype !== ''" style="text-align: center;display:block" class="el-dialog__title">
      {{ deptName }}{{ vouchertype.label }}单</h1>
    <br/>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      :inline="true"
      size="mini"
      label-position="right"
      class="el-form-item">
      <el-row>
<!--        <el-col :span="5">-->
          <el-form-item label="凭证类别:" prop="vouchertype" >
            <el-select v-model="vouchertype" placeholder="请选择凭证类别" @change="changeset" >
              <el-option v-for="item in vouchertypeList" :key="item.label" :label="item.label" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
<!--        </el-col>-->
<!--        <el-col :span="5">-->
          <el-form-item label="凭证编号:" prop="vouchernumber">
            <el-input v-model.trim="ruleForm.vouchernumber" placeholder="请选择凭证编号" :disabled="true"
                      :style="{ width: '100%' }">
            </el-input>
          </el-form-item>
<!--        </el-col>-->
<!--        <el-col :span="5">-->
          <el-form-item label="原单据号:" prop="billnumber" v-if="this.ruleForm.vouchertype ==='0100'">
            <el-input v-model="ruleForm.billnumber"  @focus="searchMaterials1" readonly
                      :style="{ width: '150%' }">
            </el-input>
          </el-form-item>
<!--        </el-col>-->
<!--        <el-col :span="5">-->
          <el-form-item label="原单据号:" prop="billnumber" v-if="this.ruleForm.vouchertype ==='0200'">
            <el-input v-model="ruleForm.billnumber"  @focus="searchMaterials2" readonly
                      :style="{ width: '150%' }">
            </el-input>
          </el-form-item>
<!--        </el-col>-->
<!--        <el-col :span="5">-->
          <el-form-item label="原单据号:" prop="billnumber" v-if="this.ruleForm.vouchertype ==='0300'">
            <el-input v-model="ruleForm.billnumber"  @focus="searchMaterials3" readonly
                      :style="{ width: '150%' }">
            </el-input>
          </el-form-item>
<!--        </el-col>-->
<!--        <el-col :span="5">-->
          <el-form-item label="原单据号:" prop="billnumber" v-if="this.ruleForm.vouchertype ==='0400'">
            <el-input v-model="ruleForm.billnumber"  @focus="searchMaterials4" readonly
                      :style="{ width: '150%' }">
            </el-input>
          </el-form-item>
<!--        </el-col>-->
      </el-row>
      <br/>
      <el-row>
<!--        <el-col :span="5">-->
          <el-form-item label="凭证日期:" prop="businessdate">
            <el-date-picker v-model="ruleForm.businessdate" format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择凭证日期:" readonly :style="{ width: '100%'}" style="text-align-last: right" >
            </el-date-picker>
          </el-form-item>
<!--        </el-col>-->
<!--        <el-col :span="5">-->
          <el-form-item label="来源/用途:" prop="resourceusage" >
            <el-select v-model="ruleForm.resourceusage" :disabled="disabled" :style="{ width: '100%'}"
                       class="backColor">
              <el-option v-for="item in resourceusageList" :key="item.label" :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
<!--        </el-col>-->
<!--        <el-col :span="5">-->
          <el-form-item label="单位/部门:" prop="unitname" v-if="this.ruleForm.vouchertype === '0100'">
            <el-select v-model="ruleForm.unitname"  filterable :style="{ width: '150%'}" placeholder="请选择单位/部门"
                       :v-loadmore="loadMore">
              <el-option v-for="item in supplierList" :key="item.idSup" :label="item.label" :value="item.supplier">
                <span style="float: left;"> {{ item.idSup }}</span>
                <span style="float: right;">{{ item.supplier }}</span>
              </el-option>
            </el-select>
          </el-form-item>
<!--        </el-col>-->
<!--        <el-col :span="5">-->
          <el-form-item label="单位/部门:" prop="unitname" v-if="this.ruleForm.vouchertype === '0200'">
            <el-select v-model="ruleForm.unitname"  filterable placeholder="请选择单位/部门" :style="{ width: '150%'}"
                       @focus="getDeptListByDept_id">
              <el-option v-for="item in DeptList" :key="item.deptId" :label="item.label" :value="item.deptName">
                <span style="float: right;"> {{ item.deptId }}</span>
                <span style="float: left;">{{ item.deptName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
<!--        </el-col>-->
<!--        <el-col :span="5">-->
          <el-form-item label="单位/部门:" prop="unitname" v-if="this.ruleForm.vouchertype === '0300'">
            <el-select v-model="ruleForm.unitname"  filterable placeholder="请选择单位/部门" :style="{ width: '150%'}"
                       :v-loadmore="loadMore">
              <el-option v-for="item in supplierList" :key="item.idSup" :label="item.label" :value="item.supplier">
                <span style="float: left;"> {{ item.idSup }}</span>
                <span style="float: right;">{{ item.supplier }}</span>
              </el-option>
            </el-select>
          </el-form-item>
<!--        </el-col>-->
<!--        <el-col :span="5">-->
          <el-form-item label="单位/部门:" prop="unitname" v-if="this.ruleForm.vouchertype === '0400'">
            <el-select v-model="ruleForm.unitname"  filterable placeholder="请选择单位/部门" :style="{ width: '150%'}"
                       :v-loadmore="loadMore">
              <el-option v-for="item in supplierList" :key="item.idSup" :label="item.label" :value="item.supplier">
                <span style="float: left;"> {{ item.idSup }}</span>
                <span style="float: right;">{{ item.supplier }}</span>
              </el-option>
            </el-select>
          </el-form-item>
<!--        </el-col>-->
      </el-row>
      <br/>
      <el-row>
<!--        <el-col :span="5">-->
          <el-form-item label="业务员:" prop="purphaseperson">
            <el-select v-model="ruleForm.purphaseperson" placeholder="请选择业务员" :style="{ width: '99%' }">
              <el-option v-for="item in purphasepersonList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
<!--        </el-col>-->
<!--        <el-col :span="5">-->
          <el-form-item label="摘要:" prop="summary" filterable >
            <el-select v-model="ruleForm.summary" placeholder="请选择摘要" :style="{ width: '342%' }">
              <el-option v-for="item in summaryList" :key="item.number" :label="item.summaryn" :value="item.summaryn">
              </el-option>
            </el-select>
          </el-form-item>
<!--        </el-col>-->
      </el-row>
    </el-form>
    <br/>
    <div  class="div">
      <div class="inputDeep" >
        <el-table
          :data="tableData"
          border
          ref="table"
          :cell-style="{padding:'2px'}"
          @selection-change="selectRow"
          :summary-method="getSummaries"
          show-summary>
          <!-- @cell-dblclick="tableDbEdit" :key="mainTableKey" -->
          <el-table-column label="序号" width="60px" align="center">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="物料编码" align="center" prop="itemcode" width="200px" >
            <template slot-scope="scope">
              <el-input v-model.trim="scope.row.itemcode" readonly>
                <el-button slot="append" @click="search(scope.$index, scope.row)"  icon="el-icon-search" class="searchBtn"></el-button>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="物料名称" align="center" prop="itemname" width="160px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemname" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="规格型号" align="center" prop="model" width="160px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.model" readonly style="text-align-last: left"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位" align="center" prop="unit" width="70px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.unit" readonly style="text-align-last: left"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center" prop="saleunitquant" width="80px">
            <template slot-scope="scope">
              <el-input-number
                :style="{ width: '98%' }"
                v-model="scope.row.saleunitquant"
                @input="rowChange(scope.$index, scope.row, scope.column)"
                :controls="false" :precision="2"
                style="text-align-last: right">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="单价(未税)" align="center" prop="inventoryprice" width="140px">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.inventoryprice" :disabled="NoPrice"
                               :style="{ width: '98%' }"
                               @input="rowChange(scope.$index, scope.row, scope.column)" :precision="5"
                               style="text-align-last: right"
                               :controls="false"
                               controls-position="left">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="金额(未税)" align="center" prop="businessmoney" width="140px">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.businessmoney" readonly :style="{ width: '98%' }"
                               @input="rowChange(scope.$index, scope.row, scope.column)" :disabled="NoPrice"
                               :precision="2" :controls="false" controls-position="left" style="text-align-last: right">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="金额(含税)" align="center" prop="tax_money" width="140px">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.tax_money" :precision="2" :disabled="NoPrice"
                               style="text-align-last: right" :controls="false" :style="{ width: '98%' }"
                               @input="rowChange(scope.$index, scope.row, scope.column)"
                               controls-position="left"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="税率" align="center" prop="taxtest" width="80px">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.taxtest" :disabled="NoPrice"
                placeholder="请选择税率"
                @input="rowChange(scope.$index, scope.row, scope.column)"
                style="text-align: left">
                <el-option v-for="item in tax_rateList" :key="item.dictLabel" :label="item.dictLabel"
                           :value="item.dictValue">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="安全费用材料" align="center" prop="safetyfeeflag" width="110px">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.safetyfeeflag"
                style="text-align-last: left" placeholder="请选择安全费用材料">
                <el-option v-for="item in safetyfeeflagList" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="摘要" align="center" prop="summary" width="160px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.summary"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br/>
      <el-dialog :visible.sync="bcxxopen" width="1000px" append-to-body>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
          <el-form-item label="物料编号" prop="itemcode">
            <el-input v-model="queryParams.itemcode" placeholder="请输入物料编号" clearable
                      @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="物料名称" prop="itemname">
            <el-input v-model="queryParams.itemname" placeholder="请输入物料名称" clearable
                      @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item class="el-from111" >
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" type="primary">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- el-table将会多选 变为单选 -->
        <el-table ref="multipleTable" v-loading="loading" :data="materialList"
                  @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="55" align="center"/>
          <el-table-column label="物料编码" align="center" prop="itemcode" min-width="120"/>
          <el-table-column label="物料名称" align="center" prop="itemname" min-width="120"/>
          <el-table-column label="规格型号" align="center" prop="model" min-width="100"/>
          <el-table-column label="单位" align="center" prop="unit"/>
<!--          <el-table-column label="单价" align="center" prop="inventoryprice" min-width="80"/>-->
          <el-table-column label="类型名称" align="center" prop="materialType" min-width="80"/>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"/>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm" size="mini">确 定</el-button>
          <el-button @click="cancel" type="primary" size="mini">取 消</el-button>
        </div>
      </el-dialog>
      <!--出库-->
      <el-dialog :visible.sync="bcxxopen1" width="1200px" append-to-body
                 title="领料单" align="center" >
        <template>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
              <el-table ref="multipleTable" v-loading="loading" :data="pickMaterialList" @row-click="handleUpdate"
                        highlight-current-row @current-change="handleCurrentChange"
                        @selection-change="handleSelectionChange" border>
                <af-table-column label="领料单号" align="left" prop="materialid"/>
                <af-table-column label="计划时间" align="left" prop="plandate"/>
                <af-table-column label="领料部门" align="left" prop="deptname"/>
                <af-table-column label="编制人" align="left" prop="operatorname"/>
                <af-table-column label="编制时间" align="left" prop="operatedate"/>
                <af-table-column label="审核人" align="left" prop="plancheck"/>
                <af-table-column label="审核时间" align="left" prop="plancheckdate"/>
                <af-table-column label="分管领导审核" align="left" prop="planconfirm"/>
                <af-table-column label="审核时间" align="left" prop="planconfirmdate"/>
                <af-table-column label="审批人" align="left" prop="generalconfirm"/>
                <af-table-column label="审核时间" align="left" prop="generalconfirmdate"/>
              </el-table>
              <pagination v-show="total > 0" :total="total2"  v-if="this.ruleForm.vouchertype =='0200'" :page.sync="queryParams.pageNum"
                          :limit.sync="queryParams.pageSize" @pagination="getMaterialsList"/>
              <br/>
            </el-tab-pane>
            <el-tab-pane label="物料信息" name="second">
              <el-table ref="multipleTable" v-loading="loading"
                        :data="pickMaterialDetailList" @selection-change="handleSelectionChange" border>
                <af-table-column type="selection" width="55" align="left"/>
                <af-table-column label="序号" width="50" align="center">
                  <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                  </template>
                </af-table-column>
                <af-table-column label="物料编码" align="left" prop="itemcode"/>
                <af-table-column label="物料名称" align="left" prop="itemname"/>
                <af-table-column label="规格型号" align="left" prop="model"/>
                <af-table-column label="单位" align="left" prop="unit"/>
                <af-table-column label="计划数量" align="right" prop="plannum"/>
                <af-table-column label="库存数量" align="right" prop="inventoryquant"/>
                <af-table-column label="用途(工作面或巷道)" align="left" prop="useage"/>
                <af-table-column label="设备名称" align="left" prop="equimentname"/>
                <af-table-column label="领料人" align="left" prop="getman"/>
                <af-table-column label="班组" align="left" prop="deptcode"/>
                <af-table-column label="部门(科/队)" align="left" prop="deptcode1"/>
                <af-table-column label="领料时间" align="left" prop="getdate"/>
                <af-table-column label="备注" align="left" prop="remarks"/>
                <af-table-column label="安全费用标志" align="left" prop="safetyfeeflag"/>
                <af-table-column label="物料类型" align="left" prop="material_type"/>
                <af-table-column label="单价" align="right" prop="inventoryprice"  />
                <af-table-column label="金额" align="right" prop="totalmoney1"/>
                <af-table-column label="已领数量" align="right" prop="finishnum"/>
                <af-table-column label="所在库房" align="center" prop="warehousecode">
                  <template slot-scope="scope">
                    <span>{{
                        scope.row.warehousecode === "242" ?
                          scope.row.warehousecode === "243" ? scope.row.warehousecode : "一库"
                          : "二库"
                      }}</span>
                  </template>
                </af-table-column>
              </el-table>
              <br/>
              <div>
                <el-button type="primary" icon="el-icon-plus" @click="toggleSelection(pickMaterialDetailList)"
                           style="float: right" size="mini">全选
                </el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm1" size="mini">确 定</el-button>
          <el-button @click="cancel" type="primary" size="mini">取 消</el-button>
        </div>
      </el-dialog>
      <!--入库单-->
      <el-dialog
        :visible.sync="bcxxopen2"
        width="1200px"
        append-to-body
        title="采购订单"
        align="center"
       >
        <el-tabs v-model="activeName1" type="card" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first1">
            <el-table ref="multipleTable" v-loading="loading" :data="contractDetailList"
                      @row-click="getpurchaseOrderArticleList"
                      highlight-current-row @current-change="handleCurrentChange"
                      @selection-change="handleSelectionChange" border>
              <af-table-column label="合同编号" align="center" prop="idContract"/>
              <af-table-column label="客户编号" align="center" prop="idSup"/>
              <af-table-column label="客户名称" align="center" prop="supplier" width="500"/>
              <af-table-column label="业务员" align="center" prop="nameBuyer"/>
            </el-table>

            <pagination v-show="total > 0"   v-if="this.ruleForm.vouchertype ==='0100'" :total="total1" :page.sync="queryParams.pageNum"
                        :limit.sync="queryParams.pageSize" @pagination="getPurchaseList"/>
            <br/>
          </el-tab-pane>
          <el-tab-pane label="物料信息" name="second1">
            <el-table ref="multipleTable" v-loading="loading" :data="purchaseDetailList"
                      @selection-change="handleSelectionChange" border>
              <af-table-column type="selection" width="55" align="left"/>
              <af-table-column label="序号" width="50" align="center">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </af-table-column>
              <af-table-column label="物料编号" align="left" prop="idProduct" />
              <af-table-column label="物料名称" align="left" prop="itemname"/>
              <af-table-column label="规格型号" align="left" prop="model" width="120"/>
              <af-table-column label="库存单位" align="center" prop="unit"/>
              <af-table-column label="订单数量" align="right" prop="amount"/>
              <af-table-column label="已入库数量" align="right" prop="amountWarehouse"/>
              <af-table-column label="单价" align="right" prop="price"/>
              <af-table-column label="金额" align="right" prop="total"/>
              <af-table-column label="入库金额" align="right" prop="sumWarehouse"/>
            </el-table>
            <br/>
            <div>
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="toggleSelection(purchaseDetailList)"
                         style="float: right">全选
              </el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm2" size="mini">确 定</el-button>
          <el-button @click="cancel" type="primary" size="mini">取 消</el-button>
        </div>
      </el-dialog>
      <!--退货单-->
      <el-dialog
        :visible.sync="bcxxopen3"
        width="1200px"
        append-to-body
        title="采购订单"
        align="center"
      >
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first2">
            <el-table ref="multipleTable" v-loading="loading" :data="returnList"
                      @row-click="getreturnOrderArticleList"
                      highlight-current-row @current-change="handleCurrentChange"
                      @selection-change="handleSelectionChange" border>
              <af-table-column label="合同编号" align="center" prop="idContract"/>
              <af-table-column label="客户编号" align="center" prop="idSup"/>
              <af-table-column label="客户名称" align="center" prop="supplier" width="500"/>
              <af-table-column label="业务员" align="center" prop="nameBuyer"/>
            </el-table>
            <pagination v-show="total > 0" :total="total3" v-if="this.ruleForm.vouchertype =='0300'" :page.sync="queryParams.pageNum"
                        :limit.sync="queryParams.pageSize" @pagination="getPurchaseList1"/>
          </el-tab-pane>
          <br/>
          <el-tab-pane label="物料信息" name="second2">
            <el-table ref="multipleTable" v-loading="loading" :data="returnDetailList"
                      @selection-change="handleSelectionChange" border>
              <af-table-column type="selection" width="55" align="left"/>
              <af-table-column label="序号" width="50" align="center">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </af-table-column>
              <af-table-column label="物料编号" prop="idProduct" align="left" min-width="150"/>
              <af-table-column label="物料名称" prop="itemname" align="left" min-width="150"/>
              <af-table-column label="规格" prop="model" align="left" width="150"/>
              <af-table-column label="库存单位" prop="unit" align="center" />
              <af-table-column label="订单数量" prop="amount" align="right" />
              <af-table-column label="已入库数量" prop="amountWarehouse" align="right" />
              <af-table-column label="单价" prop="price" align="right"/>
              <af-table-column label="金额" prop="total" align="right" />
              <af-table-column label="入库金额" prop="sumWarehouse" align="right" />
            </el-table>
            <br/>
            <div>
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="toggleSelection(returnDetailList)"
                         style="float: right">全选
              </el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm3" size="mini">确 定</el-button>
          <el-button @click="cancel" type="primary" size="mini">取 消</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-row :gutter="12">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" size="mini" label-width="70px">
          <el-col :span="4">
            <el-form-item label="主管" prop="manager">
              <el-input v-model="ruleForm.manager" placeholder="请输入主管" :style="{ width: '80%' }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="制单人:" prop="operator">
              <el-input v-model="ruleForm.operator" placeholder="请输入制单人" readonly :style="{ width: '80%' }">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="制证日期" prop="voucherdate" >
              <el-date-picker v-model="ruleForm.voucherdate" format="yyyy-MM-dd " value-format="yyyy-MM-dd"
                              :style="{ width: '93%' }" readonly ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <el-form>
      <el-form-item label-width="75%" class="el-from111">
        <el-button type="primary" @click="save" size="mini">记账</el-button>
        <el-button type="primary" @click="clear" size="mini">作废</el-button>
        <el-button type="primary" @click="dayin" size="mini">打印</el-button>
      </el-form-item>
    </el-form>
    <br/>
    <el-dialog
      title="单据中存在如下问题:"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body>
      <el-table
        :data="tableData2"
        style="width: 100%"
        :visible.sync="dialogVisible"
        border>
        <el-table-column prop="itemcode" label="物料编号" align="center"/>
        <el-table-column prop="inventoryquant" label="库存数量" align="center"/>
        <el-table-column prop="inventorymoney" label="库存金额" align="center"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
<!--        <el-button type="primary" @click = "dayin">打 印</el-button>-->
<!--    <el-button type="primary" @click="SuerSave">确 定</el-button>-->
      <el-button  type="primary" @click="cancel1" size="mini">取 消</el-button>
  </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible1"
      width="30%"
      append-to-body>
      <span align="center">是否打印凭证</span>
         <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click = "dayin" size="mini">是</el-button>
        <el-button type="primary" @click="NotDo" size="mini">否</el-button>
         </span>
    </el-dialog>

    <el-dialog
      title="此次记账,凭证表中出现问题:"
      :visible.sync="dialogVisible2"
      width="30%"
      append-to-body>
      <span class="t1">当前为实时库存信息:</span>
      <br/>
      <el-table
        :data="tableData3"
        style="width: 100%"
        :visible.sync="dialogVisible2"
        border>
        <el-table-column prop="itemcode" label="物料编号" align="center"/>
        <el-table-column prop="inventoryquant" label="库存数量" align="center"/>
        <el-table-column prop="inventorymoney" label="库存金额" align="center"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click = "SuerSave" size="mini">记账</el-button>
        <el-button type="primary" @click="cancel2" size="mini">返回</el-button>
         </span>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getLodop } from "../../../api/project/LodopFuncs"; //导入模块
import { getDicts } from "../../../api/system/dict/data";
import {
  getNumber,
  addRuleForm,
  addRuleForm1,
  objectValueAllEmpty,
  listSummary,
  intToString,
  listMaterialByDeptcode,
  dateToString, dateToString2, dateToString3,
} from "../../../api/project/voucher";
import { listGetmaterial, listGetmaterialByDeptcode, getGetmaterialNo } from "../../../api/project/getmaterial";
import {
  getOrder,
  getOrder1,
  getReturnOrder,
  listOrdersByDeptId,
  listOrdersNoDoByDeptId
} from "../../../api/project/order";
import { listDept1 } from "../../../api/system/dept";
import { listSupplier } from "../../../api/project/supplier";
//从cookie内获取用户
const userInfo = JSON.parse(Cookies.get("userInfo"));
export default {
  dicts: ['aaal00', 'aaam00', 'sys_purchaseplan_planstate', 'sys_depomanage_test', 'resourceusagename', 'tax_rate'],
  components: {},
  props: {
    showSearch: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dateVisableIcon:'false',
      printVoucher:0,
      length: 0,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      //tabs默认选择第一个
      //出库单
      activeName: 'first',
      //入库单
      activeName1: 'first1',
      //退货单
      activeName2: 'first2',
      //根据凭证类别，变换原单据号点击触发的表格
      //出库禁用单价列
      NoPrice: false,
      warehousecode: userInfo.dept.deptId,
      //部门名称
      deptName: userInfo.dept != null ? userInfo.dept.deptName : "",
      //物料编码辅助表对象sys_number
      sysnumber: {
        deptcode: userInfo.dept != null ? userInfo.dept.deptId : "",
        class1: "",
      },
      //税率数组
      tax_rateList: [],
      //子表数组
      tableData: [],
      //凭证类别数组
      vouchertypeList: [],
      vouchertype: [],
      //来源用途数组
      resourceusageList: [],
      resourceusage: null,
      safetyfeeflagList: [{
        'label': '是',
        'value': '1'
      }, {
        'label': '否',
        'value': '0'
      }],
      //禁用
      disabled: true,
      //已入库金额
      hasInWarehouseMoney: '',
      //传参数据
      //校验弹窗表格
      tableData2: [],
      tableData3: [],
      //   itemcode: '',
      //   inventorymoney: '',
      //   inventoryquant: '',
      // },
      ruleForm: {
        id: 0,
        voucherdate: new Date(),
        warehousecode: userInfo.dept.deptId,
        vouchertype: '',//凭证类别ok
        vouchernumber: '',//凭证编号ok
        billnumber: '',//原单据号ok
        businessdate: new Date() ,//凭证日期ok
        resourceusage: '',//来源/用途ok
        // unitList: [],//单位/部门
        unitname: '',//单位/部门名称ok
        unitcode: '',//单位/部门编码ok
        checkoutmonth: 0,
        purphaseperson: '',//业务员ok
        operator: userInfo.userName,//制证人ok
        summary: '',//摘要
        manager: userInfo.userName,//主管ok
        userName: userInfo.userName,//用户
        eabc00List: [],// 库存凭证明细信息
        eaba00List: [],// 库存余额信息
      },
      taxtest: '13%',
      //样式规则
      rules: {},
      //02部门id的部门列表
      DeptList: [],
      //采购订单详细列表
      contractDetailList: [],
      //退货订单详细列表
      returnList: [],
      //供方档案
      supplierList: [],
      //业务员数组
      purphasepersonList: [{
        'label': '李建清',
        'value': "李建清"
      },
        {
          'label': '贺鹏举',
          'value': "贺鹏举"
        },
        {
          'label': '曹武清',
          'value': "曹武清"
        },
        {
          'label': '陈黎广',
          'value': "陈黎广"
        },
      ],

      bcxxopen: false,
      bcxxopen1: false,
      bcxxopen2: false,
      bcxxopen3: false,
      // 是否显示弹出层
      open: false,
      // 选中数组
      ids: [],
      // 表单参数
      form: {},
      computed: {},
      watch: {},
      //分页（疑）
      selectlistRow: [],
      rowNum: 1,
      // 非多个禁用
      multiple: true,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        codeContract: null,
        seriesname: null,
        deptId: null,
        deptName: null,
        itemcode: '',
        itemname: '',
        idSup: null,
        supplier: null,
        materialid: "",
        idContract: null,
        plandate: null,
        deptcode: userInfo.dept != null ? userInfo.dept.deptId : null,
        deptname: null,
        Name_Buyer: null,
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
        warehousecode: userInfo.dept != null ? userInfo.dept.deptId : null,
        idDept: userInfo.dept != null ? userInfo.dept.deptId : null,
      },
      queryParams1: {
        idSup: null,
        supplier: null,
        idContract: null,
        operatorname: null,
        pageNum: 1,
        pageSize: 10,
        idDept: userInfo.dept != null ? userInfo.dept.deptId : null,
      },
      // 总条数
      total: 0,
      total1: 0,
      total2: 0,
      total3: 0,
      total4: 0,
      // 产品（物料管理）表格数据
      materialList: [],
      //领料计划主表
      pickMaterialList: [],
      //领料计划子表
      pickMaterialDetailList: [],
      //采购明细表
      purchaseDetailList: [],
      //退货单明细表
      returnDetailList: [],
      // 遮罩层
      loading: true,
      //摘要数组
      summaryList: [],
      //选择表格数据
      multipleSelection: [],
    };
  },
  created() {
    this.getSummaryList();
    this.clear();
    this.getDeptListByDept_id();
    this.getPurchaseList();
    this.getSupplierList();
    this.getDicts();
    this.Define;

    console.log(this.ruleForm.voucherdate, '日期');
  },
  mounted() {
    //从字典取凭证类别数据
    this.vouchertypeList = this.dict.type.sys_depomanage_test;
    //从字典取税率数据
    this.Define();
    /*
     思路：通过document文档，选中日期时间选择器元素，然后创建一个i标签，
           并指定其类名为el-icon-date，并将其插入到日期时间选择器元素中
           然后通过样式的控制调整其到时间选择器尾部的位置
    */
    let keyNode = document.querySelector(".el-date-editor");

    let iNode = document.createElement("i");
    iNode.setAttribute("class", "el-icon-date"); // el-icon-bottom
    keyNode.appendChild(iNode);

    iNode.style.position = "absolute";
    iNode.style.top = "113px";
    iNode.style.right = "312px";
  },
  methods: {
    dateToStrings(date) {
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    getDicts() {
      getDicts('tax_rate').then((e) => {
        this.taxtest = e.data[0].dictValue
        this.tax_rateList = e.data;
       // console.log(this.taxtest, "jaaaaaaaaaaaaaaaaa")
        //console.log(this.tax_rateList, "22222")
        //console.log(e.data[0].dictValue, "kdsjafkl;jd;lksafjlkds")
      })
    },
    // //更新这一行的值
    // updateRow(row, index) {
    //   this.tableData[index] = row;
    //   this.$set(this.tableData, index, row)//更新这一行的值
    // },
    //变动事件
    async rowChange(index, row, column) {
      if (row != null) {
        if (this.ruleForm.vouchertype === '0100') {
          const taxtest = row.taxtest != null ? row.taxtest : 0
          console.log(taxtest, 'taxtest')
          if (column.property === "saleunitquant") {
            //修改数量
            if (row.saleunitquant != null && row.inventoryprice != null) {
              row.businessmoney = (row.saleunitquant * row.inventoryprice).toFixed(2)
              row.tax_money = (row.businessmoney * (1 + parseFloat(taxtest))).toFixed(2)
            } else if (row.businessmoney != null && row.saleunitquant != null && this.NoPrice === false) {
              row.inventoryprice = row.businessmoney / row.saleunitquant
            }
          } else if (column.property === "inventoryprice") {
            //修改单价
            if (row.saleunitquant != null && row.inventoryprice != null) {
              row.businessmoney = (row.saleunitquant * row.inventoryprice).toFixed(2)
            } else if (row.businessmoney != null && row.inventoryprice != null) {
              row.saleunitquant = row.businessmoney / row.inventoryprice
            }
          } else if (column.property === "businessmoney") {
            //修改金额
            if (row.businessmoney != null && row.saleunitquant != null && this.NoPrice == false) {
              row.inventoryprice = row.businessmoney / row.saleunitquant
            } else if (row.businessmoney != null && row.inventoryprice != null) {
              row.saleunitquant = row.businessmoney / row.inventoryprice
            }
          } else if (column.property === "tax_money") {
            if (row.tax_money != null && row.saleunitquant != null && this.NoPrice === false) {
              row.businessmoney = (row.tax_money / (1 + parseFloat(taxtest))).toFixed(2);
              row.inventoryprice = row.businessmoney / row.saleunitquant
            } else if (row.tax_money != null && row.inventoryprice != null) {
              row.businessmoney = (row.tax_money / (1 + parseFloat(taxtest))).toFixed(2);
              row.saleunitquant = row.businessmoney / row.inventoryprice
            }
          }
          row.tax_money = row.businessmoney != null ? row.tax_money = (row.businessmoney * (1 + parseFloat(taxtest))).toFixed(2) : undefined
          // 如果税率变化
          if (column.property === "taxtest") {
            if (row.saleunitquant != null && row.inventoryprice != null && row.businessmoney != null) {
              //console.log(1 + parseFloat(taxtest), '1+parseFloat(taxtest)')
              row.tax_money = (row.businessmoney * (1 + parseFloat(taxtest))).toFixed(2)
            }
          }
          this.$set(this.tableData, index, row)//更新这一行的值
        } else if (this.ruleForm.vouchertype === '0200') {
          const taxtest = row.taxtest != null ? row.taxtest : 0
          //console.log(taxtest, 'taxtest')
          if (column.property === "saleunitquant") {
            //修改数量
            if (row.saleunitquant != null && row.inventoryprice != null) {
              row.businessmoney = (row.saleunitquant * row.inventoryprice).toFixed(2)
              row.tax_money = (row.businessmoney * (1 + parseFloat(taxtest))).toFixed(2)
            } else if (row.businessmoney != null && row.saleunitquant != null && this.NoPrice == false) {
              row.inventoryprice = row.businessmoney / row.saleunitquant
            }
          } else if (column.property === "inventoryprice") {
            //修改单价
            if (row.saleunitquant != null && row.inventoryprice != null) {
              row.businessmoney = (row.saleunitquant * row.inventoryprice).toFixed(2)
            } else if (row.businessmoney != null && row.inventoryprice != null) {
              row.saleunitquant = row.businessmoney / row.inventoryprice
            }
          } else if (column.property === "businessmoney") {
            //修改金额
            if (row.businessmoney != null && row.saleunitquant != null && this.NoPrice === false) {
              row.inventoryprice = row.businessmoney / row.saleunitquant
            }
            // else if (row.businessmoney != null && row.inventoryprice != null) {
            //   row.saleunitquant = row.businessmoney / row.inventoryprice
            // }
          } else if (column.property === "tax_money") {
            if (row.tax_money != null && row.saleunitquant != null && this.NoPrice == false) {
              row.businessmoney = (row.tax_money / (1 + parseFloat(taxtest))).toFixed(2);
              row.inventoryprice = row.businessmoney / row.saleunitquant
            } else if (row.tax_money != null && row.inventoryprice != null) {

            }
          }
          this.$set(this.tableData, index, row)//更新这一行的值
        } else if (this.ruleForm.vouchertype === '0300') {
          const taxtest = row.taxtest != null ? row.taxtest : 0
          if (column.property === "saleunitquant") {
            if (row.saleunitquant != null && row.inventoryprice != null) {
              row.businessmoney = (row.saleunitquant * row.inventoryprice).toFixed(2)
              console.log(row.businessmoney, 'row.businessmoney')
              row.tax_money = (row.businessmoney * (1 + parseFloat(taxtest))).toFixed(2)
            }
          }
          this.$set(this.tableData, index, row)//更新这一行的值
        } else if (this.ruleForm.vouchertype === '0400') {
          const taxtest = row.taxtest != null ? row.taxtest : 0
          console.log(taxtest, 'taxtest')
          if (column.property === "saleunitquant") {
            //修改数量
            if (row.saleunitquant != null && row.inventoryprice != null) {
              row.businessmoney = (row.saleunitquant * row.inventoryprice).toFixed(2)
              row.tax_money = (row.businessmoney * (1 + parseFloat(taxtest))).toFixed(2)
            } else if (row.businessmoney != null && row.saleunitquant != null && this.NoPrice === false) {
              row.inventoryprice = row.businessmoney / row.saleunitquant
            }
          } else if (column.property === "inventoryprice") {
            //修改单价
            if (row.saleunitquant != null && row.inventoryprice != null) {
              row.businessmoney = (row.saleunitquant * row.inventoryprice).toFixed(2)
            } else if (row.businessmoney != null && row.inventoryprice != null) {
              row.saleunitquant = row.businessmoney / row.inventoryprice
            }
          } else if (column.property === "businessmoney") {
            //修改金额
            if (row.businessmoney != null && row.saleunitquant != null && this.NoPrice == false) {
              row.inventoryprice = row.businessmoney / row.saleunitquant
            } else if (row.businessmoney != null && row.inventoryprice != null) {
              row.saleunitquant = row.businessmoney / row.inventoryprice
            }
          } else if (column.property === "tax_money") {
            if (row.tax_money != null && row.saleunitquant != null && this.NoPrice === false) {
              row.businessmoney = (row.tax_money / (1 + parseFloat(taxtest))).toFixed(2);
              row.inventoryprice = row.businessmoney / row.saleunitquant
            } else if (row.tax_money != null && row.inventoryprice != null) {
              row.businessmoney = (row.tax_money / (1 + parseFloat(taxtest))).toFixed(2);
              row.saleunitquant = row.businessmoney / row.inventoryprice
            }
          }
          row.tax_money = row.businessmoney != null ? row.tax_money = (row.businessmoney * (1 + parseFloat(taxtest))).toFixed(2) : undefined
          // 如果税率变化
          if (column.property === "taxtest") {
            if (row.saleunitquant != null && row.inventoryprice != null && row.businessmoney != null) {
              //console.log(1 + parseFloat(taxtest), '1+parseFloat(taxtest)')
              row.tax_money = (row.businessmoney * (1 + parseFloat(taxtest))).toFixed(2)
            }
          }
        }
        this.$set(this.tableData, index, row)//更新这一行的值
      }
    },
    // //校验
    // check(){
    //   if(this.ruleForm.vouchertype!=null &&this.ruleForm.vouchertype!=""&& this.ruleForm.vouchertype!= undefined){
    //     if(this.ruleForm.vouchertype==="0200"){
    //       this.NoPrice= true;
    //     }
    //   }
    // },

    //凭证类别选择
    changeset(e) {
      console.log(e)
      switch (e.value) {
        //入库
        case "0100":
          this.ruleForm.billnumber = true;
          this.ruleForm.purphaseperson = null;
          break;
        //出库
        case "0200":
          this.ruleForm.billnumber = true;
          this.ruleForm.purphaseperson = null;
          break;
        case "0300":
          this.ruleForm.billnumber = true;
          this.ruleForm.purphaseperson = null;
          break;
        case "0400":
          this.ruleForm.billnumber = true;
          this.ruleForm.purphaseperson = null;
          break;
        default:
          this.NoPrice = false;
          break;
      }
      this.clear();
      this.ruleForm.billnumber = "";

      let class1 = this.vouchertype.value
      //凭证类别写入ruleForm
      this.ruleForm.vouchertype = class1
      //根据凭证类别变化单位/部门数组
      if (class1 == "0100") {
        this.NoPrice = false
      } else if (class1 == "0200") {
        this.NoPrice = true
      }
      //获取凭证编码
      this.sysnumber.class1 = class1
      getNumber(this.sysnumber).then(response => {
        this.ruleForm.vouchernumber = response != null ? response.msg : "0000000001"
        // console.log(response);
      });
      //从字典取库存来源用途
      let data = this.dict.type.resourceusagename
      // console.log("resourceusagename", data)

      //如果部门id不为空
      if (!!this.vouchertype) {
        //切换的时候人员清空，防止bug
        this.resourceusageList = [];
        //禁用取消
        this.disabled = false;
        //遍历人员里面的数据
        data.forEach((e) => {
          if (e.value == this.vouchertype.value) {
            //将符合的数据push进人员数组
            this.resourceusageList.push(e);
          }
        });
        //选中凭证类别,根据凭证类别变化单位/部门数组
        if (this.resourceusageList.length > 0) {
          if (this.ruleForm.vouchertype == "0100") {
            this.ruleForm.resourceusage = this.resourceusageList[0].label
          } else if (this.ruleForm.vouchertype == "0200") {
            this.ruleForm.resourceusage = this.resourceusageList[1].label;
          } else if (this.ruleForm.vouchertype == "0300") {
            this.ruleForm.resourceusage = this.resourceusageList[0].label;
          } else if (this.ruleForm.vouchertype == "0400") {
            this.ruleForm.resourceusage = this.resourceusageList[0].label;
          }
        } else {
          //选中的部门为空，则清空人员列表
          this.resourceusageList = [];
          this.disabled = true;
        }
      }
    },
    //关闭打印界面
    NotDo(){
      this.printVoucher = 1;
      this.dialogVisible1 = false;
      this.save();
      this.dialogVisible1 = false;
    },

    //记账
    save() {
      this.dialogVisible1 = true;
      console.log(this.printVoucher, 'this.printVoucher')
      //让打印窗口弹出,判断this.printVoucher 的值为1时,向下继续执行

      if (this.printVoucher == 1) {
        console.log(this.printVoucher, 'this.printVoucher1')
        //form数据
        let ruleForm = this.ruleForm
        //过滤空行
        let table = this.tableData.filter(item => item.itemcode != null);
        //table数据
        ruleForm.eabc00List = table;
        ruleForm.eaba00List = table;
        //判断凭证类别是否为空
        if (ruleForm.vouchertype == null || ruleForm.vouchertype == "") {
          this.$message({
            message: "请选择凭证类别",
            type: "warning"
          });
          return;
        }
        //判断原单据号是否为空
        // if (ruleForm.billnumber == null || ruleForm.billnumber == "") {
        //   this.$message({
        //     message: "请输入原单据号",
        //     type: "warning"
        //   });
        //   return;
        // }
        //判断凭证日期是否为空
        if (ruleForm.businessdate == null || ruleForm.businessdate == "") {
          this.$message({
            message: "请选择凭证日期",
            type: "warning"
          });
          return;
        }
        //判断来源/用途是否为空
        if (ruleForm.resourceusage == null || ruleForm.resourceusage == "") {
          this.$message({
            message: "请选择来源/用途",
            type: "warning"
          });
          return;
        }
        //判断unitname是否为空
        if (ruleForm.unitname == null || ruleForm.unitname == "") {
          this.$message({
            message: "请选择部门/供应商名称",
            type: "warning"
          });
          return;
        }

        //判断凭证明细是否为空
        if (table.length == 0) {
          this.$message({
            message: "请添加凭证明细",
            type: "warning"
          });
          return;
        }
        //校验tableData数据中数量列,单价列,金额列,税额列中存在不正确数据
        for (let i = 0; i < table.length; i++) {
          if (this.tableData[i].saleunitquant < 0 || this.tableData[i].inventoryprice < 0 || this.tableData[i].businessmoney < 0 || this.tableData[i].tax_money < 0) {
            this.$message({
              message: "数量列,单价列,金额列,含税金额列中存在不正确数据,请重新输入",
              type: "error"
            });
            return;
          }
        }
        //判断凭证明细是否完整
        for (let j = 0; j < table.length; j++) {
          if (objectValueAllEmpty(ruleForm.eabc00List[j]) == true) {
            this.$message({
              message: "请填写完整凭证明细",
              type: "warning"
            });
            return;
          }
        }

        //添加账目信息
        if (this.ruleForm.vouchertype == "0200") {
          let k = 0;
          let k2 = 0;
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].saleunitquant <= 0) {
                this.$message({
                  message: "凭证中数量列中存在不正确数据,请重新输入",
                  type: "error"
                });
                return;
              }
            }
          addRuleForm(ruleForm).then(response => {
            console.log(response, "出库返回的数据0200")
            for (let i = 1; i < response.length - 1; i = i + 2) {
              for (let j = 0; j < ((response.length - 1) / 2); j++) {
                if (response[i].inventoryquant === 0 && response[i].inventorymoney !== 0) {
                  this.$message({
                    message: "记账后凭证表中" + (i - j) + "行" + this.tableData[i - j - 1].itemcode + "物料的库存数量将等于0或者库存金额不等于0，请重新输入",
                    type: "error"
                  });
                  return;
                }
                if (response[i].inventoryprice < 0) {
                  this.$message({
                    message: "记账后凭证表中" + (i - j) + "行" + this.tableData[i - j - 1].itemcode + "物料的库存单价小于0的，请重新输入",
                    type: "error"
                  });
                  return;
                }
              }
            }
            // for (let i = 1; i < response.length - 1; i++) {
            //   if((response[i].inventoryprice * response[i].inventoryquant) !=response[i].inventorymoney){
            //
            //   }
            // }
            //有凭证编号出库
            if (this.ruleForm.billnumber !== null && this.ruleForm.billnumber !== "" && this.ruleForm.billnumber !== undefined) {
              console.log("有凭证编号出库")
              for (let i = 1; i < response.length - 1; i = i + 2) {
                for (let j = 0; j < ((response.length - 1) / 2); j++) {
                  if (this.tableData[i - j].saleunitquant > (response[i + 1].plannum - response[i + 1].finishnum)) {
                    k++;
                    this.$message({
                      message: "凭证表中第" + (i - j + 1) + "行数量大于计划数量，,请重新输入",
                      type: "warning"
                    });
                    return;
                  }
                  if (response[j + 1].inventoryquant < 0) {
                    k2++;
                    this.addRow1();
                    this.tableData2[j].itemcode = response[i].itemcode;
                    this.tableData2[j].inventoryquant = (parseInt(response[i].inventoryquant).toFixed(3));
                    this.tableData2[j].inventorymoney = (parseInt(response[i].inventorymoney).toFixed(2));
                    if ((response.length - 1) / 2 - j === 1) {
                      this.dialogVisible = true;
                    }
                  }
                }
              }
              console.log(k, "k0200有billnumber")
              if (k === 0 && k2 === 0) {
                console.log("进入了0200")
                this.SuerSave();
              }
            } else {
              //临时出库
              let k1 = 0;
              let kt = 0;
              let returnNumber = 0.000000;
              this.length = response.length - 1;
              console.log(this.length, "this.length")
              console.log(typeof returnNumber, "typeof returnNumber")
              //循环判断出库后的库存数量是否小于0
              for (let i = 0; i < this.length; i++) {
                console.log(response[i + 1].inventoryquant, "response[i + 1].inventoryquant")
                if (parseInt(response[i + 1].inventoryquant) < 0) {
                  this.$message({
                    message: "出库后凭证表中第" + (i + 1) + "行" + this.tableData[i].itemcode + "物料的库存数量小于0的，请重新输入",
                    type: "error"
                  });
                  return;
                }
                //比较response[i + 1].inventoryquant和0是否相等

                if (response[i + 1].inventoryquant==0) {
                  console.log("出库后库存数量为0")
                  // this.tableData2[i].itemcode = response[i + 1].itemcode;
                  // this.tableData2[i].inventoryquant = response[i + 1].inventoryquant;
                  // console.log(typeof parseFloat(this.tableData[i].saleunitquant) * parseFloat(this.tableData[i].inventoryprice), "this.tableData[i].saleunitquant * this.tableData[i].inventoryprice")
                  if(this.tableData[i].businessmoney  != response[i + 1].inventorymoney){
                    console.log("出库金额不等")
                    kt++;
                  };
                  // this.tableData2[i].inventorymoney = (parseFloat(response[i + 1].inventorymoney) - (parseFloat(this.tableData[i].saleunitquant) * parseFloat(this.tableData[i].inventoryprice))).toFixed(2);
                  if (kt != 0) {

                    this.addRow2();
                    this.dialogVisible2 = true;
                    console.log(i, "i")
                    this.tableData3[i].itemcode = response[i + 1].itemcode;
                    this.tableData3[i].inventoryquant = response[i + 1].inventoryquant;
                    this.tableData3[i].inventorymoney = (response[i + 1].inventorymoney - this.tableData[i].businessmoney).toFixed(2);
                    this.tableData[i].businessmoney = response[i + 1].inventorymoney;
                    // this.$message({
                    //   message: "此次记账后,凭证表中第" + (i + 1) + "的物料的库存数量为0,库存金额不为0,所以将出库前的库存金额给到此次凭证表中的金额,用来带走差异",
                    //   type: "warning"
                    // });
                    return;
                  }
                }
              }
              this.SuerSave();
            }
          });
          // let k1 = 0 ;
          // for (let i = 0; i < this.length; i++) {
          //   console.log(typeof response[i + 1].inventoryquant, "response[i + 1].inventoryquant")
          //   if (parseInt(response[i + 1].inventoryquant) === 0) {
          //     console.log("kkkkasasa")
          //   if(this.tableData[i].businessmoney === parseInt(response[i+1].inventorymoney)){
          //     console.log("mmmm")
          //     this.SuerSave();
          //   }else{
          //     console.log("nnnnn")
          //
          //     this.addRow1();
          //     this.tableData2[i].itemcode = response[i + 1].itemcode;
          //     this.tableData2[i].inventoryquant = response[i + 1].inventoryquant;
          //     this.tableData2[i].inventorymoney = response[i + 1].inventorymoney;
          //     this.tableData[i].businessmoney === parseInt(response[i+1].inventorymoney);
          //     console.log(this.length - i, "this.length - i")
          //     if(parseInt(this.length - i) === 1){
          //       console.log("进入了")
          //       this.dialogVisible = true;
          //     }
          //     this.SuerSave;
          //   }
          //   }
          //   console.log(response[i + 1].inventoryquant, "response[i + 1].inventoryquant")
          //   if (response[i + 1].inventoryquant < 0) {
          //     k1++;
          //     this.addRow1();
          //     this.tableData2[i].itemcode = response[i + 1].itemcode;
          //     this.tableData2[i].inventoryquant = response[i + 1].inventoryquant;
          //     this.tableData2[i].inventorymoney = response[i + 1].inventorymoney;
          //     if(this.length - i === 1){
          //       this.dialogVisible = true;
          //     }
          //   }
          // }
          // console.log(k1, "k1")
          // if(k1 === 0){
          //   console.log(k1, "k12")
          //   this.SuerSave();
          // }
          //   }
          // });
        } else if (this.ruleForm.vouchertype === "0100") {
          let k = 0;
          let t = -1;
          let t1 = -1;
          addRuleForm(ruleForm).then(response => {
            console.log(response, "入库返回的数据0100")
            console.log(this.ruleForm.billnumber, "this.ruleForm.billnumber")
            for (let i = 1; i < response.length - 1; i = i + 2) {
              t++;
              if (response[i].inventoryquant === 0 && response[i].inventorymoney !== 0) {
                this.$message({
                  message: "记账后凭证表中第" + (i - t) + "行" + this.tableData[i - t].itemcode + "物料的库存数量将等于0或者库存金额不等于0，请重新输入",
                  type: "error"
                });
                return;
              }
              console.log(typeof response[i].inventoryprice, "typeof response[i].inventoryprice]")
              console.log(response[i].inventoryprice, " response[i].inventoryprice]")
              if (response[i].inventoryprice < 0) {
                this.$message({
                  message: "记账后凭证表中第" + (i - t) + "行" + this.tableData[i - t].itemcode + "物料的库存单价小于0的，请重新输入",
                  type: "error"
                });
                return;
              }
            }
            if (this.ruleForm.billnumber != null && this.ruleForm.billnumber != "" && this.ruleForm.billnumber != undefined) {
              for (let i = 1; i < response.length - 1; i = i + 2) {
                t1++;
                // if (response[i].inventoryquant === 0 && response[i].inventorymoney !== 0) {
                //   this.$message({
                //     message: "记账后凭证表中" + (i - j ) + "行" + this.tableData[i - j - 1].itemcode + "物料的库存数量将等于0或者库存金额不等于0，请重新输入",
                //     type: "error"
                //   });
                //   return;
                // }
                // if (response[i].inventoryprice < 0) {
                //   this.$message({
                //     message: "记账后凭证表中" + (i - j) + "行" + this.tableData[i - j - 1].itemcode + "物料的库存单价小于0的，请重新输入",
                //     type: "error"
                //   });
                //   return;
                // }
                //console.log(i - t1, "i - t")
                //console.log(this.tableData.saleunitquant, "this.tableData.saleunitquant")
                //console.log(this.tableData[i - t1].saleunitquant, "this.tableData[i - t].saleunitquant")
                if (this.tableData[i - t1].saleunitquant > (response[i + 1].Amount - response[i + 1].Amount_warehouse)) {
                  k++;
                  this.$message({
                    message: "凭证表中第" + (i - t) + "行数量大于计划数量，,请重新输入",
                    type: "warning"
                  });
                  return;
                }
              }
              console.log(k, "k")
              if (k === 0) {
                console.log("进入了")
                this.SuerSave();
              }
            } else {
              console.log("ttttttttttttttttttt")
              this.SuerSave();
            }
          });
        } else if (this.ruleForm.vouchertype === "0300") {
          let k = 0 ;
          let k2 = 0;
          let t1 = -1;
          addRuleForm(ruleForm).then(response => {
            console.log(response, "出库返回的数据0300")
            // this.length = response.length - 1;
            // console.log(this.length, "this.length")
            //
            // //循环判断出库后的库存数量是否小于0
            // for (let i = 0; i < this.length; i++) {
            //   console.log(response[i + 1].inventoryquant, "response[i + 1].inventoryquant")
            //   if (parseInt(response[i + 1].inventoryquant) < 0) {
            //     this.$message({
            //       message: "出库后凭证表中第" + (i + 1) + "行" + this.tableData[i].itemcode + "物料的库存数量小于0的，请重新输入",
            //       type: "error"
            //     });
            //     return;
            //   }
            // }

            if (this.ruleForm.billnumber !== null && this.ruleForm.billnumber !== "" && this.ruleForm.billnumber !== undefined) {
              console.log("有凭证编号退货")
              for (let i = 1; i < response.length - 1; i = i + 2) {
                for (let j = 0; j < ((response.length - 1) / 2); j++) {
                  t1++;
                  if (this.tableData[i - t1].saleunitquant > (response[i + 1].amountWarehouse)) {
                    k++;
                    this.$message({
                      message: "凭证表中第" + (i - t1) + "行数量大于已完成数量，,请重新输入",
                      type: "error"
                    });
                    return;
                  }
                  if (response[i].inventoryquant < 0) {
                    console.log(t1, "t1")
                    k2++;
                    console.log(j, "j")
                    this.addRow1();
                    this.tableData2[j].itemcode = response[i].itemcode;
                    this.tableData2[j].inventoryquant = (parseInt(response[i].inventoryquant).toFixed(3));
                    this.tableData2[j].inventorymoney = (parseInt(response[i].inventorymoney)).toFixed(2);
                    if ((response.length - 1) / 2 - j === 1) {
                      console.log("nihao ")
                      this.dialogVisible = true;
                    }
                  }
                }
              }
              if (k === 0 && k2 ===0) {
                console.log("进入了0200")
                this.SuerSave();
              }
            }else {
              console.log("没有凭证编号退货")
              this.length = response.length - 1;
              console.log(this.length, "this.length")
              //循环判断出库后的库存数量是否小于0
              for (let i = 0; i < this.length; i++) {
                console.log(response[i + 1].inventoryquant, "response[i + 1].inventoryquant")
                if (parseInt(response[i + 1].inventoryquant) < 0) {
                  this.$message({
                    message: "出库后凭证表中第" + (i + 1) + "行" + this.tableData[i].itemcode + "物料的库存数量小于0的，请重新输入",
                    type: "error"
                  });
                  return;
                }
              }
              this.SuerSave();
            }
          });
        }
        }
        //清空子表
        // this.tableData = [];
        // this.tableData2 = [];
        // //清空tableData
        // this.ruleForm.eabc00List = [];
        // this.clear();
        // this.ruleForm.resourceusage = null;
        // this.ruleForm.purphaseperson = null;
        // this.ruleForm.businessdate = new Date();
      this.printVoucher = 0;
      console.log(this.printVoucher, "this.printVoucherLast")
    },
    selectTaxtest(index) {
      this.tableData[index].scope.row.taxtest = this.taxtestList[0].value;
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        materialid: null,
        idContract: null,
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
      this.pickMaterialDetailList = [];
      this.resetForm("form");
    },
    //定义
    Define() {
      let vouchertype1 = '';
      if (this.ruleForm.vouchertype == '0100') {
        vouchertype1 = '入库凭证';
        console.log(vouchertype1, '入库凭证');
      } else if (this.ruleForm.vouchertype == '0200') {
        vouchertype1 = '出库凭证';
        console.log(vouchertype1, '出库凭证');
      } else if (this.ruleForm.vouchertype == '0300') {
        vouchertype1 = '退货凭证';
        console.log(vouchertype1, "退货凭证");
      } else if (this.ruleForm.vouchertype == '0400') {
        vouchertype1 = '调帐凭证';
        console.log(vouchertype1, "调帐凭证");
      }
    },
    //确认记账
    SuerSave() {
//form数据
      let ruleForm = this.ruleForm
      //过滤空行
      let table = this.tableData.filter(item => item.itemcode != null);
      console.log(table, "table")
      console.log(typeof(table[0].saleunitquant), "typeof(table[0].saleunitquant)")
      //table数据
      ruleForm.eabc00List = table;
      ruleForm.eaba00List = table;
      //form数据
      addRuleForm1(ruleForm).then(response => {
        console.log(response, "确认记账返回的数据")
        this.$message({
          message: "记账成功,您记账的凭证编号为:" + response[0].vouchernumber + "  !",
          type: "success"
        });
        getNumber(this.sysnumber).then(response => {
          console.log(response, "获取凭证编码")
          this.ruleForm.vouchernumber = response != null ? response.msg : "0000000001"
          // console.log(response.data);
        });
        return;
      });
      this.dialogVisible = false;
      this.tableData = [];
      this.tableData2 = [];
      this.tableData3 = [];
      //清空tableData
      this.ruleForm.eabc00List = [];
      this.clear();
      this.ruleForm.resourceusage = null;
      this.ruleForm.purphaseperson = null;
      this.ruleForm.businessdate = new Date();
      this.dialogVisible2 = false;
    },
    //作废
    clear() {
      //清空子表
      this.tableData = [];
      this.ruleForm.billnumber = null;
      this.ruleForm.unitname = null;
      this.ruleForm.businessdate = new Date();
      this.ruleForm.resourceusage = null;
      this.ruleForm.summary = null;
      this.rowNum = 1;
      for (let i = 0; i < 10; i++) {
        this.addRow();
      }
      // this.tableData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
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
    // 合计
    // 计算tableData的5，7，8列的和
    getSummaries(param) {
      let sumQuant = 0;
      let sumMoney = 0;
      let sumTaxMoney = 0;
      const {columns, data} = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
        }
          // index >= 3 || index <= 11 是你需要计算的列
          // 当然也可以指定一个或者多个列
        // index === 2 || index === 3 这样值求和第二个与第三个列
        else if (index === 5 || index === 7 || index === 8) {
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
      console.log(sums, 'sums');
      console.log(sums[5], 'sums5');
      console.log(sums[7], 'sums7');
      console.log(sums[8], 'sums8');
      if (this.tableData[0].itemcode != null) {
        //查看sums[5]的类型
        console.log(typeof sums[5], 'typeof sums[5]');
        this.sumQuant = sums[5];
        this.sumTaxMoney = parseFloat(sums[8]).toFixed(2)
        sums[8] = parseFloat(sums[8]).toFixed(2)
        this.sumQuant = parseFloat(sums[5]).toFixed(2);
        sums[5] = parseFloat(sums[5]).toFixed(2);
        console.log(this.sumQuant, 'this.sumQuant');
        this.sumMoney = parseFloat(sums[7]).toFixed(2);
        sums[7] = parseFloat(sums[7]).toFixed(2);
      }
      /**把shis.sumMoney保存两位小数点 */
      // this.sumQuant = this.sumQuant.toFixedNumber(2);
      // this.sumMoney = this.sumMoney.toFixedNumber(2);
      return sums

    },

    addRow() {
      const list = {
        rowNum: this.rowNum,
        id: 0,
        saleunitquant: undefined,
        tax_money: undefined,
        inventoryprice: undefined,
        businessmoney: undefined,
        itemcode: undefined,
        itemname: undefined,
        model: undefined,
        unit: undefined,
        taxrate: undefined,
        taxtest: '0.13',
        safetyfeeflag: '0',
        summary: undefined,
      };
      this.tableData.push(list);
      this.rowNum += 1;
    },
    addRow1() {
      const list1 = {
        rowNum: this.rowNum,
        id: 0,
        itemcode: undefined,
        inventoryquant: undefined,
        inventorymoney: undefined,
      };
      this.tableData2.push(list1);
      this.rowNum += 1;
    },
    addRow2() {
      const list1 = {
        rowNum: this.rowNum,
        id: 0,
        itemcode: undefined,
        inventoryquant: undefined,
        inventorymoney: undefined,
      };
      this.tableData3.push(list1);
      this.rowNum += 1;
    },
    cancel() {
      this.bcxxopen = false;
      this.bcxxopen1 = false;
      this.bcxxopen2 = false;
      this.bcxxopen3 = false;
      this.ruleForm.unitname = null;
      this.ruleForm.unitcode = null;
      this.ruleForm.purphaseperson = null;
    },
    cancel1() {
      this.dialogVisible = false;
      this.tableData2 = [];
    },
    cancel2() {
      this.dialogVisible2 = false;
      this.tableData3 = [];
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    // 放大镜点击事件
    search(index, row) {
      this.bcxxopen = true;
      this.nowRow = row;
      this.nowindex = index;
      this.getList();
    },
    //入库订单查询
    searchMaterials1() {
      this.activeName1 = 'first1';
      //先做判断，如果input输入框为空，往下继续执行，如果不为空，则提示信息
      if (this.ruleForm.billnumber == null || this.ruleForm.billnumber == "" || this.ruleForm.billnumber == undefined) {
        this.bcxxopen2 = true;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].itemcode == null || this.tableData[i].itemcode == "" || this.tableData[i].itemcode == undefined) {
            this.nowindex = this.tableData[i].rowNum - 1;
            break;
          }
        }
        this.getPurchaseList();
      } else {
        this.$message({
          message: "当前凭证尚未处理完毕,请先处理完此凭证后再选择新单据！",
          type: "warning"
        });
      }
    },
    //出库订单
    searchMaterials2() {
      this.activeName = 'first';
      if (this.ruleForm.billnumber == null || this.ruleForm.billnumber == "" || this.ruleForm.billnumber == undefined) {
        this.bcxxopen1 = true;
        // this.nowindex = this.nowindex==undefined?0:+1;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].itemcode == null || this.tableData[i].itemcode == "" || this.tableData[i].itemcode == undefined) {
            this.nowindex = this.tableData[i].rowNum - 1;
            break;
          }
        }
        this.getMaterialsList();
      } else {
        this.$message({
          message: "当前凭证尚未处理完毕,请先处理完此凭证后再选择新单据！",
          type: "warning"
        });
      }
    },
    //退货单
    searchMaterials3() {
      this.activeName2 = 'first2';
      if (this.ruleForm.billnumber == null || this.ruleForm.billnumber == "" || this.ruleForm.billnumber == undefined) {
        this.bcxxopen3 = true;
        // this.nowindex = this.nowindex==undefined?0:+1;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].itemcode == null || this.tableData[i].itemcode == "" || this.tableData[i].itemcode == undefined) {
            this.nowindex = this.tableData[i].rowNum - 1;
            break;
          }
        }
        this.getPurchaseList1();
      } else {
        this.$message({
          message: "当前凭证尚未处理完毕,请先处理完此凭证后再选择新单据！",
          type: "warning"
        });
      }
    },

    //选择物料信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //点击全选按钮选择所有行，再次点击取消。
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    selectRow(val) {
      this.selectlistRow = val;
      this.multiple = !val.length
    },

    setCurrent(row) {
      this.$refs.multipleTable.setCurrentRow(row);
    },
    //选择基本信息表的行高亮
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log(this.currentRow, "当前行的值")
      console.log(this.ruleForm.vouchertype, "当前凭证类别")
      if (this.ruleForm.vouchertype == '0100') {
        this.ruleForm.unitname = this.currentRow.supplier;
        this.ruleForm.unitcode = this.currentRow.idSup;
        this.ruleForm.purphaseperson = this.currentRow.operator
      } else if (this.ruleForm.vouchertype == '0200') {
        this.ruleForm.unitname = this.currentRow.deptname;
        this.ruleForm.unitcode = this.currentRow.deptcode;
        this.ruleForm.billnumber = this.currentRow.materialid;
      } else if (this.ruleForm.vouchertype == '0300') {
        this.ruleForm.unitname = this.currentRow.supplier;
        this.ruleForm.unitcode = this.currentRow.idSup;
        this.ruleForm.purphaseperson = this.currentRow.nameBuyer;
        console.log(this.currentRow.supplier, "供应商")
        console.log(this.ruleForm.unitname, "当前部门名称")
      } else if (this.ruleForm.vouchertype == '0400') {
        this.ruleForm.unitname = this.currentRow.deptname;
        this.ruleForm.unitcode = this.currentRow.deptcode;
      }
    },
    handleCurrentChange1(val) {
      this.currentRow = val;
    },
    //确定按钮
    submitForm() {
      //判断将要添加的这一行的itemcode是否已经在tableData中存在，如果存在，则提示请勿重复添加，如果不存在，则添加
      for (let i = 0; i < this.tableData.length; i++) {
        console.log(this.tableData.length, "当前行的itemcode")
        if (this.tableData[i].itemcode == this.multipleSelection[i].itemcode) {
          this.$message({
            message: "请勿重复添加！",
            type: "warning"
          });
          return;
        } else {
          //物料编码
          this.tableData[this.nowindex + i].itemcode = this.multipleSelection[i].itemcode;
          //物料名称
          this.tableData[this.nowindex + i].itemname = this.multipleSelection[i].itemname;
          //规格型号
          this.tableData[this.nowindex + i].model = this.multipleSelection[i].model;
          //单位
          this.tableData[this.nowindex + i].unit = this.multipleSelection[i].unit;
          //单价
          this.tableData[this.nowindex + i].inventoryprice = this.multipleSelection[i].inventoryprice;
        }
        this.bcxxopen = false;
      }
    },
    //点击保存将选择的物料明细信息添加到表单中
    //出库确定按钮
    submitForm1() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        //判断tabledata的长度，当长度大于10时，禁止加入新的数据
        if (this.nowindex + i > 9) {
          return this.$message({
            message: "最多只能添加10条数据",
            type: "warning",
          });
        } else {
          console.log(this.multipleSelection[i].realprice, "realprice");
          console.log(this.multipleSelection[i].plannum, "plannum");
          console.log(this.multipleSelection[i], "multipleSelection");
          this.multipleSelection[i].deptname;
          this.ruleForm.resourceusage="生产用";
          this.tableData[this.nowindex + i].itemcode = this.multipleSelection[i].itemcode;
          this.tableData[this.nowindex + i].itemname = this.multipleSelection[i].itemname;
          this.tableData[this.nowindex + i].model = this.multipleSelection[i].model;
          this.tableData[this.nowindex + i].unit = this.multipleSelection[i].unit;
          //数量
          this.tableData[this.nowindex + i].saleunitquant = (this.multipleSelection[i].plannum - this.multipleSelection[i].finishnum);
          this.tableData[this.nowindex + i].inventoryprice = this.multipleSelection[i].inventoryprice;
          this.tableData[this.nowindex + i].businessmoney = (this.multipleSelection[i].plannum - this.multipleSelection[i].finishnum) * this.multipleSelection[i].inventoryprice;
          //let taxMoney = (this.multipleSelection[i].plannum - this.multipleSelection[i].finishnum) * (this.multipleSelection[i].realprice) * (1.13)
          //把taxMoney的值给tableData的tax_money属性
          //this.tableData[this.nowindex + i].tax_money = taxMoney;
          //用途给摘要赋值
          this.tableData[this.nowindex + i].summary = this.multipleSelection[i].useage;
        }
        this.bcxxopen1 = false;
      }
    },
    //采购计划传值给eabbList
    //入库确定按钮
    submitForm2() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        //判断tabledata的长度，当长度大于10时，禁止加入新的数据
        if (this.nowindex + i > 9) {
          return this.$message({
            message: "最多只能添加10条数据",
            type: "warning",
          });
        } else {
          let codeContract = this.multipleSelection[i].idContract;
          let realCodeContract = intToString(codeContract);
          //将合同编号给凭证编号
          this.ruleForm.billnumber = realCodeContract;
          this.tableData[this.nowindex + i].itemcode = this.multipleSelection[i].idProduct;
          //物料名称
          this.tableData[this.nowindex + i].itemname = this.multipleSelection[i].itemname;
          //规格型号
          this.tableData[this.nowindex + i].model = this.multipleSelection[i].model;
          // 单位
          this.tableData[this.nowindex + i].unit = this.multipleSelection[i].unit;
          //数量
          this.tableData[this.nowindex + i].saleunitquant = (this.multipleSelection[i].amount - this.multipleSelection[i].amountWarehouse);
          // 单价
          this.tableData[this.nowindex + i].inventoryprice = this.multipleSelection[i].price;
          //金额
          this.tableData[this.nowindex + i].businessmoney = this.multipleSelection[i].total;
          this.tableData[this.nowindex + i].tax_money = ((this.multipleSelection[i].amount - this.multipleSelection[i].amountWarehouse) * (this.tableData[this.nowindex + i].inventoryprice) * (1.13));
          // //含税金额
          // this.tableData[this.nowindex + i].tax_money = this.tableData[this.nowindex + i].businessmoney * (1 + percentToValue(this.tableData[this.nowindex + i].taxtest));
          // console.log(this.tableData[this.nowindex + i].businessmoney, "含税金额");
          // console.log(percentToValue(this.tableData[this.nowindex + i].taxtest), "税率");
        }
        this.bcxxopen2 = false;
        // console.log(this.multipleSelection[i].codeContract);
      }
    },
    //退货确定按钮
    submitForm3() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        //判断tabledata的长度，当长度大于10时，禁止加入新的数据
        if (this.nowindex + i > 9) {
          return this.$message({
            message: "最多只能添加10条数据",
            type: "warning",
          });
        } else {
          let codeContract = this.multipleSelection[i].idContract;
          let realCodeContract = intToString(codeContract);
          //将合同编号给凭证编号
          this.ruleForm.billnumber = realCodeContract;
          this.ruleForm.resourceusage="生产用";
          this.tableData[this.nowindex + i].itemcode = this.multipleSelection[i].idProduct;
          //物料名称
          this.tableData[this.nowindex + i].itemname = this.multipleSelection[i].itemname;
          //规格型号
          this.tableData[this.nowindex + i].model = this.multipleSelection[i].model;
          // 单位
          this.tableData[this.nowindex + i].unit = this.multipleSelection[i].unit;
          //数量
          this.tableData[this.nowindex + i].saleunitquant = this.multipleSelection[i].amount;
          // 单价
          this.tableData[this.nowindex + i].inventoryprice = this.multipleSelection[i].price;
          //金额
          //this.tableData[this.nowindex + i].businessmoney = this.multipleSelection[i].total;
          //this.tableData[this.nowindex + i].tax_money = (this.multipleSelection[i].amount) * (this.tableData[this.nowindex + i].inventoryprice) * (1.13);
        }
        this.bcxxopen3 = false;
      }
    },
    dayin() {
      /**过滤掉空数据 */
      this.tableData1 = this.tableData.filter(item => item.itemcode != null);
      console.log(this.tableData1.length, "过滤掉空数据");
      if (this.ruleForm.vouchertype === "0200") {
        let LODOP = getLodop(); //调用getLodop获取LODOP对象
        LODOP.PRINT_INITA(1, -1, 800, 600, "");
        LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
        LODOP.PRINT_INITA(1, 0, 800, 600, "");
        LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");

//长方形表格
        LODOP.ADD_PRINT_RECT(157, 2, 751, 265, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 135, 422, 136, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 240, 422, 241, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 336, 422, 337, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 411, 422, 412, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 446, 422, 447, 0, 1);
        LODOP.ADD_PRINT_LINE(158, 526, 423, 527, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 596, 422, 597, 0, 1);

        LODOP.ADD_PRINT_LINE(178, 2, 179, 752, 0, 1);
        LODOP.ADD_PRINT_LINE(372, 2, 371, 752, 0, 1);
        LODOP.ADD_PRINT_LINE(395, 2, 394, 752, 0, 1);
        LODOP.ADD_PRINT_LINE(422, 3, 421, 753, 0, 1);

// 表头
        LODOP.ADD_PRINT_TEXT(158, 22, 100, 20, "物料编号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(157, 140, 100, 20, "物料名称");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(157, 244, 85, 20, "规格型号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(159, 336, 70, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(160, 412, 35, 20, "单位");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(157, 449, 78, 20, "单价");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(159, 526, 64, 10, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(159, 618, 100, 20, "摘要");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

//物料编号
        for (let i = 0; i < this.tableData.length; i++) {
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 2, 133, 10, this.tableData[i].itemcode);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }
        console.log(this.tableData.length - 2, "this.tableData.length-2")
        for (let j = 0; j < this.tableData.length - 2; j++) {
          console.log(j, "j")
          LODOP.ADD_PRINT_LINE(200 + j * 20, 2, 199 + j * 20, 752, 0, 1);
        }

//物料名称
        for (var i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(179 + i * 20, 136, 100, 10, this.tableData1[i].itemname);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }

// 规格型号
        for (let i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 241, 135, 10, this.tableData1[i].model);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }
// 数量
        console.log(this.tableData1.length, 'this.tableData.length');
        for (let i = 0; i < this.tableData1.length; i++) {
          let saleunitquant = parseFloat(this.tableData1[i].saleunitquant).toFixed(2);
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 340, 70, 26, saleunitquant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }
// 单位
        for (let i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 412, 25, 20, this.tableData1[i].unit);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }

// 单价
        for (let i = 0; i < this.tableData1.length; i++) {
          let inventoryprice = parseFloat(this.tableData1[i].inventoryprice).toFixed(2);
          LODOP.ADD_PRINT_TEXT(179 + i * 23, 446, 80, 20, inventoryprice);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }
// 金额
        for (let i = 0; i < this.tableData1.length; i++) {
          let businessmoney = parseFloat(this.tableData1[i].businessmoney).toFixed(2);
          LODOP.ADD_PRINT_TEXT(179 + i * 23, 520, 75, 20, businessmoney);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }
// 摘要
        for (let i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(179 + i * 23, 594, 90, 10, this.tableData1[i].summary);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }

// 小计
        LODOP.ADD_PRINT_TEXT(404, 16, 70, 30, "小计");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(404, 528, 69, 30, this.sumMoney);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(404, 358, 63, 30, this.sumQuant);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

        LODOP.ADD_PRINT_TEXT(19, 360, 140, 20, "库存记账凭证");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_TEXT(57, 37, 75, 20, "凭证类别");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(55, 209, 75, 20, "凭证编号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 401, 80, 20, "来源/用途");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(56, 584, 61, 20, "单据号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(88, 39, 116, 20, "单位/部门名称");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(117, 39, 74, 20, "凭证摘要");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 31, 73, 20, "制证日期");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(441, 170, 60, 20, "制证人");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 297, 105, 20, "制证人（签）");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 453, 106, 20, "领料人（签)");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 604, 125, 20, "单位主管（签）");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

        LODOP.ADD_PRINT_TEXT(476, 29, 443, 20, "白联-保管  黄联-财务  红联-材料会计  绿联-供应商/用料单位");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Italic", 1);
        LODOP.ADD_PRINT_TEXT(478, 571, 175, 20, "第 1 页 / 共 1 页");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

//凭证类别，凭证编号，来源用途，单据号，单位部门，摘要横线
        LODOP.ADD_PRINT_LINE(41, 276, 40, 356, 0, 1);
        LODOP.ADD_PRINT_LINE(78, 97, 77, 177, 0, 1);
        LODOP.ADD_PRINT_LINE(74, 270, 73, 350, 0, 1);
        LODOP.ADD_PRINT_LINE(75, 469, 74, 549, 0, 1);
        LODOP.ADD_PRINT_LINE(75, 633, 74, 713, 0, 1);
        LODOP.ADD_PRINT_LINE(110, 128, 109, 718, 0, 1);
        LODOP.ADD_PRINT_LINE(138, 94, 137, 719, 0, 1);

// 制证日期，制证人，制证人签，领料人签，单位主管签横线
        LODOP.ADD_PRINT_LINE(460, 93, 459, 163, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 93, 100, 20, dateToString(this.ruleForm.voucherdate));
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(461, 225, 460, 285, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 225, 100, 20, this.ruleForm.operator);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(460, 383, 459, 443, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 383, 100, 20, this.ruleForm.operator);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(460, 528, 459, 588, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 528, 100, 20, "暂时为空");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(460, 692, 459, 752, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 692, 100, 20, this.ruleForm.manager);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        //凭证类别，凭证编号，来源用途，单据号，单位部门，摘要
        LODOP.ADD_PRINT_TEXT(57, 106, 100, 20, this.vouchertype.label + "凭证");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 274, 100, 20, this.ruleForm.vouchernumber);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 478, 100, 20, this.ruleForm.resourceusage);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 637, 100, 20, this.ruleForm.billnumber);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(89, 139, 213, 20, this.ruleForm.unitname);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(18, 258, 100, 20, userInfo.dept.deptName);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
        LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
        LODOP.PREVIEW(); //预览(预览打印无脚标)
        // LODOP.PRINT(); //打印
      } else if (this.ruleForm.vouchertype == "0100") {
        let LODOP = getLodop(); //调用getLodop获取LODOP对象
        LODOP.PRINT_INITA(1, -1, 800, 600, "");
        LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
        LODOP.PRINT_INITA(1, 0, 800, 600, "");
        LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");

//长方形表格
        LODOP.ADD_PRINT_RECT(157, 2, 751, 265, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 135, 422, 136, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 240, 422, 241, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 336, 422, 337, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 411, 422, 412, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 446, 422, 447, 0, 1);
        LODOP.ADD_PRINT_LINE(158, 526, 423, 527, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 596, 422, 597, 0, 1);
        LODOP.ADD_PRINT_LINE(178, 2, 179, 752, 0, 1);
        LODOP.ADD_PRINT_LINE(372, 2, 371, 752, 0, 1);
        LODOP.ADD_PRINT_LINE(395, 2, 394, 752, 0, 1);
        LODOP.ADD_PRINT_LINE(422, 2, 421, 753, 0, 1);

// 表头
        LODOP.ADD_PRINT_TEXT(158, 22, 100, 20, "物料编号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(157, 140, 100, 20, "物料名称");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(157, 244, 85, 20, "规格型号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(159, 336, 70, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(160, 412, 35, 20, "单位");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(157, 449, 78, 20, "单价");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(159, 526, 64, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(159, 618, 100, 20, "摘要");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

//物料编号
        for (let i = 0; i < this.tableData.length; i++) {
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 2, 133, 10, this.tableData[i].itemcode);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }
        console.log(this.tableData.length - 2, "this.tableData.length-2")
        for (let j = 0; j < this.tableData.length - 2; j++) {
          console.log(j, "j")
          LODOP.ADD_PRINT_LINE(200 + j * 20, 2, 199 + j * 20, 752, 0, 1);
        }

//物料名称
        for (var i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(179 + i * 20, 136, 100, 10, this.tableData1[i].itemname);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }

// 规格型号
        for (let i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 241, 135, 10, this.tableData1[i].model);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }
// 数量
        console.log(this.tableData1.length, 'this.tableData.length');
        for (let i = 0; i < this.tableData1.length; i++) {
          let saleunitquant = parseFloat(this.tableData1[i].saleunitquant).toFixed(2)
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 340, 70, 26, saleunitquant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }
// 单位
        for (let i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 412, 25, 20, this.tableData1[i].unit);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }

// 单价
        for (let i = 0; i < this.tableData1.length; i++) {
          let inventoryprice = parseFloat(this.tableData1[i].inventoryprice).toFixed(2)
          LODOP.ADD_PRINT_TEXT(179 + i * 23, 446, 80, 20, inventoryprice);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }
// 金额
        for (let i = 0; i < this.tableData1.length; i++) {
          let businessmoney = parseFloat(this.tableData1[i].businessmoney).toFixed(2)
          LODOP.ADD_PRINT_TEXT(179 + i * 23, 520, 75, 20, businessmoney);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }
// 摘要
        for (let i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(179 + i * 23, 594, 100, 10, this.tableData1[i].summary);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }

// 小计
        LODOP.ADD_PRINT_TEXT(404, 16, 70, 30, "小计");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(404, 528, 69, 30, this.sumMoney);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(404, 358, 63, 30, this.sumQuant);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

        LODOP.ADD_PRINT_TEXT(19, 360, 140, 20, "库存记账凭证");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_TEXT(57, 37, 75, 20, "凭证类别");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(55, 209, 75, 20, "凭证编号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 401, 80, 20, "来源/用途");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(56, 584, 61, 20, "单据号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(88, 39, 116, 20, "单位/部门名称");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(117, 39, 74, 20, "凭证摘要");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 31, 73, 20, "制证日期");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(441, 170, 60, 20, "制证人");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 297, 105, 20, "制证人(签)");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 453, 106, 20, "业务员(签)");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 604, 125, 20, "材料会计(签)");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

        LODOP.ADD_PRINT_TEXT(476, 29, 443, 20, "白联-保管  黄联-财务  红联-材料会计  绿联-供应商/用料单位");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Italic", 1);
        LODOP.ADD_PRINT_TEXT(478, 571, 175, 20, "第 1 页 / 共 1 页");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

//凭证类别，凭证编号，来源用途，单据号，单位部门，摘要横线
        LODOP.ADD_PRINT_LINE(41, 276, 40, 356, 0, 1);
        LODOP.ADD_PRINT_LINE(78, 97, 77, 177, 0, 1);
        LODOP.ADD_PRINT_LINE(74, 270, 73, 350, 0, 1);
        LODOP.ADD_PRINT_LINE(75, 469, 74, 549, 0, 1);
        LODOP.ADD_PRINT_LINE(75, 633, 74, 713, 0, 1);
        LODOP.ADD_PRINT_LINE(110, 128, 109, 718, 0, 1);
        LODOP.ADD_PRINT_LINE(138, 94, 137, 719, 0, 1);

// 制证日期，制证人，制证人签，业务员签，财务会计签横线
        LODOP.ADD_PRINT_LINE(460, 93, 459, 163, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 93, 100, 20, dateToString(this.ruleForm.voucherdate));
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(461, 225, 460, 285, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 225, 100, 20, this.ruleForm.operator);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(460, 383, 459, 443, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 383, 100, 20, this.ruleForm.operator);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(460, 528, 459, 588, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 528, 100, 20, this.ruleForm.purphaseperson);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(460, 692, 459, 752, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 692, 100, 20,);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(57, 106, 100, 20, this.vouchertype.label + "凭证");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 274, 100, 20, this.ruleForm.vouchernumber);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 478, 100, 20, this.ruleForm.resourceusage);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 637, 100, 20, this.ruleForm.billnumber);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(89, 139, 213, 20, this.ruleForm.unitname);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(18, 258, 100, 20, userInfo.dept.deptName);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
        LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
        LODOP.PREVIEW(); //预览(预览打印无脚标)
        // LODOP.PRINT(); //打印
      } else if (this.ruleForm.vouchertype == "0300") {
        let LODOP = getLodop(); //调用getLodop获取LODOP对象
        LODOP.PRINT_INITA(1, -1, 800, 600, "");
        LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
        LODOP.PRINT_INITA(1, 0, 800, 600, "");
        LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");

//长方形表格
        LODOP.ADD_PRINT_RECT(157, 2, 751, 265, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 135, 422, 136, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 240, 422, 241, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 336, 422, 337, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 411, 422, 412, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 446, 422, 447, 0, 1);
        LODOP.ADD_PRINT_LINE(158, 526, 423, 527, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 596, 422, 597, 0, 1);
        LODOP.ADD_PRINT_LINE(178, 2, 179, 752, 0, 1);
        LODOP.ADD_PRINT_LINE(372, 2, 371, 752, 0, 1);
        LODOP.ADD_PRINT_LINE(395, 2, 394, 752, 0, 1);
        LODOP.ADD_PRINT_LINE(422, 3, 421, 753, 0, 1);

// 表头
        LODOP.ADD_PRINT_TEXT(158, 22, 100, 20, "物料编号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(157, 140, 100, 20, "物料名称");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(157, 244, 85, 20, "规格型号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(159, 336, 70, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(160, 412, 35, 20, "单位");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(157, 449, 78, 20, "单价");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(159, 526, 64, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(159, 618, 100, 20, "摘要");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

//物料编号
        //物料编号
        for (let i = 0; i < this.tableData.length; i++) {
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 2, 133, 10, this.tableData[i].itemcode);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }
        console.log(this.tableData.length - 2, "this.tableData.length-2")
        for (let j = 0; j < this.tableData.length - 2; j++) {
          console.log(j, "j")
          LODOP.ADD_PRINT_LINE(200 + j * 20, 2, 199 + j * 20, 752, 0, 1);
        }

//物料名称
        for (var i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(179 + i * 20, 136, 100, 10, this.tableData1[i].itemname);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }

// 规格型号
        for (let i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 241, 135, 10, this.tableData1[i].model);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }
// 数量
        console.log(this.tableData1.length, 'this.tableData.length');
        for (let i = 0; i < this.tableData1.length; i++) {
          let saleunitquant = parseFloat(this.tableData1[i].saleunitquant).toFixed(2)
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 340, 70, 26, saleunitquant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }
// 单位
        for (let i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 412, 25, 20, this.tableData1[i].unit);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }

// 单价
        for (let i = 0; i < this.tableData1.length; i++) {
          let inventoryprice = parseFloat(this.tableData1[i].inventoryprice).toFixed(2)
          LODOP.ADD_PRINT_TEXT(179 + i * 23, 446, 80, 20, inventoryprice);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }
// 金额
        for (let i = 0; i < this.tableData1.length; i++) {
          let businessmoney = parseFloat(this.tableData1[i].businessmoney).toFixed(2)
          LODOP.ADD_PRINT_TEXT(179 + i * 23, 520, 75, 20, businessmoney);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }
// 摘要
        for (let i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(179 + i * 23, 594, 100, 10, this.tableData1[i].summary);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }

// 小计
        LODOP.ADD_PRINT_TEXT(404, 16, 70, 30, "小计");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(404, 528, 69, 30, this.sumMoney);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(404, 358, 63, 30, this.sumQuant);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

        LODOP.ADD_PRINT_TEXT(19, 360, 140, 20, "库存记账凭证");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_TEXT(57, 37, 75, 20, "凭证类别");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(55, 209, 75, 20, "凭证编号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 401, 80, 20, "来源/用途");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(56, 584, 61, 20, "单据号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(88, 39, 116, 20, "单位/部门名称");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(117, 39, 74, 20, "凭证摘要");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 31, 73, 20, "制证日期");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(441, 170, 60, 20, "制证人");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 297, 105, 20, "制证人（签）");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 453, 106, 20, "领料人（签)");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 604, 125, 20, "单位主管（签）");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

        LODOP.ADD_PRINT_TEXT(476, 29, 443, 20, "白联-保管  黄联-财务  红联-材料会计  绿联-供应商/用料单位");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Italic", 1);
        LODOP.ADD_PRINT_TEXT(478, 571, 175, 20, "第 1 页 / 共 1 页");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

//凭证类别，凭证编号，来源用途，单据号，单位部门，摘要横线
        LODOP.ADD_PRINT_LINE(41, 276, 40, 356, 0, 1);
        LODOP.ADD_PRINT_LINE(78, 97, 77, 177, 0, 1);
        LODOP.ADD_PRINT_LINE(74, 270, 73, 350, 0, 1);
        LODOP.ADD_PRINT_LINE(75, 469, 74, 549, 0, 1);
        LODOP.ADD_PRINT_LINE(75, 633, 74, 713, 0, 1);
        LODOP.ADD_PRINT_LINE(110, 128, 109, 718, 0, 1);
        LODOP.ADD_PRINT_LINE(138, 94, 137, 719, 0, 1);

// 制证日期，制证人，制证人签，领料人签，单位主管签横线
        LODOP.ADD_PRINT_LINE(460, 93, 459, 163, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 93, 100, 20, dateToString(this.ruleForm.voucherdate));
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(461, 225, 460, 285, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 225, 100, 20, this.ruleForm.operator);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(460, 383, 459, 443, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 383, 100, 20, this.ruleForm.operator);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(460, 528, 459, 588, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 528, 100, 20, "暂时为空");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(460, 692, 459, 752, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 692, 100, 20, this.ruleForm.manager);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(57, 106, 100, 20, this.vouchertype.label + "凭证");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 274, 100, 20, this.ruleForm.vouchernumber);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 478, 100, 20, this.ruleForm.resourceusage);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 637, 100, 20, this.ruleForm.billnumber);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(89, 139, 213, 20, this.ruleForm.unitname);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(18, 258, 100, 20, userInfo.dept.deptName);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
        LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
        LODOP.PREVIEW(); //预览(预览打印无脚标)
        // LODOP.PRINT(); //打印
      } else if (this.ruleForm.vouchertype == "0400") {
        let LODOP = getLodop(); //调用getLodop获取LODOP对象
        LODOP.PRINT_INITA(1, -1, 800, 600, "");
        LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");
        LODOP.PRINT_INITA(1, 0, 800, 600, "");
        LODOP.SET_PRINT_PAGESIZE(0, 800, 800, "");

//长方形表格 竖线
        LODOP.ADD_PRINT_RECT(157, 2, 751, 265, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 135, 422, 136, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 240, 422, 241, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 336, 422, 337, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 411, 422, 412, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 446, 422, 447, 0, 1);
        LODOP.ADD_PRINT_LINE(158, 526, 423, 527, 0, 1);
        LODOP.ADD_PRINT_LINE(157, 596, 422, 597, 0, 1);
        LODOP.ADD_PRINT_LINE(178, 2, 179, 752, 0, 1);
        LODOP.ADD_PRINT_LINE(372, 2, 371, 752, 0, 1);
        LODOP.ADD_PRINT_LINE(395, 2, 394, 752, 0, 1);
        LODOP.ADD_PRINT_LINE(422, 3, 421, 753, 0, 1);

// 表头
        LODOP.ADD_PRINT_TEXT(158, 22, 100, 20, "物料编号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(157, 140, 100, 20, "物料名称");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(157, 244, 85, 20, "规格型号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(159, 336, 70, 20, "数量");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(160, 412, 35, 20, "单位");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(157, 449, 78, 20, "单价");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(159, 526, 64, 20, "金额");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(159, 618, 100, 20, "摘要");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

//物料编号
        for (let i = 0; i < this.tableData.length; i++) {
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 2, 133, 10, this.tableData[i].itemcode);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }
        console.log(this.tableData.length - 2, "this.tableData.length-2")
        for (let j = 0; j < this.tableData.length - 2; j++) {
          console.log(j, "j")
          LODOP.ADD_PRINT_LINE(200 + j * 20, 2, 199 + j * 20, 752, 0, 1);
        }

//物料名称
        for (var i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(179 + i * 20, 136, 100, 10, this.tableData1[i].itemname);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }

// 规格型号
        for (let i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 241, 135, 10, this.tableData1[i].model);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        }
// 数量
        console.log(this.tableData1.length, 'this.tableData.length');
        for (let i = 0; i < this.tableData1.length; i++) {
          let saleunitquant = parseFloat(this.tableData1[i].saleunitquant).toFixed(2)
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 340, 70, 26, saleunitquant);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }
// 单位
        for (let i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(180 + i * 20, 412, 25, 20, this.tableData1[i].unit);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }

// 单价
        for (let i = 0; i < this.tableData1.length; i++) {
          let inventoryprice = parseFloat(this.tableData1[i].inventoryprice).toFixed(2)
          LODOP.ADD_PRINT_TEXT(179 + i * 23, 446, 80, 20, inventoryprice);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }
// 金额
        for (let i = 0; i < this.tableData1.length; i++) {
          let businessmoney = parseFloat(this.tableData1[i].businessmoney).toFixed(2)
          LODOP.ADD_PRINT_TEXT(179 + i * 23, 520, 75, 20, businessmoney);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }
// 摘要
        for (let i = 0; i < this.tableData1.length; i++) {
          LODOP.ADD_PRINT_TEXT(179 + i * 23, 594, 80, 10, this.tableData1[i].summary);
          LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
          LODOP.SET_PRINT_STYLEA(0, "Alignment", 3);
        }

// 小计
        LODOP.ADD_PRINT_TEXT(404, 16, 70, 30, "小计");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(404, 528, 69, 30, this.sumMoney);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(404, 358, 63, 30, this.sumQuant);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

        LODOP.ADD_PRINT_TEXT(19, 360, 140, 20, "库存记账凭证");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.ADD_PRINT_TEXT(57, 37, 75, 20, "凭证类别");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(55, 209, 75, 20, "凭证编号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 401, 80, 20, "来源/用途");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(56, 584, 61, 20, "单据号");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(88, 39, 116, 20, "单位/部门名称");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(117, 39, 74, 20, "凭证摘要");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 31, 73, 20, "制证日期");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(441, 170, 60, 20, "制证人");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 297, 105, 20, "制证人（签）");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 453, 106, 20, "领料人（签)");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(440, 604, 125, 20, "单位主管（签）");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

        LODOP.ADD_PRINT_TEXT(476, 29, 443, 20, "白联-保管  黄联-财务  红联-材料会计  绿联-供应商/用料单位");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Italic", 1);
        LODOP.ADD_PRINT_TEXT(478, 571, 175, 20, "第 1 页 / 共 1 页");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

//凭证类别，凭证编号，来源用途，单据号，单位部门，摘要横线
        LODOP.ADD_PRINT_LINE(41, 276, 40, 356, 0, 1);
        LODOP.ADD_PRINT_LINE(78, 97, 77, 177, 0, 1);
        LODOP.ADD_PRINT_LINE(74, 270, 73, 350, 0, 1);
        LODOP.ADD_PRINT_LINE(75, 469, 74, 549, 0, 1);
        LODOP.ADD_PRINT_LINE(75, 633, 74, 713, 0, 1);
        LODOP.ADD_PRINT_LINE(110, 128, 109, 718, 0, 1);
        LODOP.ADD_PRINT_LINE(138, 94, 137, 719, 0, 1);

// 制证日期，制证人，制证人签，领料人签，单位主管签横线
        LODOP.ADD_PRINT_LINE(460, 93, 459, 163, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 93, 100, 20, dateToString(this.ruleForm.voucherdate));
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(461, 225, 460, 285, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 225, 100, 20, this.ruleForm.operator);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(460, 383, 459, 443, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 383, 100, 20, this.ruleForm.operator);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(460, 528, 459, 588, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 528, 100, 20, "暂时为空");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_LINE(460, 692, 459, 752, 0, 1);
        LODOP.ADD_PRINT_TEXT(440, 692, 100, 20, this.ruleForm.manager);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(57, 106, 100, 20, this.vouchertype.label + "凭证");
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 274, 100, 20, this.ruleForm.vouchernumber);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 478, 100, 20, this.ruleForm.resourceusage);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(54, 637, 100, 20, this.ruleForm.billnumber);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(89, 139, 213, 20, this.ruleForm.unitname);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(18, 258, 100, 20, userInfo.dept.deptName);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "微软雅黑");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
        LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
        LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
        LODOP.PREVIEW(); //预览(预览打印无脚标)

      }
      //LODOP.PRINT(); //打印
      this.printVoucher = 1;
    },
    /** 查询产品（物料）列表 */
    getList() {
      this.loading = true;
      listMaterialByDeptcode(this.queryParams).then(response => {
        console.log(response, 'response');
        this.materialList = []
        response.rows.forEach((e) => {
          this.materialList.push(e)
        });
        // console.log("materialList", this.materialList);
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询采购订单主列表(入库(基本信息) */
    getPurchaseList() {
      this.loading = true;
      listOrdersNoDoByDeptId(this.queryParams).then(response => {
        console.log("response0100", response.rows);
        this.contractDetailList = response.rows
        this.total1 = response.total;
        this.loading = false;
      });
    },
    /** 查询采购已完成,退库 */
    getPurchaseList1() {
      this.loading = true;
      listOrdersByDeptId(this.queryParams).then(response => {
        console.log("response11", response.rows);
        this.returnList = response.rows
        this.total3 = response.total;
        this.loading = false;
      });
    },
    /**供应商订单列表 */
    getSupplierList() {
      this.loading = true;
      listSupplier(this.queryParams).then(response => {
        this.supplierList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    //慢加载,没用到，先留着
    loadMore() {  // 这里写入要触发的方法
      this.pageSize += 10;
      //this.getPurchaseList();  //查询的函数
      this.getSupplierList();
    },
    //出库单点击行传值
    handleUpdate(row) {
      this.reset();
      getGetmaterialNo(userInfo.dept.deptId, this.currentRow.materialid).then((response) => {
        console.log(response.rows, "kkkkk")
        this.pickMaterialDetailList = response.rows;
        this.open = true;
      });
    },
    //采购订单明细点击行事件传值（明细信息）
    getpurchaseOrderArticleList(row) {
      this.reset();
      console.log(this.currentRow, "idContractDetail");
      getOrder1(userInfo.dept.deptId, this.currentRow.idContract).then((response) => {
        console.log(response.rows, "kkkkk22222")
        this.purchaseDetailList = response.rows;
        this.open = true;
      });
    },
    //退货点击行事件传值（明细信息）
    getreturnOrderArticleList(row) {
      this.reset();
      getReturnOrder(userInfo.dept.deptId, this.currentRow.idContract).then((response) => {
        console.log(response.rows, "kkk333")
        this.returnDetailList = response.rows;
        this.open = true;
      });
    },
    /**出库查询领料计划主表*/
    getMaterialsList() {
      this.loading = true;
      listGetmaterialByDeptcode(this.queryParams).then(response => {
        this.pickMaterialList = []
        response.rows.forEach((e) => {
          this.pickMaterialList.push(e)
        });
        this.total2 = response.total;
        this.loading = false;
      });
    },
    /**查询领料计划主表*/
    getMaterialsList1() {
      this.loading = true;
      listGetmaterial(this.queryParams).then(response => {
        this.pickMaterialList = []
        response.rows.forEach((e) => {
          this.pickMaterialList.push(e)
        });
        this.total = response.total;
        this.loading = false;
      });
    },
    //查询煤矿及下属部门
    getDeptListByDept_id() {
      this.loading = true;
      listDept1(this.queryParams).then(response => {
        this.DeptList = []
        response.data.forEach((e) => {
          this.DeptList.push(e)
        });
        this.total = response.total;
        this.loading = false;
      });
      console.log(this.DeptList)
    },
    /**查询摘要明细*/
    getSummaryList() {
      this.loading = true;
      listSummary(this.queryParams).then(response => {
        this.summaryList = []
        response.rows.forEach((e) => {
          this.summaryList.push(e)
        });
        this.total = response.total;
        this.loading = false;
        // console.log(this.summaryList)
      });
    },
  }
}

</script>

<style scoped>
.el-input.is-disabled /deep/ .el-input__inner {
  background-color: white;
  color: red;
}


.el-input-number /deep/ .el-input__inner{
  padding: 0px;
}
.el-input /deep/ .el-input__inner{
  padding: 0px;
  padding-left: 2px;
  padding-right: 0px;
}
.el-select /deep/ .el-input__inner{
  padding: 0px;
  padding-left: 2px;
  padding-right: 0px;
}

.el-table /deep/ .cell {
  padding: 0px;
  padding-left: 0px;
  padding-right: 0px;
  line-height: 26px;
  /*background-color: white;*/
}
.div{
  with:1500px;
}

/*利用穿透，设置input边框隐藏*/
/*.inputDeep>>>.el-input__inner {*/
/*  border: 0;*/
/*  text-align: center;*/
/*  border-radius:0px;*/
/*}*/
/*修改表头字体颜色*/
::v-deep .el-table th {
  background-color: white;
}

/*修改tr(行)的background-color*/
/*::v-deep .el-table tr{*/
/*  background-color: white;*/
/*}*/
/*修改tr(行内线)的background-color*/
/*::v-deep .el-table td,.building-top .el-table th.is-leaf {*/
/*  border-bottom:  1px solid #007ACC;*/
/*}*/

.el-input-number.is-disabled /deep/ .el-input__inner {
  color: #f60d0d;
  background-color: #F5F7FA;
}

/*设置el-from表单的间距*/
.el-form-item {
  margin-bottom: 1px;
}

.el-dialog__title {
  font-family: 'Microsoft YaHei';
  font-size: 22px;
}

.app-containerdiv {
  width: 1541px;
  padding: 20px;
  /*el-form禁止随着界面放大缩小而放大缩小*/
  overflow: hidden;
}
.t1{
  font-size: 16px;
  font-family: 'Microsoft YaHei';
  /*color: black;*/
}
.searchBtn /deep/  {
 padding: 0px;
}
.el-form-item /deep/ .el-form-item__content {
  width: 120px;
  padding: 0px;
}
.el-from111 /deep/ .el-form-item__content{
  width: 100%;
}
/deep/ .el-date-editor {
  position: relative;
}
/deep/ .el-input__prefix {
  display: none;
}

</style>
