import request from '@/utils/request'

// 查询余额检查列表
export function listInventory(query) {
  return request({
    url: '/project/inventory/list',
    method: 'get',
    params: query,
    
  })
}

// // 查询余额检查列表
// export function listInventory(query) {
//   return request({
//     url: '/project/inventory/lists',
//     method: 'get',
//     params: query
//   })
// }
// 查询余额检查详细
export function getInventory(warehousecode) {
  return request({
    url: '/project/inventory/' + warehousecode,
    method: 'get'
  })
}

// 新增余额检查
export function addInventory(data) {
  return request({
    url: '/project/inventory',
    method: 'post',
    data: data
  })
}

// 修改余额检查
export function updateInventory(data) {
  return request({
    url: '/project/inventory',
    method: 'put',
    data: data
  })
}

// 删除余额检查
export function delInventory(warehousecode) {
  return request({
    url: '/project/inventory/' + warehousecode,
    method: 'delete'
  })
}

// 导出余额检查
export function exportInventory(query) {
  return request({
    url: '/project/inventory/export',
    method: 'get',
    params: query
  })
}