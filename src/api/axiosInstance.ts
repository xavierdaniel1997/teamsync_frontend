import axios from 'axios'
import { logout, setCredentials } from '../redux/authSlice';
import store from '../redux/store';


const API_URL = 'http://localhost:5000/api/';

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

// create the axios intersepter
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response.status === 403 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const { data } = await axios.get(`${API_URL}auth/refresh-token`, { withCredentials: true });
//                 localStorage.setItem('accessToken', data.accessToken);
//                 const user = store.getState().auth.user;
//                 if (user) {
//                     store.dispatch(setCredentials({ user, accessToken: data.accessToken }));
//                 } else {
//                     store.dispatch(logout());
//                     return Promise.reject(new Error('User is null'));
//                 }
                
//                 originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//                 return api(originalRequest);
//             } catch (refreshError) {
//                 store.dispatch(logout());
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );  
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { data } = await axios.get(`${API_URL}auth/refresh-token`, {
            withCredentials: true,
          });
          
          const user = store.getState().auth.user;
          if (user) {
            store.dispatch(setCredentials({ user, accessToken: data.accessToken }));
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(originalRequest);
          }
          throw new Error('User not found');
        } catch (refreshError) {
          store.dispatch(logout());
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );


export default api