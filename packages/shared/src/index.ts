// Types
export interface User {
  id: string;
  email: string;
  userType: 'graduate' | 'company';
  firstName?: string;
  lastName?: string;
  createdAt: Date;
}

export interface Graduate extends User {
  degree: string;
  graduationYear: number;
  desiredRoles: string[];
}

export interface Company extends User {
  name: string;
  industry: string;
  size: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  salaryMin?: number;
  salaryMax?: number;
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract';
  level: 'entry' | 'junior' | 'mid' | 'senior';
  postedDate: Date;
  status: 'active' | 'closed';
}

export interface Application {
  id: string;
  graduateId: string;
  jobId: string;
  appliedDate: Date;
  status: 'applied' | 'reviewed' | 'interview' | 'rejected' | 'offer';
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Constants
export const JOB_TYPES = ['full-time', 'part-time', 'contract'] as const;
export const JOB_LEVELS = ['entry', 'junior', 'mid', 'senior'] as const;
export const USER_TYPES = ['graduate', 'company'] as const;
export const SKILL_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;

// Utilities
export const calculateMatchPercentage = (
  requiredSkills: string[],
  userSkills: string[]
): number => {
  if (requiredSkills.length === 0) return 100;
  const matched = requiredSkills.filter(skill => userSkills.includes(skill)).length;
  return Math.round((matched / requiredSkills.length) * 100);
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};