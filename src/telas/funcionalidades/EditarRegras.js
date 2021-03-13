import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import EstiloPadrao from "../../EstiloPadrao";

import { Creators as regrasActions } from "../../redux/ducks/regra";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class EditarRegras extends React.Component {
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
          Editar regras
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
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    this.props.requestRegraLoad();
  }

  handleDelete(regra) {
    this.props.requestRegraDelete(regra);
    this.props.requestRegraAnular();
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          flexGrow: 1,
          backgroundColor: "#eaedf2",
          paddingVertical: 5
        }}
      >
        {this.props.regra.regras ? (
          this.props.regra.regras.map(regras => {
            return (
              <View
                style={[EstiloPadrao.containerItem]}
                key={regras.REG_INT_ID}
              >
                <View
                  style={[
                    EstiloPadrao.paddingPadrao,
                    { flexDirection: "row", flex: 8 }
                  ]}
                >
                  <View style={EstiloPadrao.item}>
                    <Text
                      style={[
                        EstiloPadrao.tituloItem,
                        EstiloPadrao.textoPrimario,
                        EstiloPadrao.fonte
                      ]}
                    >
                      REGRA {regras.REG_INT_ID}{" "}
                    </Text>
                    <Text
                      style={[
                        EstiloPadrao.textoItem,
                        { flex: 1 },
                        EstiloPadrao.fonte
                      ]}
                    >
                      {regras.REG_STR_DESC}
                    </Text>
                  </View>
                  {/*<View style={[styles.regra, EstiloPadrao.fonte]}>
                    <Text style={[styles.numeroRegra, EstiloPadrao.fonte]}>
                      REGRA {regras.REG_INT_ID} -{" "}
                    </Text>
                    <Text>{regras.REG_STR_DESC}</Text>
              </View>*/}
                  <TouchableOpacity
                    style={[
                      styles.btnRegra,
                      {
                        padding: 4,
                        margin: 4
                      }
                    ]}
                    activeOpacity={0.9}
                    key={regras.REG_INT_ID}
                    onPress={() => this.handleDelete(regras.REG_INT_ID)}
                  >
                    <Ionicons name="md-remove" size={32} color="#4285f4" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.containerRegra}>
            <Text style={[styles.regra, EstiloPadrao.fonte]}>
              Aparentemente ainda não a regras ;(
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.btnRegra, { marginVertical: 5 }]}
          activeOpacity={0.9}
          onPress={() => this.props.navigation.navigate("AdicionarRegrasTela")}
        >
          <Ionicons
            name="md-add"
            size={32}
            color="#4285f4"
            style={{ alignContent: "center" }}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerRegra: {
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 3,
    padding: 6,
    justifyContent: "space-between",
    alignContent: "center"
  },
  numeroRegra: {
    fontWeight: "bold"
  },
  regra: {
    textAlignVertical: "center",
    padding: 4
  },
  btnRegra: {
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => ({
  regra: state.regra
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(regrasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarRegras);
