import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { HOME_OPTIONS, NAV_LINKS } from "../clientData";
import type { OptimizedImage } from "../lib/images";
import { ResponsiveImg } from "./ResponsiveImg";
import "./Header.css";

function isRouteLink(href: string) {
  return href.startsWith("/") && !href.includes("#");
}

function isTransparentHome(pathname: string) {
  return pathname === "/" || pathname.startsWith("/demo/");
}

function isHomeOptionActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type HeaderProps = {
  pathname?: string;
  logo: OptimizedImage;
};

export function Header({ pathname = "/", logo }: HeaderProps) {
  const isHome = isTransparentHome(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileHomesOpen, setMobileHomesOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaCloseTimer = useRef<number | null>(null);
  const megaPanelId = useId();
  const solid = !isHome || scrolled;
  const homeActive = isTransparentHome(pathname);

  const openMega = () => {
    if (megaCloseTimer.current !== null) {
      window.clearTimeout(megaCloseTimer.current);
      megaCloseTimer.current = null;
    }
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    if (megaCloseTimer.current !== null) {
      window.clearTimeout(megaCloseTimer.current);
    }
    megaCloseTimer.current = window.setTimeout(() => {
      setMegaOpen(false);
      megaCloseTimer.current = null;
    }, 120);
  };

  const closeMegaNow = () => {
    if (megaCloseTimer.current !== null) {
      window.clearTimeout(megaCloseTimer.current);
      megaCloseTimer.current = null;
    }
    setMegaOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("nav-open", open);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("nav-open");
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setMobileHomesOpen(false);
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 960px)").matches) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => {
    if (!megaOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMegaNow();
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!megaRef.current?.contains(event.target as Node)) {
        closeMegaNow();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [megaOpen]);

  useEffect(() => {
    return () => {
      if (megaCloseTimer.current !== null) {
        window.clearTimeout(megaCloseTimer.current);
      }
    };
  }, []);

  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((value) => !value);

  return (
    <>
      <header
        className={[
          "site-header",
          solid && !open ? "is-solid" : "",
          open ? "is-open" : "",
          megaOpen ? "is-mega-open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="site-header__inner container-wide">
          <a href="/" className="brand" onClick={closeMenu}>
            <ResponsiveImg
              {...logo}
              className="brand__logo"
              loading="eager"
              fetchPriority="high"
            />
          </a>

          <nav className="site-nav" aria-label="Principal">
            <div
              className={`nav-mega${megaOpen ? " is-open" : ""}`}
              ref={megaRef}
              onMouseEnter={openMega}
              onMouseLeave={scheduleCloseMega}
            >
              <button
                type="button"
                className={`nav-mega__trigger${homeActive ? " is-active" : ""}`}
                aria-expanded={megaOpen}
                aria-controls={megaPanelId}
                onClick={() =>
                  megaOpen ? closeMegaNow() : openMega()
                }
                onFocus={openMega}
              >
                Inicio
                <span className="nav-mega__chevron" aria-hidden="true" />
              </button>

              <div
                id={megaPanelId}
                className="nav-mega__panel"
                role="region"
                aria-label="Opciones de inicio"
                aria-hidden={!megaOpen}
              >
                <div className="nav-mega__panel-inner">
                  <div className="nav-mega__intro">
                    <p className="nav-mega__eyebrow">Homes</p>
                    <p className="nav-mega__lead">
                      Prueba las distintas propuestas de portada.
                    </p>
                  </div>
                  <ul className="nav-mega__grid">
                    {HOME_OPTIONS.map((option, index) => {
                      const active = isHomeOptionActive(pathname, option.href);
                      return (
                        <li
                          key={option.id}
                          style={
                            { "--stagger": String(index) } as CSSProperties
                          }
                        >
                          <a
                            href={option.href}
                            className={`nav-mega__card${active ? " is-active" : ""}`}
                            onClick={closeMegaNow}
                          >
                            <span className="nav-mega__media">
                              <img
                                src={option.preview}
                                alt={option.previewAlt}
                                width={320}
                                height={200}
                                loading="lazy"
                              />
                              <span
                                className={`nav-mega__tag${
                                  option.tag === "Demo" ? " is-demo" : ""
                                }`}
                              >
                                {option.tag}
                              </span>
                            </span>
                            <span className="nav-mega__copy">
                              <span className="nav-mega__title">
                                {option.label}
                              </span>
                              <span className="nav-mega__desc">
                                {option.description}
                              </span>
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {NAV_LINKS.map((link) => {
              const active =
                isRouteLink(link.href) && pathname.startsWith(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={active ? "is-active" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <a className="header-cta" href="/#contacto">
            Planifica tu viaje
          </a>

          <button
            type="button"
            className={`menu-toggle${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Móvil">
          <div className={`mobile-homes${mobileHomesOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className={`mobile-homes__trigger${homeActive ? " is-active" : ""}`}
              aria-expanded={mobileHomesOpen}
              onClick={() => setMobileHomesOpen((value) => !value)}
              tabIndex={open ? 0 : -1}
            >
              Inicio
              <span className="mobile-homes__chevron" aria-hidden="true" />
            </button>
            <div className="mobile-homes__panel" hidden={!mobileHomesOpen}>
              {HOME_OPTIONS.map((option) => {
                const active = isHomeOptionActive(pathname, option.href);
                return (
                  <a
                    key={option.id}
                    href={option.href}
                    onClick={closeMenu}
                    tabIndex={open && mobileHomesOpen ? 0 : -1}
                    className={`mobile-homes__link${active ? " is-active" : ""}`}
                  >
                    <span className="mobile-homes__label">{option.label}</span>
                    <span
                      className={`mobile-homes__tag${
                        option.tag === "Demo" ? " is-demo" : ""
                      }`}
                    >
                      {option.tag}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {NAV_LINKS.map((link) => {
            const active =
              isRouteLink(link.href) && pathname.startsWith(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                tabIndex={open ? 0 : -1}
                className={active ? "is-active" : undefined}
              >
                {link.label}
              </a>
            );
          })}
          <a
            className="mobile-nav__cta"
            href="/#contacto"
            onClick={closeMenu}
            tabIndex={open ? 0 : -1}
          >
            Planifica tu viaje
          </a>
        </nav>
      </div>
    </>
  );
}
