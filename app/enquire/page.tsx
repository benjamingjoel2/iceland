import Image from "next/image";
import { journeys } from "@/data/journeys";
import { images } from "@/data/images";
import { quotes } from "@/data/people";
import { pageMetadata } from "@/lib/seo";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { GridLines } from "@/components/ui/GridLines";
import { PlaceholderFlag } from "@/components/ui/Flag";

export const metadata = pageMetadata({
  title: "Start planning",
  description: "Tell us a little about your journey and your dedicated Edge of North specialist will be in touch within one working day.",
  path: "/enquire",
  image: images.auroraReflection.src,
});

export default async function EnquirePage({ searchParams }: PageProps<"/enquire">) {
  // Prefill from ?journey=slug (links on journey and price pages).
  const { journey } = await searchParams;
  const initial = journeys.find((j) => j.slug === journey)?.title ?? "";
  return (
    <div className="relative min-h-screen bg-volcanic text-white">
      <div className="fixed inset-0">
        <Image src={images.auroraReflection.src} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-volcanic/60" />
      </div>
      <GridLines tone="light" className="fixed" />
      <div className="relative z-10 px-5 pb-28 pt-[22vh]">
        <header className="mx-auto mb-[12vh] max-w-[36rem] text-center">
          <h1 className="t-h1">Start planning</h1>
          <p className="t-body mx-auto mt-6 max-w-[24rem] text-white/85">
            Share a few details and your dedicated specialist will be in touch within one working day to talk through your journey north.
          </p>
        </header>
        <EnquiryForm journeys={journeys.map((j) => ({ slug: j.slug, title: j.title }))} initialJourney={initial} />
        <figure className="mx-auto mt-[16vh] max-w-[26rem] text-center">
          <span aria-hidden className="t-eyebrow block text-[22px]">“</span>
          <blockquote className="t-quote mt-2">{quotes.enquire.text}</blockquote>
          <figcaption className="mt-4 font-display text-[11px] uppercase tracking-[0.25em] text-white/80">
            {quotes.enquire.author}
            <span className="mt-2 block"><PlaceholderFlag tone="dark" /></span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
