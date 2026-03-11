#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { config } from "./config.js";
import { createLogger } from "./utils/logger.js";
import { allTools, handleTool } from "./tools/index.js";

const logger = createLogger("github-mcp");

async function main() {
  logger.info("Starting GitHub MCP Server...");

  // Validate configuration
  if (!config.GITHUB_PAT || config.GITHUB_PAT === "your_github_token_here") {
    logger.error("GITHUB_PAT is not configured. Please set it in your .env file.");
    logger.error("Create a token at: https://github.com/settings/tokens");
    process.exit(1);
  }

  logger.info("GitHub token configured successfully");

  // Create MCP server
  const server = new Server(
    {
      name: "github-mcp",
      version: "0.1.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    logger.debug({ count: allTools.length }, "Listing available tools");
    return {
      tools: allTools,
    };
  });

  // Call tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    logger.debug({ tool: name, args }, "Tool called");

    try {
      return await handleTool(name, args as Record<string, unknown>);
    } catch (error) {
      logger.error({ tool: name, error }, "Tool execution failed");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: error instanceof Error ? error.message : "Unknown error",
            }),
          },
        ],
        isError: true,
      };
    }
  });

  // Connect to stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  logger.info({
    tools: {
      total: allTools.length,
    },
  }, "GitHub MCP Server initialized");
  logger.info("Server started and listening");
}

main().catch((error) => {
  logger.error({ error }, "Failed to start server");
  process.exit(1);
});
