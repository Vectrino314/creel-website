import { useState } from "react";
import { Breadcrumbs } from "../Breadcrumbs";
import { FadeIn } from "../FadeIn";
import { ResponsiveImg } from "../ResponsiveImg";
import { CONTACT } from "../../clientData";
import type { ResolvedPackage } from "../../lib/resolveMedia";
import "./PackageDetailPage.css";

type PackageDetailPageProps = {
  pkg: ResolvedPackage;
};

export function PackageDetailPage({ pkg }: PackageDetailPageProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const activeImage = pkg.images[imageIndex] ?? pkg.images[0];

  const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hola, me interesa el paquete ${pkg.name}.`,
  )}`;

  if (!activeImage) return null;

  return (
    <article className="package-detail">
      <div className="package-detail__hero">
        <ResponsiveImg
          {...activeImage}
          alt=""
          loading="eager"
          fetchPriority="high"
        />
        <div className="package-detail__hero-shade" />
        <div className="container package-detail__hero-copy">
          <FadeIn>
            <Breadcrumbs
              items={[
                { label: "Inicio", to: "/" },
                { label: "Paquetes", to: "/paquetes" },
                { label: pkg.name },
              ]}
            />
            <span className="package-detail__tag">{pkg.duration}</span>
            <h1>{pkg.name}</h1>
            <p className="package-detail__departures">{pkg.departures}</p>
          </FadeIn>
        </div>
      </div>

      <div className="container package-detail__layout">
        <FadeIn className="package-detail__main">
          {pkg.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}

          <h2 className="package-detail__highlights-title">Incluye</h2>
          <ul className="package-detail__highlights">
            {pkg.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="package-detail__actions">
            <a className="package-detail__primary" href="/#contacto">
              Planifica tu viaje
            </a>
            <a
              className="package-detail__secondary"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a className="package-detail__ghost" href="/paquetes">
              ← Todos los paquetes
            </a>
          </div>
        </FadeIn>

        <FadeIn className="package-detail__gallery" delay={1}>
          <div className="package-detail__gallery-main">
            <ResponsiveImg {...activeImage} loading="lazy" />
          </div>
          {pkg.images.length > 1 && (
            <div className="package-detail__thumbs" role="list">
              {pkg.thumbs.map((thumb, i) => (
                <button
                  key={`${pkg.slug}-thumb-${i}`}
                  type="button"
                  className={i === imageIndex ? "is-active" : undefined}
                  onClick={() => setImageIndex(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                >
                  <ResponsiveImg {...thumb} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </article>
  );
}
