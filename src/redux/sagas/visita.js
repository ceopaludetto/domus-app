import { put, call } from "redux-saga/effects";
import api from "../api";

export function* getVisita(action) {
  const res = yield call(api.post, "/visita", {
    MOR_INT_ID: action.MOR_INT_ID,
    VSIT_STR_NOME: action.VSIT_STR_NOME,
    VSIT_DT_ENT: action.VSIT_DT_ENT
  });
  if (res.ok) {
    yield put({
      type: "SUCCESS_REQUEST_VISITA",
      data: {
        VISITA: res.data.VISITA
      }
    });
  } else {
    yield put({
      type: "FAILURE_REQUEST_VISITA",
      data: {
        ERROR: res.data.ERROR
      }
    });
  }
}
