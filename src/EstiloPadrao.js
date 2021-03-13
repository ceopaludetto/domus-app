/*
Cores tema claro :{
  principal - #4285f4
  
}
*/

export default (EstiloPadrao = {
  containerPrimario: {
    flexDirection: "column",
    marginHorizontal: 14,
    marginVertical: 6,
    backgroundColor: "#FFF",
    borderRadius: 6
  },
  tituloContainerPrimario: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignContent: "center",
    padding: 12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: "#edf0f6"
  },
  textoContainerPrimario: {
    marginHorizontal: 4,
    textAlignVertical: "center",
    color: "#4285f4",
    letterSpacing: 1.02,
    textTransform: "uppercase",
    fontFamily: "Ubuntu-L"
  },
  iconeContainerPrimario: {
    color: "#4285f4",
    marginRight: 6
  },
  cabecalhoAzul: {
    backgroundColor: "#4285f4",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    height: 12
  },
  bordaSuperiorRadius: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  bordaInferiosRadius: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
  bordaRadius: {
    borderRadius: 3
  },
  corPrimaria: {
    color: "#4285f4"
  },
  corPrimariaEscura: {
    color: "#3367d6"
  },
  bordaHorizontal: {
    width: "100%",
    borderColor: "#edf0f6",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    margin: 2,
    alignSelf: "center"
  },
  bordaHorizontalCurta: {
    width: "80%",
    borderColor: "#edf0f6",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    alignSelf: "center",
    margin: 2
  },
  bordaVertical: {
    height: "100%",
    borderColor: "#edf0f6",
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    margin: 2,
    alignSelf: "center"
  },
  bordaVerticalCurta: {
    height: "80%",
    borderColor: "#edf0f6",
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    alignSelf: "center",
    margin: 2
  },
  fonte: {
    fontFamily: "Ubuntu-L"
  },
  textoPrimario: {
    color: "#2c3e50" //"#333" //#1a1919
  },
  textoSecundario: {
    color: "#737477"
  },
  placeholder: {
    color: "#bdbdbd"
  },
  paddingPadrao: {
    padding: 4
  },
  paddingMenor: {
    padding: 2
  },
  paddingMaior: {
    padding: 6
  },
  paddingView: {
    padding: 10
  },
  row: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column"
  },
  submitPadraoTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Ubuntu-L"
  },
  submitPadrao: {
    padding: 16,
    marginHorizontal: 14,
    marginVertical: 6,
    height: 46,
    borderRadius: 3,
    //width: this.width - 12,
    backgroundColor: "#3367d6", //#4285f4 #DE4D5C
    alignItems: "center",
    justifyContent: "center"
  },
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
  },
  tituloItem: {
    fontWeight: "bold",
    padding: 4
  },
  textoItem: {
    padding: 4
  }
});
