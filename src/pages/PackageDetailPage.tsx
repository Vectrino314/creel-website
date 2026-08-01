import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FadeIn } from "../components/FadeIn";
import { CONTACT, getPackageBySlug } from "../data";
import "./PackageDetailPage.css";

export function PackageDetailPage() {
  const { slug = "" } = useParams();
  const pkg = getPackageBySlug(slug);
  const [imageIndex, setImageIndex] = useState(0);

  if (!pkg) {
    return <Navigate to="/paquetes" replace />;
  }

  const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hola, me interesa el paquete ${pkg.name}.`,
  )}`;

  return (
    <article className="package-detail">
      <div className="package-detail__hero">
        <img src={pkg.images[imageIndex] ?? pkg.images[0]} alt="" />
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

          <ul className="package-detail__highlights">
            {pkg.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="package-detail__actions">
            <Link className="package-detail__primary" to="/#contacto">
              Planifica tu viaje
            </Link>
            <a
              className="package-detail__secondary"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <Link className="package-detail__ghost" to="/paquetes">
              ← Todos los paquetes
            </Link>
          </div>
        </FadeIn>

        <FadeIn className="package-detail__gallery" delay={1}>
          <div className="package-detail__gallery-main">
            <img
              src={pkg.images[imageIndex] ?? pkg.images[0]}
              alt={`${pkg.name} — imagen ${imageIndex + 1}`}
            />
          </div>
          {pkg.images.length > 1 && (
            <div className="package-detail__thumbs" role="list">
              {pkg.images.map((src, i) => (
                <button
                  key={`${pkg.slug}-thumb-${i}`}
                  type="button"
                  className={i === imageIndex ? "is-active" : undefined}
                  onClick={() => setImageIndex(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </article>
  );
}
