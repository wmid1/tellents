import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
};
const rootHistory = createRootReducer(history);
const persistedReducer = persistReducer(persistConfig, rootHistory);

export default function configureStore() {
  const store = createStore(
    connectRouter(history)(persistedReducer), // root reducer with router state
    compose(applyMiddleware(routerMiddleware(history))),
  );

  return store;
}
