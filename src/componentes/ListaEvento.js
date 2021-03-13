import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import EstiloPadrao from "../EstiloPadrao";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Vazio from "./Vazio";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as eventoActions } from "../redux/ducks/evento";

class ListaEvento extends React.Component {
  componentWillMount() {
    this.props.requestEvento();
  }

  componentWillUpdate() {
    if (this.props.evento.failure) {
      console.log(this.props.evento.data);
    }
  }

  render() {
    return (
      <View style={[EstiloPadrao.containerPrimario]}>
        <View style={EstiloPadrao.tituloContainerPrimario}>
          <MaterialIcons
            name="event"
            size={30}
            style={EstiloPadrao.iconeContainerPrimario}
          />
          <Text style={EstiloPadrao.textoContainerPrimario}>EVENTOS</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 6
          }}
        >
          {/*this.props.evento.success ? this.ListaEvento : <Vazio/>*/}
          <View style={EstiloPadrao.paddingPadrao}>
            {this.props.evento.success ? (
              this.props.evento.eventos.map(evento => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={evento.EVE_DT_DATA}
                    style={styles.EVE_INT_ID}
                    onPress={() =>
                      this.props.navigation.navigate("Eventos", {
                        eventoId: evento.EVE_DT_DATA
                      })
                    }
                  >
                    <View style={{ flex: 2 }}>
                      <Text style={[styles.data, EstiloPadrao.fonte]}>
                        {evento.EVE_DT_DATA}
                      </Text>
                      <Text style={[styles.hora, EstiloPadrao.fonte]}>
                        {evento.EVE_DT_HORA}
                        hrs
                      </Text>
                    </View>
                    <View style={styles.bordaLateral} />
                    <View style={{ flex: 5, justifyContent: "center" }}>
                      <Text style={[styles.titulo, EstiloPadrao.fonte]}>
                        {evento.EVE_STR_TIT}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Vazio />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventos: {
    borderRadius: 3,
    width: "100%",
    flexDirection: "column",
    alignItems: "center"
  },
  evento: {
    flexDirection: "row",
    height: 46,
    //width: Dimensions.get('window').width / 2 - 40,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    backgroundColor: "#4285f4", //#6252e0
    marginHorizontal: 12,
    marginVertical: 4
  },
  bordaLateral: {
    height: "80%",
    borderLeftColor: "#E1E1DC",
    borderLeftWidth: 1,
    paddingHorizontal: 12
  },
  data: {
    flex: 1,
    fontSize: 14,
    color: "blue",
    textAlign: "center",
    justifyContent: "center",
    color: "white",
    paddingTop: 6
  },
  hora: {
    flex: 1,
    fontSize: 12,
    color: "darkblue",
    textAlign: "center",
    justifyContent: "center",
    color: "white"
  },
  titulo: {
    color: "white"
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
)(ListaEvento);
