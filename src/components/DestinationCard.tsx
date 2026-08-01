import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { Link } from "react-router-dom";
import type { Destination } from "../data";
import "./DestinationCard.css";

type DestinationCardProps = {
  destination: Destination;
  variant?: "featured" | "grid";
  autoPlay?: boolean;
};

export function DestinationCard({
  destination,
  variant = "grid",
  autoPlay = true,
}: DestinationCardProps) {
  const images = destination.images;
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [autoPlay, images.length]);

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

  return (
    <article
      className={`dest-card dest-card--${variant}`}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div
        className="dest-card__media"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, i) => (
          <img
            key={`${destination.slug}-${i}`}
            src={src}
            alt=""
            className={i === index ? "is-active" : undefined}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}

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

        <Link
          className="dest-card__cta"
          to={`/destinos/${destination.slug}`}
        >
          Ver destino
        </Link>
      </div>

      <div className="dest-card__body">
        <h3>
          <Link to={`/destinos/${destination.slug}`}>{title}</Link>
        </h3>
        <p>{destination.blurb}</p>
      </div>
    </article>
  );
}
