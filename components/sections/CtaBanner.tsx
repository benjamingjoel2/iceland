import Image from "next/image";
import Link from "next/link";
import type { Img } from "@/data/types";
import { GridLines } from "@/components/ui/GridLines";
import { Reveal } from "@/components/motion/Reveal";

/** Full-bleed closing call to action. */
export function CtaBanner({
  image,
  title = "Begin your journey north",
  cta = "Speak to a specialist",
  href = "/enquire",
}: {
  image: Img;
  title?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden text-white">
      <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-atlantic/30" />
      <GridLines tone="light" />
      <Reveal className="relative z-10 px-6 text-center">
        <h2 className="t-h3 mx-auto max-w-[15ch]">{title}</h2>
        <Link
          href={href}
          className="mt-6 inline-flex h-11 items-center border-y border-white/40 px-6 text-[13px] font-medium transition-colors hover:bg-white hover:text-atlantic"
        >
          {cta}
        </Link>
      </Reveal>
    </section>
  );
}
