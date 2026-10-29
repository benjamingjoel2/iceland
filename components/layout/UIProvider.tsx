"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { CurrencyProvider } from "@/lib/currency";
import { FilmModal } from "@/components/ui/FilmModal";

type UI = {
  filmOpen: boolean;
  openFilm: () => void;
  closeFilm: () => void;
  howOpen: boolean;
  setHowOpen: (v: boolean) => void;
};

const UIContext = createContext<UI | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [filmOpen, setFilmOpen] = useState(false);
  const [howOpen, setHowOpen] = useState(false);
  const value = useMemo<UI>(
    () => ({
      filmOpen,
      openFilm: () => setFilmOpen(true),
      closeFilm: () => setFilmOpen(false),
      howOpen,
      setHowOpen,
    }),
    [filmOpen, howOpen],
  );
  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <CurrencyProvider>
        <UIContext.Provider value={value}>
          {children}
          <FilmModal open={filmOpen} onClose={() => setFilmOpen(false)} />
        </UIContext.Provider>
      </CurrencyProvider>
    </MotionConfig>
    </LazyMotion>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}
