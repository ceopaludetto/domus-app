import { createActions, createReducer } from "reduxsauce";

const INITIAL_STATE = {
  loading: false,
  loadingNew: false,
  success: false,
  successNew: false,
  failure: false,
  failureNew: false,
  data: {},
  comunicados: []
};

export const { Types, Creators } = createActions({
  requestComunicado: ["COMU_STR_TIT", "COMU_DT_DATA", "COMU_STR_DESC"],
  requestComunicadoEdit: [
    "COMU_STR_TIT",
    "COMU_DT_DATA",
    "COMU_STR_DESC",
    "COMU_INT_ID"
  ],
  requestComunicadoDelete: ["COMU_INT_ID"],
  requestComunicadoLoad: [],
  requestComunicadoAnular: []
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
  comunicados: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  failure: true,
  comunicados: [],
  data: {
    ERROR: action.data.ERROR
  }
});

export default createReducer(INITIAL_STATE, {
  [Types.REQUEST_COMUNICADO]: request,
  [Types.REQUEST_COMUNICADO_EDIT]: request,
  [Types.REQUEST_COMUNICADO_DELETE]: request,
  [Types.REQUEST_COMUNICADO_LOAD]: load,
  [Types.REQUEST_COMUNICADO_ANULAR]: anular,
  SUCCESS_COMUNICADOS: success,
  FAILURE_COMUNICADOS: failure,
  SUCCESS_COMUNICADOS_LOAD: loadSuccess,
  FAILURE_COMUNICADOS_LOAD: loadFailure
});
