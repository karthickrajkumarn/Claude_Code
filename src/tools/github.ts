import { githubService } from "../services/github/index.js";

// Repository Tools
export const githubTools = [
  {
    name: "github_list_repositories",
    description: "List repositories for the authenticated user",
    inputSchema: {
      type: "object",
      properties: {
        visibility: {
          type: "string",
          enum: ["all", "public", "private"],
          description: "Filter by visibility (default: all)",
        },
        sort: {
          type: "string",
          enum: ["created", "updated", "pushed"],
          description: "Sort by field (default: created)",
        },
      },
    },
  },
  {
    name: "github_get_repository",
    description: "Get details of a specific repository",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner (username or organization)",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
      },
      required: ["owner", "repo"],
    },
  },
  // Issue Tools
  {
    name: "github_list_issues",
    description: "List issues in a repository",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        state: {
          type: "string",
          enum: ["open", "closed", "all"],
          description: "Filter by state (default: open)",
        },
      },
      required: ["owner", "repo"],
    },
  },
  {
    name: "github_get_issue",
    description: "Get details of a specific issue",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        issue_number: {
          type: "number",
          description: "Issue number",
        },
      },
      required: ["owner", "repo", "issue_number"],
    },
  },
  {
    name: "github_create_issue",
    description: "Create a new issue in a repository",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        title: {
          type: "string",
          description: "Issue title",
        },
        body: {
          type: "string",
          description: "Issue body/description",
        },
        labels: {
          type: "array",
          items: { type: "string" },
          description: "Array of label names",
        },
        assignees: {
          type: "array",
          items: { type: "string" },
          description: "Array of usernames to assign",
        },
      },
      required: ["owner", "repo", "title"],
    },
  },
  {
    name: "github_update_issue",
    description: "Update an existing issue",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        issue_number: {
          type: "number",
          description: "Issue number",
        },
        title: {
          type: "string",
          description: "New issue title",
        },
        body: {
          type: "string",
          description: "New issue body",
        },
        state: {
          type: "string",
          enum: ["open", "closed"],
          description: "Set issue state",
        },
      },
      required: ["owner", "repo", "issue_number"],
    },
  },
  // Pull Request Tools
  {
    name: "github_list_pull_requests",
    description: "List pull requests in a repository",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        state: {
          type: "string",
          enum: ["open", "closed", "all"],
          description: "Filter by state (default: open)",
        },
      },
      required: ["owner", "repo"],
    },
  },
  {
    name: "github_get_pull_request",
    description: "Get details of a specific pull request",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        pull_number: {
          type: "number",
          description: "Pull request number",
        },
      },
      required: ["owner", "repo", "pull_number"],
    },
  },
  {
    name: "github_create_pull_request",
    description: "Create a new pull request",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        title: {
          type: "string",
          description: "Pull request title",
        },
        body: {
          type: "string",
          description: "Pull request body/description",
        },
        head: {
          type: "string",
          description: "Branch name containing changes (e.g., 'feature-branch')",
        },
        base: {
          type: "string",
          description: "Branch name to merge into (e.g., 'main')",
        },
      },
      required: ["owner", "repo", "title", "head", "base"],
    },
  },
  {
    name: "github_merge_pull_request",
    description: "Merge a pull request",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        pull_number: {
          type: "number",
          description: "Pull request number",
        },
        commit_title: {
          type: "string",
          description: "Title for the merge commit",
        },
        commit_message: {
          type: "string",
          description: "Message for the merge commit",
        },
      },
      required: ["owner", "repo", "pull_number"],
    },
  },
  // Comment Tools
  {
    name: "github_create_issue_comment",
    description: "Create a comment on an issue",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        issue_number: {
          type: "number",
          description: "Issue number",
        },
        body: {
          type: "string",
          description: "Comment text",
        },
      },
      required: ["owner", "repo", "issue_number", "body"],
    },
  },
  {
    name: "github_list_issue_comments",
    description: "List comments on an issue",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        issue_number: {
          type: "number",
          description: "Issue number",
        },
      },
      required: ["owner", "repo", "issue_number"],
    },
  },
  {
    name: "github_create_pull_request_comment",
    description: "Create a comment on a pull request",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        pull_number: {
          type: "number",
          description: "Pull request number",
        },
        body: {
          type: "string",
          description: "Comment text",
        },
      },
      required: ["owner", "repo", "pull_number", "body"],
    },
  },
  {
    name: "github_list_pull_request_comments",
    description: "List comments on a pull request",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        pull_number: {
          type: "number",
          description: "Pull request number",
        },
      },
      required: ["owner", "repo", "pull_number"],
    },
  },
  // User Tools
  {
    name: "github_get_authenticated_user",
    description: "Get information about the authenticated user",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "github_get_user",
    description: "Get information about a specific user",
    inputSchema: {
      type: "object",
      properties: {
        username: {
          type: "string",
          description: "GitHub username",
        },
      },
      required: ["username"],
    },
  },
];

