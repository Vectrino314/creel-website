import { LOGO, NAV_LINKS } from "../data";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <a href="/">
            <img
              className="site-footer__logo"
              src={LOGO}
              alt="Incentitours, LLC."
            />
          </a>
          <p className="site-footer__tag">
            Mexico&apos;s &amp; Latin America Cultural &amp; Adventure Trips
          </p>
        </div>
        <nav aria-label="Pie de página">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="site-footer__social">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
      <div className="container site-footer__legal">
        <p>© {new Date().getFullYear()} Incentitours, LLC. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
