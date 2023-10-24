import { request } from '~/api/request';
import AdminConfig from '~/config';

/**
 * @description: 公告列表
 * @param {any} params
 * @return {*}
 */
export function apigetSysNoticeList(params: any) {
  return request<any>({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/getSysNoticeList',
    params
  });
}

/**
 * @description: 新增公告
 * @param {any} params
 * @return {*}
 */
export function apiaddSysNotice(params: any) {
  return request<any>({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/addSysNotice',
    params
  });
}

/**
 * @description: 编辑公告
 * @param {any} params
 * @return {*}
 */
export function apieditSysNotice(params: any) {
  return request<any>({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/editSysNotice',
    params
  });
}

/**
 * @description: 删除公告
 * @param {any} params
 * @return {*}
 */
export function apidelSysNotice(params: any) {
  return request<any>({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/delSysNotice',
    params
  });
}

/**
 * @description: 发布公告
 * @param {any} params
 * @return {*}
 */
export function apiemitSysNotice(params: any) {
  return request<any>({
    method: 'POST',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/emitSysNotice',
    params
  });
}