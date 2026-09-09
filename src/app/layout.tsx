import type { Metadata, Viewport } from "next";
import { PwaRegister } from "@/components/pwa-register";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LIFEWS GreenSkills™",
    template: "%s | LIFEWS GreenSkills™",
  },
  description: "LIFEWS GreenSkills™ connects inclusive learning, vocational livelihoods and technical food-energy-water skills through Pathways™, Kadara™ and GreenTech™.",
  applicationName: "LIFEWS GreenSkills™",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "LIFEWS GreenSkills™",
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
