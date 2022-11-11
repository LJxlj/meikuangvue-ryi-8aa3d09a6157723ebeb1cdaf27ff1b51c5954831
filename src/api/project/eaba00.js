import request from '@/utils/request'

// 查询余额初始列表
export function listEaba00(query) {
  return request({
    url: '/project/eaba00/list',
    method: 'get',
    params: query
  })
}

// 自动初始化
export function listEaba001(query) {
  return request({
    url: '/project/eaba00/lists',
    method: 'get',
    params: query
  })
}

// 初始化检查
export function listEaba002(query) {
  return request({
    url: '/project/eaba00/list123',
    method: 'get',
    params: query
  })
}

// 查询余额初始详细
export function getEaba00(id) {
  return request({
    url: '/project/eaba00/' + id,
    method: 'get'
  })
}

// 新增余额初始
export function addEaba00(data) {
  return request({
    url: '/project/eaba00',
    method: 'post',
    data: data
  })
}


// 修改余额初始
export function updateEaba00(data) {
  return request({
    url: '/project/eaba00',
    method: 'put',
    data: data
  })
}

// 删除余额初始
export function delEaba00(ids) {
  return request({
    url: '/project/eaba00/' + ids,
    method: 'delete'
  })
}

// 查询库存列表
export function cxkc(query) {
  return request({
    url: '/project/eaba00/cxkc',
    method: 'get',
    params: query
  })
}
// 导出结存查询
export function exportEaba00(query) {
  return request({
    url: '/project/eaba00/export',
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
