import axios from "axios";

import { config } from "../envs/env";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "X-Requested-With": "XMLHttpRequest",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Credentials": true,
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
    });

    http.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error?.response?.data?.error || error)
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

  handleError(error: any) {
    return Promise.reject(error);
  }
}

export const httpRequest = new Http();
