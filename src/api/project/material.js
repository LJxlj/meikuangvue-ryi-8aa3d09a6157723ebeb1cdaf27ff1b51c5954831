import request from '@/utils/request'

// 查询产品（物料管理）列表
export function listMaterial(query) {
    return request({
        url: '/project/material/list',
        method: 'get',
        params: query
    })
}

// 查询产品（物料管理）列表库存数量
export function listMaterials(query) {
    return request({
        url: '/project/material/lists',
        method: 'get',
        params: query
    })
}
// 查询所有产品（物料管理）列表
export function listAllMaterial(query) {
    return request({
        url: '/project/material/listAll',
        method: 'get',
        params: query
    })
}

// 校验物料编号是否存在
export function checkMaterialItemcode(query) {
    return request({
        url: '/project/material/checkItemcode',
        method: 'get',
        params: query
    })
}

// 查询产品（物料管理）详细
export function getMaterial(id) {
    return request({
        url: '/project/material/' + id,
        method: 'get'
    })
}

//查询产品列表的库存信息
//2022.6.6 苏振国
export function listMaterialEaba00(query) {
    return request({
        url: '/project/material/listEaba00',
        method: 'get',
        params: query
    })
}

export function listMaterialEaba00All(query) {
    return request({
        url: '/project/material/listEaba00All',
        method: 'get',
        params: query
    })
}

// 新增产品（物料管理）
export function addMaterial(data) {
    return request({
        url: '/project/material',
        method: 'post',
        data: data
    })
}

// 修改产品（物料管理）
export function updateMaterial(data) {
    return request({
        url: '/project/material',
        method: 'put',
        data: data
    })
}

// 删除产品（物料管理）
export function delMaterial(id) {
    return request({
        url: '/project/material/' + id,
        method: 'delete'
    })
}

// 导出产品（物料管理）
export function exportManagement(query) {
    return request({
      url: '/project/material/export',
      method: 'get',
      params: query
    })
  }