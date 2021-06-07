import React, { FC, useEffect } from 'react';
import { Link, connect, useLocation, Loading, Dispatch } from 'umi';
import { Menu } from 'antd';
import { GlobalModelState } from '@/models/connect';
import { queryKeysByPath } from '@/utils/utils';
import {
  comprehensionMenus,
  menusSource,
} from '../../../../config/menu.config';

const { SubMenu, Item } = Menu;

export interface BasicLayoutProps {
  global: GlobalModelState;
  loading: boolean;
  dispatch?: Dispatch;
}

const MenuContent: FC<BasicLayoutProps> = ({ global }) => {
  const { menusData } = global;
  let menus = [];
  const location: any = useLocation();
  const { pathname } = location;
  if (
    pathname === '/datas' ||
    pathname === '/label' ||
    pathname === '/annotation'
  ) {
    menus = comprehensionMenus;
  } else {
    menus = menusSource;
  }
  function renderMenu(data: any = []) {
    const rows = Array.isArray(data) ? data : [];
    return rows.map(row => {
      if (row === undefined) return false;
      const { title, link = '', key, children, ...restState } = row;
      if (children && children.length > 0) {
        const subMenu = renderMenu(children);
        return (
          <SubMenu key={key} title={<span>{title}</span>}>
            {subMenu}
          </SubMenu>
        );
      }
      return (
        <Item key={key} title={title}>
          <Link to={{ pathname: link, state: { ...restState, key } }}>
            {/* <Icon type={icon} /> */}
            <span>{title}</span>
          </Link>
        </Item>
      );
    });
  }

  const { openKey, selectKey } = queryKeysByPath(location.pathname);

  return (
    <Menu
      selectedKeys={[selectKey || '']}
      defaultOpenKeys={[openKey]}
      mode="inline"
      theme="dark"
      className="progressbar"
      inlineCollapsed={true}
    >
      {renderMenu(menus)}
    </Menu>
  );
};

export default connect(
  ({ global, loading }: { global: GlobalModelState; loading: Loading }) => ({
    global,
    loading: loading.models.index,
  }),
)(MenuContent);
