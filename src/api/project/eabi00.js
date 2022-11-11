import request from '@/utils/request'

// 查询盘点明细列表
export function listEabi00(query) {
  return request({
    url: '/project/eabi00/list',
    method: 'get',
    params: query
  })
}
// 查询盘点明细列表
export function listEabi00MaterialList(query) {
  return request({
    url: '/project/eabi00Material/list1',
    method: 'get',
    params: query
  })
}
//导出
export function exportEabi00(Inventorynumber) {
  return request({
    url: '/project/eabi00Material/export/' + Inventorynumber,
    method: 'get',
  })
}
//盘点计算
export function updateResult(data) {
  return request({
    url: '/project/eabi00Material/updateResult',
    method: 'post',
    data: data
  })
}
//取账面数量
export function updateAccountquantity(data) {
  return request({
    url: '/project/eabi00Material/takeQuant',
    method: 'post',
    data: data
  })
}
//取账面数量
export function updateAccountmoney(data) {
  return request({
    url: '/project/eabi00Material/takeMoney',
    method: 'post',
    data: data
  })
}
// 查询盘点明细详细
export function getEabi00(warehousecode) {
  return request({
    url: '/project/eabi00/' + warehousecode,
    method: 'get'
  })
}

// 新增盘点明细
export function addEabi00List(data) {
  return request({
    url: '/project/eabi00/add',
    method: 'post',
    data: data
  })
}

// 修改盘点明细
export function updateEabi00(data) {
  return request({
    url: '/project/eabi00',
    method: 'put',
    data: data
  })
}

// 删除盘点明细
export function delEabi00(warehousecode) {
  return request({
    url: '/project/eabi00/' + warehousecode,
    method: 'delete'
  })
}
