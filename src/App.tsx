import React from 'react';
import { Provider } from 'react-redux'
import { GlobalStyle } from './style.js';
import { BrowserRouter } from 'react-router-dom'
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import store from './store'
import Layouts from './pages/layouts/index'
import 'antd/dist/antd.css';


function App() {
  return (
    <div style={{width:'1920px',minWidth:'1250px',margin:'0 auto',height: '100%'}}>
      <GlobalStyle />
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <BrowserRouter>
            <Layouts />
          </BrowserRouter>
        </Provider>
      </ConfigProvider>
    </div>
  );
}

export default App;
