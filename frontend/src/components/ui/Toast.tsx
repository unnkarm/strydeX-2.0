import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { notifications, dismissNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-[#111726]/95 border border-white/10 shadow-2xl backdrop-blur-md text-slate-100 transition-all animate-in slide-in-from-bottom-2 duration-200"
        >
          {n.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#BEF264] shrink-0 mt-0.5" />}
          {n.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
          {n.type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />}

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">{n.title}</h4>
            <p className="text-sm text-slate-300 mt-0.5 leading-snug">{n.message}</p>
          </div>

          <button
            onClick={() => dismissNotification(n.id)}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1 -mr-1 -mt-1 rounded-md"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
