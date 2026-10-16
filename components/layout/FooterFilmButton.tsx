"use client";

import Image from "next/image";
import { useUI } from "./UIProvider";

export function FooterFilmButton({ image }: { image: string }) {
  const { openFilm } = useUI();
  return (
    <button
      type="button"
      onClick={openFilm}
      className="group relative col-span-2 flex h-[88px] items-center justify-center overflow-hidden rounded-[2px] text-sm font-medium text-white"
    >
      <Image src={image} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <span className="absolute inset-0 bg-atlantic/35 transition-colors group-hover:bg-aurora/60" />
      <span className="relative flex items-center gap-3">
        Watch film
        <svg aria-hidden viewBox="0 0 10 12" className="h-2.5 w-2.5 fill-white"><path d="M0 0l10 6-10 6z" /></svg>
      </span>
    </button>
  );
}
