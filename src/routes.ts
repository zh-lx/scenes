import React from 'react';
import lazyload from '@/utils/lazyload';

export type Route = {
  name: string;
  key: string;
  components?: JSX.Element;
  children?: Route[];
};

export const routes: Route[] = [
  {
    name: '多人协作编辑',
    key: 'multiplayer-edit',
    children: [
      {
        name: '版本提示',
        key: 'multiplayer-edit/version-tip',
      },
      {
        name: '编辑锁',
        key: 'multiplayer-edit/edit-lock',
      },
      {
        name: '版本diff',
        key: 'multiplayer-edit/version-diff',
      },
      {
        name: '协同编辑',
        key: 'multiplayer-edit/collaborative-edit',
      },
    ],
  },
];

export const getName = (path: string, routes) => {
  return routes.find((item) => {
    const itemPath = `/${item.key}`;
    if (path === itemPath) {
      return item.name;
    } else if (item.children) {
      return getName(path, item.children);
    }
  });
};

export function getFlattenRoutes(routes) {
  const res = [];
  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.key && !route.children) {
        route.component = lazyload(() => import(`@/scenes/${route.key}`));
        res.push(route);
      } else if (Array.isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    });
  }
  travel(routes);
  return res;
}
