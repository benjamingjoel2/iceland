import { GridLines } from "@/components/ui/GridLines";
import { Reveal } from "@/components/motion/Reveal";

/** Italic eyebrow + large uppercase serif statement with a four-column first-line indent. */
export function IntroStatement({ eyebrow, text }: { eyebrow: string; text: string }) {
  return (
    <section className="relative z-10 -mt-[10vh] bg-white pb-[18vh] text-atlantic md:pb-[26vh]">
      <GridLines />
      <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
        <div className="col-span-4 md:col-span-6 md:col-start-3">
          <Reveal>
            <p className="t-eyebrow mb-4 text-[15px]">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-h3 [text-indent:33%]">{text}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
