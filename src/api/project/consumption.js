import request from '@/utils/request'

// 查询低值易耗品消耗明细表列表
export function listConsumption(query) {
  return request({
    url: '/project/consumption/list',
    method: 'get',
    params: query
  })
}

// 查询低值易耗品消耗明细表详细
export function getConsumption(materialType) {
  return request({
    url: '/project/consumption/' + materialType,
    method: 'get'
  })
}

// 新增低值易耗品消耗明细表
export function addConsumption(data) {
  return request({
    url: '/project/consumption',
    method: 'post',
    data: data
  })
}

// 修改低值易耗品消耗明细表
export function updateConsumption(data) {
  return request({
    url: '/project/consumption',
    method: 'put',
    data: data
  })
}

// 删除低值易耗品消耗明细表
export function delConsumption(materialType) {
  return request({
    url: '/project/consumption/' + materialType,
    method: 'delete'
  })
}

// 导出低值易耗品消耗明细表
export function exportConsumption(query) {
  return request({
    url: '/project/consumption/export',
    method: 'get',
    params: query
  })
}