import request from '@/utils/request'

// 查询领料计划列表
export function listDetail(query) {
    return request({
        url: '/system/detail/list',
        method: 'get',
        params: query
    })
}

// 台账消耗统计查询列表
export function listDetails(query) {
    return request({
        url: '/system/detail/lists',
        method: 'get',
        params: query
    })
}
export function listDetailss(query) {
    return request({
        url: '/system/detail/listss',
        method: 'get',
        params: query
    })
}

// 查询领料计划详细
export function getDetail(id) {
    return request({
        url: '/system/detail/' + id,
        method: 'get'
    })
}

// 导出公司付材料出库
export function exportDetail(query) {
    return request({
        url: '/system/detail/export',
        method: 'get',
        params: query
    })
}
export function exportDetail1(query) {
    return request({
        url: '/system/detail/export1',
        method: 'get',
        params: query
    })
}

// 新增领料计划
export function addDetail(data) {
    return request({
        url: '/system/detail',
        method: 'post',
        data: data
    })
}

// 修改领料计划
export function updateDetail(data) {
    return request({
        url: '/system/detail',
        method: 'put',
        data: data
    })
}

// 删除领料计划
export function delDetail(id) {
    return request({
        url: '/system/detail/' + id,
        method: 'delete'
    })
}