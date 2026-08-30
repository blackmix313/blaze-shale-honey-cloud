export function IsoBadge({ iso }: { iso: string }) {
  return (
    <span className="inline-flex items-center justify-center min-w-8 h-5 px-1 rounded-sm bg-surface border border-line-strong font-pixel text-[8px] text-cyan tracking-wider">
      {iso}
    </span>
  );
}
