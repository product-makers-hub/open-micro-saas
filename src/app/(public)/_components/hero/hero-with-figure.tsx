import Image from "next/image";

import { landingPageContent } from "@/config/landing-page-config";

export const HeroWithFigure = () => {
  return (
    <div className="hero bg-base-200 py-8">
      <div className="hero-content flex-col md:gap-8 lg:flex-row">
        <Image
          src={landingPageContent.heroSection.figureImage}
          alt="Hero Figure"
          className="lg:w-full rounded-lg shadow-2xl"
          width={300}
          height={300}
          priority
        />
        <div>
          <h1 className="text-5xl font-bold">
            {landingPageContent.heroSection.headline}
          </h1>
          <p className="py-6">{landingPageContent.heroSection.subheadline}</p>
          <button className="btn btn-primary">
            {landingPageContent.heroSection.cta}
          </button>
        </div>
      </div>
    </div>
  );
};
