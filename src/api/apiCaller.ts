import { getCookie } from "cookies-next";
const BASE_URL = process.env.BASE_URL;
const METHOD_GET = "get";
const METHOD_POST = "post";
const METHOD_PUT = "put";
const METHOD_DELETE = "delete";

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
  dataBody: FormData | undefined | object = {},
  baseUrl: string | undefined = BASE_URL
): Promise<ApiResponse<any>> {
  const fullUrl: string = `${baseUrl}${url}`;
  const config: { [k: string]: any } = {
    headers: { ...headers },
    method,
  };
  const accessToken = localStorage.getItem("token") || getCookie("token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (method === METHOD_GET) {
    config.params = dataBody;
  } else {
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
    data: FormData | any = null,
    headers?: object,
    baseUrl: string | undefined = BASE_URL
  ): Promise<ApiResponse<any>> {
    return requestAPI(METHOD_GET, url, headers, data, baseUrl)
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
    headers?: object,
    baseUrl: string | undefined = BASE_URL
  ): Promise<any> {
    return requestAPI(METHOD_POST, url, headers, data, baseUrl)
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
    headers?: object,
    baseUrl: string | undefined = BASE_URL
  ): Promise<ApiResponse<any>> {
    return requestAPI(METHOD_PUT, url, headers, data, baseUrl);
  },

  delete(
    url: string,
    data?: FormData,
    headers?: object,
    baseUrl: string | undefined = BASE_URL
  ): Promise<ApiResponse<any>> {
    return requestAPI(METHOD_DELETE, url, headers, data, baseUrl);
  },
};

export default ApiCaller;
