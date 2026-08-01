import { FadeIn } from "./FadeIn";
import { EXPERIENCES } from "../data";
import "./Experiences.css";

export function Experiences() {
  return (
    <section id="experiencias" className="experiences">
      <div className="container">
        <FadeIn className="experiences__intro">
          <span className="eyebrow">Experiencias</span>
          <h2 className="section-title">Viajes que se sienten</h2>
          <p className="section-lead">
            Naturaleza, tren y cultura en el norte de México — diseñados para
            viajeros que buscan algo más que un itinerario.
          </p>
        </FadeIn>
      </div>

      <div className="experiences__list">
        {EXPERIENCES.map((item, i) => (
          <article
            key={item.title}
            className={`experience-block${i % 2 === 1 ? " is-reversed" : ""}`}
          >
            <FadeIn className="experience-block__media" delay={(i % 3) as 0 | 1 | 2}>
              <img src={item.image} alt="" loading="lazy" />
            </FadeIn>
            <FadeIn className="experience-block__copy" delay={1}>
              <span className="eyebrow">{item.eyebrow}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href="/paquetes" className="text-link">
                Ver paquetes relacionados
              </a>
            </FadeIn>
          </article>
        ))}
      </div>
    </section>
  );
}
