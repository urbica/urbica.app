import { fromJS } from 'immutable';
import createImmutableSelector from 'create-immutable-selector';

const initialState = null;

export const FETCH_PROJECT_REQUEST = '@PROJECT/FETCH_PROJECT_REQUEST';
export const FETCH_PROJECT_SUCCESS = '@PROJECT/FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE = '@PROJECT/FETCH_PROJECT_FAILURE';
export const fetchProject = projectId => ({
  type: FETCH_PROJECT_REQUEST,
  payload: projectId
});

export const projectSelector = state => state.get('project');

export const teamSelector = createImmutableSelector(projectSelector, project =>
  project.get('team'));

export const styleSelector = createImmutableSelector(teamSelector, team =>
  team.get('styles').first());

export const accessTokenSelector = createImmutableSelector(teamSelector, team =>
  team.get('mapbox_access_token'));

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PROJECT_SUCCESS: {
      return fromJS(payload);
    }
    default:
      return state;
  }
};

export default reducer;
