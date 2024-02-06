import { HeroWithFigure } from "./_components/hero/hero-with-figure";
import { FeaturesSection } from "./_components/features";
import { HowItWorks } from "./_components/how-it-works";
import { WhyChooseUs } from "./_components/why-choose-us";
import { CallToAction } from "./_components/call-to-action";
import { Footer } from "./_components/footer";
import { Pricing } from "./_components/pricing";

export default function Home() {
  return (
    <>
      <section id="hero" className="pb-8">
        <HeroWithFigure />
      </section>
      <section id="features" className="py-12 my-8">
        <FeaturesSection />
      </section>
      <section id="call-to-action" className="bg-primary py-12">
        <CallToAction />
      </section>

      <section id="how-it-works" className="py-12 my-8">
        <HowItWorks />
      </section>
      <div className="divider" />
      <section id="why-choose-us" className="py-12 my-8">
        <WhyChooseUs />
      </section>

      <section id="why-choose-us" className="py-12 my-8">
        <Pricing />
      </section>
      <Footer />
    </>
  );
}
