import React, { useContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Layout, Icon, Spin } from 'antd';
import flatten from 'lodash/flatten';

import SiderMenu from './components/sider-menu';
import GlobalContext from 'src/context/global';
import { IMenuConfig } from 'src/types/menu';

import TopMenu from "./components/top-menu";
const s = require('./styles.less');

const { Header, Sider, Content } = Layout;

// @ts-ignore
function generatorRoutes(menu: IMenuConfig[]) {
  return flatten(
    menu.map(menuItem => {
      if (menuItem.children) {
        return generatorRoutes(menuItem.children as IMenuConfig[]);
      }
      return (
        <Route
          key={menuItem.route}
          exact
          path={menuItem.route}
          component={Loadable({
            loader: () => import(/* webpackChunkName: "[request][index]" */`../../pages/${menuItem.component}`),
            loading: () => <Spin spinning />,
          })}
        />
      );
    })
  );
}

const BasicLayout: React.FC<{}> = () => {
  const { menu } = useContext(GlobalContext);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const onToggle = () => {
    setIsCollapsed(current => !current);
  };

  return (
    <Layout className={s.wrap}>
      <Sider trigger={null} collapsible collapsed={isCollapsed}>
        <div className={s.logo} />
        <SiderMenu />
      </Sider>
      <Layout>
        <Header className={s.header}>
          <Icon
            className={s.trigger}
            type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={onToggle}
          />
          <TopMenu />
        </Header>
        <Content className={s.content}>
          <Switch>{generatorRoutes(menu)}</Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
