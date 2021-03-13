import React from "react";
import { View, StatusBar } from "react-native";

import Stacks from "./stacks/index";
import store from "./redux/index";
import { Provider } from "react-redux";
import getToken from "./funcoes/getToken";
import exToken from "./funcoes/exToken";

getToken();

class Telas extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#3367d6" barStyle="light-content" />
          <Stacks style={{ flex: 1 }} />
        </View>
      </Provider>
    );
  }
}

export default Telas;
