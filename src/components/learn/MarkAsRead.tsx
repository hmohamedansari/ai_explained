import { useState } from 'react';
import { markRead, isRead } from '@/utils/progress';

interface Props {
  moduleId: string;
}

export default function MarkAsRead({ moduleId }: Props) {
  const [read, setRead] = useState(() => isRead(moduleId));

  const handleClick = () => {
    markRead(moduleId);
    setRead(true);
  };

  if (read) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-400">
        <span className="w-4 h-4 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center text-xs">
          ✓
        </span>
        Marked as read
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors group"
    >
      <span className="w-4 h-4 rounded-full border border-white/20 group-hover:border-brand-400/60 transition-colors" />
      Mark as read
    </button>
  );
}
