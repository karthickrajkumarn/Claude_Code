import { config } from "../config.js";

export function getGitHubAuthHeader(): string {
  return `token ${config.GITHUB_PAT}`;
}
