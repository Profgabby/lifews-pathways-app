import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIFEWS Pathways™",
  description: "From Learning to Opportunity — digital infrastructure for LIFEWS Pathways™.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
