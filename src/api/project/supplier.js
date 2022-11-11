import request from '@/utils/request'

// 查询供方档案列表
export function listSupplier(query) {
  return request({
    url: '/project/supplier/list',
    method: 'get',
    params: query
  })
}

// 查询供方档案详细
export function getSupplier(id) {
  return request({
    url: '/project/supplier/' + id,
    method: 'get'
  })
}

// 查询供方档案详细分页
export function getSuppliers(query) {
  return request({
    url: '/project/supplier/fys/',
    method: 'get',
    params: query
  })
}

// 新增供方档案
export function addSupplier(data) {
  return request({
    url: '/project/supplier',
    method: 'post',
    data: data
  })
}

// 修改供方档案
export function updateSupplier(data) {
  return request({
    url: '/project/supplier',
    method: 'put',
    data: data
  })
}

// 删除供方档案
export function delSupplier(id) {
  return request({
    url: '/project/supplier/' + id,
    method: 'delete'
  })
}
