import { landingPageContent } from "@/config/landing-page-config";

export const CallToAction = () => {
  const { text, cta } = landingPageContent.callToAction;

  return (
    <div className="container mx-auto text-center px-4">
      <p className="text-xl md:text-2xl font-light text-white mb-6">{text}</p>
      <button className="text-white bg-green-500 hover:bg-green-700 font-medium py-2 px-4 rounded-lg text-lg transition duration-300 ease-in-out">
        {cta}
      </button>
    </div>
  );
};
