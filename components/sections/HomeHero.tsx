import Link from "next/link";
import Image from "@/components/ui/Image";
import { brand } from "@/config/site";
import { images } from "@/data/images";

/**
 * Homepage hero: one full-bleed aurora photograph with a small headline, one line and
 * one link at the bottom left. Server-rendered, no motion library; the photo is the LCP
 * element and is preloaded by next/image (priority).
 */
export function HomeHero() {
  return (
    <section data-hero="dark" aria-labelledby="home-hero-title" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-volcanic text-white">
      <Image src={images.auroraGreen.src} alt={images.auroraGreen.alt} fill priority sizes="100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-volcanic/75 via-volcanic/10 to-volcanic/40" />
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-[9vh] md:px-10 md:pb-[10vh]">
        <h1 id="home-hero-title" className="max-w-[14ch] font-serif text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.01em]">
          {brand.tagline}
        </h1>
        <p className="t-body mt-4 max-w-[28rem] text-white/90">Private journeys at the top of the world.</p>
        <Link
          href="/enquire"
          className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium underline decoration-white/50 underline-offset-[6px] transition-colors hover:text-aurora-glow hover:decoration-aurora-glow"
        >
          <span>Speak to a specialist</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
