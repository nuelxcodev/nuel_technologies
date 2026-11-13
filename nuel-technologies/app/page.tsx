import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Jobs from "@/components/Jobs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Orbs from "@/components/Orbs";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <Orbs />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Jobs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
