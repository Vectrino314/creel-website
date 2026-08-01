import { Hero } from "../components/Hero";
import { Experiences } from "../components/Experiences";
import { Destinations } from "../components/Destinations";
import { Packages } from "../components/Packages";
import { Services } from "../components/Services";
import { Trust } from "../components/Trust";
import { About } from "../components/About";
import { Testimonials } from "../components/Testimonials";
import { Contact } from "../components/Contact";

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
