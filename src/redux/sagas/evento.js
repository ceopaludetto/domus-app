import { put, call } from "redux-saga/effects";

import api from "../api";

export function* getNewEvento(action) {
  const res = yield call(api.post, "/evento", {
    EVE_STR_TITULO: action.EVE_STR_TITULO,
    EVE_DT_DATA: action.EVE_STR_DATA,
    EVE_DT_INICIO: action.EVE_DT_INICIO,
    EVE_DT_FIM: action.EVE_DT_FIM,
    EVE_STR_DESC: action.EVE_STR_DESC
  });
  if (res.ok) {
    yield put({
      type: "SUCCESS_EVENTO"
    });
    yield put({
      type: "REQUEST_EVENTO_LOAD"
    });
  } else {
    yield put({
      type: "FAILURE_EVENTO",
      data: {
        ERROR: res.data.error
      }
    });
  }
}

export function* getEditEvento(action) {
  const res = yield call(api.put, `/evento/${action.EVE_INT_ID}`, {
    EVE_STR_TITULO: action.EVE_STR_TITULO,
    EVE_DT_DATA: action.EVE_STR_DATA,
    EVE_DT_INICIO: action.EVE_DT_INICIO,
    EVE_DT_FIM: action.EVE_DT_FIM,
    EVE_STR_DESC: action.EVE_STR_DESC
  });
  if (res.ok) {
    yield put({
      type: "SUCCESS_EVENTO"
    });
    yield put({
      type: "REQUEST_EVENTO_LOAD"
    });
  } else {
    yield put({
      type: "FAILURE_EVENTO",
      data: {
        ERROR: res.data.error
      }
    });
  }
}

export function* getDeleteEvento(action) {
  const res = yield call(api.delete, `/evento/${action.EVE_INT_ID}`);
  console.log(res);
  if (res.ok) {
    yield put({
      type: "SUCCESS_EVENTO"
    });
    yield put({
      type: "REQUEST_EVENTO_LOAD"
    });
  } else {
    yield put({
      type: "FAILURE_EVENTO",
      data: {
        ERROR: res.data.error
      }
    });
  }
}

export function* getEvento(action) {
  const res = yield call(api.get, "/evento", {});
  if (res.ok) {
    yield put({
      type: "SUCCESS_EVENTO_LOAD",
      data: res.data.EVENTOS
    });
  } else {
    yield put({
      type: "FAILURE_EVENTO_LOAD",
      data: {
        ERROR: res.data.error
      }
    });
  }
}
