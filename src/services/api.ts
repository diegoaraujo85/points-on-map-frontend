import axios from 'axios';

const url = 'http://localhost:3333';
// const url =
//   process.env.REACT_APP_API_URL || 'https://backend-uptrade.herokuapp.com';

const api = axios.create({
  baseURL: url,
});

api.interceptors.response.use(
  response => {
    // Do something with response data

    return response;
  },
  error => {
    // fazer uma pagina de erro 500?

    if (error.response) {
      if (error.response.status === 401) {
        const requestConfig = error.config;

        // O token JWT expirou

        localStorage.removeItem('@IntrAttitude:token');
        localStorage.removeItem('@IntrAttitude:user');
        window.location.href = '/signin';

        return axios(requestConfig);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
