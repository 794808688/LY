import { request } from '~/api/request';
import AdminConfig from '~/config';


/**
 * @description: 查询资源库 - 907
 * @param {any} params
 * @return {*}
 */
export function apigetresource(params: any) {
  return request({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_PATH + '?mod=9&do=907',
    params,
  });
}