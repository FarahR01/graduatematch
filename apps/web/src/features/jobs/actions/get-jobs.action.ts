'use server';

import { api } from '@/lib/api-client';
import type { Job, PaginatedResponse } from '@/types';
import { revalidatePath } from 'next/cache';

interface GetJobsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  location?: string;
  remote?: boolean;
}

/**
 * Server action to fetch jobs
 * Uses server-side caching
 */
export async function getJobsAction(params: GetJobsParams = {}): Promise<PaginatedResponse<Job>> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set('page', params.page.toString());
  if (params.pageSize) searchParams.set('pageSize', params.pageSize.toString());
  if (params.search) searchParams.set('search', params.search);
  if (params.location) searchParams.set('location', params.location);
  if (params.remote !== undefined) searchParams.set('remote', params.remote.toString());

  const query = searchParams.toString();
  const endpoint = query ? `/jobs?${query}` : '/jobs';

  // Using fetch with Next.js caching
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    next: {
      revalidate: 60, // Revalidate every 60 seconds
      tags: ['jobs'],
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return response.json();
}

/**
 * Server action to apply for a job
 */
export async function applyToJobAction(
  jobId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await api.post(`/applications`, { jobId });

    // Revalidate the applications list
    revalidatePath('/applications');

    return { success: true };
  } catch (error) {
    const err = error as { message: string };
    return {
      success: false,
      error: err.message || 'Failed to apply. Please try again.',
    };
  }
}
