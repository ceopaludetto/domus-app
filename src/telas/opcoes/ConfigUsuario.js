import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  TextInput
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HeaderBackButton } from "react-navigation";
import EstiloPadrao from "../../EstiloPadrao";

import { Creators as moradorActions } from "../../redux/ducks/morador";
import { Creators as settingsActions } from "../../redux/ducks/settings";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ConfigUsuario extends React.Component {
  constructor() {
    super();
    this.state = {
      MOR_STR_NOME: "",
      MOR_STR_CEL: "",
      MOR_INT_PSWPORTA: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#4285f4"
    },
    headerTintColor: "#fff",
    headerLeft: (
      <HeaderBackButton
        onPress={() => {
          navigation.navigate("Portao");
        }}
        tintColor="#FFF"
      />
    ),
    title: "Configurações do usuario"
  });

  handleBackButton = () => {
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillMount() {
    this.props.requestMoradorLoadId(this.props.login.data.MORADOR.MOR_INT_ID);
  }

  handleSubmit = () => {
    morador = {
      MOR_INT_ID: this.props.login.data.MORADOR.MOR_INT_ID,
      MOR_INT_PSWPORTA: parseInt(this.state.MOR_INT_PSWPORTA),
      MOR_STR_CEL: parseInt(this.state.MOR_STR_CEL),
      MOR_STR_NOME: this.state.MOR_STR_NOME
    };
    this.props.requestSettings(morador);
  };

  componentDidUpdate() {
    if (this.props.settings.success) {
      alert("Informações atualizadas com sucesso !!");
      this.props.requestSettingsAnular();
    }
    if (this.props.settings.failure) {
      alert("Oops... Acho que algo deu errado ;(");
      this.props.requestSettingsAnular();
    }
  }

  handleChange = prop => text => this.setState({ [prop]: text });

  render() {
    if (this.props.morador.morador != {} && this.state.MOR_STR_NOME != null) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: "#eaedf2",
            paddingVertical: 5
          }}
        >
          <View style={[EstiloPadrao.containerPrimario]}>
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Text style={EstiloPadrao.textoContainerPrimario}>NOME</Text>
            </View>
            <View style={EstiloPadrao.paddingPadrao}>
              <TextInput
                maxLength={50}
                placeholder={this.props.morador.morador.MOR_STR_NOME}
                onChangeText={this.handleChange("MOR_STR_NOME")}
                //onChangeText={this.handleChange("SUG_STR_TITLE")}
                //value={this.state.SUG_STR_TITLE}
                placeholderTextColor={EstiloPadrao.placeholder.color}
              />
            </View>
          </View>
          <View style={[EstiloPadrao.containerPrimario]}>
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Text style={EstiloPadrao.textoContainerPrimario}>EMAIL</Text>
            </View>
            <View style={EstiloPadrao.paddingPadrao}>
              <Ionicons
                name="md-lock"
                size={32}
                color="#4285f4"
                style={{ position: "absolute", right: 14, top: 14 }}
              />
              <TextInput
                placeholder={this.props.morador.morador.MOR_STR_LGN}
                editable={false}
                //onChangeText={this.handleChange("SUG_STR_TITLE")}
                //value={this.state.SUG_STR_TITLE}
                placeholderTextColor={EstiloPadrao.placeholder.color}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingHorizontal: 8 }}>
            <View
              style={[
                EstiloPadrao.containerPrimario,
                { flex: 1, marginHorizontal: 5 }
              ]}
            >
              <View style={EstiloPadrao.tituloContainerPrimario}>
                <Text style={EstiloPadrao.textoContainerPrimario}>
                  TELEFONE
                </Text>
              </View>
              <View style={EstiloPadrao.paddingPadrao}>
                <TextInput
                  maxLength={11}
                  placeholder={this.props.morador.morador.MOR_STR_CEL}
                  onChangeText={this.handleChange("MOR_STR_CEL")}
                  keyboardType="number-pad"
                  //onChangeText={this.handleChange("SUG_STR_TITLE")}
                  //value={this.state.SUG_STR_TITLE}
                  placeholderTextColor={EstiloPadrao.placeholder.color}
                />
              </View>
            </View>
            <View
              style={[
                EstiloPadrao.containerPrimario,
                { flex: 1, marginHorizontal: 5 }
              ]}
            >
              <View style={EstiloPadrao.tituloContainerPrimario}>
                <Text style={EstiloPadrao.textoContainerPrimario}>
                  SENHA PORTAO
                </Text>
              </View>
              <View
                style={[EstiloPadrao.paddingPadrao, { flexDirection: "row" }]}
              >
                <Text
                  style={{
                    textAlignVertical: "center",
                    padding: 4,
                    fontSize: 16
                  }}
                >
                  #
                </Text>
                <TextInput
                  maxLength={6}
                  keyboardType="number-pad"
                  onChangeText={this.handleChange("MOR_INT_PSWPORTA")}
                  style={{ flex: 1 }}
                  placeholder={
                    this.props.morador.morador.MOR_INT_PSWPORTA
                      ? this.props.morador.morador.MOR_INT_PSWPORTA.toString()
                      : "000000"
                  }
                  placeholderTextColor={EstiloPadrao.placeholder.color}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={EstiloPadrao.submitPadrao}
            activeOpacity={0.9}
            onPress={this.handleSubmit}
          >
            <Text style={EstiloPadrao.submitPadraoTexto}>ALTERAR</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else {
      return <Text>Carregando ...</Text>;
    }
  }
}

const styles = StyleSheet.create({
  categoria: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#eaedf2",
    paddingVertical: 5
  },
  nomeCategoria: {
    color: "#545454", //"#868686",
    alignSelf: "center",
    marginHorizontal: 12,
    fontWeight: "bold",
    fontSize: 12
  },
  marginV: {
    marginTop: 12
  },
  opcoes: {
    margin: 10,
    backgroundColor: "#FFF",
    borderRadius: 6
  },
  opcao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  textOpcao: {
    padding: 12
  },
  iconeOpcao: {
    padding: 12,
    marginHorizontal: 8
  }
});

const mapStateToProps = state => ({
  morador: state.morador,
  login: state.login,
  settings: state.settings
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    Object.assign({}, moradorActions, settingsActions),
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigUsuario);
