'use server';

import { api } from '@/lib/api-client';
import type { User } from '@/types';

interface RegisterData {
  email: string;
  password: string;
  role: 'graduate' | 'company';
}

interface GraduateProfileData {
  firstName: string;
  lastName: string;
  degree: string;
  graduationYear: number;
  preferredRoles: string[];
  preferredLocation?: string;
  willingToRelocate: boolean;
}

interface RegisterResponse {
  user: User;
  accessToken: string;
}

/**
 * Register server action
 * Creates new user account
 */
export async function registerAction(
  data: RegisterData
): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    const response = await api.post<RegisterResponse>('/auth/register', data);

    // TODO: Set auth cookie/session
    // This will be implemented with proper auth setup

    return { success: true, user: response.user };
  } catch (error) {
    const err = error as { message: string; errors?: Record<string, string[]> };
    return {
      success: false,
      error: err.message || 'Registration failed. Please try again.',
    };
  }
}

/**
 * Complete graduate profile after registration
 */
export async function completeGraduateProfileAction(
  data: GraduateProfileData
): Promise<{ success: boolean; error?: string }> {
  try {
    await api.post('/graduates/profile', data);
    return { success: true };
  } catch (error) {
    const err = error as { message: string };
    return {
      success: false,
      error: err.message || 'Failed to save profile.',
    };
  }
}
