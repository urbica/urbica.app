import React from 'react';
import { render } from 'react-dom';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createBrowserHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';

import App from './components/App';
import Saga from './components/App/saga';
import reducer from './components/App/reducer';

const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [routerMiddleware, sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger({ collapsed: true }));
}

const store = createStore(reducer, applyMiddleware(...middlewares));
sagaMiddleware.run(Saga);

const root = document.getElementById('root');

render(<App history={history} store={store} />, root);

if (module.hot) {
  module.hot.accept('./components/App/reducer', () => {
    // eslint-disable-next-line
    const nextRootReducer = require('./components/App/reducer');
    store.replaceReducer(nextRootReducer);
  });

  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line
    const NextApp = require('./components/App').default;
    render(<NextApp history={history} store={store} />, root);
  });
}
