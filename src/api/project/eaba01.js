import request from '@/utils/request'

// 查询库龄分析列表
export function listEaba01(query) {
  return request({
    url: '/project/eaba01/list',
    method: 'get',
    params: query
  })
}

// 查询库龄分析详细
export function getEaba01(warehousecode) {
  return request({
    url: '/project/eaba01/' + warehousecode,
    method: 'get'
  })
}

// 新增库龄分析
export function addEaba01(data) {
  return request({
    url: '/project/eaba01',
    method: 'post',
    data: data
  })
}

// 修改库龄分析
export function updateEaba01(data) {
  return request({
    url: '/project/eaba01',
    method: 'put',
    data: data
  })
}

// 删除库龄分析
export function delEaba01(warehousecode) {
  return request({
    url: '/project/eaba01/' + warehousecode,
    method: 'delete'
  })
}
// 导出库龄分析
export function exportEaba01(query) {
  return request({
    url: '/project/eaba01/export',
    method: 'get',
    params: query
  })
}