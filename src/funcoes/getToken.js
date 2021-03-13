import { AsyncStorage } from "react-native";
import store from "../redux/index";

const getToken = async () => {
  const TOKEN = await AsyncStorage.getItem("@DOMUS:TOKEN");
  if (TOKEN) {
    store.dispatch({
      type: "REQUEST_LOGIN_TOKEN",
      TOKEN
    });
  }
};

export default getToken;
