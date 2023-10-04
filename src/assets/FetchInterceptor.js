import axios from "axios";
import { notification } from "antd";

const service = axios.create({
   baseURL: "https://staging.mazaady.com/api/v1/",
   timeout: 60000,
});

// Config
const TOKEN_PAYLOAD_KEY = "private-key";

// API Request interceptor
service.interceptors.request.use(
   (config) => {
      const privateKey = "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16";

      if (jwtToken) {
         config.headers[TOKEN_PAYLOAD_KEY] = privateKey;
      }

      return config;
   },
   (error) => {
      // Do something with request error here
      notification.error({
         message: "Error",
      });
      Promise.reject(error);
   }
);

// API respone interceptor
service.interceptors.response.use(
   (response) => {
      return response.data;
   },
   (error) => {
      // let notificationParam = {
      //    message: "",
      // };
      // if (error.response.status === 404) {
      //    notificationParam.message = "Not Found";
      // }
      // if (error.response.status === 500) {
      //    notificationParam.message = "Internal Server Error";
      // }
      // if (error.response.status === 508) {
      //    notificationParam.message = "Time Out";
      // }
      // return Promise.reject(error);
   }
);

export default service;
