import axios from "axios";

const env = import.meta.env;

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

export { newsApi, guardianApi, nytimesApi };
