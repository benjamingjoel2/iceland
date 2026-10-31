import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { legalDocs, legalBySlug } from "@/data/legal";
import { pageMetadata } from "@/lib/seo";
import { GridLines } from "@/components/ui/GridLines";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocs.map((d) => ({ doc: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[doc]">): Promise<Metadata> {
  const { doc } = await params;
  const d = legalBySlug(doc);
  if (!d) return {};
  return { ...pageMetadata({ title: d.title, description: `${d.title} for Edge of North.`, path: `/legal/${d.slug}` }), robots: { index: false } };
}

export default async function LegalPage({ params }: PageProps<"/legal/[doc]">) {
  const { doc } = await params;
  const d = legalBySlug(doc);
  if (!d) notFound();
  return (
    <div className="relative bg-volcanic">
      <section className="relative bg-white pb-[14vh] pt-[22vh] text-atlantic">
        <GridLines />
        <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
          <nav aria-label="Legal" className="col-span-4 md:col-span-2 md:col-start-2">
            <ul className="space-y-2 md:sticky md:top-28">
              {legalDocs.map((x) => (
                <li key={x.slug}>
                  <Link href={`/legal/${x.slug}`} aria-current={x.slug === d.slug ? "page" : undefined} className={`t-eyebrow text-[17px] ${x.slug === d.slug ? "text-aurora" : "hover:text-aurora"}`}>
                    {x.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <article className="prose-north col-span-4 md:col-span-6 md:col-start-5">
            <h1 className="t-h1">{d.title}</h1>
            <p className="t-small text-slate">Last updated {d.updated}</p>
            {d.sections.map((s) => (
              <section key={s.h}>
                <h2>{s.h}</h2>
                {s.p.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
}
