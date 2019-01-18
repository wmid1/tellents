/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'; // react-router v4
import { ConnectedRouter } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import * as serviceWorker from './serviceWorker';
import App from './pages/App';
import Search from './pages/Search';
import Skills from './pages/Skills';
import configureStore, { history } from './reducers/configureStore';

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/Search" component={Search} />
          <Route path="/Skills" component={Skills} />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
