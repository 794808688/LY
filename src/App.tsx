import React, { Suspense, useEffect } from 'react'
import { Spin } from 'antd'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { IRoute } from './routers/config'
import { layoutRouteList } from './routers/utils'
import config from './config'
import './styles/index.less'
import { useProjectConfig } from './stores'
import { apiGetProjectConfig } from '~/pages/project-config/settings/service'
import store from './store'
import { setHeadFavicon } from './utils/public'
import AdminConfig from '~/config'

export default function App() {
  // const [prjConf, setPrjConf, getPrjConf] = useProjectConfig((state) => [state.prjConf, state.setPrjConf, state.getPrjConf])
  // const user = store.getState().user

  // useEffect(() => {
  //   if (!getPrjConf().logo && !getPrjConf().name) {
  //     getProjectConfig()
  //   } else {
  //     setPrjConf({ ...prjConf, logo: getPrjConf().logo, name: getPrjConf().name })
  //   }
  // }, [])

  // useEffect(() => {
  //   getPrjConf().logo && setHeadFavicon(`${AdminConfig.API_SOURCE + '/' + getPrjConf().logo}`)
  //   if (getPrjConf().name) {
  //     document.title = getPrjConf().name || '沙箱平台'
  //   }
  // }, [prjConf])

  return (
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
      <Router basename={config.BASENAME} >
        <Switch>
          {layoutRouteList.map((route: IRoute) => (
            <Route key={config.BASENAME + route.path} path={route.path} component={route.component}></Route>
          ))}
        </Switch>
      </Router>
    </Suspense>
  )

  /**
   * @description: 获取项目配置
   * @return {type}
   */
  // async function getProjectConfig() {
  //   try {
  //     const res: any = await apiGetProjectConfig({ localstore: user.localstore })
  //     if (res.code && res.code === 200 && res.data) {
  //       setPrjConf({ ...prjConf, logo: res.data.appverpath, name: res.data.appver })
  //     }
  //   } catch (err: any) {
  //     throw new Error(err)
  //   } finally {
  //     // finish
  //   }
  // }
}
