<template>
<div class="inputDeeps">
      <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px">
      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label-width="81px" label="计划部门" prop="deptcode">
            <!-- <el-input v-model="formData.deptcode" :style="{width: '100%'}" :disabled="statuss ? false : 'disabled'"></el-input> -->
            <el-select v-model="formData.deptcode" placeholder="" :disabled="statuss ? false : 'disabled'" :style="{width: '100%'}">
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
          <el-form-item label="计划年月" prop="plandateone">
            <el-input v-model="formData.plandateone" clearable :style="{width: '100%'}" :maxlength="6"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="计划批号" prop="batchidtwo">
            <el-input v-model="formData.batchidtwo" clearable :style="{width: '100%'}" @keyup.enter.native="select" :maxlength="4">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="编制人" prop="planedit">
            <el-input v-model="formData.planedit" placeholder="" clearable :style="{width: '100%'}" disabled>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="编制时间" prop="planeditdate">
            <el-date-picker v-model="formData.planeditdate" type="month" format="yyyy/MM/dd" :style="{width: '100%'}" 
            :disabled="status ? false : 'disabled'"
            prefix-icon=0>
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="79px" label="部门审核" prop="plancheck">
            <el-input v-model="formData.plancheck" placeholder="" clearable :style="{width: '100%'}" disabled>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="审核时间" prop="plancheckdate">
            <!-- <el-input v-model="formData.plancheckdate" placeholder="" clearable :style="{width: '100%'}" readonly>
            </el-input> -->
            <el-date-picker
                type="datetime"
                v-model="formData.plancheckdate"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:100%"
                prefix-icon=0
                disabled
                >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="110px" label="分管领导审批" prop="planconfirm">
            <el-input v-model="formData.planconfirm" placeholder="" clearable :style="{width: '100%'}" disabled>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="审批时间" prop="planconfirmdate">
            <el-input v-model="formData.planconfirmdate" placeholder="" clearable :style="{width: '100%'}" disabled>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="总经理审批" prop="generalconfirm">
            <el-input v-model="formData.generalconfirm" placeholder="" clearable :style="{width: '100%'}" disabled>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="审批时间" prop="generalconfirmdate">
            <el-input v-model="formData.generalconfirmdate" placeholder="" clearable :style="{width: '100%'}" disabled>
            </el-input>
          </el-form-item>
        </el-col>
        </el-row>
<!--      
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">新增</el-menu-item>
  <el-submenu index="2">
    <template slot="title">查询</template>
    <el-menu-item index="2-1">物料查询</el-menu-item>
    <el-menu-item index="2-2" @click="select">查询采购计划</el-menu-item>
  </el-submenu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
