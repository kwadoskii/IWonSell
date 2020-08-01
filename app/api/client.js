import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.1.184:9000", //http://192.168.1.184 or 192.168.43.233
});

export default apiClient;
