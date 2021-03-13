import React from "react";
import { StyleSheet, View, Text } from "react-native";
import EstiloPadrao from "../EstiloPadrao";

export default class Vazio extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text
            style={[styles.nada, EstiloPadrao.fonte, { textAlign: "center" }]}
          >
            Parece que nao tem nada novo aqui ;(
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    padding: 6
  },
  nada: {
    padding: 4,
    marginBottom: 16,
    color: "#2c3e50"
  }
});
