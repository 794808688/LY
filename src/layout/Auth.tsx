import React from 'react'
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom'
import store from '../store/index'
import { businessRouteList } from '../routers/utils'
import { getToken, removeToken } from '../utils/cookie'
import { IRoute } from '../routers/config'
import config from '../config/index'
import { connect } from 'react-redux'
import { setUserInfo, UserState } from '~/store/module/user'
import { clearSideBarRoutes } from '~/store/module/app'
import { IStoreState } from '~/store/types'
import { base64_decode } from '~/utils/public'
import LocalStore from '~/utils/store'
import AdminConfig from '../config/index'
import { apiGetSchoolList } from '~/api/service'

interface AuthProps extends RouteComponentProps {
  route: IRoute
  children: React.ReactNode
  init: boolean
  setUserInfo: (userInfo: any) => void
  clearSideBarRoutes: () => void
}

function checkAuth(location: RouteComponentProps['location']): boolean {
  // redux 中的 routes 同时负责渲染 sidebar
  const { flattenRoutes } = store.getState().app

  // 判断当前访问路由是否在系统路由中, 不存在直接走最后默认的 404 路由
  const route = businessRouteList.find((child) => child.path === location.pathname)

  if (!route) {
    return true
  }

  if (route.redirect) {
    return true
  }

  if (route.auth === false) {
    return true
  }

  // 路由存在于系统中，查看该用户是否有此路由权限
  if (!flattenRoutes.find((child: { path: string }) => child.path === location.pathname)) {
    return false
  }

  return true
}

function Auth(props: AuthProps): any {
  const history = useHistory()
  const params = new URLSearchParams(window.location.search)
  const user = params.get('data')
  //console.log(window.location.origin + config.BASENAME + '/class/manage/manage-class?data=' + JSON.stringify(store.getState().user) + '&redirectURL=/class/manage/manage-class&state={"schoolId":101,"schoolName":"光谷校区"}')
  const localUser = LocalStore.getValue<UserState>(AdminConfig.USER_KEY)

  if (localUser?.token) {
    // let u = JSON.parse(user)
    // if (u.uid > 0) {
    //   clearLogin(props)
    //   props.setUserInfo(JSON.parse(user))
    //   const redirectURL = params.get('redirectURL')
    //   if (redirectURL) {
    //     const state: any = params.get('state')
    //     const str: any = state ? JSON.parse(base64_decode(base64_decode(state))) : null
    //     if (str) str.from = true
    //     history.push({ pathname: redirectURL, state: str })
    //   }
    // }
  } else {
    // 未登录
    return (
      <Redirect
        to={`/system/login?redirectURL=${encodeURIComponent(window.location.origin + config.BASENAME + props.location.pathname + props.location.search)}&state=${props.route.home ? props.route.home : '0'}`}
      />
    )
  }

  // if (localUser && localUser.uid && localUser.lv >= 3 && (!localUser.school || localUser.school.length <= 0)) {
  //   getSchoolList(props)
  // }

  // 检查授权
  // if (!checkAuth(props.location)) {

  //   return <Redirect to="/error/403" push />;
  // }

  if (props.route.redirect) {
    return <Redirect to={props.route.redirect!} push />
  }

  return <>{props.children}</>
}

function clearLogin(props: AuthProps) {
  const history = useHistory()
  removeToken()
  props.setUserInfo({
    token: '',
    nickname: '',
    account: '',
    avatar: '',
    mobile: '',
    schoolid: '',
    uid: 0,
    id: 0,
    lv: [],
    role: 0,
    rule: '',
    node: [],
    autonode: 0,
    domain: '',
    school: [],
  })
  props.clearSideBarRoutes()
  history.replace('/system/login')
}

const getSchoolList = async (props: AuthProps) => {
  try {
    let _user: UserState = store.getState().user
    _user.school = []
    // props.setUserInfo(_user)
    //获取校区列表 正式服务需打开
    const res: any = await apiGetSchoolList({})
    if (res.code == 200) {
      _user.school = res.data
      props.setUserInfo(_user)
    }
  } catch (error) { }
}

// export default memo(Auth);
export default connect(({ app }: IStoreState) => ({ init: app.init }), {
  setUserInfo,
  clearSideBarRoutes,
})(Auth)
