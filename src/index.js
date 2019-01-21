/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'; // react-router v4
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import App from './pages/App';
import Search from './pages/Search';
import Skills from './pages/Skills';
import configureStore, { history } from './reducers/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/Search" component={Search} />
        <Route path="/Skills" component={Skills} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
