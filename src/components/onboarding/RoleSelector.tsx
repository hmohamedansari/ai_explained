import { useState } from 'react';

const ROLES = [
  {
    id: 'tech-leader',
    emoji: '🏛️',
    title: 'Tech Leader',
    description: 'CTO, VP, or architect — you understand systems deeply but have moved away from day-to-day coding. You want the mental model without wading through boilerplate.',
    path: '/paths/tech-leader',
  },
  {
    id: 'new-dev',
    emoji: '🌱',
    title: 'New Developer',
    description: 'You\'re learning to code or newer to the field. Step-by-step explanations, plenty of analogies, and hands-on exercises to build confidence.',
    path: '/paths/new-dev',
  },
  {
    id: 'experienced-dev',
    emoji: '⚙️',
    title: 'Experienced Developer',
    description: '5+ years building systems. You want the protocol internals, the implementation details, and the code you can run today.',
    path: '/paths/experienced-dev',
  },
  {
    id: 'sre-devops',
    emoji: '🔧',
    title: 'SRE / DevOps',
    description: 'You own the infrastructure. You care about deployment, observability, security, and running AI systems reliably in production.',
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mx-auto">
      {ROLES.map(role => (
        <button
          key={role.id}
          onClick={() => handleSelect(role.id, role.path)}
          className={[
            'text-left p-6 rounded-xl border transition-all duration-200 group',
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
