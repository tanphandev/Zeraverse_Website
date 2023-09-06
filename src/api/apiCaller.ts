import { getCookie } from "cookies-next";
import { config } from "@/envs/env";
import { HTTP_METHOD, cacheType } from "@/utils/constants";
const BASE_URL = config["BASE_URL"];

export type ResponseData<T> = {
  success?: boolean;
  data: T;
};

export type ApiResponseData<T> = {
  status: number;
  data: ResponseData<T>;
};

export type ApiResponse<T> = {
  status: number;
  data: T;
};

async function requestAPI(
  method: string,
  url: string,
  headers: object = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true,
    "X-Requested-With": "XMLHttpRequest",
  },
  cache: string = cacheType.forceCache,
  dataBody: FormData | undefined | object = {},
  params: any = null,
  baseUrl: string = BASE_URL
): Promise<ApiResponse<any>> {
  let fullUrl: string = "";
  if (params) {
    const queryParams = new URLSearchParams(params);
    fullUrl = `${baseUrl}${url}?${queryParams.toString()}`;
  } else {
    fullUrl = `${baseUrl}${url}`;
  }
  const config: { [k: string]: any } = {
    headers: { ...headers },
    method,
  };
  // add Cache-Control into Headers
  config.headers["Cache-Control"] = cache;
  let accessToken = null;
  if (typeof window !== "undefined") {
    accessToken =
      localStorage.getItem("accessToken") || getCookie("accessToken");
  }
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (method !== HTTP_METHOD.METHOD_GET) {
    config.body = JSON.stringify(dataBody);
  }
  return fetch(fullUrl, { ...config })
    .then((value: any) => {
      return value.json();
    })
    .catch((e: any) => {
      throw e;
    });
}

const ApiCaller = {
  get(
    url: string,
    data: any = null,
    params?: any,
    cache?: string,
    headers?: object,
    baseUrl: string | undefined = BASE_URL
  ): Promise<any> {
    return requestAPI(
      HTTP_METHOD.METHOD_GET,
      url,
      headers,
      cache,
      data,
      params,
      baseUrl
    )
      .then((value: any) => {
        return value;
      })
      .catch((e: any) => {
        throw e;
      });
  },

  post(
    url: string,
    // data: string | FormData | undefined,
    data: any,
    prams?: any,
    cache?: string,
    headers?: object,
    baseUrl: string | undefined = BASE_URL
  ): Promise<any> {
    return requestAPI(
      HTTP_METHOD.METHOD_POST,
      url,
      headers,
      cache,
      data,
      prams,
      baseUrl
    )
      .then((value: any) => {
        return value;
      })
      .catch((e: any) => {
        throw e;
      });
  },

  put(
    url: string,
    data: any,
    params?: any,
    cache?: string,
    headers?: object,
    baseUrl: string | undefined = BASE_URL
  ): Promise<any> {
    return requestAPI(
      HTTP_METHOD.METHOD_PUT,
      url,
      headers,
      cache,
      data,
      params,
      baseUrl
    );
  },

  delete(
    url: string,
    data?: FormData,
    params?: any,
    cache?: string,
    headers?: object,
    baseUrl: string | undefined = BASE_URL
  ): Promise<any> {
    return requestAPI(
      HTTP_METHOD.METHOD_DELETE,
      url,
      headers,
      cache,
      data,
      params,
      baseUrl
    );
  },
};

export default ApiCaller;
