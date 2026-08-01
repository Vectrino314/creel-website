import type { OptimizedImage } from "../lib/images";

type ResponsiveImgProps = OptimizedImage & {
  className?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "auto" | "sync";
  /** Hint for LCP images. Passed as lowercase `fetchpriority` for React 18. */
  fetchPriority?: "high" | "low" | "auto";
};

export function ResponsiveImg({
  src,
  srcSet,
  sizes,
  width,
  height,
  alt,
  className,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
}: ResponsiveImgProps) {
  return (
    <img
      src={src}
      srcSet={srcSet || undefined}
      sizes={srcSet ? sizes : undefined}
      width={width}
      height={height}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      // React 18 does not recognize camelCase fetchPriority on DOM nodes
      {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
    />
  );
}
