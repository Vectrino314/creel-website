import type { ImageMetadata } from "astro";
import {
  ABOUT_IMAGE,
  ABOUT_IMAGE_ALT,
  CERTIFICATIONS,
  DESTINATIONS,
  EXPERIENCES,
  HERO_SLIDES,
  LOGO,
  PACKAGES,
  PARTNERS,
  type Destination,
  type Package,
  type Certification,
  type Partner,
} from "../data";
import { optimizeImage, type OptimizedImage } from "./images";

export type ResolvedHeroSlide = {
  title: string;
  subtitle: string;
  image: OptimizedImage;
};

export type ResolvedExperience = {
  eyebrow: string;
  title: string;
  description: string;
  image: OptimizedImage;
};

export type ResolvedDestination = Omit<Destination, "images"> & {
  images: OptimizedImage[];
  thumbs: OptimizedImage[];
};

export type ResolvedPackage = Omit<Package, "images"> & {
  images: OptimizedImage[];
  thumbs: OptimizedImage[];
};

export type ResolvedPartner = Omit<Partner, "logo"> & {
  logo: OptimizedImage;
};

export type ResolvedCertification = Omit<Certification, "logo"> & {
  logo: OptimizedImage;
};

export type HomeMedia = {
  heroSlides: ResolvedHeroSlide[];
  experiences: ResolvedExperience[];
  destinations: ResolvedDestination[];
  aboutImage: OptimizedImage;
  partners: ResolvedPartner[];
  certifications: ResolvedCertification[];
};

async function optimizeGallery(
  images: ImageMetadata[],
  primaryAlt: string,
  name: string,
): Promise<{ images: OptimizedImage[]; thumbs: OptimizedImage[] }> {
  const optimized = await Promise.all(
    images.map(async (image, index) => {
      const alt =
        index === 0 ? primaryAlt : `${name} — imagen ${index + 1}`;
      return {
        image: await optimizeImage(image, alt, "detail"),
        thumb: await optimizeImage(image, "", "thumb"),
      };
    }),
  );

  return {
    images: optimized.map((item) => item.image),
    thumbs: optimized.map((item) => item.thumb),
  };
}

export async function resolveDestination(
  destination: Destination,
  imagePreset: "card" | "detail" = "detail",
): Promise<ResolvedDestination> {
  if (imagePreset === "card") {
    const images = await Promise.all(
      destination.images.map(async (image, index) => {
        const alt =
          index === 0
            ? destination.imageAlt
            : `${destination.name} — imagen ${index + 1}`;
        return optimizeImage(image, alt, "card");
      }),
    );
    return { ...destination, images, thumbs: images };
  }

  const gallery = await optimizeGallery(
    destination.images,
    destination.imageAlt,
    destination.name,
  );
  return { ...destination, ...gallery };
}

export async function resolvePackage(
  pkg: Package,
  imagePreset: "card" | "detail" = "detail",
): Promise<ResolvedPackage> {
  if (imagePreset === "card") {
    const images = await Promise.all(
      pkg.images.map(async (image, index) => {
        const alt =
          index === 0 ? pkg.imageAlt : `${pkg.name} — imagen ${index + 1}`;
        return optimizeImage(image, alt, "card");
      }),
    );
    return { ...pkg, images, thumbs: images };
  }

  const gallery = await optimizeGallery(pkg.images, pkg.imageAlt, pkg.name);
  return { ...pkg, ...gallery };
}

export async function resolveHomeMedia(): Promise<HomeMedia> {
  const heroSlides = await Promise.all(
    HERO_SLIDES.map(async (slide) => ({
      title: slide.title,
      subtitle: slide.subtitle,
      image: await optimizeImage(slide.image, slide.alt, "hero"),
    })),
  );

  const experiences = await Promise.all(
    EXPERIENCES.map(async (item) => ({
      eyebrow: item.eyebrow,
      title: item.title,
      description: item.description,
      image: await optimizeImage(item.image, item.alt, "card"),
    })),
  );

  // Home preview only needs the cover image (keeps island props small).
  const destinations = await Promise.all(
    DESTINATIONS.map(async (destination) => {
      const cover = destination.images[0]!;
      const image = await optimizeImage(
        cover,
        destination.imageAlt,
        "card",
      );
      return {
        ...destination,
        images: [image],
        thumbs: [image],
      };
    }),
  );

  const aboutImage = await optimizeImage(ABOUT_IMAGE, ABOUT_IMAGE_ALT, "card");

  const partners = await Promise.all(
    PARTNERS.map(async (partner) => ({
      name: partner.name,
      logo: await optimizeImage(partner.logo, partner.name, "partner"),
    })),
  );

  const certifications = await Promise.all(
    CERTIFICATIONS.map(async (cert) => ({
      name: cert.name,
      blurb: cert.blurb,
      logo: await optimizeImage(cert.logo, cert.name, "partner"),
    })),
  );

  return {
    heroSlides,
    experiences,
    destinations,
    aboutImage,
    partners,
    certifications,
  };
}

