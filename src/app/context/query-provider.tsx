"use client";

import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "react-query";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        retry: false,
        onError: (error: any) => {
          if (error?.response?.status === 401) {
            console.log("Token wygasł, zaloguj się ponownie");
            store.getActions().auth.clearUser();
          }
          if (error?.response?.status === 403) {
            console.log("Brak uprawnień do wyświetlenia tej strony");
          }
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
