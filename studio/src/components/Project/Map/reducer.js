import { fromJS } from 'immutable';
import createImmutableSelector from 'create-immutable-selector';

export const VIEWPORT_CHANGED = '@MAP/VIEWPORT_CHANGED';
export const changeViewport = viewport => ({
  type: VIEWPORT_CHANGED,
  payload: viewport
});

const initialState = fromJS({
  viewport: {
    altitude: 0,
    bearing: 0,
    latitude: 0,
    longitude: 0,
    pitch: 0,
    zoom: 1
  }
});

export const mapSelector = state => state.get('map');

export const viewportSelector = createImmutableSelector(mapSelector, map => map.get('viewport'));

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case VIEWPORT_CHANGED: {
      return state.update('viewport', previousViewport => previousViewport.merge(payload));
    }
    default:
      return state;
  }
};

export default reducer;
