// Repository types
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  description: string | null;
  url: string;
  html_url: string;
  language: string | null;
  default_branch: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    id: number;
    type: string;
  };
}

// Issue types
export interface Issue {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: "open" | "closed" | "all";
  user: {
    login: string;
    id: number;
  };
  labels: Array<{
    id: number;
    name: string;
    color: string;
  }>;
  assignees: Array<{
    login: string;
    id: number;
  }>;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  html_url: string;
}

export interface CreateIssueOptions {
  owner: string;
  repo: string;
  title: string;
  body?: string;
  labels?: string[];
  assignees?: string[];
}

// Pull Request types
export interface PullRequest {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: "open" | "closed";
  user: {
    login: string;
    id: number;
  };
  head: {
    label: string;
    ref: string;
    sha: string;
    repo: Repository;
  };
  base: {
    label: string;
    ref: string;
    sha: string;
    repo: Repository;
  };
  created_at: string;
  updated_at: string;
  merged_at: string | null;
  html_url: string;
}

export interface CreatePullRequestOptions {
  owner: string;
  repo: string;
  title: string;
  body?: string;
  head: string;
  base: string;
}

// User types
export interface User {
  login: string;
  id: number;
  type: string;
  name: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

// Comment types
export interface Comment {
  id: number;
  body: string;
  user: {
    login: string;
    id: number;
  };
  created_at: string;
  updated_at: string;
  html_url: string;
}
