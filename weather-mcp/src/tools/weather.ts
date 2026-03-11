/**
 * Weather MCP tool definitions
 */

export const weatherTools = [
  {
    name: "weather_get_current",
    description: "Get current weather information for a specific location",
    inputSchema: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "Location name (city, city,country, or zip code). Examples: 'London', 'New York,US', '10001'",
        },
      },
      required: ["location"],
    },
  },
  {
    name: "weather_get_forecast",
    description: "Get weather forecast for a location for up to 5 days",
    inputSchema: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "Location name (city, city,country, or zip code)",
        },
        days: {
          type: "number",
          description: "Number of days to forecast (1-5)",
          minimum: 1,
          maximum: 5,
          default: 5,
        },
      },
      required: ["location"],
    },
  },
  {
    name: "weather_search_locations",
    description: "Search for locations by name to find matching cities",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Location search query (city name or partial name)",
        },
      },
      required: ["query"],
    },
  },
];
