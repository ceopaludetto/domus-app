import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { DrawerItems } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import EstiloPadrao from "../EstiloPadrao";
import exToken from "../funcoes/exToken";

import { connect } from "react-redux";

class drawerCustomizado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MOR_STR_NOME: this.props.login.data.MORADOR.MOR_STR_NOME
    };
  }

  sair() {
    exToken();
    this.props.navigation.navigate("LoginTela", { anular: true });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignContent: "space-between"
          }}
        >
          <View
            style={{
              height: 120,
              flexDirection: "column",
              padding: 16,
              marginVertical: 6
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("PerfilTela")}
            >
              <Image
                source={require("../imgs/iQoHTjjl_400x400.jpeg")}
                style={{ height: 64, width: 64, borderRadius: 6 }}
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "space-between",
                marginVertical: 12
              }}
            >
              <Text
                style={[
                  {
                    textAlign: "center",
                    textAlignVertical: "center",
                    fontSize: 20
                  },
                  EstiloPadrao.fonte,
                  EstiloPadrao.textoPrimario
                ]}
              >
                {this.state.MOR_STR_NOME}
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("OpcoesTela")}
              >
                <Ionicons name="md-settings" size={26} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={EstiloPadrao.bordaHorizontal} />
          <DrawerItems {...this.props} />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignContent: "center",
            margin: 10
          }}
          onPress={() => this.sair()}
        >
          <Ionicons
            name="md-log-out"
            size={25}
            color="rgba(0,0,0,.87)"
            style={{
              textAlign: "center",
              textAlignVertical: "center",
              marginHorizontal: 16,
              alignItems: "center",
              opacity: 0.62
            }}
          />
          <Text
            style={[
              { margin: 16, fontWeight: "bold" },
              EstiloPadrao.textoPrimario
            ]}
          >
            Sair
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps)(drawerCustomizado);

//export default drawerCustomizado;
