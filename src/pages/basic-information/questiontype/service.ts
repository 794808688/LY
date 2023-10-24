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

// 保存题目类型
export function apisaveType(params: any) {
  return request({
    method: "POST",
    url: AdminConfig.API_URL + '/tapi/saveType',
    params,
  })
}

// 删除类型
export function apidelInfo(params: any) {
  return request({
    method: "POST",
    url: AdminConfig.API_URL + '/tapi/delInfo',
    params,
  })
}
