import React from 'react'

// Repository types
export interface Repository {
  id: string
  full_name: string
  name: string
  description: string | null
  language: string | null
  classification: string
  private: boolean
  html_url: string
  git_url: string
  clone_url: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
  license: License | null
  owner: Owner
  created_at: string
  updated_at: string
  pushed_at: string
  analysis_date: string
}

export interface License {
  key: string
  name: string
  spdx_id: string
  url: string
  node_id: string
}

export interface Owner {
  login: string
  id: number
  avatar_url: string
  html_url: string
  type: string
  site_admin: boolean
}

// Contributor types
export interface Contributor {
  id: string
  repository_id: string
  github_id: number
  login: string
  name: string | null
  email: string | null
  bio: string | null
  location: string | null
  company: string | null
  blog: string | null
  twitter_username: string | null
  hireable: boolean | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  contributions: number
  created_at: string | null
  updated_at: string | null
  analysis_date: string
  roles: ContributorRoles
  skills: ContributorSkill[]
}

export interface ContributorRoles {
  code: number
  docs: number
  test: number
}

export interface ContributorSkill {
  id: string
  contributor_id: string
  skill_name: string
  skill_category: string | null
  confidence_score: number | null
  evidence: string | null
  created_at: string
}

// Candidate types
export interface CandidateProfile {
  id: string
  github_id: number
  login: string
  name: string | null
  email: string | null
  bio: string | null
  location: string | null
  company: string | null
  blog: string | null
  twitter_username: string | null
  hireable: boolean | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  total_contributions: number
  repositories_contributed: number
  primary_classifications: string[]
  top_skills: CandidateSkill[]
  expertise_score: number | null
  last_updated: string
}

export interface CandidateSkill {
  name: string
  category: string
  confidence: number
  repositories: string[]
}

// Analysis types
export interface AnalysisSession {
  id: string
  session_name: string
  analysis_type: 'repository' | 'organization' | 'user'
  target: string
  status: 'running' | 'completed' | 'failed'
  started_at: string
  completed_at: string | null
  repositories_analyzed: number
  contributors_found: number
  errors: string | null
  config_used: Record<string, any> | null
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  total_pages: number
}

// Form types
export interface AnalysisFormData {
  repositories: string[]
  use_nlp: boolean
  classify_roles: boolean
  output_formats: string[]
}

export interface SearchFilters {
  location?: string
  company?: string
  classification?: string
  min_contributions?: number
  min_followers?: number
  skills?: string[]
}

// Chart types
export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface TimeSeriesData {
  date: string
  value: number
}

// UI types
export interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
}

export interface TableColumn<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
} 