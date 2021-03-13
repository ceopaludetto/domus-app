import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  Text
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchInput, { createFilter } from "react-native-search-filter";
import EstiloPadrao from "../EstiloPadrao";
import Header from "../componentes/Header";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as moradorActions } from "../redux/ducks/morador";

const KEYS_TO_FILTERS = ["MOR_STR_NOME"];
class Mensagens extends Component {
  constructor() {
    super();
    this.state = {
      pesquisaAberta: false,
      searchTerm: ""
    };
  }

  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Ionicons name="md-chatboxes" size={25} color={tintColor} />
    )
  };

  //PESQUISA
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  // FIM PESQUISA

  //ANIMAÇAO
  componentWillMount() {
    this.props.requestMoradorLoad();
    this.animatedValue = new Animated.Value(0);
  }

  componentDidUpdate() {
    if (this.state.pesquisaAberta == true) {
      Animated.timing(this.animatedValue, {
        toValue: 280,
        duration: 800,
        easing: Easing.bounce
      }).start();
    }
    if (this.state.pesquisaAberta == false) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 800,
        easing: Easing.bounce
      }).start();
    }
  }

  verifiPesquisa() {
    this.setState({
      pesquisaAberta: !this.state.pesquisaAberta
    });
  }
  // FIM ANIMAÇAO

  PreviaConversa() {
    if (this.props.conversa > 26) {
      conversa = this.props.conversa.substring(0, 23) + "...";
    } else {
      return this.props.conversa;
    }
  }

  render() {
    const animatedStyle = { width: this.animatedValue };
    const moradoresFiltrados = this.props.morador.moradores.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#eaedf2"
          }}
        >
          <ScrollView>
            {this.props.morador.success
              ? moradoresFiltrados.map(morador => {
                  if (
                    this.props.login.data.MORADOR.MOR_INT_ID !=
                    morador.MOR_INT_ID
                  ) {
                    return (
                      <View
                        key={morador.MOR_INT_ID}
                        style={{ flexDirection: "column" }}
                      >
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={{ flexDirection: "row", height: 84 }}
                          delayPressIn={50}
                          key={morador.MOR_INT_ID}
                          onPress={() =>
                            this.props.navigation.navigate("ConversaTela", {
                              MOR_INT_ID: morador.MOR_INT_ID,
                              MOR_STR_NOME: morador.MOR_STR_NOME
                            })
                          }
                        >
                          <View
                            style={{
                              width: 60,
                              marginHorizontal: 12,
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
                              <Ionicons
                                name="md-contact"
                                size={62}
                                style={{ color: "#4e4e4e" }}
                              />
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
                              <Text
                                style={[
                                  styles.nomeConversa,
                                  EstiloPadrao.fonte
                                ]}
                              >
                                {morador.MOR_STR_NOME}
                              </Text>
                              <Text
                                style={[
                                  styles.previaConversa,
                                  EstiloPadrao.fonte
                                ]}
                              >
                                asda
                              </Text>
                            </View>
                            <Text style={styles.notificacaoData}>12/12</Text>
                            {/*<View style={styles.notificacao}>
                                                <Text style={styles.notificacaoNumero}>1</Text>
                                        </View>*/}
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  } else {
                    return false;
                  }
                })
              : false}
          </ScrollView>
          <View style={styles.menuBotoes}>
            <View
              style={{
                flexDirection: "row-reverse",
                alignContent: "center",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.botao, { backgroundColor: "#4285f4" }]}
                onPress={() => this.verifiPesquisa()}
              >
                <Ionicons
                  name="ios-search"
                  style={[styles.botaoText, { color: "white" }]}
                />
              </TouchableOpacity>
              <Animated.View
                style={[styles.barraPesquisa, animatedStyle]}
                ref={ci => (this.animatedPesq = ci)}
              >
                <SearchInput
                  onChangeText={term => {
                    this.searchUpdated(term);
                  }}
                  style={styles.barraPesquisaInput}
                  placeholder="Pesquise por contatos"
                />
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuBotoes: {
    position: "absolute",
    bottom: 12,
    right: 12,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  botao: {
    padding: 2,
    //elevation: 4,
    borderRadius: 64,
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 58,
    width: 58
  },
  botaoText: {
    fontSize: 34,
    borderRadius: 40,
    padding: 6
  },
  barraPesquisa: {
    backgroundColor: "#4285f4",
    height: 42,
    alignSelf: "center",
    marginRight: -16,
    borderRadius: 4
  },
  barraPesquisaInput: {
    padding: 6,
    height: 30,
    margin: 6,
    backgroundColor: "#3367d6",
    borderRadius: 4,
    color: "#f6f7fc"
  },
  //////////////////////////////////////////////////////
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

const mapStateToProps = state => ({
  morador: state.morador,
  login: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(moradorActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mensagens);