export async function resolveAllDestinations(): Promise<ResolvedDestination[]> {
  return Promise.all(
    DESTINATIONS.map((destination) => resolveDestination(destination, "card")),
  );
}

export async function resolveAllPackages(): Promise<ResolvedPackage[]> {
  return Promise.all(PACKAGES.map((pkg) => resolvePackage(pkg, "card")));
}

export async function optimizeLogo(): Promise<OptimizedImage> {
  return optimizeImage(LOGO, "Incentitours", "logo");
}

export async function getDefaultOgImage(): Promise<OptimizedImage> {
  const slide = HERO_SLIDES[0]!;
  return optimizeImage(slide.image, slide.alt, "og");
}

export type BarrancasDepthMedia = {
  atmosphere: OptimizedImage;
  foreground: OptimizedImage;
  thumbs: OptimizedImage[];
};

export async function resolveBarrancasDepthMedia(): Promise<BarrancasDepthMedia> {
  const barrancas = HERO_SLIDES[0]!;
  const chepe = HERO_SLIDES[1]!;
  const cultura = HERO_SLIDES[2]!;

  const [atmosphere, foreground, thumbBarrancas, thumbChepe, thumbCultura] =
    await Promise.all([
      optimizeImage(barrancas.image, barrancas.alt, "hero"),
      optimizeImage(chepe.image, chepe.alt, "hero"),
      optimizeImage(barrancas.image, barrancas.alt, "thumb"),
      optimizeImage(chepe.image, chepe.alt, "thumb"),
      optimizeImage(cultura.image, cultura.alt, "thumb"),
    ]);

  return {
    atmosphere,
    foreground,
    thumbs: [thumbBarrancas, thumbChepe, thumbCultura],
  };
}

export type SierraRiseMedia = {
  logo: OptimizedImage;
  heroFrames: Array<{
    id: string;
    label: string;
    title: string;
    image: OptimizedImage;
    thumb: OptimizedImage;
  }>;
  moments: OptimizedImage[];
  packages: Array<{
    slug: string;
    name: string;
    summary: string;
    duration: string;
    image: OptimizedImage;
  }>;
  feature: OptimizedImage;
  stepsImage: OptimizedImage;
  cta: OptimizedImage;
  fan: OptimizedImage[];
};

export type CopperGroveMedia = {
  logo: OptimizedImage;
  heroFrames: Array<{
    id: string;
    label: string;
    title: string;
    image: OptimizedImage;
    thumb: OptimizedImage;
  }>;
  categories: Array<{
    slug: string;
    name: string;
    tag: string;
    image: OptimizedImage;
  }>;
  moods: Array<{
    id: string;
    label: string;
    filter: string;
    image: OptimizedImage;
  }>;
  packages: Array<{
    slug: string;
    name: string;
    summary: string;
    duration: string;
    image: OptimizedImage;
  }>;
  trust: OptimizedImage;
};

