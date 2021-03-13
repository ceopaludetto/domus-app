import { put, call } from "redux-saga/effects";

import api from "../api";

export function* getNewComunicado(action) {
  const res = yield call(api.post, "/COMUNICADOS", {
    COMU_STR_TIT: action.COMU_STR_TIT,
    COMU_STR_DESC: action.COMU_STR_DESC,
    COMU_DT_DATA: action.COMU_DT_DATA
  });
  if (res.ok) {
    yield put({
      type: "SUCCESS_COMUNICADOS"
    });
    yield put({
      type: "REQUEST_COMUNICADOS_LOAD"
    });
  } else {
    yield put({
      type: "FAILURE_COMUNICADOS",
      data: {
        ERROR: res.data.error
      }
    });
  }
}

export function* getEditComunicado(action) {
  const res = yield call(api.put, `/COMUNICADOS/${action.COMU_INT_ID}`, {
    COMU_STR_TIT: action.COMU_STR_TIT,
    COMU_STR_DESC: action.COMU_STR_DESC,
    COMU_DT_DATA: action.COMU_DT_DATA
  });
  if (res.ok) {
    yield put({
      type: "SUCCESS_COMUNICADOS"
    });
    yield put({
      type: "REQUEST_COMUNICADOS_LOAD"
    });
  } else {
    yield put({
      type: "FAILURE_COMUNICADOS",
      data: {
        ERROR: res.data.error
      }
    });
  }
}

export function* getDeleteComunicado(action) {
  const res = yield call(api.delete, `/COMUNICADOS/${action.COMU_INT_ID}`);
  console.log(res);
  if (res.ok) {
    yield put({
      type: "SUCCESS_COMUNICADOS"
    });
    yield put({
      type: "REQUEST_COMUNICADOS_LOAD"
    });
  } else {
    yield put({
      type: "FAILURE_COMUNICADOS",
      data: {
        ERROR: res.data.error
      }
    });
  }
}

export function* getComunicado(action) {
  const res = yield call(api.get, "/COMUNICADOS", {});
  if (res.ok) {
    yield put({
      type: "SUCCESS_COMUNICADOS_LOAD",
      data: res.data.COMUNICADOS
    });
  } else {
    yield put({
      type: "FAILURE_COMUNICADOS_LOAD",
      data: {
        ERROR: res.data.error
      }
    });
  }
}
