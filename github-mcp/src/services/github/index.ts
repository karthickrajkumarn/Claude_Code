import axios, { AxiosInstance } from "axios";
import { BaseService } from "../base.js";
import { httpClient } from "../../client/http-client.js";
import { getGitHubAuthHeader } from "../../auth/auth-header.js";
import { config } from "../../config.js";
import type {
  Repository,
  Issue,
  CreateIssueOptions,
  PullRequest,
  CreatePullRequestOptions,
  User,
  Comment,
} from "../../types/github.js";

export class GitHubService extends BaseService {
  client: AxiosInstance;

  constructor() {
    const githubClient = axios.create({
      ...httpClient.defaults,
      headers: {
        ...httpClient.defaults.headers,
        Authorization: getGitHubAuthHeader(),
      },
    });
    super(githubClient, config.GITHUB_BASE_URL, "github-mcp");
    this.client = githubClient;
  }

  // Repository methods
  async listRepositories(options: { visibility?: "all" | "public" | "private"; sort?: "created" | "updated" | "pushed" } = {}): Promise<Repository[]> {
    const params: Record<string, string> = {};
    if (options.visibility) params.visibility = options.visibility;
    if (options.sort) params.sort = options.sort;

    const url = this.buildUrl("/user/repos", params);
    this.logger.debug({ options }, "Listing user repositories");

    const response = await this.handleRequest(() => this.client.get<Repository[]>(url));
    return response.data;
  }

  async getRepository(options: { owner: string; repo: string }): Promise<Repository> {
    const url = this.buildUrl(`/repos/${options.owner}/${options.repo}`);
    this.logger.debug({ options }, "Getting repository");

    const response = await this.handleRequest(() => this.client.get<Repository>(url));
    return response.data;
  }

  // Issue methods
  async listIssues(options: { owner: string; repo: string; state?: "open" | "closed" | "all" }): Promise<Issue[]> {
    const params: Record<string, string> = { state: options.state || "open" };
    const url = this.buildUrl(`/repos/${options.owner}/${options.repo}/issues`, params);
    this.logger.debug({ options }, "Listing issues");

    const response = await this.handleRequest(() => this.client.get<Issue[]>(url));
    return response.data;
  }

  async getIssue(options: { owner: string; repo: string; issue_number: number }): Promise<Issue> {
    const url = this.buildUrl(`/repos/${options.owner}/${options.repo}/issues/${options.issue_number}`);
    this.logger.debug({ options }, "Getting issue");

    const response = await this.handleRequest(() => this.client.get<Issue>(url));
    return response.data;
  }

  async createIssue(options: CreateIssueOptions): Promise<Issue> {
    const url = this.buildUrl(`/repos/${options.owner}/${options.repo}/issues`);
    this.logger.debug({ options }, "Creating issue");

    const response = await this.handleRequest(() =>
      this.client.post<Issue>(url, {
        title: options.title,
        body: options.body,
        labels: options.labels,
        assignees: options.assignees,
      })
    );
    return response.data;
  }

  async updateIssue(options: { owner: string; repo: string; issue_number: number; title?: string; body?: string; state?: "open" | "closed" }): Promise<Issue> {
    const url = this.buildUrl(`/repos/${options.owner}/${options.repo}/issues/${options.issue_number}`);
    this.logger.debug({ options }, "Updating issue");

    const data: any = {};
    if (options.title) data.title = options.title;
    if (options.body) data.body = options.body;
    if (options.state) data.state = options.state;

    const response = await this.handleRequest(() => this.client.patch<Issue>(url, data));
    return response.data;
  }

  // Pull Request methods
  async listPullRequests(options: { owner: string; repo: string; state?: "open" | "closed" | "all" }): Promise<PullRequest[]> {
    const params: Record<string, string> = { state: options.state || "open" };
    const url = this.buildUrl(`/repos/${options.owner}/${options.repo}/pulls`, params);
    this.logger.debug({ options }, "Listing pull requests");

    const response = await this.handleRequest(() => this.client.get<PullRequest[]>(url));
    return response.data;
  }

  async getPullRequest(options: { owner: string; repo: string; pull_number: number }): Promise<PullRequest> {
    const url = this.buildUrl(`/repos/${options.owner}/${options.repo}/pulls/${options.pull_number}`);
    this.logger.debug({ options }, "Getting pull request");

    const response = await this.handleRequest(() => this.client.get<PullRequest>(url));
    return response.data;
  }

  async createPullRequest(options: CreatePullRequestOptions): Promise<PullRequest> {
    const url = this.buildUrl(`/repos/${options.owner}/${options.repo}/pulls`);
    this.logger.debug({ options }, "Creating pull request");

    const response = await this.handleRequest(() =>
      this.client.post<PullRequest>(url, {
        title: options.title,
        body: options.body,
        head: options.head,
        base: options.base,
      })
    );
    return response.data;
  }

  async mergePullRequest(options: { owner: string; repo: string; pull_number: number; commit_title?: string; commit_message?: string }): Promise<any> {
    const url = this.buildUrl(`/repos/${options.owner}/${options.repo}/pulls/${options.pull_number}/merge`);
    this.logger.debug({ options }, "Merging pull request");

    const data: any = {};
    if (options.commit_title) data.commit_title = options.commit_title;
    if (options.commit_message) data.commit_message = options.commit_message;

    const response = await this.handleRequest(() => this.client.put(url, data));
    return response.data;
  }

  // Comment methods
  async createIssueComment(options: { owner: string; repo: string; issue_number: number; body: string }): Promise<Comment> {
    const url = this.buildUrl(`/repos/${options.owner}/${options.repo}/issues/${options.issue_number}/comments`);
    this.logger.debug({ options }, "Creating issue comment");

    const response = await this.handleRequest(() =>
      this.client.post<Comment>(url, {
        body: options.body,
      })
    );
    return response.data;
  }

  async listIssueComments(options: { owner: string; repo: string; issue_number: number }): Promise<Comment[]> {
    const url = this.buildUrl(`/repos/${options.owner}/${options.repo}/issues/${options.issue_number}/comments`);
    this.logger.debug({ options }, "Listing issue comments");

    const response = await this.handleRequest(() => this.client.get<Comment[]>(url));
    return response.data;
  }

  async createPullRequestComment(options: { owner: string; repo: string; pull_number: number; body: string }): Promise<Comment> {
    const url = this.buildUrl(`/repos/${options.owner}/${options.repo}/pulls/${options.pull_number}/comments`);
    this.logger.debug({ options }, "Creating pull request comment");

    const response = await this.handleRequest(() =>
      this.client.post<Comment>(url, {
        body: options.body,
      })
    );
    return response.data;
  }

  async listPullRequestComments(options: { owner: string; repo: string; pull_number: number }): Promise<Comment[]> {
    const url = this.buildUrl(`/repos/${options.owner}/${options.repo}/pulls/${options.pull_number}/comments`);
    this.logger.debug({ options }, "Listing pull request comments");

    const response = await this.handleRequest(() => this.client.get<Comment[]>(url));
    return response.data;
  }

  // User methods
  async getAuthenticatedUser(): Promise<User> {
    const url = this.buildUrl("/user");
    this.logger.debug("Getting authenticated user");

    const response = await this.handleRequest(() => this.client.get<User>(url));
    return response.data;
  }

  async getUser(options: { username: string }): Promise<User> {
    const url = this.buildUrl(`/users/${options.username}`);
    this.logger.debug({ options }, "Getting user");

    const response = await this.handleRequest(() => this.client.get<User>(url));
    return response.data;
  }
}

export const githubService = new GitHubService();
