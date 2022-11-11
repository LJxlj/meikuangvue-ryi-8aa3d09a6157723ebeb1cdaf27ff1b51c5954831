import request from '@/utils/request'

// 查询采购计划列表
export function listPlan(query) {
  return request({
    url: '/project/plan/list',
    method: 'get',
    params: query
  })
}



// 查询采购计划列表去重
export function listPlans(query) {
  return request({
    url: '/project/plan/lists',
    method: 'get',
    params: query
  })
}

// 查询采购计划列表最后一条数据
export function listPlanLast(query) {
  return request({
    url: '/project/plan/listlast',
    method: 'get',
    params: query
  })
}

// 查询采购计划列表
export function listPlanTotal() {
  return request({
    url: '/project/plan/listTotal',
    method: 'get',
  })
}

// 查询采购计划详细
export function getPlan(id) {
  return request({
    url: '/project/plan/' + id,
    method: 'get'
  })
}

// 新增采购计划
export function addPlan(data) {
  return request({
    url: '/project/plan',
    method: 'post',
    data: data
  })
}

// 新增采购计划
export function addPlans(data) {
  return request({
    url: '/project/plan/add',
    method: 'post',
    data: data
  })
}

// 修改采购计划
export function updatePlan(data) {
  return request({
    url: '/project/plan',
    method: 'put',
    data: data
  })
}

// 修改采购计划部门审核
export function updatePlans(data) {
  return request({
    url: '/project/plan/update',
    method: 'put',
    data: data
  })
}

// 修改采购计划总经理审核
export function updatePlanzjl(data) {
  return request({
    url: '/project/plan/update1',
    method: 'put',
    data: data
  })
}

// 修改采购计划分管领导审核
export function updatePlanfgld(data) {
  return request({
    url: '/project/plan/update2',
    method: 'put',
    data: data
  })
}

// 部门审核取消
export function updatePlanqx(data) {
  return request({
    url: '/project/plan/updateqx',
    method: 'put',
    data: data
  })
}

// 分管领导审核取消
export function updatePlanqx1(data) {
  return request({
    url: '/project/plan/updateqx1',
    method: 'put',
    data: data
  })
}

// 总经理审核取消
export function updatePlanqx2(data) {
  return request({
    url: '/project/plan/updateqx2',
    method: 'put',
    data: data
  })
}

// 批量删除采购计划
export function delPlan(id) {
  return request({
    url: '/project/plan/' + id,
    method: 'delete'
  })
}

// 删除采购计划
export function delPlans(id) {
  return request({
    url: '/project/plan/del/' + id,
    method: 'delete'
  })
}

// 下载导入模板
export function importTemplate() {
  return request({
    url: "/project/plan/importTemplate",
    method: "get"
  });
}

export function exportManagement(query) {
  return request({
    url: '/project/plan/export',
    method: 'get',
    params: query
  })
}

  //定义将Date对象转换为字符串函数
export function timeToString(date) {
    var str = "";
    var year = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
  //   str = year + "-" + m;
  //   str = year + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    str = year + "/" + m + "/" + d;
    // console.log("------当前日期：" + str);
    return str;
  }