import axios from "axios";
import { API_BASE_URL, API_KEY } from "@env";

export default axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
});
