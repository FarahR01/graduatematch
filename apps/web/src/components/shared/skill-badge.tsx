import { cn } from '@/lib/utils';
import { SKILL_LEVEL_LABELS, type SkillLevel } from '@/lib/constants';

interface SkillBadgeProps {
  /**
   * Skill name to display
   */
  name: string;
  /**
   * Optional proficiency level
   */
  level?: SkillLevel;
  /**
   * Whether skill is verified
   */
  isVerified?: boolean;
  /**
   * Visual variant
   */
  variant?: 'default' | 'outline' | 'matched' | 'missing';
  /**
   * Size variant
   */
  size?: 'sm' | 'md';
  /**
   * Click handler for interactive badges
   */
  onClick?: () => void;
  /**
   * Allow removal (shows X button)
   */
  onRemove?: () => void;
  /**
   * Additional class names
   */
  className?: string;
}

/**
 * Display a skill with optional level and verification status
 */
export function SkillBadge({
  name,
  level,
  isVerified = false,
  variant = 'default',
  size = 'md',
  onClick,
  onRemove,
  className,
}: SkillBadgeProps) {
  const variantClasses = {
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    outline: 'bg-transparent text-slate-700 border-slate-300',
    matched: 'bg-green-50 text-green-700 border-green-200',
    missing: 'bg-red-50 text-red-700 border-red-200',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
  };

  const isInteractive = onClick !== undefined;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        variantClasses[variant],
        sizeClasses[size],
        isInteractive && 'cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {/* Verified indicator */}
      {isVerified && (
        <svg
          className={cn('text-green-500', size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )}

      {/* Skill name */}
      <span>{name}</span>

      {/* Level indicator */}
      {level && <span className="text-opacity-60 text-xs">({SKILL_LEVEL_LABELS[level]})</span>}

      {/* Remove button */}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 -mr-1 hover:opacity-60"
          aria-label={`Remove ${name}`}
        >
          <svg
            className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
