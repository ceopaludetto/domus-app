import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Picker,
  BackHandler,
  ScrollView
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import EstiloPadrao from "../../EstiloPadrao";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as assistenciaActions } from "../../redux/ducks/assistencia";

class SolicitarAssistencia extends React.Component {
  constructor() {
    super();
    this.state = {
      AST_STR_TIT: "",
      AST_STR_TIPO: "",
      AST_STR_DESC: ""
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
          Solicitar Assistencia
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

  handleSubmit = () => {
    this.props.requestAssistencia(
      this.state.AST_STR_TIT,
      this.state.AST_STR_DESC,
      this.state.AST_STR_TIPO
    );
  };

  componentDidUpdate() {
    if (this.props.assistencia.success) {
      alert("deu bom");
      this.props.requestAssistenciaAnular();
    }
    if (this.props.assistencia.failure) {
      alert("deu asdas");
      this.props.requestAssistenciaAnular();
    }
  }

  handleChange = prop => text => this.setState({ [prop]: text });

  render() {
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
            <Text style={EstiloPadrao.textoContainerPrimario}>TITULO</Text>
          </View>
          <View style={EstiloPadrao.paddingPadrao}>
            <TextInput
              placeholder="Motor falhando"
              placeholderTextColor={EstiloPadrao.placeholder.color}
              onChangeText={this.handleChange("AST_STR_TIT")}
              value={this.state.AST_STR_TIT}
            />
          </View>
        </View>
        <View style={[EstiloPadrao.containerPrimario]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>
              SOBRE O QUE ?
            </Text>
          </View>
          <View style={[EstiloPadrao.paddingPadrao]}>
            <View style={{ height: 49 }}>
              <Picker
                selectedValue={this.state.AST_STR_TIPO}
                style={{ flex: 1, padding: 4, marginVertical: 8 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ AST_STR_TIPO: itemValue })
                }
              >
                <Picker.Item label="Software" value="software" />
                <Picker.Item label="Hardware" value="hardware" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={[EstiloPadrao.containerPrimario, { flex: 1 }]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>
              COM O QUE PRECISA DE AJUDA ?
            </Text>
          </View>
          <TextInput
            style={{ flex: 1, textAlignVertical: "top", marginHorizontal: 4 }}
            multiline={true}
            numberOfLines={4}
            placeholder="Estou tendo um erro com ..."
            placeholderTextColor={EstiloPadrao.placeholder.color}
            onChangeText={this.handleChange("AST_STR_DESC")}
            value={this.state.AST_STR_DESC}
          />
        </View>
        <TouchableOpacity
          style={EstiloPadrao.submitPadrao}
          activeOpacity={0.9}
          onPress={this.handleSubmit}
        >
          <Text style={EstiloPadrao.submitPadraoTexto}>SOLICITAR</Text>
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

const mapStateToProps = state => ({
  assistencia: state.assistencia
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(assistenciaActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SolicitarAssistencia);
