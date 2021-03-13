import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EstiloPadrao from "../EstiloPadrao";
import { withNavigation, HeaderBackButton } from "react-navigation";

class Opcoes extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#4285f4",
      elevation: 4
    },
    headerTintColor: "#fff",
    headerLeft: (
      <HeaderBackButton
        onPress={() => {
          navigation.navigate("Inicio");
        }}
        tintColor="#FFF"
      />
    ),
    title: "Configurações"
  });
  render() {
    return (
      <View style={{ backgroundColor: "#eaedf2", flex: 1, paddingVertical: 5 }}>
        <View style={EstiloPadrao.containerPrimario}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Ionicons
              name="ios-settings"
              size={30}
              style={EstiloPadrao.iconeContainerPrimario}
            />
            <Text style={EstiloPadrao.textoContainerPrimario}>
              CONFIGURAÇÕES
            </Text>
          </View>
          <View style={styles.opcoes}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.opcao, EstiloPadrao.bordaSuperiorRadius]}
              onPress={() =>
                this.props.navigation.navigate("ConfiguracaoAppTela")
              }
            >
              <Text style={[styles.textOpcao, EstiloPadrao.fonte]}>
                Configurações do aplicativo
              </Text>
              <Ionicons
                name="ios-arrow-forward"
                size={26}
                style={[styles.iconeOpcao, EstiloPadrao.textoSecundario]}
              />
            </TouchableOpacity>
            <View style={styles.bordaHorizontal} />
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.opcao, EstiloPadrao.bordaInferiosRadius]}
              onPress={() =>
                this.props.navigation.navigate("ConfiguracaoUsuarioTela")
              }
            >
              <Text style={[styles.textOpcao, EstiloPadrao.fonte]}>
                Configurações do usuario
              </Text>
              <Ionicons
                name="ios-arrow-forward"
                size={26}
                style={[styles.iconeOpcao, EstiloPadrao.textoSecundario]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  botaoConfig: {
    height: 30,
    flexDirection: "row",
    alignContent: "center",
    padding: 4,
    margin: 4
  },
  iconeConfig: {
    marginHorizontal: 15,
    fontSize: 20
  },
  categoria: {
    marginVertical: 12,
    flexDirection: "column",
    flex: 1
  },
  nomeCategoria: {
    color: "#2c3e50", //"#868686",
    alignSelf: "center",
    marginHorizontal: 12,
    fontWeight: "bold",
    fontSize: 12
  },
  opcoes: {
    margin: 10,
    backgroundColor: "#FFF",
    borderRadius: 3,
    height: 106
  },
  opcao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    alignContent: "space-between",
    justifyContent: "space-between"
  },
  textOpcao: {
    padding: 12
  },
  iconeOpcao: {
    padding: 12,
    marginHorizontal: 8
  },
  bordaHorizontal: {
    width: "100%",
    borderBottomColor: "#edf0f6",
    borderBottomWidth: 1,
    padding: 2,
    alignSelf: "center"
  }
});

export default withNavigation(Opcoes);
