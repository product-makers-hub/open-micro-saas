import { useEffect, useState } from "react";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

export const Providers = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const getProvidersInt = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    getProvidersInt();
  }, []);

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
