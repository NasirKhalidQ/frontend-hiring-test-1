import axios from "axios";

let headers = {};
const { REACT_APP_API_BASE_URL } = process.env;
const axiosIns = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
  headers,
});

axiosIns.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosIns.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 401) {
      alert("401");
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default axiosIns;
