"use client";

import React, { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { authConfig } from "@/config/auth-config";
import { Providers } from "@/components/providers";
import { getHumanErrorMessage } from "@/libs/auth/auth-errors-utils";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [loginError, setLoginError] = React.useState<string | null>("");
  const [isEmailLoginSuccess, setIsEmailLoginSuccess] = React.useState<
    boolean | undefined
  >(false);

  const handleSubmit = async (formData: FormData) => {
    startTransition(() => {
      setLoginError(null);
      setIsEmailLoginSuccess(false);

      signIn("email", {
        email: formData.get("email") as string,
        callbackUrl: authConfig.normalUserCallbackUrl,
        redirect: false,
      })
        .then((res) => {
          console.log(res);
          if (res?.error) {
            setLoginError("The e-mail could not be sent. Please try again.");
          } else {
            setIsEmailLoginSuccess(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const errorMessage = loginError || searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabol">
            Sign in to your account
          </h2>
        </div>
        {isEmailLoginSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <strong className="block font-bold">Success!</strong>
            <div className="block sm:inline">
              Please check your email for the magic link.
            </div>
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="block font-bold">Error!</strong>
            <span className="block sm:inline">
              {getHumanErrorMessage(errorMessage)}
            </span>
          </div>
        )}
        <form action={handleSubmit} className="mt-8 space-y-6">
          <input name="remember" type="hidden" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  required
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>
          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 btn btn-primary"
              type="submit"
              disabled={isPending}
            >
              Sign in with Email
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm">Or sign in with</p>
        <Providers />
      </div>
    </div>
  );
}
