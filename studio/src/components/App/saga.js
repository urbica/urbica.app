import { all, fork } from 'redux-saga/effects';
import ProjectSaga from '../Project/saga';

const sagas = [ProjectSaga];

function* Saga() {
  yield all(sagas.map(saga => fork(saga)));
}

export default Saga;
