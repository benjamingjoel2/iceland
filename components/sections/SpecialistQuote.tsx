import { GridLines } from "@/components/ui/GridLines";
import { PlaceholderFlag } from "@/components/ui/Flag";
import { Reveal } from "@/components/motion/Reveal";
import { Scribble } from "@/components/ui/Scribble";

/** Centred italic quote with a drawn "signature", name and role (from "your specialist"). */
export function SpecialistQuote({
  text,
  name,
  role,
  placeholder,
  tone = "light",
}: {
  text: string;
  name: string;
  role: string;
  placeholder?: boolean;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section className={`relative py-[18vh] ${dark ? "bg-volcanic text-white" : "bg-white text-atlantic"}`}>
      <GridLines tone={dark ? "light" : "dark"} />
      <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
        <figure className="col-span-4 md:col-span-4 md:col-start-5">
          <Reveal>
            <span aria-hidden className="t-eyebrow block text-[22px] leading-none">“</span>
            <blockquote className="t-quote mt-1 [text-indent:22%]">{text}</blockquote>
            <span aria-hidden className="mt-3 block">-</span>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative mt-10 h-16 w-56">
              <Scribble tone={dark ? "light" : "dark"} className="absolute inset-0 h-full w-full" />
            </div>
            <figcaption className="mt-3">
              <span className="block text-[13px] font-semibold">{name}</span>
              <span className={`block text-[13px] ${dark ? "text-white/60" : "text-slate"}`}>{role}</span>
              {placeholder ? (
                <span className="mt-2 inline-block">
                  <PlaceholderFlag label="Placeholder name & quote" tone={dark ? "dark" : "light"} />
                </span>
              ) : null}
            </figcaption>
          </Reveal>
        </figure>
      </div>
    </section>
  );
}
