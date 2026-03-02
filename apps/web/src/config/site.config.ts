import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';

export const siteConfig = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com/graduatematch',
  },
  creator: 'GraduateMatch Team',
  keywords: [
    'jobs',
    'graduates',
    'career',
    'skills',
    'matching',
    'assessment',
    'junior developer',
    'entry-level',
  ],
} as const;

export const navigationConfig = {
  mainNav: [
    {
      title: 'Jobs',
      href: '/jobs',
    },
    {
      title: 'Companies',
      href: '/companies',
    },
    {
      title: 'Skills',
      href: '/skills',
    },
  ],
  dashboardNav: [
    {
      title: 'Job Feed',
      href: '/jobs',
      icon: 'briefcase',
    },
    {
      title: 'Applications',
      href: '/applications',
      icon: 'fileText',
    },
    {
      title: 'Skill Gaps',
      href: '/skill-gaps',
      icon: 'trendingUp',
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: 'user',
    },
  ],
  companyNav: [
    {
      title: 'Dashboard',
      href: '/company/dashboard',
      icon: 'layoutDashboard',
    },
    {
      title: 'Job Postings',
      href: '/company/jobs',
      icon: 'briefcase',
    },
    {
      title: 'Candidates',
      href: '/company/candidates',
      icon: 'users',
    },
  ],
} as const;
