import { cn } from '@/lib/utils';
import { MATCH_THRESHOLDS } from '@/lib/constants';

interface MatchScoreBadgeProps {
  /**
   * Match percentage (0-100)
   */
  score: number;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Show score label
   */
  showLabel?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

/**
 * Display a match score with color-coded indicator
 * Green (85+): Excellent match
 * Yellow (70-84): Good match
 * Orange (50-69): Fair match
 * Red (<50): Low match
 */
export function MatchScoreBadge({
  score,
  size = 'md',
  showLabel = true,
  className,
}: MatchScoreBadgeProps) {
  const getScoreColor = (score: number): string => {
    if (score >= MATCH_THRESHOLDS.EXCELLENT) {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    if (score >= MATCH_THRESHOLDS.GOOD) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
    if (score >= MATCH_THRESHOLDS.FAIR) {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    }
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= MATCH_THRESHOLDS.EXCELLENT) return 'Excellent';
    if (score >= MATCH_THRESHOLDS.GOOD) return 'Good';
    if (score >= MATCH_THRESHOLDS.FAIR) return 'Fair';
    return 'Low';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        getScoreColor(score),
        sizeClasses[size],
        className
      )}
    >
      <span className="font-semibold">{score}%</span>
      {showLabel && (
        <span className="text-opacity-80">{getScoreLabel(score)}</span>
      )}
    </span>
  );
}
