import { features } from "@/config/site";

/** Small amber flag for any season window, access date or regulation that must be checked before launch. */
export function VerifyFlag({ note, tone = "light" }: { note?: string; tone?: "light" | "dark" }) {
  if (!features.showVerifyFlags) return null;
  const cls = tone === "dark" ? "bg-amber-300/15 text-amber-200" : "bg-amber-100 text-amber-900";
  return (
    <span className={`flag ${cls}`} title={note}>
      <span aria-hidden>◆</span> Verify before launch
      {note ? <span className="sr-only">: {note}</span> : null}
    </span>
  );
}

/** Marks placeholder copy (quotes, names, badges) so it can never ship unnoticed. */
export function PlaceholderFlag({ label = "Placeholder", tone = "light" }: { label?: string; tone?: "light" | "dark" }) {
  const cls = tone === "dark" ? "bg-white/10 text-white/80" : "bg-atlantic/[0.06] text-atlantic/70";
  return <span className={`flag ${cls}`}>{label}</span>;
}
