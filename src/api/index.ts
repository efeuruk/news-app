import axios from "axios";

const env = import.meta.env;

const TOO_MANY_REQUESTS_STATUS_CODE = 429;

// Create instances for each API source
const newsApi = axios.create({
  baseURL: env.VITE_NEWS_API_BASE_URL,
  headers: {
    Authorization: env.VITE_NEWS_API_KEY,
  },
});

const guardianApi = axios.create({
  baseURL: env.VITE_GUARDIAN_API_BASE_URL,
  params: {
    "api-key": env.VITE_GUARDIAN_API_KEY,
  },
});

const nytimesApi = axios.create({
  baseURL: env.VITE_NYTIMES_API_BASE_URL,
  params: {
    "api-key": env.VITE_NYTIMES_API_KEY,
  },
});

newsApi.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === TOO_MANY_REQUESTS_STATUS_CODE) {
      return [];
    }
    return error;
  }
);

guardianApi.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === TOO_MANY_REQUESTS_STATUS_CODE) {
      return [];
    }
    return error;
  }
);

nytimesApi.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === TOO_MANY_REQUESTS_STATUS_CODE) {
      return [];
    }
    return error;
  }
);

export { newsApi, guardianApi, nytimesApi };
