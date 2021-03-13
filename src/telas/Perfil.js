import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HeaderBackButton } from "react-navigation";
import EstiloPadrao from "../EstiloPadrao";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as moradorActions } from "../redux/ducks/morador";

class Perfil extends Component {
  constructor(props) {
    super(props);
    dim = Dimensions.get("window");
    this.state = {
      orientation: this.isPortrait(),
      moradorId: this.props.navigation.getParam(
        "moradorId",
        this.props.login.data.MORADOR.MOR_INT_ID
      )
    };
    Dimensions.addEventListener("change", () => {
      dim = Dimensions.get("window");
      try {
        this.setState({
          orientation: this.isPortrait()
        });
      } catch (e) {
        alert(e.toString());
      }
    });
  }

  isPortrait = () => {
    return dim.height > dim.width ? "portrait" : "landscape";
  };

  static navigationOptions = ({ navigation }) => ({
    mode: "modal",
    title: "Perfil",
    headerStyle: {
      backgroundColor: "#3367d6",
      elevation: 0
    },
    headerTintColor: "#fff",
    headerLeft: (
      <HeaderBackButton
        onPress={() => navigation.navigate("Mensagens")}
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
    this.props.requestMoradorLoadId(this.state.moradorId);
  }

  render() {
    if (this.state.orientation == "portrait") {
      return (
        <View style={[styles.telaPerfil]}>
          <View
            style={{
              zindex: -1,
              position: "absolute",
              backgroundColor: "#3367d6",
              width: "100%",
              height: 200,
              elevation: 4
            }}
          />
          <View style={[styles.Perfil]}>
            <View style={styles.iconePerfil}>
              <Image
                source={require("../imgs/iQoHTjjl_400x400.jpeg")}
                style={styles.imgPerfil}
              />
            </View>
          </View>
          <View style={EstiloPadrao.containerPrimario}>
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Ionicons
                name="md-person"
                size={30}
                style={EstiloPadrao.iconeContainerPrimario}
              />
              <Text style={EstiloPadrao.textoContainerPrimario}>
                {this.props.morador.morador != {} &&
                this.props.morador.morador.MOR_STR_NOME != null
                  ? this.props.morador.morador.MOR_STR_NOME.toUpperCase()
                  : "INDEFINIDO"}
              </Text>
            </View>
            {this.props.morador.morador != {} ? (
              <View style={[EstiloPadrao.paddingMaior]}>
                <View style={[styles.informacao]}>
                  <Text style={[styles.tituloInf, EstiloPadrao.fonte]}>
                    DT DE INGRESSÃO
                  </Text>
                  <Text>
                    {this.props.morador.morador.MOR_DT_ING
                      ? this.props.morador.morador.MOR_DT_ING.substring(0, 10)
                      : false}
                  </Text>
                </View>
                <View style={EstiloPadrao.bordaHorizontalCurta} />
                <View style={[styles.informacao]}>
                  <Text style={[styles.tituloInf, EstiloPadrao.fonte]}>
                    CELULAR
                  </Text>
                  <Text>{this.props.morador.morador.MOR_STR_CEL}</Text>
                </View>
                <View style={EstiloPadrao.bordaHorizontalCurta} />
                <View style={[styles.informacao]}>
                  <Text style={[styles.tituloInf, EstiloPadrao.fonte]}>
                    SINDICO
                  </Text>
                  <Text>
                    {this.props.morador.morador.MOR_BIT_SIN == 1
                      ? "Sim"
                      : "Não"}
                  </Text>
                </View>
              </View>
            ) : (
              false
            )}
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.telaPerfil, { flexDirection: "row" }]}>
          <View
            style={{
              zindex: -1,
              position: "absolute",
              backgroundColor: "#3367d6",
              width: "100%",
              height: "100%"
            }}
          />
          <View style={[styles.Perfil, { flex: 3 }]}>
            <View style={styles.iconePerfil}>
              <Image
                source={require("../imgs/iQoHTjjl_400x400.jpeg")}
                style={styles.imgPerfil}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              flex: 4,
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <View style={EstiloPadrao.containerPrimario}>
              <View style={EstiloPadrao.tituloContainerPrimario}>
                <Ionicons
                  name="md-person"
                  size={30}
                  style={EstiloPadrao.iconeContainerPrimario}
                />
                <Text style={EstiloPadrao.textoContainerPrimario}>
                  {this.props.morador.success
                    ? this.props.morador.morador.MOR_STR_NOME.toUpperCase()
                    : "INDEFINIDO"}
                </Text>
              </View>
              {this.props.morador.success ? (
                <View style={[EstiloPadrao.paddingMaior]}>
                  <View style={[styles.informacao]}>
                    <Text style={[styles.tituloInf, EstiloPadrao.fonte]}>
                      DT DE INGRESSÃO
                    </Text>
                    <Text>
                      {this.props.morador.morador.MOR_DT_ING
                        ? this.props.morador.morador.MOR_DT_ING.substring(0, 10)
                        : false}
                    </Text>
                  </View>
                  <View style={EstiloPadrao.bordaHorizontalCurta} />
                  <View style={[styles.informacao]}>
                    <Text style={[styles.tituloInf, EstiloPadrao.fonte]}>
                      CELULAR
                    </Text>
                    <Text>{this.props.morador.morador.MOR_STR_CEL}</Text>
                  </View>
                  <View style={EstiloPadrao.bordaHorizontalCurta} />
                  <View style={[styles.informacao]}>
                    <Text style={[styles.tituloInf, EstiloPadrao.fonte]}>
                      SINDICO
                    </Text>
                    <Text>
                      {this.props.morador.morador.MOR_BIT_SIN == 1
                        ? "Sim"
                        : "Não"}
                    </Text>
                  </View>
                </View>
              ) : (
                false
              )}
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: "#ccc",
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "center",
    justifyContent: "center"
  },
  telaPerfil: {
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#eaedf2"
  },
  Perfil: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12
  },
  iconePerfil: {
    marginVertical: 26,
    borderRadius: 16, //60
    elevation: 6
  },
  imgPerfil: {
    height: 220,
    width: 220,
    borderRadius: 16, //60s
    //borderWidth: 8,
    borderColor: "#4285f4"
  },
  nomePessoa: {
    padding: 6,
    fontSize: 22,
    color: "#4285f4",
    textAlign: "center",
    textAlignVertical: "center"
  },
  botoes: {
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 18,
    marginVertical: 4,
    //backgroundColor:"#eee",
    borderRadius: 3
  },
  botao: {
    height: 48,
    width: 48,
    marginHorizontal: 34,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  textBotao: {
    color: "#9EA0A3",
    fontSize: 40
  },
  informacoes: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  informacao: {
    flexDirection: "row",
    alignItems: "center"
  },
  tituloInf: {
    color: "#4285f4",
    fontWeight: "bold",
    padding: 12
  },
  descInf: {
    fontSize: 24,
    color: "#4285f4",
    fontWeight: "bold"
  },
  outrasInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 6
  },
  bordaLateral: {
    height: "80%",
    borderLeftColor: "#E1E1DC",
    borderLeftWidth: 1,
    paddingHorizontal: 2
  },
  bordaHorizontal: {
    width: "100%",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    paddingVertical: 4,
    alignSelf: "center"
  }
});

const mapStateToProps = state => ({
  morador: state.morador,
  login: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(moradorActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Perfil);
