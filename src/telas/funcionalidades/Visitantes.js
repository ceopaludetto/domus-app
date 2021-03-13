import React from "react";
import ReactNative, {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  BackHandler
} from "react-native";
import EstiloPadrao from "../../EstiloPadrao";
import { HeaderBackButton } from "react-navigation";
import DateTimePicker from "react-native-modal-datetime-picker";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as visitaActions } from "../../redux/ducks/visita";

class Visitantes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MOR_STR_NOME: this.props.login.data.MORADOR.MOR_STR_NOME,
      MOR_INT_ID: this.props.login.data.MORADOR.MOR_INT_ID,
      VSIT_STR_NOME: "",
      isDateTimePickerVisible: false,
      isHrFim: false,
      HrFim: ""
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
          Cadastrar visitantes
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
  _showHoraFim = () => this.setState({ isHrFim: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _hideHoraFim = () => this.setState({ isHrFim: false });

  _handleDatePicked = date => {
    this.setState({
      dataSelecionada: date.toLocaleDateString()
    });
    this._hideDateTimePicker();
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
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleChange = prop => text => this.setState({ [prop]: text });

  handleSubmit = () => {
    this.props.requestVisita(
      this.state.MOR_INT_ID,
      this.state.VSIT_STR_NOME,
      this.state.dataSelecionada + " " + this.state.HrFim
    );
  };

  componentWillUpdate(props) {
    if (props.visita.success) {
      alert("Sucesso");
    }
    if (props.visita.failure) {
      alert("Algo deu errado :<");
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
            <Text style={EstiloPadrao.textoContainerPrimario}>
              SERA VINCULADO A
            </Text>
          </View>
          <View style={EstiloPadrao.paddingPadrao}>
            <TextInput
              value={this.state.MOR_STR_NOME}
              placeholderTextColor={EstiloPadrao.placeholder.color}
              editable={false}
            />
          </View>
        </View>
        <View style={EstiloPadrao.containerPrimario}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>
              NOME DO VISITANTE
            </Text>
          </View>
          <View style={EstiloPadrao.paddingPadrao}>
            <TextInput
              placeholde="Clyetu"
              placeholderTextColor={EstiloPadrao.placeholder.color}
              value={this.state.VSIT_STR_NOME}
              onChangeText={this.handleChange("VSIT_STR_NOME")}
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
          <View
            style={[
              EstiloPadrao.containerPrimario,
              { flex: 1, marginHorizontal: 5 }
            ]}
          >
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Text style={EstiloPadrao.textoContainerPrimario}>
                HR ENTRADA
              </Text>
            </View>
            <TouchableOpacity onPress={this._showHoraFim} activeOpacity={0.9}>
              <View style={EstiloPadrao.paddingPadrao}>
                <TextInput
                  placeholder="14:00"
                  placeholderTextColor={EstiloPadrao.placeholder.color}
                  style={[EstiloPadrao.textoPrimario]}
                  value={this.state.HrFim}
                  editable={false}
                />
              </View>
              <DateTimePicker
                isVisible={this.state.isHrFim}
                onConfirm={this._handleHrFim}
                onCancel={this._hideHoraFim}
                mode="time"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={EstiloPadrao.submitPadrao}
          activeOpacity={0.9}
          onPress={this.handleSubmit}
        >
          <Text style={EstiloPadrao.submitPadraoTexto}>CADASTRAR</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = ReactNative.StyleSheet.create({
  geralContainer: {
    flexDirection: "column",
    backgroundColor: "#eaedf2",
    borderRadius: 3,
    flex: 1
  },
  scrollHorizontal: {
    flexDirection: "row",
    height: 126,
    paddingHorizontal: 5
  },
  area: {
    height: 106,
    width: 106,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  btnReserva: {
    padding: 16,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
    height: 46,
    borderRadius: 3,
    width: this.width - 12,
    backgroundColor: "#3367d6", //#4285f4 #DE4D5C
    alignItems: "center",
    justifyContent: "center"
  },
  info: {
    paddingHorizontal: 6
  },
  fundoArea: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 3
  },
  nomeArea: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    zIndex: 4
  },
  overlayArea: {
    zIndex: 2,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(51,103,214,0.7)",
    borderRadius: 3
  },
  infoArea: {
    flex: 1,
    flexDirection: "column",
    padding: 4
  },
  titulos: {
    fontWeight: "bold",
    paddingVertical: 2,
    color: "#545454"
  },
  inputData: {
    backgroundColor: "#edf0f6",
    borderRadius: 3,
    flex: 2,
    marginRight: 6,
    height: 42,
    color: "#545454"
  },
  btnPegarData: {
    height: 42,
    width: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4285f4",
    borderRadius: 3
  },
  horaLinhaDoTempo: {
    flex: 1
  },
  ocupado: {
    backgroundColor: "#828489"
  },
  livre: {
    backgroundColor: "#69EE9A" //A7AAB0
  },
  prmHorario: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3
  },
  utmHorario: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3
  },
  horaReferencia: {
    fontSize: 10
  },
  legenda: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  exLegenda: {
    borderColor: "#cccfd6",
    borderRadius: 3,
    height: 18,
    width: 18
  },
  selecionado: {
    position: "absolute",
    zIndex: 3,
    top: 4,
    right: 8,
    borderRadius: 32,
    elevation: 4
  }
});

const mapStateToProps = state => ({
  login: state.login,
  visita: state.visita
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(visitaActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visitantes);
