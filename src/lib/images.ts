import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

export type OptimizedImage = {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  alt: string;
};

export type ImagePreset = "hero" | "card" | "detail" | "thumb" | "logo" | "og" | "partner";

const PRESETS: Record<
  ImagePreset,
  {
    widths: number[];
    width: number;
    height?: number;
    sizes: string;
    quality: number;
    fit?: "cover" | "contain" | "fill" | "inside" | "outside";
  }
> = {
  hero: {
    widths: [768, 1280, 1920],
    width: 1920,
    sizes: "100vw",
    quality: 78,
  },
  card: {
    widths: [400, 800],
    width: 800,
    sizes: "(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 400px",
    quality: 75,
  },
  detail: {
    widths: [900, 1400],
    width: 1400,
    sizes: "(max-width: 900px) 100vw, 700px",
    quality: 78,
  },
  thumb: {
    widths: [160, 320],
    width: 320,
    sizes: "96px",
    quality: 70,
  },
  logo: {
    widths: [160, 320],
    width: 320,
    sizes: "160px",
    quality: 85,
  },
  og: {
    widths: [1200],
    width: 1200,
    height: 630,
    sizes: "1200px",
    quality: 80,
    fit: "cover",
  },
  partner: {
    widths: [200, 400],
    width: 400,
    sizes: "160px",
    quality: 80,
  },
};

function srcSetAttribute(
  srcSet: string | { attribute?: string; values?: unknown },
): string {
  if (typeof srcSet === "string") return srcSet;
  return srcSet?.attribute ?? "";
}

export async function optimizeImage(
  src: ImageMetadata,
  alt: string,
  preset: ImagePreset = "card",
): Promise<OptimizedImage> {
  const config = PRESETS[preset];
  const result = await getImage({
    src,
    width: config.width,
    ...(config.height ? { height: config.height } : {}),
    widths: config.widths,
    format: "webp",
    quality: config.quality,
    ...(config.fit ? { fit: config.fit } : {}),
  });

  return {
    src: result.src,
    srcSet: srcSetAttribute(result.srcSet),
    sizes: config.sizes,
    width: result.attributes.width ?? config.width,
    height: result.attributes.height ?? config.height ?? config.width,
    alt,
  };
}
