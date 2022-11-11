import request from '@/utils/request'

// 查询number详细
export function getNumber(query) {
  return request({
    url: '/project/voucher/sysNumber',
    method: 'get',
    params: query
  })
}
//查询历史账务列表
export function listHistoryAccount(query) {
  return request({
    url: '/project/voucher/historyAccount',
    method: 'get',
    params: query
  })
}
// 查询历史凭证详细
export function getHistoryAccountDetailList(query) {
  return request({
    url: '/project/voucher/historyAccountDetailList',
    method: 'get',
    params: query
  })
}

// 查询当月凭证列表
export function eabb00list(query) {
  return request({
    url: '/project/voucher/eabb00list',
    method: 'get',
    params: query
  })
}
// 查询当月凭证详细
export function getEabcVO(query) {
  return request({
    url: '/project/voucher/getEabcVO',
    method: 'get',
    params: query
  })
}

// 传值
export function addRuleForm(data) {
  return request({
    url: '/project/voucher/saveVoucherList',
    method: 'post',
    data: data
  })
}
// 确认记账
export function addRuleForm1(data) {
  return request({
    url: '/project/voucher/sureSave',
    method: 'post',
    data: data
  })
}

// 查询产品列表
export function listMaterial(query) {
  return request({
    url: '/project/voucher/listMaterial',
    method: 'get',
    params: query
  })
}
// 根据部门编号查询产品列表
export function listMaterialByDeptcode(query) {
  return request({
    url: '/project/voucher/listMaterialByDeptcode',
    method: 'get',
    params: query
  })
}
export function listMaterialByDeptcodeNoPage(query) {
  return request({
    url: '/project/voucher/listMaterialByDeptcodeNoPage',
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
  str = year + "" + m + "" + d;
  // str = year + "-" + month + "-" + date + " " + time.replace(rex, "-");
  // console.log("------当前日期：" + str);
  return str;
}
/**
* 判断对象的值是不是全为空
*/
export function objectValueAllEmpty(object){
	var isEmpty = false;
	Object.keys(object).forEach(function(x) {
    // console.log(x + ":" + object[x]);
    if(object[x] != null && object[x] != ''){
	    if(object[x] === null || object[x] === "" || object[x] === undefined){
		    isEmpty = true;
        // console.log( "isEmpty",isEmpty);
	    }
    }
	});
	return isEmpty;
}
//查询摘要列表
export function listSummary(query) {
  return request({
    url: '/project/summaryn/list',
    method: 'get',
    params: query
  })
}
//查询领料计划
export function listGetmaterial(query) {
  return request({
    url: '/project/getmaterial/list',
    method: 'get',
    params: query
  })
}
//查寻领料计划明细
export function getGetmaterial(id) {
  return request({
    url: '/project/getmaterial/' + id,
    method: 'get'
  })
}
//把整数转换成10位的字符串
export function intToString(number){
  var str = "";

  if(number < 10){
    str = "000000000" + number;
  }else if(number < 100){
    str = "00000000" + number;
  }
  else if(number < 1000){
    str = "0000000" + number;
  }
  else if(number < 10000){
    str = "000000" + number;
  }
  else if(number < 100000){
    str = "00000" + number;
  }
  else if(number < 1000000){
    str = "0000" + number;
  }
  else if(number < 10000000){
    str = "000" + number;
  }
  else if(number < 100000000){
    str = "00" + number;
  }
  else if(number < 1000000000){
    str = "0" + number;
  }
  return str;
}
//写个查重方法,如果有重复提示不能添加，没有重复提示可以添加
export function checkRepeat(arr,obj){
  var isRepeat = false;
  arr.forEach(function(x) {
    if(x.itemcode == obj.itemcode){
      isRepeat = true;
    }
  });
  return isRepeat;
}
export  function percentToValue(value) {
  value = value + '';
  const pointIndex = value.indexOf('.');
  if (pointIndex === -1) return (value - 0) /100 ;
  const powIndex = value.length - pointIndex - 1;
  return (value.replace('.', '') - 0) / Math.pow(10, powIndex);
}
//写一个把百分数转换成数字的方法 例如，13%转换成0.13
export function percentToNumber(value) {
  value = value + '';
  console.log("value",value);
  if (value.length > 2) {
    console.log(value.length,"111");
    const powIndex = value.length - 1;
    return (value.replace('%', '') - 0) / Math.pow(10, powIndex);
  } else {
    console.log(value.length,"222");
    const powIndex = value.length - 0;
    return (value.replace('%', '') - 0) / Math.pow(10, powIndex);
  }
}
//写一个方法,把日期格式转换成字符串 例如，Wed Jul 20 2022 11:27:07 GMT+0800 (中国标准时间)转换成2022-07-20
export function dateToString(date) {
  var str = "";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? ('0' + month) : month;
  var day = date.getDate();
  day = day < 10 ? ('0' + day) : day;
  str = year + "-" + month + "-" + day;
  return str;
}
//写一个方法，把Wed Jul 20 2022 11:27:07 GMT+0800中2022提取出来
export function datetoyear(date){
  var str = "";
  var year = date.getFullYear();
  str = year;
  return str;
}
//写一个方法，把Thu Aug 11 2022 11:17:23 GMT+0800 (中国标准时间)转换成2022-08-08 18:20:05日期格式
export function dateToString3(date) {
  var str = "";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? ('0' + month) : month;
  var day = date.getDate();
}
//写一个方法，把Thu Aug 11 2022 11:17:23 GMT+0800 (中国标准时间)转换成2022-08-08 18:20:05
export function dateToString2(date) {
  var str = "";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? ('0' + month) : month;
  var day = date.getDate();
  day = day < 10 ? ('0' + day) : day;
  var hour = date.getHours();
  hour = hour < 10 ? ('0' + hour) : hour;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second = date.getSeconds();
  second = second < 10 ? ('0' + second) : second;
  str = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  return str;
}
//将2022-08-09中的月份提取出来
export function datetomonth(str){
  var month = "";
  var arr = str.split("-");
  month = arr[1];
  return month;

}
//根据物料编码查询eaba00表中该物料的当前信息
export function selectDetailFromEaba00(itemcode,idDept) {
  return request({
    url: '/project/voucher/' + itemcode +'/'+idDept,
    method: 'get'
  })
}
//去除string中的空格的方法
export function removeSpace(str) {
  var answer = str.trim();
  return answer;
}
//将字符串格式的事件例如2018-01-16转换成 2018-01
export function datetoyearAndMonth(str) {
  var answer = str.substring(0,4);
 var answer1 = str.substring(5,7);
 var answers = answer + '年' + answer1 +'月' ;
 console.log("answers",answers);
  return answers ;

}



