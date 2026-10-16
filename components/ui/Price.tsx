"use client";

import { useCurrency } from "@/lib/currency";

/** Displays a base-USD price in the visitor's chosen currency. */
export function Price({ usd, prefix = "from" }: { usd: number; prefix?: string }) {
  const { format } = useCurrency();
  return (
    <span suppressHydrationWarning>
      {prefix ? `${prefix} ` : ""}
      {format(usd)}
    </span>
  );
}
