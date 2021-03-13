import { createStackNavigator } from "react-navigation";

import AlugarAreas from "../telas/funcionalidades/AlugarAreas";
import Reclamacao from "../telas/funcionalidades/Reclamacao";
import Sugestao from "../telas/funcionalidades/Sugestao";
import EditarVotacoes from "../telas/funcionalidades/EditarVotacoes";
import AdicionarVotacao from "../telas/funcionalidades/AdicionarVotacao";
import EditarComunicado from "../telas/funcionalidades/EditarComunicado";
import AdicionarComunicado from "../telas/funcionalidades/AdicionarComunicado";
import SolicitarAssistencia from "../telas/funcionalidades/SolicitarAssistencia";
import Visitantes from "../telas/funcionalidades/Visitantes";
import Vagas from "../telas/funcionalidades/Vagas";
import EditarRegras from "../telas/funcionalidades/EditarRegras";
import Eventos from "../telas/Evento";
import AdicionarLocal from "../telas/funcionalidades/AdicionarLocal";
import EditarLocal from "../telas/funcionalidades/EditarLocal";
import AdicionarEvento from "../telas/funcionalidades/AdicionarEvento";
import ManterMoradores from "../telas/funcionalidades/ManterMoradores";
import Morador from "../telas/funcionalidades/Morador";
import AdicionarRegra from "../telas/funcionalidades/AdicionarRegra";
import AdicionarDespesa from "../telas/funcionalidades/AdicionarDespesa";
import EditarDespesa from "../telas/funcionalidades/EditarDespesa";
import EditarFuncionario from "../telas/funcionalidades/EditarFuncionario";
import AdicionarFuncionario from "../telas/funcionalidades/AdicionarFuncionario";

const funcionalidadesStack = createStackNavigator({
  AlugarAreasTela: { screen: AlugarAreas },
  ReclamacaoTela: { screen: Reclamacao },
  SugestaoTela: { screen: Sugestao },
  EditarVotacoesTela: { screen: EditarVotacoes },
  AdicionarVotacaoTela: { screen: AdicionarVotacao },
  EditarComunicadoTela: { screen: EditarComunicado },
  AdicionarComunicadoTela: { screen: AdicionarComunicado },
  SolicitarAssistenciaTela: { screen: SolicitarAssistencia },
  VisitantesTela: { screen: Visitantes },
  VagasTela: { screen: Vagas },
  EditarRegrasTela: { screen: EditarRegras },
  EditarLocalTela: { screen: EditarLocal },
  AdicionarLocalTela: { screen: AdicionarLocal },
  AdicionarEventoTela: { screen: AdicionarEvento },
  AdicionarDespesaTela: { screen: AdicionarDespesa },
  EditarFuncionarioTela: { screen: EditarFuncionario },
  AdicionarFuncionarioTela: { screen: AdicionarFuncionario },
  EditarDespesaTela: { screen: EditarDespesa },
  ManterMoradoresTela: { screen: ManterMoradores },
  MoradorTela: { screen: Morador },
  AdicionarRegrasTela: { screen: AdicionarRegra },
  EventosTela: { screen: Eventos }
});

export default funcionalidadesStack;
