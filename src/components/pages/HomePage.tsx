import { Hero } from "../Hero";
import { Experiences } from "../Experiences";
import { Destinations } from "../Destinations";
import { Packages } from "../Packages";
import { Services } from "../Services";
import { Trust } from "../Trust";
import { About } from "../About";
import { Testimonials } from "../Testimonials";
import { Contact } from "../Contact";
import type { HomeMedia } from "../../lib/resolveMedia";

type HomePageProps = {
  media: HomeMedia;
};

export function HomePage({ media }: HomePageProps) {
  return (
    <>
      <Hero slides={media.heroSlides} />
      <Experiences items={media.experiences} />
      <Destinations destinations={media.destinations} />
      <Packages />
      <Services />
      <Trust
        certifications={media.certifications}
        partners={media.partners}
      />
      <About image={media.aboutImage} />
      <Testimonials />
      <Contact />
    </>
  );
}
