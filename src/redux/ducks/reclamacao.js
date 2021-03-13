import { createActions, createReducer } from "reduxsauce";

const INITIAL_STATE = {
  loading: false,
  loadingNew: false,
  success: false,
  successNew: false,
  failure: false,
  failureNew: false,
  data: {},
  reclamacao: []
};

export const { Types, Creators } = createActions({
  requestReclamacao: ["REC_STR_TIT", "REC_DT_DATA", "REC_STR_DESC"],
  requestReclamacaoEdit: [
    "REC_STR_TIT",
    "REC_DT_DATA  ",
    "REC_STR_DESC",
    "REC_INT_ID"
  ],
  requestReclamacaoDelete: ["REC_INT_ID"],
  requestReclamacaoLoad: [],
  requestReclamacaoAnular: []
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
  reclamacoes: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  failure: true,
  reclamacoes: [],
  data: {
    ERROR: action.data.ERROR
  }
});

export default createReducer(INITIAL_STATE, {
  [Types.REQUEST_RECLAMACAO]: request,
  [Types.REQUEST_RECLAMACAO_EDIT]: request,
  [Types.REQUEST_RECLAMACAO_DELETE]: request,
  [Types.REQUEST_RECLAMACAO_LOAD]: load,
  [Types.REQUEST_RECLAMACAO_ANULAR]: anular,
  SUCCESS_RECLAMACOES: success,
  FAILURE_RECLAMACOES: failure,
  SUCCESS_RECLAMACOES_LOAD: loadSuccess,
  FAILURE_RECLAMACOES_LOAD: loadFailure
});
