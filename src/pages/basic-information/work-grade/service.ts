import { request } from "~/api/request";
import AdminConfig from "~/config";



// 获取学科列表
export function apigetGetherList(params: any) {
  return request({
    method: "GET",
    url: AdminConfig.API_URL + '/tapi/getGetherList',
    params,
  })
}

// 保存学科
export function apisaveGether(params: any) {
  return request({
    method: "POST",
    url: AdminConfig.API_URL + '/tapi/saveGether',
    params,
  })
}

// 获取职业
export function apigetWorkTypeList(params: any) {
  return request({
    method: "GET",
    url: AdminConfig.API_URL + '/tapi/getWorkTypeList',
    params,
  })
}
// 删除学科
export function apidelInfo(params: any) {
  return request({
    method: "POST",
    url: AdminConfig.API_URL + '/tapi/delInfo',
    params,
  })
}
