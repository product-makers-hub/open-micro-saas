import { landingPageContent } from "@/config/landing-page-config";

export const FeaturesSection = () => {
  const { title, features } = landingPageContent.featuresOverview;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {features.map((feature, index) => (
          <div key={index} className="rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full">
                <i className={`fas fa-${feature.icon} fa-lg`}></i>{" "}
                {/* Assuming usage of FontAwesome icons */}
              </div>
              <h3 className="text-xl font-medium">{feature.title}</h3>
            </div>
            <p className="mt-4">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
