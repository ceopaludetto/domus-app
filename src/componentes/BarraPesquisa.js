import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

class BarraPesquisa extends Component {
  constructor() {
    super();
    this.state = {
      perfil: "EAE"
    };
  }

  render() {
    return (
      <View
        style={{
          height: 46,
          flexDirection: "row",
          backgroundColor: "#3367d6",
          zIndex: 2
        }}
      >
        <View style={{ flex: 6 }}>
          <TextInput style={styles.inserirMensagem} />
        </View>
        <View style={styles.headerContent}>
          <TouchableOpacity>
            <Ionicons name="ios-search" style={styles.headerButton} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("PerfilTela", {
                perfil: this.state.meuPerfil
              })
            }
          >
            <Ionicons name="ios-contact" style={styles.headerButton} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerButton: {
    color: "#f6f7fc",
    paddingHorizontal: 12,
    fontSize: 28
  },
  headerContent: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  inserirMensagem: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#f6f7fc",
    backgroundColor: "#f6f7fc",
    margin: 4,
    padding: 4,
    color: "#333"
  }
});

export default BarraPesquisa;
