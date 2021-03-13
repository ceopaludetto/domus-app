import { put, call } from "redux-saga/effects";

import api from "../api";

export function* getNewReserva(action) {
  const res = yield call(api.post, "/reservas", {
    RES_INT_QTDE: action.RES_INT_QTDE,
    RES_DT_CMC: action.RES_DT_CMC,
    RES_DT_TER: action.RES_DT_TER,
    LOC_INT_ID: action.LOC_INT_ID
  });
  if (res.ok) {
    yield put({
      type: "SUCCESS_RESERVA"
    });
    yield put({
      type: "REQUEST_RESERVA_LOAD"
    });
  } else {
    yield put({
      type: "FAILURE_RESERVA",
      data: {
        ERROR: res.data.error
      }
    });
  }
}

export function* getDeleteReserva(action) {
  for (let i = 0; i < action.RESERVAS.length; i++) {
    const res = yield call(api.delete, `/reservas/${action.RESERVAS[i]}`);
    if (res.ok) {
      yield put({
        type: "SUCCESS_RESERVA"
      });
      yield put({
        type: "REQUEST_RESERVA_LOAD"
      });
    } else {
      yield put({
        type: "FAILURE_RESERVA",
        data: {
          ERROR: res.data.error
        }
      });
    }
  }
}

export function* getReservas(action) {
  const res = yield call(api.get, "/reservas", {});
  if (res.ok) {
    yield put({
      type: "SUCCESS_RESERVA_LOAD",
      data: res.data.RESERVAS
    });
  } else {
    yield put({
      type: "FAILURE_RESERVA_LOAD",
      data: {
        ERROR: res.data.error
      }
    });
  }
}
