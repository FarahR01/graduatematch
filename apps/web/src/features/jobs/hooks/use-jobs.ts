'use client';

import { useState, useEffect, useCallback } from 'react';
import { getJobs } from '../services/job.service';
import type { Job, PaginatedResponse } from '@/types';
import { useDebounce } from '@/hooks';

interface UseJobsOptions {
  initialPage?: number;
  pageSize?: number;
}

interface JobFilters {
  search: string;
  location: string;
  remote: boolean | undefined;
  experienceLevel: string;
  skills: string[];
}

/**
 * Hook for fetching and managing job listings
 */
export function useJobs(options: UseJobsOptions = {}) {
  const { initialPage = 1, pageSize = 10 } = options;

  const [jobs, setJobs] = useState<Job[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<Job>['meta'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    location: '',
    remote: undefined,
    experienceLevel: '',
    skills: [],
  });

  // Debounce search to avoid excessive API calls
  const debouncedSearch = useDebounce(filters.search, 300);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getJobs({
        page,
        pageSize,
        search: debouncedSearch || undefined,
        location: filters.location || undefined,
        remote: filters.remote,
        experienceLevel: filters.experienceLevel || undefined,
        skills: filters.skills.length > 0 ? filters.skills : undefined,
      });

      setJobs(response.data);
      setMeta(response.meta);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  }, [
    page,
    pageSize,
    debouncedSearch,
    filters.location,
    filters.remote,
    filters.experienceLevel,
    filters.skills,
  ]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters.location, filters.remote, filters.experienceLevel, filters.skills]);

  const updateFilter = useCallback(<K extends keyof JobFilters>(key: K, value: JobFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      location: '',
      remote: undefined,
      experienceLevel: '',
      skills: [],
    });
  }, []);

  return {
    jobs,
    meta,
    isLoading,
    error,
    page,
    filters,
    setPage,
    updateFilter,
    resetFilters,
    refetch: fetchJobs,
  };
}
