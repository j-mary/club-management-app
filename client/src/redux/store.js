import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import loadingReducer from './loadingReducer';
import authenticationReducer from '../features/authentication/reducers/index';

const rootReducer = combineReducers({
  loadingReducer,
  authenticationReducer,
});

const middlewares = [thunk];

const configureStore = () => {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
};

export default configureStore;
