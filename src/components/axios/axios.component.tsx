import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export enum AuthorizationHeader {
  Bearer = 'Bearer',
  Basic = 'Basic',
  RefreshToken = 'refreshToken',
  AccessToken = 'accessToken',
}

const env = process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: env,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Timeout: 20000,
    Expires: '0',
    WithCredentials: true,
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

    if (res.status === 401 && !error.config.headers['RefreshToken']) {
      api.defaults.headers.common['RefreshToken'] = true;
      try {
        const refreshToken = window.localStorage.getItem(AuthorizationHeader.RefreshToken);

        if (refreshToken) {
          const refreshResponse: AxiosResponse<HttpResponse<RefreshTokenResponse>> = await api.post('/refresh', {
            refreshToken,
          });

          window.localStorage.setItem(AuthorizationHeader.AccessToken, refreshResponse.data.data[AuthorizationHeader.AccessToken] as string);

          // api.defaults.headers.common['Authorization'] = 'Bearer ' + refreshResponse.data.accessToken;
          error.config.headers['Authorization'] = 'Bearer ' + refreshResponse.data.data[AuthorizationHeader.AccessToken];
          error.config.headers['RefreshToken'] = false;
        } else {
          throw new Error('No refresh token');
        }
      } catch (error) {
        window.location.href = '/login';
      }

      return api(error.config);
    }
    console.error('Looks like there was a problem. Status Code: ' + res.status);

    return Promise.reject(error);
  },
);

/**
 * Http Response DTOS
 */
export interface HttpResponse<T> {
  data: T;
  paging?: { current: number; limit: number; total: number };
  errorCode?: string;
}

export interface HttpRequest<T> {
  data: T;
  paging?: { current: number; limit: number };
  sort?: { field: string; order: string }[];
}

export interface RefreshTokenResponse {
  [AuthorizationHeader.AccessToken]: string;
  status: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  refreshExpire: string | null;
  time: number | undefined;
}
