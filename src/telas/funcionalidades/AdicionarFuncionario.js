import React from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  ScrollView,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import EstiloPadrao from "../../EstiloPadrao";
import DateTimePicker from "react-native-modal-datetime-picker";

import { Creators as funcionarioActions } from "../../redux/ducks/funcionario";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AdicionarFuncionario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FUNC_STR_NOME: "",
      FUNC_STR_CEL: "",
      FUNC_STR_CARGO: "",
      FUNC_STR_EMPR: "",
      isDateTimePickerVisible: false,
      dataSelecionada: "",
      moradorAtivo: null,
      representante: null
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
          Funcionario
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

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({
      MOR_DT_ING: date,
      dataSelecionada: date.toLocaleDateString()
    });
    this._hideDateTimePicker();
  };

  handleBackButton = () => {
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleChange = prop => text => this.setState({ [prop]: text });

  handleSubmit = () => {
    this.props.requestFuncionario(
      this.state.FUNC_STR_NOME,
      this.state.FUNC_STR_CEL,
      this.state.FUNC_STR_CARGO,
      this.state.FUNC_STR_EMPR
    );
  };

  componentDidUpdate() {
    if (this.props.funcionario.successNew) {
      alert("Funcionario adicionado com sucesso !!");
      this.props.requestFuncionarioAnular();
    }
    if (this.props.funcionario.failureNew) {
      alert("Oops... Acho que algo deu errado ;(");
      this.props.requestFuncionarioAnular();
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
        <View style={[EstiloPadrao.containerPrimario]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>NOME</Text>
          </View>
          <View style={EstiloPadrao.paddingPadrao}>
            <TextInput
              onChangeText={this.handleChange("FUNC_STR_NOME")}
              placeholderTextColor={EstiloPadrao.placeholder.color}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 5 }}>
          <View
            style={[
              EstiloPadrao.containerPrimario,
              { flex: 1, marginHorizontal: 5 }
            ]}
          >
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Text style={EstiloPadrao.textoContainerPrimario}>
                DT ADMISSÃO
              </Text>
            </View>
            <TouchableOpacity onPress={this._showDateTimePicker}>
              <View style={EstiloPadrao.paddingPadrao}>
                <TextInput
                  placeholder="12/12/12"
                  placeholderTextColor={EstiloPadrao.placeholder.color}
                  style={[EstiloPadrao.textoPrimario]}
                  value={this.state.dataSelecionada}
                  editable={false}
                />
              </View>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                mode="date"
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              EstiloPadrao.containerPrimario,
              { flex: 1, marginHorizontal: 5 }
            ]}
          >
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Text style={EstiloPadrao.textoContainerPrimario}>CELULAR</Text>
            </View>
            <View style={EstiloPadrao.paddingPadrao}>
              <TextInput
                onChangeText={this.handleChange("FUNC_STR_CEL")}
                placeholder="984521744"
                keyboardType="number-pad"
                placeholderTextColor={EstiloPadrao.placeholder.color}
              />
            </View>
          </View>
        </View>
        <View style={[EstiloPadrao.containerPrimario]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>CARGO</Text>
          </View>
          <View style={EstiloPadrao.paddingPadrao}>
            <TextInput
              onChangeText={this.handleChange("FUNC_STR_CARGO")}
              placeholderTextColor={EstiloPadrao.placeholder.color}
            />
          </View>
        </View>
        <View style={[EstiloPadrao.containerPrimario]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>EMPRESA</Text>
          </View>
          <View style={EstiloPadrao.paddingPadrao}>
            <TextInput
              onChangeText={this.handleChange("FUNC_STR_EMPR")}
              placeholderTextColor={EstiloPadrao.placeholder.color}
            />
          </View>
        </View>
        <TouchableOpacity
          style={EstiloPadrao.submitPadrao}
          activeOpacity={0.9}
          onPress={this.handleSubmit}
        >
          <Text style={[EstiloPadrao.submitPadraoTexto]}>CONCLUIDO</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  funcionario: state.funcionario
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(funcionarioActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdicionarFuncionario);
