import React, { memo } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { IRoute } from '../routers/config'
import { IStoreState } from '../store/types'
import TransitionMain from '../components/TransitionMain'
import { setSideBarRoutes } from '../store/module/app'
import MenuList from '../config/menu.json'
import { isDuration } from 'moment'
import LocalStore from '~/utils/store'
import { UserState } from '~/store/module/user'
import AdminConfig from '~/config'
import { Redirect } from 'react-router-dom'

/**
 * 本地菜单配置
 * 动态菜单服务需打开AsyncRoutes内获取菜单接口
 */
const { MENUS } = MenuList
export interface Menu {
  id?: number;

  name: string;

  url: string;

  icon: string;

  desc?: string;

  sort: number;

  parentId: number;

  level: number;

  parent?: Menu;

  children?: Menu[];

  parentIds?: number[];
}
interface AsyncRoutesProps {
  children: React.ReactNode
  init: boolean
  setSideBarRoutes: (routes: IRoute[]) => void
}

function formatMenuToRoute(menus: Menu[], ids: string): IRoute[] {
  const result: IRoute[] = []
  menus.forEach((menu) => {
    if (ids && ids.indexOf(menu.id + '') != -1) {
      const route: IRoute = {
        path: menu.url,
        meta: {
          title: menu.name,
          icon: menu.icon,
        },
      }
      if (menu.children) {
        route.children = formatMenuToRoute(menu.children, ids)
      }
      result.push(route)
    }
  })

  return result
}

function AsyncRoutes(props: AsyncRoutesProps) {
  if (!props.init) {
    //本地菜单配置
    // props.setSideBarRoutes(formatMenuToRoute(MENUS, '10200,10201,10202,10400,10401,10402,10403,10404,10500,10501,10502,10503,10600,10601,10700,10701,10702,10703,10704,10705,10800,10801,10802,10900,10901,10902'));
    // return <Spin className="layout__loading" size="large" />
    //服务获取菜单及权限
    const localUser = LocalStore.getValue<UserState>(AdminConfig.USER_KEY)
    if (!localUser || !localUser.token || !localUser.authmod) {
      return <Redirect to={`/system/login`} />
    } else {
      // apiGetMenuList()
      //   .then((res: any) => {
      //     if (res.code == 1)
      //       props.setSideBarRoutes(formatMenuToRoute(res.data,localUser.auth));
      //   })
      //   .catch(() => { });
      // console.log(LocalStore.getValue<UserState>(AdminConfig.USER_KEY))
      let ids = localUser.authmod.split(',')
      // let ids: any = '10000,10100,10101,10102,10103,10104,10200,10201,10202,10203,10204,10205,10206,10207,10208,10209,10300,10301,10302,10303,10304,10305,10306,10307'.split(',')
      localUser.authmod.split(',')?.map((item: any, index: number) => {
        let r: number = item % 100,
          s: number = parseInt(item) - r,
          i: number = localUser.authmod.indexOf(s + '')
        if (i == -1) {
          ids.push(s + '')
        }
      })
      props.setSideBarRoutes(formatMenuToRoute(MENUS, ids && ids.sort().join(',')))
      return <Spin className="layout__loading" size="large" />
    }
  }

  return <TransitionMain>{props.children}</TransitionMain>
}

export default connect(({ app }: IStoreState) => ({ init: app.init }), { setSideBarRoutes })(memo(AsyncRoutes))
