import { createActions, createReducer } from "reduxsauce";

const INITIAL_STATE = {
  success: false,
  loading: false,
  loadingToken: false,
  failure: false,
  failureToken: false,
  data: {}
};

export const { Types, Creators } = createActions({
  requestLogin: ["MOR_STR_LGN", "MOR_STR_PSW"],
  requestLoginAnular: []
});

const request = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: true
});

const requestToken = (state = INITIAL_STATE, action) => ({
  ...state,
  loadingToken: true
});

const requestAnular = (state = INITIAL_STATE, action) => ({
  success: false,
  loading: false,
  loadingToken: false,
  failure: false,
  failureToken: false
});

const success = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  loadingToken: false,
  success: true,
  data: {
    MORADOR: action.data.MORADOR
  }
});

const failure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  failure: true,
  data: {
    ERROR: action.data.ERROR
  }
});

const failureToken = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  failureToken: true,
  data: {
    ERROR: action.data.ERROR
  }
});

export default createReducer(INITIAL_STATE, {
  [Types.REQUEST_LOGIN]: request,
  [Types.REQUEST_LOGIN_ANULAR]: requestAnular,
  REQUEST_LOGIN_TOKEN: requestToken,
  SUCCESS_LOGIN: success,
  SUCCESS_LOGIN_TOKEN: success,
  FAILURE_LOGIN: failure,
  FAILURE_LOGIN_TOKEN: failureToken
});
