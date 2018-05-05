import { fromJS } from 'immutable';
import createImmutableSelector from 'create-immutable-selector';

export const TOGGLE_SOURCE_FORM = '@UI/TOGGLE_SOURCE_FORM';
export const toggleSourceForm = visibility => ({
  type: TOGGLE_SOURCE_FORM,
  payload: visibility
});

export const TOGGLE_LAYER_FORM = '@UI/TOGGLE_LAYER_FORM';
export const toggleLayerForm = visibility => ({
  type: TOGGLE_LAYER_FORM,
  payload: visibility
});

const initialState = fromJS({
  showSourceForm: false,
  showLayerForm: false
});

export const uiSelector = state => state.get('ui');

export const showSourceFormSelector = createImmutableSelector(uiSelector, ui =>
  ui.get('showSourceForm'));

export const showLayerFormSelector = createImmutableSelector(uiSelector, ui =>
  ui.get('showLayerForm'));

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_SOURCE_FORM: {
      return state.set('showSourceForm', payload);
    }
    case TOGGLE_LAYER_FORM: {
      return state.set('showLayerForm', payload);
    }
    default:
      return state;
  }
};

export default reducer;
