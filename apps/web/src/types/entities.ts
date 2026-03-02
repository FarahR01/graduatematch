/**
 * Domain entities shared across the application
 * These should match the backend entity definitions
 */

import type { SkillLevel, ApplicationStatus, JobRole, DegreeType } from '@/lib/constants';

/**
 * User entity
 */
export interface User {
  id: string;
  email: string;
  role: 'graduate' | 'company' | 'admin';
  createdAt: string;
  updatedAt: string;
}

/**
 * Graduate profile entity
 */
export interface Graduate {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  degree: DegreeType;
  graduationYear: number;
  preferredRoles: JobRole[];
  preferredLocation?: string;
  willingToRelocate: boolean;
  bio?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  skills: GraduateSkill[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Graduate skill with proficiency
 */
export interface GraduateSkill {
  id: string;
  skillId: string;
  skill: Skill;
  level: SkillLevel;
  yearsOfExperience: number;
  isVerified: boolean;
  verifiedAt?: string;
}

/**
 * Skill entity
 */
export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
}

/**
 * Company entity
 */
export interface Company {
  id: string;
  userId: string;
  name: string;
  description?: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  location: string;
  website?: string;
  logoUrl?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Job posting entity
 */
export interface Job {
  id: string;
  companyId: string;
  company: Company;
  title: string;
  description: string;
  location: string;
  isRemote: boolean;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  requiredSkills: JobSkill[];
  niceToHaveSkills: JobSkill[];
  experienceLevel: 'entry' | 'junior' | 'mid' | 'senior';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'draft' | 'active' | 'paused' | 'closed';
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

/**
 * Job skill requirement
 */
export interface JobSkill {
  id: string;
  skillId: string;
  skill: Skill;
  importance: 'required' | 'nice-to-have';
}

/**
 * Job application entity
 */
export interface Application {
  id: string;
  graduateId: string;
  graduate?: Graduate;
  jobId: string;
  job?: Job;
  status: ApplicationStatus;
  matchScore: number;
  appliedAt: string;
  reviewedAt?: string;
  notes?: string;
  feedback?: string;
}

/**
 * Match score breakdown
 */
export interface MatchScore {
  overallScore: number;
  skillsMatched: number;
  skillsTotal: number;
  matchedSkills: Skill[];
  missingSkills: Skill[];
  niceToHaveMatched: Skill[];
  niceToHaveMissing: Skill[];
  experienceMatch: boolean;
  locationMatch: boolean;
}

/**
 * Skill gap analysis
 */
export interface SkillGap {
  skill: Skill;
  importance: 'critical' | 'important' | 'nice-to-have';
  estimatedLearningTime: string;
  resources: LearningResource[];
  jobsRequiring: number;
}

/**
 * Learning resource
 */
export interface LearningResource {
  id: string;
  title: string;
  type: 'course' | 'tutorial' | 'documentation' | 'video' | 'book';
  provider: string;
  url: string;
  duration?: string;
  isFree: boolean;
}

/**
 * Badge entity
 */
export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  skillId: string;
  skill: Skill;
  earnedAt?: string;
}
