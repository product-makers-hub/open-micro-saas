import { landingPageContent } from "@/config/landing-page-config";
import { Typography } from "@/components/ui/typography";

export const HowItWorks = () => {
  const { title, steps } = landingPageContent.howItWorks;

  return (
    <>
      <Typography component="h2" className="text-center mb-8">
        {title}
      </Typography>
      <div className="flex flex-wrap justify-center gap-10">
        {steps.map((step, index) => (
          <div key={index} className="max-w-sm flex-1">
            <div className="flex flex-col items-center text-center">
              <div className={`text-6xl font-bold text-blue-500`}>
                {index + 1}
              </div>
              <Typography className="mt-4">{step}</Typography>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
