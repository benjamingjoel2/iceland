import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, postBySlug } from "@/data/posts";
import { brand } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GridLines } from "@/components/ui/GridLines";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.excerpt, path: `/journal/${p.slug}`, image: p.hero.src });
}

export default async function PostPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const meta = postBySlug(slug);
  if (!meta) notFound();
  const { default: Post } = await import(`@/content/journal/${slug}.mdx`);
  const next = posts[(posts.findIndex((p) => p.slug === slug) + 1) % posts.length];
  const date = new Date(meta.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    image: new URL(meta.hero.src, brand.url).toString(),
    publisher: { "@type": "Organization", name: brand.name },
  };

  return (
    <>
      <PageHero image={meta.hero} eyebrow="Journal" title={meta.title} intro={`${date} · ${meta.readingTime}`} />
      <section className="relative bg-white py-[14vh] text-atlantic">
        <GridLines />
        <div className="relative z-10 grid grid-cols-4 gap-5 px-5 md:grid-cols-12">
          <article className="prose-north col-span-4 md:col-span-6 md:col-start-4">
            <p className="font-serif text-[1.5rem] italic leading-snug">{meta.excerpt}</p>
            <Post />
          </article>
        </div>
        <div className="relative z-10 mt-[12vh] text-center">
          <p className="t-eyebrow text-slate">Next</p>
          <Link href={`/journal/${next.slug}`} className="t-h3 mt-2 inline-block hover:text-aurora">{next.title}</Link>
        </div>
      </section>
      <CtaBanner image={meta.hero} title="Plan your journey north" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
