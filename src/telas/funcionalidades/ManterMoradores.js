import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  Image
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import EstiloPadrao from "../../EstiloPadrao";
import { createFilter } from "react-native-search-filter";

import { Creators as moradorActions } from "../../redux/ducks/morador";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

let { width } = Dimensions.get("screen");

const KEYS_TO_FILTERS = [
  "MOR_STR_NOME",
  "MOR_BIT_ATIVO",
  "MOR_BIT_SIN",
  "MOR_BIT_REP",
  "MOR_DT_ING",
  "MOR_STR_CEL"
];
class ManterMoradores extends React.Component {
  constructor() {
    super();
    dim = Dimensions.get("window");
    this.state = {
      condominio: null,
      andar: null,
      searchTerm: "",
      orientation: this.isPortrait()
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
    headerTitle: (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center"
        }}
      >
        <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "500" }}>
          Moradores
        </Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: "#4285f4"
    },
    headerTintColor: "#fff",
    headerLeft: (
      <HeaderBackButton
        onPress={() => navigation.navigate("Mais")}
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
    this.props.requestMoradorLoad();
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  handleChange = prop => text => this.setState({ [prop]: text });

  editarMorador() {
    this.props.requestMoradorLoad();
    this.props.navigation.navigate("MoradorTela", {
      moradorId: this.state.morador
    });
  }

  render() {
    const moradoresFiltrados = this.props.morador.moradores.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    if (this.state.orientation == "portrait") {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: "#eaedf2",
            paddingTop: 5
          }}
        >
          <View style={EstiloPadrao.containerPrimario}>
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Text style={EstiloPadrao.textoContainerPrimario}>
                FILTAR MORADORES
              </Text>
            </View>
            <View style={EstiloPadrao.paddingPadrao}>
              <TextInput
                placeholder="Pesquiser por nome, celular, etc"
                placeholderTextColor={EstiloPadrao.placeholder.color}
                value={this.state.searchTerm}
                onChangeText={this.handleChange("searchTerm")}
              />
            </View>
          </View>
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
              ? moradoresFiltrados.map(moradores => {
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
                        source={require("../../imgs/iQoHTjjl_400x400.jpeg")}
                        style={styles.imgMorador}
                      />
                    </TouchableOpacity>
                  );
                })
              : false}
          </ScrollView>
          <TouchableOpacity
            style={EstiloPadrao.submitPadrao}
            //onPress={() => this.props.navigation.navigate("MoradorTela")}
            onPress={() => this.editarMorador()}
            activeOpacity={0.9}
          >
            <Text style={EstiloPadrao.submitPadraoTexto}>EDITAR</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#eaedf2",
            paddingTop: 5
          }}
        >
          <View style={EstiloPadrao.containerPrimario}>
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Text style={EstiloPadrao.textoContainerPrimario}>
                FILTAR MORADORES
              </Text>
            </View>
            <View style={EstiloPadrao.paddingPadrao}>
              <TextInput
                placeholder="Pesquiser por nome, celular, etc"
                placeholderTextColor={EstiloPadrao.placeholder.color}
                value={this.state.searchTerm}
                onChangeText={this.handleChange("searchTerm")}
              />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "column" }}>
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
                ? moradoresFiltrados.map(moradores => {
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
                          <Text
                            style={[styles.infoMorador, EstiloPadrao.fonte]}
                          >
                            <Text style={{ fontWeight: "bold" }}>NOME - </Text>
                            {moradores.MOR_STR_NOME}
                          </Text>
                          <Text
                            style={[styles.infoMorador, EstiloPadrao.fonte]}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              CELULAR -{" "}
                            </Text>
                            {moradores.MOR_STR_CEL}
                          </Text>
                          <Text
                            style={[styles.infoMorador, EstiloPadrao.fonte]}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              DT DE INGRESSÃO -{" "}
                            </Text>
                            {moradores.MOR_DT_ING.substring(0, 10)}
                          </Text>
                          <Text
                            style={[styles.infoMorador, EstiloPadrao.fonte]}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              REPRESENTANTE -{" "}
                            </Text>
                            {moradores.MOR_BIT_REP == 1 ? "Sim" : "Não"}
                          </Text>
                          <Text
                            style={[styles.infoMorador, EstiloPadrao.fonte]}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              SINDICO -{" "}
                            </Text>
                            {moradores.MOR_BIT_SIN == 1 ? "Sim" : "Não"}
                          </Text>
                          <Text
                            style={[styles.infoMorador, EstiloPadrao.fonte]}
                          >
                            <Text style={{ fontWeight: "bold" }}>ATIVO - </Text>
                            {moradores.MOR_BIT_ATIVO == 1 ? "Sim" : "Não"}
                          </Text>
                        </View>
                        <Image
                          source={require("../../imgs/iQoHTjjl_400x400.jpeg")}
                          style={styles.imgMorador}
                        />
                      </TouchableOpacity>
                    );
                  })
                : false}
            </ScrollView>
            <TouchableOpacity
              style={EstiloPadrao.submitPadrao}
              onPress={() => this.editarMorador()}
              activeOpacity={0.9}
            >
              <Text style={EstiloPadrao.submitPadraoTexto}>EDITAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: "column",
    margin: 10,
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 3,
    elevation: 0
    //flex:1
    //borderBottomWidth:0.5, borderTopWidth:0.5
  },
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
)(ManterMoradores);
