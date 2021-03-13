import { createStackNavigator } from "react-navigation";

import ConfigApp from "../telas/opcoes/ConfigApp";
import ConfigUsuario from "../telas/opcoes/ConfigUsuario";
import Opcoes from "../telas/Opcoes";

const configStack = createStackNavigator({
  OpcoesTela: { screen: ConfigUsuario }
  //ConfiguracaoAppTela: { screen: ConfigApp },
  //ConfiguracaoUsuarioTela: { screen: ConfigUsuario }
});

export default configStack;
