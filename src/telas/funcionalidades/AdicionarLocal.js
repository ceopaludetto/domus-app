import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
  ScrollView
} from "react-native";

import { HeaderBackButton } from "react-navigation";
import EstiloPadrao from "../../EstiloPadrao";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as localActions } from "../../redux/ducks/local";

class AdicionarLocal extends React.Component {
  constructor() {
    super();
    this.state = {
      LOC_STR_NOME: "",
      LOC_STR_DESC: "",
      LOC_INT_QTDE: ""
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center"
          //marginHorizontal: 16
        }}
      >
        {/*<Ionicons
          name="ios-paper"
          size={32}
          style={{ color: "#FFF", marginRight: 8 }}
        />*/}
        <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "500" }}>
          Adicionar areas
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

  handleChange = prop => text => this.setState({ [prop]: text });

  componentDidUpdate() {
    if (this.props.local.successNew) {
      alert("Local adicionado com sucesso !!");
      this.props.requestLocalAnular();
    }
    if (this.props.local.failureNew) {
      alert("Oops... Acho que algo deu errado ;(");
      this.props.requestLocalAnular();
    }
  }

  handleSubmit = () => {
    this.props.requestLocal(
      this.state.LOC_STR_NOME,
      this.state.LOC_STR_DESC,
      this.state.LOC_INT_QTDE
    );
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#eaedf2",
          paddingVertical: 5
        }}
      >
        <View style={{ flexDirection: "row", paddingHorizontal: 8 }}>
          <View
            style={[
              EstiloPadrao.containerPrimario,
              { flex: 1, marginHorizontal: 5 }
            ]}
          >
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Text style={EstiloPadrao.textoContainerPrimario}>NOME AREA</Text>
            </View>
            <View style={EstiloPadrao.paddingPadrao}>
              <TextInput
                placeholder="Churrasqueira"
                placeholderTextColor={EstiloPadrao.placeholder.color}
                value={this.state.LOC_STR_NOME}
                onChangeText={this.handleChange("LOC_STR_NOME")}
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
                PESSOAS SUPORTADAS
              </Text>
            </View>
            <View style={EstiloPadrao.paddingPadrao}>
              <TextInput
                placeholder="28"
                keyboardType="number-pad"
                placeholderTextColor={EstiloPadrao.placeholder.color}
                value={this.state.LOC_INT_QTDE}
                onChangeText={this.handleChange("LOC_INT_QTDE")}
              />
            </View>
          </View>
        </View>
        <View style={[EstiloPadrao.containerPrimario, { flex: 1 }]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>
              DESCRIÇÃO DA AREA
            </Text>
          </View>
          <TextInput
            style={{ flex: 1, textAlignVertical: "top", marginHorizontal: 4 }}
            multiline={true}
            numberOfLines={4}
            placeholder="3 churrasqueiras"
            placeholderTextColor={EstiloPadrao.placeholder.color}
            value={this.state.LOC_STR_DESC}
            onChangeText={this.handleChange("LOC_STR_DESC")}
          />
        </View>
        <TouchableOpacity
          style={EstiloPadrao.submitPadrao}
          activeOpacity={0.9}
          onPress={this.handleSubmit}
        >
          <Text style={[EstiloPadrao.submitPadraoTexto]}>ADICIONAR</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  local: state.local
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(localActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdicionarLocal);
