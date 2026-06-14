"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { makeQueryClient } from "@/lib/query/query-client";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(makeQueryClient);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
