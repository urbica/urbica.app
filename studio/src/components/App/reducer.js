import { combineReducers } from 'redux-immutable';

import mapReducer from '../Project/Map/reducer';
import routerReducer from './routerReducer';
import projectReducer from '../Project/reducer';
import uiReducer from './uiReducer';

const reducer = combineReducers({
  map: mapReducer,
  project: projectReducer,
  router: routerReducer,
  ui: uiReducer
});

export default reducer;
