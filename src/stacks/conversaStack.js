import { createStackNavigator } from "react-navigation";

import Conversa from "../telas/Conversa";
import Perfil from "../telas/Perfil";

const conversaStack = createStackNavigator({
  ConversaTela: { screen: Conversa },
  PerfilTela: { screen: Perfil }
});

export default conversaStack;
