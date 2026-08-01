import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FadeIn } from "../components/FadeIn";
import { PACKAGES } from "../data";
import "./PackagesPage.css";

export function PackagesPage() {
  return (
    <section className="packages-page">
      <div className="container packages-page__intro">
        <FadeIn>
          <Breadcrumbs
            items={[
              { label: "Inicio", to: "/" },
              { label: "Paquetes" },
            ]}
          />
          <span className="eyebrow">Paquetes</span>
          <h1 className="section-title">Elige tu ritmo</h1>
          <p className="section-lead">
            De escapes express a semanas en la Sierra. Cada ruta incluye
            logística, guías y la experiencia Chepe.
          </p>
        </FadeIn>
      </div>

      <div className="packages-page__list container">
        {PACKAGES.map((pkg, i) => (
          <FadeIn
            key={pkg.slug}
            as="article"
            className="packages-page__card"
            delay={(i % 3) as 0 | 1 | 2}
          >
            <Link to={`/paquetes/${pkg.slug}`} className="packages-page__link">
              <div className="packages-page__image">
                <img src={pkg.images[0]} alt="" loading="lazy" />
              </div>
              <div className="packages-page__body">
                <div className="packages-page__meta">
                  <span className="packages-page__duration">{pkg.duration}</span>
                  <span className="packages-page__departures">
                    {pkg.departures}
                  </span>
                </div>
                <h2>{pkg.name}</h2>
                <p>{pkg.summary}</p>
                <span className="packages-page__cta">Ver itinerario</span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
