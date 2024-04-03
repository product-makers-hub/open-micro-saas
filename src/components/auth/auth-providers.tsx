import { signIn } from "next-auth/react";

import { Button } from "../ui/button";

const providers = [
  {
    name: "Google",
    id: "google",
  },
];

export const AuthProviders = () => {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => {
          if (provider.id === "email") return null;

          return (
            <div key={provider.name} className="mr-2">
              <Button
                variant="secondary"
                className="btn w-full"
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </Button>
            </div>
          );
        })}
    </>
  );
};
