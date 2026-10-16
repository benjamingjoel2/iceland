"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { film } from "@/data/images";

/** Full-screen film player with captions. Opened by every "Watch film" button. */
export function FilmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      prev?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={film.title}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-volcanic/95 p-4 md:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            onClick={onClose}
            className="glass absolute right-5 top-5 z-10 h-9 rounded-[2px] px-4 text-[13px] text-white hover:bg-aurora"
          >
            Close ×
          </button>
          <motion.div
            className="relative aspect-video w-full max-w-6xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <video className="h-full w-full bg-black" controls autoPlay playsInline poster={film.poster} preload="metadata">
              <source src={film.src} type="video/mp4" />
              <track kind="captions" src={film.captions} srcLang="en" label="English" default />
            </video>
            <p className="t-small mt-3 text-white/60">Placeholder film assembled from stills — replace with the commissioned brand film.</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function WatchFilmButton({ className = "", onClick }: { className?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex h-11 items-center gap-10 border-y border-white/30 px-5 text-[13px] font-medium text-white transition-colors hover:bg-white/10 ${className}`}
    >
      Watch film
      <svg aria-hidden viewBox="0 0 10 12" className="h-2.5 w-2.5 fill-white transition-transform group-hover:translate-x-1">
        <path d="M0 0l10 6-10 6z" />
      </svg>
    </button>
  );
}
