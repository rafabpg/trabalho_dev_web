import axios from "axios";


export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosClient.interceptors.request.use(
    (config) => {
      if (config.url?.startsWith('/user') && config.method === 'get') {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );