import React from 'react';
import ReactDOM from 'react-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import { createStore } from 'redux';

import App from './App';
import reducer from './reducer';

it('renders / without crashing', () => {
  const url = '/';
  const history = createMemoryHistory();
  history.push(url);

  const store = createStore(reducer);
  const div = document.createElement('div');

  ReactDOM.render(<App history={history} store={store} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
