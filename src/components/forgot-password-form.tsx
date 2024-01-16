/* eslint-disable no-unused-vars */
"use client";

import { useFormState } from "react-dom";

interface PrevState {
  message: string;
}

const initialState = {
  message: "",
};

interface ForgotPasswordFormProps {
  action: (
    prevState: PrevState,
    formData: FormData,
  ) => PrevState | Promise<PrevState>;
}

export const ForgotPasswordForm = ({ action }: ForgotPasswordFormProps) => {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <>
      {state.message && (
        <div className="alert alert-success">
          <div className="flex-1">
            <label>{state.message}</label>
          </div>
        </div>
      )}
      <form
        action={formAction}
        aria-label="forgot password form"
        className="mt-8 space-y-6"
      >
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
    </>
  );
};
