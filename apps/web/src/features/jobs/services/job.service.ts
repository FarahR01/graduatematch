import { api } from '@/lib/api-client';
import type { Job, MatchScore, PaginatedResponse } from '@/types';

interface GetJobsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  location?: string;
  remote?: boolean;
  experienceLevel?: string;
  skills?: string[];
}

/**
 * Fetch paginated job listings
 */
export async function getJobs(
  params: GetJobsParams = {}
): Promise<PaginatedResponse<Job>> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set('page', params.page.toString());
  if (params.pageSize) searchParams.set('pageSize', params.pageSize.toString());
  if (params.search) searchParams.set('search', params.search);
  if (params.location) searchParams.set('location', params.location);
  if (params.remote !== undefined) searchParams.set('remote', params.remote.toString());
  if (params.experienceLevel) searchParams.set('experienceLevel', params.experienceLevel);
  if (params.skills?.length) {
    params.skills.forEach((skill) => searchParams.append('skills', skill));
  }

  const query = searchParams.toString();
  const endpoint = query ? `/jobs?${query}` : '/jobs';

  return api.get<PaginatedResponse<Job>>(endpoint);
}

/**
 * Fetch single job by ID
 */
export async function getJobById(id: string): Promise<Job> {
  return api.get<Job>(`/jobs/${id}`);
}

/**
 * Get match score for a specific job
 */
export async function getJobMatchScore(jobId: string): Promise<MatchScore> {
  return api.get<MatchScore>(`/jobs/${jobId}/match-score`);
}

/**
 * Get personalized job recommendations
 */
export async function getJobRecommendations(
  limit: number = 10
): Promise<Array<Job & { matchScore: number }>> {
  return api.get(`/jobs/recommendations?limit=${limit}`);
}
