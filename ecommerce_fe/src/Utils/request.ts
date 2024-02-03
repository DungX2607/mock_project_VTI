import axios, { AxiosResponse } from "axios";

export const serverUrl = "http://localhost:8080/api/v1/";

const request = axios.create({
  baseURL: serverUrl,
  responseType: "json",
  timeout: 10000,
});

interface RequestOptions {
  headers?: Record<string, string>;
}

export const get = async (path: string, { headers: {} }) => {
  const response = await request.get(path, {});
  return response.data;
};

export const post = async (path: string, { headers: {} }, data: any) => {
  const response = await request.post(path, data, {});
  return response.data;
};

export const post1 = async <T>(
  path: string,
  options?: RequestOptions,
  data?: any
): Promise<T> => {
  const response: AxiosResponse<T> = await request.post(path, data, {
    headers: options?.headers || {},
  });
  return response.data;
};

export const delete1 = async <T>(
  path: string,
  options?: RequestOptions
): Promise<T> => {
  const response: AxiosResponse<T> = await request.delete(path, {
    headers: options?.headers || {},
  });
  return response.data;
};

export const put1 = async <T>(
  path: string,
  options?: RequestOptions,
  data?: any
): Promise<T> => {
  const response: AxiosResponse<T> = await request.put(path, data, {
    headers: options?.headers || {},
  });
  return response.data;
};

export default request;
