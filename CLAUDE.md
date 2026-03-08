# GitHub MCP Server - Claude Code Context

This document provides project-specific context and instructions for Claude Code working on the GitHub MCP Server.

## Project Overview

**GitHub MCP Server** is a Model Context Protocol (MCP) server that provides tools for interacting with GitHub's API. It enables AI assistants to perform GitHub operations like managing repositories, issues, pull requests, and comments.

### Key Technologies
- **TypeScript** - Full type safety throughout the codebase
- **Node.js** (>=20.0.0) - Runtime environment
- **@modelcontextprotocol/sdk** - MCP protocol implementation
- **axios** - HTTP client with retry logic
- **pino** - Structured logging
- **zod** - Schema validation

### GitHub API Scopes Required
- `repo` - Full control of private repositories
- `read:org` - Read org and team membership
- `read:user` - Read user profile data
- `user:email` - Read user email addresses

## Project Structure

```
github-mcp/
├── src/
│   ├── auth/
│   │   └── auth-header.ts          # GitHub token authentication headers
│   ├── client/
│   │   └── http-client.ts          # Axios client with retry logic
│   ├── services/
│   │   ├── base.ts                 # Base service class
│   │   └── github/
│   │       └── index.ts            # GitHub API service (singleton)
│   ├── tools/
│   │   ├── github.ts               # GitHub tool definitions
│   │   └── index.ts                # Tool handlers
│   ├── types/
│   │   └── github.ts               # TypeScript type definitions
│   ├── utils/
│   │   └── logger.ts               # Pino logger configuration
│   ├── config.ts                   # Environment configuration
│   └── index.ts                    # MCP server entry point
├── scripts/
│   └── test-connection.ts          # Connection testing script
├── dist/                           # Compiled JavaScript (git ignored)
├── .env                            # Environment variables (git ignored)
├── .env.example                    # Environment template
└── package.json                    # Dependencies and scripts
```

## Development Workflow

### 1. Setup & Installation
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and add your GitHub token
```

### 2. Building
```bash
# Build the project
npm run build

# Watch mode for development
npm run dev
```

### 3. Testing
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Test GitHub API connection
npm run test-connection

# Run automated demonstration
node demo-operations.mjs

# Run interactive test suite
node test-operations.mjs
```

### 4. Running the Server
```bash
# Start the MCP server
npm start

# The server will:
# 1. Load configuration from .env
# 2. Initialize GitHub service
# 3. Register 16 GitHub tools
# 4. Start listening for MCP connections
```

## Coding Conventions

### TypeScript Style
- Use **strict mode** (enabled in tsconfig.json)
- Provide **type annotations** for all function parameters and return types
- Use **interfaces** for external data shapes, **types** for unions/intersections
- Avoid `any` types - use `unknown` with type guards if needed

### Error Handling
- All service methods return **typed responses** or throw errors
- Use the **retry logic** built into `BaseService` for API calls
- Include **error context** in thrown errors (operation, resource, reason)
- Use **Pino logger** for structured logging with appropriate log levels

### API Response Structure
GitHub API responses should be typed using interfaces from `src/types/github.ts`:
```typescript
interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  // ... other properties
}
```

### Service Pattern
- Services extend `BaseService` for automatic retry logic
- Use the singleton pattern for `GitHubService`
- All API methods should be **async** and return **typed data**
- Include JSDoc comments for public methods

### Tool Definitions
- Tools are defined in `src/tools/github.ts`
- Each tool has:
  - `name`: Unique identifier (snake_case)
  - `description`: Clear explanation of what it does
  - `inputSchema`: JSON Schema for parameters
  - Required parameters marked in schema
- Tool handlers are in `handleGitHubTool()` function

## Architecture Patterns

### Authentication
- GitHub Personal Access Token stored in `GITHUB_PAT` environment variable
- Token loaded via Zod-validated configuration
- Passed via `Authorization` header in all API requests

### HTTP Client
- Axios instance configured in `http-client.ts`
- Automatic retry with exponential backoff for:
  - Rate limit errors (403)
  - Server errors (5xx)
  - Network errors
- Configurable timeout and base URL

### Logging
- Pino logger with configurable log levels
- Structured logging with context (request_id, operation, etc.)
- Pretty-printed in development, JSON in production
- Log levels: `trace`, `debug`, `info`, `warn`, `error`, `silent`

### MCP Integration
- Server implements MCP protocol using `@modelcontextprotocol/sdk`
- Tools registered at startup in `src/index.ts`
- Each tool call invokes appropriate service method
- Results returned as formatted JSON in MCP response format

## Available Tools (16 Total)

### Repository Tools (2)
1. `github_list_repositories` - List authenticated user's repositories
2. `github_get_repository` - Get specific repository details

