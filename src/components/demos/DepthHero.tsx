import { useEffect, useRef, type CSSProperties } from "react";
import type { OptimizedImage } from "../../lib/images";
import { ResponsiveImg } from "../ResponsiveImg";
import "./DepthHero.css";

const RUNWAY_VH = 160;

type DepthHeroProps = {
  atmosphere: OptimizedImage;
  foreground: OptimizedImage;
  thumbs: OptimizedImage[];
};

const JOURNEY_FIELDS = [
  { label: "Destino", value: "Barrancas del Cobre", icon: "pin" },
  { label: "Experiencia", value: "Chepe Express", icon: "rail" },
  { label: "Cuándo", value: "Próxima salida", icon: "cal" },
  { label: "Viajeros", value: "2 adultos", icon: "people" },
] as const;

function FieldIcon({ name }: { name: (typeof JOURNEY_FIELDS)[number]["icon"] }) {
  if (name === "pin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="10" r="2.2" fill="currentColor" />
      </svg>
    );
  }
  if (name === "rail") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="4"
          y="7"
          width="16"
          height="8"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 15v3M16 15v3M4 11h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }
  if (name === "cal") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="4"
          y="5"
          width="16"
          height="15"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 3v4M16 3v4M4 10h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="9"
        cy="9"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="16"
        cy="10"
        r="2.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3.5 18.5c.8-2.4 2.7-3.7 5.5-3.7s4.7 1.3 5.5 3.7M14 14.8c1.7.2 3.1 1.1 3.8 2.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function DepthHero({ atmosphere, foreground, thumbs }: DepthHeroProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      stage.style.setProperty("--depth-p", "0.35");
      stage.style.setProperty("--fg-scale", "1.12");
      stage.style.setProperty("--type-y", "0px");
      stage.style.setProperty("--ui-fade", "1");
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const runway = window.innerHeight * (RUNWAY_VH / 100);
      const progress = Math.min(Math.max(window.scrollY / runway, 0), 1);
      const eased = 1 - (1 - progress) ** 1.45;

      stage.style.setProperty("--depth-p", String(progress));
      stage.style.setProperty("--fg-scale", String(1 + eased * 0.38));
      stage.style.setProperty("--type-y", `${-eased * 48}px`);
      stage.style.setProperty("--ui-fade", String(1 - Math.max(0, progress - 0.55) / 0.45));
      stage.style.setProperty("--atm-y", `${eased * 28}px`);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="depth-hero"
      ref={stageRef}
      style={
        {
          "--runway": `${RUNWAY_VH}vh`,
          "--depth-p": "0",
          "--fg-scale": "1",
          "--type-y": "0px",
          "--ui-fade": "1",
          "--atm-y": "0px",
        } as CSSProperties
      }
    >
      <div className="depth-hero__sticky">
        <div className="depth-hero__atmosphere" aria-hidden="true">
          <ResponsiveImg
            {...atmosphere}
            className="depth-hero__atmosphere-img"
            loading="eager"
            fetchPriority="high"
          />
          <div className="depth-hero__sky" />
        </div>

        <div className="depth-hero__type" aria-hidden="true">
          <p className="depth-hero__word">BARRANCAS</p>
        </div>

        <div className="depth-hero__foreground">
          <ResponsiveImg
            {...foreground}
            className="depth-hero__fg-img"
            loading="eager"
            fetchPriority="high"
          />
          <div className="depth-hero__fg-shade" />
        </div>

        <div className="depth-hero__ui">
          <div className="depth-hero__copy">
            <p className="depth-hero__eyebrow">
              <span className="depth-hero__diamonds" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              Cañón espectacular
            </p>
            <h1 className="depth-hero__title">
              Barrancas del Cobre
              <span>Sierra Tarahumara</span>
            </h1>
            <p className="depth-hero__lede">
              El Chepe atraviesa túneles, puentes y miradores en uno de los
              sistemas de barrancas más imponentes del mundo.
            </p>
          </div>

          <aside className="depth-hero__thumbs" aria-label="Destinos cercanos">
            {thumbs.map((thumb, index) => (
              <a
                key={thumb.src}
                href="/destinos"
                className="depth-hero__thumb"
                style={{ "--thumb-i": String(index) } as CSSProperties}
              >
                <ResponsiveImg {...thumb} loading="lazy" />
              </a>
            ))}
          </aside>

          <div className="depth-hero__badge" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <path
                  id="depth-badge-circle"
                  d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
                />
              </defs>
              <text>
                <textPath
                  href="#depth-badge-circle"
                  xlinkHref="#depth-badge-circle"
                  startOffset="0%"
                >
                  Explorar · Chepe Express · Barrancas ·
                </textPath>
              </text>
            </svg>
            <span className="depth-hero__badge-core" />
          </div>

          <form
            className="depth-hero__journey"
            action="/paquetes"
            method="get"
            aria-label="Planifica tu recorrido"
          >
            <div className="depth-hero__journey-fields">
              {JOURNEY_FIELDS.map((field) => (
                <div key={field.label} className="depth-hero__field">
                  <span className="depth-hero__field-icon">
                    <FieldIcon name={field.icon} />
                  </span>
                  <span className="depth-hero__field-text">
                    <span className="depth-hero__field-label">{field.label}</span>
                    <span className="depth-hero__field-value">{field.value}</span>
                  </span>
                  <span className="depth-hero__field-chevron" aria-hidden="true" />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="depth-hero__search"
              aria-label="Ver paquetes"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M16 16l4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
