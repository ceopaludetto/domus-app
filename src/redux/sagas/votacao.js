import { put, call } from "redux-saga/effects";

import api from "../api";

export function* getNewVotacao(action) {
  const res = yield call(api.post, "/votacao", {
    VOT_STR_TITULO: action.VOT_STR_TITULO,
    VOT_STR_DESC: action.VOT_STR_DESC
  });
  if (res.ok) {
    yield put({
      type: "SUCCESS_VOTACAO"
    });
    yield put({
      type: "REQUEST_VOTACAO_LOAD"
    });
  } else {
    yield put({
      type: "FAILURE_VOTACAO",
      data: {
        ERROR: res.data.error
      }
    });
  }
}

export function* getEditVotacao(action) {
  const res = yield call(api.put, `/votacao/${action.VOT_INT_ID}`, {
    VOT_STR_TITULO: action.VOT_STR_TITULO,
    VOT_STR_DESC: action.VOT_STR_DESC
  });
  if (res.ok) {
    yield put({
      type: "SUCCESS_VOTACAO"
    });
    yield put({
      type: "REQUEST_VOTACAO_LOAD"
    });
  } else {
    yield put({
      type: "FAILURE_VOTACAO",
      data: {
        ERROR: res.data.error
      }
    });
  }
}

export function* getDeleteVotacao(action) {
  const res = yield call(api.delete, `/votacao/${action.VOT_INT_ID}`);
  console.log(res);
  if (res.ok) {
    yield put({
      type: "SUCCESS_VOTACAO"
    });
    yield put({
      type: "REQUEST_VOTACAO_LOAD"
    });
  } else {
    yield put({
      type: "FAILURE_VOTACAO",
      data: {
        ERROR: res.data.error
      }
    });
  }
}

export function* getVotacoes(action) {
  const res = yield call(api.get, "/votacao", {});
  if (res.ok) {
    yield put({
      type: "SUCCESS_VOTACAO_LOAD",
      data: res.data.VOTACOES
    });
  } else {
    yield put({
      type: "FAILURE_VOTACAO_LOAD",
      data: {
        ERROR: res.data.error
      }
    });
  }
}