### Issue Tools (4)
3. `github_list_issues` - List issues in a repository
4. `github_get_issue` - Get specific issue details
5. `github_create_issue` - Create a new issue
6. `github_update_issue` - Update an existing issue

### Pull Request Tools (4)
7. `github_list_pull_requests` - List pull requests in a repository
8. `github_get_pull_request` - Get specific PR details
9. `github_create_pull_request` - Create a new PR
10. `github_merge_pull_request` - Merge a PR

### Comment Tools (4)
11. `github_create_issue_comment` - Comment on an issue
12. `github_list_issue_comments` - List issue comments
13. `github_create_pull_request_comment` - Comment on a PR
14. `github_list_pull_request_comments` - List PR comments

### User Tools (2)
15. `github_get_authenticated_user` - Get your user profile
16. `github_get_user` - Get any user's profile

## Testing Strategy

### Unit Tests
- Test service methods with mocked GitHub API responses
- Test error handling and retry logic
- Test configuration validation
- Test tool schema validation

### Integration Tests
- Test real GitHub API calls (use test token)
- Test all 16 tools end-to-end
- Test error scenarios (rate limits, invalid tokens, etc.)

### Test Files
- `test-api.mjs` - Basic API connection tests
- `test-operations.mjs` - Interactive test menu
- `demo-operations.mjs` - Automated demonstration
- `scripts/test-connection.ts` - Connection verification

## Git Workflow

### Branch Structure
- `master` - Production-ready code
- `develop` - Active development
- Feature branches - From `develop`, merge back to `develop`

### Commit Conventions
- Use clear, descriptive commit messages
- Start with verb: "Add", "Fix", "Update", "Refactor"
- Include context: what changed and why
- Co-author commits when Claude Code assists

### Before Pushing
1. Run tests: `npm test`
2. Build successfully: `npm run build`
3. Check for secrets: Ensure `.env` is not committed
4. Verify code quality: `npm run lint`

## Important Files

### Configuration
- `.env` - Local environment (NEVER commit)
- `.env.example` - Environment template
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

### Documentation
- `README.md` - User-facing documentation
- `CLAUDE.md` - This file (Claude Code context)
- `OPERATIONS.md` - Complete operations reference

### Entry Points
- `src/index.ts` - MCP server entry point
- `dist/index.js` - Compiled server (what gets executed)

## Common Issues & Solutions

### Rate Limiting
- GitHub API: 5,000 requests/hour (authenticated)
- Automatic retry with exponential backoff handles this
- Monitor logs for rate limit warnings

### Authentication Errors
- Verify `GITHUB_PAT` is set in `.env`
- Check token has required scopes
- Token must be "classic" PAT, not fine-grained

### Build Errors
- Ensure Node.js >= 20.0.0
- Delete `node_modules/` and run `npm install`
- Check TypeScript version matches package.json

### Tool Not Found
- Verify tool is registered in `src/tools/github.ts`
- Check handler exists in `handleGitHubTool()`
- Restart server after adding new tools

## Deployment Considerations

### Environment Variables
- `GITHUB_PAT` - Required (classic PAT with correct scopes)
- `GITHUB_BASE_URL` - Optional (default: https://api.github.com)
- `LOG_LEVEL` - Optional (default: info)
- `REQUEST_TIMEOUT` - Optional (default: 30000ms)
- `DEBUG` - Optional (default: false)

### Production Checklist
- [ ] Build: `npm run build`
- [ ] Test: `npm test`
- [ ] Environment variables configured
- [ ] Log level set appropriately
- [ ] Error monitoring configured
- [ ] Rate limiting considered

### Performance
- Server is stateless (can scale horizontally)
- Retry logic prevents cascading failures
- Structured logging for monitoring
- Timeout configuration prevents hanging requests

## Future Enhancements

### Potential Features
- Webhook support for real-time updates
- Caching for frequently accessed data
- Batch operations for efficiency
- GitHub Enterprise support
- Additional API endpoints (releases, commits, branches)

### Code Quality
- Increase test coverage
- Add ESLint rules
- Set up CI/CD pipeline
- Add performance monitoring
- Implement request caching

## Getting Help

### Resources
- GitHub API Docs: https://docs.github.com/en/rest
- MCP Protocol: https://modelcontextprotocol.io/
- TypeScript Docs: https://www.typescriptlang.org/docs/

### Debugging
- Enable debug mode: Set `DEBUG=true` in `.env`
- Increase log verbosity: Set `LOG_LEVEL=trace`
- Check logs for error context and stack traces
- Use test scripts to verify API connectivity

---

**Last Updated**: 2026-03-08
**Project Version**: 0.1.0
**Maintainer**: karthickrajkumarn
