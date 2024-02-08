"use client";

import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {
  const { user, status } = useAuth();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <section>
      <header>
        <div className="">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
      </header>

      <main>
        <div className="">
          <p>
            <strong>Welcome, {user?.name}</strong>
          </p>
          {user?.isActive && (
            <>
              <div className="container mx-auto text-center py-10">
                <h2 className="text-2xl font-semibold">
                  Thank you for subscribing!
                </h2>
                <p className="text-md mt-2">Your plan is now active.</p>

                <button className="mt-6 btn btn-primary">
                  Explore Premium Features
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </section>
  );
}
