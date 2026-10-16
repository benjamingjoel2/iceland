/** Text-based logo placeholder. Replace with the final mark when ready. */
export function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <svg aria-hidden viewBox="0 0 64 10" className="mb-1 h-2.5 w-12" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M0 9h22l6-7 4 4 3-3 7 6h22" />
      </svg>
      <span className="font-display text-[15px] font-medium uppercase tracking-[0.28em]">
        {compact ? "EoN" : "Edge of North"}
      </span>
    </span>
  );
}
