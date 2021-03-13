import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EstiloPadrao from "../EstiloPadrao";

export default class Header extends React.Component {
  render() {
    return (
      <View
        style={[
          {
            flexDirection: "row",
            height: 56,
            alignItems: "center",
            justifyContent: "space-between",
            padding: 12
          },
          this.props.bgColor
            ? { backgroundColor: this.props.bgColor }
            : { backgroundColor: "#4285f4" },
          this.props.elevation
            ? { elevation: parseInt(this.props.elevation) }
            : { elevation: 4 }
        ]}
      >
        <View style={{ flexDirection: "row", marginHorizontal: 6 }}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Ionicons name="md-menu" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text
            style={[
              {
                marginHorizontal: 24,
                textAlign: "center",
                textAlignVertical: "center",
                color: "#FFF",
                fontSize: 22
              },
              EstiloPadrao.fonte
            ]}
          >
            DOMUS
          </Text>
        </View>
        <Ionicons
          name="md-information"
          size={28}
          color="#FFF"
          style={{ marginHorizontal: 6 }}
        />
      </View>
    );
  }
}
