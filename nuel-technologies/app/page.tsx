import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import Jobs from "@/components/Jobs";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Orbs from "@/components/Orbs";
import Effects from "@/components/Effects";
import WhatsApp from "@/components/WhatsApp";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.email,
      telephone: site.phones.map((p) => p.tel),
      description: "Software company offering custom software, web and mobile apps, social media management, videography and video streaming.",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Orbs />
      <Effects />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <WhyUs />
        <Projects />
        <Team />
        <Jobs />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
