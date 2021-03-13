import React, { Component } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EstiloPadrao from "../EstiloPadrao";
import { HeaderBackButton } from "react-navigation";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as eventoActions } from "../redux/ducks/evento";

class Evento extends Component {
  static navigationOptions = ({ navigation }) => ({
    EVE_INT_ID: this.props.navigation.getParam("eventoId", false),
    title: "Eventos",
    headerStyle: {
      backgroundColor: "#4285f4",
      elevation: 4
    },
    headerTintColor: "#fff",
    headerLeft: (
      <HeaderBackButton
        onPress={() => navigation.navigate("Inicio")}
        tintColor="#FFF"
      />
    )
  });

  handleBackButton = () => {
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillMount() {
    this.props.requestEventoLoad();
  }

  render() {
    if (this.props.evento.success && this.state.EVE_INT_ID) {
      return (
        <View
          style={{ flex: 1, backgroundColor: "#eaedf2", paddingVertical: 5 }}
        >
          <View style={EstiloPadrao.containerPrimario}>
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Text style={EstiloPadrao.textoContainerPrimario}>
                {
                  this.props.evento.eventos[this.state.EVE_INT_ID]
                    .EVE_STR_TITULO
                }
              </Text>
            </View>
            <View style={[EstiloPadrao.paddingView, EstiloPadrao.column]}>
              <View style={[EstiloPadrao.row, { alignItems: "center" }]}>
                <Ionicons
                  name="ios-clock"
                  style={styles.iconeOpcao}
                  color="grey"
                />
                <Text style={[styles.textOpcao, EstiloPadrao.fonte]}>
                  Das{" "}
                  {
                    this.props.evento.eventos[this.state.EVE_INT_ID]
                      .EVE_DT_INICIO
                  }{" "}
                  as{" "}
                  {this.props.evento.eventos[this.state.EVE_INT_ID].EVE_DT_FIM}
                </Text>
              </View>
              <View style={[EstiloPadrao.row, { alignItems: "center" }]}>
                <Ionicons
                  name="ios-calendar"
                  style={styles.iconeOpcao}
                  color="grey"
                />
                <Text style={[styles.textOpcao, EstiloPadrao.fonte]}>
                  Quinta-feira, 22 de setembro de 2018
                </Text>
              </View>
              <View style={[EstiloPadrao.row, { alignItems: "center" }]}>
                <Ionicons
                  name="ios-information-circle-outline"
                  style={styles.iconeOpcao}
                  color="grey"
                />
                <Text style={[styles.textOpcao, EstiloPadrao.fonte]}>
                  {
                    this.props.evento.eventos[this.state.EVE_INT_ID]
                      .EVE_STR_DESC
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      <View style={{ flex: 1, backgroundColor: "#eaedf2", paddingVertical: 5 }}>
        <View style={EstiloPadrao.containerPrimario}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>Indefinido</Text>
          </View>
          <View style={[EstiloPadrao.paddingView, EstiloPadrao.column]}>
            <Text>Oops...parece que algo deu errado :(</Text>
          </View>
        </View>
      </View>;
    }
  }
}

const styles = StyleSheet.create({
  textTitulo: {
    textAlign: "center",
    color: "#2c3e50",
    padding: 12
  },
  textOpcao: {
    padding: 12,
    marginRight: 50,
    color: "#2c3e50"
    //maxWidth: 266
  },
  iconeOpcao: {
    padding: 12,
    color: "grey",
    marginHorizontal: 8,
    fontSize: 26,
    minWidth: 45,
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  evento: state.evento
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(eventoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Evento);
