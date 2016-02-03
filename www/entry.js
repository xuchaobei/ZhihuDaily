import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createRouter from './routers'
import configureStore from './store/configureStore'


const store = configureStore()

ReactDOM.render( 
	<Provider store={store}>
	   {createRouter()}
	</Provider>, document.getElementById('app'));




