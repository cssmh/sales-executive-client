import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_server_URL,
});

export default axiosSecure;
