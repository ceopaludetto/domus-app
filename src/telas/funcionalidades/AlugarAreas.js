import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  Picker
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import DateTimePicker from "react-native-modal-datetime-picker";
import EstiloPadrao from "../../EstiloPadrao";

//import { Creators as nomeActions } from "../../";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as localActions } from "../../redux/ducks/local";

class AlugarAreas extends React.Component {
  constructor() {
    super();
    this.state = {
      areaSelecionada: "",
      localDesc: "",
      isDateTimePickerVisible: false,
      isHrInicio: false,
      isHrFim: false,
      HrInicio: "",
      HrFim: "",
      dataSelecionada: ""
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
          Reserva de areas
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

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _showHoraInicio = () => this.setState({ isHrInicio: true });
  _showHoraFim = () => this.setState({ isHrFim: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _hideHoraInicio = () => this.setState({ isHrInicio: false });
  _hideHoraFim = () => this.setState({ isHrFim: false });

  _handleDatePicked = date => {
    this.setState({
      dataSelecionada: date.toLocaleDateString()
    });
    this._hideDateTimePicker();
  };

  _handleHrInicio = date => {
    this.setState({
      HrInicio: date.toString().substring(16, 21)
    });
    this._hideHoraInicio();
  };

  _handleHrFim = date => {
    this.setState({
      HrFim: date.toString().substring(16, 21)
    });
    this._hideHoraFim();
  };

  handleBackButton = () => {
    return true;
  };
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    this.props.requestLocalLoad();
  }

  componentWillUpdate() {
    if (this.props.local.successNew) {
      this.props.requestLocalAnular();
    }
    if (this.props.local.failureNew) {
      this.props.requestLocalAnular();
    }
  }

  trocarValor(itemValue, itemIndex) {
    this.setState({
      areaSelecionada: itemValue,
      localDesc: this.props.local.locais[itemIndex].LOC_STR_DESC
    });
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
            <Text style={EstiloPadrao.textoContainerPrimario}>AREA</Text>
          </View>
          <View style={EstiloPadrao.paddingPadrao}>
            <View style={{ height: 49 }}>
              <Picker
                selectedValue={this.state.areaSelecionada}
                style={{ flex: 1, padding: 4, marginVertical: 8 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.trocarValor(itemValue, itemIndex)
                }
              >
                {this.props.local.locais != [] ? (
                  this.props.local.locais.map(locais => {
                    return (
                      <Picker.Item
                        label={locais.LOC_STR_NOME}
                        value={locais.LOC_INT_ID}
                        key={locais.LOC_INT_ID}
                      />
                    );
                  })
                ) : (
                  <Picker.Item label="Sem locais disponiveis ;(" value={null} />
                )}
              </Picker>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 8 }}>
          <View
            style={[
              EstiloPadrao.containerPrimario,
              { flex: 1, marginHorizontal: 5 }
            ]}
          >
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Text style={EstiloPadrao.textoContainerPrimario}>PRESENTES</Text>
            </View>
            <View style={EstiloPadrao.paddingPadrao}>
              <TextInput
                keyboardType="number-pad"
                placeholder="28"
                placeholderTextColor={EstiloPadrao.placeholder.color}
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
              <Text style={EstiloPadrao.textoContainerPrimario}>HORARIO</Text>
            </View>
            <View
              style={[EstiloPadrao.paddingPadrao, { flexDirection: "row" }]}
            >
              <TouchableOpacity
                onPress={this._showHoraInicio}
                style={{ flex: 1 }}
                activeOpacity={0.9}
              >
                <TextInput
                  placeholder="12:12"
                  placeholderTextColor={EstiloPadrao.placeholder.color}
                  style={[EstiloPadrao.textoPrimario]}
                  value={this.state.HrInicio}
                  editable={false}
                />
                <DateTimePicker
                  isVisible={this.state.isHrInicio}
                  onConfirm={this._handleHrInicio}
                  onCancel={this._hideHoraInicio}
                  mode="time"
                />
              </TouchableOpacity>
              <View style={[EstiloPadrao.bordaVerticalCurta]} />
              <TouchableOpacity
                onPress={this._showHoraFim}
                style={{ flex: 1 }}
                activeOpacity={0.9}
              >
                <TextInput
                  placeholder="14:00"
                  placeholderTextColor={EstiloPadrao.placeholder.color}
                  style={[EstiloPadrao.textoPrimario]}
                  value={this.state.HrFim}
                  editable={false}
                />
                <DateTimePicker
                  isVisible={this.state.isHrFim}
                  onConfirm={this._handleHrFim}
                  onCancel={this._hideHoraFim}
                  mode="time"
                />
              </TouchableOpacity>
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
        </View>
        <View style={[EstiloPadrao.containerPrimario, { flex: 1 }]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>
              DESCRIÇÃO DA AREA
            </Text>
          </View>
          <TextInput
            style={[
              { flex: 1, textAlignVertical: "top", marginHorizontal: 4 },
              EstiloPadrao.textoPrimario
            ]}
            multiline={true}
            numberOfLines={4}
            value={this.state.localDesc}
            editable={false}
          />
        </View>
        <TouchableOpacity style={EstiloPadrao.submitPadrao} activeOpacity={0.9}>
          <Text style={[EstiloPadrao.submitPadraoTexto]}>RESERVAR</Text>
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
)(AlugarAreas);
