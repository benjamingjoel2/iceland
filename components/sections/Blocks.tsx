import Image from "next/image";
import Link from "next/link";
import type { Img } from "@/data/types";
import { GridLines } from "@/components/ui/GridLines";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SectionTitle } from "./SectionTitle";

/** Condensed label + 14px copy placed in the middle columns of a white section. */
export function LabelText({
  id,
  label,
  body,
  scribble = false,
  className = "",
  tone = "light",
}: {
  id?: string;
  label: string;
  body: React.ReactNode;
  scribble?: boolean;
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section id={id} className={`relative py-[16vh] ${dark ? "bg-volcanic text-white" : "bg-white text-atlantic"} ${className}`}>
      <GridLines tone={dark ? "light" : "dark"} />
      <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
        <Reveal className="relative col-span-4 md:col-span-4 md:col-start-5">
          {scribble ? (
            <svg aria-hidden viewBox="0 0 240 40" className="absolute -left-[45%] -top-6 hidden h-10 w-60 md:block" fill="none" stroke="currentColor" strokeOpacity=".45" strokeWidth=".8">
              <path d="M235 4C170 10 60 18 12 30c-8 2-6 6 4 6 50 0 120-10 190-16" />
            </svg>
          ) : null}
          <h2 className="t-label mb-3">{label}</h2>
          <div className={`t-body space-y-4 ${dark ? "text-white/75" : ""}`}>{body}</div>
        </Reveal>
      </div>
    </section>
  );
}

/** Very large uppercase serif statement with first-line indent. */
export function Statement({ text, align = "right" }: { text: string; align?: "left" | "right" }) {
  return (
    <section className="relative bg-white py-[14vh] text-atlantic">
      <GridLines />
      <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
        <Reveal className={`col-span-4 md:col-span-6 ${align === "right" ? "md:col-start-6" : "md:col-start-2"}`}>
          <p className="t-h3 [text-indent:25%]">{text}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** Image on one side, label and copy on the other (offset vertically, like the reference). */
export function OffsetImageText({
  image,
  label,
  body,
  reverse = false,
  second,
}: {
  image: Img;
  label: string;
  body: React.ReactNode;
  reverse?: boolean;
  second?: Img;
}) {
  return (
    <section className="relative bg-white py-[10vh] text-atlantic">
      <GridLines />
      <div className="relative z-10 grid grid-cols-4 items-start gap-5 px-5 md:grid-cols-12">
        <div className={`col-span-4 md:col-span-4 ${reverse ? "md:order-2 md:col-start-9" : ""}`}>
          <ParallaxImage image={image} className="aspect-[4/5]" />
        </div>
        {second ? (
          <div className={`col-span-4 hidden md:block md:col-span-4 md:mt-[22vh] ${reverse ? "md:order-1 md:col-start-5" : ""}`}>
            <ParallaxImage image={second} className="aspect-[4/5]" />
          </div>
        ) : null}
        <Reveal className={`col-span-4 md:col-span-3 ${second ? (reverse ? "md:order-0 md:col-start-1" : "") : reverse ? "md:col-start-3 md:order-1" : "md:col-start-7"} md:mt-[30vh]`}>
          <h2 className="t-label mb-3">{label}</h2>
          <div className="t-body space-y-4">{body}</div>
        </Reveal>
      </div>
    </section>
  );
}

/** Full-bleed image band. */
export function WideImage({ image, height = "h-[80vh]" }: { image: Img; height?: string }) {
  return <ParallaxImage image={image} className={`w-full ${height}`} sizes="100vw" amount={10} />;
}

/** "More about us" 4-up strip with title. */
export function FourUp({
  title,
  items,
  tone = "light",
}: {
  title: React.ReactNode;
  items: { image: Img; label: string; href: string }[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section className={`relative py-[14vh] ${dark ? "bg-volcanic text-white" : "bg-white text-atlantic"}`}>
      <GridLines tone={dark ? "light" : "dark"} />
      <div className="relative z-10">
        <SectionTitle tone={dark ? "light" : "dark"}>{title}</SectionTitle>
        <ul className="mt-[12vh] grid grid-cols-2 gap-0 px-5 md:grid-cols-4">
          {items.map((it) => (
            <li key={it.href + it.label}>
              <Link href={it.href} className="group relative block aspect-[3/5] overflow-hidden">
                <Image src={it.image.src} alt={it.image.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                <span className="absolute inset-0 bg-volcanic/0 transition-colors duration-500 group-hover:bg-volcanic/30" />
                <span className="t-eyebrow absolute bottom-5 left-5 right-5 text-white opacity-90">{it.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Light panel with italic title on the left and a ruled bullet list on the right. */
export function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="relative bg-white py-[12vh] text-atlantic">
      <GridLines />
      <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
        <Reveal className="col-span-4 grid grid-cols-1 gap-8 rounded-[2px] bg-glacier p-8 md:col-span-6 md:col-start-2 md:grid-cols-2 md:p-10">
          <h2 className="t-eyebrow text-[22px]">{title}</h2>
          <ul>
            {items.map((a) => (
              <li key={a} className="flex gap-3 border-b border-atlantic/10 py-2.5 text-[13px] font-medium first:pt-0">
                <span aria-hidden className="mt-[0.55em] h-px w-2 shrink-0 bg-atlantic/60" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Centred italic quote on white or over an image. */
export function QuoteBand({
  text,
  author,
  image,
  flag,
}: {
  text: string;
  author: string;
  image?: Img;
  flag?: React.ReactNode;
}) {
  return (
    <section className={`relative flex items-center justify-center px-6 py-[18vh] text-center ${image ? "min-h-[100svh] text-white" : "bg-white text-atlantic"}`}>
      {image ? (
        <>
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-atlantic/40" />
        </>
      ) : null}
      <GridLines tone={image ? "light" : "dark"} />
      <Reveal className="relative z-10 max-w-[32rem]">
        <span aria-hidden className="t-eyebrow block text-[22px]">“</span>
        <blockquote className="t-quote mt-2">{text}</blockquote>
        <p className="mt-5 font-display text-[11px] uppercase tracking-[0.25em]">
          <span aria-hidden className="block">-</span>
          {author}
        </p>
        {flag ? <div className="mt-3">{flag}</div> : null}
      </Reveal>
    </section>
  );
}
