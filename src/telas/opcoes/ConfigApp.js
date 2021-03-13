import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HeaderBackButton } from "react-navigation";
import EstiloPadrao from "../../EstiloPadrao";

class ConfigApp extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#4285f4"
    },
    headerTintColor: "#fff",
    headerLeft: (
      <HeaderBackButton
        onPress={() => {
          navigation.goBack();
        }}
        tintColor="#FFF"
      />
    ),
    title: "Configurações do aplicativo"
  });

  handleBackButton = () => {
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  render() {
    return (
      <ScrollView style={styles.categoria}>
        <View style={EstiloPadrao.containerPrimario}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Ionicons
              name="md-color-palette"
              size={30}
              style={EstiloPadrao.iconeContainerPrimario}
            />
            <Text style={EstiloPadrao.textoContainerPrimario}>TEMA</Text>
          </View>
          <TouchableOpacity
            style={[styles.opcao, EstiloPadrao.bordaInferiosRadius]}
            activeOpacity={0.9}
          >
            <Ionicons
              name="ios-mail"
              size={26}
              style={styles.iconeOpcao}
              color="grey"
            />
            <Text style={styles.textOpcao}>Tosemideia</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
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

export default ConfigApp;
