"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Tab = { label: string; href: string };

/**
 * Bottom-centred frosted tab bar. In "anchors" mode it follows the reader and
 * highlights the section in view; in "links" mode it switches between sibling pages.
 */
export function TabBar({ tabs, mode = "anchors", current }: { tabs: Tab[]; mode?: "anchors" | "links"; current?: string }) {
  const [active, setActive] = useState(current ?? tabs[0]?.href);
  const [overFooter, setOverFooter] = useState(false);

  // Step out of the way once the footer arrives.
  useEffect(() => {
    if (mode !== "anchors") return;
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setOverFooter(e.isIntersecting), { threshold: 0 });
    io.observe(footer);
    return () => io.disconnect();
  }, [mode]);

  useEffect(() => {
    if (mode !== "anchors") return;
    const els = tabs
      .map((t) => document.querySelector<HTMLElement>(t.href))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [tabs, mode]);

  const wrapper =
    mode === "anchors"
      ? `pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-16 transition-all duration-500 ${overFooter ? "translate-y-20 opacity-0" : ""}`
      : "absolute inset-x-0 bottom-5 z-10 flex justify-center px-3";

  return (
    <nav aria-label={mode === "anchors" ? "On this page" : "Section"} className={wrapper}>
      <ul className="pointer-events-auto flex max-w-full gap-1 overflow-x-auto rounded-[4px] [scrollbar-width:none]">
        {tabs.map((t) => {
          const on = active === t.href;
          return (
            <li key={t.href} className="shrink-0">
              <Link
                href={t.href}
                aria-current={on ? (mode === "anchors" ? "location" : "page") : undefined}
                onClick={() => setActive(t.href)}
                className={`flex h-9 min-w-[96px] items-center justify-center rounded-[2px] px-4 text-[12px] font-medium transition-colors duration-300 ${
                  on ? "bg-atlantic text-white" : "bg-atlantic/45 text-white backdrop-blur-md hover:bg-aurora"
                }`}
              >
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
