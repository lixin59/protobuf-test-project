import Axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const requestInstance = Axios.create({
  baseURL: import.meta.env.BASE_ENV_BASE_URL
});

// 请求拦截器
requestInstance.interceptors.request.use();

// 响应拦截器
requestInstance.interceptors.response.use();

export function request<Response>(options: AxiosRequestConfig) {
  return requestInstance.request<Response>(options).then(response => {
    return response.data;
  });
}
