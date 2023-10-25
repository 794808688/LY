import * as React from "react"

export interface IRouteBase {
  // 路由路径
  path: string
  // 路由组件
  component?: any
  // 302 跳转
  redirect?: string
  // 路由信息
  meta: IRouteMeta
  // 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean
  //一级路由
  lv?: number
  //是否需要参数
  home?: number | string
}

export interface IRouteMeta {
  title: string
  icon?: string
}

export interface IRoute extends IRouteBase {
  children?: IRoute[]
}

/**
 * 路由常量信息
 */
export const IRouteConfig = {
  //系统路由
  system: {
    path: "/system",
    to: "/system",
    title: "系统",
  },
  login: {
    path: "/system/login",
    to: "/system/login",
    title: "登陆",
  },
  register: {
    path: "/system/register",
    to: "/system/register",
    title: "注册",
  },
  registerResult: {
    path: "/system/register-result",
    to: "/system/register-result",
    title: "注册结果",
  },
  recoveryPwd: {
    path: "/system/recovery-pwd",
    to: "/system/recovery-pwd",
    title: "重置密码",
  },

  // 个人空间
  business: {
    path: "/",
    to: "/",
    title: "业务路由",
  },
  home: {
    path: "/home",
    to: "/home",
    title: "首页",
  },
  homePage: {
    path: "/home/index",
    to: "/home/index",
    title: "数据总览",
  },

  auth: {
    path: "/auth",
    to: "/auth",
    title: "系统管理",
  },
  menu: {
    path: "/auth/menu",
    to: "/auth/menu",
    title: "菜单管理",
  },
  role: {
    path: "/auth/role",
    to: "/auth/role",
    title: "角色管理",
  },
  user: {
    path: "/auth/user",
    to: "/auth/user",
    title: "用户管理",
  },


  //error
  error: {
    path: "/error",
    to: "/error",
    title: "错误页面",
  },
  error404: {
    path: "/error/404",
    to: "/error/404",
    title: "页面不存在",
  },
  error403: {
    path: "/error/403",
    to: "/error/403",
    title: "暂无权限",
  },
  errorDefault: {
    path: "/*",
    to: "/*",
    title: "错误页面",
  },
//试题管理
testQuestions: {
  path: "/questionbank/topic/testQuestions",
  to: "/questionbank/topic/testQuestions",
  title: "试题管理",
},


}

/**
 * routes 第一级路由负责最外层的路由渲染，比如 userLayout 和 Layout 的区分
 * 所有系统内部存在的页面路由都要在此地申明引入，而菜单栏的控制是支持异步请求控制的
 */

const routes: IRoute[] = [
  {
    path: "/system",
    component: React.lazy(() => import("~/layout/UserLayout")),
    meta: {
      title: "系统路由",
    },
    redirect: "/system/login",
    children: [
      {
        path: "/system/login",
        component: React.lazy(() => import("~/pages/system/login")),
        meta: {
          title: "登录",
        },
      },
      {
        path: "/system/register",
        component: React.lazy(() => import("~/pages/system/register")),
        meta: {
          title: "注册",
        },
      },
      {
        path: "/system/register-result",
        auth: false,
        component: React.lazy(() => import("~/pages/system/registerResult")),
        meta: {
          title: "注册结果",
        },
      },
      {
        path: "/system/recovery-pwd",
        auth: false,
        component: React.lazy(() => import("~/pages/system/recoveryPwd")),
        meta: {
          title: "重置密码",
        },
      },
    ],
  },
  {
    path: "/",
    component: React.lazy(() => import("~/layout/index")),
    meta: {
      title: "业务路由",
    },
    redirect: "/platform/account",
    children: [
      //个人中心
      {
        path: "/account/center",
        lv: 1,
        component: React.lazy(() => import("~/pages/account/center/index")),
        meta: {
          title: "",
          icon: "",
        },
      },
      //个人用户信息
      {
        path: "/account",
        meta: {
          title: "用户中心",
          icon: "setting",
        },
        lv: 1,
        redirect: "/account/settings",
        children: [
          {
            path: "/account/settings",
            meta: {
              title: "个人设置",
              icon: "setting",
            },
            component: React.lazy(() => import("~/pages/account/settings")),
          },
          {
            path: "/account/center",
            meta: {
              title: "个人中心",
              icon: "center",
            },
            component: React.lazy(() => import("~/pages/account/center")),
          },
        ],
      },

      // 系统管理
      {
        path: "/platform",
        meta: {
          title: "系统管理",
        },
        lv: 1,
        redirect: "/platform/account",
        children: [
          {
            path: "/platform/account",
            meta: {
              title: "账号维护",
            },
            component: React.lazy(() => import("~/pages/platform/account")),
          },
          {
            path: "/platform/role",
            meta: {
              title: "角色维护",
            },
            component: React.lazy(() => import("~/pages/platform/role")),
          },
          {
            path: "/platform/storeswiper",
            meta: {
              title: "首页轮播",
            },
            component: React.lazy(() => import("~/pages/platform/storeswiper")),
          },
          {
            path: "/platform/advertising-notice",
            meta: {
              title: "通知",
            },
            component: React.lazy(() => import("~/pages/platform/advertising-notice")),
          },
          {
            path: "/platform/userResourceAdministration",
            meta: {
              title: "用户资源维护",
            },
            component: React.lazy(() => import("~/pages/platform/userResourceAdministration")),
          },
          
        ],
      },
      {
        path: "/project-config",
        meta: {
          title: "项目设置",
        },
        lv: 1,
        redirect: "/project-config/settings",
        children: [
          {
            path: "/project-config/settings",
            meta: {
              title: "基本设置",
            },
            component: React.lazy(() => import("~/pages/project-config/settings")),
          },
        ],
      },
      {
        path: "/basic-information",
        meta: {
          title: "应用维护",
        },
        lv: 1,
        redirect: "/basic-information/assessor-maintenance",
        children: [
          {
            path: "/basic-information/work-grade",
            meta: {
              title: "应用管理",
            },
            component: React.lazy(() => import("~/pages/basic-information/work-grade")),
          },
          {
            path: "/basic-information/conditions-maintenance",
            meta: {
              title: "模块管理",
            },
            component: React.lazy(() => import("~/pages/basic-information/conditions-maintenance")),
          },
        ],
      },
    ],
  },

  // 以下的路由改动请小心，涉及权限校验模块
  {
    path: "/error",
    meta: {
      title: "错误页面",
    },
    redirect: "/error/404",
    children: [
      {
        path: "/error/404",
        auth: false,
        component: React.lazy(() => import("~/pages/error/404")),
        meta: {
          title: "页面不存在",
        },
      },
      {
        path: "/error/403",
        auth: false,
        component: React.lazy(() => import("~/pages/error/403")),
        meta: {
          title: "暂无权限",
        },
      },
    ],
  },
  {
    path: "/*",
    meta: {
      title: "错误页面",
    },
    redirect: "/error/404",
  },
]

export default routes
