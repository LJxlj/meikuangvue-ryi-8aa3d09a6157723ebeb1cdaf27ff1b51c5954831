<!--<template>-->
<!--    <div>-->
<!--        &lt;!&ndash; <el-dialog title="凭证明细" :visible.sync="showDialog" width="60%" @close="handleClose" center> &ndash;&gt;-->
<!--            <br />-->
<!--            <el-table v-loading="loading" :data="tableData" ref="table" :summary-method="getSummaries" show-summary>-->
<!--                <af-table-column label="物料编码" align="center" prop="itemcode" />-->
<!--                <af-table-column label="物料名称" align="center" prop="itemname" />-->
<!--                <af-table-column label="规格型号" align="center" prop="model" />-->
<!--                <af-table-column label="单位" align="center" prop="unit"/>-->
<!--                <af-table-column label="数量" align="center" prop="saleunitquant"/>-->
<!--                <af-table-column label="单价￥" align="center" prop="inventoryprice"/>-->
<!--                <af-table-column label="金额￥(未税)" align="center" prop="businessmoney"/>-->
<!--                <af-table-column label="存储数量" align="center" prop="currentinvquant"/>-->
<!--                <af-table-column label="库存金额" align="center" prop="currentinvmoney" />-->
<!--                <af-table-column label="备注" align="center" prop="summary" />-->
<!--            </el-table>-->
<!--        &lt;!&ndash; </el-dialog> &ndash;&gt;-->
<!--    </div>-->
<!--</template>-->
<!--<script>-->
<!--import { getEabcVO } from '@/api/project/voucher';-->

<!--export default {-->
<!--    // 接受父组件传递的值-->
<!--    props: {-->
<!--        // addOrUpdateVisible: {-->
<!--        //     type: Boolean,-->
<!--        //     default: false-->
<!--        // }-->
<!--    },-->
<!--    watch: {-->
<!--        // // 监听 addOrUpdateVisible 改变-->
<!--        // addOrUpdateVisible(oldVal, newVal) {-->
<!--        //     this.showDialog = this.addOrUpdateVisible-->
<!--        // },-->
<!--    },-->
<!--    // 列表-->
<!--    data() {-->
<!--        return {-->
<!--            // // 控制弹出框显示隐藏-->
<!--            // showDialog: false,-->
<!--            // 遮罩层-->
<!--            loading: true,-->
<!--            tableData: [],-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        //合计-->
<!--        //计算tableData的5，7，8列的和-->
<!--        getSummaries(param) {-->
<!--            const { columns, data } = param-->
<!--            const sums = []-->
<!--            columns.forEach((column, index) => {-->
<!--                if (index === 0) {-->
<!--                    sums[index] = '合计'-->
<!--                }-->
<!--                // 指定一个或者多个你需要计算的列-->
<!--                else if (index === 4 || index === 6 || index === 8) {-->
<!--                    const values = data.map(item => Number(item[column.property]))-->
<!--                    if (!values.every(value => isNaN(value))) {-->
<!--                        sums[index] = values.reduce((prev, curr) => {-->
<!--                            const value = Number(curr)-->
<!--                            if (!isNaN(value)) {-->
<!--                                // 保存了两位小数点-->
<!--                                return Math.floor((prev + curr) * 100) / 100;-->
<!--                            } else {-->
<!--                                // 保存了两位小数点-->
<!--                                return Math.floor(prev * 100) / 100;-->
<!--                            }-->
<!--                        }, 0)-->
<!--                    } else {-->
<!--                        sums[index] = ''-->
<!--                    }-->
<!--                } else {-->
<!--                    sums[index] = ''-->
<!--                }-->
<!--            })-->
<!--            return sums-->
<!--        },-->
<!--        // // 弹出框关闭后触发-->
<!--        // handleClose() {-->
<!--        //     // 子组件调用父组件方法，并传递参数-->
<!--        //     this.$emit('changeShow', 'false')-->
<!--        // },-->
<!--        getList(row) {-->
<!--            this.loading = true;-->
<!--            getEabcVO(row).then(res => {-->
<!--                this.loading = false;-->
<!--                this.tableData = res;-->
<!--                console.log(res);-->
<!--            }).catch(() => {-->
<!--                this.loading = false;-->
<!--            })-->
<!--        },-->
<!--    },-->
<!--    mounted() {-->
<!--        this.getList();-->
<!--    },-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--::v-deep .el-dialog {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    margin: 0 !important;-->
<!--    position: absolute;-->
<!--    top: 50%;-->
<!--    left: 50%;-->
<!--    transform: translate(-50%, -50%);-->
<!--    max-height: calc(100% - 30px);-->
<!--    max-width: calc(100% - 30px);-->
<!--}-->

<!--::v-deep .el-dialog .el-dialog__body {-->
<!--    flex: 1;-->
<!--    overflow: auto;-->
<!--    font-size: larger;-->
<!--}-->
<!--</style>-->
