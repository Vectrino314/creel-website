import { NAV_LINKS } from "../clientData";
import { SOCIAL } from "../site";
import type { OptimizedImage } from "../lib/images";
import { ResponsiveImg } from "./ResponsiveImg";
import "./Footer.css";

type FooterProps = {
  logo: OptimizedImage;
};

export function Footer({ logo }: FooterProps) {
  const socialLinks = [
    { label: "Facebook", href: SOCIAL.facebook },
    { label: "Instagram", href: SOCIAL.instagram },
  ].filter((link) => Boolean(link.href));

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <a href="/">
            <ResponsiveImg
              {...logo}
              className="site-footer__logo"
              alt="Incentitours, LLC."
              loading="lazy"
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
        {socialLinks.length > 0 && (
          <div className="site-footer__social">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="container site-footer__legal">
        <p>
          © {new Date().getFullYear()} Incentitours, LLC. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
