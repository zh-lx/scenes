import React from 'react';
import { Menu } from '@arco-design/web-react';
import { Link } from 'react-router-dom';
import { routes } from '@/routes';
import './index.less';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function renderMenus(currentRoutes, currentMenus) {
  currentRoutes.forEach((route) => {
    const { key, name, children } = route;
    if (Array.isArray(children)) {
      const subMenu = (
        <SubMenu key={key} title={name}>
          {renderMenus(children, [])}
        </SubMenu>
      );
      currentMenus.push(subMenu);
    } else {
      const menuItem = (
        <Link to={`/${key}`} key={key}>
          <MenuItem key={key}>{name}</MenuItem>
        </Link>
      );
      currentMenus.push(menuItem);
    }
  });
  return currentMenus;
}

export default function Menus() {
  return (
    <Menu levelIndent={12} style={{ width: '100%' }}>
      {renderMenus(routes, [])}
    </Menu>
  );
}
