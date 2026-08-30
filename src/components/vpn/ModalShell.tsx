import type { ReactNode } from "react";
import { X } from "lucide-react";
import { playSound } from "@/lib/vpn/audio";

interface ModalShellProps {
  title: string;
  accent?: string;
  icon?: ReactNode;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}

export function ModalShell({
  title,
  accent = "var(--color-cyan)",
  icon,
  onClose,
  children,
  footer,
  wide,
}: ModalShellProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 sm:p-5">
      <div
        className={`bg-ink border-2 rounded-xl w-full max-h-[90vh] flex flex-col overflow-hidden ${
          wide ? "max-w-3xl" : "max-w-2xl"
        }`}
        style={{ borderColor: accent, boxShadow: `0 0 24px color-mix(in oklab, ${accent} 28%, transparent)` }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-panel border-b border-line shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            {icon}
            <h2 className="font-pixel text-[10px] text-fg uppercase tracking-wider truncate">{title}</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              playSound.cancel();
            }}
            className="p-1.5 rounded-sm text-muted hover:text-fg hover:bg-surface min-h-11 min-w-11 flex items-center justify-center"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        {footer ? (
          <div className="px-4 py-3 border-t border-line bg-panel shrink-0">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
