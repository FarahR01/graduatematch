/**
 * Job-specific type definitions
 */

import type { Job, Skill } from '@/types';

export interface JobWithMatchScore extends Job {
  matchScore: number;
  matchedSkills: Skill[];
  missingSkills: Skill[];
}

export interface JobFilterState {
  search: string;
  location: string;
  remote: boolean | undefined;
  experienceLevel: string;
  salaryMin: number | undefined;
  salaryMax: number | undefined;
  skills: string[];
  sortBy: 'match' | 'date' | 'salary';
  sortOrder: 'asc' | 'desc';
}

export interface JobSearchParams {
  q?: string;
  location?: string;
  remote?: string;
  experience?: string;
  skills?: string;
  sort?: string;
  page?: string;
}
