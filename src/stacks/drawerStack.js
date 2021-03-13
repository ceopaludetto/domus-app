import { createDrawerNavigator } from "react-navigation";

import InicioT from "../telas/Inicio";
import OpcoesT from "../telas/Opcoes";
import FuncionalidadesT from "../telas/Funcionalidades";
import MensagensT from "../telas/Mensagens";
import PortaoT from "../telas/Portao";
import drawerCustomizado from "../componentes/DrawerCustomizado";

const drawerStack = createDrawerNavigator(
  {
    Portao: { screen: PortaoT },
    Inicio: { screen: InicioT },
    Mensagens: { screen: MensagensT },
    Mais: { screen: FuncionalidadesT }
    //Opcoes: { screen: OpcoesT }
  },
  {
    backBehavior: "initialRoute",
    initialRouteName: "Inicio",
    contentComponent: drawerCustomizado,
    contentOptions: {
      activeBackgroundColor: "#4285f4",
      activeTintColor: "#FFF",
      itemsContainerStyle: {
        borderRadius: 60
      },
      itemStyle: {
        margin: 6,
        borderRadius: 60
      }
    }
  }
);

export default drawerStack;
