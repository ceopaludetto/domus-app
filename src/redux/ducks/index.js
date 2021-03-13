import { combineReducers } from "redux";

import message from "./message";
import voto from "./voto";
import post from "./post";
import local from "./local";
import bloco from "./bloco";
import regra from "./regra";
import color from "./color";
import login from "./login";
import portao from "./portao";
import comunicado from "./comunicado";
//import reset from "./reset";
//import theme from './theme';
import forgot from "./forgot";
import votacao from "./votacao";
import loading from "./loading";
import contato from "./contato";
import register from "./register";
import settings from "./settings";
import visita from "./visita";
import evento from "./evento";
import apartamento from "./apartamento";
import assistencia from "./apartamento";
import morador from "./morador";
import despesa from "./despesa";
import funcionario from "./funcionario";

const reducers = combineReducers({
  message,
  voto,
  morador,
  post,
  local,
  bloco,
  regra,
  color,
  login,
  portao,
  //reset,
  //theme,
  forgot,
  visita,
  comunicado,
  assistencia,
  votacao,
  loading,
  contato,
  register,
  settings,
  apartamento,
  evento,
  despesa,
  funcionario
});

export default reducers;
