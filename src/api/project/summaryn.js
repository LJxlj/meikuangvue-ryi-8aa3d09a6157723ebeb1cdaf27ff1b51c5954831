import request from '@/utils/request'

// 查询摘要维护列表
export function listSummaryn(query) {
  return request({
    url: '/project/summaryn/list',
    method: 'get',
    params: query
  })
}

// 查询摘要维护详细
export function getSummaryn(number) {
  return request({
    url: '/project/summaryn/' + number,
    method: 'get'
  })
}

// 新增摘要维护
export function addSummaryn(data) {
  return request({
    url: '/project/summaryn',
    method: 'post',
    data: data
  })
}

// 修改摘要维护
export function updateSummaryn(data) {
  return request({
    url: '/project/summaryn',
    method: 'put',
    data: data
  })
}

// 删除摘要维护
export function delSummaryn(number) {
  return request({
    url: '/project/summaryn/' + number,
    method: 'delete'
  })
}

// 导出余额检查
export function exportSummaryn(query) {
  return request({
    url: '/project/summaryn/export',
    method: 'get',
    params: query
  })
}