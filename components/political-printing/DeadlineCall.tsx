'use client';

import { track } from '@/lib/track';
import { business } from '@/lib/config';

interface DeadlineCallProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Deadline call link — tel: from config, fires rush_call_clicked.
 * Plain anchor so it works everywhere; styling comes from the caller.
 */
export default function DeadlineCall({ className, children }: DeadlineCallProps) {
  return (
    <a
      href={`tel:${business.phone}`}
      className={className}
      onClick={() => track('rush_call_clicked', { source: 'political-printing' })}
    >
      {children ?? `Call About a Deadline → ${business.phoneDisplay}`}
    </a>
  );
}
