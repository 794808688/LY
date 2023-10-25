import { request } from "~/api/request";
import AdminConfig from "~/config";



// 获取系统列表
export function apigetSystemList(params: any) {
  return request({
    method: "GET",
    url: AdminConfig.API_URL + '/uapi/getSystemList',
    params,
  })
}

// 保存系统
export function apisaveSystem(params: any) {
  return request({
    method: "POST",
    url: AdminConfig.API_URL + '/uapi/saveSystem',
    params,
  })
}