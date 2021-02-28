import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore} from 'redux';
import reducers from './_reducers/reducer';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

const store = createStore(reducers);

ReactGA.initialize('UA-190586417-2');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
