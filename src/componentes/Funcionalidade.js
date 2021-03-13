import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

class Funcionalidades extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.Funcionalidade}
          onPress={
            this.props.navegarPara
              ? () => this.props.navigation.navigate(this.props.navegarPara)
              : () => null
          }
        >
          <Text style={[styles.textoFuncionalidade, EstiloPadrao.fonte]}>
            <Ionicons
              name={this.props.icone ? this.props.icone : "ios-alert"}
              style={styles.iconeFuncionalidade}
            />
          </Text>
        </TouchableOpacity>
        <Text style={[styles.textoFuncionalidade, EstiloPadrao.fonte]}>
          {this.props.funcNome ? this.props.funcNome : "Funcionalidade"}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Funcionalidade: {
    height: 96,
    width: 96,
    padding: 12,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4285f4",
    borderRadius: 3
  },
  iconeFuncionalidade: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 38 //16
  },
  textoFuncionalidade: {
    //color:"#4285f4",
    textAlign: "center",
    fontSize: 12 //16
  }
});

export default Funcionalidades;
