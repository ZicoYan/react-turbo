import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom';
import GlobalContext from 'src/context/global';
import BasicLayout from 'src/layouts/basic-layout';

import menu from './menu';

const { Provider: GlobalProvider } = GlobalContext;

function App() {
  return (
    <GlobalProvider value={{ menu }}>
      <HashRouter>
        <BasicLayout />
      </HashRouter>
    </GlobalProvider>
  );
}

ReactDom.render(<App />, document.getElementById('app'));
