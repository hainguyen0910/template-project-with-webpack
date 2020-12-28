import axios from 'axios';
import queryString from 'query-string';

const baseURL = 'http://localhost:8080/api';
const axiosClient = axios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) =>
    new Promise((resolve) => {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem('refreshToken');
      if (
        error.response &&
        error.response.status === 401 &&
        error.config &&
        !error.config.__isRetryRequest &&
        refreshToken
      ) {
        originalRequest._retry = true;

        const response = fetch(`${baseURL}/auth/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            localStorage.set(res.access, 'token');

            return axios(originalRequest);
          });
        resolve(response);
      }

      return Promise.reject(error);
    }),
);

export default axiosClient;
