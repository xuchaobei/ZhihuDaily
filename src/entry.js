import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createRouter from './routers';
import configureStore from './store/configureStore';

require('./css/index.less');

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    {createRouter()}
  </Provider>, document.getElementById('app'));

