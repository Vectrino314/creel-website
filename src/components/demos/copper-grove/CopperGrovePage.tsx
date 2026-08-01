import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  CONTACT,
  HOME_OPTIONS,
  NAV_LINKS,
  TESTIMONIALS,
} from "../../../clientData";
import type { CopperGroveMedia } from "../../../lib/resolveMedia";
import { ResponsiveImg } from "../../ResponsiveImg";
import "./CopperGrove.css";

type CopperGrovePageProps = {
  media: CopperGroveMedia;
};

const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Destinos", href: "#destinos" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Cómo viajar", href: "#pasos" },
  { label: "Contacto", href: "#contacto" },
] as const;

const FILTERS = [
  { id: "all", label: "Todo" },
  { id: "naturaleza", label: "Naturaleza" },
  { id: "tren", label: "Chepe" },
  { id: "cultura", label: "Cultura" },
  { id: "aventura", label: "Aventura" },
] as const;

const STEPS = [
  {
    title: "Cuéntanos tu viaje",
    detail:
      "Fechas, ritmo y compañía: armamos la ruta alrededor de lo que quieres sentir.",
  },
  {
    title: "Elegimos el paquete",
    detail:
      "Barrancas Express, Chepe completo o circuitos culturales — con operación propia.",
  },
  {
    title: "Confirmamos cada detalle",
    detail:
      "Tren, hospedaje en Creel, guías certificados y logística entre destinos.",
  },
  {
    title: "Vive la Sierra",
    detail:
      "Miradores, cultura rarámuri y amaneceres que se quedan contigo.",
  },
] as const;

const FAQS = [
  {
    q: "¿Incluyen boletos del Chepe Express?",
    a: "Sí. Coordinamos compra y asignación de asientos según tu itinerario, con salidas confirmadas desde Chihuahua o El Fuerte.",
  },
  {
    q: "¿Puedo viajar con familia o en grupo?",
    a: "Absolutamente. Diseñamos ritmos para familias, parejas e incentivos corporativos, con vans o autobuses según el tamaño del grupo.",
  },
  {
    q: "¿Dónde nos hospedamos en Creel?",
    a: "Nuestra base es The Lodge at Creel Hotel & Spa — hotel propio en el corazón del Pueblo Mágico, ideal para explorar la Sierra.",
  },
  {
    q: "¿Atienden desde El Paso?",
    a: "Sí. Tenemos operación en Chihuahua y El Paso, TX, para viajeros de ambos lados de la frontera.",
  },
] as const;

const STATS = [
  { value: 25, suffix: "+", label: "Años de experiencia" },
  { value: 350, suffix: " km", label: "De Chepe por cañones" },
  { value: 3, suffix: "", label: "Culturas en un viaje" },
  { value: 2, suffix: "", label: "Oficinas · MX & TX" },
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9M17 7v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarRow() {
  return (
    <span className="grove-stars" aria-hidden="true">
      {"★★★★★"}
    </span>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useReveal(selector = "[data-reveal]") {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll(selector).forEach((el) => {
        el.classList.add("is-in");
      });
      return;
    }

    const nodes = Array.from(root.querySelectorAll<HTMLElement>(selector));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [selector]);

  return rootRef;
}

function useCountUp(active: boolean, target: number, reduced: boolean) {
  const [value, setValue] = useState(reduced || !active ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    if (!active) return;

    let frame = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, reduced]);

  return value;
}

