import { githubTools, handleGitHubTool } from "./github.js";

export const allTools = [...githubTools];

export async function handleTool(name: string, args: Record<string, unknown>) {
  if (name.startsWith("github_")) {
    return handleGitHubTool(name, args);
  }

  throw new Error(`Unknown tool: ${name}`);
}
