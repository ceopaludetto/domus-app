import { createMaterialTopTabNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

import Inicio from "../telas/Inicio";
import Opcoes from "../telas/Opcoes";
import Funcionalidades from "../telas/Funcionalidades";
import Mensagens from "../telas/Mensagens";
import Portao from "../telas/Portao";

const headerStack = createMaterialTopTabNavigator(
  {
    PortaoTela: { screen: Portao },
    FeedTela: { screen: Inicio },
    MensagensTela: { screen: Mensagens },
    MaisTela: { screen: Funcionalidades },
    OpcoesTela: { screen: Opcoes }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "PortaoTela":
            iconName = `ios-unlock`;
            break;
          case "FeedTela":
            iconName = `ios-paper`;
            break;
          case "MensagensTela":
            iconName = `ios-chatboxes`;
            break;
          case "MaisTela":
            iconName = `ios-more`;
            break;
          case "OpcoesTela":
            iconName = `ios-settings`;
            break;
        }
        return <Ionicons name={iconName} size={25} color="rgba(0,0,0,0.3)" />;
      }
    }),
    tabBarPosition: "top",
    lazy: true,
    //swipeEnabled : false,
    //animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveTintColor: "rgba(0,0,0,0.3)",
      activeTintColor: "white",
      style: {
        backgroundColor: "#4285f4", //'#sf7f7f7' ESCURO #132749 #27343b
        alignContent: "center",
        height: 56,
        justifyContent: "center"
      },
      indicatorStyle: {
        backgroundColor: "#3367d6", //ESCURO #060D18
        height: 2.5
      },
      labelStyle: {
        fontSize: 12
      }
    }
  }
);

export default headerStack;
