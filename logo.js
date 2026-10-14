export function Logo() {
  // Simple, no dependency on TAGS to avoid circular imports
  const bars = ['#e11d48', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6'];
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="flex h-7 w-5 flex-col justify-between" aria-hidden={true}>
        {bars.map((c) => (
          <span key={c} className="h-[3px] w-full rounded-full" style={{ background: c }} />
        ))}
      </div>
      <span className="font-ui text-xl font-bold tracking-tight">UrMd</span>
    </div>
  );
};
