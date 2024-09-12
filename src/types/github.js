export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  created_at: string;
  stargazers_count: number;
  language: string;
}

export interface SearchParams {
  language: string;
  dateRange: { start: string | null; end: string | null };
  minStars: number;
}

export interface SearchState {
  selectedLanguages: string[];
  dateRange: { start: string | null; end: string | null };
  minStars: number;
  repositories: Record<string, Repository[]>;
  isLoading: boolean;
  error: string | null;
}