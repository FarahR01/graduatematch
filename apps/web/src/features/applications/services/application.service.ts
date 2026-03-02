import { api } from '@/lib/api-client';
import type { Application, PaginatedResponse } from '@/types';

interface GetApplicationsParams {
  page?: number;
  pageSize?: number;
  status?: string;
}

/**
 * Fetch graduate's applications
 */
export async function getApplications(
  params: GetApplicationsParams = {}
): Promise<PaginatedResponse<Application>> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set('page', params.page.toString());
  if (params.pageSize) searchParams.set('pageSize', params.pageSize.toString());
  if (params.status) searchParams.set('status', params.status);

  const query = searchParams.toString();
  const endpoint = query ? `/applications?${query}` : '/applications';

  return api.get<PaginatedResponse<Application>>(endpoint);
}

/**
 * Fetch single application by ID
 */
export async function getApplicationById(id: string): Promise<Application> {
  return api.get<Application>(`/applications/${id}`);
}

/**
 * Get application statistics
 */
export async function getApplicationStats(): Promise<{
  total: number;
  reviewed: number;
  interviews: number;
  offers: number;
  rejections: number;
  interviewRate: number;
  offerRate: number;
}> {
  return api.get('/applications/stats');
}
