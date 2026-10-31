"use client";

import { useEffect, useState } from "react";

/**
 * Becomes true shortly after the window `load` event (and an idle moment), so
 * decorative extras — background film, mist textures — never compete with the
 * critical path: HTML, CSS, fonts and the hero image.
 */
export function useAfterLoad(delay = 400) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    const go = () => {
      const fire = () => (t = setTimeout(() => setReady(true), delay));
      if ("requestIdleCallback" in window) window.requestIdleCallback(fire, { timeout: 2000 });
      else fire();
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      if (t) clearTimeout(t);
    };
  }, [delay]);
  return ready;
}
