import { landingPageContent } from "@/config/landing-page-config";

export const HowItWorks = () => {
  const { title, steps } = landingPageContent.howItWorks;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">{title}</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {steps.map((step, index) => (
          <div key={index} className="max-w-sm flex-1">
            <div className="flex flex-col items-center text-center">
              <div className={`text-6xl font-bold text-blue-500`}>
                {index + 1}
              </div>
              <p className="mt-4 text-lg">{step}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
