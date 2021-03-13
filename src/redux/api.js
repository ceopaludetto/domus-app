import { create } from "apisauce";
import { AsyncStorage } from "react-native";

const api = create({
  baseURL: "http://192.168.1.6:3001"
});

export const portao = create({
  baseURL: "http://192.168.43.97:3002"
});

api.addAsyncRequestTransform(async req => {
  const TOKEN = await AsyncStorage.getItem("@DOMUS:TOKEN");
  if (TOKEN) {
    req.headers["Authorization"] = "Bearer " + TOKEN;
  }
});

export default api;
