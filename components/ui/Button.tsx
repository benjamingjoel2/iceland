import Link from "next/link";

type Variant = "light" | "glass" | "accent" | "ghost" | "dark";

const styles: Record<Variant, string> = {
  light: "bg-glacier text-atlantic hover:bg-aurora hover:text-white",
  glass: "glass text-white hover:bg-aurora",
  accent: "bg-aurora text-white hover:bg-atlantic",
  ghost: "border border-white/40 text-white hover:bg-white hover:text-atlantic",
  dark: "bg-basalt text-white hover:bg-aurora",
};

export function buttonClass(variant: Variant = "light", size: "sm" | "md" | "lg" = "md") {
  const sizes = { sm: "h-9 px-4 text-[13px]", md: "h-12 px-6 text-sm", lg: "h-20 px-8 text-base" };
  return `inline-flex items-center justify-center gap-2 rounded-[2px] font-sans font-medium transition-colors duration-300 ${sizes[size]} ${styles[variant]}`;
}

export function ButtonLink({
  href,
  children,
  variant = "light",
  size = "md",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonClass(variant, size)} ${className}`}>
      {children}
    </Link>
  );
}
