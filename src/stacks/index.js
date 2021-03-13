import { createSwitchNavigator } from "react-navigation";

import authStack from "./authStack";
import drawerStack from "./drawerStack";
import configStack from "./configStack";
import conversaStack from "./conversaStack";
import funcionalidadesStack from "./funcionalidadesStack";

const Stacks = createSwitchNavigator({
  AuthTelas: authStack,
  AppTelas: drawerStack,
  ConfigTelas: configStack,
  ConversasTelas: conversaStack,
  FuncionalidadesTelas: funcionalidadesStack
});

export default Stacks;
