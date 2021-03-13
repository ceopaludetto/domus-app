import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import EstiloPadrao from "../../EstiloPadrao";

import { Creators as despesaActions } from "../../redux/ducks/despesa";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AdicionarDespesa extends React.Component {
  constructor() {
    super();
    this.state = {
      DESP_STR_DESC: "",
      DESP_NM_VAL: ""
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
          Despesa
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
    this.props.requestDespesa(this.state.DESP_STR_DESC, this.state.DESP_NM_VAL);
  };

  componentDidUpdate() {
    if (this.props.despesa.successNew) {
      alert("Despesa adicionada com sucesso !!");
      this.props.requestDespesaAnular();
    }
    if (this.props.despesa.failureNew) {
      alert("Oops... Acho que algo deu errado ;(");
      this.props.requestDespesaAnular();
    }
  }

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
              placeholder="Água"
              placeholderTextColor={EstiloPadrao.placeholder.color}
              value={this.state.DESP_STR_DESC}
              style={{ flex: 1 }}
              onChangeText={this.handleChange("DESP_STR_DESC")}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: 7 }}>
          <View
            style={[
              EstiloPadrao.containerPrimario,
              { flex: 1, marginHorizontal: 7 }
            ]}
          >
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Text style={EstiloPadrao.textoContainerPrimario}>
                VALOR BASE
              </Text>
            </View>
            <View style={EstiloPadrao.paddingPadrao}>
              <TextInput
                placeholder="1000"
                placeholderTextColor={EstiloPadrao.placeholder.color}
                keyboardType="number-pad"
                value={this.state.DESP_NM_VAL}
                style={{ flex: 1 }}
                onChangeText={this.handleChange("DESP_NM_VAL")}
              />
            </View>
          </View>
          <View
            style={[
              EstiloPadrao.containerPrimario,
              { flex: 1, marginHorizontal: 7 }
            ]}
          >
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Text style={EstiloPadrao.textoContainerPrimario}>
                VALOR GASTO
              </Text>
            </View>
            <View style={EstiloPadrao.paddingPadrao}>
              <TextInput
                placeholder="200"
                placeholderTextColor={EstiloPadrao.placeholder.color}
                keyboardType="number-pad"
                value={this.state.REC_STR_TIT}
                style={{ flex: 1 }}
                onChangeText={this.handleChange("REC_STR_TIT")}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={EstiloPadrao.submitPadrao}
          activeOpacity={0.9}
          onPress={this.handleSubmit}
        >
          <Text style={EstiloPadrao.submitPadraoTexto}>ADICIONAR DESPESA</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  despesa: state.despesa
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(despesaActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdicionarDespesa);
