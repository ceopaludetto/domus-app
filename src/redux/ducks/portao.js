import { createActions, createReducer } from "reduxsauce";

const INITIAL_STATE = {
  aberto: false,
  loading: false,
  failure: false,
  data: {}
};

export const { Types, Creators } = createActions({
  requestAbrirPortao: ["MOR_INT_PSWPORTA"],
  requestFecharPortao: [],
  requestAnular: []
});

const abrir = (state = INITIAL_STATE, action) => ({
  aberto: true
});

const fechar = (state = INITIAL_STATE, action) => ({
  aberto: false
});

const request = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: true
});

const failure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  failure: true,
  data: {
    ERROR: action.data.ERROR
  }
});

const anular = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: true,
  failure: false,
  aberto: false
});

export default createReducer(INITIAL_STATE, {
  [Types.REQUEST_ABRIR_PORTAO]: request,
  [Types.REQUEST_FECHAR_PORTAO]: request,
  [Types.REQUEST_ANULAR]: anular,
  SUCCESS_PORTA: abrir,
  FAILURE_PORTA: failure,
  SUCCESS_FECHAR_PORTA: fechar
});
