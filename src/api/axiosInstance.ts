import axios from 'axios'
import { logout, setCredentials } from '../redux/authSlice';
import store from '../redux/store';


// const API_URL =  import.meta.env.VITE_NODE_ENV === 'development' ? "http://localhost:5000/api/" : "https://api.teamsync.buzz/api/"
const API_URL =  import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_LOCAL_URL : import.meta.env.VITE_PRODUCTION_URL;


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
 
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      console.log("error form the intersepter", error)
      if (error.response?.status === 401 || error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          console.log("refresh-token going to call")
          const { data } = await axios.get(`${API_URL}auth/refresh-token`, {
            withCredentials: true,
          });
          console.log("refresh-token called and data", data)
          if (!data?.accessToken) {
            throw new Error('No access token in refresh response');
          }
          localStorage.setItem("accessToken", data.accessToken);
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