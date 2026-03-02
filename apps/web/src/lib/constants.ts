/**
 * Application-wide constants
 */

export const APP_NAME = 'GraduateMatch';
export const APP_DESCRIPTION =
  'AI-powered job matching platform for graduates with verified skill assessments';

/**
 * Skill proficiency levels
 */
export const SKILL_LEVELS = {
  LEARNING: 'learning',
  INTERMEDIATE: 'intermediate',
  PROFICIENT: 'proficient',
} as const;

export type SkillLevel = (typeof SKILL_LEVELS)[keyof typeof SKILL_LEVELS];

export const SKILL_LEVEL_LABELS: Record<SkillLevel, string> = {
  [SKILL_LEVELS.LEARNING]: 'Learning',
  [SKILL_LEVELS.INTERMEDIATE]: 'Intermediate',
  [SKILL_LEVELS.PROFICIENT]: 'Proficient',
};

/**
 * Application status values
 */
export const APPLICATION_STATUS = {
  APPLIED: 'applied',
  REVIEWED: 'reviewed',
  INTERVIEW: 'interview',
  OFFERED: 'offered',
  REJECTED: 'rejected',
} as const;

export type ApplicationStatus = (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS];

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  [APPLICATION_STATUS.APPLIED]: 'Applied',
  [APPLICATION_STATUS.REVIEWED]: 'Reviewed',
  [APPLICATION_STATUS.INTERVIEW]: 'Interview',
  [APPLICATION_STATUS.OFFERED]: 'Offered',
  [APPLICATION_STATUS.REJECTED]: 'Rejected',
};

/**
 * Match score thresholds
 */
export const MATCH_THRESHOLDS = {
  EXCELLENT: 85,
  GOOD: 70,
  FAIR: 50,
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
} as const;

/**
 * Job role tags
 */
export const JOB_ROLES = [
  'Backend',
  'Frontend',
  'Full-Stack',
  'DevOps',
  'Data',
  'Mobile',
  'AI/ML',
  'Security',
  'QA',
  'Design',
] as const;

export type JobRole = (typeof JOB_ROLES)[number];

/**
 * Degree types
 */
export const DEGREE_TYPES = [
  'Computer Science',
  'Software Engineering',
  'Information Technology',
  'Data Science',
  'Cybersecurity',
  'Business',
  'Engineering',
  'Other',
] as const;

export type DegreeType = (typeof DEGREE_TYPES)[number];
