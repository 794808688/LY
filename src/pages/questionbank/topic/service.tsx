import { request } from "~/api/request";
import AdminConfig from "~/config";

// 获取知识结构列表
export function apigetKnowpointList(params: any) {
    return request({
      method: "GET",
      url: AdminConfig.API_URL + '/tapi/getKnowpointList',
      params,
    })
  }

  // 保存知识结构
export function apisaveKnowpoint(params: any) {
  return request({
    method: "POST",
    url: AdminConfig.API_URL + '/tapi/saveKnowpoint',
    params,
  })
}

// 获取学科列表
export function apigetGetherList(params: any) {
  return request({
    method: "GET",
    url: AdminConfig.API_URL + '/tapi/getGetherList',
    params,
  })
}
//获取题目列表
export function apigetQuestionList(params: any) {
  return request({
    method: "GET",
    url: AdminConfig.API_URL + '/tapi/getQuestionList',
    params,
  })
}

//题目录入
export function apisaveQuestion(params: any) {
  return request({
    method: "POST",
    url: AdminConfig.API_URL + '/tapi/saveQuestion',
    params,
  })
}

// 获取题目类型
export function apigetTypeList(params: any) {
  return request({
    method: "GET",
    url: AdminConfig.API_URL + '/tapi/getTypeList',
    params,
  })
}

// 删除题目
export function apidelInfo(params: any) {
  return request({
    method: "POST",
    url: AdminConfig.API_URL + '/tapi/delInfo',
    params,
  })
}

// 导入题目
export function apitranslateExcel(params: any) {
  return request({
    method: "POST",
    url: AdminConfig.API_URL + '/tapi/translateExcel',
    params,
  })
}

