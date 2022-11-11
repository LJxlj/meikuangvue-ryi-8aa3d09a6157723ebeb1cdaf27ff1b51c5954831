import request from '@/utils/request'

// 查询日清月结列表
export function listCleandaymonth(query) {
  return request({
    url: '/project/cleandaymonth/list',
    method: 'get',
    params: query
  })
}

// 查询日清月结详细
export function getCleandaymonth(warehousecode) {
  return request({
    url: '/project/cleandaymonth/' + warehousecode,
    method: 'get'
  })
}

// 新增日清月结
export function addCleandaymonth(data) {
  return request({
    url: '/project/cleandaymonth',
    method: 'post',
    data: data
  })
}

// 修改日清月结
export function updateCleandaymonth(data) {
  return request({
    url: '/project/cleandaymonth',
    method: 'put',
    data: data
  })
}

// 删除日清月结
export function delCleandaymonth(warehousecode) {
  return request({
    url: '/project/cleandaymonth/' + warehousecode,
    method: 'delete'
  })
}
// 导出日清月结表
export function exportCleandaymonth(query) {
  return request({
    url: '/project/cleandaymonth/export',
    method: 'get',
    params: query
  })
}