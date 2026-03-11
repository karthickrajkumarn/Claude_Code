/**
 * Weather data type definitions
 */

export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    wind_direction: number;
    visibility: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    };
  };
  timestamp: number;
  units: string;
}

export interface ForecastData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  forecast: Array<{
    date: string;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind_speed: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    };
  }>;
  units: string;
}

export interface WeatherAlert {
  event: string;
  start: number;
  end: number;
  description: string;
  sources: string[];
}

export interface LocationSearchResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}
