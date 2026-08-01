import { FadeIn } from "./FadeIn";
import { ResponsiveImg } from "./ResponsiveImg";
import type { ResolvedDestination } from "../lib/resolveMedia";
import "./Destinations.css";

type DestinationsProps = {
  destinations: ResolvedDestination[];
};

export function Destinations({ destinations }: DestinationsProps) {
  const featured =
    destinations.find((d) => d.featured) ?? destinations[0];
  if (!featured) return null;

  const preview = [
    featured,
    ...destinations.filter((d) => d.slug !== featured.slug).slice(0, 4),
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
        {preview.map((dest, i) => {
          const cover = dest.images[0];
          if (!cover) return null;
          return (
            <FadeIn
              key={dest.slug}
              as="article"
              className="destination"
              delay={(i % 3) as 0 | 1 | 2}
            >
              <a href={`/destinos/${dest.slug}`} className="destination__link">
                <div className="destination__image">
                  <ResponsiveImg {...cover} loading="lazy" />
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
              </a>
            </FadeIn>
          );
        })}
      </div>

      <div className="container destinations__cta-wrap">
        <FadeIn>
          <a className="destinations__cta" href="/destinos">
            Ver todos los destinos
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
