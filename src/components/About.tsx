import { FadeIn } from "./FadeIn";
import { ResponsiveImg } from "./ResponsiveImg";
import type { OptimizedImage } from "../lib/images";
import "./About.css";

type AboutProps = {
  image: OptimizedImage;
};

export function About({ image }: AboutProps) {
  return (
    <section id="nosotros" className="about">
      <div className="about__media">
        <ResponsiveImg {...image} loading="lazy" />
      </div>
      <div className="about__content">
        <FadeIn>
          <span className="eyebrow">Nosotros</span>
          <h2 className="section-title">Incentitours, LLC.</h2>
          <p>
            Somos una empresa transnacional, de ideas jóvenes, que ofrece
            experiencias de interés cultural, de naturaleza y aventura, así
            como visitas guiadas. Contamos con certificaciones para la atención
            y manejo de turismo extranjero.
          </p>
          <p>
            Desde 1999 operamos el circuito Creel–Barrancas del Cobre–Mar de
            Cortés, cruzando fronteras con viajeros de México, Estados Unidos y
            Canadá: dos países, tres culturas, en un mismo viaje.
          </p>
        </FadeIn>

        <div className="about__values">
          <FadeIn delay={1}>
            <h3>Misión</h3>
            <p>
              Servicio personalizado, respuestas rápidas y viajes únicos que
              superen expectativas — para empresas y viajeros individuales.
            </p>
          </FadeIn>
          <FadeIn delay={2}>
            <h3>Valores</h3>
            <p>
              Responsabilidad, creatividad, pasión, transformación, calidad y
              competitividad.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
