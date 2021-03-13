import React, { Component } from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

class SenhaInput extends Component {
  render() {
    return (
      <TextInput
        underlineColorAndroid={"transparent"}
        editable={false}
        secureTextEntry={true}
        maxLength={1}
        style={[
          styles.visor,
          this.props.especial ? { backgroundColor: "#ffd864" } : false,
          this.props.correto == null
            ? false
            : this.props.correto == "correto"
              ? { backgroundColor: "#69EE9A" }
              : { backgroundColor: "#e74c3c" }
        ]}
      >
        {this.props.code}
      </TextInput>
    );
  }
}

const styles = StyleSheet.create({
  visor: {
    fontSize: 30,
    height: 60,
    width: 45,
    borderRadius: 6,
    backgroundColor: "#eaedf2",
    textAlign: "center",
    marginRight: 4,
    color: "#3367d6"
  }
});

export default SenhaInput;
