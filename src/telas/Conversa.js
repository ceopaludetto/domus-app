import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  BackHandler
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HeaderBackButton } from "react-navigation";
import Mensagem from "../componentes/Mensagem";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as messageActions } from "../redux/ducks/message";

class Conversa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MOR_INT_ID: this.props.navigation.getParam("MOR_INT_ID", 0),
      mensagem: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#4285f4"
    },
    headerTintColor: "#fff",
    headerLeft: (
      <HeaderBackButton
        onPress={() => navigation.navigate("Mensagens")}
        tintColor="#FFF"
      />
    ),
    headerTitle: (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center"
          //marginHorizontal: 16
        }}
        onPress={() =>
          navigation.navigate("PerfilTela", {
            moradorId: navigation.getParam("MOR_INT_ID", 0)
          })
        }
      >
        <Ionicons
          name="md-contact"
          size={42}
          style={{ color: "#FFF", marginRight: 8 }}
        />
        <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "500" }}>
          {navigation.getParam("MOR_STR_NOME", 0)}
        </Text>
      </TouchableOpacity>
    )
  });

  handleBackButton = () => {
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillMount() {
    this.props.requestMessageLoad(
      this.state.MOR_INT_ID,
      this.props.login.data.MORADOR.MOR_INT_ID
    );
    //this.props.requestMessageAnular();
  }

  handleChange = prop => text => this.setState({ [prop]: text });

  enviarMensagem() {
    this.props.requestMessage(
      this.state.mensagem,
      this.props.login.data.MORADOR.MOR_INT_ID,
      this.state.MOR_INT_ID
    );
  }

  componentDidUpdate() {
    this.props.message.failure ? alert("deu ruim") : false;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#eaedf2",
          paddingVertical: 5
        }}
      >
        <View style={{ flex: 1 }}>
          {this.props.message.messages
            ? this.props.message.messages.map(mensagem => {
                return (
                  <Mensagem
                    key={mensagem.MSG_INT_ID}
                    mensagem={mensagem}
                    moradorId={this.props.login.data.MORADOR.MOR_INT_ID}
                  />
                );
              })
            : false}
        </View>
        <View
          style={{
            height: 50,
            flexDirection: "row",
            width: "100%",
            padding: 4,
            justifyContent: "space-around",
            alignContent: "space-around"
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.inserirMensagem}
              value={this.state.mensagem}
              onChangeText={this.handleChange("mensagem")}
            />
          </View>
          <TouchableOpacity
            style={styles.enviarMensagem}
            activeOpacity={0.9}
            onPress={() => this.enviarMensagem()}
          >
            <View style={styles.botaoEnviar}>
              <Ionicons name="md-send" style={styles.iconeEnviar} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inserirMensagem: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#FFF",
    height: 38,
    margin: 4,
    padding: 8
  },
  enviarMensagem: {
    width: 56,
    justifyContent: "center",
    alignItems: "center"
  },
  iconeEnviar: {
    fontSize: 26,
    color: "#FFF",
    textAlign: "center"
  },
  botaoEnviar: {
    height: 38,
    width: 38,
    backgroundColor: "#4285f4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32
  }
});

const mapStateToProps = state => ({
  message: state.message,
  login: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(messageActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversa);
