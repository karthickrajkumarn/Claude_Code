# Weather MCP Server

A Model Context Protocol (MCP) server that provides weather information tools including current weather, forecasts, and location search.

## Features

- **Current Weather**: Get real-time weather conditions for any location
- **Weather Forecasts**: Get up to 5-day weather forecasts
- **Location Search**: Search for locations by name
- **Type-Safe**: Full TypeScript support
- **Reliable**: Built-in error handling and logging

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenWeatherMap API key:

```env
WEATHER_API_KEY=your_actual_api_key_here
```

### Getting a Free API Key

1. Go to https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to API keys section
4. Copy your API key
5. Paste it into your `.env` file

The free tier includes:
- 1,000 calls/day
- Current weather data
- 5-day forecast
- No credit card required

## Building

```bash
npm run build
```

## Running the Server

```bash
npm start
```

## Available Tools

### Weather Tools
- `weather_get_current` - Get current weather for a location
- `weather_get_forecast` - Get weather forecast (up to 5 days)
- `weather_search_locations` - Search for locations

## Usage with Claude Desktop

Add to your Claude Desktop MCP configuration:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["C:\\ClaudeCode\\claude-code-repo\\weather-mcp\\dist\\index.js"],
      "env": {
        "WEATHER_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Examples

### Get Current Weather
```javascript
weather_get_current({
  location: "London"
})
```

### Get 5-Day Forecast
```javascript
weather_get_forecast({
  location: "New York,US",
  days: 5
})
```

### Search Locations
```javascript
weather_search_locations({
  query: "Paris"
})
```

## Development

### Watch mode for development
```bash
npm run dev
```

### Run demo
```bash
npm test
```

### Format code
```bash
npm run format
```

### Lint code
```bash
npm run lint
```

## API Reference

### weather_get_current

Get current weather conditions for a location.

**Parameters:**
- `location` (string, required): City name, city,country code, or zip code
  - Examples: "London", "New York,US", "10001"

**Returns:**
- Location information (name, country, coordinates)
- Current conditions (temperature, humidity, wind, etc.)
- Weather description

### weather_get_forecast

Get weather forecast for up to 5 days.

**Parameters:**
- `location` (string, required): Same format as current weather
- `days` (number, optional): Number of days (1-5, default: 5)

**Returns:**
- Location information
- Daily forecasts with min/max temperature, humidity, wind
- Weather descriptions

### weather_search_locations

Search for locations by name.

**Parameters:**
- `query` (string, required): Location name or partial name

**Returns:**
- Array of matching locations with coordinates

## Architecture

- **src/config.ts** - Environment configuration with Zod validation
- **src/services/weather.ts** - Weather API client
- **src/tools/weather.ts** - Tool definitions
- **src/index.ts** - MCP server entry point

## Error Handling

The server includes:
- Structured error messages
- Location not found handling
- API error handling
- Request/response logging

## License

MIT
