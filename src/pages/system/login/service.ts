import { request } from '~/api/request';
import AdminConfig from '~/config';

export function apiUserLogin(params: any) {
  return request<any>({
    method: 'POST',
    url: AdminConfig.API_LOGIN + AdminConfig.LOCAL_SHOP + '/login',
    params,
  });
}