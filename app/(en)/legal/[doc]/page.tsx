import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { legalDocs, legalBySlug } from "@/data/legal";
import { pageMetadata } from "@/lib/seo";
import { GridLines } from "@/components/ui/GridLines";

export const dynamicParams = false;

/** Renders [label](/path) links inside a legal paragraph. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? (
          <Link key={i} href={m[2]} className="underline underline-offset-4 hover:text-aurora">
            {m[1]}
          </Link>
        ) : (
          part
        );
      })}
    </>
  );
}

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
                  <p key={p}>
                    <RichText text={p} />
                  </p>
                ))}
                {s.table && (
                  <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse text-left text-[15px] leading-snug">
                      <thead>
                        <tr>
                          {s.table.head.map((c) => (
                            <th key={c} scope="col" className="border-b border-atlantic/30 py-2 pr-4 align-bottom font-medium">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((r) => (
                          <tr key={r.join("|")}>
                            {r.map((c, i) => (
                              <td key={i} className="border-b border-atlantic/15 py-2 pr-4 align-top">
                                {c}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {s.after?.map((p) => (
                  <p key={p}>
                    <RichText text={p} />
                  </p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
}
