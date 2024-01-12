"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { authConfig } from "@/config";
import { Providers } from "@/components/providers";

export default function LoginPage() {
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: authConfig.normalUserCallbackUrl,
      redirect: false,
    });

    if (res?.error) {
      setLoginError(res.error);
      return;
    }

    if (res?.url) {
      router.replace(res.url);
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
        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error!</strong>
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
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                href="#"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 btn btn-primary"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm">Or sign in with</p>
        <Providers />
      </div>
    </div>
  );
}
