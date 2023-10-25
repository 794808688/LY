export const APP_NAME: string = "zfz-kw-admin"

export interface Config {
  BASENAME?: string

  HOME?: string

  SUCCESS_CODE_200: number

  SUCCESS_CODE_1: number

  SUCCESS_CODE_0: number

  LOGIN_EXPIRE: number

  API_URL: string

  API_URL_IOS: string

  API_URL_CENTER: String

  API_URL_LOCAL: string

  SERVICE_CDN: string

  LOCAL_PATH: string

  UPLOAD_PATH: string

  API_LOGIN: string

  API_AI: string

  API_SOURCE: string

  LIVE_URL: string

  LIVE_PUSH: string

  TOKEN_KEY: string

  USER_KEY: string

  API_URL_EXPER: string

  layout: "side" | "top"

  theme: "dark" | "light"

  fixedHeader: boolean

  contentWidth: "fluid" | "fixed"

  colorWeak: boolean

  title: string

  logo?: string

  LOCAL_SHOP: string

  API_ENTERING: string
}

const AdminConfig: Config = {
  // react-router basename
  BASENAME: "/main-admin",

  //首页
  HOME: "/platform/account",

  // 请求成功状态码
  SUCCESS_CODE_200: 200,
  SUCCESS_CODE_1: 1,
  SUCCESS_CODE_0: 0,

  // 登录过期，或者未登录
  LOGIN_EXPIRE: 401,

  // 统一请求地址
  // API_URL: 'https://edu.zfzcn.com',
  // API_URL: "http://192.168.15.222:8080",
  // API_URL: 'https://sass.zfzcn.com',
  API_URL: 'https://sass.zfzcn.com',
  //调试请求地址
  // API_URL_LOCAL: 'https://edu.zfzcn.com',
  // API_URL_LOCAL: "http://192.168.15.222:8080",
  API_URL_LOCAL: 'http://sass.zfzcn.com',

  //镜像请求地址
  // API_URL_IOS: 'https://sandbox.zfzcn.com',
  // API_URL_IOS: "http://192.168.15.222:8080",
  API_URL_IOS: 'http://sass.zfzcn.com',

  //cdn
  // SERVICE_CDN: 'https://edu.zfzcn.com',
  // SERVICE_CDN: "http://192.168.15.222:8080",
  SERVICE_CDN: 'http://sass.zfzcn.com',

  //接口地址
  // API_URL_CENTER: 'https://edu.zfzcn.com',
  // API_URL_CENTER: "http://192.168.15.222:8080",
  API_URL_CENTER: 'http://sass.zfzcn.com',

  //接口地址
  // API_URL_EXPER: "http://wy.d5.world",
  API_URL_EXPER: 'http://sass.zfzcn.com',

  //接口地址
  // LOCAL_SHOP: "/zfz/edu",
  LOCAL_SHOP: '/api/admin',

  //接口地址
  // LOCAL_PATH: "/zfz/edu/index.php",
  LOCAL_PATH: 'http://sass.zfzcn.com',

  //上传接口地址
  UPLOAD_PATH: "/clsc/Admin/upload.php",

  //登陆请求地址
  // API_LOGIN: "http://192.168.15.222:8080",
  // API_LOGIN: "http://192.168.15.224:8080",
  // API_LOGIN: 'https://edu.zfzcn.com',
  API_LOGIN: 'https://sass.zfzcn.com',

  //ai试卷系统
  API_AI: "https://ai.qjxxpt.com",

  //试题
  API_ENTERING: "/duppt/core/index.php",

  //资源域名
  // API_SOURCE: 'https://edu.zfzcn.com/zfzdata',
  // API_SOURCE: "http://192.168.15.222:8080/zfzdata",
  // API_SOURCE: "http://192.168.15.224:8080/zfzdata",
  API_SOURCE: 'http://sass.zfzcn.com',

  //直播服务
  LIVE_URL: "https://core.d5.world/ugm.php",

  //直播推流链接
  LIVE_PUSH: "rtmp://live-push.d5.world/live/",

  // 本地存储token 的key
  TOKEN_KEY: "Admin_Token_key",

  USER_KEY: "Admin-user-zfzmain",

  // 项目名称
  title: "主控台",

  // logo
  logo: "/qb-admin/logo.png",

  // 默认菜单栏位置
  layout: "side",

  // 默认导航主题颜色
  theme: "dark",

  // 是否固定头部
  fixedHeader: false,

  // 固定宽度或者流式宽度
  contentWidth: "fixed",

  // 是否开启色弱模式
  colorWeak: false,
}

export default AdminConfig
