import React, { Component } from "react";
import { View, ScrollView } from "react-native";

//COMPONENTES
import Comunicados from "../componentes/Comunicados";
import ItemVotacao from "../componentes/ItemVotacao";
import RegrasGerais from "../componentes/RegrasGerais";
import ListaEventos from "../componentes/ListaEvento";
import Graficos from "../componentes/GraficoDespesa";
//FIM COMPONENTES

//LISTAS
import listaComunicados from "../listas/listaComunicados";
import listaEventos from "../listas/listaEventos";
import Header from "../componentes/Header";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class Inicio extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Ionicons name="md-paper" size={25} color={tintColor} />
    )
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
        <ItemVotacao />
        <ScrollView
          style={{
            flexDirection: "column",
            backgroundColor: "#eaedf2",
            paddingVertical: 5,
            flex: 1
          }}
        >
          <Comunicados />
          <ListaEventos navigation={this.props.navigation} />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              marginHorizontal: 9,
              flexWrap: "wrap"
            }}
          >
            <Graficos titulo="ÁGUA" icone="md-water" />
          </View>
          <RegrasGerais />
          <View style={{ height: 10 }} />
          {/*Usando como margem pq ta com bug*/}
          {/*<RegrasGerais
            regras={listaRegras}
            navigation={this.props.navigation}
          />*/}
        </ScrollView>
      </View>
    );
  }
}
