import request from '@/utils/request'

// 查询当月账务
export function Listeabb00(query) {
  return request({
    url: '/project/eabb00/list',
    method: 'get',
    params: query
  })
}
export function listeabb00Byvoucher(query) {
  return request({
    url: '/project/eabb00/listByVouchertype',
    method: 'get',
    params: query
  })
}

//查询当月明细
export function Listeabb00Detail(query) {
  return request({
    url: '/project/eabb00/listdetial',
    method: 'get',
    params: query
  })
}
//tests
