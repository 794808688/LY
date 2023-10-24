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