export async function resolveCopperGroveMedia(): Promise<CopperGroveMedia> {
  const barrancas = HERO_SLIDES[0]!;
  const chepe = HERO_SLIDES[1]!;
  const cultura = HERO_SLIDES[2]!;
  const featuredPkgs = PACKAGES.slice(0, 3);
  const categoryDests = DESTINATIONS.slice(0, 4);

  const [
    logo,
    heroBarrancas,
    heroChepe,
    heroCultura,
    trust,
    thumbBarrancas,
    thumbChepe,
    thumbCultura,
    aboutCard,
    ...rest
  ] = await Promise.all([
    optimizeImage(LOGO, "Incentitours", "logo"),
    optimizeImage(barrancas.image, barrancas.alt, "hero"),
    optimizeImage(chepe.image, chepe.alt, "hero"),
    optimizeImage(cultura.image, cultura.alt, "hero"),
    optimizeImage(chepe.image, chepe.alt, "detail"),
    optimizeImage(barrancas.image, barrancas.alt, "thumb"),
    optimizeImage(chepe.image, chepe.alt, "thumb"),
    optimizeImage(cultura.image, cultura.alt, "thumb"),
    optimizeImage(ABOUT_IMAGE, ABOUT_IMAGE_ALT, "card"),
    ...categoryDests.map((destination) =>
      optimizeImage(destination.images[0]!, destination.imageAlt, "card"),
    ),
    ...featuredPkgs.map((pkg) =>
      optimizeImage(pkg.images[0]!, pkg.imageAlt, "card"),
    ),
    optimizeImage(EXPERIENCES[0]!.image, EXPERIENCES[0]!.alt, "card"),
    optimizeImage(EXPERIENCES[1]!.image, EXPERIENCES[1]!.alt, "card"),
  ]);

  const categoryImages = rest.slice(0, categoryDests.length);
  const packageImages = rest.slice(
    categoryDests.length,
    categoryDests.length + featuredPkgs.length,
  );
  const moodExtras = rest.slice(categoryDests.length + featuredPkgs.length);

  return {
    logo,
    heroFrames: [
      {
        id: "barrancas",
        label: "Divisadero",
        title: "Miradores y cañones",
        image: heroBarrancas,
        thumb: thumbBarrancas,
      },
      {
        id: "chepe",
        label: "Chepe",
        title: "El tren de la Sierra",
        image: heroChepe,
        thumb: thumbChepe,
      },
      {
        id: "cultura",
        label: "Creel",
        title: "Cultura viva",
        image: heroCultura,
        thumb: thumbCultura,
      },
    ],
    categories: categoryDests.map((destination, index) => ({
      slug: destination.slug,
      name: destination.name,
      tag: destination.tag,
      image: categoryImages[index]!,
    })),
    moods: [
      {
        id: "barrancas",
        label: "Miradores",
        filter: "naturaleza",
        image: aboutCard,
      },
      {
        id: "chepe",
        label: "Chepe Express",
        filter: "tren",
        image: thumbChepe,
      },
      {
        id: "cultura",
        label: "Cultura viva",
        filter: "cultura",
        image: thumbCultura,
      },
      {
        id: "creel",
        label: "Creel",
        filter: "naturaleza",
        image: moodExtras[0] ?? thumbBarrancas,
      },
      {
        id: "aventura",
        label: "Aventura",
        filter: "aventura",
        image: moodExtras[1] ?? aboutCard,
      },
      {
        id: "sierra",
        label: "Sierra",
        filter: "naturaleza",
        image: thumbBarrancas,
      },
    ],
    packages: featuredPkgs.map((pkg, index) => ({
      slug: pkg.slug,
      name: pkg.name,
      summary: pkg.summary,
      duration: pkg.duration,
      image: packageImages[index]!,
    })),
    trust,
  };
}

export async function resolveSierraRiseMedia(): Promise<SierraRiseMedia> {
  const barrancas = HERO_SLIDES[0]!;
  const chepe = HERO_SLIDES[1]!;
  const cultura = HERO_SLIDES[2]!;
  const experience = EXPERIENCES[0]!;
  const featuredPkgs = PACKAGES.slice(0, 5);

  const [
    logo,
    heroBarrancas,
    heroChepe,
    heroCultura,
    thumbBarrancas,
    thumbChepe,
    thumbCultura,
    aboutCard,
    adventureCard,
    stepsImage,
    cta,
    ...packageImages
  ] = await Promise.all([
    optimizeImage(LOGO, "Incentitours", "logo"),
    optimizeImage(barrancas.image, barrancas.alt, "hero"),
    optimizeImage(chepe.image, chepe.alt, "hero"),
    optimizeImage(cultura.image, cultura.alt, "hero"),
    optimizeImage(barrancas.image, barrancas.alt, "thumb"),
    optimizeImage(chepe.image, chepe.alt, "thumb"),
    optimizeImage(cultura.image, cultura.alt, "thumb"),
    optimizeImage(ABOUT_IMAGE, ABOUT_IMAGE_ALT, "card"),
    optimizeImage(experience.image, experience.alt, "card"),
    optimizeImage(chepe.image, chepe.alt, "detail"),
    optimizeImage(barrancas.image, barrancas.alt, "detail"),
    ...featuredPkgs.map((pkg) =>
      optimizeImage(pkg.images[0]!, pkg.imageAlt, "card"),
    ),
  ]);

  return {
    logo,
    heroFrames: [
      {
        id: "barrancas",
        label: "Barrancas",
        title: "Miradores y cañones",
        image: heroBarrancas,
        thumb: thumbBarrancas,
      },
      {
        id: "chepe",
        label: "Chepe Express",
        title: "El tren de la Sierra",
        image: heroChepe,
        thumb: thumbChepe,
      },
      {
        id: "cultura",
        label: "Cultura",
        title: "Tres culturas vivas",
        image: heroCultura,
        thumb: thumbCultura,
      },
    ],
    moments: [
      aboutCard,
      adventureCard,
      thumbBarrancas,
      thumbChepe,
      thumbCultura,
      heroCultura,
    ],
    packages: featuredPkgs.map((pkg, index) => ({
      slug: pkg.slug,
      name: pkg.name,
      summary: pkg.summary,
      duration: pkg.duration,
      image: packageImages[index]!,
    })),
    feature: heroBarrancas,
    stepsImage,
    cta,
    fan: [thumbCultura, aboutCard, adventureCard, thumbChepe, thumbBarrancas],
  };
}
