import axios, { AxiosInstance, AxiosResponse ,InternalAxiosRequestConfig  } from 'axios';

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com',  // 根据需要配置 API 基础地址
  timeout: 5000,  // 请求超时时间
});


// 请求拦截器
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 可以在此处添加请求头，例如 token
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
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
    (response: AxiosResponse) => {
      // 这里可以处理响应数据
      return response.data;
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

// 封装的 GET 请求
const get = <T>(url: string, params?: object): Promise<T> => {
  return instance.get(url, { params });
};

// 封装的 POST 请求
const post = <T>(url: string, data?: object): Promise<T> => {
  return instance.post(url, data);
};

// 封装的 PUT 请求
const put = <T>(url: string, data?: object): Promise<T> => {
  return instance.put(url, data);
};

// 封装的 DELETE 请求
const del = <T>(url: string): Promise<T> => {
  return instance.delete(url);
};

export default { get, post, put, del };
