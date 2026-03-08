# GitHub MCP Server

A Model Context Protocol (MCP) server for GitHub that provides tools to interact with repositories, issues, pull requests, and more.

## Features

- **Repository Management**: List and get repository details
- **Issue Tracking**: Create, read, update issues and comments
- **Pull Request Management**: Create, read, merge PRs and comments
- **User Information**: Get authenticated user and user profiles
- **Auto-retry**: Built-in retry logic with exponential backoff
- **Type-safe**: Full TypeScript support

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` and add your GitHub Personal Access Token:

```env
GITHUB_PAT=your_actual_token_here
```

### Creating a GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Select the following scopes:
   - `repo` - Full control of private repositories
   - `read:org` - Read org and team membership
   - `read:user` - Read user profile data
   - `user:email` - Read user email addresses
4. Generate and copy the token
5. Paste it into your `.env` file

## Building

```bash
npm run build
```

## Testing Connection

```bash
npm run test-connection
```

This will:
- Get your authenticated user profile
- List your repositories
- Fetch a public repository to verify API access

## Running the Server

```bash
npm start
```

## Available Tools

### Repository Tools
- `github_list_repositories` - List your repositories
- `github_get_repository` - Get details of a specific repository

### Issue Tools
- `github_list_issues` - List issues in a repository
- `github_get_issue` - Get details of a specific issue
- `github_create_issue` - Create a new issue
- `github_update_issue` - Update an existing issue

### Pull Request Tools
- `github_list_pull_requests` - List pull requests
- `github_get_pull_request` - Get details of a specific PR
- `github_create_pull_request` - Create a new PR
- `github_merge_pull_request` - Merge a PR

### Comment Tools
- `github_create_issue_comment` - Comment on an issue
- `github_list_issue_comments` - List issue comments
- `github_create_pull_request_comment` - Comment on a PR
- `github_list_pull_request_comments` - List PR comments

### User Tools
- `github_get_authenticated_user` - Get your user profile
- `github_get_user` - Get any user's profile

## Usage with Claude Code

Add to your Claude Code MCP configuration:

```json
{
  "mcpServers": {
    "github": {
      "command": "node",
      "args": ["/path/to/github-mcp/dist/index.js"],
      "env": {
        "GITHUB_PAT": "your_token_here"
      }
    }
  }
}
```

## Development

### Watch mode for development
```bash
npm run dev
```

### Run tests
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

## Architecture

- **src/config.ts** - Environment configuration with Zod validation
- **src/services/github/index.ts** - GitHub API client (singleton)
- **src/tools/github.ts** - Tool definitions and handlers
- **src/index.ts** - MCP server entry point

## Error Handling

The server includes:
- Automatic retry with exponential backoff for rate limits (403) and server errors (5xx)
- Structured logging with Pino
- Type-safe API responses

## License

MIT
