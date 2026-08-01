import { useEffect, useState } from "react";
import type { ResolvedHeroSlide } from "../lib/resolveMedia";
import { ResponsiveImg } from "./ResponsiveImg";
import "./Hero.css";

type HeroProps = {
  slides: ResolvedHeroSlide[];
};

export function Hero({ slides }: HeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const slide = slides[index] ?? slides[0];
  if (!slide) return null;

  return (
    <section id="inicio" className="hero" aria-label="Inicio">
      {slides.map((item, i) => (
        <div
          key={item.title}
          className={`hero__slide${i === index ? " is-active" : ""}`}
          aria-hidden={i !== index}
        >
          <ResponsiveImg
            {...item.image}
            className="hero__bg"
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
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
          <a className="btn btn-primary" href="/paquetes">
            Ver paquetes
          </a>
          <a className="btn btn-ghost" href="#experiencias">
            Descubrir experiencias
          </a>
        </div>
      </div>

      <div className="hero__dots" role="tablist" aria-label="Diapositivas">
        {slides.map((item, i) => (
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
