import request from '@/utils/request'

// 查询原材料调账列表
export function listAdjustment(query) {
  return request({
    url: '/project/adjustment/list',
    method: 'get',
    params: query
  })
}

// 查询原材料调账详细
export function getAdjustment(materialType) {
  return request({
    url: '/project/adjustment/' + materialType,
    method: 'get'
  })
}

// 新增原材料调账
export function addAdjustment(data) {
  return request({
    url: '/project/adjustment',
    method: 'post',
    data: data
  })
}

// 修改原材料调账
export function updateAdjustment(data) {
  return request({
    url: '/project/adjustment',
    method: 'put',
    data: data
  })
}

// 删除原材料调账
export function delAdjustment(materialType) {
  return request({
    url: '/project/adjustment/' + materialType,
    method: 'delete'
  })
}
// 导出原材料调账明细表
export function exportAdjustment(query) {
  return request({
    url: '/project/adjustment/export',
    method: 'get',
    params: query
  })
}