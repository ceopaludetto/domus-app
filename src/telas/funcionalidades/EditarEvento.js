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

import { Creators as eventoActions } from "../../redux/ducks/evento";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class EditarEvento extends React.Component {
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
          Editar eventos
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
    this.props.requestEventoLoad();
  }

  handleDelete(item) {
    this.props.requestEventoDelete(item);
    this.props.requestEventoAnular();
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
        {this.props.evento.success ? (
          this.props.evento.eventos.map(eventos => {
            return (
              <View style={styles.containerItem} key={eventos.EVE_INT_ID}>
                <View style={{ flexDirection: "column" }}>
                  <View>
                    <Text>Titulo </Text> <Text>{eventos.EVE_STR_TITULO}</Text>
                  </View>
                  <View>
                    <Text>Desc </Text> <Text>{eventos.EVE_STR_DESC}</Text>
                  </View>
                  <View>
                    <Text>Data </Text> <Text>{eventos.EVE_DT_DATA}</Text>
                  </View>
                  <View>
                    <Text>Horario </Text>
                    <Text>
                      {eventos.EVE_DT_INICIO} a {eventos.EVE_DT_FIM}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.btnItem}
                  activeOpacity={0.9}
                  key={eventos.EVE_INT_ID}
                  onPress={() => this.handleDelete(eventos.EVE_INT_ID)}
                >
                  <Ionicons name="md-remove" size={32} color="#4285f4" />
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <View style={styles.containerItem}>
            <Text style={[styles.item, EstiloPadrao.fonte]}>
              Aparentemente não tem votações pendentes ;(
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.btnItem, { marginVertical: 5 }]}
          activeOpacity={0.9}
          onPress={() => this.props.navigation.navigate("AdicionarEventoTela")}
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
  evento: state.evento
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(eventoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarEvento);
