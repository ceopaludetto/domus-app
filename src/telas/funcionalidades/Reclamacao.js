import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import EstiloPadrao from "../../EstiloPadrao";

/*
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as reclamacaoActions } from "../../redux/ducks/reclamacao";
*/

export default class Reclamacao extends React.Component {
  constructor() {
    super();
    this.state = {
      REC_STR_TIT: "",
      REC_STR_DESC: ""
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
          Reclamações
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

  /*
  handleSubmit = () => {
    this.props.requestReclamacao(
      this.state.REC_STR_TIT,
      this.state.REC_STR_DESC
    );
  };
  */

  handleChange = prop => text => this.setState({ [prop]: text });

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#eaedf2",
          paddingTop: 5
        }}
      >
        <View style={[EstiloPadrao.containerPrimario]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>TITULO</Text>
          </View>
          <View style={EstiloPadrao.paddingPadrao}>
            <TextInput
              placeholder="Acho que..."
              placeholderTextColor={EstiloPadrao.placeholder.color}
              value={this.state.REC_STR_TIT}
              onChangeText={this.handleChange("REC_STR_TIT")}
            />
          </View>
        </View>
        <View style={[EstiloPadrao.containerPrimario, { flex: 1 }]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>DESCREVA-O</Text>
          </View>
          <TextInput
            style={{ flex: 1, textAlignVertical: "top", marginHorizontal: 4 }}
            multiline={true}
            placeholder="Lamento pelo problema ;(, pode me contar o que aconteceu ??"
            placeholderTextColor={EstiloPadrao.placeholder.color}
            value={this.state.REC_STR_DESC}
            onChangeText={this.handleChange("REC_STR_DESC")}
          />
        </View>
        <TouchableOpacity
          style={EstiloPadrao.submitPadrao}
          activeOpacity={0.9}
          onPress={this.handleSubmit}
        >
          <Text style={EstiloPadrao.submitPadraoTexto}>RECLAMAR</Text>
        </TouchableOpacity>
      </ScrollView>
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
  }
});
