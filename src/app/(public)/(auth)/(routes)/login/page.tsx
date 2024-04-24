"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { authConfig } from "@/config/auth-config";
import { AuthProviders } from "@/components/auth/auth-providers";
import { getHumanErrorMessage } from "@/libs/auth/auth-errors-utils";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
});

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>("");
  const [isEmailLoginSuccess, setIsEmailLoginSuccess] = React.useState<
    boolean | undefined
  >(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setIsLoading(true);
      setLoginError(null);
      setIsEmailLoginSuccess(false);

      const res = await signIn("nodemailer", {
        email: values.email,
        callbackUrl: authConfig.normalUserCallbackUrl,
        redirect: false,
      });

      if (res?.error) {
        setLoginError("The e-mail could not be sent. Please try again.");
      } else {
        setIsEmailLoginSuccess(true);
      }
    } catch (error) {
      console.error("Error in login", error);
      setLoginError("The e-mail could not be sent. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const errorMessage = loginError || searchParams.get("error");

  return (
    <div className="h-[calc(100vh-80px)]">
      <div className="flex items-center justify-center container h-full">
        <div className="max-w-md w-full space-y-6">
          <div>
            <Typography component="h1" className="mt-6 text-center">
              Sign in or create an account
            </Typography>
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

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button disabled={isLoading} type="submit" className="w-full">
                  Sign in with Email
                </Button>
              </div>
            </form>
          </Form>

          <Typography className="text-center">Or sign in with</Typography>

          <AuthProviders />

          <div className="mt-2">
            <Typography
              component="small"
              className="dark:text-gray-300 text-gray-700"
            >
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="font-extrabold">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="font-extrabold" href="/privacy">
                Privacy Policy.
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
