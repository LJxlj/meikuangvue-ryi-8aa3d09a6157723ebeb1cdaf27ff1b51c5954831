<template>
  <el-dialog title="物料详情" :visible.sync="showDialog" width="60%">
    <!-- @close="handleClose" -->
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

      <el-table
        v-loading="loading"
        ref="multipleTable"
        class="order"
        :data="materialList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="物料编号"
          align="center"
          prop="itemcode"
          width="200%"
        />
        <el-table-column
          label="物料名称"
          align="center"
          prop="itemname"
          width="200%"
        />
        <el-table-column label="规格型号" align="center" prop="model" />
        <el-table-column label="库存单位" align="center" prop="unit" />
        <el-table-column label="物料类型" align="center" prop="materialType">
          <template slot-scope="scope">
            <dict-tag
              :options="dict.type.aaal00"
              :value="scope.row.materialType"
            />
          </template>
        </el-table-column>
        <el-table-column label="领料分类" align="center" prop="getmaterialType">
          <template slot-scope="scope">
            <dict-tag
              :options="dict.type.aaaz00"
              :value="scope.row.getmaterialType"
            />
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getListss"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <!-- 给按钮定义参数 -->
      <el-button @click="handleClose('no')">取 消</el-button>
      <el-button type="primary" @click="handleClose('yes')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { listMaterialEaba00 } from "@/api/project/material";
import { listMaterials } from '@/api/project/material';
export default {
  name: "Material",
  dicts: ["aaaz00", "aaal00", "aaam00", "abc"],
  // 接受父组件传递的值
  props: {
    addOrUpdateVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
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
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        itemcode: null,
        itemname: null,
        inventoryprice: null,
      },
      // formData: {
      //   getmaterialType: 1,
      // },
      rules: {
        getmaterialType: [
          {
            required: true,
            message: "领料类别不能为空",
            trigger: "change",
          },
        ],
      },

      // 控制弹出框显示隐藏
      showDialog: false,
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    
    // 获取物料列表
    getListss(e) {
      this.showDialog = true;
      this.loading = true;
      //物料类别为材料类时，查询领料类别不是设备类的物料
      if (e == 0) {
        this.queryParams.getmaterialType = 1;
      }
      if (e == 1) {
        this.queryParams.getmaterialType = 0;
      }
      console.log(this.queryParams);
      
      listMaterials(this.queryParams).then((response) => {
        console.log(response,"物料列表");
        this.materialList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        itemcode: null,
        itemname: null,
        model: null,
        unit: null,
        materialType: null,
        getmaterialType: null,
        inventoryquant: null,
        inventoryprice: null,
      };
      this.materialInitialStockList = [];
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getListss();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框只选择一条数据
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
      console.log(this.multipleSelection, "1");
      if (selection.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(selection.pop());
      }
    },

    /** 物料库存信息描述序号 */
    // rowMaterialInitialStockIndex({ row, rowIndex }) {
    //   row.index = rowIndex + 1;
    // },

    // 弹出框关闭后触发
    handleClose(val) {
      (this.showDialog = false),
        // 子组件调用父组件方法，并传递参数
        this.$emit("changeShow", val);
    },
  },
};
</script>

<style scoped>
/deep/.order .el-table__header-wrapper .el-checkbox {
  display: none;
}
</style>
