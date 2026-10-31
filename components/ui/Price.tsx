"use client";

import { useCurrency } from "@/lib/currency";

/** Displays a base-USD price in the visitor's chosen currency, always as "From {amount}". */
export function Price({ usd, prefix = "From" }: { usd: number; prefix?: string }) {
  const { format } = useCurrency();
  return (
    <span suppressHydrationWarning>
      {prefix ? `${prefix} ` : ""}
      {format(usd)}
    </span>
  );
}