export function CopperGrovePage({ media }: CopperGrovePageProps) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useReveal();
  const [entered, setEntered] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const [homesOpen, setHomesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(0);
  const menuId = useId();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [openFaq, setOpenFaq] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [statsActive, setStatsActive] = useState(false);
  const [frame, setFrame] = useState(0);
  const homesId = useId();
  const heroRef = useRef<HTMLElement>(null);
  const navTrackRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const [navPill, setNavPill] = useState({ left: 0, width: 0, opacity: 0 });
  const filterTrackRef = useRef<HTMLDivElement>(null);
  const filterBtnsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const [filterPill, setFilterPill] = useState({ left: 0, width: 0 });
  const statsRef = useRef<HTMLElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const reviewTrackRef = useRef<HTMLDivElement>(null);
  const frameCount = media.heroFrames.length;
  const activeFrame = media.heroFrames[frame] ?? media.heroFrames[0]!;

  const filteredMoods =
    filter === "all"
      ? media.moods
      : media.moods.filter((mood) => mood.filter === filter);

  useEffect(() => {
    if (reduced) {
      setEntered(true);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!homesOpen && !menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setHomesOpen(false);
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [homesOpen, menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 720px)").matches) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || frameCount < 2 || reduced) return;

    let ticking = false;
    const last = frameCount - 1;

    const update = () => {
      ticking = false;
      const rect = hero.getBoundingClientRect();
      const scrollable = hero.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const next = Math.min(last, Math.max(0, Math.round(progress * last)));
      hero.style.setProperty("--grove-scrub", progress.toFixed(4));
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
  }, [frameCount, reduced]);

  useEffect(() => {
    const movePill = (index: number) => {
      const link = navLinksRef.current[index];
      const track = navTrackRef.current;
      if (!link || !track) return;
      const trackBox = track.getBoundingClientRect();
      const linkBox = link.getBoundingClientRect();
      setNavPill({
        left: linkBox.left - trackBox.left,
        width: linkBox.width,
        opacity: 1,
      });
    };

    movePill(activeNav);
    const onResize = () => movePill(activeNav);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeNav, entered]);

  useEffect(() => {
    const movePill = () => {
      const index = FILTERS.findIndex((item) => item.id === filter);
      const btn = filterBtnsRef.current[index];
      const track = filterTrackRef.current;
      if (!btn || !track) return;
      const trackBox = track.getBoundingClientRect();
      const btnBox = btn.getBoundingClientRect();
      setFilterPill({
        left: btnBox.left - trackBox.left,
        width: btnBox.width,
      });
    };

    movePill();
    window.addEventListener("resize", movePill);
    return () => window.removeEventListener("resize", movePill);
  }, [filter, entered]);

  useEffect(() => {
    const sections = NAV.map((item) => document.querySelector(item.href));
    const onScroll = () => {
      const y = window.scrollY + 120;
      let next = 0;
      sections.forEach((section, index) => {
        if (!(section instanceof HTMLElement)) return;
        if (section.offsetTop <= y) next = index;
      });
      setActiveNav(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStatsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mosaic = mosaicRef.current;
    if (!mosaic || reduced) return;

    const onMove = (event: PointerEvent) => {
      const rect = mosaic.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      mosaic.style.setProperty("--spot-x", `${x}%`);
      mosaic.style.setProperty("--spot-y", `${y}%`);
    };

    mosaic.addEventListener("pointermove", onMove);
    return () => mosaic.removeEventListener("pointermove", onMove);
  }, [reduced, filteredMoods.length]);

  const goToFrame = (index: number) => {
    const hero = heroRef.current;
    const last = frameCount - 1;
    const clamped = Math.min(last, Math.max(0, index));

    if (!hero || last < 1 || reduced) {
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

  const scrollReviews = (dir: -1 | 1) => {
    const next = Math.min(
      TESTIMONIALS.length - 1,
      Math.max(0, reviewIndex + dir),
    );
    setReviewIndex(next);
    const track = reviewTrackRef.current;
    const card = track?.children[next + 1] as HTMLElement | undefined;
    card?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const onNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = "/#contacto";
  };

  const onFaqKey = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpenFaq(Math.min(FAQS.length - 1, index + 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpenFaq(Math.max(0, index - 1));
    }
  };

  return (
    <div
      ref={rootRef}
      className={`copper-grove${entered ? " is-entered" : ""}${navSolid ? " is-scrolled" : ""}`}
    >
      <header
        className={`grove-nav${navSolid ? " is-solid" : ""}${menuOpen ? " is-menu-open" : ""}`}
      >
        <div className="grove-nav__shell">
          <a href="#inicio" className="grove-nav__brand" aria-label="Incentitours">
            <ResponsiveImg
              {...media.logo}
              className="grove-nav__logo"
              loading="eager"
              fetchPriority="high"
            />
          </a>

          <nav
            className="grove-nav__links"
            aria-label="Principal"
            ref={navTrackRef}
            onMouseLeave={() => {
              const link = navLinksRef.current[activeNav];
              const track = navTrackRef.current;
              if (!link || !track) return;
              const trackBox = track.getBoundingClientRect();
              const linkBox = link.getBoundingClientRect();
              setNavPill({
                left: linkBox.left - trackBox.left,
                width: linkBox.width,
                opacity: 1,
              });
            }}
          >
            <span
              className="grove-nav__pill"
              aria-hidden="true"
              style={
                {
                  "--pill-x": `${navPill.left}px`,
                  "--pill-w": `${navPill.width}px`,
                  opacity: navPill.opacity,
                } as CSSProperties
              }
            />
            {NAV.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                ref={(node) => {
                  navLinksRef.current[index] = node;
                }}
                className={activeNav === index ? "is-active" : undefined}
                onMouseEnter={() => {
                  const el = navLinksRef.current[index];
                  const track = navTrackRef.current;
                  if (!el || !track) return;
                  const trackBox = track.getBoundingClientRect();
                  const linkBox = el.getBoundingClientRect();
                  setNavPill({
                    left: linkBox.left - trackBox.left,
                    width: linkBox.width,
                    opacity: 1,
                  });
                }}
                onFocus={() => setActiveNav(index)}
                onClick={() => setActiveNav(index)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="grove-nav__actions">
            <div className={`grove-homes${homesOpen ? " is-open" : ""}`}>
              <button
                type="button"
                className="grove-homes__trigger"
                aria-expanded={homesOpen}
                aria-controls={homesId}
                onClick={() => {
                  setMenuOpen(false);
                  setHomesOpen((value) => !value);
                }}
              >
                Portadas
              </button>
              <div id={homesId} className="grove-homes__panel" hidden={!homesOpen}>
                {HOME_OPTIONS.map((option) => (
                  <a
                    key={option.id}
                    href={option.href}
                    className={
                      option.href === "/demo/copper-grove" ? "is-active" : undefined
                    }
                    onClick={() => setHomesOpen(false)}
                  >
                    <span>{option.label}</span>
                    <em>{option.tag}</em>
                  </a>
                ))}
              </div>
            </div>

            <a className="grove-nav__cta" href="#contacto">
              <span className="grove-nav__cta-label">Contáctanos</span>
              <span className="grove-orb grove-orb--gold" aria-hidden="true">
                <ChevronIcon />
              </span>
            </a>

            <button
              type="button"
              className={`grove-nav__burger${menuOpen ? " is-open" : ""}`}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => {
                setHomesOpen(false);
                setMenuOpen((value) => !value);
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <nav
          id={menuId}
          className="grove-nav__drawer"
          aria-label="Menú móvil"
          hidden={!menuOpen}
        >
          {NAV.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={activeNav === index ? "is-active" : undefined}
              onClick={() => {
                setActiveNav(index);
                setMenuOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <section
        id="inicio"
        className="grove-hero"
        aria-label="Inicio"
        ref={heroRef}
        style={{ "--frames": String(frameCount) } as CSSProperties}
      >
        <div className="grove-hero__stage">
          {media.heroFrames.map((item, index) => (
            <div
              key={item.id}
              className={`grove-hero__frame${index === frame ? " is-active" : ""}`}
              aria-hidden={index !== frame}
            >
              <ResponsiveImg
                {...item.image}
                className="grove-hero__img"
                loading="eager"
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            </div>
          ))}
          <div className="grove-hero__veil" />

          <div className="grove-hero__copy" data-reveal>
            <p className="grove-script">Expertos en la Sierra</p>
            <h1>
              Viajes que se sienten
              <em> en el pecho</em>
            </h1>
            <p className="grove-hero__lede">
              <span className="grove-hero__swap" key={activeFrame.id}>
                {activeFrame.title}
              </span>
              {" — "}
              Barrancas del Cobre, Chepe Express y cultura viva para viajeros
              que quieren más que un itinerario.
            </p>
            <div className="grove-hero__actions">
              <a className="grove-btn" href="/paquetes">
                Planear un viaje
                <span className="grove-orb" aria-hidden="true">
                  <ChevronIcon />
                </span>
              </a>
              <a
                className="grove-link"
                href={`tel:${CONTACT.chihuahua.phones[0]?.replace(/\s/g, "")}`}
              >
                Llámanos · {CONTACT.chihuahua.phones[0]}
              </a>
            </div>
          </div>

          <aside className="grove-hero__proof" data-reveal>
            <StarRow />
            <p>
              <strong>Excelente 4.9/5</strong> basado en viajeros de la Sierra
              Tarahumara.
            </p>
          </aside>

          <div
            className="grove-hero__chips"
            data-reveal
            aria-label="Escenas del viaje"
          >
            <div className="grove-hero__scrub" aria-hidden="true">
              <span />
            </div>
            {media.heroFrames.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`grove-chip${index === frame ? " is-active" : ""}`}
                aria-pressed={index === frame}
                aria-label={`Ir a ${item.label}`}
                onClick={() => goToFrame(index)}
                style={{ "--i": String(index) } as CSSProperties}
              >
                <ResponsiveImg {...item.thumb} loading="eager" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="destinos" className="grove-section grove-categories">
        <div className="grove-section__intro" data-reveal>
          <p className="grove-script">Explora</p>
          <h2>
            Destinos que abren
            <em> la Sierra</em>
          </h2>
          <p>
            Cuatro puertas a Barrancas del Cobre — cada una con su propio ritmo
            y carácter.
          </p>
        </div>

        <div className="grove-categories__grid">
          {media.categories.map((category, index) => (
            <a
              key={category.slug}
              href={`/destinos/${category.slug}`}
              className="grove-category"
              data-reveal
              style={{ "--i": String(index) } as CSSProperties}
            >
              <ResponsiveImg {...category.image} loading="lazy" />
              <div className="grove-category__label">
                <span>{category.name}</span>
                <em>{category.tag}</em>
                <span className="grove-orb grove-orb--light" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="grove-section grove-moods" aria-labelledby="grove-moods-title">
        <div className="grove-section__intro" data-reveal>
          <p className="grove-script">Atmósferas</p>
          <h2 id="grove-moods-title">
            Lo que tu viaje
            <em> está buscando</em>
          </h2>
          <p>
            Filtra por el pulso del viaje — naturaleza, tren, cultura o adrenalina.
          </p>
        </div>

        <div className="grove-filters" ref={filterTrackRef} data-reveal>
          <span
            className="grove-filters__pill"
            aria-hidden="true"
            style={
              {
                "--pill-x": `${filterPill.left}px`,
                "--pill-w": `${filterPill.width}px`,
              } as CSSProperties
            }
          />
          {FILTERS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              ref={(node) => {
                filterBtnsRef.current[index] = node;
              }}
              className={filter === item.id ? "is-active" : undefined}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grove-mosaic" ref={mosaicRef}>
          {filteredMoods.map((mood, index) => (
            <a
              key={mood.id}
              href="/destinos"
              className="grove-mosaic__item"
              data-reveal
              style={{ "--i": String(index) } as CSSProperties}
            >
              <ResponsiveImg {...mood.image} loading="lazy" />
              <span>{mood.label}</span>
            </a>
          ))}
        </div>
      </section>

      <section id="pasos" className="grove-section grove-steps">
        <div className="grove-section__intro" data-reveal>
          <p className="grove-script">Así viajamos</p>
          <h2>
            Cuatro pasos
            <em> sencillos</em>
          </h2>
          <p>De la primera conversación al mirador — sin fricción.</p>
        </div>

        <ol className="grove-steps__grid">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="grove-step"
              data-reveal
              style={{ "--i": String(index) } as CSSProperties}
            >
              <span className="grove-step__num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="grove-step__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  <path
                    d="M12 8v4l2.5 1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="paquetes" className="grove-section grove-packages">
        <div className="grove-section__intro" data-reveal>
          <p className="grove-script">Paquetes</p>
          <h2>
            Rutas listas para
            <em> sentir</em>
          </h2>
          <p>
            Itinerarios cuidados — con espacio para improvisar al amanecer.
          </p>
        </div>

        <div className="grove-packages__list">
          {media.packages.map((pkg, index) => (
            <article
              key={pkg.slug}
              className="grove-trip"
              data-reveal
              style={{ "--i": String(index) } as CSSProperties}
            >
              <a href={`/paquetes/${pkg.slug}`} className="grove-trip__media">
                <ResponsiveImg {...pkg.image} loading="lazy" />
              </a>
              <div className="grove-trip__body">
                <p className="grove-trip__meta">{pkg.duration}</p>
                <h3>{pkg.name}</h3>
                <p>{pkg.summary}</p>
                <a className="grove-btn grove-btn--sm" href={`/paquetes/${pkg.slug}`}>
                  Cuéntanos tu viaje
                  <span className="grove-orb" aria-hidden="true">
                    <ChevronIcon />
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="grove-trust"
        ref={statsRef}
        aria-labelledby="grove-trust-title"
      >
        <div className="grove-trust__pattern" aria-hidden="true" />
        <div className="grove-trust__inner">
          <div className="grove-trust__copy" data-reveal>
            <p className="grove-script grove-script--gold">Confianza local</p>
            <h2 id="grove-trust-title">
              Corazones locales.
              <br />
              Ideas que llegan lejos.
            </h2>
            <p>
              Operamos desde Chihuahua y El Paso — con hotel propio, flota y
              guías que conocen cada curva de la Sierra.
            </p>
          </div>

          <ul className="grove-trust__stats">
            {STATS.map((stat) => (
              <StatItem
                key={stat.label}
                active={statsActive}
                reduced={reduced}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </ul>
        </div>
      </section>

      <section className="grove-section grove-faq" aria-labelledby="grove-faq-title">
        <div className="grove-faq__intro" data-reveal>
          <p className="grove-script">Preguntas</p>
          <h2 id="grove-faq-title">
            Antes de
            <em> partir</em>
          </h2>
          <p>Lo que suele preguntar quien planea su primer viaje a las Barrancas.</p>
          <a className="grove-btn" href="#contacto">
            Pregúntanos algo
            <span className="grove-orb" aria-hidden="true">
              <ChevronIcon />
            </span>
          </a>
        </div>

        <div className="grove-faq__list" data-reveal>
          {FAQS.map((item, index) => {
            const open = openFaq === index;
            return (
              <div
                key={item.q}
                className={`grove-faq__item${open ? " is-open" : ""}`}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? -1 : index)}
                  onKeyDown={(event) => onFaqKey(event, index)}
                >
                  <span>{item.q}</span>
                  <span className="grove-faq__icon" aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </button>
                <div className="grove-faq__panel" hidden={!open}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grove-banner" data-reveal aria-labelledby="grove-banner-title">
        <div>
          <p className="grove-script">Listos cuando tú lo estés</p>
          <h2 id="grove-banner-title">¿Empezamos a trazar tu Sierra?</h2>
        </div>
        <div className="grove-banner__actions">
          <a className="grove-btn" href="#contacto">
            Empezar a planear
            <span className="grove-orb" aria-hidden="true">
              <ChevronIcon />
            </span>
          </a>
          <a className="grove-btn grove-btn--ghost" href="/destinos">
            Inspirarme
          </a>
        </div>
      </section>

      <section className="grove-section grove-reviews" aria-labelledby="grove-reviews-title">
        <div className="grove-section__intro" data-reveal>
          <p className="grove-script">Voces</p>
          <h2 id="grove-reviews-title">
            Quienes ya
            <em> caminaron </em>
            con nosotros
          </h2>
        </div>

        <div className="grove-reviews__wrap">
          <div className="grove-reviews__track" ref={reviewTrackRef}>
            <article className="grove-review grove-review--brand" data-reveal>
              <p className="grove-script grove-script--gold">Reseñas</p>
              <strong>5.0</strong>
              <StarRow />
              <p>Viajeros que vuelven — y nos recomiendan.</p>
            </article>

            {TESTIMONIALS.map((item, index) => (
              <blockquote
                key={item.name}
                className={`grove-review${index === reviewIndex ? " is-active" : ""}`}
                data-reveal
                style={{ "--i": String(index) } as CSSProperties}
              >
                <StarRow />
                <p>“{item.quote}”</p>
                <footer>{item.name}</footer>
              </blockquote>
            ))}
          </div>

          <div className="grove-reviews__controls">
            <button
              type="button"
              className="grove-round"
              aria-label="Reseña anterior"
              onClick={() => scrollReviews(-1)}
              disabled={reviewIndex === 0}
            >
              ←
            </button>
            <button
              type="button"
              className="grove-round"
              aria-label="Reseña siguiente"
              onClick={() => scrollReviews(1)}
              disabled={reviewIndex >= TESTIMONIALS.length - 1}
            >
              →
            </button>
          </div>
        </div>
      </section>

      <footer id="contacto" className="grove-footer">
        <div className="grove-footer__grid">
          <div>
            <a href="#inicio" className="grove-footer__brand" aria-label="Incentitours">
              <span className="grove-nav__mark" aria-hidden="true">
                I
              </span>
              <ResponsiveImg {...media.logo} loading="lazy" />
            </a>
            <p>
              Experiencias culturales y de aventura en México y Latinoamérica —
              expertos en Barrancas del Cobre y Chepe Express.
            </p>
            <div className="grove-footer__social">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                Wa
              </a>
              <a href={`mailto:${CONTACT.chihuahua.emails[0]}`} aria-label="Email">
                @
              </a>
              <a href="/paquetes" aria-label="Paquetes">
                Pk
              </a>
            </div>
          </div>

          <div>
            <h3>Planeación</h3>
            <nav aria-label="Planeación">
              <a href="/paquetes">Paquetes</a>
              <a href="/destinos">Destinos</a>
              <a href="#pasos">Cómo viajar</a>
              <a href="/">Portada clásica</a>
            </nav>
          </div>

          <div>
            <h3>Servicios</h3>
            <nav aria-label="Servicios">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3>Contacto</h3>
            <p>{CONTACT.chihuahua.address}</p>
            <p>{CONTACT.chihuahua.phones[0]}</p>
            <a
              className="grove-btn grove-btn--footer"
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              Chatea con nosotros
              <span className="grove-orb grove-orb--gold" aria-hidden="true">
                <ChevronIcon />
              </span>
            </a>
            <form className="grove-footer__form" onSubmit={onNewsletter}>
              <label className="sr-only" htmlFor="grove-email">
                Correo
              </label>
              <input
                id="grove-email"
                name="email"
                type="email"
                required
                placeholder="Tu correo"
              />
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
        <p className="grove-footer__legal">
          © {new Date().getFullYear()} Incentitours, LLC. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}

function StatItem({
  active,
  reduced,
  value,
  suffix,
  label,
}: {
  active: boolean;
  reduced: boolean;
  value: number;
  suffix: string;
  label: string;
}) {
  const count = useCountUp(active, value, reduced);
  return (
    <li data-reveal>
      <strong>
        {count}
        {suffix}
      </strong>
      <span>{label}</span>
    </li>
  );
}
