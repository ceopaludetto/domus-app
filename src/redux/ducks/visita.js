import { createActions, createReducer } from "reduxsauce";

const INITIAL_STATE = {
  success: false,
  loading: false,
  failure: false,
  data: {}
};

export const { Types, Creators } = createActions({
  requestVisita: ["MOR_INT_ID", "VSIT_STR_NOME", "VSIT_DT_ENT"]
});

const request = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: true
});

const success = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  success: true,
  data: {
    VISITA: action.data.VISITA
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

export default createReducer(INITIAL_STATE, {
  [Types.REQUEST_VISITA]: request,
  SUCCESS_REQUEST_VISITA: success,
  FAILURE_REQUEST_VISITA: failure
});
