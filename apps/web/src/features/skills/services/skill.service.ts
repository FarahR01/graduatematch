import { api } from '@/lib/api-client';
import type { SkillGap, LearningResource } from '@/types';

/**
 * Get skill gap analysis based on applied jobs
 */
export async function getSkillGaps(): Promise<SkillGap[]> {
  return api.get<SkillGap[]>('/skills/gaps');
}

/**
 * Get learning resources for a specific skill
 */
export async function getSkillResources(
  skillId: string
): Promise<LearningResource[]> {
  return api.get<LearningResource[]>(`/skills/${skillId}/resources`);
}

/**
 * Get recommended learning path
 */
export async function getLearningPath(): Promise<{
  skills: Array<{
    skill: SkillGap;
    order: number;
    reason: string;
  }>;
  estimatedTotalTime: string;
}> {
  return api.get('/skills/learning-path');
}
