import request from '@/utils/request'

// 查询消耗明细表列表
export function listA3(query) {
  return request({
    url: '/project/A3/list',
    method: 'get',
    params: query
  })
}

// 查询消耗明细表详细
export function getA3(materialType) {
  return request({
    url: '/project/A3/' + materialType,
    method: 'get'
  })
}

// 新增消耗明细表
export function addA3(data) {
  return request({
    url: '/project/A3',
    method: 'post',
    data: data
  })
}

// 修改消耗明细表
export function updateA3(data) {
  return request({
    url: '/project/A3',
    method: 'put',
    data: data
  })
}

// 删除消耗明细表
export function delA3(materialType) {
  return request({
    url: '/project/A3/' + materialType,
    method: 'delete'
  })
}

// 导出消耗明细表
export function exportA3(query) {
  return request({
    url: '/project/A3/export',
    method: 'get',
    params: query
  })
}
// 日期转格式
export function dateToString(date) {
  var str = "";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? ('0' + month) : month;
  var day = date.getDate();
  day = day < 10 ? ('0' + day) : day;
  str = year + "-" + month + "-" + day;
  return str;
}