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

import { Creators as localActions } from "../../redux/ducks/local";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class EditarLocal extends React.Component {
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
          Editar locais
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
    this.props.requestLocalLoad();
  }

  handleDelete(item) {
    this.props.requestLocalDelete([item]);
    this.props.requestLocalAnular();
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
        {this.props.local.locais ? (
          this.props.local.locais.map(locais => {
            return (
              <View style={styles.containerItem} key={locais.LOC_INT_ID}>
                <View
                  style={[
                    EstiloPadrao.paddingPadrao,
                    { flexDirection: "row", flex: 1 }
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
                      {locais.LOC_STR_NOME}
                    </Text>
                    <Text style={[EstiloPadrao.textoItem, EstiloPadrao.fonte]}>
                      {locais.LOC_STR_DESC}
                    </Text>
                    <Text style={[EstiloPadrao.textoItem, EstiloPadrao.fonte]}>
                      Suporta {locais.LOC_INT_QTDE} pessoas
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.btnItem}
                    activeOpacity={0.9}
                    key={locais.LOC_INT_ID}
                    onPress={() => this.handleDelete(locais.LOC_INT_ID)}
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
              Aparentemente não tem nenhum local ;(
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.btnItem, { marginVertical: 5 }]}
          activeOpacity={0.9}
          onPress={() => this.props.navigation.navigate("AdicionarLocalTela")}
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
    flex: 10
  },
  btnItem: {
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    flex: 1
  }
});

const mapStateToProps = state => ({
  local: state.local
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(localActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarLocal);
