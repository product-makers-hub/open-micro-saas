import Image from "next/image";

import { landingPageContent } from "@/config/landing-page-config";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export const HeroWithFigure = () => {
  return (
    <div className="container mx-auto py-16 px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        <div className="flex-1 flex justify-center lg:justify-start">
          <Image
            src={landingPageContent.heroSection.figureImage}
            alt="Hero Figure"
            className="rounded-lg shadow-xl"
            width={600} // Adjust based on your preference and design needs
            height={600} // Ensure aspect ratio matches the original image
            priority
          />
        </div>
        <div className="flex-1">
          <Typography component="h1" className="mb-4">
            {landingPageContent.heroSection.headline}
          </Typography>
          <Typography component="h2" className="mb-4">
            {landingPageContent.heroSection.subheadline}
          </Typography>
          <Button variant="secondary">
            {landingPageContent.heroSection.cta}
          </Button>
        </div>
      </div>
    </div>
  );
};
