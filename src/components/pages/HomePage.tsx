import { Hero } from "../Hero";
import { Experiences } from "../Experiences";
import { Destinations } from "../Destinations";
import { Packages } from "../Packages";
import { Services } from "../Services";
import { Trust } from "../Trust";
import { About } from "../About";
import { Testimonials } from "../Testimonials";
import { Contact } from "../Contact";

export function HomePage() {
  return (
    <>
      <Hero />
      <Experiences />
      <Destinations />
      <Packages />
      <Services />
      <Trust />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}
