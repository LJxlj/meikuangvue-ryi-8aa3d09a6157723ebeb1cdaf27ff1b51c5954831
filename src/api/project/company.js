import request from '@/utils/request'

// 查询公司付材料出库列表
export function listCompany(query) {
  return request({
    url: '/project/company/list',
    method: 'get',
    params: query
  })
}

// 查询公司付材料出库详细
export function getCompany(warehousecode) {
  return request({
    url: '/project/company/' + warehousecode,
    method: 'get'
  })
}

// 新增公司付材料出库
export function addCompany(data) {
  return request({
    url: '/project/company',
    method: 'post',
    data: data
  })
}

// 修改公司付材料出库
export function updateCompany(data) {
  return request({
    url: '/project/company',
    method: 'put',
    data: data
  })
}

// 删除公司付材料出库
export function delCompany(warehousecode) {
  return request({
    url: '/project/company/' + warehousecode,
    method: 'delete'
  })
}

// 导出公司付材料出库
export function exportCompany(query) {
  return request({
    url: '/project/company/export',
    method: 'get',
    params: query
  })
}