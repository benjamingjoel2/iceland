"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { steps } from "@/data/steps";
import { contact } from "@/config/site";
import { useUI } from "./UIProvider";

/** Fixed side tab + right-hand drawer with the six steps, as on the reference. */
export function HowItWorks() {
  const { howOpen, setHowOpen } = useUI();
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > window.innerHeight * 0.85));

  useEffect(() => setHowOpen(false), [pathname, setHowOpen]);

  useEffect(() => {
    if (!howOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setHowOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [howOpen, setHowOpen]);

  if (pathname === "/enquire") return null;

  return (
    <>
      <AnimatePresence>
        {howOpen ? (
          <m.div
            className="fixed inset-0 z-[65] bg-atlantic/40 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setHowOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <m.div
        className="fixed bottom-0 right-0 top-0 z-[70] flex items-center"
        initial={false}
        animate={{ x: howOpen ? 0 : "calc(100% - 0px)" }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        style={{ width: "min(720px, 100vw)" }}
      >
        {/* Tab */}
        <m.button
          type="button"
          onClick={() => setHowOpen(!howOpen)}
          aria-expanded={howOpen}
          aria-controls="how-it-works"
          className="absolute right-full top-1/2 flex h-[110px] w-[34px] -translate-y-1/2 flex-col items-center justify-center gap-3 rounded-l-[4px] bg-aurora text-[12px] font-medium text-white shadow-lg transition-colors hover:bg-atlantic md:h-[130px] md:w-[38px]"
          animate={{ opacity: visible || howOpen ? 1 : 0, x: visible || howOpen ? 0 : 20 }}
          style={{ pointerEvents: visible || howOpen ? "auto" : "none" }}
          transition={{ duration: 0.4 }}
        >
          <span aria-hidden className="text-sm leading-none">{howOpen ? "×" : "+"}</span>
          <span className="whitespace-nowrap [writing-mode:vertical-rl] rotate-180">{howOpen ? "Close" : "How it works"}</span>
        </m.button>

        {/* Drawer */}
        <div
          id="how-it-works"
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="How it works"
          aria-hidden={!howOpen}
          inert={!howOpen}
          className="h-full w-full overflow-y-auto bg-white px-6 py-10 outline-none md:px-16 md:py-16"
        >
          <h2 className="t-h3 mb-12 text-atlantic">How it works</h2>
          <ol className="space-y-1.5">
            {steps.map((s) => (
              <li key={s.n} className="rounded-[2px] bg-glacier p-6 md:p-7">
                <h3 className="t-eyebrow mb-4 text-[19px] text-atlantic">
                  {s.n}. {s.title}
                </h3>
                <p className="t-body text-atlantic/90">
                  {s.body}
                  {s.n === 1 ? (
                    <>
                      {" "}
                      <a href={contact.scheduleCallUrl} className="text-aurora underline underline-offset-2">
                        Book a call directly.
                      </a>
                    </>
                  ) : null}
                </p>
              </li>
            ))}
          </ol>
          <Link href="/enquire" className="mt-6 flex h-20 items-center justify-center rounded-[2px] bg-aurora text-sm font-medium text-white transition-colors hover:bg-atlantic">
            Start planning
          </Link>
        </div>
      </m.div>
    </>
  );
}
