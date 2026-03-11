/**
 * Tool handlers for weather operations
 */

import { weatherService } from '../services/weather.js';
import { weatherTools } from './weather.js';

export async function handleWeatherTool(name: string, args: Record<string, unknown>) {
  let result: any;

  switch (name) {
    case 'weather_get_current':
      result = await weatherService.getCurrentWeather(args.location as string);
      break;

    case 'weather_get_forecast':
      result = await weatherService.getForecast(
        args.location as string,
        args.days as number | undefined
      );
      break;

    case 'weather_search_locations':
      result = await weatherService.searchLocations(args.query as string);
      break;

    default:
      throw new Error(`Unknown weather tool: ${name}`);
  }

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

export { weatherTools };
