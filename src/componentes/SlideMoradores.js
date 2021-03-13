import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Text
} from "react-native";
import EstiloPadrao from "../EstiloPadrao";

import { Creators as moradorActions } from "../redux/ducks/morador";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

let { width } = Dimensions.get("screen");

class SlideMoradores extends React.Component {
  constructor() {
    super();
    this.state = {
      moradoreSelecionado: null
    };
  }

  componentWillMount() {
    this.props.requestMoradorLoad();
  }

  render() {
    return (
      <ScrollView
        horizontal={true}
        contentContainerStyle={[
          {
            flexGrow: 1,
            alignItems: "center",
            flexDirection: "row"
          },
          EstiloPadrao.paddingPadrao
        ]}
      >
        {this.props.morador.moradores != []
          ? this.props.morador.moradores.map(moradores => {
              return (
                <TouchableOpacity
                  style={styles.btnMorador}
                  activeOpacity={0.8}
                  key={moradores.MOR_INT_ID}
                  onPress={() =>
                    this.setState({
                      morador: moradores.MOR_INT_ID
                    })
                  }
                >
                  <View
                    style={[
                      styles.overlayMorador,
                      EstiloPadrao.bordaInferiosRadius,
                      EstiloPadrao.paddingPadrao
                    ]}
                  >
                    <Text style={[styles.infoMorador, EstiloPadrao.fonte]}>
                      <Text style={{ fontWeight: "bold" }}>NOME - </Text>
                      {moradores.MOR_STR_NOME}
                    </Text>
                    <Text style={[styles.infoMorador, EstiloPadrao.fonte]}>
                      <Text style={{ fontWeight: "bold" }}>CELULAR - </Text>
                      {moradores.MOR_STR_CEL}
                    </Text>
                    <Text style={[styles.infoMorador, EstiloPadrao.fonte]}>
                      <Text style={{ fontWeight: "bold" }}>
                        DT DE INGRESSÃO -{" "}
                      </Text>
                      {moradores.MOR_DT_ING.substring(0, 10)}
                    </Text>
                    <Text style={[styles.infoMorador, EstiloPadrao.fonte]}>
                      <Text style={{ fontWeight: "bold" }}>
                        REPRESENTANTE -{" "}
                      </Text>
                      {moradores.MOR_BIT_REP == 1 ? "Sim" : "Não"}
                    </Text>
                    <Text style={[styles.infoMorador, EstiloPadrao.fonte]}>
                      <Text style={{ fontWeight: "bold" }}>SINDICO - </Text>
                      {moradores.MOR_BIT_SIN == 1 ? "Sim" : "Não"}
                    </Text>
                    <Text style={[styles.infoMorador, EstiloPadrao.fonte]}>
                      <Text style={{ fontWeight: "bold" }}>ATIVO - </Text>
                      {moradores.MOR_BIT_ATIVO == 1 ? "Sim" : "Não"}
                    </Text>
                  </View>
                  <Image
                    source={require("../imgs/iQoHTjjl_400x400.jpeg")}
                    style={styles.imgMorador}
                  />
                </TouchableOpacity>
              );
            })
          : false}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  btnMorador: {
    flex: 1,
    width: width - 28,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  overlayMorador: {
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    width: "100%",
    height: 160,
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  imgMorador: {
    height: "100%",
    width: "100%",
    borderRadius: 6
  },
  infoMorador: {
    padding: 4,
    color: "#FFF"
  }
});

const mapStateToProps = state => ({
  morador: state.morador
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(moradorActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlideMoradores);
