"use client";

import { useAuth } from "@/hooks/use-auth";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user, status } = useAuth();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <>
      <header>
        <div>
          <Typography component="h1">Dashboard</Typography>
        </div>
      </header>

      <div>
        <p>
          <strong>Welcome, {user?.name}</strong>
        </p>
        {user?.isActive && (
          <>
            <div className="container mx-auto text-center py-10">
              <Typography component="h2">Thank you for subscribing!</Typography>
              <p className="text-md mt-2">Your plan is now active.</p>

              <Button variant="outline" className="mt-6 btn btn-primary">
                Explore Premium Features
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
