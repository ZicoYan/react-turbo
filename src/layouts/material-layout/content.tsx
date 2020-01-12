import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import { IMenuItem } from 'src/types/menu';
import Loading from 'src/components/loading';

export interface IContentProps {
  routes: IMenuItem[];
  parentPath?: string;
}

export function getPath(path, parentPath = '') {
  return `${parentPath}/${path}`.replace(/\/+/g, '/');
}

export default function Content({ routes, parentPath = '' }: IContentProps) {
  return (
    <Switch>
      {routes.reduce(
        (result, current) => {
          if ('children' in current && current.children) {
            const path = getPath(current.path, parentPath);
            result.push(
              <Route
                key={path}
                path={path}
                render={() => (
                  <Content routes={current.children} parentPath={path} />
                )}
              />,
            );
          } else if ('component' in current && current.component) {
            const paths: string[] =
              typeof current.path === 'string'
                ? [getPath(current.path, parentPath)]
                : current.path.map(item => getPath(item, parentPath));
            paths.forEach(path => {
              result.push(
                <Route
                  key={path}
                  path={path}
                  exact
                  component={Loadable({
                    loader: () =>
                      import(
                        /* webpackChunkName: "[request][index]" */ `../../pages/${current.component}`
                      ),
                    loading: Loading,
                  })}
                />,
              );
            });
          }
          return result;
        },
        [] as JSX.Element[],
      )}
    </Switch>
  );
}
