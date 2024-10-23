import axios from 'axios';

let store

export const injectStore = (_store) => {
   store = _store;
};

const apiUser = axios.create({
   baseURL: 'https://demo-api.apiko.academy',
   headers: { 'Content-Type': 'application/json' }
});


apiUser.interceptors.request.use(function (config) {

   const accessToken = store.getState().auth.accessToken;

   if (accessToken) {
     config.headers.Authorization = `Bearer ${accessToken}`;
   }
   return config;
  },
 );

export default apiUser;