import { request } from '~/api/request';
import AdminConfig from '~/config';

/**
  * 获取用户
  */
export function apigetUser(params: any) {
  return request<any>({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/getAdminList',
    params
  });
}
//角色
export function apiGetRole(params?: any) {
  return request({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP+ '/getRoleList',
    params,
  });
}

/**
 * @description: 添加用户
 * @param {any} params
 * @return {*}
 */
export function apigetadduser(params: any) {
  return request({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/addAdmin',
    params,
  });
}

/**
 * @description: 编辑用户
 * @param {any} params
 * @return {*}
 */
export function apigetupdatauser(params: any) {
  return request({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP+ '/updateAdmin',
    params,
  });
}
/**
 * @description: 删除用户
 * @param {any} params
 * @return {*}
 */
export function apideluser(params: any) {
  return request({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_PATH + '?mod=0&do=46',
    params,
  });
}

/**
 * @description: 导入用户
 * @param {any} params
 * @return {*}
 */
export function apiUpuser(params: any) {
  return request({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_PATH + '?mod=0&do=42',
    params,
  });
}

