import { put, call } from "redux-saga/effects";
import { AsyncStorage } from "react-native";
import api from "../api";

async function saveToken(TOKEN) {
  await AsyncStorage.setItem("@DOMUS:TOKEN", TOKEN);
}

export function* getLogin(action) {
  const res = yield call(api.post, "/auth/login", {
    MOR_STR_LGN: action.MOR_STR_LGN,
    MOR_STR_PSW: action.MOR_STR_PSW
  });
  if (res.ok) {
    yield call(saveToken, res.data.TOKEN);
    yield put({
      type: "SUCCESS_LOGIN",
      data: {
        MORADOR: res.data.MORADOR
      }
    });
  } else {
    yield put({
      type: "FAILURE_LOGIN",
      data: {
        ERROR: res.data.ERROR
      }
    });
  }
}

export function* getLoginToken(action) {
  const res = yield call(api.post, "/auth/token", {});
  if (res.ok) {
    yield call(saveToken, res.data.TOKEN);
    yield put({
      type: "SUCCESS_LOGIN_TOKEN",
      data: {
        MORADOR: res.data.MORADOR
      }
    });
  } else {
    yield put({
      type: "FAILURE_LOGIN_TOKEN",
      data: {
        ERROR: res.data.ERROR
      }
    });
  }
}
