import { githubService } from "../src/services/github/index.js";
import { config } from "../src/config.js";
import { createLogger } from "../src/utils/logger.js";

const logger = createLogger("test-connection");

async function testConnection() {
  logger.info("Testing GitHub MCP connection...");

  try {
    // Test 1: Get authenticated user
    logger.info("Test 1: Getting authenticated user...");
    const user = await githubService.getAuthenticatedUser();
    logger.info({ user: user.login }, "✓ Authenticated user retrieved");

    // Test 2: List repositories
    logger.info("Test 2: Listing repositories...");
    const repos = await githubService.listRepositories({ visibility: "all", sort: "updated" });
    logger.info({ count: repos.length }, "✓ Repositories retrieved");

    // Test 3: Get a specific repository (using a popular public repo)
    logger.info("Test 3: Getting public repository...");
    const repo = await githubService.getRepository({ owner: "facebook", repo: "react" });
    logger.info({ repo: repo.full_name }, "✓ Public repository retrieved");

    logger.info("\n✅ All tests passed!");
    logger.info(`Connected as: ${user.login}`);
    logger.info(`You have access to ${repos.length} repositories`);

  } catch (error) {
    logger.error({ error }, "❌ Connection test failed");
    process.exit(1);
  }
}

testConnection();
