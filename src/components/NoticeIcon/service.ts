import { request } from '~/api/request';
import AdminConfig from '~/config';

/**
 * @description:获取个人相关消息数量 
 * @param {any} params
 * @return {*}
 */
 export function apiGetinfoNumber(params?: any) {
    return request({
      method: 'GET',
      url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP+ '/index.php?mod=6&do=613',
      params,
    });
  }

  /**
 * @description:获取个人相关消息列表
 * @param {any} params
 * @return {*}
 */
 export function apiGetinfoList(params?: any) {
    return request({
      method: 'GET',
      url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP+'/index.php?mod=6&do=614',
      params,
    });
  }

  /**
 * @description:设置消息状态已读
 * @param {any} params
 * @return {*}
 */
 export function apiGetinfoReaded(params?: any) {
    return request({
      method: 'GET',
      url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP+ '/index.php?mod=6&do=615',
      params,
    });
  }