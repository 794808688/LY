import { request } from '~/api/request'
import AdminConfig from '~/config'

export interface SkillClassificationDataParamsType {}
/**
 * @description: 获取Menu技能分类列表
 * @param {SkillClassificationDataParamsType} params
 * @return {*}
 */
export function apiGetSkillClassificationListData(params: SkillClassificationDataParamsType) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP+'/index.php?mod=0&do=20',
    params,
  })
}

export interface ThematicClassificationDataParamsType {}
/**
 * @description: 获取Menu专题分类列表
 * @param {ThematicClassificationDataParamsType} params
 * @return {*}
 */
export function apiGetThematicClassificationListData(params: ThematicClassificationDataParamsType) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP+'/index.php?mod=0&do=27',
    params,
  })
}

export interface TagClassificationDataParamsType {}
/**
 * @description: 获取Menu标签分类列表
 * @param {TagClassificationDataParamsType} params
 * @return {*}
 */
export function apiGetTagClassificationListData(params: TagClassificationDataParamsType) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP+'/index.php?mod=0&do=25',
    params,
  })
}

export interface CloudResourceLibraryDataParamsType {
  jobtype: number | string
  subject: number | string
  tag: number | string
  per?: number | string
  page?: number | string
}
/**
 * @description: 获取云资源库显示列表
 * @param {CloudResourceLibraryDataParamsType} params
 * @return {*}
 */
export function apiGetCloudResourceLibraryListData(params: CloudResourceLibraryDataParamsType) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP+'/index.php?mod=9&do=907',
    params,
  })
}

export interface SpecialResourceDataParamsType {
  icloud?: number | string
  icloud_gid?: number | string
  page?: number
  per?: number
  title?: string
}
/**
 * @description: 获取专题资源 Menu 数据、资源数据
 * @param {SpecialResourceDataParamsType} params
 * @return {*}
 */
export function apiGetSpecialResourceData(params: SpecialResourceDataParamsType) {
  return request<any>({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP+'/index.php?mod=9&do=911',
    params,
  })
}
