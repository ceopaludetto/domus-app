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

import { Creators as comunicadoActions } from "../../redux/ducks/comunicado";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class EditarComunicado extends React.Component {
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
          Editar comunicados
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
    this.props.requestComunicadoLoad();
  }

  handleDelete(item) {
    this.props.requestComunicadoDelete(item);
    this.props.requestComunicadoAnular();
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
        {this.props.comunicado.comunicados ? (
          this.props.comunicado.comunicados.map(comunicados => {
            return (
              <View style={styles.containerItem} key={comunicados.COMU_INT_ID}>
                <View
                  style={[
                    EstiloPadrao.paddingPadrao,
                    { flexDirection: "row", flex: 1 }
                  ]}
                >
                  <View style={[styles.item]}>
                    <Text
                      style={[
                        EstiloPadrao.tituloItem,
                        EstiloPadrao.textoPrimario,
                        EstiloPadrao.fonte
                      ]}
                    >
                      {comunicados.COMU_STR_TIT}
                    </Text>
                    <Text style={[EstiloPadrao.textoItem, EstiloPadrao.fonte]}>
                      {comunicados.COMU_STR_DESC}
                    </Text>
                    <Text
                      style={[
                        { alignSelf: "flex-end", padding: 4 },
                        EstiloPadrao.fonte
                      ]}
                    >
                      {comunicados.COMU_DT_DATA.substring(0, 10)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={EstiloPadrao.btnItem}
                    activeOpacity={0.9}
                    key={comunicados.COMU_INT_ID}
                    onPress={() => this.handleDelete(comunicados.COMU_INT_ID)}
                  >
                    <Ionicons name="md-remove" size={32} color="#4285f4" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.containerItem}>
            <Text style={[styles.item, EstiloPadrao.fonte]}>
              Aparentemente não a comunicados
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.btnItem, { marginVertical: 5 }]}
          activeOpacity={0.9}
          onPress={() =>
            this.props.navigation.navigate("AdicionarComunicadoTela")
          }
        >
          <Ionicons name="md-add" size={32} color="#4285f4" />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerItem: {
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 3,
    padding: 6,
    justifyContent: "space-between",
    alignContent: "center"
  },
  numeroItem: {
    fontWeight: "bold"
  },
  item: {
    textAlignVertical: "center",
    padding: 4,
    flex: 10,
    flexDirection: "column"
  },
  btnItem: {
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    flex: 1
  }
});

const mapStateToProps = state => ({
  comunicado: state.comunicado
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(comunicadoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarComunicado);
