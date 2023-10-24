import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuOutlined,
  UserOutlined,
  TeamOutlined,
  DashboardOutlined,
  ReadOutlined,
  HomeOutlined,
  UserSwitchOutlined,
  StarOutlined,
  TagOutlined,
  ScheduleOutlined,
  EditOutlined,
  LineChartOutlined,
  BankOutlined,
  WalletOutlined,
  AppstoreOutlined,
  PicLeftOutlined,
  PartitionOutlined,
  FileProtectOutlined,
  AppstoreAddOutlined,
  UsergroupAddOutlined,
  DesktopOutlined,
  ToolOutlined,
  ContainerOutlined,
  FundProjectionScreenOutlined,
  ProfileOutlined,
} from '@ant-design/icons'
import { IRoute, IRouteMeta } from '../../routers/config'
import './index.less'
import config from '../../config'

const iconMap: { [prop: string]: any } = {
  MenuUnfoldOutlined: <MenuUnfoldOutlined />,
  MenuOutlined: <MenuOutlined />,
  UserOutlined: <UserOutlined />,
  TeamOutlined: <TeamOutlined />,
  DashboardOutlined: <DashboardOutlined />,
  ReadOutlined: <ReadOutlined />,
  HomeOutlined: <HomeOutlined />,
  UserSwitchOutlined: <UserSwitchOutlined />,
  StarOutlined: <StarOutlined />,
  TagOutlined: <TagOutlined />,
  ScheduleOutlined: <ScheduleOutlined />,
  EditOutlined: <EditOutlined />,
  LineChartOutlined: <LineChartOutlined />,
  BankOutlined: <BankOutlined />,
  WalletOutlined: <WalletOutlined />,
  AppstoreOutlined: <AppstoreOutlined />,
  PicLeftOutlined: <PicLeftOutlined />,
  PartitionOutlined: <PartitionOutlined />,
  SecurityScanOutlined: <AppstoreAddOutlined />,
  FileProtectOutlined: <FileProtectOutlined />,
  UsergroupAddOutlined: <UsergroupAddOutlined />,
  DesktopOutlined: <DesktopOutlined />,
  ToolOutlined: <ToolOutlined />,
  ContainerOutlined: <ContainerOutlined />,
  FundProjectionScreenOutlined: <FundProjectionScreenOutlined />,
  ProfileOutlined: <ProfileOutlined />,
}

function renderTitle(meta: IRouteMeta) {
  /* eslint-disable no-confusing-arrow */
  return (
    <span className="menu-item-inner">
      {meta.icon && iconMap[meta.icon]}
      <span className="menu-title"> {meta.title} </span>
    </span>
  )
}

function renderMenuRoute(menu: IRoute) {
  return (
    <Menu.Item key={config.BASENAME + menu.path}>
      <Link to={menu.path}>{renderTitle(menu.meta)}</Link>
    </Menu.Item>
  )
}

function renderSubMenu(menu: IRoute) {
  return (
    <Menu.SubMenu title={renderTitle(menu.meta)} key={config.BASENAME + menu.path}>
      {menu.children!.map((item: IRoute) => (item.children ? renderSubMenu(item) : renderMenuRoute(item)))}
    </Menu.SubMenu>
  )
}

function renderMenu(menu: IRoute) {
  if (menu.children) {
    return renderSubMenu(menu)
  }

  return renderMenuRoute(menu)
}

/* =======================解决旧版 Antd 的 Menu 警告====================== */
function renderItemsTitle(meta: IRouteMeta) {
  return (
    <span className="menu-item-inner">
      {meta.icon && iconMap[meta.icon]}
      <span className="menu-title"> {meta.title} </span>
    </span>
  )
}

function renderItemsMenuRoute(menu: IRoute) {
  const newObj: any = {
    key: config.BASENAME + menu.path,
    label: <Link to={menu.path}>{renderItemsTitle(menu.meta)}</Link>,
  }

  return newObj
}

function renderItemsSubMenu(menu: IRoute) {
  const newObj: any = {
    key: config.BASENAME + menu.path,
    label: renderItemsTitle(menu.meta),
    children: menu.children!.map((item: IRoute) => (item.children ? renderItemsSubMenu(item) : renderItemsMenuRoute(item))),
  }

  return newObj
}

export function renderItemsMenu(menu: IRoute) {
  if (menu.children) {
    return renderItemsSubMenu(menu)
  }

  return renderItemsMenuRoute(menu)
}

export default renderMenu
