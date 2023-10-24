import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { message, Modal } from 'antd'
import AdminConfig from '../config'
import { getToken } from '../utils/cookie'
import { UserState } from '~/store/module/user'
import store from '~/store'
import { nanoid } from 'nanoid'
import qs from 'qs'
import { error_code } from '~/utils/error'
import LocalStore from '~/utils/store'

interface ResponseData<T> {
  code_msg: any
  code: number

  data: T

  msg: string
}

// 指定 axios 请求类型

axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8', //'application/x-www-form-urlencoded;charset=utf-8',
  'zfzkwauthtoken': ''
}
// axios.defaults.withCredentials = false
// axios.defaults.transformRequest = (data) => {
//   data = qs.stringify(data)
//   return data
// }
// 指定请求地址
axios.defaults.baseURL = AdminConfig.API_URL //user.domain ? user.domain : AdminConfig.API_URL;
// if(window.location.href.substr(0,5) == 'https'){
//   axios.defaults.baseURL = axios.defaults.baseURL.replace('https','http')
// }

// 添加请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // console.log(config.headers);
    const token = LocalStore.getValue<UserState>(AdminConfig.USER_KEY)?.token
    // 获取用户token，用于校验
    /* eslint-disable  no-param-reassign */
    if (token) {
      config.headers.zfzkwauthtoken = token;
    }

    // console.log(config);

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// 添加响应拦截器，拦截登录过期或者没有权限

axios.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    if (!response.data) {
      return Promise.resolve(response)
    }
    // else if(response.headers['content-type'] === 'text/csv;charset=utf8') {
    //   return Promise.resolve(response);
    // }

    // 登录已过期或者未登录
    // if (response.data.code === AdminConfig.LOGIN_EXPIRE) {
    //   Modal.confirm({
    //     title: '系统提示',
    //     content: response.data.msg,
    //     okText: '重新登录',
    //     onOk() {
    //       //清除登陆缓存
    //       //跳出登陆状态

    //       window.location.href = `${
    //         window.location.origin
    //       }/zfz-admin/system/login?redirectURL=${encodeURIComponent(window.location.href)}`;
    //     },
    //     onCancel() {},
    //   });

    //   return Promise.reject(new Error(response.data.msg));
    // }

    // 请求成功
    if (
      response.data.code == AdminConfig.SUCCESS_CODE_200 ||
      response.data.code == AdminConfig.SUCCESS_CODE_1 ||
      response.data.code == AdminConfig.SUCCESS_CODE_0 || 10000
    ) {
      return response.data as any
    } else if (response.code == AdminConfig.SUCCESS_CODE_200 || response.code == AdminConfig.SUCCESS_CODE_1 || response.code == AdminConfig.SUCCESS_CODE_0) {
      return response as any
    } else {
      if (response.data.code) {
        if (response.data.code_msg) {
          message.error(response.data.code_msg)
        } else {
          if (response.data.code < 0) {
          } else message.error(response.data.code ? error_code(response.data.code) : 'error')
        }
      }
      return response.data as any
    }

    // 请求成功，状态不为成功时
    // message.error(response.data.code?error_code(response.data.code):'error');

    // return Promise.reject(new Error(response.data.msg?response.data.msg:'error'));
  },
  (error: AxiosError) => {
    message.error(error.message)

    return Promise.reject(error)
  }
)

// 统一发起请求的函数
export function request<T>(options: AxiosRequestConfig, useuid: boolean = true) {
  // const { uid, localstore } = store.getState().user
  if (options.method === 'POST') {
    options.data = { ...options.params }
    options.params = {}
  } else {
    options.params = options.params ? options.params : {}
  }
  // if (useuid) options.params.uid > 0 ? options.params.uid : uid
  // options.params.localstore = localstore
  // options.params.ver = nanoid()

  return axios.request<T>(options)
}
