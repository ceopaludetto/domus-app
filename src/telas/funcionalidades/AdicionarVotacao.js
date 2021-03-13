import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ScrollView
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import EstiloPadrao from "../../EstiloPadrao";

import { Creators as votacaoActions } from "../../redux/ducks/votacao";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AdicionarVotacao extends React.Component {
  constructor() {
    super();
    this.state = {
      VOT_STR_TITULO: "",
      VOT_STR_DESC: ""
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
          Iniciar votação
        </Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: "#4285f4"
    },
    headerTintColor: "#fff",
    headerLeft: (
      <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#FFF" />
    )
  });

  handleBackButton = () => {
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleSubmit = () => {
    this.props.requestVotacao(
      this.state.VOT_STR_TITULO,
      this.state.VOT_STR_DESC
    );
  };

  handleChange = prop => text => this.setState({ [prop]: text });

  componentDidUpdate() {
    if (this.props.votacao.successNew) {
      alert("Votação criada com sucesso !!");
      this.props.requestVotacaoAnular();
    }
    if (this.props.votacao.failureNew) {
      alert("Oops...parece que algo deu errado ;(");
      this.props.requestVotacaoAnular();
    }
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#eaedf2",
          paddingVertical: 5
        }}
      >
        <View style={EstiloPadrao.containerPrimario}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>TITULO</Text>
          </View>
          <View style={EstiloPadrao.paddingPadrao}>
            <TextInput
              placeholder="O que você acha de ...??"
              placeholderTextColor={EstiloPadrao.placeholder.color}
              value={this.state.VOT_STR_TITULO}
              onChangeText={this.handleChange("VOT_STR_TITULO")}
            />
          </View>
        </View>
        <View style={[EstiloPadrao.containerPrimario, { flex: 1 }]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>DESCRIÇÃO</Text>
          </View>
          <TextInput
            style={{ flex: 1, textAlignVertical: "top", marginHorizontal: 4 }}
            multiline={true}
            placeholder="Tal tall tal tal tall :)"
            placeholderTextColor={EstiloPadrao.placeholder.color}
            value={this.state.VOT_STR_DESC}
            onChangeText={this.handleChange("VOT_STR_DESC")}
          />
        </View>
        <TouchableOpacity
          style={EstiloPadrao.submitPadrao}
          activeOpacity={0.9}
          onPress={this.handleSubmit}
        >
          <Text style={EstiloPadrao.submitPadraoTexto}>INICIAR</Text>
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
  },
  btnSugerir: {
    padding: 16,
    marginHorizontal: 10,
    marginVertical: 5,
    height: 46,
    borderRadius: 3,
    width: this.width - 12,
    backgroundColor: "#3367d6", //#4285f4 #DE4D5C
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  votacao: state.votacao
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(votacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdicionarVotacao);
