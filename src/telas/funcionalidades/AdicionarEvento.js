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
import DateTimePicker from "react-native-modal-datetime-picker";

/*
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as eventoActions } from "../redux/ducks/evento";
*/

export default class AdicionarEvento extends React.Component {
  constructor() {
    super();
    this.state = {
      EVE_STR_TIT: "",
      EVE_STR_DESC: "",
      EVE_DT_DATA: "",
      EVE_DT_INICIO: "",
      EVE_DT_FIM: "",
      isDateTimePickerVisible: false,
      dataSelecionada: "",
      isHrInicio: false,
      isHrFim: false
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
          Adicionar evento
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
      EVE_DT_DATA: date.toLocaleDateString()
    });
    this._hideDateTimePicker();
  };

  _handleHrInicio = date => {
    this.setState({
      EVE_DT_INICIO: date.toString().substring(16, 21)
    });
    this._hideHoraInicio();
  };

  _handleHrFim = date => {
    this.setState({
      EVE_DT_FIM: date.toString().substring(16, 21)
    });
    this._hideHoraFim();
  };

  handleBackButton = () => {
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleSubmit = () => {
    this.props.requestEvento(
      this.state.EVE_STR_TIT,
      this.state.EVE_STR_DESC,
      this.state.EVE_DT_DATA,
      this.state.EVE_DT_INICIO,
      this.state.EVE_DT_FIM
    );
  };
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
              placeholder="Evento culinario"
              placeholderTextColor={EstiloPadrao.placeholder.color}
              value={this.state.EVE_STR_TIT}
              onChangeText={this.handleChange("EVE_STR_TIT")}
            />
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
                  value={this.state.EVE_DT_INICIO}
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
                  value={this.state.EVE_DT_FIM}
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
                  value={this.state.EVE_DT_DATA}
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
              DESCRIÇÃO DO EVENTO
            </Text>
          </View>
          <TextInput
            style={{ flex: 1, textAlignVertical: "top", marginHorizontal: 4 }}
            multiline={true}
            numberOfLines={4}
            value={this.state.EVE_STR_DESC}
            onChangeText={this.handleChange("EVE_STR_DESC")}
            placeholder=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non
            viverra eros, vitae ultricies nulla. Aenean semper elit ante,
            vitae consequat lorem pretium sed. Praesent eget ullamcorper
            dui. Nam ut congue nibh. Phasellus in sapien sem. Nulla finibus
            feugiat suscipit. Praesent condimentum ullamcorper nisi.
            Phasellus nec arcu id diam molestie fermentum."
            placeholderTextColor={EstiloPadrao.placeholder.color}
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

/*
const mapStateToProps = state => ({
  evento: state.evento
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(eventoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdicionarEvento);
*/
