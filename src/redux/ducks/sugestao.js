import { createActions, createReducer } from "reduxsauce";

const INITIAL_STATE = {
  loading: false,
  loadingNew: false,
  success: false,
  successNew: false,
  failure: false,
  failureNew: false,
  data: {},
  sugestao: []
};

export const { Types, Creators } = createActions({
  requestSugestao: ["SUGE_STR_TIT", "SUGE_DT_DATA", "SUGE_STR_DESC"],
  requestSugestaoEdit: [
    "SUGE_STR_TIT",
    "SUGE_DT_DATA",
    "SUGE_STR_DESC",
    "SUGE_INT_ID"
  ],
  requestSugestaoDelete: ["SUGE_INT_ID"],
  requestSugestaoLoad: [],
  requestSugestaoAnular: []
});

const request = (state = INITIAL_STATE, action) => ({
  ...state,
  loadingNew: true
});

const success = (state = INITIAL_STATE, action) => ({
  ...state,
  loadingNew: false,
  successNew: true
});

const failure = (state = INITIAL_STATE, action) => ({
  ...state,
  loadingNew: false,
  failureNew: true,
  data: {
    ERROR: action.data.ERROR
  }
});

const anular = (state = INITIAL_STATE, action) => ({
  loading: false,
  loadingNew: false,
  success: false,
  successNew: false,
  failure: false,
  failureNew: false
});

const load = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: true
});

const loadSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  success: true,
  sugestoes: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  failure: true,
  sugestoes: [],
  data: {
    ERROR: action.data.ERROR
  }
});

export default createReducer(INITIAL_STATE, {
  [Types.REQUEST_SUGESTAO]: request,
  [Types.REQUEST_SUGESTAO_EDIT]: request,
  [Types.REQUEST_SUGESTAO_DELETE]: request,
  [Types.REQUEST_SUGESTAO_LOAD]: load,
  [Types.REQUEST_SUGESTAO_ANULAR]: anular,
  SUCCESS_SUGESTOES: success,
  FAILURE_SUGESTOES: failure,
  SUCCESS_SUGESTOES_LOAD: loadSuccess,
  FAILURE_SUGESTOES_LOAD: loadFailure
});
