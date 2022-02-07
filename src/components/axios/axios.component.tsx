import axios, { AxiosRequestConfig } from 'axios';

export enum AuthorizationHeader {
  Bearer = 'Bearer',
  Basic = 'Basic',
  RefreshToken = 'refreshToken',
  AccessToken = 'accessToken',
}

export const api = axios.create({
  'baseURL': 'http://localhost:3001/api',
  'headers': {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Timeout': 20000,
    'Expires': '0',
    'WithCredentials': true,
    'Serkon': 1,
    // 'User-Agent': 'react-boilerplate',
    // 'Authorization': 'token ' + process.env.REACT_APP_GITHUB_TOKEN,
    // 'Upgrade-Insecure-Requests': '1',
    // 'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT',
    // 'If-None-Match': '"5d0f3e3-2"',
    // 'If-Unmodified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT',
    // 'If-Match': '"5d0f3e3-2"',
    // 'If-Range': '"5d0f3e3-2"',
  },
});

api.interceptors.request.use(
  (response: AxiosRequestConfig<any>) => {
    const token = window.localStorage.getItem(AuthorizationHeader.AccessToken);
    response.headers = { ...response.headers };
    if (token) {
      response.headers['Authorization'] = 'Bearer ' + token;
    }
    return response;
  },
  (error) => {
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const res = error.response;
    const req = error.config;
    console.log('error:', error);
    if (res.status === 401 && res._retry) {
      console.log('401');
      const refreshToken = window.localStorage.getItem(AuthorizationHeader.AccessToken);
      try {
        const response: Response<AuthorizationResponse> = await api.post('/oauth/token', {
          'grant_type': 'refresh_token',
          'refresh_token': refreshToken,
          // 'client_id': process.env.REACT_APP_GITHUB_CLIENT_ID,
          // 'client_secret': process.env.REACT_APP_GITHUB_CLIENT_SECRET,
          // 'redirect_uri': process.env.REACT_APP_GITHUB_REDIRECT_URI,
        });
        window.localStorage.setItem(AuthorizationHeader.AccessToken, response.data.token);
        window.localStorage.setItem(AuthorizationHeader.RefreshToken, response.data.refreshToken);
        api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        req.headers['Authorization'] = 'Bearer ' + response.data.token;
      } catch (error) {
        window.location.href = '/login';
      }
      return api(req);
    }
    console.error('Looks like there was a problem. Status Code: ' + res.status);
    return Promise.reject(error);
  },
);

export interface Response<T> {
  data: T;
  paging?: { current: number; limit: number; total: number };
  errorCode?: string;
}

export interface Request<T> {
  data: T;
  paging?: { current: number; limit: number };
  sort?: { field: string; order: string }[];
}

export interface AuthorizationResponse {
  refreshToken: string;
  token: string;
}