export async function handleGitHubTool(name: string, args: Record<string, unknown>) {
  let result: any;

  switch (name) {
    // Repository handlers
    case "github_list_repositories":
      result = await githubService.listRepositories({
        visibility: args.visibility as "all" | "public" | "private" | undefined,
        sort: args.sort as "created" | "updated" | "pushed" | undefined,
      });
      break;

    case "github_get_repository":
      result = await githubService.getRepository({
        owner: args.owner as string,
        repo: args.repo as string,
      });
      break;

    // Issue handlers
    case "github_list_issues":
      result = await githubService.listIssues({
        owner: args.owner as string,
        repo: args.repo as string,
        state: args.state as "open" | "closed" | "all" | undefined,
      });
      break;

    case "github_get_issue":
      result = await githubService.getIssue({
        owner: args.owner as string,
        repo: args.repo as string,
        issue_number: args.issue_number as number,
      });
      break;

    case "github_create_issue":
      result = await githubService.createIssue({
        owner: args.owner as string,
        repo: args.repo as string,
        title: args.title as string,
        body: args.body as string | undefined,
        labels: args.labels as string[] | undefined,
        assignees: args.assignees as string[] | undefined,
      });
      break;

    case "github_update_issue":
      result = await githubService.updateIssue({
        owner: args.owner as string,
        repo: args.repo as string,
        issue_number: args.issue_number as number,
        title: args.title as string | undefined,
        body: args.body as string | undefined,
        state: args.state as "open" | "closed" | undefined,
      });
      break;

    // Pull Request handlers
    case "github_list_pull_requests":
      result = await githubService.listPullRequests({
        owner: args.owner as string,
        repo: args.repo as string,
        state: args.state as "open" | "closed" | "all" | undefined,
      });
      break;

    case "github_get_pull_request":
      result = await githubService.getPullRequest({
        owner: args.owner as string,
        repo: args.repo as string,
        pull_number: args.pull_number as number,
      });
      break;

    case "github_create_pull_request":
      result = await githubService.createPullRequest({
        owner: args.owner as string,
        repo: args.repo as string,
        title: args.title as string,
        body: args.body as string | undefined,
        head: args.head as string,
        base: args.base as string,
      });
      break;

    case "github_merge_pull_request":
      result = await githubService.mergePullRequest({
        owner: args.owner as string,
        repo: args.repo as string,
        pull_number: args.pull_number as number,
        commit_title: args.commit_title as string | undefined,
        commit_message: args.commit_message as string | undefined,
      });
      break;

    // Comment handlers
    case "github_create_issue_comment":
      result = await githubService.createIssueComment({
        owner: args.owner as string,
        repo: args.repo as string,
        issue_number: args.issue_number as number,
        body: args.body as string,
      });
      break;

    case "github_list_issue_comments":
      result = await githubService.listIssueComments({
        owner: args.owner as string,
        repo: args.repo as string,
        issue_number: args.issue_number as number,
      });
      break;

    case "github_create_pull_request_comment":
      result = await githubService.createPullRequestComment({
        owner: args.owner as string,
        repo: args.repo as string,
        pull_number: args.pull_number as number,
        body: args.body as string,
      });
      break;

    case "github_list_pull_request_comments":
      result = await githubService.listPullRequestComments({
        owner: args.owner as string,
        repo: args.repo as string,
        pull_number: args.pull_number as number,
      });
      break;

    // User handlers
    case "github_get_authenticated_user":
      result = await githubService.getAuthenticatedUser();
      break;

    case "github_get_user":
      result = await githubService.getUser({
        username: args.username as string,
      });
      break;

    default:
      throw new Error(`Unknown GitHub tool: ${name}`);
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}
