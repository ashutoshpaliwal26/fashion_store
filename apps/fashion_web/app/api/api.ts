import axios from "axios";
const ApiService = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 1000,
});

export {ApiService};