import { createActions, createReducer } from "reduxsauce";

const INITIAL_STATE = {
  loading: false,
  loadingNew: false,
  success: false,
  successNew: false,
  failure: false,
  failureNew: false,
  data: {},
  votacoes: []
};

export const { Types, Creators } = createActions({
  requestVotacao: ["VOT_STR_TITULO", "VOT_STR_DESC"],
  requestVotacaoEdit: ["VOT_STR_TITULO", "VOT_STR_DESC", "VOT_INT_ID"],
  requestVotacaoDelete: ["VOT_INT_ID"],
  requestVotacaoLoad: [],
  requestVotacaoAnular: []
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
  votacoes: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  failure: true,
  votacoes: []
});

export default createReducer(INITIAL_STATE, {
  [Types.REQUEST_VOTACAO]: request,
  [Types.REQUEST_VOTACAO_EDIT]: request,
  [Types.REQUEST_VOTACAO_DELETE]: request,
  [Types.REQUEST_VOTACAO_LOAD]: load,
  [Types.REQUEST_VOTACAO_ANULAR]: anular,
  SUCCESS_VOTACAO: success,
  FAILURE_VOTACAO: failure,
  SUCCESS_VOTACAO_LOAD: loadSuccess,
  FAILURE_VOTACAO_LOAD: loadFailure
});
