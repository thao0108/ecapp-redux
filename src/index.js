import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history'
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './assets/theme'
import App from './App';
import createStore from "./reducks/store/store";
import reportWebVitals from './reportWebVitals';

// 履歴を作成
// history ver5以降はpush機能が使えない@4.10.1
const history = History.createBrowserHistory();

// createStore関数を実行　→　storeが構築される
// historyをstore内で管理
export const store = createStore(history);

// connectedRouterブラウザの遷移・履歴を管理
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
      <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
