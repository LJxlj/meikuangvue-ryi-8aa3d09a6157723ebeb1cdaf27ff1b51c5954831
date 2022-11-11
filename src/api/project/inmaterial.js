import request from '@/utils/request'

// 查询材料入库列表
export function listInmaterial(query) {
  return request({
    url: '/project/inmaterial/list',
    method: 'get',
    params: query
  })
}

// 查询材料入库详细
export function getInmaterial(warehousecode) {
  return request({
    url: '/project/inmaterial/' + warehousecode,
    method: 'get'
  })
}

// 新增材料入库
export function addInmaterial(data) {
  return request({
    url: '/project/inmaterial',
    method: 'post',
    data: data
  })
}

// 修改材料入库
export function updateInmaterial(data) {
  return request({
    url: '/project/inmaterial',
    method: 'put',
    data: data
  })
}

// 删除材料入库
export function delInmaterial(warehousecode) {
  return request({
    url: '/project/inmaterial/' + warehousecode,
    method: 'delete'
  })
}
// 导出材料入库明细表
export function exportInmaterial(query) {
  return request({
    url: '/project/inmaterial/export',
    method: 'get',
    params: query
  })
}