# Projects in Claude Code Repository

This document provides detailed information about all projects in this repository.

## 📋 Project List

### 1. GitHub MCP Server

**Status**: ✅ Active | **Version**: 0.1.0 | **Last Updated**: March 2026

#### Overview
A comprehensive Model Context Protocol server that enables AI assistants to interact with GitHub's API through a standardized interface.

#### Description
The GitHub MCP Server acts as a bridge between AI assistants (like Claude) and GitHub, allowing seamless automation of GitHub operations including repository management, issue tracking, pull request handling, and user management.

#### Key Features
- **16 GitHub Tools**: Complete coverage of GitHub API operations
- **Type-Safe**: Full TypeScript implementation with strict type checking
- **Reliable**: Automatic retry logic with exponential backoff for rate limits
- **Secure**: Environment-based configuration for token management
- **Well-Documented**: Comprehensive documentation and examples

#### Available Tools
1. **Repository Tools** (2)
   - List repositories
   - Get repository details

2. **Issue Tools** (4)
   - List issues
   - Get issue details
   - Create issues
   - Update issues

3. **Pull Request Tools** (4)
   - List pull requests
   - Get PR details
   - Create pull requests
   - Merge pull requests

4. **Comment Tools** (4)
   - Create/list issue comments
   - Create/list PR comments

5. **User Tools** (2)
   - Get authenticated user
   - Get any user profile

#### Technology Stack
- TypeScript 5.7
- Node.js (>=20.0.0)
- @modelcontextprotocol/sdk 1.0.4
- Axios 1.7.9
- Pino 9.6.0 (logging)
- Zod 3.24.1 (validation)

#### Project Structure
```
github-mcp/
├── src/
│   ├── auth/              # Authentication headers
│   ├── client/            # HTTP client with retry
│   ├── services/          # GitHub API service
│   ├── tools/             # MCP tool definitions
│   ├── types/             # TypeScript types
│   ├── utils/             # Utilities
│   ├── config.ts          # Configuration
│   └── index.ts           # Entry point
├── dist/                  # Compiled JavaScript
├── scripts/               # Test scripts
├── README.md              # User documentation
├── OPERATIONS.md          # Operations reference
├── CLAUDE.md              # Development context
└── package.json           # Dependencies
```

#### Quick Start
```bash
# Clone repository
git clone https://github.com/karthickrajkumarn/Claude_Code.git
cd Claude_Code/github-mcp

# Install dependencies
npm install

# Build project
npm run build

# Configure environment
cp .env.example .env
# Add your GitHub token to .env

# Start server
npm start

# Run tests
node demo-operations.mjs
```

#### Configuration
Required environment variables:
- `GITHUB_PAT` - GitHub Personal Access Token (classic)
  - Required scopes: `repo`, `read:org`, `read:user`, `user:email`

Optional variables:
- `GITHUB_BASE_URL` - GitHub API URL (default: https://api.github.com)
- `LOG_LEVEL` - Logging level (default: info)
- `REQUEST_TIMEOUT` - Request timeout in ms (default: 30000)

#### Documentation
- [User Guide](./github-mcp/README.md) - Getting started guide
- [Operations Reference](./github-mcp/OPERATIONS.md) - All available tools
- [Development Guide](./github-mcp/CLAUDE.md) - For developers

#### Use Cases
- **Automated Issue Management**: Create, update, and close issues programmatically
- **PR Automation**: Create PRs, manage reviews, merge code
- **Repository Monitoring**: Track issues, PRs, and activity
- **User Analytics**: Analyze GitHub data and patterns
- **CI/CD Integration**: Automate GitHub workflows in pipelines

#### Future Enhancements
- Webhook support for real-time updates
- Caching layer for performance
- Batch operations for efficiency
- GitHub Enterprise support
- Additional API endpoints (releases, commits, branches)

#### Contributing
Contributions are welcome! Please read the development guide first.

#### License
MIT License - See LICENSE file in project directory

---

## 🚀 Adding New Projects

When adding a new project to this repository, please:

1. **Create a new subfolder**: `project-name/`
2. **Add project documentation**: README.md in the project folder
3. **Update this file**: Add project details to PROJECTS.md
4. **Update main README**: Add brief description to root README.md
5. **Follow conventions**: Use similar structure and documentation style

### Project Template
```
new-project/
├── src/                  # Source code
├── dist/                 # Compiled output (if applicable)
├── tests/                # Test files
├── README.md             # Project documentation
├── package.json          # Dependencies (if Node.js)
└── .env.example          # Environment template (if needed)
```

---

## 📊 Project Statistics

- **Total Projects**: 1
- **Active Projects**: 1
- **Languages**: TypeScript, JavaScript
- **Main Technologies**: MCP, Node.js, GitHub API

---

**Last Updated**: March 8, 2026
**Repository Maintainer**: Karthick Rajkumar
