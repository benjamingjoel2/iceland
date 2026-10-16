import Link from "next/link";
import Image from "next/image";
import { images } from "@/data/images";

export default function NotFound() {
  return (
    <section className="relative flex h-[100svh] items-center justify-center overflow-hidden text-center text-white">
      <Image src={images.fog.src} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-atlantic/45" />
      <div className="relative z-10 px-6">
        <p className="t-eyebrow text-[20px]">Where the map runs out</p>
        <h1 className="t-display mt-2">Page not found</h1>
        <Link href="/" className="mt-8 inline-flex h-11 items-center border-y border-white/40 px-6 text-[13px] font-medium hover:bg-white hover:text-atlantic">
          Return home
        </Link>
      </div>
    </section>
  );
}
