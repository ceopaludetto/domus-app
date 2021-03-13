import { put, call } from "redux-saga/effects";
import { portao } from "../api";
import { AsyncStorage } from "react-native";

async function getToken() {
  TOKEN = await AsyncStorage.getItem("@DOMUS:TOKEN");
  if (TOKEN !== null) {
    return TOKEN;
  }
}

export function* getAbrirPortao(action) {
  const res = yield call(portao.post, "/portao/abrir", {
    MOR_INT_PSWPORTA: action.MOR_INT_PSWPORTA,
    headers: { authorization: `Bearer ${TOKEN}` }
  });
  if (res.ok) {
    yield put({
      type: "SUCCESS_PORTA"
    });
  } else {
    yield put({
      type: "FAILURE_PORTA",
      data: {
        ERROR: res.data.ERROR
      }
    });
  }
}

export function* getFecharPortao(action) {
  const res = yield call(portao.post, "/portao/fechar");
  if (res.ok) {
    yield put({
      type: "SUCCESS_FECHAR_PORTA"
    });
  } else {
    yield put({
      type: "FAILURE_PORTA",
      data: {
        ERROR: res.data.ERROR
      }
    });
  }
}
