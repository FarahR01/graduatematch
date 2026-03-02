'use client';

import { useState, useEffect } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, string> = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

/**
 * Check if a media query matches
 * Can use breakpoint shortcuts or custom queries
 */
export function useMediaQuery(query: Breakpoint | string): boolean {
  const mediaQuery = breakpoints[query as Breakpoint] || query;

  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(mediaQuery);
    
    // Set initial value
    setMatches(media.matches);

    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [mediaQuery]);

  return matches;
}

/**
 * Check if we're on mobile
 */
export function useIsMobile(): boolean {
  return !useMediaQuery('md');
}

/**
 * Check if we're on desktop
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('lg');
}
