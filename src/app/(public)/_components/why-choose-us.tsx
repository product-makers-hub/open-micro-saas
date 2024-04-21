import { landingPageContent } from "@/config/landing-page-config";
import { Typography } from "@/components/ui/typography";

export const WhyChooseUs = () => {
  const { title, reasons } = landingPageContent.whyChooseUs;

  return (
    <>
      <Typography component="h2" className="text-center mb-8">
        {title}
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <div key={index} className="rounded-lg shadow p-6">
            <div className="flex flex-col gap-4 items-center space-x-4">
              <div className="flex-shrink-0">
                {/* Placeholder for an icon or image */}
                <svg
                  className="h-12 w-12 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <Typography component="h3">{reason}</Typography>
                {/* Optional: Include a short description for each reason */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
