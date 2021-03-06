import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import mainReducer from '../reducers/MainReducer';
import newsDetailReducer from '../reducers/NewsDetailReducer';

const loggerMiddleware = createLogger({
  tateTransformer: state => state.toJSON()
});

// 发布时不使用loggerMiddleware
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

const reducer = combineReducers({ mainReducer, newsDetailReducer });

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}

