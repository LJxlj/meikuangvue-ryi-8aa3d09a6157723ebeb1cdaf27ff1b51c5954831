import request from '@/utils/request'

// 查询历史账务根据部门id
export function listEabbh0(query) {
  return request({
    url: '/project/eabbh0/list',
    method: 'get',
    params: query
  })
}


export function listEabbh0Byvoucher(query) {
  return request({
    url: '/project/eabbh0/listByVouchertype',
    method: 'get',
    params: query
  })
}
// 查询历史账务查询详细
export function getEabbh0(id) {
  return request({
    url: '/project/eabbh0/' + id,
    method: 'get'
  })
}


