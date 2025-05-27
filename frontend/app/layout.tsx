// app/layout.tsx (Server Component — NO "use client")
import "./styles/globals.css";
import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
