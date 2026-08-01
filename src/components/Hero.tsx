import { useEffect, useState } from "react";
import { HERO_SLIDES } from "../data";
import "./Hero.css";

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  const slide = HERO_SLIDES[index] ?? HERO_SLIDES[0];

  return (
    <section id="inicio" className="hero" aria-label="Inicio">
      {HERO_SLIDES.map((item, i) => (
        <div
          key={item.title}
          className={`hero__slide${i === index ? " is-active" : ""}`}
          aria-hidden={i !== index}
        >
          <div
            className="hero__bg"
            style={{ backgroundImage: `url(${item.image})` }}
          />
        </div>
      ))}
      <div className="hero__veil" />

      <div className="hero__content container">
        <p className="hero__brand">Incentitours</p>
        <h1 key={slide.title} className="hero__title">
          {slide.title}
        </h1>
        <p key={slide.subtitle} className="hero__subtitle">
          {slide.subtitle}
        </p>
        <div className="hero__actions">
          <a className="btn btn-primary" href="#paquetes">
            Ver paquetes
          </a>
          <a className="btn btn-ghost" href="#experiencias">
            Descubrir experiencias
          </a>
        </div>
      </div>

      <div className="hero__dots" role="tablist" aria-label="Diapositivas">
        {HERO_SLIDES.map((item, i) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Ir a ${item.title}`}
            className={i === index ? "is-active" : undefined}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <a href="#experiencias" className="hero__scroll" aria-label="Bajar">
        <span />
      </a>
    </section>
  );
}
