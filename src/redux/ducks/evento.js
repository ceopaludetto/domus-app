import { createActions, createReducer } from "reduxsauce";

const INITIAL_STATE = {
  loading: false,
  loadingNew: false,
  success: false,
  successNew: false,
  failure: false,
  failureNew: false,
  data: {},
  eventos: []
};

export const { Types, Creators } = createActions({
  requestEvento: [
    "EVE_STR_TITULO",
    "EVE_DT_DATA",
    "EVE_DT_INICIO",
    "EVE_DT_FIM",
    "EVE_STR_DESC"
  ],
  requestEventoEdit: [
    "EVE_STR_TITULO",
    "EVE_DT_DATA",
    "EVE_DT_INICIO",
    "EVE_DT_FIM",
    "EVE_STR_DESC",
    "EVE_INT_ID"
  ],
  requestEventoDelete: ["EVE_INT_ID"],
  requestEventoLoad: [],
  requestEventoAnular: []
});

const request = (state = INITIAL_STATE, action) => ({
  ...state,
  loadingNew: true
});

const anular = (state = INITIAL_STATE, action) => ({
  loading: false,
  loadingNew: false,
  success: false,
  successNew: false,
  failure: false,
  failureNew: false
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

const load = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: true
});

const loadSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  success: true,
  evento: [...action.data]
});

const loadFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  failure: true,
  evento: []
});

export default createReducer(INITIAL_STATE, {
  [Types.REQUEST_EVENTO]: request,
  [Types.REQUEST_EVENTO_EDIT]: request,
  [Types.REQUEST_EVENTO_DELETE]: request,
  [Types.REQUEST_EVENTO_LOAD]: load,
  [Types.REQUEST_EVENTO_ANULAR]: anular,
  SUCCESS_EVENTO: success,
  FAILURE_EVENTO: failure,
  SUCCESS_EVENTO_LOAD: loadSuccess,
  FAILURE_EVENTO_LOAD: loadFailure
});
