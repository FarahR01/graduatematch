import { cn } from '@/lib/utils';
import { APPLICATION_STATUS_LABELS, type ApplicationStatus } from '@/lib/constants';

interface ApplicationStatusTrackerProps {
  /**
   * Current application status
   */
  status: ApplicationStatus;
  /**
   * Timestamps for each status (optional)
   */
  timestamps?: Partial<Record<ApplicationStatus, string>>;
  /**
   * Orientation of the tracker
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Size variant
   */
  size?: 'sm' | 'md';
  /**
   * Additional class names
   */
  className?: string;
}

const statusOrder: ApplicationStatus[] = ['applied', 'reviewed', 'interview', 'offered'];

/**
 * Visual tracker showing application progress through stages
 */
export function ApplicationStatusTracker({
  status,
  timestamps,
  orientation = 'horizontal',
  size = 'md',
  className,
}: ApplicationStatusTrackerProps) {
  const currentIndex = statusOrder.indexOf(status);
  const isRejected = status === 'rejected';

  const getStepStatus = (index: number): 'complete' | 'current' | 'pending' => {
    if (isRejected && index === currentIndex) return 'current';
    if (index < currentIndex) return 'complete';
    if (index === currentIndex) return 'current';
    return 'pending';
  };

  const formatTimestamp = (ts: string) => {
    return new Date(ts).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const sizeClasses = {
    sm: {
      circle: 'h-6 w-6 text-xs',
      line: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
      text: 'text-xs',
    },
    md: {
      circle: 'h-8 w-8 text-sm',
      line: orientation === 'horizontal' ? 'h-1' : 'w-1',
      text: 'text-sm',
    },
  };

  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col items-start',
        className
      )}
    >
      {statusOrder.map((stepStatus, index) => {
        const stepState = getStepStatus(index);
        const isLast = index === statusOrder.length - 1;

        return (
          <div
            key={stepStatus}
            className={cn(
              'flex',
              orientation === 'horizontal' ? 'flex-col items-center' : 'flex-row items-start'
            )}
          >
            {/* Step indicator */}
            <div className="flex items-center">
              <div
                className={cn(
                  'flex items-center justify-center rounded-full font-medium',
                  sizeClasses[size].circle,
                  stepState === 'complete' && 'bg-green-500 text-white',
                  stepState === 'current' &&
                    (isRejected ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'),
                  stepState === 'pending' && 'bg-slate-200 text-slate-500'
                )}
              >
                {stepState === 'complete' ? (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={cn(
                    orientation === 'horizontal' ? 'w-12 mx-2' : 'h-8 my-2 ml-4',
                    sizeClasses[size].line,
                    stepState === 'complete' || stepState === 'current'
                      ? 'bg-green-500'
                      : 'bg-slate-200'
                  )}
                />
              )}
            </div>

            {/* Label */}
            <div
              className={cn(
                'mt-2',
                orientation === 'vertical' && 'ml-3 mt-0',
                sizeClasses[size].text
              )}
            >
              <p className={cn('font-medium', stepState === 'pending' && 'text-slate-400')}>
                {APPLICATION_STATUS_LABELS[stepStatus]}
              </p>
              {timestamps?.[stepStatus] && (
                <p className="text-xs text-slate-500">{formatTimestamp(timestamps[stepStatus]!)}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
