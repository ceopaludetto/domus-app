import { createStackNavigator } from "react-navigation";

import Intro from "../telas/Intro";
import Login from "../telas/Login";
import RecuperarSenha from "../telas/RecuperarSenha";

const authStack = createStackNavigator({
  //Intro: { screen: IntroScreen },
  LoginTela: { screen: Login },
  RecuperarSenhaTela: { screen: RecuperarSenha }
});

export default authStack;
