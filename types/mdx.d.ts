declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { PostMeta } from "@/data/types";
  export const metadata: PostMeta;
  export default function MDXContent(props: MDXProps): React.JSX.Element;
}
