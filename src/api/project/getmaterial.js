import request from '@/utils/request'

// 导出公司付材料出库
export function exportDetail(deptArrId) {
    return request({
        url: '/project/getmaterial/export/' + deptArrId,
        method: 'get',
    })
}

// 查询领料查询列表
export function listGetmaterial(query) {
    return request({
        url: '/project/getmaterial/list',
        method: 'get',
        params: query
    })
}
// 查询领料查询列表
export function listGetmaterialpro(query) {
    return request({
        url: '/project/getmaterial/listpro',
        method: 'get',
        params: query
    })
}
// 查询未完成领料查询列表
export function listNoGetmaterial(query) {
    return request({
        url: '/project/getmaterial/listno',
        method: 'get',
        params: query
    })
}
// 查询已完成领料查询列表
export function listYesGetmaterial(query) {
    return request({
        url: '/project/getmaterial/listyes',
        method: 'get',
        params: query
    })
}
//根据deptcode查询领料查询列表
export function listGetmaterialByDeptcode(query) {
    return request({
        url: '/project/getmaterial/listByDeptcode',
        method: 'get',
        params: query
    })
}

// 出库点击行
export function getGetmaterialNo(idDept, materialid) {
    return request({
        url: '/project/getmaterial/listByDeptcodeDetail/' + idDept + '/' + materialid,
        method: 'get',
    })
}

// 查询领料查询列表
export function listGetmaterials(query) {
    return request({
        url: '/project/getmaterial/lists',
        method: 'get',
        params: query
    })
}

export function listGetmaterialss(query) {
    return request({
        url: '/project/getmaterial/listss',
        method: 'get',
        params: query
    })
}

//查询最新的领料单号
export function getmaterialid(query) {
    return request({
        url: '/project/getmaterial/getmaterialid',
        method: 'get',
        params: query
    })
}

// 查询领料查询详细
export function getGetmaterial(id) {
    return request({
        url: '/project/getmaterial/' + id,
        method: 'get'
    })
}

// 新增领料查询
export function addGetmaterial(data) {
    return request({
        url: '/project/getmaterial',
        method: 'post',
        data: data
    })
}

// 修改领料查询
export function updateGetmaterial(data) {
    return request({
        url: '/project/getmaterial',
        method: 'put',
        data: data
    })
}

// 删除领料查询
export function delGetmaterial(id) {
    return request({
        url: '/project/getmaterial/' + id,
        method: 'delete'
    })
}

//修改领料计划
export function updateGetmaterialDetailPlan(data) {
    return request({
        url: '/project/getmaterial/updateGetmaterialDetail',
        method: 'put',
        data: data
    })
}

//修改审核人和审核时间
export function updatereviewer1(data) {
    return request({
        url: '/project/getmaterial/reviewer1',
        method: 'put',
        data: data
    })
}
export function updatereviewer2(data) {
    return request({
        url: '/project/getmaterial/reviewer2',
        method: 'put',
        data: data
    })
}
export function updatereviewer3(data) {
    return request({
        url: '/project/getmaterial/reviewer3',
        method: 'put',
        data: data
    })
}
//批量审核领料计划部门审核
export function updatacheckconfirm1(data) {
    return request({
        url: '/project/getmaterial/checkconfirm1',
        method: 'put',
        data: data
    })
}
//批量拒审领料计划部门审核
export function updatacheckconfirm2(data) {
    return request({
        url: '/project/getmaterial/checkconfirm2',
        method: 'put',
        data: data
    })
}
//批量审核领料计划领导审核
export function updatacheckconfirm3(data) {
    return request({
        url: '/project/getmaterial/checkconfirm3',
        method: 'put',
        data: data
    })
}
//批量拒审领料计划领导审核
export function updatacheckconfirm4(data) {
    return request({
        url: '/project/getmaterial/checkconfirm4',
        method: 'put',
        data: data
    })
}
//批量审核领料计划矿长审批
export function updatacheckconfirm5(data) {
    return request({
        url: '/project/getmaterial/checkconfirm5',
        method: 'put',
        data: data
    })
}
//批量拒审领料计划矿长审批
export function updatacheckconfirm6(data) {
    return request({
        url: '/project/getmaterial/checkconfirm6',
        method: 'put',
        data: data
    })
}