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
import DateTimePicker from "react-native-modal-datetime-picker";
import EstiloPadrao from "../../EstiloPadrao";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as comunicadoActions } from "../../redux/ducks/comunicado";

class AdicionarComunicado extends React.Component {
  constructor() {
    super();
    this.state = {
      COMU_STR_TIT: "",
      COMU_STR_DESC: "",
      COMU_DT_DATA: "",
      dataAlterada: "",
      isDateTimePickerVisible: false
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
          Enviar comunicado
        </Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: "#4285f4"
    },
    headerTintColor: "#fff",
    headerLeft: (
      <HeaderBackButton
        onPress={() => navigation.navigate("EditarComunicadoTela")}
        tintColor="#FFF"
      />
    )
  });

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({
      COMU_DT_DATA: date,
      dataAlterada: date.toLocaleDateString()
    });
    this._hideDateTimePicker();
  };

  handleBackButton = () => {
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleSubmit = () => {
    this.props.requestComunicado(
      this.state.COMU_STR_TIT,
      this.state.COMU_DT_DATA.toISOString(),
      this.state.COMU_STR_DESC
    );
  };

  componentDidUpdate() {
    if (this.props.comunicado.successNew) {
      alert("Comunicado adicionado com sucesso !!");
      this.props.requestComunicadoAnular();
    }
    if (this.props.comunicado.failureNew) {
      alert("Oops... Acho que algo deu errado ;(");
      this.props.requestComunicadoAnular();
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
        <View style={{ flexDirection: "row", paddingHorizontal: 8 }}>
          <View
            style={[
              EstiloPadrao.containerPrimario,
              { flex: 2, marginHorizontal: 5 }
            ]}
          >
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Text style={EstiloPadrao.textoContainerPrimario}>TITULO</Text>
            </View>
            <View style={EstiloPadrao.paddingPadrao}>
              <TextInput
                placeholder="Piscina fechada"
                placeholderTextColor={EstiloPadrao.placeholder.color}
                value={this.state.COMU_STR_TIT}
                onChangeText={this.handleChange("COMU_STR_TIT")}
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
              <Text style={EstiloPadrao.textoContainerPrimario}>DATA</Text>
            </View>
            <TouchableOpacity
              onPress={this._showDateTimePicker}
              activeOpacity={0.9}
            >
              <View style={EstiloPadrao.paddingPadrao}>
                <TextInput
                  placeholder="12/12/12"
                  placeholderTextColor={EstiloPadrao.placeholder.color}
                  style={[EstiloPadrao.textoPrimario]}
                  value={this.state.dataAlterada}
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
        </View>
        <View style={[EstiloPadrao.containerPrimario, { flex: 1 }]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>DESCRIÇÃO</Text>
          </View>
          <TextInput
            style={{ flex: 1, textAlignVertical: "top", marginHorizontal: 4 }}
            multiline={true}
            numberOfLines={4}
            placeholder="Seu comunicado :)"
            placeholderTextColor={EstiloPadrao.placeholder.color}
            value={this.state.COMU_STR_DESC}
            onChangeText={this.handleChange("COMU_STR_DESC")}
          />
        </View>
        <TouchableOpacity
          style={EstiloPadrao.submitPadrao}
          activeOpacity={0.9}
          onPress={this.handleSubmit}
        >
          <Text style={[EstiloPadrao.submitPadraoTexto]}>ENVIAR</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  comunicado: state.comunicado
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(comunicadoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdicionarComunicado);
