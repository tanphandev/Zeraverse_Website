import { getCookie } from "cookies-next";
const BASE_URL = process.env.BASE_URL;
const METHOD_GET = "get";
const METHOD_POST = "post";
const METHOD_PUT = "put";
const METHOD_DELETE = "delete";

export enum cacheType {
  forceCache = "force-cache",
  noCache = "no-cache",
  noStore = "no-store",
  reload = "reload",
}

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
    "Content-Type": "application/json",
  },
  cache: string = cacheType.forceCache,
  dataBody: FormData | undefined | object = {},
  params: any = null,
  baseUrl: string | undefined = BASE_URL
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
    accessToken = localStorage.getItem("token") || getCookie("token");
  }
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (method !== METHOD_GET) {
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
    return requestAPI(METHOD_GET, url, headers, cache, data, params, baseUrl)
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
    return requestAPI(METHOD_POST, url, headers, cache, data, prams, baseUrl)
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
    return requestAPI(METHOD_PUT, url, headers, cache, data, params, baseUrl);
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
      METHOD_DELETE,
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
