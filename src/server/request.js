import axios from "axios";

export const request = axios.create({
  baseURL: "https://6509ede4f6553137159c44e9.mockapi.io/fakhriddinoripovlearningcenter/",
  timeout: 10000,
})