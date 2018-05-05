import { push } from 'react-router-redux';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as api from '../../api/';
import * as actions from './reducer';

function* fetchProject({ payload: projectId }) {
  try {
    const project = yield call(api.fetchProject, projectId);
    yield put({ type: actions.FETCH_PROJECT_SUCCESS, payload: project });
  } catch (error) {
    if (error.status === 404) {
      yield put(push('/404'));
    } else {
      yield put({ type: actions.FETCH_PROJECT_FAILURE, payload: error });
    }
  }
}

function* Saga() {
  yield all([takeLatest(actions.FETCH_PROJECT_REQUEST, fetchProject)]);
}

export default Saga;
