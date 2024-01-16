import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Forgot password page",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabol">
          Forgot Password Page
        </h2>
        <p>
          Please enter your email address below and we will send you a link to
          reset your password if you have an account.
        </p>
        <form aria-label="forgot password form" className="mt-8 space-y-6">
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
          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 btn btn-primary"
              type="submit"
            >
              Reset password
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500"
              href="/auth/login"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