</el-menu> -->

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                :disabled="multiples"
                @click="addRow()"
                v-hasPermi="['project:plan:add']"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple"
                @click="handleDelete"
                v-hasPermi="['project:plan:remove']"
                >删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="warning"
                plain
                icon="el-icon-download"
                size="mini"
                @click="handleExport"
                :loading="exportLoading"
                v-hasPermi="['project:plan:export']"
                >导出</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="success"
                plain
                icon="el-icon-upload2"
                size="mini"
                @click="handleImport"
                v-hasPermi="['project:plan:import']"
                >导入</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="success"
                plain
                icon="el-icon-printer"
                size="mini"
                @click="printTable"
                >打印</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="info"
                plain
                icon="el-icon-circle-check"
                size="mini"
                @click="saveTable"
                >保存</el-button>
            </el-col>
            <el-col :span="2">
                <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                @click="addtable"
                >新增计划</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="primary"
                plain
                icon="el-icon-search"
                size="mini"
                @click="select"
                >查询</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="primary"
                plain
                icon="el-icon-search"
                size="mini"
                @click="search"
                >物料查询</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="primary"
                plain
                size="mini"
                @click="plannedAudit"
                v-hasPermi="['project:plan:bumen']"
                >计划审核</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="primary"
                plain
                size="mini"
                @click="plannedfgld"
                v-hasPermi="['project:plan:fenguanlingdao']"
                >分管领导审核</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="primary"
                plain
                size="mini"
                @click="planzjl"
                v-hasPermi="['project:plan:zongjingli']"
                >总经理审批</el-button>
            </el-col>
            
            <el-col :span="1.5">
                <el-button
                type="primary"
                plain
                size="mini"
                @click="shqx"
                v-hasPermi="['project:plan:bumen']"
                >审核取消</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="primary"
                plain
                size="mini"
                @click="shqx1"
                v-hasPermi="['project:plan:fenguanlingdao']"
                >审核取消</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="primary"
                plain
                size="mini"
                @click="shqx2"
                v-hasPermi="['project:plan:zongjingli']"
                >审核取消</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="primary"
                plain
                icon="el-icon-search"
                size="mini"
                @click="dsjhcx"
                >待审计划查询</el-button>
            </el-col>
            <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getPlanListLast"></right-toolbar> -->
            <!-- <right-toolbar @queryTable="getPlanLists"></right-toolbar> -->
        </el-row>

      <div class="inputDeep">
      <el-table
        :data="tableData"
        ref="table"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectRow"
        :cell-style="{padding:'2px'}"
        class="el-table"
        show-summary
        :summary-method="getSummaries"
        :row-class-name="rowClassName"
        @row-dblclick="bccelldblclick"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="序号" type="index" width="50%" align="center"></el-table-column>
        <el-table-column label="计划状态" prop="planstate" align="center" width="80%">
          <template slot-scope="scope">
            <el-select v-model="scope.row.planstate" placeholder="" :disabled="status ? false : 'disabled'">
                <el-option
                  v-for="dict in dict.type.sys_purchaseplan_planstate"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
          </template>
        </el-table-column>
        <el-table-column label="计划批号" prop="batchid" align="center" width="110%">
          <template slot-scope="scope">
          <el-input class="batchid" v-model="scope.row.batchid" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="采购日期" align="center" width="130%">
          <template slot-scope="scope">
            <el-date-picker
                v-model="scope.row.inputdate"
                type="date"
                placeholder="选择日期"
                style="width:100%"
                prefix-icon=0
                :readonly="status ? false : 'readonly'"
                >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="到货日期" align="center" width="130%">
          <template slot-scope="scope">
            <el-date-picker
                v-model="scope.row.outputdate"
                type="date"
                placeholder="选择日期"
                style="width:100%"
                prefix-icon=0
                :readonly="status ? false : 'readonly'"
                >
            </el-date-picker>
          </template>
        </el-table-column>
      <el-table-column label="物料编号" width="200%" align="center" prop="itemcode"> 
          <template slot-scope="scope">
            <el-input class='itemcode' v-model="scope.row.itemcode" @blur="itemcodelist(scope.$index,scope.row)" :readonly="status ? false : 'readonly'">
            <el-button slot="append" icon="el-icon-search" @click="search(scope.$index,scope.row)" :disabled="status ? false : 'disabled'"></el-button>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="物料名称" align="center" width="120%">
          <template slot-scope="scope">
            <el-input class="itemname" v-model="scope.row.itemname" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="规格型号" align="center" width="90%">
          <template slot-scope="scope">
            <el-input class="model" v-model="scope.row.model" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单位" align="center" width="50%">
          <template slot-scope="scope">
            <el-input class="unit" v-model="scope.row.unit" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="采购类别" align="center">
          <template slot-scope="scope">
            <el-input v-for="dict in dict.type.aaam00" v-model="dict.label" :key="dict.value" v-if="scope.row.purchaseType == dict.value" readonly></el-input>
              <el-input v-model="scope.row.purchaseType"  v-if="scope.row.purchaseType == null" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="需求数量" align="center" prop="requirenum" width="120%">
          <template slot-scope="scope">
            <el-input-number :min=null class="requirenum" v-model="scope.row.requirenum" :disabled="status ? false : 'disabled'" :controls="false" :precision="4" :style="{width:'100%'}"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="计划数量" align="center" prop="plannum" width="120%">
          <template slot-scope="scope">
            <el-input-number :min=null class="plannum" v-model="scope.row.plannum" @input="changepurchasenum(scope.row,scope.$index)" :disabled="status ? false : 'disabled'"  :controls="false" :precision="4" :style="{width:'100%'}"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="采购数量" align="center" prop="purchasenum" width="120%">
          <template slot-scope="scope">
            <el-input-number :min=null class="purchasenum" v-model="scope.row.purchasenum" :disabled="status ? false : 'disabled'" :controls="false" :precision="4" :style="{width:'100%'}"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="库存数量" align="center" prop="invnum">
          <template slot-scope="scope">
            <el-input style="text-align-last: right" class="invnum" v-model="scope.row.invnum" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="完成数量" align="center" prop="finishnum">
          <template slot-scope="scope">
            <el-input style="text-align-last: right" class="finishnum" v-model="scope.row.finishnum" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="计划日期" align="center" width="130%">
          <template slot-scope="scope">
            <el-date-picker
                v-model="scope.row.inputdate"
                type="date"
                placeholder="选择日期"
                style="width:100%"
                prefix-icon=0
                :readonly="status ? false : 'readonly'"
                >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="部门审核人" align="center">
          <template slot-scope="scope">
            <el-input type="text" class="plancheck" v-model="scope.row.plancheck" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="部门审核时间" align="center" width="100%">
          <template slot-scope="scope">
            <!-- <el-input type="text" class="plancheckdate" v-model="scope.row.plancheckdate" readonly></el-input> -->
            <el-date-picker
                v-model="scope.row.plancheckdate"
                value-format="yyyy-MM"
                style="width:100%"
                prefix-icon=0
                readonly
                >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="分管领导审核" align="center">
          <template slot-scope="scope">
            <el-input type="text" class="planconfirm" v-model="scope.row.planconfirm" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="审核时间" align="center" width="100%">
          <template slot-scope="scope">
            <!-- <el-input type="text" class="planconfirmdate" v-model="scope.row.planconfirmdate" readonly></el-input> -->
            <el-date-picker
                v-model="scope.row.planconfirmdate"
                value-format="yyyy-MM"
                style="width:100%"
                prefix-icon=0
                readonly
                >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="总经理审批" align="center">
          <template slot-scope="scope">
            <el-input class="generalconfirm" v-model="scope.row.generalconfirm" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="审批时间" align="center" width="100%">
          <template slot-scope="scope">
            <!-- <el-input class="generalconfirmdate" v-model="scope.row.generalconfirmdate" readonly></el-input> -->
            <el-date-picker
                v-model="scope.row.generalconfirmdate"
                value-format="yyyy-MM"
                style="width:100%"
                prefix-icon=0
                readonly
                >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            <el-input class="remark" v-model="scope.row.remark" :readonly="status ? false : 'readonly'"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否生成合同" align="center" prop="contractno">
          <template slot-scope="scope">
            <el-input v-for="dict in dict.type.sys_contractno" v-model="dict.label" :key="dict.value" v-if="scope.row.contractno == dict.value" readonly></el-input>
            <el-input v-model="scope.row.contractno"  v-if="scope.row.contractno == null" readonly></el-input>
          </template>
        </el-table-column>
      </el-table>
       </div>
 </el-form>
 <!-- 物料编号弹框 -->
      <el-dialog :title="title" :visible.sync="bcxxopen" width="1000px" append-to-body>
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
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
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

        <el-table ref="multipleTable" v-loading="loading" :data="materialList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="物料编码" align="center" prop="itemcode" width="200%"/>
        <el-table-column label="物料名称" align="center" prop="itemname" width="200%"/>
        <el-table-column label="规格型号" align="center" prop="model" />
        <el-table-column label="单位" align="center" prop="unit" />
        <el-table-column label="物料分类" align="center" prop="materialType" width="200%">
            <template slot-scope="scope">
            <dict-tag :options="dict.type.aaal00" :value="scope.row.materialType"/>
            </template>
        </el-table-column>
        <el-table-column label="采购分类" align="center" prop="purchaseType">
            <template slot-scope="scope">
            <dict-tag :options="dict.type.aaam00" :value="scope.row.purchaseType"/>
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

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 待审计划查询弹框 -->
      <el-dialog :title="title" :visible.sync="dsjh" width="1500px" append-to-body>
        <el-table v-loading="loading" :data="tableData1" @row-click="dsjhcxList" highlight-current-row @row-dblclick="dsjhcxsj">
      <el-table-column label="计划部门" align="center" prop="deptcode" />
      <el-table-column label="计划批号" align="center" prop="batchid" />
      <el-table-column label="计划日期" align="center" width="130%" prop="inputdate"/>
      <el-table-column label="编制人" align="center" prop="planedit" />
      <el-table-column label="审核人" align="center" prop="plancheck" />
      <el-table-column label="审核日期" align="center" prop="plancheckdate" />
      <el-table-column label="分管领导审批" align="center" prop="planconfirm" />
      <el-table-column label="审批日期" align="center" prop="planconfirmdate" />
      <el-table-column label="总经理批准" align="center" prop="generalconfirm" />
      <el-table-column label="总经理批准日期" align="center" prop="generalconfirmdate" />
    </el-table>

     <pagination
      v-show="totall>0"
      :total="totall"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="dsjhcx"
    />

