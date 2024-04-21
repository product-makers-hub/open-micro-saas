import { landingPageContent } from "@/config/landing-page-config";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  const { text, cta } = landingPageContent.callToAction;

  return (
    <div className="text-center">
      <Typography component="h3" className="pb-4">
        {text}
      </Typography>
      <Button variant="secondary" className="text-lg">
        {cta}
      </Button>
    </div>
  );
};
