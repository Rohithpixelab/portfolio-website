import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import FeaturedProjects from "../../components/FeaturedProjects";
import Services from "../../components/Services";
import VisualVoid from "../../components/VisualVoid";
import Experience from "../../components/Experience";
import Protocol from "../../components/Protocol";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import FadeInScroll from "../../components/FadeInScroll";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FadeInScroll>
        <FeaturedProjects />
      </FadeInScroll>
      <FadeInScroll>
        <Services />
      </FadeInScroll>
      <FadeInScroll>
        <VisualVoid />
      </FadeInScroll>
      <FadeInScroll>
        <Experience />
      </FadeInScroll>
      <FadeInScroll>
        <Protocol />
      </FadeInScroll>
      <FadeInScroll>
        <CTA />
      </FadeInScroll>
      <FadeInScroll>
        <Footer />
      </FadeInScroll>
    </main>
  );
}
