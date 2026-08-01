import { SITE_NAME, SITE_URL, SOCIAL } from "../site";
import type { Destination, Package } from "../data";
import { CONTACT } from "../clientData";

export type BreadcrumbItem = {
  label: string;
  path?: string;
};

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}` || SITE_URL;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

function socialSameAs(): string[] {
  return [SOCIAL.facebook, SOCIAL.instagram].filter(Boolean);
}

export function travelAgencyJsonLd(options?: {
  image?: string;
  logo?: string;
}) {
  const sameAs = socialSameAs();
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Empresa transnacional con experiencias culturales, de naturaleza y aventura en Barrancas del Cobre, Chepe Express y el norte de México.",
    telephone: CONTACT.chihuahua.phones[0],
    email: CONTACT.chihuahua.emails[0],
    ...(options?.image ? { image: options.image } : {}),
    ...(options?.logo ? { logo: options.logo } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "C. Alaska #2400, Col. Quintas del Sol",
        addressLocality: "Chihuahua",
        addressRegion: "Chihuahua",
        addressCountry: "MX",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "252 Northwind Dr.",
        addressLocality: "El Paso",
        addressRegion: "TX",
        addressCountry: "US",
      },
    ],
    areaServed: ["MX", "US", "CA"],
  };
}

export function touristDestinationJsonLd(
  destination: Destination,
  image?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.featuredTitle ?? destination.name,
    description: destination.blurb,
    url: absoluteUrl(`/destinos/${destination.slug}`),
    touristType: destination.tag,
    ...(image ? { image } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: destination.location,
      addressCountry: "MX",
    },
  };
}

export function touristTripJsonLd(pkg: Package, image?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.name,
    description: pkg.summary,
    url: absoluteUrl(`/paquetes/${pkg.slug}`),
    itinerary: pkg.body.join(" "),
    touristType: "Adventure, Cultural, Nature",
    ...(image ? { image } : {}),
    provider: {
      "@type": "TravelAgency",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
