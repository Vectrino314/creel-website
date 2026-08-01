import { FadeIn } from "./FadeIn";
import { ResponsiveImg } from "./ResponsiveImg";
import type {
  ResolvedCertification,
  ResolvedPartner,
} from "../lib/resolveMedia";
import "./Trust.css";

type TrustProps = {
  certifications: ResolvedCertification[];
  partners: ResolvedPartner[];
};

export function Trust({ certifications, partners }: TrustProps) {
  return (
    <section id="confianza" className="trust" aria-labelledby="trust-title">
      <div className="trust__certs">
        <div className="container">
          <FadeIn className="trust__intro">
            <span className="eyebrow trust__eyebrow">Certificaciones</span>
            <h2 id="trust-title" className="section-title">
              Credenciales que respaldan cada viaje
            </h2>
            <p className="section-lead">
              Distintivos de calidad, inclusión e higiene — y el reconocimiento
              de viajeros y profesionales del turismo de reuniones.
            </p>
          </FadeIn>

          <ul className="trust__cert-list">
            {certifications.map((cert, i) => (
              <FadeIn
                key={cert.name}
                as="li"
                className="trust__cert"
                delay={(i % 3) as 0 | 1 | 2}
              >
                <div className="trust__cert-logo">
                  <ResponsiveImg {...cert.logo} loading="lazy" />
                </div>
                <div className="trust__cert-copy">
                  <h3>{cert.name}</h3>
                  <p>{cert.blurb}</p>
                </div>
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>

      <div className="trust__partners">
        <div className="container">
          <FadeIn className="trust__partners-intro">
            <span className="eyebrow">Aliados</span>
            <h3 className="trust__partners-title">
              Operadores y socios de confianza
            </h3>
          </FadeIn>

          <ul className="trust__partner-list">
            {partners.map((partner, i) => (
              <FadeIn
                key={partner.name}
                as="li"
                className="trust__partner"
                delay={(i % 3) as 0 | 1 | 2}
              >
                <ResponsiveImg {...partner.logo} loading="lazy" />
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
