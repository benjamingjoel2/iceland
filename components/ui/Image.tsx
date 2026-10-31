import NextImage, { type ImageProps } from "next/image";
import blur from "@/data/blur.json";

const blurMap = blur as Record<string, string>;

/** next/image with an instant blurred placeholder for every local photograph. */
export default function Image(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const blurDataURL = blurMap[src];
  if (blurDataURL && !props.placeholder) {
    return <NextImage placeholder="blur" blurDataURL={blurDataURL} {...props} />;
  }
  return <NextImage {...props} />;
}
