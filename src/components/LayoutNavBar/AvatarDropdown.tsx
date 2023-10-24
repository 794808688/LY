import React, { memo, useCallback } from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, message } from 'antd'
import { connect } from 'react-redux'
// @ts-ignore
import { ClickParam } from 'antd/lib/menu'
import { useHistory } from 'react-router-dom'
import NavDropdown from './NavDropdown'
import { IStoreState } from '../../store/types'
import { clearSideBarRoutes } from '../../store/module/app'
import { setUserInfo, UserState } from '../../store/module/user'
import { removeToken } from '../../utils/cookie'
import AdminConfig from '~/config/index'
import store from '~/store'

interface AvatarDropdownProps {
  avatar?: string
  account: string
  classNames: string
  nickname?: string
  clearSideBarRoutes: () => void
  setUserInfo: (user: UserState) => void
}

function renderManageUser(onMenuClick: (params: ClickParam) => void) {
  const items = [
    // {
    //   key: 'center',
    //   icon: <UserOutlined />,
    //   label: '个人中心',
    // },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ]

  return (
    <Menu onClick={onMenuClick} selectedKeys={[]} items={items} />
  )
}

function AvatarDropdown(props: any) {
  const user = store.getState().user
  const history = useHistory()

  const onMenuClick = useCallback(({ key }: ClickParam) => {
    if (key === 'logout') {
      message.success(key)
      removeToken()
      props.setUserInfo({
        token: '',
        // createtime: 0
      })
      props.clearSideBarRoutes()
      history.replace('/system/login')
    } else if (key === 'settings') {
      history.replace('/account/settings')
    } else if (key === 'center') {
      history.replace('/account/center')
    }
  }, [])

  return (
    <NavDropdown overlay={renderManageUser(onMenuClick)} trigger={['hover']}>
      <div className={props.classNames}>
        <Avatar size="small" className="layout__navbar__avatar" src={user.avatar ? AdminConfig.API_SOURCE + '/' + user.avatar : AdminConfig.BASENAME + '/avatar.png'} alt="avatar" />
        <span className="layout__navbar__account" title={user.nickname ? user.nickname : user.account}>
          {user.nickname ? user.nickname : user.account}
        </span>
      </div>
    </NavDropdown>
  )
}

export default connect(({ user: { avatar, account } }: IStoreState) => ({ avatar, account }), {
  clearSideBarRoutes,
  setUserInfo,
})(memo(AvatarDropdown))
