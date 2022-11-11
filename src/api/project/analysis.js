import request from '@/utils/request'

// 查询价格分析列表
export function listAnalysis(query) {
  return request({
    url: '/project/analysis/list',
    method: 'get',
    params: query
  })
}

// 查询价格分析详细
export function getAnalysis(itemcode) {
  return request({
    url: '/project/analysis/' + itemcode,
    method: 'get'
  })
}

// 新增价格分析
export function addAnalysis(data) {
  return request({
    url: '/project/analysis',
    method: 'post',
    data: data
  })
}

// 修改价格分析
export function updateAnalysis(data) {
  return request({
    url: '/project/analysis',
    method: 'put',
    data: data
  })
}

// 删除价格分析
export function delAnalysis(itemcode) {
  return request({
    url: '/project/analysis/' + itemcode,
    method: 'delete'
  })
}
// 导出价格分析
export function exportAnalysis(query){
  return request({
    url:'/project/analysis/export',
    method:'get',
    params: query
  })
}