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

### 2. Weather MCP Server

**Status**: ✅ Active | **Version**: 0.1.0 | **Last Updated**: March 2026

#### Overview
A Model Context Protocol server that provides weather information tools including current weather, forecasts, and location search using the OpenWeatherMap API.

#### Description
The Weather MCP Server enables AI assistants to provide accurate weather information for any location worldwide. It offers current conditions, multi-day forecasts, and location search capabilities.

#### Key Features
- **3 Weather Tools**: Current weather, forecasts, and location search
- **Global Coverage**: Weather data for any location worldwide
- **Free API**: Uses OpenWeatherMap free tier (1,000 calls/day)
- **Type-Safe**: Full TypeScript implementation
- **Reliable**: Built-in error handling and API validation

#### Available Tools
1. **Current Weather** (1 tool)
   - Get real-time weather conditions for any location
   - Temperature, humidity, wind, visibility, and more

2. **Weather Forecast** (1 tool)
   - Get up to 5-day weather forecasts
   - Daily min/max temperatures and conditions

3. **Location Search** (1 tool)
   - Search for locations by name
   - Get coordinates and location details

#### Technology Stack
- TypeScript 5.7
- Node.js (>=20.0.0)
- @modelcontextprotocol/sdk 1.0.4
- Axios 1.7.9
- Pino 9.6.0 (logging)
- Zod 3.24.1 (validation)
- OpenWeatherMap API

#### Project Structure
```
weather-mcp/
├── src/
│   ├── services/         # Weather API service
│   ├── tools/            # MCP tool definitions
│   ├── types/            # TypeScript types
│   ├── utils/            # Utilities
│   ├── config.ts         # Configuration
│   ├── index.ts          # Entry point
│   └── demo-weather.ts   # Demo script
├── dist/                 # Compiled JavaScript
├── README.md             # User documentation
└── package.json          # Dependencies
```

#### Quick Start
```bash
# Clone repository
git clone https://github.com/karthickrajkumarn/Claude_Code.git
cd Claude_Code/weather-mcp

# Install dependencies
npm install

# Build project
npm run build

# Configure environment
cp .env.example .env
# Add your OpenWeatherMap API key to .env

# Start server
npm start

# Run demo
npm test
```

#### Configuration
Required environment variables:
- `WEATHER_API_KEY` - OpenWeatherMap API key (free)
  - Get your key at: https://openweathermap.org/api

Optional variables:
- `WEATHER_API_BASE_URL` - API base URL (default: OpenWeatherMap)
- `DEFAULT_UNITS` - Temperature units: metric/imperial/kelvin (default: metric)
- `DEFAULT_LANGUAGE` - Weather description language (default: en)
- `LOG_LEVEL` - Logging level (default: info)
- `REQUEST_TIMEOUT` - Request timeout in ms (default: 30000)

#### Documentation
- [User Guide](./weather-mcp/README.md) - Getting started guide
- [OpenWeatherMap API](https://openweathermap.org/api) - API documentation

#### Use Cases
- **Weather Assistance**: Provide real-time weather information
- **Planning**: Help with travel and event planning
- **Comparisons**: Compare weather across multiple locations
- **Forecasts**: Get multi-day weather predictions

#### Future Enhancements
- Weather alerts and warnings
- Historical weather data
- Air quality information
- UV index and pollen data
- Weather maps and imagery

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

- **Total Projects**: 2
- **Active Projects**: 2
- **Languages**: TypeScript, JavaScript
- **Main Technologies**: MCP, Node.js, GitHub API, OpenWeatherMap API

---

**Last Updated**: March 11, 2026
**Repository Maintainer**: Karthick Rajkumar
