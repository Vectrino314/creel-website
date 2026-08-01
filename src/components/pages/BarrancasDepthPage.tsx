import type { BarrancasDepthMedia } from "../../lib/resolveMedia";
import { DepthHero } from "../demos/DepthHero";
import "../Hero.css";
import "./BarrancasDepthPage.css";

type BarrancasDepthPageProps = {
  media: BarrancasDepthMedia;
};

export function BarrancasDepthPage({ media }: BarrancasDepthPageProps) {
  return (
    <div className="barrancas-depth-page">
      <DepthHero
        atmosphere={media.atmosphere}
        foreground={media.foreground}
        thumbs={media.thumbs}
      />

      <section className="depth-outro" aria-labelledby="depth-outro-title">
        <div className="container depth-outro__inner">
          <p className="eyebrow">Demo · Barrancas Depth</p>
          <h2 id="depth-outro-title" className="section-title">
            El paisaje avanza. La tipografía se queda atrás.
          </h2>
          <p className="section-lead">
            Una portada experimental para Incentitours: el Chepe y las barrancas
            ganan escala al hacer scroll, mientras el nombre del destino permanece
            en el horizonte.
          </p>
          <div className="depth-outro__actions">
            <a className="btn btn-primary" href="/paquetes">
              Ver paquetes
            </a>
            <a className="btn depth-outro__ghost" href="/#contacto">
              Planifica tu viaje
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
