import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EstiloPadrao from "../EstiloPadrao";

import { Creators as forgotActions } from "../redux/ducks/forgot";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

var { width } = Dimensions.get("screen");

class RecuperarSenha extends Component {
  constructor() {
    super();
    this.state = {
      MOR_STR_LGN: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#4285f4",
      elevation: 0
    },
    headerTintColor: "#fff",
    title: "Esqueci minha senha"
  });

  validar() {
    this.props.requestForgot(this.state.MOR_STR_LGN);
  }

  componentDidUpdate() {
    if (this.props.forgot.success) {
      alert("Um link para recuperação da conta sera enviado para esse email");
      this.props.requestForgotAnular();
    }
    if (this.props.forgot.failure) {
      alert("Acho que voce digitou algo errado :(");
      this.props.requestForgotAnular();
    }
    console.log(this.props.forgot.data);
  }

  handleChange = prop => text => this.setState({ [prop]: text });

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#4285f4",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            height: 300,
            width: 300,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {/*<Image
            source={require("../imgs/logo/logo.png")}
            style={{ height: 120, width: 100 }}
          />*/}
          <View
            style={{
              backgroundColor: "#3367d6",
              borderRadius: 110,
              height: 220,
              justifyContent: "center",
              alignItems: "center",
              width: 220,
              padding: 16
            }}
          >
            <Ionicons
              name="md-lock"
              size={200}
              color="#FFF"
              style={{
                alignItems: "center"
              }}
            />
          </View>

          <Text style={{ fontSize: 20, color: "#FFF", padding: 6 }}>
            Esqueceu a senha ?
          </Text>
          <Text style={{ fontSize: 14, color: "#FFF", padding: 4 }}>
            Não se preucupe ira recupera-la em breve :)
          </Text>
        </View>

        <TextInput
          style={{
            height: 45,
            borderRadius: 6,
            fontSize: 16,
            color: "grey",
            margin: 12,
            padding: 12,
            width: width - 60,
            backgroundColor: "#FFF"
          }}
          placeholder="Seu login"
          placeholderTextColor={EstiloPadrao.placeholder.color}
          value={this.state.MOR_STR_LGN}
          onChangeText={this.handleChange("MOR_STR_LGN")}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.validar()}
          style={{
            alignSelf: "flex-end",
            padding: 12,
            marginHorizontal: 30,
            borderRadius: 3,
            backgroundColor: "#FFF"
          }}
        >
          <Text>Enviar</Text>
        </TouchableOpacity>
        <Text
          style={{
            padding: 12,
            marginHorizontal: 30,
            color: "#FFF",
            textAlign: "center",
            opacity: this.state.visivel
          }}
        >
          {this.props.forgot.loading ? "Aguarde..." : false}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  forgot: state.forgot
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(forgotActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecuperarSenha);
