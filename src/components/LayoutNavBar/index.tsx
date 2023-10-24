import React, { useCallback, memo, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IStoreState } from '../../store/types';
import { AppState, updateSideBar } from '../../store/module/app';
import { Settings } from '../../store/module/settings';
import './index.less';
import Hamburger from '../Hamburger';
import Breadcrumb from '../Breadcrumb';
import NavBarItem from './NavBarItem';
import NoticeIcon from '../NoticeIcon';
import AvatarDropdown from './AvatarDropdown';
import NodeList from './NodeList';
import { Avatar, Badge, Dropdown, Menu, Space, Tabs } from 'antd';
import BadgeDropdown from './BadgeDropdown';
import { AppstoreOutlined, FullscreenExitOutlined, FullscreenOutlined, SettingOutlined } from '@ant-design/icons';
import LayoutSettings from '../LayoutSettings';

interface LayoutNavBarProps extends AppState {
  avatar: string | undefined;

  layout: Settings['layout'];

  theme: Settings['theme'];

  ActionUpdateSideBar: (sidebar: AppState['sidebar']) => void;
}

function LayoutNavBar({ sidebar, ActionUpdateSideBar, layout, theme }: LayoutNavBarProps) {
  const [Screen, setScreen] = React.useState(true)
  const onTrigger = useCallback(() => {
    ActionUpdateSideBar({
      ...sidebar,
      opened: !sidebar.opened,
    });
  }, [sidebar, ActionUpdateSideBar])

  const onHelpItemClick = useCallback(() => {
    window.open('https://github.com/landluck/react-ant-admin')
  }, [])

  const [isopen, setisopen] = useState(false)

  const getisopen = () => {
    if (isopen) {
      setisopen(false)
    } else {
      setisopen(true)
    }
  }

  const onVisibleClick = () => {
    setisopen(false)
  }
  //浏览器全屏
  function fullScreen() {
    // documentElement 属性以一个元素对象返回一个文档的文档元素

    if (Screen) {
      document.documentElement.requestFullscreen()
      setScreen(false)
    } else {
      document.exitFullscreen()
      setScreen(true)
    }
    // console.log(document.fullscreenElement) 
    // console.log('状态',window.screen.height ,document.body.scrollHeight) 
  }

  window.onresize = function () {
    if(document.body.clientWidth<=1100) {
      ActionUpdateSideBar({
        ...sidebar,
        opened: false,
      })
    }else if(document.body.clientWidth>1100) {
      ActionUpdateSideBar({
        ...sidebar,
        opened: true,
      })
    } 
  }
  return (
    <div className="layout__navbar">
      {layout === 'side' && (
        <div className="layout__navbar__nav">
          <Hamburger isActive={sidebar.opened} onTrigger={onTrigger} />
          <Breadcrumb />
        </div>
      )}
      <div className="layout__navbar__menu">
        {/* 消息通知 */}
        {/* <BadgeDropdown/> */}

        {/* 搜索暂时不做 */}
        {/* <Search></Search> */}
        {/* <NavBarItem
          className={classNames('layout__navbar__menu-item', `layout__navbar__menu-item--${theme}`)}
          onClick={onHelpItemClick}
          icon="github"
          count={0}
        ></NavBarItem> */}
        {/* <NoticeIcon /> */}
        {/* <NodeList  /> */}
        <AvatarDropdown
          classNames={classNames(
            'layout__navbar__menu-item',
            `layout__navbar__menu-item--${theme}`,
          )}
        />
        {Screen ? <FullscreenOutlined style={{ margin: '0 10px' }} onClick={() => fullScreen()} /> : <FullscreenExitOutlined style={{ margin: '0 10px' }} onClick={() => fullScreen()} />}

        <SettingOutlined onClick={getisopen} style={{ margin: '0 20px' }} />

      </div>
      <LayoutSettings open={isopen} onVisibleClick={onVisibleClick} />
    </div>
  );
}

export default connect(
  ({ app, user: { avatar }, settings: { layout, theme } }: IStoreState) => ({
    ...app,
    avatar,
    layout,
    theme,
  }),
  {
    ActionUpdateSideBar: updateSideBar,
  },
)(memo(LayoutNavBar));
