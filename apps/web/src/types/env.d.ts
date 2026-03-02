/// <reference types="next" />
/// <reference types="next/image-types/global" />

/**
 * Type definitions for environment variables
 * These extend the ProcessEnv interface for type safety
 */

declare namespace NodeJS {
  interface ProcessEnv {
    // API Configuration
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_APP_URL: string;

    // Node Environment
    NODE_ENV: 'development' | 'production' | 'test';

    // Feature Flags
    NEXT_PUBLIC_ENABLE_ANALYTICS: string;

    // Auth (to be added when implementing auth)
    // NEXTAUTH_SECRET: string;
    // NEXTAUTH_URL: string;
  }
}
