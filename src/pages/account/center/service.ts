import { request } from '~/api/request';
import AdminConfig from '~/config';
import { QueryListResponseData, PageQueryParams } from '~/typings'

interface GetRole {
  authid?: number;
  sname?: string;
  auth?: string;
}
/**
 * @description:获取角色列表 
 * @param {any} params
 * @return {*}
 */
// export function apiGetRole(params?: GetRole) {
//   return request({
//     method: 'GET',
//     url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/index.php?mod=0&do=16',
//     params,
//   });
// }
export function apiGetRole(params?: any) {
  return request({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_PATH + '?mod=0&do=203',
    params,
  });
}
interface ChangeUserinfo {
  tid?: number;
  nickname?: string;
  realname?: string;
  avatar?: string;
  tel?: string | number;
  classid?: string | number;
  schoolid?: string | number;
  sex?: string | number;
  age?: string | number;
  cardtype?: string | number;
  card?: string | number;
}
/**
 * @description:修改用户信息
 * @param {any} params
 * @return {*}
 */
export function apiChangeUserinfo(params?: ChangeUserinfo) {
  return request({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/index.php?mod=0&do=45',
    params,
  });
}

/**
 * @description:发送短信验证码
 * @param {any} params
 * @return {*}
 */
export function apigetCode(params: any) {
  return request({
    method: 'GET',
    url: AdminConfig.API_URL + `/yhwc/interface/sms/sendSms.php`,
    params,
  });
}

interface Changecellphone {
  uid?: string | number;
  phone?: string | number;
  code?: string | number;
  time?: string | number;
  sign?: string;
}
/**
 * @description:修改手机号
 * @param {any} params
 * @return {*}
 */
export function apiChangecellphone(params?: Changecellphone) {
  return request({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/index.php?mod=1&do=107',
    params,
  });
}

/**
 * @description:修改密码
 * @param {any} params
 * @return {*}
 */
export function apiChangepassword(params?: any) {
  return request({
    method: 'GET',
    url: AdminConfig.API_URL + AdminConfig.LOCAL_SHOP + '/index.php?mod=1&do=104',
    params,
  });
}



