import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { config } from "../config.js";

const retryDelay = (retryNumber: number): number => {
  return Math.min(1000 * 2 ** retryNumber, 30000); // Max 30s delay
};

export const createHttpClient = (): AxiosInstance => {
  const client = axios.create({
    timeout: config.REQUEST_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const timestamp = new Date().toISOString();
      (config as any).metadata = { startTime: timestamp };
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for retry logic
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as any & { _retry?: number; _retryCount?: number };

      if (!config) {
        return Promise.reject(error);
      }

      // Retry on rate limit (403) or server errors (5xx)
      const shouldRetry =
        (error.response?.status === 403 || (error.response?.status && error.response.status >= 500)) &&
        (!config._retryCount || config._retryCount < 3);

      if (shouldRetry) {
        config._retryCount = config._retryCount || 0;
        config._retry = true;
        const delay = retryDelay(config._retryCount);

        console.warn(`Retrying request after ${delay}ms (attempt ${config._retryCount + 1}/3)`);

        await new Promise((resolve) => setTimeout(resolve, delay));
        config._retryCount++;

        return client(config);
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const httpClient = createHttpClient();
