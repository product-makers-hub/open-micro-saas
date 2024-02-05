"use client";

import React from "react";
import { signIn } from "next-auth/react";

import { authConfig } from "@/config";
import { Providers } from "@/components/providers";

export default function LoginPage() {
  const [loginError, setLoginError] = React.useState<string | null>("");
  const [isEmailLoginSuccess, setIsEmailLoginSuccess] = React.useState<
    boolean | undefined
  >(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);

      const email = formData.get("email");

      const res = await signIn("email", {
        email,
        callbackUrl: authConfig.normalUserCallbackUrl,
        redirect: false,
      });

      if (res) {
        setLoginError(res.error);
        setIsEmailLoginSuccess(res?.ok);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="block font-bold">Error!</strong>
            <span className="block sm:inline"> {loginError}</span>
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
              disabled={isLoading}
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
