import { SITE_NAME, SITE_URL } from "../site";
import type { Destination, Package } from "../data";
import { CONTACT } from "../data";

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
      ...(item.path
        ? { item: absoluteUrl(item.path) }
        : {}),
    })),
  };
}

export function travelAgencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Empresa transnacional con experiencias culturales, de naturaleza y aventura en Barrancas del Cobre, Chepe Express y el norte de México.",
    telephone: CONTACT.chihuahua.phones[0],
    email: CONTACT.chihuahua.emails[0],
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

export function touristDestinationJsonLd(destination: Destination) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.featuredTitle ?? destination.name,
    description: destination.blurb,
    url: absoluteUrl(`/destinos/${destination.slug}`),
    touristType: destination.tag,
    address: {
      "@type": "PostalAddress",
      addressLocality: destination.location,
      addressCountry: "MX",
    },
  };
}

export function touristTripJsonLd(pkg: Package) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.name,
    description: pkg.summary,
    url: absoluteUrl(`/paquetes/${pkg.slug}`),
    itinerary: pkg.body.join(" "),
    touristType: "Adventure, Cultural, Nature",
    provider: {
      "@type": "TravelAgency",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