<el-table :data="tableData2" ref="purchaseOrderArticle">
          <el-table-column label="序号" align="center" type="index" width="50"/>
          <el-table-column label="物料编号" prop="itemcode">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemcode" readonly />
            </template>
          </el-table-column>
           <el-table-column label="物料名称" prop="itemname">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemname" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="unit">
            <template slot-scope="scope">
              <el-input v-model="scope.row.unit" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="计划数量" prop="plannum">
            <template slot-scope="scope">
              <el-input v-model="scope.row.plannum" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="采购数量" prop="purchasenum">
            <template slot-scope="scope">
              <el-input v-model="scope.row.purchasenum" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="库存数量" prop="invnum">
            <template slot-scope="scope">
              <el-input v-model="scope.row.invnum" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="到货数量" prop="finishnum">
            <template slot-scope="scope">
              <el-input v-model="scope.row.finishnum" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="采购日期" prop="inputdate">
            <template slot-scope="scope">
              <el-date-picker clearable v-model="scope.row.inputdate" type="date" value-format="yyyy-MM-dd" :style="{width:'100%'}" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="planstate">
            <template slot-scope="scope">
              <el-input v-model="scope.row.planstate" placeholder="" readonly/>
            </template>
          </el-table-column>
        </el-table>

     

      </el-dialog>

      <!-- 库房弹框 -->
      <el-dialog :title="title" :visible.sync="kufang" width="500px" append-to-body>
        <el-table :data="tableData3" ref="kufang">
           <el-table-column label="物料名称" prop="itemname">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemname" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="所在库房" prop="warehousecode">
            <template slot-scope="scope">
              <el-input v-model="scope.row.warehousecode" placeholder="" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="invnum">
            <template slot-scope="scope">
              <el-input v-model="scope.row.invnum" placeholder="" readonly/>
            </template>
          </el-table-column>
          </el-table>
      </el-dialog>

      <!-- 导入对话框 -->
        <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body :close-on-click-modal="false">
            <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers" :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading" :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                    <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link>
                </div>
                <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFileForm">确 定</el-button>
                <el-button @click="upload.open = false">取 消</el-button>
            </div>
        </el-dialog>

</div>
</template>
<script>

import { addPlan, listPlan, updatePlan, delPlans, exportManagement, listPlanLast, listPlanTotal, updatePlanqx, updatePlans, updatePlanzjl, updatePlanfgld, updatePlanqx1, updatePlanqx2, listPlans, timeToString, addPlans } from '@/api/project/plan';
import { listMaterials,listAllMaterial,listMaterial } from '@/api/project/material';
import { listDept, listDeptp, listDept1 } from "../../../api/system/dept";
import { cxkc } from '@/api/project/eaba00';
import Cookies from 'js-cookie'
import {importTemplate} from '@/api/project/plan'
import { getToken } from "@/utils/auth";
import { getLodop } from "@/api/project/LodopFuncs"; //导入模块
import { userInfo } from 'os';
// import { userInfo } from 'os';
// import { join } from 'path';
// import { listPlanTotal } from '../../../api/project/plan';

