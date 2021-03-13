import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import ReactNative, { View, Text } from "react-native";
import EstiloPadrao from "../EstiloPadrao";
import Vazio from "./Vazio";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as comunicadoActions } from "../redux/ducks/comunicado";

class Comunicados extends React.Component {
  componentWillMount() {
    this.props.requestComunicadoLoad();
  }

  render() {
    return (
      <View style={EstiloPadrao.containerPrimario}>
        <View style={EstiloPadrao.tituloContainerPrimario}>
          <Ionicons
            name="md-today"
            size={30}
            style={EstiloPadrao.iconeContainerPrimario}
          />
          <Text style={EstiloPadrao.textoContainerPrimario}>RECENTES</Text>
        </View>
        <View style={EstiloPadrao.paddingPadrao}>
          {this.props.comunicado.success ? (
            this.props.comunicado.comunicados.map((comunicado, index) => {
              return (
                <View key={comunicado.COMU_INT_ID}>
                  <View style={styles.noticia}>
                    <Text style={[styles.titulo, EstiloPadrao.fonte]}>
                      {comunicado.COMU_STR_TIT}
                    </Text>
                    <Text style={[styles.desc, EstiloPadrao.fonte]}>
                      {comunicado.COMU_STR_DESC}
                    </Text>
                    <Text style={[styles.data, EstiloPadrao.fonte]}>
                      {comunicado.COMU_DT_DATA.substring(0, 10)}
                    </Text>
                  </View>
                  {this.props.comunicado.comunicados.length == index + 1 ? (
                    false
                  ) : (
                    <View style={EstiloPadrao.bordaHorizontalCurta} />
                  )}
                </View>
              );
            })
          ) : (
            <Vazio />
          )}
        </View>
      </View>
    );
  }
}

const styles = ReactNative.StyleSheet.create({
  noticia: {
    marginVertical: 4,
    padding: 6,
    flexDirection: "column"
  },
  desc: {
    padding: 4,
    color: "#2c3e50"
  },
  titulo: {
    padding: 2,
    paddingHorizontal: 4,
    fontSize: 14,
    color: "#2c3e50",
    fontWeight: "500"
  },
  data: {
    alignSelf: "flex-end",
    padding: 4,
    color: "grey"
  }
});

const mapStateToProps = state => ({
  comunicado: state.comunicado
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(comunicadoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comunicados);
