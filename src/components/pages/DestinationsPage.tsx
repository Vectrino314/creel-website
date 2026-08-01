import { FadeIn } from "../FadeIn";
import { Breadcrumbs } from "../Breadcrumbs";
import { DestinationCard } from "../DestinationCard";
import { getFeaturedDestination, getGridDestinations } from "../../data";
import "./DestinationsPage.css";

export function DestinationsPage() {
  const featured = getFeaturedDestination();
  const grid = getGridDestinations();

  return (
    <section className="destinations-page">
      <div className="container destinations-page__intro">
        <FadeIn>
          <Breadcrumbs
            items={[
              { label: "Inicio", to: "/" },
              { label: "Destinos" },
            ]}
          />
          <span className="eyebrow">Destinos</span>
          <h1 className="section-title">Principales destinos</h1>
          <p className="section-lead">
            De Chihuahua a Sinaloa, una ruta pensada para descubrir cañones,
            pueblos mágicos y culturas vivas. Explora cada destino y arma tu
            experiencia con Incentitours.
          </p>
        </FadeIn>
      </div>

      <div className="container-wide destinations-page__content">
        <FadeIn className="destinations-page__featured">
          <DestinationCard destination={featured} variant="featured" />
        </FadeIn>

        <div className="destinations-page__grid">
          {grid.map((dest, i) => (
            <FadeIn
              key={dest.slug}
              delay={(i % 3) as 0 | 1 | 2}
            >
              <DestinationCard destination={dest} variant="grid" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
