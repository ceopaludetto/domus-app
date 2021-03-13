import React from "react";
import { View, ScrollView } from "react-native";

import Funcionalidade from "../componentes/Funcionalidade";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../componentes/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Funcionalidades extends React.Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Ionicons name="md-more" size={25} color={tintColor} />
    )
  };

  _showHoraInicio = () => this.setState({ isHrInicio: true });
  _showHoraFim = () => this.setState({ isHrFim: true });

  _hideHoraInicio = () => this.setState({ isHrInicio: false });
  _hideHoraFim = () => this.setState({ isHrFim: false });

  _handleHrInicio = date => {
    this.setState({
      HrInicio: date.toString().substring(16, 21)
    });
    this._hideHoraInicio();
  };

  _handleHrFim = date => {
    this.setState({
      HrFim: date.toString().substring(16, 21)
    });
    this._hideHoraFim();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
        <ScrollView
          contentContainerStyle={{
            flexDirection: "column",
            flexGrow: 1,
            backgroundColor: "#eaedf2"
          }}
        >
          {this.props.login.data.MORADOR.MOR_BIT_SIN == 1 ? (
            <View
              style={{
                flexDirection: "row",
                padding: 4,
                paddingBottom: 12,
                flexWrap: "wrap",
                justifyContent: "space-between"
              }}
            >
              <Funcionalidade
                funcNome="Reserva de áreas"
                icone="md-calendar"
                navigation={this.props.navigation}
                navegarPara="AlugarAreasTela"
              />
              <Funcionalidade
                funcNome="Reclamações"
                icone="md-alert"
                navigation={this.props.navigation}
                navegarPara="ReclamacaoTela"
              />
              <Funcionalidade
                funcNome="Sugestões"
                icone="md-happy"
                navigation={this.props.navigation}
                navegarPara="SugestaoTela"
              />
              <Funcionalidade
                funcNome="Votação"
                icone="md-thumbs-up"
                navigation={this.props.navigation}
                navegarPara="EditarVotacoesTela"
              />
              <Funcionalidade
                funcNome="Enviar comunicado"
                icone="md-today"
                navigation={this.props.navigation}
                navegarPara="EditarComunicadoTela"
              />
              <Funcionalidade
                funcNome="Solicitar assistencia"
                icone="md-help-circle"
                navigation={this.props.navigation}
                navegarPara="SolicitarAssistenciaTela"
              />
              <Funcionalidade
                funcNome="Visitantes"
                icone="md-contacts"
                navigation={this.props.navigation}
                navegarPara="VisitantesTela"
              />
              <Funcionalidade
                funcNome="Regras"
                icone="md-warning"
                navigation={this.props.navigation}
                navegarPara="EditarRegrasTela"
              />
              <Funcionalidade
                funcNome="Locais"
                icone="md-photos"
                navigation={this.props.navigation}
                navegarPara="EditarLocalTela"
              />
              <Funcionalidade
                funcNome="Eventos"
                icone="md-pizza"
                navigation={this.props.navigation}
                navegarPara="AdicionarEventoTela"
              />
              <Funcionalidade
                funcNome="Moradores"
                icone="md-person"
                navigation={this.props.navigation}
                navegarPara="ManterMoradoresTela"
              />

              <Funcionalidade
                funcNome="Despesas"
                icone="md-stats"
                navigation={this.props.navigation}
                navegarPara="EditarDespesaTela"
              />
              <Funcionalidade
                funcNome="Funcionarios"
                icone="md-hammer"
                navigation={this.props.navigation}
                navegarPara="EditarFuncionarioTela"
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                padding: 4,
                paddingBottom: 12,
                flexWrap: "wrap",
                justifyContent: "space-between"
              }}
            >
              <Funcionalidade
                funcNome="Reserva de áreas"
                icone="md-calendar"
                navigation={this.props.navigation}
                navegarPara="AlugarAreasTela"
              />
              <Funcionalidade
                funcNome="Reclamações"
                icone="md-alert"
                navigation={this.props.navigation}
                navegarPara="ReclamacaoTela"
              />
              <Funcionalidade
                funcNome="Sugestões"
                icone="md-happy"
                navigation={this.props.navigation}
                navegarPara="SugestaoTela"
              />
              <Funcionalidade
                funcNome="Visitantes"
                icone="md-contacts"
                navigation={this.props.navigation}
                navegarPara="VisitantesTela"
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps)(Funcionalidades);
