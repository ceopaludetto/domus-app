import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from "react-native";
import SenhaInput from "../componentes/SenhaInput";
import VirtualKeyboard from "react-native-virtual-keyboard";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../componentes/Header";

import { Creators as portaoActions } from "../redux/ducks/portao";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Portao extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Ionicons name="md-unlock" size={25} color={tintColor} />
    )
  };

  constructor(props) {
    super(props);
    dim = Dimensions.get("window");
    this.state = {
      MOR_INT_PSWPORTA: "",
      aberto: false,
      panico: false,
      especial: false,
      orientation: this.isPortrait(),
      correto: null
    };
    Dimensions.addEventListener("change", () => {
      dim = Dimensions.get("window");
      try {
        this.setState({
          orientation: this.isPortrait()
        });
      } catch (e) {
        alert(e.toString());
      }
    });
  }

  isPortrait = () => {
    return dim.height > dim.width ? "portrait" : "landscape";
  };

  anular() {
    this.setState({
      correto: null,
      especial: null,
      MOR_INT_PSWPORTA: ""
    });
  }

  correto() {
    this.setState({
      correto: "correto"
    });
    setTimeout(() => this.anular(), 1000);
  }

  incorreto() {
    this.setState({
      correto: "incorreto"
    });
    setTimeout(() => this.anular(), 1000);
  }

  componentDidUpdate() {
    if (this.state.MOR_INT_PSWPORTA.length == 6) {
      this.handleSubmit();
      this.anular();
    }
    if (this.props.portao.failure) {
      console.log(this.props.portao.data);
      this.incorreto();
      this.props.requestAnular();
    }
    if (this.props.portao.aberto) {
      this.correto();
      this.props.requestAnular();
    }
  }

  clickTeclado(val) {
    if (val.includes("#")) {
      this.setState({
        especial: true
      });
    } else {
      this.setState({
        especial: false
      });
    }
    this.setState({ MOR_INT_PSWPORTA: val });
  }

  handleSubmit = () => {
    this.props.requestAbrirPortao(this.state.MOR_INT_PSWPORTA);
  };

  render() {
    if (this.state.orientation == "portrait") {
      return (
        <View style={{ flex: 1 }}>
          <Header
            navigation={this.props.navigation}
            bgColor="#3367d6"
            elevation="0"
          />
          <View
            style={{
              backgroundColor: "#3367d6",
              flexDirection: "column",
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View style={{ height: 150 }}>
              <Icon
                name="security-home"
                size={140}
                color="#eaedf2"
                //style={styles.iconPort}
              />
            </View>

            <View style={[styles.visorWrap]}>
              <SenhaInput
                especial={this.state.especial}
                correto={this.state.correto}
                code={this.state.MOR_INT_PSWPORTA[0]}
              />
              <SenhaInput
                especial={this.state.especial}
                correto={this.state.correto}
                code={this.state.MOR_INT_PSWPORTA[1]}
              />
              <SenhaInput
                especial={this.state.especial}
                correto={this.state.correto}
                code={this.state.MOR_INT_PSWPORTA[2]}
              />
              <SenhaInput
                especial={this.state.especial}
                correto={this.state.correto}
                code={this.state.MOR_INT_PSWPORTA[3]}
              />
              <SenhaInput
                especial={this.state.especial}
                correto={this.state.correto}
                code={this.state.MOR_INT_PSWPORTA[4]}
              />
              <SenhaInput
                especial={this.state.especial}
                correto={this.state.correto}
                code={this.state.MOR_INT_PSWPORTA[5]}
              />
            </View>
            <VirtualKeyboard
              color="#eaedf2"
              pressMode="string"
              onPress={val => this.clickTeclado(val)}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header
            navigation={this.props.navigation}
            bgColor="#3367d6"
            elevation="0"
          />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#3367d6"
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View style={{ height: 150 }}>
                <Icon
                  name="security-home"
                  size={140}
                  color="#f6f7fc"
                  //style={styles.iconPort}
                />
              </View>

              <View style={styles.visorWrap}>
                <SenhaInput
                  especial={this.state.especial}
                  correto={this.state.correto}
                  code={this.state.MOR_INT_PSWPORTA[0]}
                />
                <SenhaInput
                  especial={this.state.especial}
                  correto={this.state.correto}
                  code={this.state.MOR_INT_PSWPORTA[1]}
                />
                <SenhaInput
                  especial={this.state.especial}
                  correto={this.state.correto}
                  code={this.state.MOR_INT_PSWPORTA[2]}
                />
                <SenhaInput
                  especial={this.state.especial}
                  correto={this.state.correto}
                  code={this.state.MOR_INT_PSWPORTA[3]}
                />
                <SenhaInput
                  especial={this.state.especial}
                  correto={this.state.correto}
                  code={this.state.MOR_INT_PSWPORTA[4]}
                />
                <SenhaInput
                  especial={this.state.especial}
                  correto={this.state.correto}
                  code={this.state.MOR_INT_PSWPORTA[5]}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <VirtualKeyboard
                color="white"
                pressMode="string"
                onPress={val => this.clickTeclado(val)}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  iconPort: {
    marginBottom: 50
  },
  visor: {
    fontSize: 30,
    height: 66,
    width: 45,
    borderRadius: 6,
    borderColor: "rgba(225, 225, 225, 0.6)",
    backgroundColor: "rgba(225, 225, 225, 0.6)",
    textAlign: "center",
    color: "white",
    marginRight: 4
  },
  visorWrap: {
    height: 54,
    marginVertical: 22,
    flexDirection: "row"
  }
});

const mapStateToProps = state => ({
  portao: state.portao,
  login: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(portaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portao);
