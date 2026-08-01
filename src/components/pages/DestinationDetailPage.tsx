import { useState } from "react";
import { Breadcrumbs } from "../Breadcrumbs";
import { FadeIn } from "../FadeIn";
import { CONTACT, type Destination } from "../../data";
import "./DestinationDetailPage.css";

type DestinationDetailPageProps = {
  destination: Destination;
};

export function DestinationDetailPage({ destination }: DestinationDetailPageProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hola, me interesa el destino ${destination.name}.`,
  )}`;

  return (
    <article className="destination-detail">
      <div className="destination-detail__hero">
        <img
          src={destination.images[imageIndex] ?? destination.images[0]}
          alt=""
        />
        <div className="destination-detail__hero-shade" />
        <div className="container destination-detail__hero-copy">
          <FadeIn>
            <Breadcrumbs
              items={[
                { label: "Inicio", to: "/" },
                { label: "Destinos", to: "/destinos" },
                { label: destination.name },
              ]}
            />
            <span className="destination-detail__tag">{destination.tag}</span>
            <h1>
              {destination.featuredTitle ?? destination.name}
            </h1>
            <p className="destination-detail__location">{destination.location}</p>
          </FadeIn>
        </div>
      </div>

      <div className="container destination-detail__layout">
        <FadeIn className="destination-detail__main">
          {destination.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}

          <h2 className="destination-detail__highlights-title">Destacados</h2>
          <ul className="destination-detail__highlights">
            {destination.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="destination-detail__actions">
            <a className="destination-detail__primary" href="/#contacto">
              Planifica tu viaje
            </a>
            <a
              className="destination-detail__secondary"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a className="destination-detail__ghost" href="/destinos">
              ← Todos los destinos
            </a>
          </div>
        </FadeIn>

        <FadeIn className="destination-detail__gallery" delay={1}>
          <div className="destination-detail__gallery-main">
            <img
              src={destination.images[imageIndex] ?? destination.images[0]}
              alt={`${destination.name} — imagen ${imageIndex + 1}`}
            />
          </div>
          {destination.images.length > 1 && (
            <div className="destination-detail__thumbs" role="list">
              {destination.images.map((src, i) => (
                <button
                  key={`${destination.slug}-thumb-${i}`}
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
          {destination.additionalLinks && destination.additionalLinks.length > 0 && (
            <div className="destination-detail__extra-links">
              {destination.additionalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </article>
  );
}
