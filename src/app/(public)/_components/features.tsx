import { landingPageContent } from "@/config/landing-page-config";
import { Typography } from "@/components/ui/typography";

export const FeaturesSection = () => {
  const { title, features } = landingPageContent.featuresOverview;

  return (
    <div className="container mx-auto px-4">
      <Typography component="h2" className="text-center">
        {title}
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {features.map((feature, index) => (
          <div key={index} className="rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <Typography component="h3">{feature.title}</Typography>
            </div>
            <Typography className="mt-4">{feature.description}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
