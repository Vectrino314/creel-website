import { FadeIn } from "./FadeIn";
import { SERVICES } from "../data";
import "./Services.css";

export function Services() {
  return (
    <section id="servicios" className="services">
      <div className="container">
        <FadeIn className="services__intro">
          <span className="eyebrow">Servicios</span>
          <h2 className="section-title">Todo lo que necesitas en ruta</h2>
          <p className="section-lead">
            Operación propia, certificaciones y aliados para que solo te
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
              <h3>{service.title}</h3>
              <p>{service.detail}</p>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
