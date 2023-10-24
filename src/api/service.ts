import { request } from '~/api/request';
import AdminConfig from '~/config'

/**
 * 获取校区列表
 * @param params 
 * @param url 
 * @returns 
 */
export function apiGetSchoolList(params: any) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_PATH+'?mod=0&do=10',
    params,
  });
}

/**
 * 获取班级列表
 * @param params 
 * @param url 
 */
export function apiGetClasList(params: any) {
  return request({
    method: 'GET',
    url: AdminConfig.LOCAL_PATH + '?mod=0&do=13',
    params,
  });
}

/**
 * 获取产品列表
 * @param params 
 * @param url 
 */
export function apiGetProductList(params: any) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + '/clsc/webedu/Connect/productlist',
    params,
  });
}

/**
 * 获取个人资源
 * @param params 
 * @param url 
 */
export function apiGetOwnerFile(params: any) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + '/clsc/webedu/Lessonplan/ownerfile',
    params,
  });
}

export interface GetSchoolAnalysisData {
  stime?: number
  etime?: number
  page?: number
  size?: number
}

/**
 * 获取校区授课数据
 * @param params 
 * @param url 
 */
export function apiGetSchoolAnalysis(params: GetSchoolAnalysisData) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + '/clsc/webedu/Connect/getanalysisa',
    params,
  });
}


/**
 * 获取校区课程实录数据
 * @param params 
 * @param url 
 */
export function apiGetSchoolAnalysisa(params: GetSchoolAnalysisData) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + '/clsc/webedu/Connect/getSLanalysisa',
    params,
  });
}

/**
 * 获取校区微课数据
 * @param params 
 * @param url 
 */
export function apiGetWKAnalysisa(params: GetSchoolAnalysisData) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + '/clsc/webedu/Connect/getWKanalysisa',
    params,
  });
}

/**
 * 新增课程播放次数
 * @param params 
 * @param url 
 */
export function apiAddPlayer(params: { id: any }) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + '/clsc/webedu/Connect/player',
    params,
  });
}

export function upLoad(params: any) {
  return request<any>({
    method: 'POST',
    url: AdminConfig.API_URL +  AdminConfig.LOCAL_PATH + '?mod=9&do=901',
    params,
  })
}

export function upLoadTag(params: any) {
  return request<any>({
    method: 'POST',
    url: AdminConfig.API_URL +  AdminConfig.LOCAL_PATH + '?mod=9&do=904',
    params,
  })
}

/**
 * 获取资源分配类型
 * @param params 
 * @returns 
 */
export function sourceType(params: any) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + '/zfz/job/index.php?mod=0&do=20',
    params,
  })
}