import { request } from '~/api/request';
import AdminConfig from '~/config';

/**
 * @description: 角色
 * @return {*}
 */
export function apiGetRole(params?: any) {
  return request({
    method: 'GET',
    url: AdminConfig.API_URL + '/uapi/getRoleList',
    params,
  });
}

/**
 * @description: 保存角色
 * @return {*}
 */
export function apisaveRole(params?: any) {
  return request({
    method: 'POST',
    url: AdminConfig.API_URL + '/uapi/saveRole',
    params,
  });
}

/**
 * @description: 删除角色
 * @return {*}
 */
export function apideleteRole(params?: any) {
  return request({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/delRole',
    params,
  });
}