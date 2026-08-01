import { FadeIn } from "./FadeIn";
import { HOTEL, SERVICES } from "../data";
import "./Services.css";

export function Services() {
  return (
    <section id="servicios" className="services">
      <div className="container">
        <FadeIn className="services__intro">
          <span className="eyebrow">Servicios</span>
          <h2 className="section-title">Todo lo que necesitas en ruta</h2>
          <p className="section-lead">
            Del boleto del Chepe a la logística de un congreso: operación
            propia, guías certificados y un hotel en Creel para que solo te
            preocupes por disfrutar.
          </p>
        </FadeIn>

        <ul className="services__grid">
          {SERVICES.map((service, i) => (
            <FadeIn
              key={service.title}
              as="li"
              className="service-item"
              delay={(i % 3) as 0 | 1 | 2}
            >
              <span className="service-item__index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="service-item__body">
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
              </div>
            </FadeIn>
          ))}
        </ul>
      </div>

      <FadeIn className="services__hotel">
        <div className="container services__hotel-inner">
          <div className="services__hotel-copy">
            <span className="eyebrow services__hotel-eyebrow">Hotel propio</span>
            <h3>{HOTEL.title}</h3>
            <p>{HOTEL.detail}</p>
          </div>
          <a
            className="services__hotel-cta"
            href={HOTEL.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visitar el Lodge
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
