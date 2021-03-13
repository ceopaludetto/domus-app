import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Creators as loginActions } from "../redux/ducks/login";

var { width } = Dimensions.get("screen");

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      invisivel: true,
      MOR_STR_LGN: "",
      MOR_STR_PSW: ""
    };
  }
  static navigationOptions = {
    header: null
  };

  showPass = () => {
    this.setState({
      invisivel: !this.state.invisivel
    });
  };

  handleSubmit = () => {
    this.props.requestLogin(this.state.MOR_STR_LGN, this.state.MOR_STR_PSW);
  };
  handleChange = prop => text => this.setState({ [prop]: text });

  componentWillMount() {
    if (this.props.navigation.getParam("anular", false)) {
      this.props.requestLoginAnular();
    }
  }

  componentWillUpdate(props) {
    if (props.login.success) {
      props.navigation.navigate("Portao");
    }
    if (props.login.failure || props.login.failureNew) {
      console.log(props.login.data);
    }
  }

  sair() {
    exToken();
    this.props.navigation.navigate("LoginTela", { anular: true });
  }

  render() {
    if (this.props.login.loadingToken) {
      return (
        <View
          behavior="padding"
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "#eaedf2",
            padding: 5,
            flex: 1,
            flexDirection: "column"
          }}
        >
          <Image
            source={require("../imgs/logo/logo.png")}
            style={{ height: 300, width: 256, margin: 12 }}
          />
          <Text>Entrando... :)</Text>
          <TouchableOpacity
            style={[EstiloPadrao.submitPadrao, { marginTop: 6 }]}
            activeOpacity={0.9}
            onPress={() => this.sair()}
          >
            <Text style={EstiloPadrao.submitPadraoTexto}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          behavior="padding"
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            alignContent: "center",
            backgroundColor: "#eaedf2",
            padding: 5,
            flex: 1,
            flexDirection: "column"
          }}
        >
          <View
            style={{
              flex: 1,
              margin: 20,
              padding: 6,
              alignContent: "center",
              justifyContent: "center"
            }}
          >
            <Image
              source={require("../imgs/logo/logo.png")}
              style={styles.logo}
              resizeMethod="auto"
            />
          </View>
          <View style={{ padding: 6, height: 26 }}>
            {this.props.login.failure || this.props.login.failureToken ? (
              <Text>Oops.. Acho que algo deu errado ;(</Text>
            ) : (
              false
            )}
          </View>

          <View style={styles.containerInput}>
            <TouchableOpacity style={styles.verSenha} activeOpacity={1}>
              <Ionicons
                name="md-person"
                size={24}
                color="grey"
                style={{ textAlign: "center", textAlignVertical: "center" }}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder={"CleytonVrau@Hotmail.com"}
              placeholderTextColor="rgba(225, 225, 225, 0.7)"
              value={this.state.MOR_STR_LGN}
              onChangeText={this.handleChange("MOR_STR_LGN")}
            />
          </View>
          <View style={styles.containerInput}>
            <TouchableOpacity style={styles.verSenha} activeOpacity={1}>
              <Ionicons
                name="md-lock"
                size={24}
                color="grey"
                style={{ textAlign: "center", textAlignVertical: "center" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.verSenha,
                {
                  position: "absolute",
                  zIndex: 2,
                  right: 0
                }
              ]}
              activeOpacity={1}
              onPress={this.showPass.bind(this)}
            >
              <Ionicons
                name={this.state.invisivel == false ? "md-eye-off" : "md-eye"}
                size={24}
                color="rgba(0,0,0,0.2)"
                style={{ textAlign: "center", textAlignVertical: "center" }}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              secureTextEntry={this.state.invisivel}
              placeholder="00008888"
              placeholderTextColor="rgba(225, 225, 225, 0.7)"
              value={this.state.MOR_STR_PSW}
              onChangeText={this.handleChange("MOR_STR_PSW")}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.btnFunc, { backgroundColor: "#4285f4" }]}
              onPress={() =>
                this.props.navigation.navigate("RecuperarSenhaTela")
              }
              activeOpacity={0.9}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 13,
                  fontWeight: "bold"
                }}
              >
                ESQUECI MINHA SENHA
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnFunc, { flex: 2 }]}
              onPress={this.handleSubmit}
              activeOpacity={0.9}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold"
                }}
              >
                LOGAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 280,
    width: 260
  },
  btnFunc: {
    padding: 16,
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 10,
    height: 46,
    borderRadius: 3,
    flex: 1,
    backgroundColor: "#3367d6", //#4285f4 #DE4D5C
    alignItems: "center",
    justifyContent: "center"
  },
  containerInput: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "row"
  },
  input: {
    width: width - 60,
    height: 45,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    fontSize: 16,
    color: "grey",
    //marginHorizontal: 10,
    //marginVertical: 5,
    backgroundColor: "#FFF"
  },
  verSenha: {
    alignContent: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#FFF",
    height: 45,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6
  }
});

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(loginActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
