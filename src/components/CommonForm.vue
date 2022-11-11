
<template>
    <el-form ref="form" label-width="100px" :model="form" :inline="inline"><!--ref:获取实例   model:双向绑定  inline:设置表单是行形式还是列形式 -->
        <el-form-item v-for="item in formLable" :key="item.label" :label="item.label">
            <el-input v-if="item.type === 'input'" :placeholder="'请输入'+item.label" v-model="form[item.model]"></el-input><!--placeholder:文本框显示内容-->
            <el-switch v-if="item.type === 'switch'" v-model="form[item.model]"></el-switch>
            <el-date-picker v-if="item.type === 'date'" type="date" v-model="form[item.model]" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker><!--value-format:设置日期显示格式-->
            <el-select v-if="item.type === 'select'" v-model="form[item.model]" placeholder="请选择">
                <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item><slot></slot></el-form-item><!--插槽-->
    </el-form>
    
</template>

<script>

export default{
    name: 'CommonForm',
    props:{
        formLable:Array,//传入表单的label
        form:Object,//传入表单的数据
        inline:Boolean//是否是行形式
    }
}
</script>
