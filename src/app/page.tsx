import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProjects from "../components/FeaturedProjects";
import Services from "../components/Services";
import VisualVoid from "../components/VisualVoid";
import Experience from "../components/Experience";
import Protocol from "../components/Protocol";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedProjects />
      <Services />
      <VisualVoid />
      <Experience />
      <Protocol />
      <CTA />
      <Footer />
    </main>
  );
}
