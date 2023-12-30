"use client";

import { useAuth } from "@/hooks/use-auth";

export const Temporal = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Temporal</h1>
      <p>{user?.email}</p>
    </div>
  );
};
