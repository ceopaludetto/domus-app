import { AsyncStorage } from "react-native";

const exToken = async () => {
  try {
    await AsyncStorage.removeItem("@DOMUS:TOKEN");
  } catch (erro) {
    console.log(erro.message);
  }
};

export default exToken;
