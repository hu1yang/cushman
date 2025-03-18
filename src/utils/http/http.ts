import axios, { AxiosInstance, AxiosResponse ,InternalAxiosRequestConfig  } from 'axios';
import Cookies from 'js-cookie'
export interface CustomData<D = any> {
  code: number;
  msg: string;
  data?: D;
}

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: process.env.UMI_APP_API_URL,  // 根据需要配置 API 基础地址
  timeout: 5000,  // 请求超时时间
  headers: {
    Accept: 'application/json',
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    'X-Requested-With': 'XMLHttpRequest',
  },
});


// 请求拦截器
instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // 可以在此处添加请求头，例如 token
      const token = Cookies.get('token')
      if (token) {
        config.headers['Access-Token'] = token;
      }
      const date = new Date().valueOf(); // 时间戳
      if (config.method === 'post') {
        config.data = {
          ...config.data,
          timeStamp: date,
        };
      } else if (config.method === 'get') {
        config.params = {
          timeStamp: date,
          ...config.params,
        };
      }
      return config;
    },
    (error) => {
      // 请求错误处理
      return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    async (response: AxiosResponse) => {
      // 这里可以处理响应数据
      if (response.status === 200) {
        if (response.data.code === 403) {
        }
        return response;
      }
      return Promise.reject(response);
    },
    (error) => {
      // 错误处理（例如统一提示错误信息）
      if (error.response) {
        // 服务器返回的错误
        switch (error.response.status) {
          case 401:
            // 未授权，跳转到登录页等操作
            break;
          case 500:
            // 服务器错误
            break;
          default:
            break;
        }
      } else if (error.request) {
        // 请求发出后没有收到响应
        console.error('Network error or no response received');
      } else {
        // 其他错误
        console.error('Error', error.message);
      }
      return Promise.reject(error);
    }
);

// 请求方法封装
function get<D,T=any>(url: string, params: T): Promise<CustomData<D>> {
  return instance
  .get<CustomData<D>>(url, { params })
  .then((response) => response.data)
  .catch((error) => {
    console.error(error);
    throw error;
  });
}
function post<D>(url: string, params: any): Promise<CustomData<D>> {
  return instance
  .post(url, params)
  .then((response) => {
    return response.data as CustomData<D>;
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });
}

export default { get, post };
