<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash; <el-dialog title="凭证明细" :visible.sync="showDialog" width="60%" @close="handleClose" center> &ndash;&gt;-->
<!--    <br />-->
<!--    <el-table v-loading="loading" :data="tableData" ref="table" :summary-method="getSummaries" show-summary highlight-current-row-->
<!--              @current-change="handleCurrentChangeDetail" class="el-tabletest">-->
<!--      <af-table-column label="物料编码" align="center" prop="itemcode" />-->
<!--      <af-table-column label="物料名称" align="center" prop="itemname" />-->
<!--      <af-table-column label="规格型号" align="center" prop="model" />-->
<!--      <af-table-column label="库存单位" align="center" prop="unit" />-->
<!--      <af-table-column label="数量" align="center" prop="saleunitquant"/>-->
<!--&lt;!&ndash;      购销单位数量saleunitquant，发生数量businessquant，实际价格realprice&ndash;&gt;-->
<!--      <af-table-column label="单价" align="center" prop="inventoryprice" />-->
<!--      <af-table-column label="金额" align="center" prop="businessmoney" />-->
<!--      <af-table-column label="本笔后库存数量" align="center" prop="currentinvquant" />-->
<!--      <af-table-column label="本笔后库存金额" align="center" prop="currentinvmoney"  />-->
<!--      <af-table-column label="摘要" align="center" prop="summary" />-->
<!--    </el-table>-->
<!--    &lt;!&ndash; </el-dialog> &ndash;&gt;-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import { getEabcVO, getHistoryAccountDetailList } from '../../../api/project/voucher';-->
<!--import {selectDetailFromEaba00} from '../../../api/project/voucher';-->

<!--export default {-->
<!--  // 列表-->
<!--  data() {-->
<!--    return {-->
<!--      loading: true,-->
<!--      tableData: [],-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    //合计-->
<!--    //计算tableData的5，7，8列的和-->
<!--    getSummaries(param) {-->
<!--      const { columns, data } = param-->
<!--      const sums = []-->
<!--      columns.forEach((column, index) => {-->
<!--        if (index === 0) {-->
<!--          sums[index] = '合计'-->
<!--        }-->
<!--        // 指定一个或者多个你需要计算的列-->
<!--        else if (index === 4 || index === 6 || index === 8) {-->
<!--          const values = data.map(item => Number(item[column.property]))-->
<!--          if (!values.every(value => isNaN(value))) {-->
<!--            sums[index] = values.reduce((prev, curr) => {-->
<!--              const value = Number(curr)-->
<!--              if (!isNaN(value)) {-->
<!--                // 保存了两位小数点-->
<!--                return Math.floor((prev + curr) * 100) / 100;-->
<!--              } else {-->
<!--                // 保存了两位小数点-->
<!--                return Math.floor(prev * 100) / 100;-->
<!--              }-->
<!--            }, 0)-->
<!--          } else {-->
<!--            sums[index] = ''-->
<!--          }-->
<!--        } else {-->
<!--          sums[index] = ''-->
<!--        }-->
<!--      })-->
<!--      if(this.tableData[0].saleunitquant!=null){-->
<!--        sums[4] = parseFloat(sums[4]).toFixed(2);-->
<!--        sums[6] = parseFloat(sums[6]).toFixed(2);-->
<!--        sums[8] = parseFloat(sums[8]).toFixed(2);-->
<!--      }-->


<!--      return sums-->
<!--    },-->
<!--    handleCurrentChangeDetail(val) {-->
<!--      this.currentRow1 = val;-->
<!--      console.log(this.currentRow1, 'this.currentRow1');-->
<!--      selectDetailFromEaba00(this.currentRow1.itemcode,this.currentRow1.inventoryprice).then(res =>{-->
<!--        console.log(res, 'reseaba00');-->
<!--        this.ruleForm1.itemcode = res.itemcode;-->
<!--        this.ruleForm1.itemname = res.itemname;-->
<!--        this.ruleForm1.inventoryprice = res.inventoryprice;-->
<!--        this.ruleForm1.inventorymoney = res.inventorymoney;-->
<!--        this.ruleForm1.currentinvquant = res.currentinvquant;-->
<!--        this.ruleForm1.allocation = res.allocation;-->
<!--        this.ruleForm1.inputquant = res.inputquant;-->
<!--        this.ruleForm1.totalinputquant = res.totalinputquant;-->
<!--        this.ruleForm1.inputmoney = res.inputmoney;-->
<!--        this.ruleForm1.totalinputmoney = res.totalinputmoney;-->
<!--        this.ruleForm1.outputquant = res.outputquant;-->
<!--        this.ruleForm1.totaloutputquant = res.totaloutputquant;-->
<!--        this.ruleForm1.outputmoney = res.outputmoney;-->
<!--        this.ruleForm1.totaloutputmoney = res.totaloutputmoney;-->
<!--      });-->

<!--    },-->
<!--    getList(row) {-->
<!--      this.loading = true;-->
<!--      getHistoryAccountDetailList(row).then(res => {-->
<!--        this.loading = false;-->
<!--        this.tableData = res;-->
<!--      }).catch(() => {-->
<!--        this.loading = false;-->
<!--      })-->
<!--    },-->
<!--    getList1(row) {-->
<!--      this.loading = true;-->
<!--      getEabcVO(row).then(res => {-->
<!--        this.loading = false;-->
<!--        this.tableData = res;-->
<!--        console.log(res, '明细表');-->
<!--      }).catch(() => {-->
<!--        this.loading = false;-->
<!--      })-->
<!--    },-->
<!--  },-->
<!--  mounted() {-->
<!--    this.getList();-->
<!--    this.getList1();-->
<!--  },-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--::v-deep .el-dialog {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  margin: 0 !important;-->
<!--  position: absolute;-->
<!--  top: 50%;-->
<!--  left: 50%;-->
<!--  transform: translate(-50%, -50%);-->
<!--  max-height: calc(100% - 30px);-->
<!--  max-width: calc(100% - 30px);-->
<!--}-->
<!--.el-tabletest .cell {-->
<!--  padding: 0px;-->
<!--  padding-bottom: 0px;-->
<!--  padding-top: 0px;-->
<!--  padding-left: 0px;-->
<!--  padding-right: 0px;-->
<!--  height: 26px;-->
<!--}-->

<!--::v-deep .el-dialog .el-dialog__body {-->
<!--  flex: 1;-->
<!--  overflow: auto;-->
<!--  font-size: larger;-->
<!--}-->
<!--</style>-->

