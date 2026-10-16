"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { currencies, defaultCurrency, type CurrencyCode } from "@/config/site";

const STORAGE_KEY = "eon-currency";

type Ctx = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  format: (usd: number) => string;
};

const CurrencyContext = createContext<Ctx | null>(null);

/** Converts a base-USD price and rounds to a tidy figure for the chosen currency. */
export function convert(usd: number, code: CurrencyCode) {
  const c = currencies[code];
  return Math.round((usd * c.rate) / c.round) * c.round;
}

export function formatPrice(usd: number, code: CurrencyCode) {
  const c = currencies[code];
  const n = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(convert(usd, code));
  return code === "ISK" ? `ISK ${n}` : `${c.symbol}${n}`;
}

const EVENT = "eon-currency-change";

function readStored(): CurrencyCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && saved in currencies ? (saved as CurrencyCode) : defaultCurrency;
  } catch {
    return defaultCurrency;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // The chosen currency lives in localStorage; the server always renders USD.
  const currency = useSyncExternalStore(subscribe, readStored, () => defaultCurrency);

  const setCurrency = useCallback((c: CurrencyCode) => {
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const value = useMemo<Ctx>(
    () => ({ currency, setCurrency, format: (usd) => formatPrice(usd, currency) }),
    [currency, setCurrency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}
