import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
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

