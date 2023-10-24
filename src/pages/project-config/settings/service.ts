import { request } from "~/api/request"
import AdminConfig from "~/config"

interface GetProjectConfig {
  localstore: string | number
}
/**
 * @description: 获取项目配置
 * @param {GetProjectConfig} params {localstore}
 * @return {type} `${AdminConfig.API_URL}/zfz/edu/StoreRegulate/storeConfiguration`
 */
export function apiGetProjectConfig(params: GetProjectConfig) {
  return request({
    method: "GET",
    url: `${AdminConfig.API_URL}/zfz/edu/StoreRegulate/storeConfiguration`,
    params,
  })
}

interface UpdateProjectConfig {
  localstore: string | number
  uid: string | number
  appver: string | undefined
  appverpath: string | undefined
}
/**
 * @description: 修改项目配置
 * @param {UpdateProjectConfig} params {localstore, uid, appver: 项目名称, appverpath: 项目Logo半地址}
 * @return {type} `${AdminConfig.API_URL}/zfz/edu/StoreRegulate/updateStoreConfiguration`
 */
export function apiUpdateProjectConfig(params: UpdateProjectConfig) {
  return request({
    method: "GET",
    url: `${AdminConfig.API_URL}/zfz/edu/StoreRegulate/updateStoreConfiguration`,
    params,
  })
}
