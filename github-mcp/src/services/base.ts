import { AxiosInstance } from "axios";
import pino from "pino";
import { createLogger } from "../utils/logger.js";

export abstract class BaseService {
  protected httpClient: AxiosInstance;
  protected baseUrl: string;
  protected logger: pino.Logger;

  constructor(httpClient: AxiosInstance, baseUrl: string, serviceName: string) {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
    this.logger = createLogger(serviceName);
  }

  protected buildUrl(path: string, params?: Record<string, string>): string {
    let url = `${this.baseUrl}${path}`;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }
    return url;
  }

  protected async handleRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      this.logger.error({ error }, "Request failed");
      throw error;
    }
  }
}
