import request from '@/utils/request'

// 查询库存单据制定列表
export function listRepository(query) {
  return request({
    url: '/project/repository/list',
    method: 'get',
    params: query
  })
}

// 查询库存单据制定详细
export function getRepository(id) {
  return request({
    url: '/project/repository/' + id,
    method: 'get'
  })
}

// 新增库存单据制定
export function addRepository(data) {
  return request({
    url: '/project/repository',
    method: 'post',
    data: data
  })
}

// 修改库存单据制定
export function updateRepository(data) {
  return request({
    url: '/project/repository',
    method: 'put',
    data: data
  })
}

// 删除库存单据制定
export function delRepository(id) {
  return request({
    url: '/project/repository/' + id,
    method: 'delete'
  })
}
