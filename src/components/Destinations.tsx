import { Link } from "react-router-dom";
import { FadeIn } from "./FadeIn";
import { DESTINATIONS, getFeaturedDestination } from "../data";
import "./Destinations.css";

export function Destinations() {
  const featured = getFeaturedDestination();
  const preview = [
    featured,
    ...DESTINATIONS.filter((d) => d.slug !== featured.slug).slice(0, 4),
  ];

  return (
    <section id="destinos" className="destinations">
      <div className="container destinations__intro">
        <FadeIn>
          <span className="eyebrow">Destinos</span>
          <h2 className="section-title">Principales destinos</h2>
          <p className="section-lead">
            De Chihuahua a Sinaloa, una ruta pensada para descubrir cañones,
            pueblos mágicos y culturas vivas.
          </p>
        </FadeIn>
      </div>

      <div className="destinations__grid container-wide">
        {preview.map((dest, i) => (
          <FadeIn
            key={dest.slug}
            as="article"
            className="destination"
            delay={(i % 3) as 0 | 1 | 2}
          >
            <Link to={`/destinos/${dest.slug}`} className="destination__link">
              <div className="destination__image">
                <img
                  src={dest.images[0]}
                  alt=""
                  loading="lazy"
                />
                {dest.featured && (
                  <span className="destination__featured-badge">
                    Parque de Aventura
                  </span>
                )}
              </div>
              <div className="destination__body">
                <span className="destination__tag">{dest.tag}</span>
                <h3>
                  {dest.featured && dest.featuredTitle
                    ? dest.featuredTitle
                    : dest.name}
                </h3>
                <p>{dest.blurb}</p>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      <div className="container destinations__cta-wrap">
        <FadeIn>
          <Link className="destinations__cta" to="/destinos">
            Ver todos los destinos
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
