import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import classnames from "classnames";

import { IStoreState } from "../../store/types";
import { AppState } from "../../store/module/app";
import { IRoute } from "../../routers/config";
import renderMenu, { renderItemsMenu } from "../SideMenu";
import Logo from "../SidebarLogo";
import { Settings } from "../../store/module/settings";
import { getPagePathList, businessRouteList } from "../../routers/utils";
import AdminConfig from "~/config/index";
import { IRouteConfig } from "~/routers/config";

import "./index.less";

interface LayoutSideBarProps extends Settings {
  sidebar: AppState["sidebar"];
  routes: AppState["routes"];
  init: boolean;
}

function LayoutSideBar({ theme, layout, sidebar, routes }: any) {
  const inlineCollapsed: {
    inlineCollapsed?: boolean;
  } = {};

  if (layout === "side") {
    inlineCollapsed.inlineCollapsed = !sidebar.opened;
  }

  let _pathname: string = "";
  if (
    window.location.pathname === AdminConfig.BASENAME ||
    window.location.pathname === AdminConfig.BASENAME + "/"
  ) {
    _pathname = AdminConfig.BASENAME + "" + AdminConfig.HOME;
  } else _pathname = window.location.pathname;
  const pathname = _pathname;

  const subMenuList = businessRouteList.filter((m: any) => {
    return m.lv && m.lv == 1;
  });
  let substr: any[] = [];
  for (let i = 0; i < subMenuList.length; i++) {
    substr.push(AdminConfig.BASENAME + subMenuList[i].path);
  }

  const [openKeys, setOpenKeys] = useState<any>(
    layout === "side" && sidebar.opened ? getPagePathList(pathname) : []
  );
  const onOpenChange: MenuProps["onOpenChange"] = (keys: any) => {
    // console.log(keys)
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    // console.log(latestOpenKey)
    if (substr.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <aside
      className={classnames(
        "layout__side-bar",
        `layout__side-bar--${theme}`,
        `layout__side-bar--${layout}`,
        {
          "layout__side-bar--close": !sidebar.opened && layout === "side",
        }
      )}
    >
      <div className={`layout__side-bar__logo--${layout}`}>
        <Logo opened={!sidebar.opened} layout={layout} />
      </div>
      <div className="layout__side-bar__menu">
        <Menu
          defaultSelectedKeys={[pathname]}
          selectedKeys={getPagePathList(pathname)}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          defaultOpenKeys={
            layout === "side" && sidebar.opened ? getPagePathList(pathname) : []
          }
          mode={layout === "side" ? "inline" : "horizontal"}
          theme={theme}
          {...inlineCollapsed}
          items={routes.map((menu: IRoute) => renderItemsMenu(menu))}
        />
      </div>
    </aside>
  );
}

function checkKeys(pathkey: string) {
  let pageList = getPagePathList(pathkey);
  console.log(pageList);
  let len: number = pageList.length;
  for (let i: number = len - 1; i >= 0; i--) {
    let pathkey = pageList[i];

    let arr = Object.values(IRouteConfig).filter((item) => {
      if (AdminConfig.BASENAME + item.path === pathkey) return true;
    });

    if (arr.length > 0) {
      return AdminConfig.BASENAME + arr[0].path;
    }
  }
  return "";
}

export default connect(
  ({ settings, app: { sidebar, routes, init } }: IStoreState) => ({
    ...settings,
    sidebar,
    routes,
    init,
  })
)(withRouter(LayoutSideBar));
