import { request } from "~/api/request";
import AdminConfig from "~/config";

export function apiHomeCount(params: any) {
  return request({
    method: "GET",
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + "/StoreRegulate/homeCount",
    params,
  });
}

//首页统计
export function apiGetdataStats(params?: any) {
  return request({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_PATH + '/Manager/dataStats',
    params,
  });
}
