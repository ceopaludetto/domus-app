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

import { Creators as moradorActions } from "../../redux/ducks/morador";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Morador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MOR_STR_NOME: "",
      MOR_STR_CEL: "",
      isDateTimePickerVisible: false,
      dataSelecionada: "",
      moradorAtivo: null,
      representante: null,
      moradorId: this.props.navigation.getParam("moradorId", 0)
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
          Editar morador
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

  componentWillMount() {
    this.props.requestMoradorLoadId(this.state.moradorId);
  }

  handleChange = prop => text => this.setState({ [prop]: text });

  render() {
    if (this.props.morador.morador != {} && this.state.MOR_STR_NOME != null) {
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
                placeholder={this.props.morador.morador.MOR_STR_NOME}
                onChangeText={this.handleChange("MOR_STR_NOME")}
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
                  DT INGRESSÃO
                </Text>
              </View>
              <TouchableOpacity onPress={this._showDateTimePicker}>
                <View style={EstiloPadrao.paddingPadrao}>
                  <TextInput
                    placeholder={
                      this.props.morador.morador.MOR_DT_ING
                        ? this.props.morador.morador.MOR_DT_ING.substring(0, 10)
                        : "999999999"
                    }
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
                  onChangeText={this.handleChange("MOR_STR_CEL")}
                  placeholder={this.props.morador.morador.MOR_STR_CEL}
                  keyboardType="number-pad"
                  placeholderTextColor={EstiloPadrao.placeholder.color}
                />
              </View>
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
                  MORADOR ATIVO ?
                </Text>
              </View>
              <View style={EstiloPadrao.paddingPadrao}>
                <View style={{ height: 49 }}>
                  <Picker
                    selectedValue={this.state.moradorAtivo}
                    style={{ flex: 1, padding: 4, marginVertical: 8 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ moradorAtivo: itemValue })
                    }
                  >
                    <Picker.Item label="Não" value="0" />
                    <Picker.Item label="Sim" value="1" />
                  </Picker>
                </View>
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
                  REPRESENTANTE ?
                </Text>
              </View>
              <View style={EstiloPadrao.paddingPadrao}>
                <View style={{ height: 49 }}>
                  <Picker
                    selectedValue={this.state.representante}
                    style={{ flex: 1, padding: 4, marginVertical: 8 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ representante: itemValue })
                    }
                  >
                    <Picker.Item label="Não" value="0" />
                    <Picker.Item label="Sim" value="1" />
                  </Picker>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={EstiloPadrao.submitPadrao}
            activeOpacity={0.9}
          >
            <Text style={[EstiloPadrao.submitPadraoTexto]}>CONCLUIDO</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else {
      this.forceUpdate();
      return <Text>Carregando ...</Text>;
    }
  }
}

const mapStateToProps = state => ({
  morador: state.morador
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(moradorActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Morador);
