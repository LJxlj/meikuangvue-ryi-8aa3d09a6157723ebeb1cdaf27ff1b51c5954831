import request from '@/utils/request'

// 查询暂估入库统计列表
export function listStatistics(query) {
  return request({
    url: '/project/statistics/list',
    method: 'get',
    params: query
  })
}

// 查询暂估入库统计详细
export function getStatistics(warehousecode) {
  return request({
    url: '/project/statistics/' + warehousecode,
    method: 'get'
  })
}

// 新增暂估入库统计
export function addStatistics(data) {
  return request({
    url: '/project/statistics',
    method: 'post',
    data: data
  })
}

// 修改暂估入库统计
export function updateStatistics(data) {
  return request({
    url: '/project/statistics',
    method: 'put',
    data: data
  })
}

// 导出暂估入库统计表
export function exportStatistics(query) {
  return request({
    url: '/project/statistics/export',
    method: 'get',
    params: query
  })
}

// 删除暂估入库统计
export function delStatistics(warehousecode) {
  return request({
    url: '/project/statistics/' + warehousecode,
    method: 'delete'
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
  str = year + '-' + m + '-' + d;
  // console.log("------当前日期：" + str);
  return str;
}