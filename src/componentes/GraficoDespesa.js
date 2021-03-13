import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import EstiloPadrao from "../EstiloPadrao";
import { ProgressCircle, StackedBarChart } from "react-native-svg-charts";
import * as shape from "d3-shape";

import { Creators as despesaActions } from "../redux/ducks/despesa";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const { width, height } = Dimensions.get("screen");

class GraficoDespesa extends React.Component {
  constructor() {
    super();
    this.state = {
      tamanho: width > height ? height : width
    };
  }

  componentWillMount() {
    this.props.requestDespesaLoad();
  }

  sortfunction(a, b) {
    return a - b; //faz com que o array seja ordenado numericamente e de ordem crescente.
  }

  novaData = class {
    constructor(nome, valor) {
      this.nome = nome;
      this.valor = valor;
    }
  };

  componentDidUpdate() {
    if (this.props.despesa.despesas) {
      console.log(this.props.despesa.despesas);
      x = 0;
      data = [];
      this.props.despesa.despesas.forEach(despesa => {
        novaDespesa = new Object();
        novaDespesa = {
          nome: despesa.DESP_STR_DESC,
          valor: despesa.DESP_NM_VAL
        };
        data[x] = novaDespesa;
        x++;
      });
      console.log(data);
    }
  }

  render() {
    const data = [
      {
        month: new Date(2015, 0, 1),
        apples: 3840,
        bananas: 0,
        cherries: 0,
        dates: 0,
        oranges: 0
      },
      {
        month: new Date(2015, 1, 1),
        apples: 0,
        bananas: 1440,
        cherries: 0,
        dates: 0
      },
      {
        month: new Date(2015, 2, 1),
        apples: 0,
        bananas: 0,
        cherries: 0,
        dates: 400
      },
      {
        month: new Date(2015, 3, 1),
        apples: 0,
        bananas: 0,
        cherries: 640,
        dates: 0
      }
    ];

    const colors = ["#7b4173", "#a55194", "#ce6dbd", "#de9ed6"];
    const keys = ["apples", "bananas", "cherries", "dates"];

    return (
      <View
        style={[
          EstiloPadrao.containerPrimario,
          { marginHorizontal: 5, flex: 1 }
        ]}
      >
        <View style={EstiloPadrao.tituloContainerPrimario}>
          <Ionicons
            name={this.props.icone ? this.props.icone : "ios-stats"}
            size={30}
            style={EstiloPadrao.iconeContainerPrimario}
          />
          <Text style={EstiloPadrao.textoContainerPrimario}>
            {this.props.titulo ? this.props.titulo : "GASTOS"}
          </Text>
        </View>
        <View style={EstiloPadrao.paddingPadrao}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.infoGrafico}>
              <StackedBarChart
                style={{ height: 200 }}
                keys={keys}
                colors={colors}
                data={data}
                showGrid={false}
                contentInset={{ top: 30, bottom: 30 }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  /*
  render() {
    if (this.props.despesa.despesas) {
      return this.props.despesa.despesas.map(despesa => {
        return (
          <View
            style={[
              EstiloPadrao.containerPrimario,
              { marginHorizontal: 5, width: this.state.tamanho / 2 - 19 }
            ]}
            key={despesa.DESP_INT_ID}
          >
            <View style={EstiloPadrao.tituloContainerPrimario}>
              <Ionicons
                name={this.props.icone ? this.props.icone : "ios-stats"}
                size={30}
                style={EstiloPadrao.iconeContainerPrimario}
              />
              <Text style={EstiloPadrao.textoContainerPrimario}>
                {despesa.DESP_STR_DESC}
              </Text>
            </View>
            <View style={EstiloPadrao.paddingPadrao}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.infoGrafico}>
                  <ProgressCircle
                    style={[styles.alinharCentro, { height: 100 }]}
                    progress={despesa.DESP_NM_VAL / 10000}
                    progressColor={"#3367d6"}
                  />
                </View>
                <View style={styles.infoGrafico}>
                  <Text>Renda R$10000</Text>
                  <View style={EstiloPadrao.bordaHorizontalCurta} />
                  <Text>
                    Gastos R$
                    {despesa.DESP_NM_VAL}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      });
    } else {
      return false;
    }
   
    return (
      <View
        style={[
          EstiloPadrao.containerPrimario,
          { marginHorizontal: 5, flex: 1 }
        ]}
      >
        <View style={EstiloPadrao.tituloContainerPrimario}>
          <Ionicons
            name={this.props.icone ? this.props.icone : "ios-stats"}
            size={30}
            style={EstiloPadrao.iconeContainerPrimario}
          />
          <Text style={EstiloPadrao.textoContainerPrimario}>
            {this.props.titulo ? this.props.titulo : "GASTOS"}
          </Text>
        </View>
        <View style={EstiloPadrao.paddingPadrao}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.infoGrafico}>
              <ProgressCircle
                style={[styles.alinharCentro, { height: 100 }]}
                progress={(x = Math.random())}
                progressColor={"#3367d6"}
              />
            </View>
            <View style={styles.infoGrafico}>
              <Text>{x.toString().substr(0, 3) + "%"}</Text>
            </View>
          </View>
        </View>
      </View>
    );*/
}

const styles = StyleSheet.create({
  infoGrafico: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignContent: "center"
  },
  alinharCentro: {
    justifyContent: "center",
    alignContent: "center"
  },
  legendaGrafico: {
    backgroundColor: "#3367d6",
    borderRadius: 6,
    margin: 6,
    padding: 6
  },
  corLegenda: {
    color: "#FFF"
  }
});

const mapStateToProps = state => ({
  despesa: state.despesa
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(despesaActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraficoDespesa);
