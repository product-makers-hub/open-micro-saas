"use client";

import { useFormState } from "react-dom";
import Link from "next/link";

import {
  resetPassword,
  PrevState,
} from "@/app/auth/reset-password/[token]/actions";
import { authConfig } from "@/config";

interface ResetPasswordFormProps {
  token: string;
}

const initialState: PrevState = {
  message: "",
  status: "",
};

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [state, formAction] = useFormState(resetPassword, initialState);

  return (
    <>
      {state.message && state.status === "success" && (
        <div className="alert alert-success">
          <div className="flex-1">
            <div>{state.message}</div>
            <Link href={authConfig.loginUrl}>Go to login</Link>
          </div>
        </div>
      )}
      {state.message && state.status === "error" && (
        <div className="alert alert-error">
          <div className="flex-1">
            <label>{state.message}</label>
          </div>
        </div>
      )}
      <form
        action={formAction}
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
    </>
  );
};
