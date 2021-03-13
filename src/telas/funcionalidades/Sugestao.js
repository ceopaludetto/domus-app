import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import EstiloPadrao from "../../EstiloPadrao";

/*
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as sugestaoActions } from "../redux/ducks/sugestao";
*/

export default class Sugestao extends React.Component {
  constructor() {
    super();
    this.state = {
      SUG_STR_TITLE: "",
      SUG_STR_DESC: ""
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
          Sugestões
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

  handleBackButton = () => {
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleSubmit = () => {
    this.props.requestSugestao(
      this.state.SUG_STR_TITLE,
      this.state.SUG_STR_DESC
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
              placeholder="Acho que..."
              onChangeText={this.handleChange("SUG_STR_TITLE")}
              value={this.state.SUG_STR_TITLE}
              placeholderTextColor={EstiloPadrao.placeholder.color}
            />
          </View>
        </View>
        <View style={[EstiloPadrao.containerPrimario, { flex: 1 }]}>
          <View style={EstiloPadrao.tituloContainerPrimario}>
            <Text style={EstiloPadrao.textoContainerPrimario}>DESCREVA-A</Text>
          </View>
          <TextInput
            style={{ flex: 1, textAlignVertical: "top", marginHorizontal: 4 }}
            multiline={true}
            placeholder="Toda sugestão é bem vinda :)"
            placeholderTextColor={EstiloPadrao.placeholder.color}
            onChangeText={this.handleChange("SUG_STR_DESC")}
            value={this.state.SUG_STR_DESC}
          />
        </View>
        <TouchableOpacity
          style={EstiloPadrao.submitPadrao}
          activeOpacity={0.9}
          onPress={this.handleSubmit}
        >
          <Text style={EstiloPadrao.submitPadraoTexto}>SUGERIR :)</Text>
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

/*
const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(sugestaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sugestao);
*/
