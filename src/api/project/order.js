import request from '@/utils/request'
import userInfo from "@/views/system/user/profile/userInfo";

// 查询采购订单主列表，不分页
export function listOrder(query) {
  return request({
    url: '/project/order/list',
    method: 'get',
    params: query
  })
}

// 新增采购订单
export function listOrderadd(query) {
  return request({
    url: '/project/order/listadd',
    method: 'get',
    params: query
  })
}

// 根据订单编号查询
export function listOrdercode(query) {
  return request({
    url: '/project/order/listcode',
    method: 'get',
    params: query
  })
}

// 查询采购订单列表
export function listOrders(query) {
  return request({
    url: '/project/order/lists',
    method: 'get',
    params: query
  })
}

// 自动生成采购合同
export function listcaigouhetong(query) {
  return request({
    url: '/project/order/listcaigouhetong',
    method: 'get',
    params: query
  })
}

// 订单查询未完成
export function listOrdersNo(query) {
  return request({
    url: '/project/order/listsno',
    method: 'get',
    params: query
  })
}
// 根据部门id查询未完成采购订单
export function listOrdersNoDoByDeptId(query) {
  return request({
    url: '/project/order/listNoByDeptcode',
    method: 'get',
    params: query
  })
}
// 查询采购订单详细点击行事件
export function getOrder1(idDept,idContract) {
  return request({
    url: '/project/order/less/' + idDept +'/'+idContract,
    method: 'get'
  })
}
//退货查询所有采购订单
export function listOrdersByDeptId(query) {
  return request({
    url: '/project/order/listAllDeptcode',
    method: 'get',
    params: query
  })
}
// 退货查询订单详细点击行事件
export function getReturnOrder(idDept,idContract) {
  return request({
    url: '/project/order/lessAll/' + idDept +'/'+idContract,
    method: 'get'
  })
}

// 订单查询已完成
export function listOrdersYes(query) {
  return request({
    url: '/project/order/listsyes',
    method: 'get',
    params: query
  })
}
// 查询采购订单主详细
export function getOrder(id) {
  return request({
    url: '/project/order/' + id,
    method: 'get'
  })
}



// 查询采购订单主详细
export function getOrders(id) {
  return request({
    url: '/project/order' + id,
    method: 'get'
  })
}

// 新增采购订单主
export function addOrder(data) {
  return request({
    url: '/project/order',
    method: 'post',
    data: data
  })
}

// 修改采购订单主
export function updateOrder(data) {
  return request({
    url: '/project/order',
    method: 'put',
    data: data
  })
}

// 审核
export function updateOrders(data) {
  return request({
    url: '/project/order/update',
    method: 'put',
    data: data
  })
}

// 生成合同，修改采购计划是否生成合同
export function updateOrderscht(data) {
  return request({
    url: '/project/order/updatescht',
    method: 'put',
    data: data
  })
}

// 取消审核
export function updateOrdersqx(data) {
  return request({
    url: '/project/order/updates',
    method: 'put',
    data: data
  })
}

// 删除采购订单主
export function delOrder(id) {
  return request({
    url: '/project/order/' + id,
    method: 'delete'
  })
}

// 导出
export function exportManagement(query) {
  return request({
    url: '/project/order/export',
    method: 'get',
    params: query
  })
}
