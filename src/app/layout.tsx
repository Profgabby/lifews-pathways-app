import type { Metadata, Viewport } from "next";
import { PwaRegister } from "@/components/pwa-register";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIFEWS Pathways™",
  description: "From Learning to Opportunity — digital infrastructure for LIFEWS Pathways™.",
  applicationName: "LIFEWS Pathways™",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "LIFEWS Pathways™",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#006B3C",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
