import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { CONTACT, HOME_OPTIONS, NAV_LINKS, TESTIMONIALS } from "../../../clientData";
import type { SierraRiseMedia } from "../../../lib/resolveMedia";
import { ResponsiveImg } from "../../ResponsiveImg";
import "./SierraRise.css";

type SierraRisePageProps = {
  media: SierraRiseMedia;
};

const RISE_NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Momentos", href: "#momentos" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Cómo viajar", href: "#como" },
  { label: "Contacto", href: "#contacto" },
] as const;

const STEPS = [
  {
    title: "Elige un paquete",
    detail:
      "Barrancas Express, Chepe completo o circuitos culturales — encuentra el ritmo de tu viaje.",
  },
  {
    title: "Confirma fechas",
    detail:
      "Te ayudamos con salidas del Chepe, hospedaje en Creel y logística entre destinos.",
  },
  {
    title: "Reserva con nosotros",
    detail:
      "Operación propia, guías certificados y atención en Chihuahua y El Paso.",
  },
  {
    title: "Vive la Sierra",
    detail:
      "Miradores, tren, cultura rarámuri y momentos que se quedan contigo.",
  },
] as const;

const GALLERY_CAPTIONS = [
  "Mar de cañones",
  "Chepe al amanecer",
  "Creel y sus bosques",
  "Cultura viva",
  "Mirador Divisadero",
  "Sierra Tarahumara",
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9M17 7v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3l1.2 6.3L19 12l-5.8 2.7L12 21l-1.2-6.3L5 12l5.8-2.7L12 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SierraRisePage({ media }: SierraRisePageProps) {
  const [frame, setFrame] = useState(0);
  const [navSolid, setNavSolid] = useState(false);
  const [homesOpen, setHomesOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [galleryProgress, setGalleryProgress] = useState(0);
  const [entered, setEntered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryRootRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const fanRef = useRef<HTMLDivElement>(null);
  const homesId = useId();
  const frameCount = media.heroFrames.length;
  const activeFrame = media.heroFrames[frame] ?? media.heroFrames[0]!;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setEntered(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || frameCount < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const last = frameCount - 1;

    const update = () => {
      ticking = false;
      const rect = hero.getBoundingClientRect();
      const scrollable = hero.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const next = Math.min(last, Math.max(0, Math.round(progress * last)));
      hero.style.setProperty("--rise-scrub", progress.toFixed(4));
      setFrame((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [frameCount]);

  useEffect(() => {
    if (!homesOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setHomesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [homesOpen]);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setGalleryProgress(max > 0 ? el.scrollLeft / max : 0);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const el = galleryRef.current;
    const root = galleryRootRef.current;
    if (!el || !root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const GALLERY_INTERVAL_MS = 5200;
    let timer = 0;
    let paused = false;

    const advance = () => {
      if (paused) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 8) return;
      const step = Math.min(340, el.clientWidth * 0.72);
      const next = el.scrollLeft + step;
      if (next >= max - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    };

    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(advance, GALLERY_INTERVAL_MS);
    };

    const pause = () => {
      paused = true;
    };

    const resume = () => {
      paused = false;
      start();
    };

    start();
    root.addEventListener("pointerenter", pause);
    root.addEventListener("pointerleave", resume);
    root.addEventListener("focusin", pause);
    root.addEventListener("focusout", resume);

    return () => {
      window.clearInterval(timer);
      root.removeEventListener("pointerenter", pause);
      root.removeEventListener("pointerleave", resume);
      root.removeEventListener("focusin", pause);
      root.removeEventListener("focusout", resume);
    };
  }, []);

  useEffect(() => {
    const root = stepsRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.step);
        if (!Number.isNaN(index)) setActiveStep(index);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.25, 0.6, 1] },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fan = fanRef.current;
    if (!fan) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(
      fan.querySelectorAll<HTMLElement>(".rise-fan__card"),
    );

    const onMove = (event: PointerEvent) => {
      const rect = fan.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cards.forEach((card, index) => {
        const depth = (index - (cards.length - 1) / 2) * 0.35;
        card.style.setProperty("--mx", `${x * 10 + depth * 4}px`);
        card.style.setProperty("--my", `${y * -8}px`);
      });
    };

    const onLeave = () => {
      cards.forEach((card) => {
        card.style.setProperty("--mx", "0px");
        card.style.setProperty("--my", "0px");
      });
    };

    fan.addEventListener("pointermove", onMove);
    fan.addEventListener("pointerleave", onLeave);
    return () => {
      fan.removeEventListener("pointermove", onMove);
      fan.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const scrollGallery = (dir: -1 | 1) => {
    const el = galleryRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(360, el.clientWidth * 0.7), behavior: "smooth" });
  };

  const goToFrame = (index: number) => {
    const hero = heroRef.current;
    const last = frameCount - 1;
    const clamped = Math.min(last, Math.max(0, index));

    if (
      !hero ||
      last < 1 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setFrame(clamped);
      return;
    }

    const scrollable = hero.offsetHeight - window.innerHeight;
    if (scrollable <= 0) {
      setFrame(clamped);
      return;
    }

    const top =
      hero.getBoundingClientRect().top +
      window.scrollY +
      (clamped / last) * scrollable;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const onNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = "/#contacto";
  };

  return (
    <div className={`sierra-rise${entered ? " is-entered" : ""}`}>
      <header
        className={`rise-nav${navSolid ? " is-solid" : ""}`}
      >
        <div className="rise-nav__shell">
          <a href="#inicio" className="rise-nav__brand" aria-label="Incentitours">
            <ResponsiveImg
              {...media.logo}
              className="rise-nav__logo"
              loading="eager"
              fetchPriority="high"
            />
          </a>

          <nav className="rise-nav__links" aria-label="Principal">
            {RISE_NAV.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={index === 0 ? "is-active" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="rise-nav__actions">
            <div className={`rise-homes${homesOpen ? " is-open" : ""}`}>
              <button
                type="button"
                className="rise-homes__trigger"
                aria-expanded={homesOpen}
                aria-controls={homesId}
                onClick={() => setHomesOpen((value) => !value)}
              >
                Portadas
              </button>
              <div id={homesId} className="rise-homes__panel" hidden={!homesOpen}>
                {HOME_OPTIONS.map((option) => (
                  <a
                    key={option.id}
                    href={option.href}
                    className={
                      option.href === "/demo/sierra-rise" ? "is-active" : undefined
                    }
                    onClick={() => setHomesOpen(false)}
                  >
                    <span>{option.label}</span>
                    <em>{option.tag}</em>
                  </a>
                ))}
              </div>
            </div>

            <a className="rise-nav__cta" href="#contacto">
              Reservar
              <span className="rise-orb" aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>
      </header>

      <section
        id="inicio"
        className="rise-hero"
        aria-label="Inicio"
        ref={heroRef}
        style={{ "--frames": String(frameCount) } as CSSProperties}
      >
        <div className="rise-hero__stage">
          {media.heroFrames.map((item, index) => (
            <div
              key={item.id}
              className={`rise-hero__frame${index === frame ? " is-active" : ""}`}
              aria-hidden={index !== frame}
            >
              <ResponsiveImg
                {...item.image}
                className="rise-hero__img"
                loading="eager"
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            </div>
          ))}
          <div className="rise-hero__veil" />

          <div className="rise-hero__copy">
            <p className="rise-pill rise-pill--glass">
              <SparkIcon />
              <span className="rise-hero__swap" key={activeFrame.id}>
                {activeFrame.label}
              </span>
            </p>
            <p className="rise-hero__brand">Incentitours</p>
            <h1>
              Barrancas del Cobre
              <span className="rise-hero__swap" key={`${activeFrame.id}-title`}>
                {activeFrame.title}
              </span>
            </h1>
            <p className="rise-hero__lede">
              Tren Chepe, miradores y cultura viva — viajes diseñados para
              sentir la Sierra, no solo recorrerla.
            </p>
          </div>

          <aside className="rise-hero__proof">
            <div className="rise-hero__avatars" aria-hidden="true">
              {media.heroFrames.map((item) => (
                <span key={item.id}>
                  <ResponsiveImg {...item.thumb} loading="lazy" />
                </span>
              ))}
            </div>
            <p className="rise-hero__proof-title">Viajeros en la Sierra</p>
            <p>
              Paisajes volcánicos de piedra, cielos dorados y guías expertos en
              Barrancas del Cobre y el Chepe Express.
            </p>
          </aside>

          <div className="rise-hero__rail" aria-label="Escenas">
            <div className="rise-hero__scrub" aria-hidden="true">
              <span />
            </div>
            {media.heroFrames.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`rise-hero__thumb${index === frame ? " is-active" : ""}`}
                aria-pressed={index === frame}
                aria-label={`Ir a ${item.label}`}
                onClick={() => goToFrame(index)}
                style={{ "--i": String(index) } as CSSProperties}
              >
                <ResponsiveImg {...item.thumb} loading="eager" />
                <span>
                  <strong>{item.label}</strong>
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          <a className="rise-hero__book" href="/paquetes">
            Ver paquetes
            <span className="rise-orb rise-orb--dark" aria-hidden="true">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </section>

      <section id="momentos" className="rise-section rise-moments">
        <div className="rise-section__intro">
          <p className="rise-pill">
            <SparkIcon />
            Aventura pura
          </p>
          <h2>
            Momentos inolvidables en el
            <em> corazón </em>
            de las Barrancas
          </h2>
          <p>
            Amaneceres en Divisadero, túneles del Chepe y encuentros con la
            cultura rarámuri en un solo recorrido.
          </p>
        </div>

        <div className="rise-gallery" ref={galleryRootRef}>
          <div className="rise-gallery__track" ref={galleryRef}>
            {media.moments.map((image, index) => (
              <figure
                key={`${image.src}-${index}`}
                className={`rise-gallery__item rise-gallery__item--${(index % 3) + 1}`}
                style={{ "--i": String(index) } as CSSProperties}
              >
                <ResponsiveImg {...image} loading="lazy" />
                {index === 1 && (
                  <figcaption>
                    <strong>{GALLERY_CAPTIONS[index]}</strong>
                    <span>Exploración entre cañones y bosques de pino.</span>
                    <a href="/destinos" className="rise-orb rise-orb--dark" aria-label="Ver destinos">
                      <ArrowIcon />
                    </a>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>

          <div className="rise-gallery__controls">
            <button
              type="button"
              className="rise-round"
              aria-label="Anterior"
              onClick={() => scrollGallery(-1)}
            >
              ←
            </button>
            <div
              className="rise-gallery__progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(galleryProgress * 100)}
              aria-label="Progreso de galería"
            >
              <span style={{ transform: `scaleX(${Math.max(galleryProgress, 0.12)})` }} />
            </div>
            <button
              type="button"
              className="rise-round"
              aria-label="Siguiente"
              onClick={() => scrollGallery(1)}
            >
              →
            </button>
          </div>
        </div>
      </section>

      <section id="paquetes" className="rise-section rise-packages">
        <div className="rise-section__intro">
          <p className="rise-pill">
            <SparkIcon />
            Incentitours Tours
          </p>
          <h2>
            Descubre las mejores
            <em> aventuras </em>
            para cada viajero
          </h2>
          <p>
            Paquetes cuidadosamente armados: amaneceres, Chepe Express y
            circuitos culturales en Chihuahua.
          </p>
        </div>

        <div className="rise-packages__grid">
          <a
            href={`/paquetes/${media.packages[0]?.slug ?? "barrancas-express"}`}
            className="rise-feature"
          >
            <ResponsiveImg {...media.feature} loading="lazy" />
            <div className="rise-feature__copy">
              <span>Descubre la</span>
              <strong>belleza indómita</strong>
              <strong>de las Barrancas</strong>
            </div>
          </a>

          <div className="rise-packages__cards">
            {media.packages.slice(0, 4).map((pkg) => (
              <article key={pkg.slug} className="rise-card">
                <a href={`/paquetes/${pkg.slug}`} className="rise-card__media">
                  <ResponsiveImg {...pkg.image} loading="lazy" />
                </a>
                <div className="rise-card__body">
                  <h3>{pkg.name}</h3>
                  <p>{pkg.summary}</p>
                  <div className="rise-card__meta">
                    <span>{pkg.duration}</span>
                    <a href={`/paquetes/${pkg.slug}`}>
                      Reservar
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rise-section rise-fan-section" aria-labelledby="rise-fan-title">
        <div className="rise-section__intro">
          <p className="rise-pill">
            <SparkIcon />
            Memorias
          </p>
          <h2 id="rise-fan-title">
            Guarda tu viaje por la Sierra
            <em> para siempre</em>
          </h2>
          <p>
            Revive cada amanecer, túnel y mirador con la mirada de quien conoce
            el territorio.
          </p>
        </div>

        <div className="rise-fan" ref={fanRef}>
          {media.fan.map((image, index) => (
            <figure
              key={`${image.src}-fan-${index}`}
              className="rise-fan__card"
              style={
                {
                  "--i": String(index),
                  "--rot": `${(index - 2) * 3.5}deg`,
                  "--lift": `${Math.abs(index - 2) * 18}px`,
                } as CSSProperties
              }
            >
              <ResponsiveImg {...image} loading="lazy" />
              {index === 0 && (
                <figcaption aria-hidden="true">★★★★★</figcaption>
              )}
            </figure>
          ))}
        </div>

        <div className="rise-quotes">
          {TESTIMONIALS.slice(0, 3).map((item, index) => (
            <blockquote
              key={item.name}
              style={{ "--i": String(index) } as CSSProperties}
            >
              <span aria-hidden="true">★★★★★</span>
              <p>“{item.quote}”</p>
              <footer>{item.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="como" className="rise-section rise-steps" ref={stepsRef}>
        <div className="rise-section__intro">
          <p className="rise-pill">
            <SparkIcon />
            Cómo viajar
          </p>
          <h2>Reserva tu experiencia en 4 pasos</h2>
          <div className="rise-tags" aria-hidden="true">
            <span><SparkIcon /> Exploración</span>
            <span><SparkIcon /> Chepe Express</span>
            <span><SparkIcon /> Guías locales</span>
          </div>
        </div>

        <div className="rise-steps__layout">
          <div className="rise-steps__media">
            <ResponsiveImg {...media.stepsImage} loading="lazy" />
            <div className="rise-steps__glass">
              <p>
                Viaja con operación propia, logística clara y la base perfecta
                en The Lodge at Creel.
              </p>
              <a href="#contacto" className="rise-steps__cta">
                Reservar
                <span className="rise-orb rise-orb--dark" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </div>

          <div className="rise-steps__list">
            <p className="rise-steps__eyebrow">Así funciona</p>
            <h3>Reserva en 4 pasos sencillos</h3>
            <ol>
              {STEPS.map((step, index) => (
                <li
                  key={step.title}
                  data-step={index}
                  className={activeStep === index ? "is-active" : undefined}
                >
                  <button type="button" onClick={() => setActiveStep(index)}>
                    <span className="rise-steps__num">{index + 1}</span>
                    <span>
                      <strong>{step.title}</strong>
                      <em>{step.detail}</em>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="rise-cta-banner" aria-labelledby="rise-cta-title">
        <ResponsiveImg {...media.cta} loading="lazy" />
        <div className="rise-cta-banner__copy">
          <h2 id="rise-cta-title">Vive la magia de las Barrancas hoy</h2>
          <p>
            Amaneceres, Chepe Express y cultura de la Sierra — planeamos cada
            detalle contigo.
          </p>
          <a href="#contacto" className="rise-hero__book">
            Reserva tu viaje ahora
            <span className="rise-orb rise-orb--dark" aria-hidden="true">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </section>

      <footer id="contacto" className="rise-footer">
        <div className="rise-footer__grid">
          <div>
            <a href="#inicio" className="rise-footer__brand" aria-label="Incentitours">
              <ResponsiveImg {...media.logo} loading="lazy" />
            </a>
            <p>
              Experiencias culturales y de aventura en México y Latinoamérica —
              expertos en Barrancas del Cobre y Chepe Express.
            </p>
          </div>

          <div>
            <h3>Enlaces</h3>
            <nav aria-label="Pie de página">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
              <a href="/">Portada clásica</a>
            </nav>
          </div>

          <div>
            <h3>Contacto</h3>
            <p>{CONTACT.chihuahua.address}</p>
            <p>{CONTACT.chihuahua.phones[0]}</p>
            <a href={`mailto:${CONTACT.chihuahua.emails[0]}`}>
              {CONTACT.chihuahua.emails[0]}
            </a>
          </div>

          <div>
            <h3>Planea tu viaje</h3>
            <form className="rise-footer__form" onSubmit={onNewsletter}>
              <label className="sr-only" htmlFor="rise-email">
                Correo
              </label>
              <input
                id="rise-email"
                name="email"
                type="email"
                required
                placeholder="Tu correo electrónico"
              />
              <button type="submit">Escribirnos</button>
            </form>
            <div className="rise-footer__social">
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href="/paquetes">Paquetes</a>
              <a href="/destinos">Destinos</a>
            </div>
          </div>
        </div>
        <p className="rise-footer__legal">
          © {new Date().getFullYear()} Incentitours, LLC. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}
