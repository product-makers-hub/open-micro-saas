import { HeroWithFigure } from "@/components/landing-page/hero/hero-with-figure";
import { FeaturesSection } from "@/components/landing-page/features";
import { HowItWorks } from "@/components/landing-page/how-it-works";
import { WhyChooseUs } from "@/components/landing-page/why-choose-us";
import { CallToAction } from "@/components/landing-page/call-to-action";
import { Footer } from "@/components/landing-page/footer";
import { Pricing } from "@/components/landing-page/pricing";

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
