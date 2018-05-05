// @flow

import Immutable from 'immutable';
import createImmutableSelector from 'create-immutable-selector';
import { matchPath } from 'react-router-dom';
import { LOCATION_CHANGE } from 'react-router-redux';

import routes from '../../routes';

type LocationChangeAction = { type: LOCATION_CHANGE, payload: any };

type Location = {
  pathname: string
};

export type RouterState = Immutable.Map<string, ?Location>;

const initialState: RouterState = Immutable.Map({
  location: null
});

export const routerSelector = (state: Object) => {
  const routerState: RouterState = state.get('router', initialState);
  return routerState;
};

export const routerParamsSelector = createImmutableSelector(
  routerSelector,
  (router: RouterState) => {
    const location = router.get('location');

    if (!location) {
      return {};
    }

    const activeRoute = routes.find(route => matchPath(location.pathname, route)) || {};
    const match = matchPath(location.pathname, activeRoute);
    return match.params || {};
  }
);

const reducer = (state: RouterState = initialState, { type, payload }: LocationChangeAction) => {
  if (type === LOCATION_CHANGE) {
    return state.set('location', payload);
  }

  return state;
};

export default reducer;
