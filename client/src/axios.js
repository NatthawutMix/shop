import axios from "axios";

console.log(localStorage.getItem("jwtToken"));

const instance = axios.create({
  baseURL: "http://localhost:8001/",
});

export default instance;
