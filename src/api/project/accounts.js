import request from '@/utils/request'

// 查询账务查询列表
export function listAccounts(query) {
  return request({
    url: '/project/accounts/list',
    method: 'get',
    params: query
  })
}

// 查询账务查询详细
export function getAccounts(vouchertype) {
  return request({
    url: '/project/accounts/' + vouchertype,
    method: 'get'
  })
}

// 新增账务查询
export function addAccounts(data) {
  return request({
    url: '/project/accounts',
    method: 'post',
    data: data
  })
}

// 修改账务查询
export function updateAccounts(data) {
  return request({
    url: '/project/accounts',
    method: 'put',
    data: data
  })
}

// 删除账务查询
export function delAccounts(vouchertype) {
  return request({
    url: '/project/accounts/' + vouchertype,
    method: 'delete'
  })
}
