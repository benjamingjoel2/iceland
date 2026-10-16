"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { primaryNav, secondaryNav } from "@/config/site";
import { flyouts } from "@/lib/nav";
import { Logo } from "@/components/ui/Logo";
import { CurrencySwitcher } from "./CurrencySwitcher";

type Key = (typeof primaryNav)[number]["key"];

const btnBase =
  "flex h-9 items-center justify-center rounded-[2px] px-4 text-[13px] font-medium transition-colors duration-300 hover:bg-aurora hover:text-white";

export function Header() {
  const pathname = usePathname();
  const [active, setActive] = useState<Key | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const panelRef = useRef<HTMLDivElement>(null);

  // Hide on scroll down, reveal on scroll up — the reference's header behaviour.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > window.innerHeight * 0.6);
    if (active || mobileOpen) return;
    setHidden(y > 160 && y > prev);
  });

  // Close menus on navigation (state reset during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setActive(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!active && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [active, mobileOpen]);

  const flyout = active ? flyouts[active] : null;
  // Over imagery the buttons are frosted glass; once over light content they turn frosted-white for legibility.
  const glassBtn = `${btnBase} ${scrolled ? "glass-light text-atlantic" : "glass text-white"}`;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? -90 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-16 focus:z-50 focus:bg-white focus:p-3 focus:text-atlantic">
          Skip to content
        </a>
        <div className="relative flex items-start justify-between px-3 pt-3 md:px-5 md:pt-4">
          {/* Desktop left buttons */}
          <nav aria-label="Primary" className="hidden gap-1 lg:flex">
            {primaryNav.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-expanded={active === item.key}
                aria-controls="flyout"
                onClick={() => setActive((a) => (a === item.key ? null : item.key))}
                className={`${glassBtn} min-w-[84px] ${active === item.key ? "!bg-aurora" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile left */}
          <button type="button" onClick={() => setMobileOpen(true)} className={`${glassBtn} lg:hidden`} aria-expanded={mobileOpen} aria-controls="mobile-menu">
            Menu
          </button>

          <Link
            href="/"
            aria-label="Edge of North — home"
            className="absolute left-1/2 top-3 -translate-x-1/2 text-white mix-blend-difference md:top-4"
          >
            <Logo />
          </Link>

          <div className="flex items-center gap-1">
            <div className="hidden md:block">
              <CurrencySwitcher variant={scrolled ? "glass-light" : "glass"} />
            </div>
            <Link href={secondaryNav[0].href} className={`${glassBtn} hidden min-w-[110px] lg:flex`}>
              {secondaryNav[0].label}
            </Link>
            <Link href={secondaryNav[1].href} className={`${glassBtn} min-w-[96px] !bg-aurora hover:!bg-atlantic lg:!bg-white/20 lg:hover:!bg-aurora`}>
              <span className="lg:hidden">Enquire</span>
              <span className="hidden lg:inline">{secondaryNav[1].label}</span>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Desktop flyout */}
      <AnimatePresence>
        {flyout ? (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[55] bg-atlantic/30 backdrop-blur-[6px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />
            <motion.div
              key="panel"
              id="flyout"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${primaryNav.find((p) => p.key === active)?.label} menu`}
              className="fixed bottom-2 left-2 top-2 z-[60] flex w-[min(380px,calc(100vw-16px))] flex-col overflow-hidden rounded-[6px] bg-white text-atlantic"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap gap-1 p-2">
                {primaryNav.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActive(item.key)}
                    className={`flex h-9 items-center rounded-[2px] px-3 text-[13px] font-medium transition-colors ${active === item.key ? "bg-aurora text-white" : "bg-glacier text-atlantic/60 hover:text-atlantic"}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-8 pt-6">
                {flyout.home ? (
                  <Link href="/" className="mb-8 block text-sm font-medium hover:text-aurora">
                    Home
                  </Link>
                ) : null}
                {flyout.groups.map((g) => (
                  <div key={g.label} className="mb-8">
                    <p className="t-eyebrow mb-3 text-[15px] text-slate">{g.label}</p>
                    <ul className="space-y-1.5">
                      {g.links.map((l) => (
                        <li key={l.label}>
                          <Link href={l.href} className="text-sm font-medium transition-colors hover:text-aurora">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link href="/enquire" className="m-2 flex h-20 items-center justify-center rounded-[2px] bg-glacier text-sm font-medium transition-colors hover:bg-aurora hover:text-white">
                Enquire now
              </Link>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-white text-atlantic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between p-3">
              <button type="button" onClick={() => setMobileOpen(false)} className="flex h-9 items-center rounded-[2px] bg-glacier px-4 text-[13px] font-medium">
                Close ×
              </button>
              <Logo />
              <CurrencySwitcher variant="light" />
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <Link href="/" className="t-h3 block py-3">Home</Link>
              {primaryNav.map((item) => (
                <details key={item.key} className="group border-b border-atlantic/10">
                  <summary className="t-h3 flex cursor-pointer list-none items-center justify-between py-4">
                    {item.label}
                    <span aria-hidden className="text-2xl font-light transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="pb-5">
                    {flyouts[item.key].groups.map((g) => (
                      <div key={g.label} className="mb-4">
                        <p className="t-eyebrow mb-2 text-slate">{g.label}</p>
                        <ul className="space-y-2">
                          {g.links.map((l) => (
                            <li key={l.label}>
                              <Link href={l.href} className="text-[15px] font-medium">{l.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
              <Link href="/prices" className="t-h3 block py-4">Dates &amp; Prices</Link>
            </div>
            <Link href="/enquire" className="m-3 flex h-16 items-center justify-center rounded-[2px] bg-aurora text-sm font-medium text-white">
              Enquire now
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
