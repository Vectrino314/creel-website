import { useState, type FormEvent } from "react";
import { FadeIn } from "./FadeIn";
import { CONTACT } from "../data";
import "./Contact.css";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:ventas@incentitours.mx?subject=${encodeURIComponent(
      "Consulta desde el sitio web",
    )}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contacto" className="contact">
      <div className="container contact__grid">
        <FadeIn className="contact__copy">
          <span className="eyebrow">Contacto</span>
          <h2 className="section-title">Hablemos de tu próximo viaje</h2>
          <p className="section-lead">
            Cuéntanos fechas, grupo y destino. Te armamos una propuesta a la
            medida.
          </p>

          <div className="contact__offices">
            <article>
              <h3>{CONTACT.chihuahua.title}</h3>
              <p>{CONTACT.chihuahua.address}</p>
              {CONTACT.chihuahua.phones.map((phone) => (
                <a key={phone} href={`tel:+52${phone.replace(/\s/g, "")}`}>
                  {phone}
                </a>
              ))}
              {CONTACT.chihuahua.emails.map((email) => (
                <a key={email} href={`mailto:${email}`}>
                  {email}
                </a>
              ))}
            </article>
            <article>
              <h3>{CONTACT.elPaso.title}</h3>
              <p>{CONTACT.elPaso.address}</p>
              {CONTACT.elPaso.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                  {phone}
                </a>
              ))}
              {CONTACT.elPaso.emails.map((email) => (
                <a key={email} href={`mailto:${email}`}>
                  {email}
                </a>
              ))}
            </article>
          </div>
        </FadeIn>

        <FadeIn className="contact__form-wrap" delay={1}>
          <form className="contact__form" onSubmit={onSubmit}>
            <label>
              Nombre
              <input name="name" type="text" required autoComplete="name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              Mensaje
              <textarea name="message" rows={5} required />
            </label>
            <button type="submit" className="btn btn-primary contact__submit">
              Enviar consulta
            </button>
            {sent && (
              <p className="contact__note">
                Se abrirá tu correo para enviar el mensaje.
              </p>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
