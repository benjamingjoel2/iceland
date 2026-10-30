"use client";

import { useCurrency } from "@/lib/currency";

/** Displays a base-USD price in the visitor's chosen currency, always as "from <amount>". */
export function Price({ usd }: { usd: number }) {
  const { format } = useCurrency();
  return (
    <span suppressHydrationWarning>
      from {format(usd)}
    </span>
  );
}
