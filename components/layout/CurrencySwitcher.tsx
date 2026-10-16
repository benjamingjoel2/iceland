"use client";

import { useEffect, useRef, useState } from "react";
import { currencies, type CurrencyCode } from "@/config/site";
import { useCurrency } from "@/lib/currency";

const codes = Object.keys(currencies) as CurrencyCode[];

/** Compact currency picker. All displayed prices convert from base USD. */
export function CurrencySwitcher({ variant = "glass" }: { variant?: "glass" | "glass-light" | "light" }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const btn =
    variant === "glass"
      ? "glass text-white hover:bg-aurora"
      : variant === "glass-light"
        ? "glass-light text-atlantic hover:bg-aurora hover:text-white"
        : "bg-glacier text-atlantic hover:bg-aurora hover:text-white";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Currency: ${currencies[currency].label}. Change currency`}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-9 min-w-[64px] items-center justify-center gap-1.5 rounded-[2px] px-3 text-[13px] font-medium transition-colors ${btn}`}
        suppressHydrationWarning
      >
        {currency}
        <svg aria-hidden viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label="Choose currency"
          className="absolute right-0 top-11 z-50 w-56 rounded-[4px] bg-white p-1.5 text-atlantic shadow-[0_20px_60px_-20px_rgba(11,13,16,.35)]"
        >
          {codes.map((c) => (
            <li key={c}>
              <button
                role="option"
                aria-selected={c === currency}
                onClick={() => {
                  setCurrency(c);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-[2px] px-3 py-2 text-left text-[13px] transition-colors hover:bg-glacier ${c === currency ? "bg-glacier font-semibold" : ""}`}
              >
                <span>{currencies[c].label}</span>
                <span className="font-display tracking-wide text-slate">{c}</span>
              </button>
            </li>
          ))}
          <li className="t-small px-3 pb-1.5 pt-2 text-slate">Indicative conversions from US$.</li>
        </ul>
      ) : null}
    </div>
  );
}
