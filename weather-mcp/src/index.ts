/**
 * Weather MCP Server
 * Model Context Protocol server for weather information
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { logger } from './utils/logger.js';
import { config } from './config.js';
import { weatherTools, handleWeatherTool } from './tools/index.js';

async function main() {
  logger.info('Starting Weather MCP Server...');

  // Validate configuration
  if (!config.WEATHER_API_KEY || config.WEATHER_API_KEY === 'your_openweathermap_api_key_here') {
    logger.error('WEATHER_API_KEY is not configured. Please set it in your .env file.');
    logger.error('Get your free API key at: https://openweathermap.org/api');
    process.exit(1);
  }

  logger.info('Weather API key configured successfully');

  // Create MCP server
  const server = new Server(
    {
      name: 'weather-mcp',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    logger.debug('Listing available tools');
    return {
      tools: weatherTools,
    };
  });

  // Call tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    logger.debug({ tool: name, args }, 'Tool called');

    try {
      return await handleWeatherTool(name, args || {});
    } catch (error) {
      logger.error({ tool: name, error }, 'Tool execution failed');
      throw error;
    }
  });

  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);

  logger.info(`Weather MCP Server initialized with ${weatherTools.length} tools`);
  logger.info('Server started and listening');

  // Keep process alive
  process.on('SIGINT', () => {
    logger.info('Shutting down server...');
    process.exit(0);
  });
}

main().catch((error) => {
  logger.error('Failed to start server');
  process.exit(1);
});
