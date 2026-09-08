import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LIFEWS Pathways™",
    short_name: "Pathways",
    description: "From Learning to Opportunity — mobile-first field operations for LIFEWS Pathways™.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#F7F5ED",
    theme_color: "#006B3C",
    orientation: "portrait",
    categories: ["education", "productivity"],
  };
}
