/*

import axios from 'axios'
import { logout, setCredentials } from '../redux/authSlice';
import store from '../redux/store';


const API_URL= import.meta.env.VITE_SERVER_URL;
console.log("API_URL", API_URL)
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)
 
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
//       console.log("error form the intersepter", error)
//       if (error.response?.status === 401 || error.response?.status === 403 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           console.log("refresh-token going to call")
//           const { data } = await axios.post(`http://localhost:5000/api/auth/refresh-token`, {
//             withCredentials: true,
//           });
//           console.log("refresh-token called and data", data)
//           if (!data?.accessToken) {
//             throw new Error('No access token in refresh response');
//           }
//           localStorage.setItem("accessToken", data.accessToken);
//           const user = store.getState().auth.user;
//           if (user) {
//             store.dispatch(setCredentials({ user, accessToken: data.accessToken }));
//             originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//             return api(originalRequest);
//           }
//           throw new Error('User not found');
//         } catch (refreshError) {
//           store.dispatch(logout());
//           window.location.href = '/login';
//           return Promise.reject(refreshError);
//         } 
//       }
//       return Promise.reject(error);
//     }
//   );



let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};


api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        const newToken = data.accessToken;
        if (!newToken) throw new Error("No access token");

        localStorage.setItem("accessToken", newToken);

        const user = store.getState().auth.user;
        if (!user) throw new Error("User missing");

        store.dispatch(setCredentials({ user, accessToken: newToken }));

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);

      } catch (err) {
        processQueue(err, null);
        store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(err);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);



export default api

*/


import axios from "axios";
import store from "../redux/store";
import { logout, setCredentials } from "../redux/authSlice";

const API_URL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= REQUEST INTERCEPTOR =================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post("/auth/refresh-token");

        // ✅ CORRECT PATH
        const newToken = response.data?.data?.accessToken;
        if (!newToken) {
          throw new Error("No access token in refresh response");
        }

        // ✅ persist token
        localStorage.setItem("accessToken", newToken);

        // ✅ update redux (THIS WAS MISSING)
        const user = store.getState().auth.user;
        if (user) {
          store.dispatch(setCredentials({ user, accessToken: newToken }));
        }

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // ❗ logout ONLY if refresh truly fails
        store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export default api;
