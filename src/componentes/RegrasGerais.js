import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import EstiloPadrao from "../EstiloPadrao";

import { Creators as regrasActions } from "../redux/ducks/regra";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class RegrasGerais extends React.Component {
  componentWillMount() {
    this.props.requestRegraLoad();
  }

  render() {
    return (
      <View style={EstiloPadrao.containerPrimario}>
        <View style={EstiloPadrao.tituloContainerPrimario}>
          <Ionicons
            name="md-warning"
            size={30}
            style={EstiloPadrao.iconeContainerPrimario}
          />
          <Text style={EstiloPadrao.textoContainerPrimario}>REGRAS GERAIS</Text>
        </View>
        <View style={EstiloPadrao.paddingPadrao}>
          {this.props.regra.regras ? (
            this.props.regra.regras.map((regra, index) => {
              return (
                <View>
                  <View
                    style={EstiloPadrao.paddingMaior}
                    key={regra.REG_INT_ID}
                  >
                    <Text style={[styles.regra, EstiloPadrao.fonte]}>
                      <Text
                        style={[
                          { fontWeight: "bold" },
                          EstiloPadrao.textoPrimario,
                          EstiloPadrao.fonte
                        ]}
                      >
                        Regra {regra.REG_INT_ID} -{" "}
                      </Text>{" "}
                      {regra.REG_STR_DESC}
                    </Text>
                  </View>
                  {this.props.regra.regras.length == index + 1 ? (
                    false
                  ) : (
                    <View style={EstiloPadrao.bordaHorizontalCurta} />
                  )}
                </View>
              );
            })
          ) : (
            <View style={styles.containerRegra}>
              <Text style={[styles.regra, EstiloPadrao.fonte]}>
                Aparentemente ainda não a regras ;(
              </Text>
            </View>
          )}
          {/*<TouchableOpacity
            activeOpacity={0.8}
            style={styles.verMais}
            onPress={() => this.props.navigation.navigate("EditarRegrasTela")}
          >
            <Text
              style={[EstiloPadrao.textoSecundario, { marginHorizontal: 6 }]}
            >
              Ver mais
            </Text>
          </TouchableOpacity>*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  regra: {
    padding: 8,
    color: "#342E37"
  },
  verMais: {
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6
  }
});

const mapStateToProps = state => ({
  regra: state.regra
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(regrasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegrasGerais);
