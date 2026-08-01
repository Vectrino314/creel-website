import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LOGO, NAV_LINKS } from "../data";
import "./Header.css";

function isRouteLink(href: string) {
  return href.startsWith("/") && !href.includes("#");
}

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const solid = !isHome || scrolled;

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
    if (!open) return;

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

  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((value) => !value);

  return (
    <>
      <header
        className={[
          "site-header",
          solid && !open ? "is-solid" : "",
          open ? "is-open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="site-header__inner container-wide">
          <Link to="/" className="brand" onClick={closeMenu}>
            <img className="brand__logo" src={LOGO} alt="Incentitours" />
          </Link>

          <nav className="site-nav" aria-label="Principal">
            {NAV_LINKS.map((link) =>
              isRouteLink(link.href) ? (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) => (isActive ? "is-active" : undefined)}
                >
                  {link.label}
                </NavLink>
              ) : (
                <Link key={link.href} to={link.href}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <Link className="header-cta" to="/#contacto">
            Planifica tu viaje
          </Link>

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
          {NAV_LINKS.map((link) =>
            isRouteLink(link.href) ? (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={closeMenu}
                tabIndex={open ? 0 : -1}
                className={({ isActive }) => (isActive ? "is-active" : undefined)}
              >
                {link.label}
              </NavLink>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={closeMenu}
                tabIndex={open ? 0 : -1}
              >
                {link.label}
              </Link>
            ),
          )}
          <Link
            className="mobile-nav__cta"
            to="/#contacto"
            onClick={closeMenu}
            tabIndex={open ? 0 : -1}
          >
            Planifica tu viaje
          </Link>
        </nav>
      </div>
    </>
  );
}
