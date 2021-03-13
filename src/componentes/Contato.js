import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { withNavigation } from "react-navigation";

class Contato extends React.Component {
  PreviaConversa() {
    if (this.props.conversa > 26) {
      conversa = this.props.conversa.substring(0, 23) + "...";
    } else {
      return this.props.conversa;
    }
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ flexDirection: "row", height: 84 }}
        delayPressIn={50}
        onPress={() =>
          this.props.navigation.navigate("ConversaTela", {
            nome: "Dona do coma"
          })
        }
      >
        <View
          style={{
            flex: 2,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this.props.image ? (
            <Image
              source={require("../imgs/fundoperfil.jpg")}
              style={{
                backgroundColor: "red",
                height: 58,
                width: 58,
                borderRadius: 64
              }}
            />
          ) : (
            <Ionicons name="md-contact" size={62} />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 6,
            paddingVertical: 14,
            paddingHorizontal: 6
          }}
        >
          <View style={{ flex: 3 }}>
            <Text style={styles.nomeConversa}>Dona do Coma</Text>
            <Text style={styles.previaConversa}>Ufsusufustdgudug</Text>
          </View>
          <Text style={styles.notificacaoData}>17:50</Text>
          <View style={styles.notificacao}>
            <Text style={styles.notificacaoNumero}>1</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  notificacao: {
    borderRadius: 10,
    height: 20,
    width: 20,
    backgroundColor: "#29bf51",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginVertical: 8,
    position: "absolute",
    right: 16,
    top: 38
  },
  notificacaoNumero: {
    color: "#FFF"
  },
  notificacaoData: {
    fontSize: 12,
    paddingVertical: 4,
    position: "absolute",
    right: 16,
    top: 16
  },
  nomeConversa: {
    fontSize: 18,
    color: "black",
    paddingVertical: 2
  },
  previaConversa: {
    paddingVertical: 2,
    fontSize: 16
  }
});

export default withNavigation(Contato);
