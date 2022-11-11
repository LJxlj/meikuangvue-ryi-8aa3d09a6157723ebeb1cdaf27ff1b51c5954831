<template>
  <div style="margin-top: 20px" class="manage">
    
    <!-- dialogVisible:设置是否弹窗 -->
    <el-dialog
      :title="operateType === 'add' ? '新增' : '编辑'"
      :visible.sync="dialogVisible">
      <common-form :formLable="operateFormLable" :form='operateForm' :inline='true' ref="form">
      </common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
        <el-button @click="add()" type="primary">+ 新增</el-button>
        <el-button @click="toggleSelection()" type="primary">- 取消选择</el-button>
      <common-form :formLable="formLable" :form='searchFrom' :inline='true' ref="form">
        <el-button type="primary" @click="getList()">查询</el-button>
      </common-form>

    </div>
    
  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="物料编号" width=100%>
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column prop="name" label="物料名称" width=100%></el-table-column>
    <el-table-column prop="address" label="规格型号" show-overflow-tooltip></el-table-column>
    <el-table-column prop="" label="图纸编号" width=100%></el-table-column>
    <el-table-column prop="" label="库存单位" width=100%></el-table-column>
    <el-table-column prop="" label="转换因子" width=100%></el-table-column>
    <el-table-column prop="" label="安全库存" width=100%></el-table-column>
    <el-table-column prop="" label="物料分类" width=100%></el-table-column>
    <el-table-column prop="" label="采购分类" width=100%></el-table-column>
    <el-table-column prop="" label="领料分类" width=100%></el-table-column>
    <el-table-column prop="" label="重量" width=100%></el-table-column>
    <el-table-column prop="" label="图片名称" width=100%></el-table-column>
    <el-table-column prop="" label="保质期天数" width=100%></el-table-column>
    <el-table-column prop="" label="标准成本" width=100%></el-table-column>
    <el-table-column prop="" label="实际成本" width=100%></el-table-column>
    <el-table-column prop="" label="目标成本" width=100%></el-table-column>
    <el-table-column prop="" label="计划价格" width=100%></el-table-column>
    <el-table-column prop="" label="统计价格" width=100%></el-table-column>
    <el-table-column prop="" label="备注" width=100%></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-dialog
          :title="operateType === 'add' ? '新增' : '编辑'"
          :visible.sync="dialogVisible">
          <common-form :formLable="operateFormLable" :form='operateForm' :inline='true' ref="form">
          </common-form>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm.vue'
export default {
  name: 'materialList',
  // 引用组件
  components: {
    CommonForm
  },
  data() {
    CommonForm
        return {
          tableData: [{
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],//表格数据
          multipleSelection: [],//多选
          dialogVisible: false,//弹窗
          operateType: 'add',//操作类型
          operateFormLable:[{
            model: 'name',
            label: '物料名称',
            type: 'input',
          },{
            model: 'address',
            label: '规格型号', 
            type: 'input',
          },{
            model:'sex',
            label:'性别',
            type:'select',
            opts:[{
              label: '男',
              value:1
            },{
              label:'女',
              value:0
            }]
          },{
            model:'birth',
            label:'出生日期',
            type:'date'
          },{
            model:'addr',
            label:'地址',
            type:'input'
          }],
          operateForm:{
            name:'',
            address:'',
            sex:'',
            addr:'',
            birth:''
          },
          formLable:[{
            model:"keyword",
            label:'',
            type:'input'
          }],
          searchFrom:{
            keyword:''
          }
          
        }
      },

      methods: {
        // 确定
        ok(){
          this.dialogVisible = false
        },
        //  编辑
        handleEdit(index, row) {
          this.operateType = 'edit';
          this.dialogVisible = true;
        },
        // 删除
        handleDelete(index, row) {
          
        },
        // 取消选择
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        // 新增
        add() {
          

          this.operateType = 'add';
          this.dialogVisible = true;
          this.operateForm = {
            name:'',
            address:'',
            sex:'',
            addr:'',
            birth:''
          }
        },
      


        getList(){

        }
        // findAll() {
        //   this.$http.get('http://120.25.0.115:3306/material/materialList/findAll').then((response) => {
        //     alert(this.response)
        //     console.log(response)
        //   })
        // },
        
      },
      // 钩子函数
      mounted() {
        
      }
  }
</script>

<style>

</style>