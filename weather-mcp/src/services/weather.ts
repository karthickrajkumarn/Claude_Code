/**
 * Weather API Service
 */

import axios, { AxiosInstance } from 'axios';
import { logger } from '../utils/logger.js';
import { config } from '../config.js';
import type { WeatherData, ForecastData, LocationSearchResult } from '../types/weather.js';

export class WeatherService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.WEATHER_API_BASE_URL,
      timeout: config.REQUEST_TIMEOUT,
      params: {
        appid: config.WEATHER_API_KEY,
        units: config.DEFAULT_UNITS,
        lang: config.DEFAULT_LANGUAGE,
      },
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        logger.debug({ url: config.url, method: config.method }, 'API Request');
        return config;
      },
      (error) => {
        logger.error({ error }, 'API Request Error');
        return Promise.reject(error);
      }
    );

    // Add response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        logger.debug({ status: response.status }, 'API Response');
        return response;
      },
      (error) => {
        logger.error({ status: error.response?.status, message: error.message }, 'API Error');
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get current weather for a location
   */
  async getCurrentWeather(location: string): Promise<WeatherData> {
    try {
      const response = await this.client.get('/weather', {
        params: { q: location },
      });

      const data = response.data;
      return {
        location: {
          name: data.name,
          country: data.sys.country,
          lat: data.coord.lat,
          lon: data.coord.lon,
        },
        current: {
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          wind_speed: data.wind.speed,
          wind_direction: data.wind.deg,
          visibility: data.visibility,
          weather: {
            main: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          },
        },
        timestamp: Date.now(),
        units: config.DEFAULT_UNITS,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`Location "${location}" not found`);
        }
        throw new Error(`Weather API error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get weather forecast for a location
   */
  async getForecast(location: string, days: number = 5): Promise<ForecastData> {
    try {
      const response = await this.client.get('/forecast', {
        params: {
          q: location,
          cnt: days * 8, // 8 forecasts per day (every 3 hours)
        },
      });

      const data = response.data;
      const dailyForecasts = this.processForecastData(data.list, days);

      return {
        location: {
          name: data.city.name,
          country: data.city.country,
          lat: data.city.coord.lat,
          lon: data.city.coord.lon,
        },
        forecast: dailyForecasts,
        units: config.DEFAULT_UNITS,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`Location "${location}" not found`);
        }
        throw new Error(`Weather API error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Search for locations by name
   */
  async searchLocations(query: string): Promise<LocationSearchResult[]> {
    try {
      const response = await this.client.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
          q: query,
          limit: 5,
        },
      });

      return response.data.map((item: any) => ({
        name: item.name,
        country: item.country,
        state: item.state,
        lat: item.lat,
        lon: item.lon,
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Location search error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Process forecast data to get daily summaries
   */
  private processForecastData(forecasts: any[], days: number) {
    const dailyData: Map<string, any> = new Map();

    forecasts.forEach((forecast: any) => {
      const date = new Date(forecast.dt * 1000).toISOString().split('T')[0];

      if (!dailyData.has(date)) {
        dailyData.set(date, {
          temps: [],
          humidity: [],
          wind_speeds: [],
          weather: forecast.weather[0],
        });
      }

      const dayData = dailyData.get(date);
      dayData.temps.push(forecast.main.temp);
      dayData.humidity.push(forecast.main.humidity);
      dayData.wind_speeds.push(forecast.wind.speed);
    });

    return Array.from(dailyData.entries())
      .slice(0, days)
      .map(([date, data]: [string, any]) => ({
        date,
        temp_min: Math.min(...data.temps),
        temp_max: Math.max(...data.temps),
        humidity: Math.round(data.humidity.reduce((a: number, b: number) => a + b, 0) / data.humidity.length),
        wind_speed: data.wind_speeds.reduce((a: number, b: number) => a + b, 0) / data.wind_speeds.length,
        weather: {
          main: data.weather.main,
          description: data.weather.description,
          icon: data.weather.icon,
        },
      }));
  }
}

// Singleton instance
export const weatherService = new WeatherService();
