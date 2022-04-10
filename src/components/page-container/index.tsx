import React from 'react';
import { Layout } from '@arco-design/web-react';
import { Switch, Route } from 'react-router-dom';
import Menus from '@/components/menus';
import { routes, getFlattenRoutes } from '@/routes';

import './index.less';

const Sider = Layout.Sider;
const Content = Layout.Content;

export default function PageContainer() {
  const routeList = getFlattenRoutes(routes);
  return (
    <Layout className="layout-collapse">
      <Sider collapsed={false} collapsible trigger={null} breakpoint="xl">
        <div className="logo" />
        <Menus />
      </Sider>
      <Layout>
        <Layout style={{ padding: '12px 24px' }}>
          <Content>
            <Switch>
              {routeList.map((route) => (
                <Route
                  path={`/${route.key}`}
                  component={route.component}
                  key={route.key}
                  exact={true}
                />
              ))}
              <Route path="*" exact={false} render={() => <div>404</div>} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
