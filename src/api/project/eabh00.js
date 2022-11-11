import request from '@/utils/request'

// 查询库存盘点列表
export function listEabh00(query) {
  return request({
    url: '/project/eabh00/list',
    method: 'get',
    params: query
  })
}
// 查询库存盘点列表 mp
export function listEabh00MP(query) {
  return request({
    url: '/project/eabh00/list1',
    method: 'get',
    params: query
  })
}
//新增库存盘点主表
export function addEabi00(data) {
  return request({
    url: '/project/eabh00/add',
    method: 'post',
    data: data
  })
}

//新增库存盘点主表mp
export function addEabi001(data) {
  return request({
    url: '/project/eabh00/add1',
    method: 'post',
    data: data
  })
}

// 查询库存盘点详细
export function getEabh00(warehousecode) {
  return request({
    url: '/project/eabh00/' + warehousecode,
    method: 'get'
  })
}

// 新增库存盘点子表
export function addEabh00(data) {
  return request({
    url: '/project/eabh00/addList',
    method: 'post',
    data: data
  })
}

// 修改库存盘点
export function updateEabh00(data) {
  return request({
    url: '/project/eabh00',
    method: 'put',
    data: data
  })
}

// 删除库存盘点
export function delEabh00(warehousecode) {
  return request({
    url: '/project/eabh00/' + warehousecode,
    method: 'delete'
  })
}
