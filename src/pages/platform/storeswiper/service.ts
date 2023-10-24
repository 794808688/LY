import { request } from '~/api/request';
import AdminConfig from '~/config';

export interface Swiper {
  uid?: number | string;
  visiable?: number | string;
  type?: number | string;
}

/**
 * @description: 商城轮播 - StoreRegulate/storeSwiper
 * @param {Swiper} params
 * @return {*}
 */
export function apigetstoreSwiper(params: Swiper) {
  return request({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/StoreRegulate/storeSwiper',
    params,
  });
}

export interface delStoreSwiper {
  uid?: number | string;
  id: number | string;
  type?: number | string;
}
/**
 * @description: 删除商城轮播 - StoreRegulate/delStoreSwiper
 * @param {delStoreSwiper} params
 * @return {*}
 */
export function apigetdelStoreSwiper(params: delStoreSwiper) {
  return request({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/StoreRegulate/delStoreSwiper',
    params,
  })
}

export interface addStoreSwiper {
  uid?: number | string;
  logo?: number | string;
  url?: string;
  weight?: number | string;
  visiable?: number | string;
  type?: number | string;
  title?: number | string;
}
/**
 * @description: 新增商城轮播 - StoreRegulate/addStoreSwiper
 * @param {addStoreSwiper} params
 * @return {*}
 */
export function apigetaddStoreSwiper(params: addStoreSwiper) {
  return request({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/StoreRegulate/addStoreSwiper',
    params,
  });
}

export interface updateStoreSwiper {
  uid?: number | string;
  id: number | string;
  logo?: number | string;
  url?: string;
  weight?: number | string;
  visiable?: number | string;
  type?: number | string;
  title?: number | string;
}
/**
 * @description: 修改商城轮播 - StoreRegulate/updateStoreSwiper
 * @param {updateStoreSwiper} params
 * @return {*}
 */
export function apigetupdateStoreSwiper(params: updateStoreSwiper) {
  return request({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/StoreRegulate/updateStoreSwiper',
    params,
  });
}

/**
  * 获取课程列表
  */
export function apiGetPlan(params: any) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_PATH + '?mod=0&do=70',
    params
  });
}