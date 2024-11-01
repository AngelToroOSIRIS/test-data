import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SwitchTheme } from "@/components/ui/SwitchTheme";
import Providers from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test UI || ECIJG",
  description: "app de test para pruebas de ui/front",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      {/* TODO: REVISAR SI FUNCIONA */}
      <body className={inter.className + " w-screen"}>
        <Providers>
          <SwitchTheme />
          {children}
        </Providers>
      </body>
    </html>
  );
}
