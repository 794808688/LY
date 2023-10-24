import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import zhCN from 'antd/lib/locale/zh_CN'
import App from './App'
import store from './store'
import themeLists from '~/styles/themes/lists'

import './index.css'
import './styles/quick-style/index.scss'
import './styles/themes/theme-vars/index.scss'
import './styles/themes/theme-ant-design/index.scss'
import './styles/themes/theme-public.scss'
import './styles/animations/index.scss'

// import moment from 'moment';
import 'moment/dist/locale/zh-cn'
import config from './config'
// import * as serviceWorker from './serviceWorker';

// moment.locale('zh-cn');

// if (process.env.NODE_ENV === 'production') {
//   const host = new URL(window.location.href).origin
//   config.API_URL = config.API_URL_LOCAL = host
//   console.log(host)
// }

// 主题加载
// @ts-ignore
document.body.dataset.theme = !localStorage.getItem('theme') ? themeLists[0].key : localStorage.getItem('theme')

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)

// serviceWorker.register();
