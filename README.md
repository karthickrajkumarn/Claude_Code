# Claude Code Projects

Welcome to my personal development repository! This repository contains various projects I'm working on, primarily focused on AI, automation, and developer tools.

## 🚀 Projects

### 1. GitHub MCP Server
**Location**: [`github-mcp/`](./github-mcp/)

A Model Context Protocol (MCP) server that provides seamless integration between AI assistants and GitHub's API.

**Features**:
- 16 GitHub tools for repositories, issues, pull requests, and comments
- TypeScript implementation with full type safety
- Automatic retry logic with exponential backoff
- Structured logging and error handling

**Quick Start**:
```bash
cd github-mcp
npm install
npm run build
cp .env.example .env
# Add your GitHub token to .env
npm start
```

**Documentation**:
- [README](./github-mcp/README.md) - User documentation
- [OPERATIONS](./github-mcp/OPERATIONS.md) - Complete operations reference
- [CLAUDE](./github-mcp/CLAUDE.md) - Development context

### 2. Weather MCP Server
**Location**: [`weather-mcp/`](./weather-mcp/)

A Model Context Protocol (MCP) server that provides weather information tools using the OpenWeatherMap API.

**Features**:
- 3 weather tools: current weather, forecasts, and location search
- Global coverage with accurate weather data
- Free API tier (1,000 calls/day)
- TypeScript implementation with full type safety

**Quick Start**:
```bash
cd weather-mcp
npm install
npm run build
cp .env.example .env
# Add your OpenWeatherMap API key to .env
npm start
```

**Documentation**:
- [README](./weather-mcp/README.md) - User documentation
- [OpenWeatherMap API](https://openweathermap.org/api) - API documentation

## 🛠️ Technology Stack

- **TypeScript** - Type-safe development
- **Node.js** - Runtime environment
- **Model Context Protocol** - AI integration standard
- **GitHub API** - Platform integration
- **OpenWeatherMap API** - Weather data

## 📁 Repository Structure

```
claude-code/
├── github-mcp/          # GitHub MCP Server
├── weather-mcp/         # Weather MCP Server
├── PROJECTS.md          # Detailed project information
├── CONTRIBUTING.md      # Contribution guidelines
└── README.md            # This file
```

## 📈 Project Statistics

- **Total Projects**: 2
- **Active Projects**: 2
- **Languages**: TypeScript, JavaScript
- **Main Technologies**: MCP, Node.js, GitHub API, OpenWeatherMap API

## 📝 License

Each project may have its own license. Please check the individual project directories for specific licensing information.

## 👨‍💻 Author

**Karthick Rajkumar**
- GitHub: [@karthickrajkumarn](https://github.com/karthickrajkumarn)

---

**Note**: This is a personal repository for learning and development. Projects here are maintained as part of my journey in software development and AI integration.
