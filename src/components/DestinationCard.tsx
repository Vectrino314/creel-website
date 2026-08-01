import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import type { ResolvedDestination } from "../lib/resolveMedia";
import { ResponsiveImg } from "./ResponsiveImg";
import "./DestinationCard.css";

type DestinationCardProps = {
  destination: ResolvedDestination;
  variant?: "featured" | "grid";
};

export function DestinationCard({
  destination,
  variant = "grid",
}: DestinationCardProps) {
  const images = destination.images;
  const additionalLinks = destination.additionalLinks ?? [];
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isHovered || images.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [isHovered, images.length]);

  const goTo = (next: number) => {
    setIndex(((next % images.length) + images.length) % images.length);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      goTo(delta < 0 ? index + 1 : index - 1);
    }
    touchStartX.current = null;
  };

  const title =
    variant === "featured" && destination.featuredTitle
      ? destination.featuredTitle
      : destination.name;

  const activeImage = images[index] ?? images[0];
  if (!activeImage) return null;

  return (
    <article
      className={`dest-card dest-card--${variant}`}
      onKeyDown={onKeyDown}
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsHovered(false);
        }
      }}
    >
      <div
        className="dest-card__media"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <ResponsiveImg
          key={`${destination.slug}-${index}`}
          {...activeImage}
          className="is-active"
          loading={index === 0 ? "eager" : "lazy"}
        />

        {images.length > 1 && (
          <div className="dest-card__segments" aria-hidden="true">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === index ? "is-active" : undefined}
                onClick={() => goTo(i)}
                tabIndex={-1}
              />
            ))}
          </div>
        )}

        <div className="dest-card__badges">
          <span className="dest-card__badge">{destination.tag}</span>
          <span className="dest-card__badge dest-card__badge--muted">
            {destination.location}
          </span>
        </div>

        {images.length > 1 && (
          <div className="dest-card__controls">
            <button
              type="button"
              aria-label="Imagen anterior"
              onClick={() => goTo(index - 1)}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Imagen siguiente"
              onClick={() => goTo(index + 1)}
            >
              ›
            </button>
          </div>
        )}

        <div className="dest-card__ctas">
          <a
            className="dest-card__cta"
            href={`/destinos/${destination.slug}`}
          >
            Ver destino
          </a>
          {additionalLinks.map((link) => (
            <a
              key={link.href}
              className="dest-card__cta dest-card__cta--external"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="dest-card__body">
        <h3>
          <a href={`/destinos/${destination.slug}`}>{title}</a>
        </h3>
        <p>{destination.blurb}</p>
      </div>
    </article>
  );
}
