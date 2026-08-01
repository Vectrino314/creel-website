import { useState } from "react";
import { FadeIn } from "./FadeIn";
import { TESTIMONIALS } from "../clientData";
import "./Testimonials.css";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = TESTIMONIALS[index] ?? TESTIMONIALS[0];

  const prev = () =>
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <FadeIn className="testimonials__intro">
          <span className="eyebrow">Testimonios</span>
          <h2 id="testimonials-title" className="section-title">
            Lo que piensan de nosotros
          </h2>
        </FadeIn>

        <FadeIn className="testimonials__stage" delay={1}>
          <blockquote key={item.name}>
            <p>“{item.quote}”</p>
            <footer>{item.name}</footer>
          </blockquote>

          <div className="testimonials__controls">
            <button type="button" onClick={prev} aria-label="Anterior">
              ←
            </button>
            <span>
              {index + 1} / {TESTIMONIALS.length}
            </span>
            <button type="button" onClick={next} aria-label="Siguiente">
              →
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
