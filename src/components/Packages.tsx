import { FadeIn } from "./FadeIn";
import { CONTACT, PACKAGES } from "../data";
import "./Packages.css";

export function Packages() {
  const wa = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hola Incentitours, me interesa información sobre un paquete a Barrancas del Cobre.",
  )}`;

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
        {PACKAGES.map((pkg, i) => (
          <FadeIn
            key={pkg.name}
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
            <a className="package__cta" href={wa} target="_blank" rel="noreferrer">
              Consultar por WhatsApp
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