export default {
  dicts: ['aaal00', 'aaam00', 'sys_purchaseplan_planstate', 'sys_contractno'],
  components: {
  },
  // 页面跳转到其他页面前触发是否保存提示
  // beforeRouteLeave(to, from, next) {
  //   if (this.tableData.length > 0) {
  //     this.$confirm('当前页面未保存，是否继续?', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       next()
  //     }).catch(() => {
  //       next(false)
  //     })
  //   } else {
  //     next()
  //   }
  // },
  props: [],
  data() {
    const userInfo = JSON.parse(Cookies.get("userInfo"))
    return {
      // 遮罩层
      exportLoading: false,
      formData: {
        deptcode: null,
        plandateone:null,
        batchidtwo: null,
        planedit: null,
        planeditdate: null,
        plancheck: null,
        plancheckdate: null,
        planconfirm: null,
        planconfirmdate: null,
        generalconfirm: null,
        generalconfirmdate: null,
        tableDataList: [],
      },
      // 待审计划弹框
      dsjh: false,
      // 弹出层标题
      title: "",
      statuss:true,
    // 选中数组
    ids: [],
    rules: {
      // 编制时间只能为日期格式
      planeditdate: [
        // 只能为日期格式
        
      ],
    },
    bcxxopen: false,
    // 新增数组
    abc: [],
    computed: {},
    watch: {},
    mounted() {},
    // 导入参数
    upload: {
      // 是否显示弹出层（导入）
      open: false,
      // 弹出层标题（导入）
      title: "",
      // 是否禁用上传
      isUploading: false,
      // 是否更新已经存在的数据
      updateSupport: 0,
      // 设置上传的请求头部
      headers: { Authorization: "Bearer " + getToken() },
      // 上传的地址
      url: process.env.VUE_APP_BASE_API + "/project/plan/importData"
    },
    tableData: [],
    selectlistRow: [],
    selectlistRow1: [],
    rowNum: 1,
    total: 0,
    multiples: false,
    totalll: 0,
    // 双击库房弹框
    kufang: false,
    // showSearch: true,
    // 非多个禁用
    multiple: false,
    // 查询参数
    queryParams: {
      pageNum: 1,
      pageSize: 10,
      itemcode: null,
      itemname: null,
      batchid: null,
      deptId: null,
      deptName: null,
    },
    // 待审计划数组
    tableData1: [],
    // 库存数组
    tableData3: [],
    options:[],
    // 状态值
    status: true,
    // 待审计划数组下面数组
    tableData2: [],
    queryParamsdept: {
      deptcode: userInfo.deptId,
    },
    queryParam:{
      itemcode: null,
      deptId: null,
    },
    totallll: 0,
    totall: 0,
    // 产品（物料管理）表格数据
    materialList: [],
    materialListAll: [],
    // 遮罩层
    loading: false,
    returnedTarget: [],
    // 显示当前月份之前的月份
    pickerOptions: {
      disabledDate(time) {
        return time.getTime() > Date.now();
      }
    },
    }
  },
  created() {
    this.getPlanListLast()
  },
  methods: {
    // 选中行双击事件
    dsjhcxsj(row){
      console.log(row)
      this.formData = row
      this.formData.plandateone = row.batchid.substring(0,6)
      this.formData.batchidtwo = row.batchid.substring(6,10)
      this.tableData = this.tableData2
      this.dsjh = false
    },
    // 待审计划子数据
    dsjhcxList(row){
      this.queryParams.batchid = row.batchid
      listPlan(this.queryParams).then(res => {
        this.tableData2 = res.rows
      })
    },
    // 待审计划查询
    dsjhcx(){
      this.dsjh = true;
      this.title = "待审计划查询";
      this.queryParams.batchid = null
      listPlans(this.queryParams).then(response => {
        this.tableData1 = response.rows;
        this.totall = response.total;
        this.loading = false;
      });
    },
    // 部门审核取消
    shqx() {
      if(this.formData.plancheck == null){
        this.$message.error("还未审核，无需取消")
        return
      }else{
        if(this.formData.planconfirm == "" || this.formData.planconfirm == null){
        this.formData.tableDataList = this.tableData
      updatePlanqx(this.formData).then(res => {
        this.$message({
          message: "取消审核成功",
          type: "success"
        });
        this.getPlanLists()
        this.status = true
        this.multiple = false
      })
      }else{
        this.$message.error('分管领导已审核，您无权取消！')
      }
      }
      
    },
    // 分管领导审核取消
    shqx1() {
      if(this.formData.planconfirm == null){
        this.$message.error("还未审核，无需取消")
        return
      }else{
      if(this.formData.generalconfirm == "" || this.formData.generalconfirm == null){
        this.formData.tableDataList = this.tableData
      updatePlanqx1(this.formData).then(res => {
        this.$message({
          message: "取消审核成功",
          type: "success"
        });
        this.getPlanLists()
        })
      }else{
          this.$message.error('总经理已审核，您无权取消！')
      }
      }
      
    },
    // 总经理审核取消
    shqx2() {
      if(this.formData.generalconfirm == null){
        this.$message.error("还未审核，无需取消")
        return
      }else{
      this.formData.tableDataList = this.tableData
      updatePlanqx2(this.formData).then(res => {
        this.$message({
          message: "取消审核成功",
          type: "success"
        });
        this.getPlanLists()
      })
    }
    },
    // 部门计划审核
    plannedAudit(){
      if(this.formData.plancheck != null && this.formData.plancheck != '') {
        this.$message.error('该计划已审核，请勿重复审核')
        return;
      }
      this.formData.tableDataList = this.tableData
        updatePlans(this.formData).then(res => {
        this.$message.success('审核成功')
        this.getPlanLists()
        this.status = true
        this.multiple = false
        })
    },
    // 总经理审核
    planzjl(){
      if(this.formData.planconfirm == "" || this.formData.planconfirm == null){
        this.$message.error("分管领导还未审核，不能提前审核")
        return
      }else{
        this.formData.tableDataList = this.tableData
      if( this.formData.generalconfirm == null || this.formData.generalconfirm == ''){
        updatePlanzjl(this.formData).then(res => {
        this.$message.success('审核成功')
        this.getPlanLists()
      })
      } else {
        this.$message.error('该计划已审核，请勿重复审核')
      }
      }
      
    },
    // 分管领导计划审核
    plannedfgld(){
      if(this.formData.plancheck == "" || this.formData.plancheck == null){
        this.$message.error("材料部门主管还未审核，不能提前审核")
        return
      }else{
        this.formData.tableDataList = this.tableData
      if(this.formData.planconfirm == null || this.formData.planconfirm == ''){
        updatePlanfgld(this.formData).then(res => {
        this.$message.success('审核成功')
        this.getPlanLists()
      })
      } else {
        this.$message.error('该计划已审核，请勿重复审核')
      }
      }
      
    },
    // 打印采购计划
    printTable(){
        let LODOP = getLodop(); //调用getLodop获取LODOP对象  
          LODOP.PRINT_INITA(7,8,800,1200,"");
      LODOP.SET_PRINT_PAGESIZE(0,2100,2970,"");
      LODOP.ADD_PRINT_TEXT(38,178,441,35,"山西华宁焦煤有限责任公司采购计划表");
      LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",17);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.SET_PRINT_STYLEA(0,"Horient",2);
      LODOP.ADD_PRINT_TEXT(80,46,100,25,"计划部门:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(80,126,120,25,this.formData.deptcode);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_LINE(96,114,95,244,0,1);
      LODOP.ADD_PRINT_TEXT(80,252,100,25,"计划批号:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(80,332,100,25,this.tableData[0].batchid);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_LINE(96,318,95,428,0,1);
      LODOP.ADD_PRINT_TEXT(80,434,70,25,"编制人:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(80,514,70,25,this.formData.planedit);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_LINE(96,486,95,576,0,1);
      LODOP.ADD_PRINT_TEXT(80,580,100,25,"编制日期:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(80,660,100,25,this.formData.planeditdate);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_LINE(96,646,95,746,0,1);
      // 长方形
      LODOP.ADD_PRINT_RECT(107,46,701,756,0,1);
      // for(let i = 0,j = 128,h = 1;i < this.tableData.length;i++,j +=18,h++){
        
      // LODOP.ADD_PRINT_LINE(126,46,125,747,0,1);
      // LODOP.ADD_PRINT_TEXT(j,60,100,25,h);
      // LODOP.ADD_PRINT_TEXT(j,85,100,25,this.tableData[i].itemcode);
      // LODOP.ADD_PRINT_TEXT(j,217,100,25,this.tableData[i].itemname);
      // LODOP.ADD_PRINT_TEXT(j,319,100,25,this.tableData[i].model);
      // LODOP.ADD_PRINT_TEXT(j,415,100,25,this.tableData[i].unit);
      // LODOP.ADD_PRINT_TEXT(j,455,66,25,this.tableData[i].plannum);
      // LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
      // LODOP.ADD_PRINT_TEXT(j,525,66,25,this.tableData[i].invnum);
      // LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
      // LODOP.ADD_PRINT_TEXT(j,595,66,25,this.tableData[i].remark);
      // if(h == 41){
      //   j = 128;
      //     LODOP.NewPageA();
      //   }
      // }
      for(let z = 1,j = 128,x = 144,y = 143;z<= 41;z++,x+=18,y+=18){
        LODOP.ADD_PRINT_LINE(x,46,y,747,0,1);
      }
      LODOP.ADD_PRINT_TEXT(848,60,100,25,"合计");
      // 求计划数量列和
      let plannum = 0;
      let invnum = 0;
      this.tableData.forEach(item => {
        plannum += item.plannum;
        invnum += parseInt(item.invnum);
      });
      LODOP.ADD_PRINT_TEXT(848,455,66,25,plannum);
      LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
      LODOP.ADD_PRINT_TEXT(848,525,66,25,invnum);
      LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
      LODOP.ADD_PRINT_LINE(845,83,107,84,0,1);
      LODOP.ADD_PRINT_LINE(845,213,107,214,0,1);
      LODOP.ADD_PRINT_LINE(845,317,107,318,0,1);
      LODOP.ADD_PRINT_LINE(845,413,107,414,0,1);
      LODOP.ADD_PRINT_LINE(863,453,107,454,0,1);
      LODOP.ADD_PRINT_LINE(863,523,107,524,0,1);
      LODOP.ADD_PRINT_LINE(863,593,107,594,0,1);
      LODOP.ADD_PRINT_TEXT(109,50,46,25,"序号");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,118,75,25,"物料编码");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,236,78,25,"物料名称");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,336,74,25,"规格型号");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,419,43,25,"单位");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,458,74,25,"计划数量");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,529,76,25,"库存数量");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,650,44,25,"备注");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(883,56,100,25,"总经理批准:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.ADD_PRINT_TEXT(883,160,100,25,this.tableData[0].generalconfirm);
      LODOP.ADD_PRINT_LINE(899,137,898,247,0,1);
      LODOP.ADD_PRINT_TEXT(883,278,110,25,"分管领导审批:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.ADD_PRINT_TEXT(883,392,110,25,this.tableData[0].planconfirm);
      LODOP.ADD_PRINT_LINE(899,373,898,483,0,1);
      LODOP.ADD_PRINT_TEXT(883,514,80,25,"部门审核:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.ADD_PRINT_TEXT(883,598,80,25,this.tableData[0].plancheck);
      LODOP.ADD_PRINT_LINE(899,578,898,688,0,1);
      LODOP.ADD_PRINT_TEXT(927,71,85,25,"批准日期:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.ADD_PRINT_TEXT(927,137,200,25,this.tableData[0].generalconfirmdate);
      LODOP.ADD_PRINT_LINE(943,138,942,248,0,1);
      LODOP.ADD_PRINT_TEXT(927,305,85,25,"审批日期:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.ADD_PRINT_TEXT(927,371,200,25,this.tableData[0].planconfirmdate);
      LODOP.ADD_PRINT_LINE(943,372,942,482,0,1);
      LODOP.ADD_PRINT_TEXT(927,514,84,25,"审核日期:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.ADD_PRINT_TEXT(927,580,200,25,this.tableData[0].plancheckdate);
      LODOP.ADD_PRINT_LINE(943,578,942,688,0,1);
      LODOP.ADD_PRINT_TEXT(1028,49,157,25,"山西华宁焦煤有限责任公司");
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.ADD_PRINT_TEXT(1028,683,75,25,"第#页/共&页");
      LODOP.SET_PRINT_STYLEA(0,"ItemType",2);
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      
      for(let i = 0,j = 128,k = 60,a = 85,b = 217,c = 319,d = 415,e = 455,f = 525,g = 595,h = 1,s = 40;i < this.tableData.length;i++,j +=18,h++){
      LODOP.ADD_PRINT_LINE(126,46,125,747,0,1);
      LODOP.ADD_PRINT_TEXT(j,k,100,25,h);
      LODOP.ADD_PRINT_TEXT(j,a,100,25,this.tableData[i].itemcode);
      LODOP.ADD_PRINT_TEXT(j,b,100,25,this.tableData[i].itemname);
      LODOP.ADD_PRINT_TEXT(j,c,100,25,this.tableData[i].model);
      LODOP.ADD_PRINT_TEXT(j,d,100,25,this.tableData[i].unit);
      LODOP.ADD_PRINT_TEXT(j,e,66,25,this.tableData[i].plannum);
      LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
      LODOP.ADD_PRINT_TEXT(j,f,66,25,this.tableData[i].invnum);
      LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
      LODOP.ADD_PRINT_TEXT(j,g,66,25,this.tableData[i].remark);
      if(h == s){
        s = s * 2;
          LODOP.NewPageA();
           j = 110;
      LODOP.ADD_PRINT_TEXT(38,178,441,35,"山西华宁焦煤有限责任公司采购计划表");
      LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",17);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.SET_PRINT_STYLEA(0,"Horient",2);
      LODOP.ADD_PRINT_TEXT(80,46,100,25,"计划部门:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(80,126,120,25,this.formData.deptcode);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_LINE(96,114,95,244,0,1);
      LODOP.ADD_PRINT_TEXT(80,252,100,25,"计划批号:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(80,332,100,25,this.tableData[0].batchid);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_LINE(96,318,95,428,0,1);
      LODOP.ADD_PRINT_TEXT(80,434,70,25,"编制人:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(80,514,70,25,this.formData.planedit);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_LINE(96,486,95,576,0,1);
      LODOP.ADD_PRINT_TEXT(80,580,100,25,"编制日期:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(80,660,100,25,this.formData.planeditdate);
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_LINE(96,646,95,746,0,1);
      // 长方形
      LODOP.ADD_PRINT_RECT(107,46,701,756,0,1);
      for(let z = 1,x = 144,y = 143;z<= 41;z++,x+=18,y+=18){
        LODOP.ADD_PRINT_LINE(x,46,y,747,0,1);
      }
      LODOP.ADD_PRINT_TEXT(848,60,100,25,"合计");
      LODOP.ADD_PRINT_TEXT(848,455,66,25,plannum);
      LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
      LODOP.ADD_PRINT_TEXT(848,525,66,25,invnum);
      LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
      LODOP.ADD_PRINT_LINE(845,83,107,84,0,1);
      LODOP.ADD_PRINT_LINE(845,213,107,214,0,1);
      LODOP.ADD_PRINT_LINE(845,317,107,318,0,1);
      LODOP.ADD_PRINT_LINE(845,413,107,414,0,1);
      LODOP.ADD_PRINT_LINE(863,453,107,454,0,1);
      LODOP.ADD_PRINT_LINE(863,523,107,524,0,1);
      LODOP.ADD_PRINT_LINE(863,593,107,594,0,1);
      LODOP.ADD_PRINT_TEXT(109,50,46,25,"序号");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,118,75,25,"物料编码");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,236,78,25,"物料名称");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,336,74,25,"规格型号");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,419,43,25,"单位");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,458,74,25,"计划数量");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,529,76,25,"库存数量");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(109,650,44,25,"备注");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"Bold",1);
      LODOP.ADD_PRINT_TEXT(883,56,100,25,"总经理批准:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.ADD_PRINT_TEXT(883,160,100,25,this.tableData[0].generalconfirm);
      LODOP.ADD_PRINT_LINE(899,137,898,247,0,1);
      LODOP.ADD_PRINT_TEXT(883,278,110,25,"分管领导审批:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.ADD_PRINT_TEXT(883,392,110,25,this.tableData[0].planconfirm);
      LODOP.ADD_PRINT_LINE(899,373,898,483,0,1);
      LODOP.ADD_PRINT_TEXT(883,514,80,25,"部门审核:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.ADD_PRINT_TEXT(883,598,80,25,this.tableData[0].plancheck);
      LODOP.ADD_PRINT_LINE(899,578,898,688,0,1);
      LODOP.ADD_PRINT_TEXT(927,71,85,25,"批准日期:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.ADD_PRINT_TEXT(927,137,200,25,this.tableData[0].generalconfirmdate);
      LODOP.ADD_PRINT_LINE(943,138,942,248,0,1);
      LODOP.ADD_PRINT_TEXT(927,305,85,25,"审批日期:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.ADD_PRINT_TEXT(927,371,200,25,this.tableData[0].planconfirmdate);
      LODOP.ADD_PRINT_LINE(943,372,942,482,0,1);
      LODOP.ADD_PRINT_TEXT(927,514,84,25,"审核日期:");
      LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
      LODOP.ADD_PRINT_TEXT(927,580,200,25,this.tableData[0].plancheckdate);
      LODOP.ADD_PRINT_LINE(943,578,942,688,0,1);
      LODOP.ADD_PRINT_TEXT(1028,49,157,25,"山西华宁焦煤有限责任公司");
      LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000A0");
        }
      }
      
      LODOP.PREVIEW(); //预览(预览打印无脚标)
        // LODOP.PRINT(); //打印
      
    },
    // 查询采购计划最后一条数据
    getPlanListLast(){
      this.loading = true;
      listPlanLast(this.queryParams).then(response => {
        console.log(response,"最后一条数据")
        listDeptp(this.queryParamsdept).then(response => {
          console.log(response.data)
          this.options = response.data.map(item => {
            return {
              value: item.deptId,
              label: item.deptName,
            }
          })
        })
        // this.tableData = response.rows;
        this.formData.planedit = response.rows[0].planedit;
        this.formData.plandateone = response.rows[0].batchid.substring(0,6)
        this.formData.batchidtwo = response.rows[0].batchid.substring(6,10)
        this.formData.planeditdate = response.rows[0].planeditdate;
        this.formData.plancheck = response.rows[0].plancheck;
        this.formData.deptcode = response.rows[0].deptcode
        this.totall = response.total;
        this.queryParams.batchid = response.rows[0].batchid;
        this.getPlanLists();
        this.loading = false;
      //   const userInfo = JSON.parse(Cookies.get("userInfo"))
      //   if(this.formData.planedit != userInfo.userName){
      //     this.multiple = true;
      //     this.multiples = true;
      //   }else if(this.formData.plancheck != null){
      //   this.status = false;
      //   this.multiples = true
      // }
        
      });
    },
    // 采购数量随计划数量变化的方法
    changepurchasenum(row, index) {
      this.tableData[index].purchasenum = row.plannum  
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
        else if (index === 11 || index === 12 || index === 13 || index === 14 || index === 15) {
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
    // 查询按钮
    select(){
      this.formData.plancheck = '';
      if(this.formData.batchidtwo == null || this.formData.batchidtwo == ''){
        this.$message.error('计划批号不能为空')
        return;
      }
      if(this.formData.batchidtwo.length != 4){
        this.$message.error('计划批号输入错误')
        return;
      }
      if (this.formData.plandateone == "" || this.formData.plandateone == null) {
        this.$message.error("计划年月不能为空，请输入计划年月");
        return
      }
      // 判断计划年月是否为6位数字
      if (this.formData.plandateone.length != 6) {
        this.$message.error("计划年月格式错误，请重新输入");
        return true
      }
      // 判断第五位只能是0或1，第五位是0的时候第六位只能是0-9。第五位是1的时候，第六位只能是1-2
      if (this.formData.plandateone.length == 6) {
        if (this.formData.plandateone.substring(4, 5) == 0) {
          if (
            this.formData.plandateone.substring(5, 6) > 9 ||
            this.formData.plandateone.substring(5, 6) < 1
          ) {
            this.$message.error("请输入正确的年月");
            return true;
          }
        } else if (this.formData.plandateone.substring(4, 5) == 1) {
          if (this.formData.plandateone.substring(5, 6) > 2) {
            this.$message.error("请输入正确年月");
            return true;
          }
        } else {
          this.$message.error("请输入正确的年月");
          return true;
        }
      }
      this.queryParams.batchid = this.formData.plandateone + this.formData.batchidtwo
      this.getPlanLists()
    },
    // 重置表单
    rest(){
      this.formData={
        plancheck:null,
        plancheckdate:null,
        planconfirm:null,
        planconfirmdate:null,
        generalconfirm:null,
        generalconfirmdate:null,
      }
      this.tableData=[]
    },
    // 新增计划按钮
    addtable(){
      const userInfo = JSON.parse(Cookies.get("userInfo"))
      this.status = true;
      this.multiples = false
      this.loading = true;
      listPlanTotal(this.queryParams).then(response => {
        this.tableData = [];
        this.formData.planedit = userInfo.userName;
        this.formData.deptcode = userInfo.dept.deptName;
        this.formData.batchidtwo = response.rows[0].batchid
        this.formData.plancheck = null
        this.formData.plancheckdate = null
        this.formData.planconfirm = null
        this.formData.planconfirmdate = null
        this.formData.generalconfirm = null
        this.formData.generalconfirmdate = null
        this.formData.planeditdate = timeToString(new Date())
        this.loading = false;
      });
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      importTemplate().then(response => {
        this.download(response.msg);
      });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.tableData = response.data
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    // 物料编号失去焦点事件
    itemcodelist(index,row) {
      this.queryParam.itemcode = row.itemcode
      listAllMaterial(this.queryParam).then(response => {
        this.materialListNo = response;
        console.log(this.materialListNo)
        if(this.materialListNo.length == 0){
          this.$message.error('物料编号不存在,请重新输入')
          this.tableData[index].itemcode = ''
          return;
          }
          this.materialListNo.forEach(item => {
          if (item.itemcode == this.tableData[index].itemcode) {
            this.tableData[index].itemname = item.itemname;
            this.tableData[index].unit = item.unit;
            this.tableData[index].model = item.model;
        
            this.tableData[index].purchaseType = item.purchaseType;

            this.tableData[index].invnum = item.inventoryquant;
          }
        });        
      });
    },
    // 选择文件事件
    clickFile() {
      this.$refs.file.dispatchEvent(new MouseEvent('click'))
    },
    // 导入点击事件
    importPlan() {
      this.importDialogVisible=true;
    },
    getPlanLists(){
      this.loading = true;
      this.queryParams.batchid = this.formData.plandateone + this.formData.batchidtwo
      listPlan(this.queryParams).then(response => {
        console.log(response)
        this.tableData = response.rows;
        this.formData.planedit = response.rows[0].planedit;
        this.formData.planeditdate = response.rows[0].planeditdate;
        this.formData.plancheck = response.rows[0].plancheck;
        this.formData.plancheckdate = response.rows[0].plancheckdate;
        this.formData.generalconfirm = response.rows[0].generalconfirm;
        this.formData.generalconfirmdate = response.rows[0].generalconfirmdate;
        this.formData.planconfirm = response.rows[0].planconfirm;
        this.formData.planconfirmdate = response.rows[0].planconfirmdate;
        this.formData.deptcode = response.rows[0].deptcode
        this.totall = response.total;
        this.loading = false;
        const userInfo = JSON.parse(Cookies.get("userInfo"))
        if(this.formData.planedit != userInfo.userName){
          this.multiple = true;
          this.multiples = true;
          this.status = false;
          return;
        }else{
          this.multiples = false;
          this.multiple = false;
          this.status = true;
        }
        if(this.formData.plancheck != null){
        this.status = false;
        this.multiples = true
      }
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.queryParams.batchid = this.formData.plandateone+this.formData.batchidtwo
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有采购计划数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportManagement(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        })
    },
    /** 保存按钮操作 */
    saveTable(){
      this.tableData = this.tableData.filter(item => item.itemcode != null);
      for(let i = 0;i<this.tableData.length;i++){
        if(this.tableData[i].requirenum <= 0 || this.tableData[i].requirenum == ''){
          this.$message.error('需求数量不能为负数或空(包括0在内)')
          return;
        }else if(this.tableData[i].plannum <= 0 || this.tableData[i].plannum == ''){
          this.$message.error('计划数量不能为负数或空(包括0在内)')
          return;
        }
      }
      console.log(typeof(this.formData.deptcode))
      if(typeof(this.formData.deptcode) == 'number'){
        this.queryParams.deptId = this.formData.deptcode
        console.log(this.formData.deptcode)
      listDept(this.queryParams).then(response => {
        console.log(response)
          this.formData.deptcode = response.data[0].deptId
        
        // 过滤空行
      
      this.tableData.forEach(item => {
        item.deptcode = this.formData.deptcode;
        item.planedit = this.formData.planedit;
        item.planeditdate = this.formData.planeditdate;
      });
      for(let i = 0;i<this.tableData.length;i++){
        if(this.tableData[i].id == undefined){
          this.abc.push(this.tableData[i])
        }
      }
      if(this.abc.length != 0){
        if(this.tableData[0].id == undefined){
          addPlans(this.tableData).then(response =>{
              this.loading = true;
            listDeptp(this.queryParamsdept).then(response => {
              this.options = response.data.map(item => {
                return {
                  value: item.deptId,
                  label: item.deptName,
                }
              })
            })
            this.formData.plandateone = response.rows[0].batchid.substring(0,6)
            this.formData.batchidtwo = response.rows[0].batchid.substring(6,10)
            this.formData.planeditdate = response.rows[0].planeditdate;
            this.formData.plancheck = response.rows[0].plancheck;
            this.formData.deptcode = response.rows[0].deptcode
            this.totall = response.total;
            this.queryParams.batchid = response.rows[0].batchid;
            this.getPlanLists();
            this.loading = false;
            })
            // this.getPlanListLast();
            return;
        }else{
          addPlan(this.abc).then(response =>{
        });
        this.getPlanLists();
        }
        
      }else{
        updatePlan(this.tableData).then(response => {
          this.getPlanLists();
        });
      }
      // this.getPlanLists();
      })
      
      this.$modal.msgSuccess("保存成功");
      }else if(typeof(this.formData.deptcode) == 'string'){
        this.queryParams.deptName = this.formData.deptcode
        console.log(this.formData.deptcode)
      listDept(this.queryParams).then(response => {
        console.log(response)
          this.formData.deptcode = response.data[0].deptId
        
        // 过滤空行
      this.tableData = this.tableData.filter(item => item.itemcode != null);
      this.tableData.forEach(item => {
        item.deptcode = this.formData.deptcode;
        item.planedit = this.formData.planedit;
        item.planeditdate = this.formData.planeditdate;
      });
      for(let i = 0;i<this.tableData.length;i++){
        if(this.tableData[i].id == undefined){
          this.abc.push(this.tableData[i])
          // if(this.tableData[0].id == undefined){
          //   addPlans(this.tableData).then(response =>{

          //   })
          //   return;
          // }else{
          //   addPlan(this.tableData[i]).then(response => {
          //   // this.getPlanLists();
          // });
          // this.getPlanLists();
          // }
        }
        // else{
        //   updatePlan(this.tableData[i]).then(response => {
        //     // this.getPlanLists();
        //   });
        // }
        
      }
      if(this.abc.length != 0){
        if(this.tableData[0].id == undefined){
          addPlans(this.tableData).then(response =>{
            this.loading = true;
            listDeptp(this.queryParamsdept).then(response => {
              this.options = response.data.map(item => {
                return {
                  value: item.deptId,
                  label: item.deptName,
                }
              })
            })
            this.formData.plandateone = response.rows[0].batchid.substring(0,6)
            this.formData.batchidtwo = response.rows[0].batchid.substring(6,10)
            this.formData.planeditdate = response.rows[0].planeditdate;
            this.formData.plancheck = response.rows[0].plancheck;
            this.formData.deptcode = response.rows[0].deptcode
            this.totall = response.total;
            this.queryParams.batchid = response.rows[0].batchid;
            this.getPlanLists();
            this.loading = false;

            })
            // this.getPlanListLast();
            return;
        }else{
          addPlan(this.abc).then(response =>{
        });
        this.getPlanLists();
        }
        
      }else{
        updatePlan(this.tableData).then(response => {
          this.getPlanLists();
        });
      }
      
      })
      
      this.$modal.msgSuccess("保存成功");
      }
        
      
      
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
    // 物料编号点击事件
    search(index, row) {
      this.bcxxopen = true;
      this.title = "物料编号";
      this.nowRow = row;
      this.nowindex = index;
      this.getList();
    },
    // 确定按钮
    submitForm(){
      for(let i =0;i<this.tableData.length;i++){
        if(this.tableData[i].itemcode == this.multipleSelection[0].itemcode){
          this.$message.error("同一个采购计划里面物料编号不能重复");
          return false;
        }
        }
        console.log(this.multipleSelection[0])
        this.queryParam.itemcode = this.multipleSelection[0].itemcode;
        listMaterials(this.queryParam).then(response => {
          console.log(response)
          this.tableData[this.nowindex].itemcode = response.rows[0].itemcode;
          this.tableData[this.nowindex].itemname = response.rows[0].itemname;
          this.tableData[this.nowindex].model = response.rows[0].model;
          this.tableData[this.nowindex].unit = response.rows[0].unit;
          this.tableData[this.nowindex].materialType = response.rows[0].materialType;
          this.tableData[this.nowindex].purchaseType = response.rows[0].purchaseType;
          this.tableData[this.nowindex].invnum = response.rows[0].inventoryquant;
          this.bcxxopen = false;
        })
    },
    // 取消按钮
    cancel() {
      this.bcxxopen = false;
    },
    //单元格双击
    bccelldblclick(row, column, cell, event) {
          this.kufang = true;
          this.title = "物料库存情况";
          this.queryParams.itemcode = row.itemcode;
          cxkc(this.queryParams).then(response => {
            this.tableData3 = response.rows;
            response.rows.forEach(item => {
              this.tableData3.forEach(item2 => {
                  item2.invnum = item.inventoryquant;
              })
            });
          })
    },
    /** 查询产品（物料管理）列表 */
    getList() {
        this.loading = true;
        listMaterials(this.queryParams).then(response => {
        this.materialList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 查询所有产品（物料管理）列表
    // getListAll() {
    //   this.loading = true;
    //   listAllMaterial(this.queryParam).then(response => {
    //     this.materialListNo = response;
    //     this.loading = false;
    //   });
    // },
    /** 子表序号 */
    rowClassName({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow1 = val;
      if(this.formData.plancheck != null){
        return;
        }
        val.forEach(item => {
          if(item.id == undefined){
            this.selectlistRow = val.map(item => item.index)
            // this.multiple = !val.length
          }else{
            this.selectlistRow = val.map(item => item.id)
            // this.multiple = !val.length
          }
        })
          // this.selectlistRow = val.map(item => item.id)
          // this.selectlistRow = val.map(item => item.index,item => item.id)
          // this.multiple = !val.length
        
    },
    // dialog弹框选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (val.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(val.pop());
      }
    },
    // 增加行
    addRow() {
      var list = {
        rowNum: this.rowNum,
        remark: null,
        planstate: "0",
        batchid: null,
        inputdate: null,
        outputdate: null,
        itemcode: null,
        itemname: null,
        requirenum: null,
        plannum: null,
        purchasenum: null,
        invnum: null,
        finishnum: null,
        deptcode: null,
        planedit: null,
        plandate: null,
        plancheck: null,
        plancheckdate: null,
        planconfirm: null,
        planconfirmdate: null,
        generalconfirm: null,
        generalconfirmdate: null,
        contractno: "1",
        invnum: null
      };
      this.tableData.push(list);
      this.rowNum += 1;
      // inputdate,outputdate和plandate默认为当前年月日
      this.tableData[this.tableData.length - 1].inputdate = new Date();
      this.tableData[this.tableData.length - 1].outputdate = new Date();
      this.tableData[this.tableData.length - 1].plandate = new Date();
      // 将formData中plandateone和batchidtwo数据合并到batchid中
      this.tableData[this.tableData.length - 1].batchid = this.formData.plandateone + this.formData.batchidtwo;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
        if(this.formData.plancheck != null || this.formData.plancheck != ""){
          // 将删除按钮禁用
          this.multiple = true;
          this.multiples = true;
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.selectlistRow.forEach(item => {
          this.tableData.forEach(item1 => {
            if(item == undefined){
              const purchaseOrderArticleList = this.tableData;
              const checkedPurchaseOrderArticle = this.selectlistRow;
              this.tableData = purchaseOrderArticleList.filter(function(item) {
               return checkedPurchaseOrderArticle.indexOf(item.index) == -1
              });
              this.getPlanLists();
              return
            }
            if (item == item1.id) {
              // const ids = item1.id
              delPlans(item1.id).then(response => {
                
              });
              this.getPlanLists();
            }else{
              const purchaseOrderArticleList = this.tableData;
              const checkedPurchaseOrderArticle = this.selectlistRow;
              this.tableData = purchaseOrderArticleList.filter(function(item) {
               return checkedPurchaseOrderArticle.indexOf(item.index) == -1
              });
            }
          })
        });
        this.$modal.msgSuccess("删除成功");
        this.getPlanLists();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
        //   delPlan(ids).then(response => {
        //   this.$modal.msgSuccess("删除成功");
        //   this.getPlanLists();
        // });
      // console.log(this.selectlistRow, "删除的数据");
      //   const purchaseOrderArticleList = this.tableData;
      //   const checkedPurchaseOrderArticle = this.selectlistRow;
      //   this.tableData = purchaseOrderArticleList.filter(function(item) {
      //     return checkedPurchaseOrderArticle.indexOf(item.index) == -1
      //   });
      //   this.multiples = false
  // const ids = row.id || this.selectlistRow;
  //     this.$modal.confirm('是否确认删除采购计划编号为"' + ids + '"的数据项？').then(function() {
  //       return delPlan(ids);
  //     }).then(() => {
  //       this.getPlanLists();
  //       this.$modal.msgSuccess("删除成功");
  //     }).catch(() => {});
    }
    },
  
}

</script>
<style scoped>
/* 利用穿透，设置input边框隐藏 */
  .inputDeep>>>.el-input__inner {
    padding: 0 4px;
    background-color: white;
    color: black;
  }
  .inputDeeps>>>.el-input__inner {
    padding: 0 4px;
    background-color: white;
    color: black;
  }
  .inputDeeps{
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
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
/* .el-table /deep/ .purchaseType{
  border: 1px solid black;

} */
</style>
