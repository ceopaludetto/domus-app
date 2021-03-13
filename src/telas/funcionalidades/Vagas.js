import React from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  StyleSheet,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import EstiloPadrao from "../../EstiloPadrao";

//import { Creators as nomeActions } from "../../";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export default class Vagas extends React.Component {
  constructor() {
    super();
    this.state = {
      language: "a"
    };
  }

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
          Sorteio de vagas
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

  render() {
    return (
      <View contentContainerStyle={{ flex: 1, backgroundColor: "#eaedf2" }}>
        <View style={[EstiloPadrao.containerPrimario]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>
              SOBRE O QUE ?
            </Text>
          </View>
          <View style={[EstiloPadrao.paddingPadrao]}>
            <View style={{ height: 49 }}>
              <Picker
                style={{ flex: 1, padding: 4, marginVertical: 8 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ language: itemValue })
                }
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={[EstiloPadrao.containerPrimario, { flex: 1 }]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>DESCREVA-A</Text>
          </View>
          <TextInput
            style={{ flex: 1, textAlignVertical: "top", marginHorizontal: 4 }}
            multiline={true}
            placeholder="Toda sugestão é bem vinda :)"
            placeholderTextColor={EstiloPadrao.placeholder.color}
          />
        </View>
        <TouchableOpacity style={EstiloPadrao.submitPadrao} activeOpacity={0.9}>
          <Text style={EstiloPadrao.submitPadraoTexto}>SUGERIR :)</Text>
        </TouchableOpacity>
      </View>
    );
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
  btnSugerir: {
    padding: 16,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
    height: 46,
    borderRadius: 3,
    width: this.width - 12,
    backgroundColor: "#3367d6", //#4285f4 #DE4D5C
    alignItems: "center",
    justifyContent: "center"
  }
});
