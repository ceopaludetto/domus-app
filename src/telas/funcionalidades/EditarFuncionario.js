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

import { Creators as funcionarioActions } from "../../redux/ducks/funcionario";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class EditarFuncionario extends React.Component {
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
          Editar funcionarios
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
    this.props.requestFuncionarioLoad();
  }

  handleDelete(item) {
    this.props.requestFuncionarioDelete([item]);
    this.props.requestFuncionarioAnular();
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
        {this.props.funcionario.funcionarios ? (
          this.props.funcionario.funcionarios.map(funcionarios => {
            return (
              <View style={styles.containerItem} key={funcionarios.FUNC_INT_ID}>
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
                      {funcionarios.FUNC_STR_NOME}
                    </Text>
                    <Text style={[EstiloPadrao.textoItem, EstiloPadrao.fonte]}>
                      DT de admissão{" "}
                      {funcionarios.FUNC_DT_ADMIS
                        ? funcionarios.FUNC_DT_ADMIS.substring(0, 10)
                        : false}
                    </Text>
                    <Text style={[EstiloPadrao.textoItem, EstiloPadrao.fonte]}>
                      Celular {funcionarios.FUNC_STR_CEL}
                    </Text>
                    <Text style={[EstiloPadrao.textoItem, EstiloPadrao.fonte]}>
                      Função {funcionarios.FUNC_STR_CARGO}
                    </Text>
                    <Text style={[EstiloPadrao.textoItem, EstiloPadrao.fonte]}>
                      Empresa {funcionarios.FUNC_STR_EMPR}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.btnItem}
                    activeOpacity={0.9}
                    key={funcionarios.FUNC_INT_ID}
                    onPress={() => this.handleDelete(funcionarios.FUNC_INT_ID)}
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
              Aparentemente não tem nenhum funcionario ;(
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.btnItem, { marginVertical: 5 }]}
          activeOpacity={0.9}
          onPress={() =>
            this.props.navigation.navigate("AdicionarFuncionarioTela")
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
  funcionario: state.funcionario
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(funcionarioActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditarFuncionario);
