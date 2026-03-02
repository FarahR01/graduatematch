'use server';

import { api } from '@/lib/api-client';
import type { User } from '@/types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  accessToken: string;
}

/**
 * Login server action
 * Authenticates user and returns session data
 */
export async function loginAction(
  credentials: LoginCredentials
): Promise<{ success: boolean; error?: string }> {
  try {
    // Call login API (response handling will be implemented with auth setup)
    await api.post<LoginResponse>('/auth/login', credentials);

    // TODO: Set auth cookie/session
    // This will be implemented with proper auth setup

    return { success: true };
  } catch (error) {
    const err = error as { message: string };
    return {
      success: false,
      error: err.message || 'Login failed. Please try again.',
    };
  }
}

/**
 * Logout server action
 */
export async function logoutAction(): Promise<void> {
  // TODO: Clear auth cookie/session
  // This will be implemented with proper auth setup
}
