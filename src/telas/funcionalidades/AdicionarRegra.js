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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as regrasActions } from "../../redux/ducks/regra";

class AdicionarRegra extends React.Component {
  constructor() {
    super();
    this.state = {
      REG_STR_DESC: ""
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
          Adicionar regra
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

  componentWillMount() {
    this.props.requestRegraAnular();
  }

  handleChange = prop => text => this.setState({ [prop]: text });

  handleSubmit = () => {
    this.props.requestRegra(this.state.REG_STR_DESC);
  };

  componentDidUpdate() {
    if (this.props.regra.successNew) {
      alert("Regra adicionado com sucesso !!");
      this.props.requestRegraAnular();
    }
    if (this.props.regra.failureNew) {
      alert("Oops... Acho que algo deu errado ;(");
      this.props.requestRegraAnular();
    }
  }

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
            <Text style={EstiloPadrao.textoContainerPrimario}>DESCRIÇÃO</Text>
          </View>
          <View style={EstiloPadrao.paddingPadrao}>
            <TextInput
              style={{ flex: 1, textAlignVertical: "top", marginHorizontal: 4 }}
              multiline={true}
              value={this.state.REG_STR_DESC}
              onChangeText={this.handleChange("REG_STR_DESC")}
              numberOfLines={4}
              placeholder="O portao nao podera ser aberto durante ..."
              placeholderTextColor={EstiloPadrao.placeholder.color}
            />
          </View>
        </View>
        <TouchableOpacity
          style={EstiloPadrao.submitPadrao}
          activeOpacity={0.9}
          onPress={this.handleSubmit}
        >
          <Text style={EstiloPadrao.submitPadraoTexto}>ADICIONAR</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  regra: state.regra
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(regrasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdicionarRegra);
