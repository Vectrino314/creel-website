import { FadeIn } from "./FadeIn";
import { PACKAGE_LIST } from "../clientData";
import "./Packages.css";

export function Packages() {
  return (
    <section id="paquetes" className="packages">
      <div className="container packages__intro">
        <FadeIn>
          <span className="eyebrow">Paquetes</span>
          <h2 className="section-title">Elige tu ritmo</h2>
          <p className="section-lead">
            De escapes express a semanas en la Sierra. Cada ruta incluye
            logística, guías y la experiencia Chepe.
          </p>
        </FadeIn>
      </div>

      <div className="packages__list container">
        {PACKAGE_LIST.map((pkg, i) => (
          <FadeIn
            key={pkg.slug}
            as="article"
            className="package"
            delay={(i % 3) as 0 | 1 | 2}
          >
            <div className="package__meta">
              <span className="package__duration">{pkg.duration}</span>
              <span className="package__departures">{pkg.departures}</span>
            </div>
            <h3>{pkg.name}</h3>
            <p>{pkg.summary}</p>
            <a className="package__cta" href={`/paquetes/${pkg.slug}`}>
              Ver itinerario
            </a>
          </FadeIn>
        ))}
      </div>

      <div className="container packages__cta-wrap">
        <FadeIn>
          <a className="packages__all" href="/paquetes">
            Ver todos los paquetes
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
