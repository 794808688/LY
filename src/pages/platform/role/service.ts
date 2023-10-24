import { request } from '~/api/request';
import AdminConfig from '~/config';

/**
 * @description: 角色
 * @return {*}
 */
export function apiGetRole(params?: any) {
  return request({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/getRoleList',
    params,
  });
}

/**
 * @description: 新建角色
 * @return {*}
 */
export function apiaddRole(params?: any) {
  return request({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/addRole',
    params,
  });
}

/**
 * @description: 修改角色
 * @return {*}
 */
export function apimodRole(params?: any) {
  return request({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/updateRole',
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