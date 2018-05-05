// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import type { History } from 'history';
import type { Store } from 'redux';

import './globalStyles';
import routes from '../../routes';
import NotFound from '../NotFound';

type Props = {
  history: History,
  store: Store<any, any>
};

const renderRoute = ({
  path, exact, component: Component, ...rest
}) => (
  <Route
    key={path}
    path={path}
    exact={exact}
    render={props => <Component {...props} {...rest} />}
  />
);

const App = ({ history, store }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/404' render={NotFound} />
        {routes.map(renderRoute)}
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
