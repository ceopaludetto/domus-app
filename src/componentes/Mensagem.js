import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import EstiloPadrao from "../EstiloPadrao";

class Mensagem extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center"
          //marginHorizontal: 16
        }}
      >
        {/*<Ionicons
          name="ios-calendar"
          size={32}
          style={{ color: "#FFF", marginRight: 8 }}
        />*/}
        <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "500" }}>
          Áreas
        </Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: "#4285f4",
      elevation: 0
    },
    headerTintColor: "#fff"
  });
  render() {
    return (
      <View
        style={[
          styles.caixaMensagem,
          this.props.mensagem.MOR_INT_ID != this.props.moradorId
            ? {
                backgroundColor: "#ccdaec",
                borderTopRightRadius: 0,
                alignSelf: "flex-end"
              }
            : { borderTopLeftRadius: 0 }
        ]}
      >
        <View style={styles.mensagem}>
          <Text style={[styles.textoMensagem, EstiloPadrao.fonte]}>
            {this.props.mensagem.MSG_STR_DESC}
          </Text>
        </View>
        <Text style={[styles.horaMsg, EstiloPadrao.fonte]}>
          {this.props.mensagem.MSG_DT_DATA}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  interlocutor: {
    width: "100%",
    paddingHorizontal: 6,
    paddingVertical: 2
  },
  nomeInterlocutor: {
    color: "#3161B2",
    fontSize: 16
  },
  caixaMensagem: {
    maxWidth: Dimensions.get("window").width - 60,
    minWidth: 200,
    backgroundColor: "#FFF",
    borderRadius: 12, //4
    flexDirection: "column",
    marginVertical: 6,
    marginHorizontal: 6,
    padding: 4,
    paddingBottom: 18
  },
  mensagem: {
    paddingHorizontal: 6,
    paddingVertical: 2
  },
  textoMensagem: {
    fontSize: 14
  },
  horaMsg: {
    position: "absolute",
    bottom: 2,
    right: 4,
    fontSize: 12
  }
});

export default Mensagem;
