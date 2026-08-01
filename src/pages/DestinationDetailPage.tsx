import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FadeIn } from "../components/FadeIn";
import { CONTACT, getDestinationBySlug } from "../data";
import "./DestinationDetailPage.css";

export function DestinationDetailPage() {
  const { slug = "" } = useParams();
  const destination = getDestinationBySlug(slug);
  const [imageIndex, setImageIndex] = useState(0);

  if (!destination) {
    return <Navigate to="/destinos" replace />;
  }

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

          <ul className="destination-detail__highlights">
            {destination.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="destination-detail__actions">
            <Link className="destination-detail__primary" to="/#contacto">
              Planifica tu viaje
            </Link>
            <a
              className="destination-detail__secondary"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <Link className="destination-detail__ghost" to="/destinos">
              ← Todos los destinos
            </Link>
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
        </FadeIn>
      </div>
    </article>
  );
}
