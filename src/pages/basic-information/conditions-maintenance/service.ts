import { request } from "~/api/request";
import AdminConfig from "~/config";

// 获取题目类型
export function apigetTypeList(params: any) {
  return request({
    method: "GET",
    url: AdminConfig.API_URL + '/tapi/getTypeList',
    params,
  })
}

// 删除规则
export function apidelInfo(params: any) {
  return request({
    method: "POST",
    url: AdminConfig.API_URL + '/tapi/delInfo',
    params,
  })
}
//获取出题规则列表
export function apigetQuestionRuleList(params: any) {
  return request({
    method: "GET",
    url: AdminConfig.API_URL + '/tapi/getQuestionRuleList',
    params,
  })
}

//新增出题规则
export function apiaddQuestionRule(params: any) {
  return request({
    method: "POST",
    url: AdminConfig.API_URL + '/tapi/addQuestionRule',
    params,
  })
}

//修改出题规则
export function apiupdateQuestionRule(params: any) {
  return request({
    method: "POST",
    url: AdminConfig.API_URL + '/tapi/updateQuestionRule',
    params,
  })
}

//删除出题规则
export function apideleteQuestionRule(params: any) {
  return request({
    method: "GET",
    url: AdminConfig.API_URL + '/tapi/deleteQuestionRule',
    params,
  })
}

//获取出题规则
export function apigetQuestionRule(params: any) {
  return request({
    method: "GET",
    url: AdminConfig.API_URL + '/tapi/getQuestionRule',
    params,
  })
}
