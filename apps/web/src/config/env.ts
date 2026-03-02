/**
 * Type-safe environment variables
 * All environment variables should be accessed through this module
 */

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  // API Configuration
  NEXT_PUBLIC_API_URL: getEnvVar(
    'NEXT_PUBLIC_API_URL',
    'http://localhost:3001'
  ),

  // App Configuration
  NEXT_PUBLIC_APP_URL: getEnvVar(
    'NEXT_PUBLIC_APP_URL',
    'http://localhost:3000'
  ),

  // Node Environment
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: getEnvVar(
    'NEXT_PUBLIC_ENABLE_ANALYTICS',
    'false'
  ) === 'true',
} as const;

// Type for environment variables
export type Env = typeof env;
