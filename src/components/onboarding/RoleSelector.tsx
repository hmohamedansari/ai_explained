import { useState } from 'react';

const ROLES = [
  {
    id: 'curious',
    emoji: '🌱',
    title: 'Curious Beginner',
    description: 'No coding background needed. You want to understand what AI actually is, read the news intelligently, and hold informed conversations with technical teams.',
    path: '/paths/curious-beginner',
  },
  {
    id: 'leader',
    emoji: '🏛️',
    title: 'Tech Leader',
    description: 'CTO, VP, or architect. You want the accurate mental model, the real risk surface, and the strategic decisions — without wading through implementation detail.',
    path: '/paths/tech-leader',
  },
  {
    id: 'junior',
    emoji: '🌿',
    title: 'Junior Developer',
    description: 'Building your first AI feature. Step-by-step, no gaps, evals before features. You\'ll understand why things work, not just that they do.',
    path: '/paths/new-dev',
  },
  {
    id: 'senior',
    emoji: '⚙️',
    title: 'Senior Developer',
    description: '5+ years building systems. Protocol internals, full code examples, production failure modes, and the architectural trade-offs worth knowing.',
    path: '/paths/experienced-dev',
  },
  {
    id: 'sre',
    emoji: '🔧',
    title: 'SRE / DevOps',
    description: 'You own the infrastructure. VRAM budgets, serving architecture, cost management, supply chain security, and keeping AI workloads reliable in production.',
    path: '/paths/sre-devops',
  },
];

export default function RoleSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (roleId: string, path: string) => {
    setSelected(roleId);
    setTimeout(() => {
      window.location.href = path;
    }, 300);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
      {ROLES.map(role => (
        <button
          key={role.id}
          onClick={() => handleSelect(role.id, role.path)}
          className={[
            'text-left p-6 rounded-xl border transition-all duration-200',
            selected === role.id
              ? 'border-brand-500 bg-brand-950/50 scale-[0.99]'
              : 'border-white/10 bg-surface-1 hover:border-brand-500/50 hover:bg-surface-2',
          ].join(' ')}
        >
          <div className="text-3xl mb-3">{role.emoji}</div>
          <h3 className="text-white font-semibold mb-1.5">{role.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{role.description}</p>
        </button>
      ))}
    </div>
  );
}
