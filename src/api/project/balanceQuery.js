import request from '@/utils/request'

// 查询结存查询当前数据列表
export function listBalanceQuery(query) {
  return request({
    url: '/project/balanceQuery/list',
    method: 'get',
    params: query
  })
}
// 查询结存查询历史数据列表
export function listBalanceQuerys(query) {
  return request({
    url: '/project/balanceQuery/lists',
    method: 'get',
    params: query
  })
}

// 结账建账
export function listBalanceQueryss(query) {
  return request({
    url: '/project/balanceQuery/list1',
    method: 'get',
    params: query
  })
}

// 结账数据恢复
export function listBalanceQuerysss(query) {
  return request({
    url: '/project/balanceQuery/list2',
    method: 'get',
    params: query
  })
}


// 查询结存查询详细
export function getBalanceQuery(warehousecode) {
  return request({
    url: '/project/balanceQuery/' + warehousecode,
    method: 'get'
  })
}

// 新增结存查询
export function addBalanceQuery(data) {
  return request({
    url: '/project/balanceQuery',
    method: 'post',
    data: data
  })
}

// 修改结存查询
export function updateBalanceQuery(data) {
  return request({
    url: '/project/balanceQuery',
    method: 'put',
    data: data
  })
}

// 删除结存查询
export function delBalanceQuery(warehousecode) {
  return request({
    url: '/project/balanceQuery/' + warehousecode,
    method: 'delete'
  })
}

// 导出结存查询
export function exportBalanceQuery(query) {
  return request({
    url: '/project/balanceQuery/export',
    method: 'get',
    params: query
  })
}

//定义将Date对象转换为字符串函数
export function timeToString1(date) {
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
  str = year + '' + m;
  // console.log("------当前日期：" + str);
  return str;
}

//定义将Date对象转换为字符串函数
export function timeToString2(date) {
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
  str = year + '' + m - 1;
  // console.log("------当前日期：" + str);
  return str;
}