/*import React from "react";
import { StyleSheet, TouchableHighlight, View, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false
    };
  }

  static navigationOptions = {
    header: null
  };

  _navigateApp = () => {
    this.setState({
      login: true
    });
  };

  componentDidMount() {
    alert("eae1");
    if (this.state.login) {
      this.props.navigation.navigate("LoginScreen");
      alert("eae2");
    }
  }

  render() {
    return (
      <AppIntroSlider
        nextLabel={"Próximo"}
        doneLabel={"Entendi!"}
        slides={slides}
        renderItem={this._renderItem}
        onDone={}
      />
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  introImage: {
    width: 310,
    height: 310
  },

  introImageFam: {
    width: 300,
    height: 200
  }
});

const slides = [
  {
    key: "page1",
    title: "Wow olá!",
    text: "Qual cidade que não tem táxi?\nA Uberlândia rs",
    image: require("../imgs/nha.png"),
    imageStyle: styles.introImage,
    backgroundColor: "#4a148c"
    //colors: ['#cb2d3e', '#ef473a'],
  },
  {
    key: "page2",
    title: "Badabim badabum",
    text: "O que o rato americano disse pro rato brasileiro?\nCamon dongo rsrs",
    image: require("../imgs/nha.png"),
    imageStyle: styles.introImage,
    backgroundColor: "#febe29"
  },
  {
    key: "page3",
    title: "(~  °-°)~",
    text: "Por que tem trampolins no polo norte?\nPro urso polar rsrsrs",
    image: require("../imgs/nha.png"),
    imageStyle: styles.introImageFam,
    backgroundColor: "#4fc3f7"
  }
];
export default IntroScreen;
*/

import React from "react";
import { StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320
  }
});

const slides = [
  {
    key: "somethun",
    title: "Wow olá!",
    text: "Qual cidade que não tem táxi?\nA Uberlândia rs",
    //image: require('./assets/1.jpg'),
    //imageStyle: styles.image,
    backgroundColor: "#3367d6"
  },
  {
    key: "somethun-dos",
    title: "Badabim badabum",
    text: "O que o rato americano disse pro rato brasileiro?\nCamon dongo rsrs",
    //image: require('./assets/2.jpg'),
    //imageStyle: styles.image,
    backgroundColor: "#3367d6"
  },
  {
    key: "somethun1",
    title: "(~  °-°)~",
    text: "Por que tem trampolins no polo norte?\nPro urso polar rsrsrs",
    //image: require('./assets/3.jpg'),
    //imageStyle: styles.image,
    backgroundColor: "#3367d6"
  }
];

export default class Intro extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      showRealApp: false
    };
  }

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  };
  render() {
    if (this.state.showRealApp) {
      return this.props.navigation.navigate("LoginTela");
    } else {
      return <AppIntroSlider slides={slides} onDone={this._onDone} />;
    }
  }
}
