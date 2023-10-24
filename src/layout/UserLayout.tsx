import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, Link } from 'react-router-dom';
import { Spin, Result, Button, Layout, Typography } from 'antd';
import { getPageTitle, systemRouteList } from '../routers/utils';
import { IRoute } from '../routers/config';
import './UserLayout.less';
import zfzlogo1 from '../assets/img/zfzlogo1.png'
import zfzlogo2 from '../assets/img/zfzlogo2.png'

interface UserLayoutState {
  isError: boolean;
}

class UserLayout extends React.PureComponent<any, UserLayoutState> {
  state: UserLayoutState = {
    isError: false,
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch() {
    // 上报错误
  }

  render() {
    if (this.state.isError) {
      return (
        <Result
          status="warning"
          title="系统错误，请联系管理员"
          extra={
            <Button type="primary" key="console">
              Go Contact
            </Button>
          }
        />
      );
    }

    const title = getPageTitle(systemRouteList);

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" user-layout-content={title} />
        </Helmet>

        <div className="user-layout-container">
          <div className='user-layout-head'>
            <div className='user-layout-head-left'>
              <div className='zfzlogo1'>
                <img src={zfzlogo1} />
              </div>
              <div className='zfzlogo2'>
                <img src={zfzlogo2} />
              </div>
            </div>
            <div className='user-layout-head-right'>造风者题库管理</div>
          </div>
          <div className="user-layout-content">
            <div className="user-layout-top">
              <Typography.Title className="header">
                {/* <Link to="/">
                  <span className="user-layout-title">造风者教育平台</span>
                </Link> */}
              </Typography.Title>
              {/* <div className="desc">你就是这条街最靓的仔</div> */}
            </div>
            <Suspense fallback={<Spin className="layout__loading" size="large" />}>
              <Switch>
                {systemRouteList.map((menu: IRoute) => (
                  <Route exact key={menu.path} path={menu.path} component={menu.component}></Route>
                ))}
              </Switch>
            </Suspense>
          </div>
          {/* <Layout.Footer style={{ textAlign: 'center' }}>
            
          </Layout.Footer> */}
        </div>
      </>
    )
  }
}

export default UserLayout;
