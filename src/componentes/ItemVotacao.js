import React from "react";
import ReactNative, { View, TouchableOpacity, Text } from "react-native";
import Foundation from "react-native-vector-icons/Foundation";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as votacaoActions } from "../redux/ducks/votacao";
import { Creators as votoActions } from "../redux/ducks/voto";

class ItemVotacao extends React.Component {
  constructor() {
    super();
    this.state = {
      like: null,
      dislike: null,
      index: 0
    };
  }

  Votar(valor) {
    console.log(valor);
    if (valor == 1) {
      this.setState({
        like: true,
        dislike: false
      });
    }
    if (valor == 0) {
      this.setState({
        like: false,
        dislike: true
      });
    }
    console.log(this.state.dislike);
  }

  componentWillMount() {
    this.props.requestVotacaoLoad();
  }

  validarMeuVoto(voto, votacao) {
    this.props.requestVoto(votacao, voto);
    this.setState({
      index: this.state.index + 1
    });
  }

  render() {
    if (this.props.votacao.success == true) {
      if (this.props.votacao.votacoes.length > this.state.index) {
        return (
          <View
            style={styles.containerVotacao}
            key={this.props.votacao.votacoes[this.state.index].VOT_INT_ID}
          >
            <View style={{ flex: 4 }}>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={[
                    { fontSize: 14, fontWeight: "bold", color: "#f8f9fe" },
                    EstiloPadrao.fonte
                  ]}
                >
                  {this.props.votacao.votacoes[this.state.index].VOT_STR_TITULO}
                </Text>
                <Text style={[styles.textVotacao, EstiloPadrao.fonte]}>
                  {this.props.votacao.votacoes[this.state.index].VOT_STR_DESC}
                </Text>
              </View>
            </View>
            <View style={styles.viewBotao}>
              <TouchableOpacity
                style={styles.botaoVoto}
                onPress={() =>
                  this.validarMeuVoto(
                    1,
                    this.props.votacao.votacoes[this.state.index].VOT_INT_ID
                  )
                }
              >
                <Foundation
                  name="like"
                  size={50}
                  color={this.state.like == true ? "#69EE9A" : "white"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoVoto}
                onPress={() => this.validarMeuVoto(0)}
              >
                <Foundation
                  name="dislike"
                  size={50}
                  color={this.state.dislike == true ? "#e74c3c" : "white"}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        return (
          <View style={[styles.containerVotacao, { justifyContent: "center" }]}>
            <Text
              style={[
                {
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#f8f9fe",
                  textAlign: "center"
                },
                EstiloPadrao.fonte
              ]}
            >
              Parece que acabaram as votações
            </Text>
          </View>
        );
      }
    } else {
      return null;
    }
  }
}

const styles = ReactNative.StyleSheet.create({
  containerVotacao: {
    alignContent: "center",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#3367d6",
    padding: 6
  },
  textVotacao: {
    padding: 6,
    fontSize: 14,
    color: "#f8f9fe"
  },
  botaoVoto: {
    flex: 1,
    alignItems: "center",
    alignContent: "center"
  },
  viewBotao: {
    flex: 2,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => ({
  votacao: state.votacao,
  voto: state.voto
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, votacaoActions, votoActions), dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemVotacao);
