import { Scribble } from "@/components/ui/Scribble";
import { Reveal } from "@/components/motion/Reveal";

/** Centred uppercase serif title with our hand-drawn scribble beneath. */
export function SectionTitle({
  children,
  tone = "dark",
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-fit px-5 text-center ${className}`}>
      <Reveal>
        <Tag className={`t-h2 relative z-10 ${tone === "light" ? "text-white" : "text-atlantic"}`}>{children}</Tag>
      </Reveal>
      <Scribble tone={tone} className="absolute -bottom-10 left-[-12%] h-14 w-[124%]" />
    </div>
  );
}
