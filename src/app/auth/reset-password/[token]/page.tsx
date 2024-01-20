import Link from "next/link";
import type { Metadata } from "next";

import { resetPassword } from "./actions";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset password page",
};

interface ResetPasswordProps {
  params: {
    token: string;
  };
}

export default function ResetPasswordPage({
  params: { token },
}: ResetPasswordProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabol">
          Reset Password Page
        </h2>
        <p>Please enter your new password.</p>

        <form
          action={resetPassword}
          aria-label="reset password form"
          className="mt-8 space-y-6"
        >
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">New password</span>
            </div>
            <input hidden name="token" defaultValue={token} />
            <input
              name="password"
              type="password"
              placeholder="Super secret password"
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
