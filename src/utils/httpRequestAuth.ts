import axios from "axios";
import { config } from "../envs/env";
import { ERROR_PAGE_URL, HTTP_ERROR_CODE, PRIVATE_PAGE_URL } from "./constants";
import queryString from "query-string";

// const StatusCode = {
//   Unauthorized: 401,
//   Forbidden: 403,
//   TooManyRequests: 429,
//   InternalServerError: 500,
// };

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": true,
  "X-Requested-With": "XMLHttpRequest",
};

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config: any) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error: any) {
    throw new Error(error);
  }
};

class Http {
  instance: any = null;

  get http() {
    return this.instance !== null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: config["BASE_URL"],
      headers,
      paramsSerializer: (params) => {
        return queryString.stringify(params, { encode: false });
      },
      // timeout: 1000 * 10,
      // withCredentials: true,
    });

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error)
    );

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error?.response?.data?.error?.code ===
            HTTP_ERROR_CODE.UNDER_MAINTENANCE &&
          window.location.pathname !== ERROR_PAGE_URL.MAINTENANCE
        ) {
          window.location.replace(ERROR_PAGE_URL.MAINTENANCE);
        }
        if (
          HTTP_ERROR_CODE.UN_AUTHORIZATION.includes(
            error?.response?.data?.error?.code
          )
        ) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("username");
          if (
            Object.values(PRIVATE_PAGE_URL).includes(window.location.pathname)
          ) {
            window.location.href = "/login";
          } else {
            window.location.reload();
          }
        }
        return this.handleError(error?.response?.data?.error || error);
      }
    );

    this.instance = http;
    return http;
  }

  request(config: any) {
    return this.http.request(config);
  }

  get(url: string, config?: any) {
    return this.http.get(url, config);
  }

  post(url: string, data: Object, config?: any) {
    return this.http.post(url, data, config);
  }

  put(url: string, data: Object, config?: any) {
    return this.http.put(url, data, config);
  }

  delete(url: string, config?: any) {
    return this.http.delete(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  handleError(error: any) {
    console.log("go to handle error");
    // const { status } = error;

    // switch (status) {
    //   case StatusCode.InternalServerError: {
    //     // Handle InternalServerError
    //     break;
    //   }
    //   case StatusCode.Forbidden: {
    //     // Handle Forbidden
    //     break;
    //   }
    //   case StatusCode.Unauthorized: {
    //     // Handle Unauthorized
    //     break;
    //   }
    //   case StatusCode.TooManyRequests: {
    //     // Handle TooManyRequests
    //     break;
    //   }
    // }

    return Promise.reject(error);
  }
}

export const httpRequestAuth = new Http();
