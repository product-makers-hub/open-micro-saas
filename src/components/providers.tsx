import { signIn } from "next-auth/react";

const providers = [
  {
    name: "Google",
    id: "google",
  },
];

export const Providers = () => {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => {
          if (provider.id === "email") return null;

          return (
            <div key={provider.name} className="mr-2">
              <button
                className="btn w-full"
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
          );
        })}
    </>
  );
};
