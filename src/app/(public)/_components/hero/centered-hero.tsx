import { landingPageContent } from "@/config/landing-page-config";

export const CenteredHero = () => {
  return (
    <div className="hero bg-base-200 py-8">
      <div className="hero-content text-center">
        <div className="max-w-md">
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
