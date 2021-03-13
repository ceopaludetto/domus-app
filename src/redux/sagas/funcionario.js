import { put, call } from "redux-saga/effects";

import api from "../api";

export function* getNewFuncionario(action) {
  const res = yield call(api.post, "/funcionario", {
    FUNC_STR_NOME: action.FUNC_STR_NOME,
    FUNC_STR_CEL: action.FUNC_STR_CEL,
    FUNC_STR_CARGO: action.FUNC_STR_CARGO,
    FUNC_STR_EMPR: action.FUNC_STR_EMPR
  });
  if (res.ok) {
    yield put({
      type: "SUCCESS_FUNCIONARIO"
    });
    yield put({
      type: "REQUEST_FUNCIONARIO_LOAD"
    });
  } else {
    yield put({
      type: "FAILURE_FUNCIONARIO",
      data: {
        ERROR: res.data.error
      }
    });
  }
}

export function* getEditFuncionario(action) {
  const res = yield call(api.put, `/funcionario/${action.FUNC_INT_ID}`, {
    FUNC_STR_NOME: action.FUNC_STR_NOME,
    FUNC_STR_CEL: action.FUNC_STR_CEL,
    FUNC_STR_CARGO: action.FUNC_STR_CARGO,
    FUNC_STR_EMPR: action.FUNC_STR_EMPR
  });
  if (res.ok) {
    yield put({
      type: "SUCCESS_FUNCIONARIO"
    });
    yield put({
      type: "REQUEST_FUNCIONARIO_LOAD"
    });
  } else {
    yield put({
      type: "FAILURE_FUNCIONARIO",
      data: {
        ERROR: res.data.error
      }
    });
  }
}

export function* getDeleteFuncionario(action) {
  for (let i = 0; i < action.FUNCIONARIOS.length; i++) {
    const res = yield call(
      api.delete,
      `/funcionario/${action.FUNCIONARIOS[i]}`
    );
    if (res.ok) {
      yield put({
        type: "SUCCESS_FUNCIONARIO"
      });
      yield put({
        type: "REQUEST_FUNCIONARIO_LOAD"
      });
    } else {
      yield put({
        type: "FAILURE_FUNCIONARIO",
        data: {
          ERROR: res.data.error
        }
      });
    }
  }
}

export function* getFuncionarios(action) {
  const res = yield call(api.get, "/funcionario", {});
  if (res.ok) {
    yield put({
      type: "SUCCESS_FUNCIONARIO_LOAD",
      data: res.data.FUNCIONARIOS
    });
  } else {
    yield put({
      type: "FAILURE_FUNCIONARIO_LOAD",
      data: {
        ERROR: res.data.error
      }
    });
  }
}
