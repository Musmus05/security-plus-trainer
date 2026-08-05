/**
 * Ambient types for MDX modules compiled by `@mdx-js/rollup`.
 * Lessons are authored as `.mdx` and imported as React components.
 */
declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types';

  const MDXComponent: (props: MDXProps) => React.JSX.Element;
  export default MDXComponent;
}
