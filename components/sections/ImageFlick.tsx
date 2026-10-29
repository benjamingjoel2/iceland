"use client";

import Image from "@/components/ui/Image";
import { useState } from "react";
import type { Img } from "@/data/types";

/** Image-only card flick gallery: one open frame, the rest blurred strips. */
export function ImageFlick({ images, className = "" }: { images: Img[]; className?: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className={`flex h-[min(70vh,560px)] px-2 ${className}`}>
      {images.map((img, i) => {
        const open = i === active;
        return (
          <button
            type="button"
            key={img.src + i}
            aria-label={`Show image: ${img.alt}`}
            aria-pressed={open}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className="relative h-full min-w-0 overflow-hidden"
            style={{ flexGrow: open ? 6 : 1, flexBasis: 0, transition: "flex-grow 900ms cubic-bezier(.65,0,.35,1)" }}
          >
            <Image
              src={img.src}
              alt={open ? img.alt : ""}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className={`object-cover transition-[filter,transform] duration-[1200ms] ${open ? "blur-0" : "scale-110 blur-[10px]"}`}
            />
          </button>
        );
      })}
    </div>
  );
}
