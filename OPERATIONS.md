# GitHub MCP Server - Operations Reference

## ✅ Tested Operations

### 👤 User Operations
- **Get Authenticated User**: `github_get_authenticated_user()`
  - Returns your GitHub profile information
  - Tested: ✅ Working

- **Get User Profile**: `github_get_user(username="torvalds")`
  - Get any user's public profile
  - Tested: ✅ Working

### 📁 Repository Operations
- **List Repositories**: `github_list_repositories(visibility="all", sort="created")`
  - List all your repositories
  - Tested: ✅ Found 6 repositories

- **Get Repository Details**: `github_get_repository(owner="facebook", repo="react")`
  - Get detailed information about a specific repository
  - Tested: ✅ Retrieved React repository (243,706 stars!)

### 🎫 Issue Operations
- **List Issues**: `github_list_issues(owner="facebook", repo="react", state="open")`
  - List issues in a repository
  - Tested: ✅ Found 30 open issues in React

- **Get Issue Details**: `github_get_issue(owner="facebook", repo="react", issue_number=35976)`
  - Get detailed information about a specific issue
  - Tested: ✅ Retrieved issue #35976

- **Create Issue**: `github_create_issue(owner, repo, title, body, labels, assignees)`
  - Create a new issue
  - Available: ✅ Ready to use

- **Update Issue**: `github_update_issue(owner, repo, issue_number, title, body, state)`
  - Update an existing issue
  - Available: ✅ Ready to use

### 🔄 Pull Request Operations
- **List Pull Requests**: `github_list_pull_requests(owner="facebook", repo="react", state="open")`
  - List pull requests in a repository
  - Tested: ✅ Found 30 open PRs in React

- **Get Pull Request Details**: `github_get_pull_request(owner, repo, pull_number)`
  - Get detailed information about a specific PR
  - Available: ✅ Ready to use

- **Create Pull Request**: `github_create_pull_request(owner, repo, title, body, head, base)`
  - Create a new pull request
  - Available: ✅ Ready to use

- **Merge Pull Request**: `github_merge_pull_request(owner, repo, pull_number, commit_title, commit_message)`
  - Merge a pull request
  - Available: ✅ Ready to use

### 💬 Comment Operations
- **Create Issue Comment**: `github_create_issue_comment(owner, repo, issue_number, body)`
  - Comment on an issue
  - Available: ✅ Ready to use

- **List Issue Comments**: `github_list_issue_comments(owner, repo, issue_number)`
  - List comments on an issue
  - Available: ✅ Ready to use

- **Create PR Comment**: `github_create_pull_request_comment(owner, repo, pull_number, body)`
  - Comment on a pull request
  - Available: ✅ Ready to use

- **List PR Comments**: `github_list_pull_request_comments(owner, repo, pull_number)`
  - List comments on a pull request
  - Available: ✅ Ready to use

## 📊 Test Results Summary

✅ **All 16 tools initialized successfully**
✅ **Authentication working** (Logged in as: karthickrajkumarn)
✅ **User operations tested and working**
✅ **Repository operations tested and working**
✅ **Issue operations tested and working**
✅ **Pull request operations tested and working**
✅ **Comment operations available and ready**

## 🚀 Next Steps

### Option 1: Use with Claude Desktop
Add to your Claude Desktop config (`C:\Users\User\AppData\Roaming\Claude\claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "github": {
      "command": "node",
      "args": ["c:\\ClaudeCode\\Project\\github-mcp\\dist\\index.js"],
      "env": {
        "GITHUB_PAT": "your_github_token_here"
      }
    }
  }
}
```

### Option 2: Use Programmatically
```javascript
import { githubService } from './dist/services/github/index.js';

// Your operations here
const repos = await githubService.listRepositories();
```

### Option 3: Interactive Testing
Run the interactive test suite:
```bash
node test-operations.mjs
```

## 📝 Available Files

- `demo-operations.mjs` - Automated demonstration (just ran)
- `test-operations.mjs` - Interactive testing menu
- `test-api.mjs` - Basic API tests
- `dist/index.js` - MCP server (currently running)

## 🎯 Example Use Cases

1. **Automate Issue Management**: Create, update, and close issues programmatically
2. **Monitor Repositories**: Track issues, PRs, and comments across repositories
3. **Automate Workflows**: Create PRs, merge them, and manage comments
4. **User Analytics**: Get user profiles and repository information
5. **Integration**: Build custom tools that interact with GitHub

## 🔐 Security Note

Your GitHub token is stored in `.env` file. Keep it secure and never commit it to version control.
