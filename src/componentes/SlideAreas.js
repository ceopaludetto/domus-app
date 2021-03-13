import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Text
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class SlideAreas extends Component {
  render() {
    return (
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollHorizontal}
      >
        <TouchableOpacity style={styles.area}>
          <Image
            style={styles.fundoArea}
            source={require("../imgs/churras.jpg")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.area}>
          <Image
            style={styles.fundoArea}
            source={require("../imgs/churras.jpg")}
          />
          <View style={styles.overlayArea} />
          <View style={styles.selecionado}>
            <Ionicons name="ios-checkmark-circle" size={28} color="#FFF" />
          </View>
          <Text style={[styles.nomeArea, EstiloPadrao.fonte]}>
            CHURRASQUEIRA B
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.area}>
          <Image
            style={styles.fundoArea}
            source={require("../imgs/churras.jpg")}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.area}>
          <Image
            style={styles.fundoArea}
            source={require("../imgs/churras.jpg")}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollHorizontal: {
    flexDirection: "row",
    height: 126,
    paddingHorizontal: 5
  },
  area: {
    height: 106,
    width: 106,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  overlayArea: {
    zIndex: 2,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(51,103,214,0.7)",
    borderRadius: 3
  },
  fundoArea: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 3
  },
  nomeArea: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    zIndex: 4
  },
  selecionado: {
    position: "absolute",
    zIndex: 3,
    top: 4,
    right: 8,
    borderRadius: 32,
    elevation: 4
  }
});
