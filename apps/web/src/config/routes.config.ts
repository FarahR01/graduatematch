/**
 * Type-safe route configuration
 * Use these constants instead of hardcoding route strings
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Graduate dashboard routes
  JOBS: '/jobs',
  JOB_DETAIL: (id: string) => `/jobs/${id}` as const,
  APPLICATIONS: '/applications',
  APPLICATION_DETAIL: (id: string) => `/applications/${id}` as const,
  SKILL_GAPS: '/skill-gaps',
  PROFILE: '/profile',
  PROFILE_SETTINGS: '/profile/settings',

  // Company routes
  COMPANY_DASHBOARD: '/company/dashboard',
  COMPANY_JOBS: '/company/jobs',
  COMPANY_JOB_NEW: '/company/jobs/new',
  COMPANY_JOB_EDIT: (id: string) => `/company/jobs/${id}/edit` as const,
  COMPANY_CANDIDATES: '/company/candidates',
  COMPANY_CANDIDATE_DETAIL: (id: string) =>
    `/company/candidates/${id}` as const,

  // API routes (for internal use)
  API: {
    AUTH: {
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      REGISTER: '/api/auth/register',
      SESSION: '/api/auth/session',
    },
  },
} as const;

// Auth routes that don't require authentication
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
] as const;

// Routes that require company role
export const COMPANY_ROUTES = [
  ROUTES.COMPANY_DASHBOARD,
  ROUTES.COMPANY_JOBS,
  ROUTES.COMPANY_CANDIDATES,
] as const;
